/*
LEEWAY HEADER — DO NOT REMOVE
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render
AUTHORITY: LeeWay-Standards

TAG: RUNTIME.INDEX
REGION: 🔵 RUNTIME
PURPOSE: Orchestrate real-time voice sessions with Call Mode
5WH:
WHAT = Orchestrate real-time voice sessions with Call Mode
WHY = Preserve declared governing authority and purpose of this module
WHO = LeeWay-Standards (existing authority declaration)
WHERE = src/runtime/call/index.ts
WHEN = 2026-10-15 (governance metadata review)
HOW = Existing TypeScript module implementation, unchanged

LICENSE: PROPRIETARY
*/
// CHAIN: Standards → Integrated → Runtime → Projections


export { callModeController, useCallModeState, type CallModeSessionState } from './CallMode';
export { CallModeUI } from '../components/CallModeUI';
