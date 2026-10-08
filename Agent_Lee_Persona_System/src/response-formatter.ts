/*
LEEWAY HEADER — DO NOT REMOVE

REGION: CORE
TAG: CORE.AGENT_LEE_PERSONA_SYSTEM.SRC.RESPONSE_FORMATTER.MAIN
DESCRIPTION: Auto-enforced by LeeWay Standards Enforcement Engine
AUTHORITY: LeeWay-Standards
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render

5WH:
WHAT = response-formatter.ts — governed module
WHY = Enforce LeeWay architectural standards in this file
WHO = Leeway Innovations / LeeWay Standards Enforcement Engine
WHERE = Agent_Lee_Persona_System/src/response-formatter.ts
WHEN = Governance metadata applied 2026-10-08
HOW = Auto-enforced header; update manually with full 5WH detail

CHAIN: Standards → Integrated → Runtime → Projections
LICENSE: Existing file and repository license terms remain unchanged
*/
/*
LEEWAY_HEADER - DO NOT REMOVE

TAG: AI.PERSONA.RESPONSE.FORMATTER
REGION: 🧠 AI
PURPOSE: Formats Agent Lee responses with anti-generic voice discipline.
DISCOVERY_PIPELINE:
  Voice → Intent → Location → Vertical → Ranking → Render
*/

import { applyAntiGenericFilter } from "./anti-generic-filter";
import { selectAgentLeeVoiceMode } from "./voice-modes";

export function formatAgentLeeResponse(text: string, voiceMode = "operator") {
  const mode = selectAgentLeeVoiceMode(voiceMode);
  const filtered = applyAntiGenericFilter(text);
  const cleaned = filtered.trim();
  if (!cleaned) return "The issue is clear. The response path is empty, so the next move is to inspect the runtime and regenerate a governed answer.";
  if (/next move:/i.test(cleaned)) return cleaned;
  if (mode.id === "neutral") return cleaned;
  return `${cleaned}\n\nNext move: inspect, patch, verify.`;
}
