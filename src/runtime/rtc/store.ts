/*
LEEWAY HEADER — DO NOT REMOVE
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render
AUTHORITY: LeeWay-Standards
REGION: CLIENT.RTC.STORE
TAG: CLIENT.RTC.HOOK.USESTORE
COLOR_ONION_HEX: NEON=#00FFD1 FLUO=#00B4FF PASTEL=#C7F0FF
ICON_ASCII: family=lucide glyph=zap
5WH:
  WHAT = Real useRTCStore hook — connects to LeeWay SFU via WebSocket + mediasoup-client
  WHY  = Replaces the mock store in LeeWay-Edge_RTC.tsx with live SFU signaling,
         transport management, consumer negotiation, and stats polling
  WHO  = LEEWAY INNOVATIONS A LEEWAY INDUSTY CREATION
  WHERE = src/rtc/store.ts
  WHEN = 2026
  HOW  = Fetch JWT from /dev/token → open WS → auth → load mediasoup Device →
         joinRoom → createRecvTransport → consume producers → poll getStats every 2s
AGENTS: ASSESS ALIGN AUDIT
LICENSE: PROPRIETARY
*/
// CHAIN: Standards → Integrated → Runtime → Projections


import { useCallback, useEffect, useRef, useState } from 'react';
import * as mediasoupClient from 'mediasoup-client';
import { VectorAgent } from './vector-agent';
import { handleFallback, MeshFallback } from './mesh-fallback';
import { FederationRouter, SfuNode } from './federation-router';

declare global {
  interface Window {
    vectorAgentInst?: VectorAgent;
    meshFallbackInst?: MeshFallback;
  }
}

// ---------------------------------------------------------------------------
// Shared types (re-exported so LeeWay-Edge_RTC.tsx can import from one place)
// ---------------------------------------------------------------------------

export type ConnectionState =
  | 'new'
  | 'connecting'
  | 'connected'
  | 'disconnected'
  | 'failed'
  | 'closed';

export type IceConnectionState =
  | 'new'
  | 'checking'
  | 'connected'
  | 'completed'
  | 'failed'
  | 'disconnected'
  | 'closed';

export interface PeerStats {
  id: string;
  name: string;
  bitrate: number;
  packetLoss: number;
  rtt: number;
  jitter: number;
  audioLevel: number;
  videoResolution?: string;
  isLocal?: boolean;
  state?: 'connected' | 'connecting' | 'degraded';
  transport?: 'direct' | 'turn' | 'unknown';
  audio?: boolean;
  video?: boolean;
  screen?: boolean;
}

export interface RTCEvent {
  id: string;
  timestamp: number;
  type: 'signaling' | 'rtc' | 'sfu' | 'turn' | 'system';
  level: 'info' | 'warn' | 'error' | 'success';
  message: string;
  source?: string;
}

export interface RTCState {
  roomName: string;
  peerId: string;
  connectionState: ConnectionState;
  iceState: IceConnectionState;
  signalingState: string;
  isRelay: boolean;
  selectedCandidatePair: string;
  peers: PeerStats[];
  events: RTCEvent[];
}

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

// Vite proxies /ws → SFU ws://localhost:3000 and /dev → SFU http://localhost:3000
const WS_URL = () =>
  (import.meta as { env?: Record<string, string> }).env?.['VITE_SIGNALING_URL']
    ?? `ws://${window.location.host}/ws`;

const TOKEN_URL =
  ((import.meta as { env?: Record<string, string> }).env?.['VITE_HTTP_BASE_URL'] ?? '') +
  '/dev/token';

const DEFAULT_ROOM = 'leeway-main';
const PEER_ID_STORAGE_KEY = 'leeway.rtc.peer-id.v1';

function getStablePeerId(): string {
  try {
    const existing = window.localStorage.getItem(PEER_ID_STORAGE_KEY);
    if (existing && /^[A-Za-z0-9._:-]{8,128}$/.test(existing)) return existing;
    const generated = `operator-${crypto.randomUUID()}`;
    window.localStorage.setItem(PEER_ID_STORAGE_KEY, generated);
    return generated;
  } catch {
    // Browser storage may be unavailable in hardened/private contexts.
    // The session still works, but durable resume cannot span page reload.
    return `operator-${crypto.randomUUID()}`;
  }
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

let _msgId = 0;
function nextId() {
  return ++_msgId;
}

const INITIAL_STATE: RTCState = {
  roomName: DEFAULT_ROOM,
  peerId: '',
  connectionState: 'new',
  iceState: 'new',
  signalingState: 'stable',
  isRelay: false,
  selectedCandidatePair: 'N/A',
  peers: [],
  events: [],
};

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export interface RTCStoreAPI {
  state: RTCState;
  addEvent: (event: Omit<RTCEvent, 'id' | 'timestamp'>) => void;
  connect: (roomId?: string) => Promise<void>;
  disconnect: () => void;
  publish: (video?: boolean) => Promise<void>;
  stopPublish: () => Promise<void>;
  isPublishing: boolean;
}

export function useRTCStore(): RTCStoreAPI {
  const [state, setState] = useState<RTCState>(INITIAL_STATE);
  const [isPublishing, setIsPublishing] = useState(false);

  const wsRef           = useRef<WebSocket | null>(null);
  const deviceRef       = useRef<mediasoupClient.Device | null>(null);
  const sendTransRef    = useRef<mediasoupClient.types.Transport | null>(null);
  const recvTransRef    = useRef<mediasoupClient.types.Transport | null>(null);
  const producersRef    = useRef<Map<string, mediasoupClient.types.Producer>>(new Map());
  const localStreamRef  = useRef<MediaStream | null>(null);
  const statsTimerRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectAttemptRef = useRef(0);
  const manualDisconnectRef = useRef(false);
  const connectRef = useRef<((roomId?: string) => Promise<void>) | null>(null);
  const roomRef = useRef(DEFAULT_ROOM);
  const pendingRef      = useRef<
    Map<number, {
      resolve: (d: unknown) => void;
      reject: (e: Error) => void;
      timer: ReturnType<typeof setTimeout>;
    }>
  >(new Map());

  // ── addEvent ──────────────────────────────────────────────────────────────
  const addEvent = useCallback((event: Omit<RTCEvent, 'id' | 'timestamp'>) => {
    setState(prev => ({
      ...prev,
      events: [
        { ...event, id: crypto.randomUUID(), timestamp: Date.now() },
        ...prev.events,
      ].slice(0, 100),
    }));
  }, []);

  // ── request (WS RPC) ──────────────────────────────────────────────────────
  const request = useCallback(<T = unknown>(type: string, data: Record<string, unknown> = {}): Promise<T> => {
    return new Promise<T>((resolve, reject) => {
      const ws = wsRef.current;
      if (!ws || ws.readyState !== WebSocket.OPEN) {
        reject(new Error('WebSocket not open'));
        return;
      }

      const id = nextId();

      // Request timeout is a deployment profile, not a universal latency law.
      // It deliberately exceeds the default server resume grace so a response
      // queued during a transient disconnect can still settle after resume.
      const timeoutMs = 45000;
      const timer = setTimeout(() => {
        const pending = pendingRef.current.get(id);
        if (!pending) return;
        pendingRef.current.delete(id);
        pending.reject(new Error(`RTC RPC timeout: ${type}`));
      }, timeoutMs);

      pendingRef.current.set(id, {
        resolve: resolve as (d: unknown) => void,
        reject,
        timer,
      });
      ws.send(JSON.stringify({ id, type, ...data }));
    });
  }, []);

  // ── pollStats ─────────────────────────────────────────────────────────────
  const pollStats = useCallback(async () => {
    const reports: RTCStatsReport[] = [];
    if (sendTransRef.current) {
      try { reports.push(await sendTransRef.current.getStats()); } catch { /* noop */ }
    }
    if (recvTransRef.current) {
      try { reports.push(await recvTransRef.current.getStats()); } catch { /* noop */ }
    }
    if (reports.length === 0) return;

    let rtt = 0, bitrateOut = 0, packetLoss = 0, jitter = 0;
    let isRelay = false, candidatePair = 'N/A';

    for (const report of reports) {
      for (const raw of report.values()) {
        const s = raw as Record<string, unknown>;
        if (s['type'] === 'candidate-pair' && s['state'] === 'succeeded') {
          if (typeof s['currentRoundTripTime'] === 'number')
            rtt = Math.max(rtt, (s['currentRoundTripTime'] as number) * 1000);
          if (typeof s['availableOutgoingBitrate'] === 'number')
            bitrateOut = Math.max(bitrateOut, (s['availableOutgoingBitrate'] as number) / 1000);
        }
        if (s['type'] === 'remote-candidate' && String(s['candidateType']) === 'relay') {
          isRelay = true;
          candidatePair = `relay → ${String(s['address'] ?? 'TURN')}:${String(s['port'] ?? '')}`;
        }
        if (s['type'] === 'outbound-rtp' && typeof s['bytesSent'] === 'number')
          bitrateOut = Math.max(bitrateOut, (s['bytesSent'] as number) * 8 / 1000);
        if (s['type'] === 'inbound-rtp') {
          if (typeof s['jitter'] === 'number')
            jitter = Math.max(jitter, (s['jitter'] as number) * 1000);
          const received = (s['packetsReceived'] as number) ?? 0;
          const lost     = (s['packetsLost'] as number) ?? 0;
          if (received > 0)
            packetLoss = Math.max(packetLoss, (lost / (received + lost)) * 100);
        }
      }
    }

    setState(prev => {
      // Feed data to VECTOR
      if (!window.vectorAgentInst) window.vectorAgentInst = new VectorAgent();
      window.vectorAgentInst.push({ rtt, packetLoss, jitter, bitrate: bitrateOut });
      
      const action = window.vectorAgentInst.decision();
      if (action === 'reroute') {
        console.warn('VECTOR: Switching SFU / Rerouting');
        // federation failover trigger goes here
      } else if (action === 'degrade') {
        console.warn('VECTOR: Lowering quality / degrading video pipeline');
      }

      // Check mesh fallback conditions
      if (!window.meshFallbackInst) window.meshFallbackInst = new MeshFallback();
      if (prev.connectionState === 'failed' || prev.iceState === 'failed' || (!isRelay && rtt > 800)) {
         handleFallback(prev, window.meshFallbackInst).catch(console.error);
      }

      return {
        ...prev,
        isRelay,
        selectedCandidatePair: isRelay ? candidatePair : prev.selectedCandidatePair,
        peers: prev.peers.map((p, i) =>
          i === 0 ? { ...p, rtt, bitrate: bitrateOut, packetLoss, jitter } : p,
        ),
      };
    });
  }, []);

  // ── connect ───────────────────────────────────────────────────────────────
  const connect = useCallback(async (roomId: string = DEFAULT_ROOM) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return; // already connected

    manualDisconnectRef.current = false;
    roomRef.current = roomId;
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }

    setState(prev => ({ ...prev, connectionState: 'connecting', roomName: roomId }));
    addEvent({ type: 'signaling', level: 'info', message: 'Fetching session token...', source: 'AUTH' });

    const MAX_RETRIES = 3;
    const BASE_DELAY = 1000; // 1s

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        // 1. JWT
        const sub = getStablePeerId();
        const tokenResp = await fetch(TOKEN_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sub }),
        });
        if (!tokenResp.ok) throw new Error(`Token request failed: ${tokenResp.status}`);
        const { token } = (await tokenResp.json()) as { token: string };
        addEvent({ type: 'signaling', level: 'success', message: 'JWT issued — opening WebSocket...', source: 'AUTH' });

        // 2. WebSocket with timeout
        const wsUrl = WS_URL();
        const ws = new WebSocket(wsUrl);
        let allowAutoReconnect = false;
        wsRef.current = ws;

        const WS_OPEN_TIMEOUT = 10000; // 10s timeout
        await new Promise<void>((res, rej) => {
          const timer = setTimeout(() => {
            ws.close();
            rej(new Error(`WebSocket connection timeout (${WS_OPEN_TIMEOUT}ms). URL: ${wsUrl}`));
          }, WS_OPEN_TIMEOUT);

          ws.onopen = () => {
            clearTimeout(timer);
            res();
          };
          ws.onerror = (evt) => {
            clearTimeout(timer);
            const err = new Error(`WebSocket connection failed. URL: ${wsUrl}. Check if SFU server is running on port 3000.`);
            rej(err);
          };
        });
        addEvent({ type: 'signaling', level: 'info', message: `Connected to LeeWay SFU Uplink`, source: 'SIGNAL' });

      // 3. Message router
      ws.onmessage = (evt) => {
        const msg = JSON.parse(evt.data as string) as Record<string, unknown>;

        // RPC response
        if (msg['id'] !== undefined) {
          const pending = pendingRef.current.get(msg['id'] as number);
          if (pending) {
            pendingRef.current.delete(msg['id'] as number);
            clearTimeout(pending.timer);
            if (msg['ok'] === false)
              pending.reject(new Error(String(msg['error'] ?? 'RPC error')));
            else
              pending.resolve(msg);
          }
          return;
        }

        // Server-push events
        if (msg['type'] === 'newProducer') {
          addEvent({ type: 'sfu', level: 'info', message: `New ${String(msg['kind'])} producer from peer ${String(msg['peerId']).slice(0, 8)}`, source: 'SFU' });
        }
        if (msg['type'] === 'peerLeft') {
          const pid = String(msg['peerId']);
          setState(prev => ({ ...prev, peers: prev.peers.filter(p => p.id !== pid) }));
          addEvent({ type: 'sfu', level: 'warn', message: `Peer disconnected: ${pid.slice(0, 8)}`, source: 'SFU' });
        }
        if (msg['type'] === 'agentEvent') {
          const lvl = String(msg['level']) as RTCEvent['level'];
          addEvent({ type: 'system', level: lvl, message: `[${String(msg['codename'])}] ${String(msg['msg'])}`, source: String(msg['codename']) });
        }
      };

      ws.onclose = () => {
        if (wsRef.current === ws) wsRef.current = null;
        setState(prev => ({ ...prev, connectionState: 'disconnected' }));
        addEvent({ type: 'signaling', level: 'warn', message: 'WebSocket closed', source: 'SIGNAL' });
        if (statsTimerRef.current) {
          clearInterval(statsTimerRef.current);
          statsTimerRef.current = null;
        }

        if (!manualDisconnectRef.current && allowAutoReconnect) {
          const attempt = reconnectAttemptRef.current++;
          const delay = Math.min(1000 * Math.pow(2, attempt), 8000);
          addEvent({
            type: 'signaling',
            level: 'warn',
            message: `Signaling recovery scheduled in ${delay}ms (attempt ${attempt + 1})`,
            source: 'SIGNAL',
          });
          if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
          reconnectTimerRef.current = setTimeout(() => {
            reconnectTimerRef.current = null;
            void connectRef.current?.(roomRef.current);
          }, delay);
        }
      };

      // 4. Auth
      const authResp = await request<{
        peerId: string;
        resumed?: boolean;
        roomId?: string;
        resumeGraceMs?: number;
      }>('auth', { token });
      const { peerId } = authResp;
      setState(prev => ({ ...prev, peerId }));

      const recvState = recvTransRef.current?.connectionState;
      const sendState = sendTransRef.current?.connectionState;
      const mediaHealthy =
        Boolean(recvTransRef.current) &&
        recvState !== 'failed' &&
        recvState !== 'closed' &&
        (!sendTransRef.current || (sendState !== 'failed' && sendState !== 'closed'));

      if (authResp.resumed && authResp.roomId === roomId && mediaHealthy) {
        reconnectAttemptRef.current = 0;
        setState(prev => ({
          ...prev,
          connectionState: 'connected',
          signalingState: 'stable',
          iceState: recvState === 'connected' ? 'connected' : prev.iceState,
        }));
        if (statsTimerRef.current) clearInterval(statsTimerRef.current);
        statsTimerRef.current = setInterval(() => { void pollStats(); }, 2000);
        addEvent({
          type: 'signaling',
          level: 'success',
          message: `Signaling resumed for room "${roomId}" without replacing healthy media transports`,
          source: 'LEEWAY',
        });
        allowAutoReconnect = true;
        return;
      }

      if (authResp.resumed && authResp.roomId) {
        // Server retained the prior room during the grace window, but the local
        // media transport is no longer safe to reuse. Release the retained
        // server-side transports before a clean rebuild.
        await request('leaveRoom').catch(() => null);
        for (const producer of producersRef.current.values()) producer.close();
        producersRef.current.clear();
        sendTransRef.current?.close();
        sendTransRef.current = null;
        recvTransRef.current?.close();
        recvTransRef.current = null;
        deviceRef.current = null;
        addEvent({
          type: 'rtc',
          level: 'warn',
          message: 'Retained signaling session found with unhealthy media; rebuilding transports',
          source: 'RTC',
        });
      }

      // 5. mediasoup Device
      const device = new mediasoupClient.Device();
      deviceRef.current = device;

      // 6. Join room
      const joinResp = await request<{
        routerRtpCapabilities: mediasoupClient.types.RtpCapabilities;
        existingProducers: Array<{ producerId: string; peerId: string; kind: 'audio' | 'video' }>;
      }>('joinRoom', { roomId, rtpCapabilities: {} });

      await device.load({ routerRtpCapabilities: joinResp.routerRtpCapabilities });
      addEvent({ type: 'sfu', level: 'info', message: `Joined room "${roomId}" (${joinResp.existingProducers.length} producers)`, source: 'SFU' });

      // 7. Recv transport
      const recvInfo = await request<{
        transportId: string;
        iceParameters: mediasoupClient.types.IceParameters;
        iceCandidates: mediasoupClient.types.IceCandidate[];
        dtlsParameters: mediasoupClient.types.DtlsParameters;
      }>('createTransport', { direction: 'recv' });

      const recvTransport = device.createRecvTransport({
        id:             recvInfo.transportId,
        iceParameters:  recvInfo.iceParameters,
        iceCandidates:  recvInfo.iceCandidates,
        dtlsParameters: recvInfo.dtlsParameters,
      });
      recvTransRef.current = recvTransport;

      recvTransport.on('connect', ({ dtlsParameters }, cb, eb) => {
        request('connectTransport', { transportId: recvTransport.id, dtlsParameters })
          .then(() => cb()).catch(eb);
      });

      recvTransport.on('connectionstatechange', (s) => {
        const iceMap: Record<string, IceConnectionState> = {
          new: 'new', connecting: 'checking', connected: 'connected',
          failed: 'failed', disconnected: 'disconnected', closed: 'closed',
        };
        setState(prev => ({
          ...prev,
          iceState: iceMap[s] ?? 'new',
          signalingState: s === 'connected' ? 'stable' : prev.signalingState,
        }));
        if (s === 'connected')
          addEvent({ type: 'rtc', level: 'success', message: 'WebRTC Transport connected', source: 'RTC' });
      });

      // 8. Mark connected + add local peer
      setState(prev => ({
        ...prev,
        connectionState: 'connected',
        iceState: 'connected',
        peers: [{
          id: peerId,
          name: `operator-${peerId.slice(0, 5)}`,
          bitrate: 0, packetLoss: 0, rtt: 0, jitter: 0, audioLevel: 0,
          isLocal: true, state: 'connected', transport: 'direct',
          audio: false, video: false, screen: false,
        }],
      }));
      reconnectAttemptRef.current = 0;
      addEvent({ type: 'signaling', level: 'success', message: 'LeeWay Edge RTC session established', source: 'LEEWAY' });

      // 9. Consume existing producers
      for (const ep of joinResp.existingProducers) {
        try {
          const c = await request<{
            consumerId: string;
            kind: 'audio' | 'video';
            rtpParameters: mediasoupClient.types.RtpParameters;
          }>('consume', {
            transportId:     recvInfo.transportId,
            producerId:      ep.producerId,
            rtpCapabilities: device.rtpCapabilities,
          });

          const consumer = await recvTransport.consume({
            id:            c.consumerId,
            producerId:    ep.producerId,
            kind:          c.kind,
            rtpParameters: c.rtpParameters,
          });
          await request('resumeConsumer', { consumerId: consumer.id });

          setState(prev => {
            const exists = prev.peers.find(p => p.id === ep.peerId);
            if (exists) {
              return { ...prev, peers: prev.peers.map(p => p.id === ep.peerId ? { ...p, [ep.kind]: true } : p) };
            }
            return {
              ...prev,
              peers: [...prev.peers, {
                id: ep.peerId,
                name: `peer-${ep.peerId.slice(0, 5)}`,
                bitrate: 0, packetLoss: 0, rtt: 0, jitter: 0, audioLevel: 0,
                state: 'connected', transport: 'direct',
                audio: ep.kind === 'audio',
                video: ep.kind === 'video',
                screen: false,
              }],
            };
          });
        } catch (err) {
          console.warn('[LeeWay RTC] consume failed for producer', ep.producerId, err);
        }
      }

      // 10. Restore already-authorized local tracks after a full transport
      // rebuild. Reuse the existing MediaStream; do not re-prompt the user.
      const retainedTracks = localStreamRef.current?.getTracks().filter(t => t.readyState === 'live') ?? [];
      if (retainedTracks.length > 0) {
        const sendInfo = await request<{
          transportId: string;
          iceParameters: mediasoupClient.types.IceParameters;
          iceCandidates: mediasoupClient.types.IceCandidate[];
          dtlsParameters: mediasoupClient.types.DtlsParameters;
        }>('createTransport', { direction: 'send' });

        const sendTransport = device.createSendTransport({
          id:             sendInfo.transportId,
          iceParameters:  sendInfo.iceParameters,
          iceCandidates:  sendInfo.iceCandidates,
          dtlsParameters: sendInfo.dtlsParameters,
        });
        sendTransRef.current = sendTransport;

        sendTransport.on('connect', ({ dtlsParameters }, cb, eb) => {
          request('connectTransport', { transportId: sendTransport.id, dtlsParameters })
            .then(() => cb()).catch(eb);
        });
        sendTransport.on('produce', ({ kind, rtpParameters }, cb, eb) => {
          request<{ producerId: string }>('produce', {
            transportId: sendTransport.id,
            kind,
            rtpParameters,
          }).then(({ producerId }) => cb({ id: producerId })).catch(eb);
        });

        for (const track of retainedTracks) {
          const producer = await sendTransport.produce({ track });
          producersRef.current.set(producer.id, producer);
          producer.on('transportclose', () => producersRef.current.delete(producer.id));
        }

        const hasAudio = retainedTracks.some(t => t.kind === 'audio');
        const hasVideo = retainedTracks.some(t => t.kind === 'video');
        setIsPublishing(true);
        setState(prev => ({
          ...prev,
          peers: prev.peers.map(p => p.isLocal ? { ...p, audio: hasAudio, video: hasVideo } : p),
        }));
        addEvent({
          type: 'rtc',
          level: 'success',
          message: 'Restored previously authorized local media tracks after reconnect',
          source: 'RTC',
        });
      }

      // 11. Stats polling
      if (statsTimerRef.current) clearInterval(statsTimerRef.current);
      statsTimerRef.current = setInterval(() => { void pollStats(); }, 2000);

        // Connection succeeded — future socket loss may now invoke the
        // autonomous recovery path.
        allowAutoReconnect = true;
        return;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        wsRef.current?.close();
        wsRef.current = null;

        if (attempt < MAX_RETRIES - 1) {
          const delay = BASE_DELAY * Math.pow(2, attempt); // exponential backoff
          addEvent({
            type: 'system',
            level: 'warn',
            message: `Connection attempt ${attempt + 1} failed: ${msg}. Retrying in ${delay}ms...`,
            source: 'SYSTEM'
          });
          await new Promise(resolve => setTimeout(resolve, delay));
        } else {
          setState(prev => ({ ...prev, connectionState: 'failed' }));
          addEvent({ type: 'system', level: 'error', message: `Connection failed after ${MAX_RETRIES} attempts: ${msg}`, source: 'SYSTEM' });
        }
      }
    }
  }, [request, pollStats, addEvent]);

  connectRef.current = connect;

  // ── disconnect ────────────────────────────────────────────────────────────
  const disconnect = useCallback(() => {
    manualDisconnectRef.current = true;
    reconnectAttemptRef.current = 0;

    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }
    if (statsTimerRef.current) {
      clearInterval(statsTimerRef.current);
      statsTimerRef.current = null;
    }

    // Explicit owner disconnect should release server room state immediately.
    const ws = wsRef.current;
    if (ws?.readyState === WebSocket.OPEN) {
      try {
        ws.send(JSON.stringify({ type: 'leaveRoom' }));
      } catch { /* best effort; server grace cleanup remains fallback */ }
    }

    for (const [id, pending] of pendingRef.current) {
      clearTimeout(pending.timer);
      pending.reject(new Error('RTC session disconnected by owner'));
      pendingRef.current.delete(id);
    }

    for (const producer of producersRef.current.values()) producer.close();
    producersRef.current.clear();

    localStreamRef.current?.getTracks().forEach(t => t.stop());
    localStreamRef.current = null;

    sendTransRef.current?.close();
    sendTransRef.current = null;
    recvTransRef.current?.close();
    recvTransRef.current = null;
    deviceRef.current = null;

    ws?.close(1000, 'owner disconnect');
    wsRef.current = null;

    setIsPublishing(false);
    setState({ ...INITIAL_STATE });
    addEvent({
      type: 'system',
      level: 'info',
      message: 'Disconnected — owner terminated the RTC session',
      source: 'LEEWAY',
    });
  }, [addEvent]);

  // ── publish ───────────────────────────────────────────────────────────────
  const publish = useCallback(async (video = false) => {
    const device = deviceRef.current;
    if (!device) throw new Error('Not connected to SFU');

    if (!sendTransRef.current) {
      const info = await request<{
        transportId: string;
        iceParameters: mediasoupClient.types.IceParameters;
        iceCandidates: mediasoupClient.types.IceCandidate[];
        dtlsParameters: mediasoupClient.types.DtlsParameters;
      }>('createTransport', { direction: 'send' });

      const sendTransport = device.createSendTransport({
        id:             info.transportId,
        iceParameters:  info.iceParameters,
        iceCandidates:  info.iceCandidates,
        dtlsParameters: info.dtlsParameters,
      });
      sendTransRef.current = sendTransport;

      sendTransport.on('connect', ({ dtlsParameters }, cb, eb) => {
        request('connectTransport', { transportId: sendTransport.id, dtlsParameters })
          .then(() => cb()).catch(eb);
      });
      sendTransport.on('produce', ({ kind, rtpParameters }, cb, eb) => {
        request<{ producerId: string }>('produce', { transportId: sendTransport.id, kind, rtpParameters })
          .then(({ producerId }) => cb({ id: producerId }))
          .catch(eb);
      });

      addEvent({ type: 'rtc', level: 'success', message: 'Send transport ready', source: 'RTC' });
    }

    const currentStream = localStreamRef.current;
    const liveAudio = currentStream?.getAudioTracks().some(t => t.readyState === 'live') ?? false;
    const liveVideo = currentStream?.getVideoTracks().some(t => t.readyState === 'live') ?? false;

    let stream = currentStream;
    if (!stream || !liveAudio || (video && !liveVideo)) {
      // Reuse already-authorized live tracks where possible. Only acquire a
      // fresh stream when the requested media capability is missing.
      const fresh = await navigator.mediaDevices.getUserMedia({
        audio: !liveAudio,
        video: video && !liveVideo,
      });
      const mergedTracks = [
        ...(currentStream?.getTracks().filter(t => t.readyState === 'live') ?? []),
        ...fresh.getTracks(),
      ];
      stream = new MediaStream(mergedTracks);
      localStreamRef.current = stream;
    }

    for (const track of stream.getTracks()) {
      if ([...producersRef.current.values()].some(p => p.track?.id === track.id)) continue;
      const producer = await sendTransRef.current!.produce({ track });
      producersRef.current.set(producer.id, producer);
      producer.on('transportclose', () => producersRef.current.delete(producer.id));
    }

    setIsPublishing(true);
    setState(prev => ({
      ...prev,
      peers: prev.peers.map(p => p.isLocal ? { ...p, audio: true, video } : p),
    }));
    addEvent({ type: 'sfu', level: 'info', message: `Publishing ${video ? 'audio + video' : 'audio only'}`, source: 'SFU' });
  }, [request, addEvent]);

  // ── stopPublish ───────────────────────────────────────────────────────────
  const stopPublish = useCallback(async () => {
    for (const producer of [...producersRef.current.values()]) {
      await request('closeProducer', { producerId: producer.id }).catch(() => null);
      producer.close();
      producersRef.current.delete(producer.id);
    }
    localStreamRef.current?.getTracks().forEach(t => t.stop());
    localStreamRef.current = null;
    setIsPublishing(false);
    setState(prev => ({
      ...prev,
      peers: prev.peers.map(p => p.isLocal ? { ...p, audio: false, video: false } : p),
    }));
    addEvent({ type: 'sfu', level: 'info', message: 'Stopped publishing media', source: 'SFU' });
  }, [request, addEvent]);

  // ── cleanup on unmount ────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      manualDisconnectRef.current = true;
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
      if (statsTimerRef.current) clearInterval(statsTimerRef.current);
      for (const pending of pendingRef.current.values()) {
        clearTimeout(pending.timer);
        pending.reject(new Error('RTC store unmounted'));
      }
      pendingRef.current.clear();
      for (const producer of producersRef.current.values()) producer.close();
      producersRef.current.clear();
      localStreamRef.current?.getTracks().forEach(t => t.stop());
      sendTransRef.current?.close();
      recvTransRef.current?.close();
      wsRef.current?.close(1000, 'RTC store unmounted');
    };
  }, []);

  return { state, addEvent, connect, disconnect, publish, stopPublish, isPublishing };
}
