<!--
LEEWAY HEADER — DO NOT REMOVE
REGION: AI.AGENT.PERSONA.DOCS
TAG: CORE.DOCS.AGENT_LEE_PERSONA_SYSTEM_README.MAIN
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render
5WH:
WHAT = Agent Lee Persona Module
WHY = Preserve existing LeeWay-authored material and provenance
WHO = LeeWay Standards / existing document owner subject to review
WHERE = Agent_Lee_Persona_System/README.md
WHEN = 2026-10-14 (header review)
HOW = Existing Markdown content, not executable implementation
AGENTS:
AUDIT
LICENSE:
MIT
-->

<!--
LEEWAY_HEADER - DO NOT REMOVE
TAG: AI.PERSONA.MODULE.README
REGION: 🧠 AI
PURPOSE: Documents the mandatory standalone Agent Lee persona module.
DISCOVERY_PIPELINE:
  Voice → Intent → Location → Vertical → Ranking → Render
-->

# Agent Lee Persona Module

Agent Lee Persona Module is mandatory runtime infrastructure.

The VS Code extension, engineering loop, model router, and command handlers must not bypass this module.

This module owns:

- runtime prompt construction
- voice mode selection
- anti-generic filtering
- heritage loading
- persona validation

