/*
LEEWAY HEADER — DO NOT REMOVE
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render
AUTHORITY: LeeWay-Standards
REGION: SFU.SIGNALING
TAG: SFU.WS.SIGNALING.HANDLER
COLOR_ONION_HEX: NEON=#00FFD1 FLUO=#00B4FF PASTEL=#C7F0FF
ICON_ASCII: family=lucide glyph=zap
5WH:
  WHAT = WebSocket signaling handler — auth, room join, transport, produce, consume
  WHY  = Drives the mediasoup signaling protocol over persistent WS connections
  WHO  = LEEWAY INNOVATIONS A LEEWAY INDUSTY CREATION
  WHERE = services/sfu/src/signaling/handler.ts
  WHEN = 2026
  HOW  = Message-type dispatch per WS connection; JWT validation; agentBus event relay
AGENTS: ASSESS ALIGN AUDIT
LICENSE: PROPRIETARY
*/
// CHAIN: Standards → Integrated → Runtime → Projections

import { WebSocket, WebSocketServer } from 'ws';
import type { IncomingMessage } from 'http';
import type { types } from 'mediasoup';

import { verifyToken } from '../auth.js';
import { deleteRoom, getOrCreateRoom, getRoom } from '../mediasoup/room.js';
import { logger } from '../logger.js';
import { metrics } from '../metrics.js';
import { config } from '../config.js';
import { agentBus } from '../agents/registry.js';

// ─── Message types ────────────────────────────────────────────────────────────

interface BaseMessage {
  id?: string | number;
  type: string;
}

interface AuthMessage extends BaseMessage {
  type: 'auth';
  token: string;
}

interface JoinRoomMessage extends BaseMessage {
  type: 'joinRoom';
  roomId: string;
  rtpCapabilities: types.RtpCapabilities;
}

interface LeaveRoomMessage extends BaseMessage {
  type: 'leaveRoom';
}

interface CreateTransportMessage extends BaseMessage {
  type: 'createTransport';
  direction: 'send' | 'recv';
}

interface ConnectTransportMessage extends BaseMessage {
  type: 'connectTransport';
  transportId: string;
  dtlsParameters: types.DtlsParameters;
}

interface ProduceMessage extends BaseMessage {
  type: 'produce';
  transportId: string;
  kind: 'audio' | 'video';
  rtpParameters: types.RtpParameters;
}

interface ConsumeMessage extends BaseMessage {
  type: 'consume';
  transportId: string;
  producerId: string;
  rtpCapabilities: types.RtpCapabilities;
}

interface ResumeConsumerMessage extends BaseMessage {
  type: 'resumeConsumer';
  consumerId: string;
}

interface PauseProducerMessage extends BaseMessage {
  type: 'pauseProducer';
  producerId: string;
}

interface ResumeProducerMessage extends BaseMessage {
  type: 'resumeProducer';
  producerId: string;
}

interface CloseProducerMessage extends BaseMessage {
  type: 'closeProducer';
  producerId: string;
}

type IncomingMsg =
  | AuthMessage
  | JoinRoomMessage
  | LeaveRoomMessage
  | CreateTransportMessage
  | ConnectTransportMessage
  | ProduceMessage
  | ConsumeMessage
  | ResumeConsumerMessage
  | PauseProducerMessage
  | ResumeProducerMessage
  | CloseProducerMessage;

// ─── Per-connection state ─────────────────────────────────────────────────────

interface PeerConnection {
  ws: WebSocket;
  peerId?: string;
  roomId?: string;
  authenticated: boolean;
}

interface PeerSession {
  peerId: string;
  roomId?: string;
  connection?: PeerConnection;
  pendingNotifications: object[];
  cleanupTimer?: ReturnType<typeof setTimeout>;
  operationChain: Promise<void>;
  lastSeen: number;
}

const peerSessions = new Map<string, PeerSession>();

function getOrCreatePeerSession(peerId: string): PeerSession {
  let session = peerSessions.get(peerId);
  if (!session) {
    session = {
      peerId,
      pendingNotifications: [],
      operationChain: Promise.resolve(),
      lastSeen: Date.now(),
    };
    peerSessions.set(peerId, session);
  }
  return session;
}

function cancelSessionCleanup(session: PeerSession): void {
  if (session.cleanupTimer) {
    clearTimeout(session.cleanupTimer);
    session.cleanupTimer = undefined;
  }
}

function queueNotification(peerId: string, data: object): void {
  const session = getOrCreatePeerSession(peerId);
  session.pendingNotifications.push(data);
  while (session.pendingNotifications.length > config.ws.maxPendingNotifications) {
    session.pendingNotifications.shift();
  }
}

function drainNotifications(session: PeerSession): void {
  const ws = session.connection?.ws;
  if (!ws || ws.readyState !== WebSocket.OPEN) return;
  const queued = session.pendingNotifications.splice(0);
  for (const item of queued) {
    send(ws, item);
    metrics.wsMessages.inc({
      direction: 'out',
      type: (item as BaseMessage).type ?? 'unknown',
    });
  }
}

function releaseRoomMembership(peerId: string, roomId: string, reason: string): void {
  const room = getRoom(roomId);
  room?.removePeer(peerId);

  if (room && room.getPeerCount() === 0) {
    deleteRoom(roomId);
  }

  const roomMap = roomConnections.get(roomId);
  if (roomMap) {
    roomMap.delete(peerId);
    if (roomMap.size === 0) roomConnections.delete(roomId);
  }

  broadcastToRoom(roomId, peerId, {
    type: 'peerLeft',
    peerId,
    reason,
  });

  const session = peerSessions.get(peerId);
  if (session) {
    cancelSessionCleanup(session);
    session.roomId = undefined;
    session.pendingNotifications.length = 0;
  }
}

function scheduleSessionCleanup(session: PeerSession): void {
  cancelSessionCleanup(session);
  if (!session.roomId) {
    peerSessions.delete(session.peerId);
    return;
  }

  session.cleanupTimer = setTimeout(() => {
    const roomId = session.roomId;
    if (session.connection?.ws.readyState === WebSocket.OPEN) return;
    if (roomId) releaseRoomMembership(session.peerId, roomId, 'resume_grace_expired');
    peerSessions.delete(session.peerId);
    logger.info(
      { peerId: session.peerId, roomId },
      'Peer resume grace expired; room state released',
    );
  }, config.ws.resumeGraceMs);
}

// ─── Connection tracking for rate-limiting ────────────────────────────────────

const connectionsByIp = new Map<string, Set<WebSocket>>();

function trackConnection(ip: string, ws: WebSocket): boolean {
  let set = connectionsByIp.get(ip);
  if (!set) {
    set = new Set();
    connectionsByIp.set(ip, set);
  }
  if (set.size >= config.ws.maxConnectionsPerIp) {
    return false;
  }
  set.add(ws);
  return true;
}

function untrackConnection(ip: string, ws: WebSocket): void {
  const set = connectionsByIp.get(ip);
  if (!set) return;
  set.delete(ws);
  if (set.size === 0) connectionsByIp.delete(ip);
}

// ─── Helper: send JSON ────────────────────────────────────────────────────────

function send(ws: WebSocket, payload: object): void {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(payload));
  }
}

function sendOk(ws: WebSocket, id: string | number | undefined, data: object): void {
  send(ws, { id, ok: true, ...data });
}

function sendError(ws: WebSocket, id: string | number | undefined, message: string): void {
  send(ws, { id, ok: false, error: message });
  metrics.signalingErrors.inc({ reason: message.slice(0, 40) });
}

function sendToConnection(conn: PeerConnection, payload: object): void {
  if (conn.ws.readyState === WebSocket.OPEN) {
    send(conn.ws, payload);
    return;
  }
  if (conn.peerId) queueNotification(conn.peerId, payload);
}

function sendOkConn(
  conn: PeerConnection,
  id: string | number | undefined,
  data: object,
): void {
  sendToConnection(conn, { id, ok: true, ...data });
}

function sendErrorConn(
  conn: PeerConnection,
  id: string | number | undefined,
  message: string,
): void {
  sendToConnection(conn, { id, ok: false, error: message });
  metrics.signalingErrors.inc({ reason: message.slice(0, 40) });
}

// ─── Core handler ─────────────────────────────────────────────────────────────

async function handleMessage(conn: PeerConnection, msg: IncomingMsg): Promise<void> {
  const { ws } = conn;
  const { id, type } = msg;

  metrics.wsMessages.inc({ direction: 'in', type });

  // Auth must happen first
  if (type !== 'auth' && !conn.authenticated) {
    sendErrorConn(conn, id, 'Not authenticated');
    return;
  }

  try {
    switch (type) {
      case 'auth': {
        const payload = verifyToken(msg.token);
        conn.authenticated = true;
        conn.peerId = payload.sub;

        const session = getOrCreatePeerSession(conn.peerId);
        cancelSessionCleanup(session);

        const previous = session.connection;
        if (previous && previous !== conn && previous.ws.readyState === WebSocket.OPEN) {
          previous.ws.close(4001, 'replaced by resumed peer connection');
        }

        conn.roomId = session.roomId;
        session.connection = conn;
        session.lastSeen = Date.now();

        if (conn.roomId) {
          let roomMap = roomConnections.get(conn.roomId);
          if (!roomMap) {
            roomMap = new Map();
            roomConnections.set(conn.roomId, roomMap);
          }
          roomMap.set(conn.peerId, conn);
        }

        logger.info(
          { peerId: conn.peerId, resumedRoomId: conn.roomId },
          'Peer authenticated',
        );
        sendOkConn(conn, id, {
          peerId: conn.peerId,
          resumed: Boolean(conn.roomId),
          roomId: conn.roomId,
          resumeGraceMs: config.ws.resumeGraceMs,
        });
        drainNotifications(session);
        break;
      }

      case 'joinRoom': {
        if (!conn.peerId) throw new Error('No peerId');

        const session = getOrCreatePeerSession(conn.peerId);
        if (session.roomId && session.roomId !== msg.roomId) {
          releaseRoomMembership(conn.peerId, session.roomId, 'room_switch');
        }

        const room = await getOrCreateRoom(msg.roomId);
        conn.roomId = msg.roomId;
        session.roomId = msg.roomId;
        session.connection = conn;
        session.lastSeen = Date.now();

        // A signaling reconnect may preserve the existing room peer. Do not
        // overwrite that state and leak retained transports/producers.
        if (!room.getPeer(conn.peerId)) {
          room.addPeer(conn.peerId);
        }

        // Notify about existing producers
        const existing = room.getOtherProducers(conn.peerId);
        sendOkConn(conn, id, {
          routerRtpCapabilities: room.routerRtpCapabilities,
          existingProducers: existing.map((e) => ({
            producerId: e.producer.id,
            peerId: e.peerId,
            kind: e.producer.kind,
          })),
        });
        break;
      }

      case 'leaveRoom': {
        if (!conn.peerId || !conn.roomId) break;
        const roomId = conn.roomId;
        releaseRoomMembership(conn.peerId, roomId, 'explicit_leave');
        conn.roomId = undefined;
        sendOkConn(conn, id, {});
        break;
      }

      case 'createTransport': {
        if (!conn.peerId || !conn.roomId) throw new Error('Not in a room');
        const room = getRoom(conn.roomId);
        if (!room) throw new Error('Room not found');
        const transport = await room.createWebRtcTransport(conn.peerId);
        sendOkConn(conn, id, {
          transportId: transport.id,
          iceParameters: transport.iceParameters,
          iceCandidates: transport.iceCandidates,
          dtlsParameters: transport.dtlsParameters,
        });
        break;
      }

      case 'connectTransport': {
        if (!conn.peerId || !conn.roomId) throw new Error('Not in a room');
        const room = getRoom(conn.roomId);
        if (!room) throw new Error('Room not found');
        await room.connectTransport(conn.peerId, msg.transportId, msg.dtlsParameters);
        sendOkConn(conn, id, {});
        break;
      }

      case 'produce': {
        if (!conn.peerId || !conn.roomId) throw new Error('Not in a room');
        const room = getRoom(conn.roomId);
        if (!room) throw new Error('Room not found');
        const producer = await room.produce(conn.peerId, msg.transportId, msg.rtpParameters, msg.kind);

        // Notify other peers about this new producer
        broadcastToRoom(conn.roomId, conn.peerId, {
          type: 'newProducer',
          producerId: producer.id,
          peerId: conn.peerId,
          kind: producer.kind,
        });

        producer.on('transportclose', () => {
          broadcastToRoom(conn.roomId!, conn.peerId!, {
            type: 'producerClosed',
            producerId: producer.id,
          });
        });

        sendOkConn(conn, id, { producerId: producer.id });
        break;
      }

      case 'consume': {
        if (!conn.peerId || !conn.roomId) throw new Error('Not in a room');
        const room = getRoom(conn.roomId);
        if (!room) throw new Error('Room not found');
        const consumer = await room.consume(
          conn.peerId,
          msg.transportId,
          msg.producerId,
          msg.rtpCapabilities,
        );
        sendOkConn(conn, id, {
          consumerId: consumer.id,
          producerId: msg.producerId,
          kind: consumer.kind,
          rtpParameters: consumer.rtpParameters,
        });
        break;
      }

      case 'resumeConsumer': {
        if (!conn.peerId || !conn.roomId) throw new Error('Not in a room');
        const room = getRoom(conn.roomId);
        if (!room) throw new Error('Room not found');
        const peer = room.getPeer(conn.peerId);
        const consumer = peer?.consumers.get(msg.consumerId);
        if (!consumer) throw new Error('Consumer not found');
        await consumer.resume();
        sendOkConn(conn, id, {});
        break;
      }

      case 'pauseProducer': {
        if (!conn.peerId || !conn.roomId) throw new Error('Not in a room');
        const room = getRoom(conn.roomId);
        const peer = room?.getPeer(conn.peerId);
        const producer = peer?.producers.get(msg.producerId);
        if (!producer) throw new Error('Producer not found');
        await producer.pause();
        sendOkConn(conn, id, {});
        break;
      }

      case 'resumeProducer': {
        if (!conn.peerId || !conn.roomId) throw new Error('Not in a room');
        const room = getRoom(conn.roomId);
        const peer = room?.getPeer(conn.peerId);
        const producer = peer?.producers.get(msg.producerId);
        if (!producer) throw new Error('Producer not found');
        await producer.resume();
        sendOkConn(conn, id, {});
        break;
      }

      case 'closeProducer': {
        if (!conn.peerId || !conn.roomId) throw new Error('Not in a room');
        const room = getRoom(conn.roomId);
        const peer = room?.getPeer(conn.peerId);
        const producer = peer?.producers.get(msg.producerId);
        if (!producer) throw new Error('Producer not found');
        producer.close();
        peer!.producers.delete(msg.producerId);
        broadcastToRoom(conn.roomId, conn.peerId, {
          type: 'producerClosed',
          producerId: msg.producerId,
        });
        sendOkConn(conn, id, {});
        break;
      }

      default:
        sendErrorConn(conn, id, `Unknown message type`);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    logger.warn({ type, error: message }, 'Signaling error');
    sendErrorConn(conn, id, message);
  }
}

// ─── Broadcast helpers ─────────────────────────────────────────────────────────

// Map roomId -> Set of peer connections
export const roomConnections = new Map<string, Map<string, PeerConnection>>();

// All authenticated connections (for agent broadcasts)
const allConnections = new Set<WebSocket>();

function broadcastToRoom(roomId: string, excludePeerId: string, data: object): void {
  const connections = roomConnections.get(roomId);
  if (!connections) return;
  for (const [peerId, conn] of connections) {
    if (peerId === excludePeerId) continue;

    if (conn.ws.readyState === WebSocket.OPEN) {
      send(conn.ws, data);
      metrics.wsMessages.inc({
        direction: 'out',
        type: (data as BaseMessage).type ?? 'unknown',
      });
    } else {
      queueNotification(peerId, data);
    }
  }
}

// ─── WebSocket server setup ───────────────────────────────────────────────────

export function attachSignalingServer(wss: WebSocketServer): void {  // Forward agent events to all authenticated WebSocket clients
  agentBus.on('agentEvent', (event: object) => {
    for (const ws of allConnections) {
      send(ws, event);
    }
  });
  wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
    const ip = (req.headers['x-forwarded-for'] as string | undefined)?.split(',')[0]?.trim()
      ?? req.socket.remoteAddress
      ?? 'unknown';

    if (!trackConnection(ip, ws)) {
      logger.warn({ ip }, 'Connection limit exceeded; rejecting');
      ws.close(1008, 'Connection limit exceeded');
      return;
    }

    metrics.wsConnections.inc();
    const conn: PeerConnection = { ws, authenticated: false };
    let messageChain = Promise.resolve();
    let heartbeatAlive = true;

    const heartbeatTimer = setInterval(() => {
      if (!heartbeatAlive) {
        logger.warn({ ip, peerId: conn.peerId }, 'WebSocket heartbeat timeout');
        ws.terminate();
        return;
      }
      heartbeatAlive = false;
      try {
        ws.ping();
      } catch {
        ws.terminate();
      }
    }, config.ws.pingIntervalMs);

    ws.on('pong', () => {
      heartbeatAlive = true;
      if (conn.peerId) {
        const session = peerSessions.get(conn.peerId);
        if (session) session.lastSeen = Date.now();
      }
    });

    allConnections.add(ws);
    logger.info({ ip }, 'WebSocket connected');

    ws.on('message', (raw) => {
      let msg: IncomingMsg;

      // Enforce max message size
      const rawStr = raw.toString();
      if (rawStr.length > config.ws.maxMessageBytes) {
        sendError(ws, undefined, 'Message too large');
        return;
      }

      try {
        msg = JSON.parse(rawStr) as IncomingMsg;
      } catch {
        sendError(ws, undefined, 'Invalid JSON');
        return;
      }

      // Serialize first within this socket, then (after authentication) through
      // the durable peer session so an old and resumed socket cannot mutate the
      // same room concurrently.
      messageChain = messageChain
        .then(async () => {
          if (msg.type === 'auth' || !conn.peerId) {
            await handleMessage(conn, msg);
          } else {
            const session = getOrCreatePeerSession(conn.peerId);
            session.operationChain = session.operationChain.then(() => handleMessage(conn, msg));
            await session.operationChain;
          }

          if (msg.type === 'joinRoom' && conn.peerId && conn.roomId) {
            let roomMap = roomConnections.get(conn.roomId);
            if (!roomMap) {
              roomMap = new Map();
              roomConnections.set(conn.roomId, roomMap);
            }
            roomMap.set(conn.peerId, conn);
          }

          if (conn.peerId) {
            const session = getOrCreatePeerSession(conn.peerId);
            session.connection = conn;
            session.roomId = conn.roomId;
            session.lastSeen = Date.now();
          }
        })
        .catch((error) => {
          logger.error(
            { ip, peerId: conn.peerId, error: error instanceof Error ? error.message : String(error) },
            'Serialized signaling handler failed',
          );
        });
    });

    ws.on('close', () => {
      clearInterval(heartbeatTimer);
      metrics.wsConnections.dec();
      untrackConnection(ip, ws);
      allConnections.delete(ws);

      if (conn.peerId) {
        const session = getOrCreatePeerSession(conn.peerId);

        // Ignore closure of a superseded socket after a resumed connection
        // has already taken ownership.
        if (session.connection === conn) {
          session.connection = undefined;
          session.roomId = conn.roomId;
          session.lastSeen = Date.now();

          if (conn.roomId) {
            scheduleSessionCleanup(session);
            broadcastToRoom(conn.roomId, conn.peerId, {
              type: 'peerReconnecting',
              peerId: conn.peerId,
              resumeGraceMs: config.ws.resumeGraceMs,
            });
          } else {
            peerSessions.delete(conn.peerId);
          }
        }
      }

      logger.info(
        { ip, peerId: conn.peerId, roomId: conn.roomId, resumeGraceMs: config.ws.resumeGraceMs },
        'WebSocket disconnected; resumable state retained when applicable',
      );
    });

    ws.on('error', (err) => {
      logger.error({ ip, error: err.message }, 'WebSocket error');
    });
  });
}
