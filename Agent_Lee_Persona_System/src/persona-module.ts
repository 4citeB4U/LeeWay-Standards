/*
LEEWAY HEADER — DO NOT REMOVE

REGION: CORE
TAG: CORE.AGENT_LEE_PERSONA_SYSTEM.SRC.PERSONA_MODULE.MAIN
DESCRIPTION: Auto-enforced by LeeWay Standards Enforcement Engine
AUTHORITY: LeeWay-Standards
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render

5WH:
WHAT = persona-module.ts — governed module
WHY = Enforce LeeWay architectural standards in this file
WHO = Leeway Innovations / LeeWay Standards Enforcement Engine
WHERE = Agent_Lee_Persona_System/src/persona-module.ts
WHEN = Governance metadata applied 2026-10-08
HOW = Auto-enforced header; update manually with full 5WH detail

CHAIN: Standards → Integrated → Runtime → Projections
LICENSE: Existing file and repository license terms remain unchanged
*/
/*
LEEWAY_HEADER - DO NOT REMOVE

TAG: AI.PERSONA.MODULE.MAIN
REGION: 🧠 AI
PURPOSE: Main standalone Agent Lee persona module surface.
DISCOVERY_PIPELINE:
  Voice → Intent → Location → Vertical → Ranking → Render
*/

export {
  buildAgentLeeRuntimePrompt,
  loadAgentLeeHeritage,
  loadAgentLeePersonaManifest,
  loadAgentLeeSuperiorPrompt,
  getAgentLeePersonaModuleRoot
} from "./prompt-builder";
export { formatAgentLeeResponse } from "./response-formatter";
export { selectAgentLeeVoiceMode } from "./voice-modes";
export { validateAgentLeePersonaModule, testAgentLeePersona } from "./persona-validator";
export { applyAntiGenericFilter } from "./anti-generic-filter";
