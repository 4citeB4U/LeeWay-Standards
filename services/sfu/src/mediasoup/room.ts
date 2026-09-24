/*
LEEWAY HEADER — DO NOT REMOVE
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render
AUTHORITY: LeeWay-Standards
REGION: SFU.MEDIASOUP.ROOM
TAG: SFU.RTC.ROOM.MANAGER
COLOR_ONION_HEX: NEON=#00FFD1 FLUO=#00B4FF PASTEL=#C7F0FF
ICON_ASCII: family=lucide glyph=layers
5WH:
  WHAT = Mediasoup Room — manages router, transports, producers, consumers per session
  WHY  = Encapsulates all mediasoup state for one named WebRTC room
  WHO  = LEEWAY INNOVATIONS A LEEWAY INDUSTY CREATION
  WHERE = services/sfu/src/mediasoup/room.ts
  WHEN = 2026
  HOW  = One mediasoup Router per room; WebRtcTransport per peer; Producer/Consumer map
AGENTS: ASSESS ALIGN AUDIT
LICENSE: PROPRIETARY
*/
// CHAIN: Standards → Integrated → Runtime → Projections

import type { types } from 'mediasoup';

import { getNextWorker } from './worker.js';
import { config } from '../config.js';
import { logger } from '../logger.js';
import { metrics } from '../metrics.js';

export interface PeerState {
  id: string;
  transports: Map<string, types.WebRtcTransport>;
  producers: Map<string, types.Producer>;
  consumers: Map<string, types.Consumer>;
}

export class Room {
  readonly id: string;
  private readonly router: types.Router;
  private readonly peers = new Map<string, PeerState>();
  private invalidated = false;

  private constructor(id: string, router: types.Router) {
    this.id = id;
    this.router = router;

    router.on('workerclose', () => {
      this.invalidated = true;
      logger.error(
        { roomId: this.id, routerId: router.id },
        'Room router invalidated because its Mediasoup worker closed',
      );

      // Mediasoup closes child transports/producers/consumers with the worker.
      // Clear LeeWay ownership maps so stale objects are never reused.
      for (const peer of this.peers.values()) {
        for (const consumer of peer.consumers.values()) {
          metrics.consumers.dec({ kind: consumer.kind });
        }
        for (const producer of peer.producers.values()) {
          metrics.producers.dec({ kind: producer.kind });
        }
        peer.consumers.clear();
        peer.producers.clear();
        peer.transports.clear();
      }
      this.peers.clear();
    });
  }

  static async create(id: string): Promise<Room> {
    const worker = getNextWorker();
    const router = await worker.createRouter({
      mediaCodecs: config.mediasoup.routerMediaCodecs as unknown as types.RtpCodecCapability[],
    });
    logger.info({ roomId: id, routerId: router.id }, 'Room created');
    metrics.rooms.inc();
    return new Room(id, router);
  }

  get routerRtpCapabilities(): types.RtpCapabilities {
    if (!this.isUsable()) throw new Error(`Room ${this.id} router is not usable`);
    return this.router.rtpCapabilities;
  }

  isUsable(): boolean {
    return !this.invalidated && !this.router.closed;
  }

  addPeer(peerId: string): PeerState {
    const existing = this.peers.get(peerId);
    if (existing) return existing;

    const peer: PeerState = {
      id: peerId,
      transports: new Map(),
      producers: new Map(),
      consumers: new Map(),
    };
    this.peers.set(peerId, peer);
    logger.info({ roomId: this.id, peerId }, 'Peer joined room');
    return peer;
  }

  removePeer(peerId: string): void {
    const peer = this.peers.get(peerId);
    if (!peer) return;

    for (const consumer of peer.consumers.values()) {
      consumer.close();
      metrics.consumers.dec({ kind: consumer.kind });
    }
    for (const producer of peer.producers.values()) {
      producer.close();
      metrics.producers.dec({ kind: producer.kind });
    }
    for (const transport of peer.transports.values()) {
      transport.close();
    }

    this.peers.delete(peerId);
    logger.info({ roomId: this.id, peerId }, 'Peer left room');
  }

  getPeer(peerId: string): PeerState | undefined {
    return this.peers.get(peerId);
  }

  getPeers(): IterableIterator<PeerState> {
    return this.peers.values();
  }

  getPeerCount(): number {
    return this.peers.size;
  }

  /**
   * Get all active producers across all peers (except optionally one peer).
   */
  getOtherProducers(excludePeerId?: string): Array<{ peerId: string; producer: types.Producer }> {
    const result: Array<{ peerId: string; producer: types.Producer }> = [];
    for (const [peerId, peer] of this.peers) {
      if (peerId === excludePeerId) continue;
      for (const producer of peer.producers.values()) {
        result.push({ peerId, producer });
      }
    }
    return result;
  }

  async createWebRtcTransport(peerId: string): Promise<types.WebRtcTransport> {
    const end = metrics.transportCreation.startTimer();

    const listenInfos: Array<{
      protocol: 'udp' | 'tcp';
      ip: string;
      announcedAddress?: string;
    }> = [
      {
        protocol: 'udp',
        ip: '0.0.0.0',
        announcedAddress: config.mediasoup.announcedIp,
      },
      {
        protocol: 'tcp',
        ip: '0.0.0.0',
        announcedAddress: config.mediasoup.announcedIp,
      },
    ];

    const transport = await this.router.createWebRtcTransport({
      listenInfos,
      enableUdp: true,
      enableTcp: true,
      preferUdp: true,
      enableSctp: false,
    });

    const peer = this.peers.get(peerId);
    if (!peer) throw new Error(`Peer ${peerId} not found in room ${this.id}`);
    peer.transports.set(transport.id, transport);

    transport.on('dtlsstatechange', (state: string) => {
      if (state === 'failed' || state === 'closed') {
        logger.warn({ transportId: transport.id, state }, 'DTLS state changed');
      }
      if (state === 'closed') {
        peer.transports.delete(transport.id);
      }
    });

    end();
    logger.info({ roomId: this.id, peerId, transportId: transport.id }, 'Transport created');
    return transport;
  }

  async connectTransport(
    peerId: string,
    transportId: string,
    dtlsParameters: types.DtlsParameters,
  ): Promise<void> {
    const peer = this.peers.get(peerId);
    if (!peer) throw new Error(`Peer ${peerId} not in room`);
    const transport = peer.transports.get(transportId);
    if (!transport) throw new Error(`Transport ${transportId} not found`);
    await transport.connect({ dtlsParameters });
    logger.info({ roomId: this.id, peerId, transportId }, 'Transport connected');
  }

  async produce(
    peerId: string,
    transportId: string,
    rtpParameters: types.RtpParameters,
    kind: 'audio' | 'video',
  ): Promise<types.Producer> {
    const peer = this.peers.get(peerId);
    if (!peer) throw new Error(`Peer ${peerId} not in room`);
    const transport = peer.transports.get(transportId);
    if (!transport) throw new Error(`Transport ${transportId} not found`);

    const producer = await transport.produce({ kind, rtpParameters });
    peer.producers.set(producer.id, producer);
    metrics.producers.inc({ kind });

    producer.on('transportclose', () => {
      peer.producers.delete(producer.id);
      metrics.producers.dec({ kind: producer.kind });
    });

    logger.info({ roomId: this.id, peerId, producerId: producer.id, kind }, 'Producer created');
    return producer;
  }

  async consume(
    peerId: string,
    transportId: string,
    producerId: string,
    rtpCapabilities: types.RtpCapabilities,
  ): Promise<types.Consumer> {
    if (!this.router.canConsume({ producerId, rtpCapabilities })) {
      throw new Error('Cannot consume: incompatible RTP capabilities');
    }

    const peer = this.peers.get(peerId);
    if (!peer) throw new Error(`Peer ${peerId} not in room`);
    const transport = peer.transports.get(transportId);
    if (!transport) throw new Error(`Transport ${transportId} not found`);

    const consumer = await transport.consume({
      producerId,
      rtpCapabilities,
      paused: true, // client must call resume after being ready
    });

    peer.consumers.set(consumer.id, consumer);
    metrics.consumers.inc({ kind: consumer.kind });

    consumer.on('transportclose', () => {
      peer.consumers.delete(consumer.id);
      metrics.consumers.dec({ kind: consumer.kind });
    });

    consumer.on('producerclose', () => {
      peer.consumers.delete(consumer.id);
      metrics.consumers.dec({ kind: consumer.kind });
    });

    logger.info(
      { roomId: this.id, peerId, consumerId: consumer.id, producerId, kind: consumer.kind },
      'Consumer created',
    );
    return consumer;
  }

  close(): void {
    for (const peer of this.peers.values()) {
      this.removePeer(peer.id);
    }
    this.router.close();
    metrics.rooms.dec();
    logger.info({ roomId: this.id }, 'Room closed');
  }
}

// ─── Room Registry ──────────────────────────────────────────────────────────

const rooms = new Map<string, Room>();
const roomCreations = new Map<string, Promise<Room>>();

export function getOrCreateRoom(roomId: string): Promise<Room> {
  const existing = rooms.get(roomId);
  if (existing?.isUsable()) return Promise.resolve(existing);
  if (existing) {
    rooms.delete(roomId);
    logger.warn({ roomId }, 'Discarded unusable room before recreation');
  }

  const inFlight = roomCreations.get(roomId);
  if (inFlight) return inFlight;

  const creation = Room.create(roomId)
    .then((room) => {
      rooms.set(roomId, room);
      return room;
    })
    .finally(() => {
      roomCreations.delete(roomId);
    });

  roomCreations.set(roomId, creation);
  return creation;
}

export function getRoom(roomId: string): Room | undefined {
  const room = rooms.get(roomId);
  if (!room) return undefined;
  if (room.isUsable()) return room;
  rooms.delete(roomId);
  return undefined;
}

export function getRooms(): Room[] {
  return [...rooms.values()];
}

export function deleteRoom(roomId: string): void {
  const room = rooms.get(roomId);
  if (!room) return;
  room.close();
  rooms.delete(roomId);
  logger.info({ roomId }, 'Room registry entry deleted');
}
