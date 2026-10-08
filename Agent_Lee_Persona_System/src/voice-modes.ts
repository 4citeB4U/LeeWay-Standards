/*
LEEWAY HEADER — DO NOT REMOVE

REGION: CORE
TAG: CORE.AGENT_LEE_PERSONA_SYSTEM.SRC.VOICE_MODES.MAIN
DESCRIPTION: Auto-enforced by LeeWay Standards Enforcement Engine
AUTHORITY: LeeWay-Standards
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render

5WH:
WHAT = voice-modes.ts — governed module
WHY = Enforce LeeWay architectural standards in this file
WHO = Leeway Innovations / LeeWay Standards Enforcement Engine
WHERE = Agent_Lee_Persona_System/src/voice-modes.ts
WHEN = Governance metadata applied 2026-10-08
HOW = Auto-enforced header; update manually with full 5WH detail

CHAIN: Standards → Integrated → Runtime → Projections
LICENSE: Existing file and repository license terms remain unchanged
*/
/*
LEEWAY_HEADER - DO NOT REMOVE

TAG: AI.PERSONA.VOICE.MODES
REGION: 🧠 AI
PURPOSE: Voice mode catalog for Agent Lee persona formatting and prompt assembly.
DISCOVERY_PIPELINE:
  Voice → Intent → Location → Vertical → Ranking → Render
*/

export type AgentLeeVoiceMode = {
  id: string;
  description: string;
};

const MODES: AgentLeeVoiceMode[] = [
  { id: "neutral", description: "Compliance-safe, plain, and controlled for legal, safety, and audit contexts." },
  { id: "grounded", description: "Natural everyday Agent Lee delivery with warmth, clarity, and restraint." },
  { id: "operator", description: "Direct engineering operator mode for coding, debugging, staging, and verification." },
  { id: "professor", description: "Teaching mode with technical clarity and calm explanation." },
  { id: "story", description: "Narrative mode for founder story, README framing, and vision language." },
  { id: "high-flow", description: "Higher energy mode for motivation without losing technical accuracy." }
];

export function selectAgentLeeVoiceMode(requestedMode?: string) {
  const normalized = String(requestedMode || "operator").trim().toLowerCase();
  return MODES.find((mode) => mode.id === normalized) || MODES[2];
}
