/*
LEEWAY HEADER — DO NOT REMOVE
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render
AUTHORITY: LeeWay-Standards
TAG: AI.RTC.VECTOR.ROUTER
REGION: 🧠 AI

5WH:
WHAT = Tracks RTC network metrics to select routing behavior
WHY = Makes latency and packet-loss observations available for governed RTC routing
WHO = LeeWay-Standards (existing AUTHORITY declaration)
WHERE = src/runtime/rtc/vector-agent.ts
WHEN = 2026-10-15 (governance review)
HOW = Existing source implementation below this header, unmodified
LICENSE: Existing file and repository license terms remain unchanged
*/
// CHAIN: Standards → Integrated → Runtime → Projections


export interface StatsSample {
  rtt: number;
  packetLoss: number;
  jitter: number;
  bitrate: number;
}

export class VectorAgent {
  history: StatsSample[] = [];

  push(sample: StatsSample) {
    this.history.push(sample);
    if (this.history.length > 50) this.history.shift();
  }

  score(): number {
    if (this.history.length === 0) return 0;
    const avg = (key: keyof StatsSample) =>
      this.history.reduce((a, b) => a + b[key], 0) / this.history.length;

    return (
      avg('rtt') * 0.4 +
      avg('packetLoss') * 200 +
      avg('jitter') * 0.3 -
      avg('bitrate') * 0.001
    );
  }

  decision() {
    const s = this.score();
    if (s > 200) return 'reroute';
    if (s > 120) return 'degrade';
    return 'stable';
  }
}
