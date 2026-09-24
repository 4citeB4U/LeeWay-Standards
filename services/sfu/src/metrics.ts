/*
LEEWAY HEADER — DO NOT REMOVE
AUTHORITY: LeeWay-Standards
REGION: SFU.METRICS
TAG: SFU.METRICS.NATIVE
5WH:
  WHAT = Dependency-free SFU metrics registry
  WHY  = Restore the canonical metrics surface required by SFU, VECTOR, Sentinel and /metrics
  WHO  = LEEWAY INNOVATIONS A LEEWAY INDUSTRY CREATION
  WHERE = services/sfu/src/metrics.ts
  WHEN = 2026
  HOW  = In-process counters + labeled counters + duration summaries with Prometheus text/JSON export
AGENTS: ASSESS AUDIT VECTOR SENTINEL
LICENSE: PROPRIETARY
*/

type Labels = Record<string, string | number | boolean | undefined>;

function labelKey(labels?: Labels): string {
  if (!labels) return '';
  return Object.entries(labels)
    .filter(([, value]) => value !== undefined)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${String(value)}`)
    .join(',');
}

function prometheusLabels(key: string): string {
  if (!key) return '';
  const pairs = key.split(',').map((entry) => {
    const i = entry.indexOf('=');
    const name = entry.slice(0, i);
    const value = entry.slice(i + 1).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return `${name}="${value}"`;
  });
  return `{${pairs.join(',')}}`;
}

class Counter {
  readonly name: string;
  private readonly values = new Map<string, number>();

  constructor(name: string) {
    this.name = name;
  }

  inc(labels?: Labels, amount = 1): void {
    const key = labelKey(labels);
    this.values.set(key, (this.values.get(key) ?? 0) + amount);
  }

  dec(labels?: Labels, amount = 1): void {
    const key = labelKey(labels);
    this.values.set(key, Math.max(0, (this.values.get(key) ?? 0) - amount));
  }

  snapshot() {
    return [...this.values.entries()].map(([labels, value]) => ({ labels, value }));
  }

  prometheus(): string[] {
    const rows = this.snapshot();
    if (rows.length === 0) rows.push({ labels: '', value: 0 });
    return rows.map(({ labels, value }) => `${this.name}${prometheusLabels(labels)} ${value}`);
  }
}

class DurationMetric {
  readonly name: string;
  private count = 0;
  private sumSeconds = 0;
  private maxSeconds = 0;

  constructor(name: string) {
    this.name = name;
  }

  startTimer(): () => number {
    const started = performance.now();
    let ended = false;
    return () => {
      if (ended) return 0;
      ended = true;
      const seconds = Math.max(0, (performance.now() - started) / 1000);
      this.count += 1;
      this.sumSeconds += seconds;
      this.maxSeconds = Math.max(this.maxSeconds, seconds);
      return seconds;
    };
  }

  snapshot() {
    return {
      count: this.count,
      sumSeconds: this.sumSeconds,
      maxSeconds: this.maxSeconds,
      meanSeconds: this.count > 0 ? this.sumSeconds / this.count : 0,
    };
  }

  prometheus(): string[] {
    const s = this.snapshot();
    return [
      `${this.name}_count ${s.count}`,
      `${this.name}_sum ${s.sumSeconds}`,
      `${this.name}_max ${s.maxSeconds}`,
    ];
  }
}

export const metrics = {
  rooms: new Counter('leeway_sfu_rooms'),
  producers: new Counter('leeway_sfu_producers'),
  consumers: new Counter('leeway_sfu_consumers'),
  wsConnections: new Counter('leeway_sfu_ws_connections'),
  wsMessages: new Counter('leeway_sfu_ws_messages_total'),
  signalingErrors: new Counter('leeway_sfu_signaling_errors_total'),
  transportCreation: new DurationMetric('leeway_sfu_transport_creation_seconds'),
};

function metricsJson() {
  return {
    authority: 'LEEWAY_SFU_NATIVE_METRICS',
    generatedAt: new Date().toISOString(),
    counters: {
      rooms: metrics.rooms.snapshot(),
      producers: metrics.producers.snapshot(),
      consumers: metrics.consumers.snapshot(),
      wsConnections: metrics.wsConnections.snapshot(),
      wsMessages: metrics.wsMessages.snapshot(),
      signalingErrors: metrics.signalingErrors.snapshot(),
    },
    durations: {
      transportCreation: metrics.transportCreation.snapshot(),
    },
  };
}

export const registry = {
  contentType: 'text/plain; version=0.0.4; charset=utf-8',

  async metrics(): Promise<string> {
    const lines = [
      '# LEEWAY SFU native metrics',
      ...metrics.rooms.prometheus(),
      ...metrics.producers.prometheus(),
      ...metrics.consumers.prometheus(),
      ...metrics.wsConnections.prometheus(),
      ...metrics.wsMessages.prometheus(),
      ...metrics.signalingErrors.prometheus(),
      ...metrics.transportCreation.prometheus(),
    ];
    return lines.join('\n') + '\n';
  },

  async getMetricsAsJSON(): Promise<ReturnType<typeof metricsJson>> {
    return metricsJson();
  },
};
