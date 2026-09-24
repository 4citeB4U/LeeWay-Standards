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

function parseLabelKey(key: string): Record<string, string> {
  if (!key) return {};
  const out: Record<string, string> = {};
  for (const entry of key.split(',')) {
    const i = entry.indexOf('=');
    if (i <= 0) continue;
    out[entry.slice(0, i)] = entry.slice(i + 1);
  }
  return out;
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
  readonly metricType: 'counter' | 'gauge';
  private readonly values = new Map<string, number>();

  constructor(name: string, metricType: 'counter' | 'gauge' = 'counter') {
    this.name = name;
    this.metricType = metricType;
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
    return [...this.values.entries()].map(([labelKeyValue, value]) => ({
      labels: parseLabelKey(labelKeyValue),
      labelKey: labelKeyValue,
      value,
    }));
  }

  prometheus(): string[] {
    const rows = this.snapshot();
    if (rows.length === 0) rows.push({ labels: {}, labelKey: '', value: 0 });
    return rows.map(({ labelKey, value }) => `${this.name}${prometheusLabels(labelKey)} ${value}`);
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
  rooms: new Counter('leeway_rooms_total', 'gauge'),
  producers: new Counter('leeway_producers_total', 'gauge'),
  consumers: new Counter('leeway_consumers_total', 'gauge'),
  wsConnections: new Counter('leeway_ws_connections_total', 'gauge'),
  wsMessages: new Counter('leeway_ws_messages_total'),
  signalingErrors: new Counter('leeway_signaling_errors_total'),
  workers: new Counter('leeway_workers_active', 'gauge'),
  workerDeaths: new Counter('leeway_worker_deaths_total'),
  workerRestarts: new Counter('leeway_worker_restarts_total'),
  transportCreation: new DurationMetric('leeway_transport_creation_seconds'),
};

function counterJson(metric: Counter) {
  const values = metric.snapshot().map(({ labels, value }) => ({ labels, value }));
  if (values.length === 0) values.push({ labels: {}, value: 0 });
  return {
    name: metric.name,
    help: metric.name,
    type: metric.metricType,
    values,
  };
}

function metricsJson() {
  const duration = metrics.transportCreation.snapshot();
  return [
    counterJson(metrics.rooms),
    counterJson(metrics.producers),
    counterJson(metrics.consumers),
    counterJson(metrics.wsConnections),
    counterJson(metrics.wsMessages),
    counterJson(metrics.signalingErrors),
    counterJson(metrics.workers),
    counterJson(metrics.workerDeaths),
    counterJson(metrics.workerRestarts),
    {
      name: 'leeway_transport_creation_seconds_mean',
      help: 'Mean SFU WebRTC transport creation time in seconds',
      type: 'gauge' as const,
      values: [{ labels: {}, value: duration.meanSeconds }],
    },
    {
      name: 'leeway_transport_creation_seconds_max',
      help: 'Maximum observed SFU WebRTC transport creation time in seconds',
      type: 'gauge' as const,
      values: [{ labels: {}, value: duration.maxSeconds }],
    },
  ];
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
      ...metrics.workers.prometheus(),
      ...metrics.workerDeaths.prometheus(),
      ...metrics.workerRestarts.prometheus(),
      ...metrics.transportCreation.prometheus(),
    ];
    return lines.join('\n') + '\n';
  },

  async getMetricsAsJSON(): Promise<ReturnType<typeof metricsJson>> {
    return metricsJson();
  },
};
