/*
LEEWAY HEADER — DO NOT REMOVE
AUTHORITY: LeeWay-Standards
REGION: SFU.MEDIASOUP.WORKER
TAG: SFU.WORKER.RECOVERY
5WH:
  WHAT = Recoverable Mediasoup worker pool with bounded slot replacement
  WHY  = A single worker death must not terminate the entire LeeWay perception transport
  WHO  = LEEWAY INNOVATIONS A LEEWAY INDUSTRY CREATION
  WHERE = services/sfu/src/mediasoup/worker.ts
  WHEN = 2026
  HOW  = Fixed logical worker slots, active/draining/dead state, replacement backoff, health telemetry
AGENTS: ASSESS AUDIT VECTOR SENTINEL
LICENSE: PROPRIETARY
*/
// CHAIN: Standards → Integrated → Runtime → Projections

import * as mediasoup from 'mediasoup';
import type { types } from 'mediasoup';
import { config } from '../config.js';
import { logger } from '../logger.js';
import { metrics } from '../metrics.js';

type WorkerState = 'starting' | 'active' | 'draining' | 'dead' | 'closed';

interface WorkerSlot {
  slot: number;
  worker?: types.Worker;
  state: WorkerState;
  restarts: number;
  lastFailure?: string;
}

const slots: WorkerSlot[] = [];
let nextWorkerIndex = 0;
let closing = false;

async function spawnWorker(slot: WorkerSlot): Promise<types.Worker> {
  slot.state = 'starting';

  const worker = await mediasoup.createWorker({
    logLevel: 'warn',
    logTags: ['info', 'ice', 'dtls', 'rtp', 'srtp', 'rtcp'],
    rtcMinPort: config.mediasoup.rtcMinPort,
    rtcMaxPort: config.mediasoup.rtcMaxPort,
  });

  slot.worker = worker;
  slot.state = 'active';
  slot.lastFailure = undefined;
  metrics.workers.inc({ slot: slot.slot });

  worker.on('died', (error) => {
    metrics.workers.dec({ slot: slot.slot });
    metrics.workerDeaths.inc({ slot: slot.slot });
    slot.state = 'dead';
    slot.lastFailure = error?.message ?? 'worker died';

    logger.error(
      { slot: slot.slot, pid: worker.pid, error },
      'Mediasoup worker died; preserving process and scheduling slot recovery',
    );

    if (closing) return;

    slot.restarts += 1;
    const delay = Math.min(1000 * Math.pow(2, Math.min(slot.restarts - 1, 4)), 16000);

    setTimeout(() => {
      if (closing || slot.state !== 'dead') return;
      void spawnWorker(slot)
        .then((replacement) => {
          metrics.workerRestarts.inc({ slot: slot.slot });
          logger.info(
            { slot: slot.slot, pid: replacement.pid, restarts: slot.restarts },
            'Mediasoup worker slot recovered',
          );
        })
        .catch((replacementError) => {
          slot.state = 'dead';
          slot.lastFailure =
            replacementError instanceof Error ? replacementError.message : String(replacementError);
          logger.error(
            { slot: slot.slot, error: slot.lastFailure },
            'Mediasoup worker slot replacement failed',
          );

          // Trigger the same bounded recovery scheduler without exiting the
          // entire perception transport process.
          slot.restarts += 1;
          const retryDelay = Math.min(
            1000 * Math.pow(2, Math.min(slot.restarts - 1, 4)),
            16000,
          );
          setTimeout(() => {
            if (closing || slot.state !== 'dead') return;
            void spawnWorker(slot).catch((err) => {
              logger.error(
                { slot: slot.slot, error: err instanceof Error ? err.message : String(err) },
                'Mediasoup worker slot retry failed',
              );
            });
          }, retryDelay);
        });
    }, delay);
  });

  logger.info({ pid: worker.pid, slot: slot.slot }, 'Mediasoup worker active');
  return worker;
}

/**
 * Spawn the configured logical worker slots.
 * MEDIASOUP_NUM_WORKERS remains an explicit deployment/Formula-controlled
 * profile input; this module does not invent a universal worker count.
 */
export async function createWorkers(): Promise<void> {
  const { numWorkers } = config.mediasoup;
  logger.info({ numWorkers }, 'Creating Mediasoup worker slots');

  slots.length = 0;
  nextWorkerIndex = 0;
  closing = false;

  for (let slotId = 0; slotId < numWorkers; slotId++) {
    const slot: WorkerSlot = {
      slot: slotId,
      state: 'starting',
      restarts: 0,
    };
    slots.push(slot);
    await spawnWorker(slot);
  }
}

/**
 * Round-robin only across healthy active workers.
 */
export function getNextWorker(): types.Worker {
  const active = slots.filter(
    (slot) => slot.state === 'active' && slot.worker && !slot.worker.closed,
  );

  if (active.length === 0) {
    throw new Error('No active Mediasoup workers available');
  }

  const selected = active[nextWorkerIndex % active.length];
  nextWorkerIndex = (nextWorkerIndex + 1) % active.length;
  return selected.worker!;
}

export function getWorkerStatus() {
  return slots.map((slot) => ({
    slot: slot.slot,
    pid: slot.worker?.pid ?? null,
    state: slot.state,
    restarts: slot.restarts,
    lastFailure: slot.lastFailure ?? null,
  }));
}

export function drainWorker(slotId: number): boolean {
  const slot = slots.find((candidate) => candidate.slot === slotId);
  if (!slot || slot.state !== 'active') return false;
  slot.state = 'draining';
  logger.warn({ slot: slotId, pid: slot.worker?.pid }, 'Mediasoup worker marked draining');
  return true;
}

/**
 * Gracefully close all workers.
 */
export async function closeWorkers(): Promise<void> {
  closing = true;

  for (const slot of slots) {
    if (slot.state === 'active') metrics.workers.dec({ slot: slot.slot });
    slot.state = 'closed';
    slot.worker?.close();
    slot.worker = undefined;
  }

  slots.length = 0;
  nextWorkerIndex = 0;
}
