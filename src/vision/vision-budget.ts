/*
LEEWAY HEADER — DO NOT REMOVE
AUTHORITY: LeeWay-Standards

TAG: CORE.RUNTIME.BUDGET.VISION
REGION: 🟢 CORE
DISCOVERY_PIPELINE:
Runtime → Load → Budget → Enforcement

5WH:
WHAT = Ensure vision operations stay within edge device limits.
WHY = Follow the existing Vision governing purpose and constraints
WHO = LeeWay-Standards (existing AUTHORITY field)
WHERE = src/vision/vision-budget.ts
WHEN = 2026-10-14 (header conformance review)
HOW = Existing TypeScript module governed by the documented constraints

PURPOSE:
Ensure vision operations stay within edge device limits.

CONSTRAINTS:
- Must use existing runtime/budget mechanisms
- Must not introduce separate control logic

LICENSE: PROPRIETARY
*/
// CHAIN: Standards → Integrated → Runtime → Projections


import type { RuntimeMode } from './types';

export interface BudgetCheck {
  safeToScan: boolean;
  runtimeMode: RuntimeMode;
  loadEstimate: number;
}

class VisionBudget {
  private cpuUsage = 0;
  private memoryUsage = 0;
  private maxCpuPercent = 5;
  private maxMemoryMb = 50;

  updateLoad(cpuPercent: number, memoryMb: number): void {
    this.cpuUsage = cpuPercent;
    this.memoryUsage = memoryMb;
  }

  check(currentRuntimeMode: RuntimeMode): BudgetCheck {
    const overloaded = this.cpuUsage > this.maxCpuPercent;
    const memoryPressure = this.memoryUsage > this.maxMemoryMb;

    let runtimeMode = currentRuntimeMode;

    // Downgrade on overload
    if (overloaded || memoryPressure) {
      runtimeMode = 'ultra-light';
    } else if (currentRuntimeMode === 'ultra-light' && this.cpuUsage < 2) {
      // Upgrade if safe
      runtimeMode = 'balanced';
    }

    const loadRatio = Math.max(this.cpuUsage / this.maxCpuPercent, this.memoryUsage / this.maxMemoryMb);

    return {
      safeToScan: !overloaded && !memoryPressure,
      runtimeMode,
      loadEstimate: loadRatio,
    };
  }
}

export default new VisionBudget();
