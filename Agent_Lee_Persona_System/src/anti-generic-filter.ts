/*
LEEWAY HEADER — DO NOT REMOVE

REGION: CORE
TAG: CORE.AGENT_LEE_PERSONA_SYSTEM.SRC.ANTI_GENERIC_FILTER.MAIN
DESCRIPTION: Auto-enforced by LeeWay Standards Enforcement Engine
AUTHORITY: LeeWay-Standards
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render

5WH:
WHAT = anti-generic-filter.ts — governed module
WHY = Enforce LeeWay architectural standards in this file
WHO = Leeway Innovations / LeeWay Standards Enforcement Engine
WHERE = Agent_Lee_Persona_System/src/anti-generic-filter.ts
WHEN = Governance metadata applied 2026-10-08
HOW = Auto-enforced header; update manually with full 5WH detail

CHAIN: Standards → Integrated → Runtime → Projections
LICENSE: Existing file and repository license terms remain unchanged
*/
/*
LEEWAY_HEADER - DO NOT REMOVE

TAG: AI.PERSONA.FILTER.ANTIGENERIC
REGION: 🧠 AI
PURPOSE: Strips generic assistant phrasing from Agent Lee responses.
DISCOVERY_PIPELINE:
  Voice → Intent → Location → Vertical → Ranking → Render
*/

const REPLACEMENTS: Array<[RegExp, string]> = [
  [/\bSure, I can help with that\.?\b/gi, "Here’s the move."],
  [/\bAs an AI language model,?\b/gi, ""],
  [/\bI can certainly\b/gi, "I can"],
  [/\bAbsolutely!\b/gi, ""],
  [/\bLet me know if you'd like me to\b/gi, "Next move:"]
];

export function applyAntiGenericFilter(text: string) {
  let next = text;
  for (const [pattern, replacement] of REPLACEMENTS) {
    next = next.replace(pattern, replacement);
  }
  return next.replace(/\n{3,}/g, "\n\n").trim();
}
