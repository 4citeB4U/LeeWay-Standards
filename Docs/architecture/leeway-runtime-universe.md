<!--
DOC_CLASS: ARCHITECTURE
DOC_ID: architecture.leeway-runtime-universe
OWNER: Lee Prime
LAST_UPDATED: 2026-05-10
-->


# Leeway Runtime Universe — Architecture

---

## Partnership: LeeWay-Edge-RTC

Agent Lee OS is fully partnered and live-connected with [LeeWay-Edge-RTC](https://github.com/4citeB4U/LeeWay-Edge-RTC) — Agent Lee's real-time voice, emotion, and RTC backbone. All runtime layers and agent workflows are designed for seamless cross-app operation.

**How to connect:**
- Set the `VITE_VOICE_WS_URL` in your `.env` to the LeeWay-Edge-RTC WebSocket endpoint.
- Voice, emotion, and RTC tasks are routed in real time to the RTC backbone.

---

## Overview

The canonical runtime target for LeeWay Standards is **LeeWay VS Code**, rooted at `%USERPROFILE%\.leeway-vscode`.

That runtime is a governed sovereign stack spanning:
- **VS Code Host Shell** — the primary execution host and user-facing environment
- **Workspace Plane** — active code, patch, receipt, and validation work
- **Safety Plane** — threat review, policy enforcement, and controlled execution boundaries
- **Memory and Knowledge Plane** — evidence-bearing storage, recall, and registry state
- **Visual Intelligence Plane** — SVG, voxel, 3D scene, and asset reconstruction under LVIS governance
- **Reports and Logs Plane** — durable operational truth, attestation, and verification output

The live runtime is larger than the original browser and voice model. LeeWay Standards must govern the full host, memory, safety, sandbox, workspace, and visual-intelligence surfaces because the VS Code product is now the primary execution product of the standards.

## Canonical Local Model Stack

| Model | Purpose |
|---|---|
| `qwen2.5-coder:1.5b` | Lightweight local coding and routing |
| `qwen2.5-coder:7b` | Coding, classification, and tool orchestration |
| `qwen2.5-coder:14b` | Backend synthesis and heavier engineering |
| `deepseek-coder-v2:16b` | Multi-file reasoning and heavy code synthesis |
| `llama3.1:8b` | Scene generation and structural synthesis |
| `llava:7b` | Vision understanding and image interpretation |
| `phi3:mini` | Lightweight execution tasks |
| `nomic-embed-text` | Vector memory and retrieval |
| `azr` | Repair-loop reasoning |
| `echo` | Diagnostics, receipts, and memory continuity |

## Canonical Runtime Domains

| Domain | Runtime Role |
|---|---|
| `agent-lee` | Sovereign runtime, extension behavior, agent manifests, and governance wiring |
| `safety` | Security policies, scanners, rollback, and safe execution boundaries |
| `sandbox` | Contained experimentation and approval-bound isolation |
| `workspace` | Active MCPs, host agents, pending edits, and work products |
| `knowledge` | Documentation retrieval and standards memory |
| `logs` | Operational events, drift, crash, and tool activity |
| `memory` | Persistent chats, indexes, registry state, receipts, and summaries |
| `patches` | Durable repair artifacts and controlled mutation packages |
| `reports` | Verification reports, compliance evidence, and release truth |

## Canonical MCP and Agent Plane

LeeWay VS Code currently operates with the following declared execution units:

- Sovereign agents: `agent-lee-prime`, `shield-governor-agent`, `attestation-marshal-agent`, `memory-warden-agent`, `threat-sentinel-agent`
- Host-linked agents: `fs-nav-agent`, `host-exec-agent`, `media-forge-agent`, `mutation-agent`, `perception-agent`
- Product MCPs: `frontend-mcp`, `backend-mcp`, `design-system-mcp`, `creative-mcp`, `memory-mcp`, `scheduler-mcp`, `ui-builder-mcp`, `qa-mcp`, `react-native-mcp`
- LeeWay governance MCPs: `leeway-agent-registry`, `leeway-desktop-commander`, `leeway-docs-rag`, `leeway-health`, `leeway-insforge`, `leeway-memory`, `leeway-planner`, `leeway-playwright`, `leeway-scheduling`, `leeway-testsprite`, `leeway-validation`
- Optimization MCPs: `leeway-build-auditor-mcp`, `leeway-ci-blueprint-mcp`, `leeway-edge-optimizer-mcp`, `leeway-full-repo-checker-mcp`, `leeway-responsive-ui-mcp`

## Visual Intelligence Subsystem (LVIS)

**LVIS = Leeway Visual Intelligence System**

Purpose:
- image -> SVG
- image -> voxel
- SVG -> voxel
- image -> 3D scene
- 3D asset -> React component
- asset -> validated project integration

Workers:
- `leeway-visual-orchestrator-agent`
- `leeway-vector-reconstruction-worker`
- `leeway-voxel-reconstruction-worker`
- `leeway-scene-reconstruction-worker`
- `leeway-depth-synthesis-worker`
- `leeway-structural-fidelity-worker`
- `leeway-asset-repair-worker`
- `leeway-manifest-export-worker`
- `leeway-project-integration-worker`
- `leeway-visual-memory-worker`

## Agent/Operative Separation

Agents are planners, coordinators, and governance intelligence.
Operatives are endpoint-bound execution units that perform real work on active surfaces.

Hard invariant:

> One operative, one endpoint, one live assignment context.

Endpoint classes:

| Class | Endpoint Surface | Typical Work |
|---|---|---|
| Mobile Operative | Phone and tablet interfaces | App workflows, field tasks, mobile forms |
| Desktop Operative | Desktop/browser/workstation surfaces | Office automation, dashboards, file and tool workflows |
| Communications Operative | Call and messaging surfaces | Calling, messaging, communication queue execution |

See `docs/architecture/operative-model.md` for the full contract.

## Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 19, TypeScript 5.8, Vite 6, Tailwind CSS v4 | UI + App shell |
| AI / LLM (cloud) | leeway leeway 2.0 Flash + leeway Live (WebSocket audio) | Cloud inference |
| AI / LLM (local) | llama.cpp (`llama-server`) | Offline inference |
| STT | faster-whisper + Silero VAD | Local speech-to-text |
| TTS | Piper TTS + Edge-TTS | Local/cloud text-to-speech |
| Storage | IndexedDB (`idb`) + NDJSON ledger + Firebase | Memory + audit |
| Auth | Firebase Auth (leeway OAuth) → idToken → Cloud Function | Secure leeway access |
| Voice Server | Python FastAPI, WebSocket, port 8765 | Local voice pipeline |
| Agents | TypeScript static classes in `agents/` | Core + Governance + Voice |
| MCP | Node.js MCP servers in `MCP agents/` | Capability portals |

## Runtime Layers (7 Total)

```
┌───────────────────────────────────────────────────┐
│  LAYER 7 — UI / USER SURFACE (Browser)            │
│  React UI: App.tsx, ChatConsole, AgentTeamPanel   │
│  pages/, components/, ParticleTransition          │
└──────────────────────┬────────────────────────────┘
                       │ EventBus (typed events)
┌──────────────────────▼────────────────────────────┐
│  LAYER 6 — GOVERNANCE CORE (Z0)                   │
│  AgentRouter → classifyWorkflow(G1-G8+Voice)      │
│  TaskGraph → budget-clamped execution             │
│  GovernanceContract → zones + caps                │
│  CheckpointManager → before/after snapshots       │
└──────────────────────┬────────────────────────────┘
       baton dispatch  │  │ voice session
┌──────────────────────▼──▼────────────────────────┐
│  LAYER 5 — CORE AGENT TEAM                       │
│  AgentLee (Orchestrator)    Pixel (Design)        │
│  Atlas (Research)           Nexus (Deploy)        │
│  Nova (Engineering)         Aria (Social)         │
│  Echo (Voice/Emotion)       Sage (Memory)         │
│  Shield (Security)                                │
└──────────────────────┬────────────────────────────┘
                       │ report + audit
┌──────────────────────▼────────────────────────────┐
│  LAYER 4 — GOVERNANCE CORPS                       │
│  MarshalVerify (G8 lead)    JanitorSentinel       │
│  ClerkArchive               LibrarianAegis        │
│  LeewayStandardsAgent                             │
└──────────────────────┬────────────────────────────┘
                       │ WebSocket (ws://localhost:8765)
┌──────────────────────▼────────────────────────────┐
│  LAYER 3 — LOCAL VOICE PIPELINE                   │
│  LiveConductorAgent (orchestrator)                │
│  StreamingSTT → RouterAgent → StreamingTTS        │
│  VisionAgent (screen analysis)                    │
│  SafetyRedactionAgent (PII/injection filter)      │
│  Silero VAD → faster-whisper → Piper TTS          │
└──────────────────────┬────────────────────────────┘
                       │ Portal Requests (via Shield)
┌──────────────────────▼────────────────────────────┐
│  LAYER 2 — MCP PORTAL LAYER (Z1/Z2)              │
│  voice-agent-mcp     reports-clerk-mcp           │
│  retention-janitor-mcp   docs-librarian-mcp      │
│  memory-agent-mcp    health-agent-mcp            │
│  17 portals total — see full-stack-manifest.md   │
└──────────────────────┬────────────────────────────┘
                       │ IndexedDB + NDJSON + Firebase
┌──────────────────────▼────────────────────────────┐
│  LAYER 1 — STORAGE & MEMORY                       │
│  MemoryDB (IndexedDB) + NDJSON ledger            │
│  Firebase Firestore + Auth                        │
│  Memory Lake (canonical truth store)             │
└───────────────────────────────────────────────────┘
```

## Voice Pipeline — Local-First Priority Chain

1. **Local Voice Server** (FastAPI, ws://localhost:8765) — Silero VAD → faster-whisper → llama.cpp → Piper TTS
2. **leeway Live** — bidirectional WebSocket audio (cloud fallback)
3. **voice-agent-mcp Edge-TTS** — REST fallback (`http://127.0.0.1:3010/speak`)
4. **Browser SpeechSynthesis** — last-resort

## Key Modules

| Module | Path | Purpose |
|---|---|---|
| GovernanceContract | `core/GovernanceContract.ts` | G1-G8+Voice, zones, caps |
| AgentRouter | `core/AgentRouter.ts` | Intent classify + baton dispatch |
| TaskGraph | `core/TaskGraph.ts` | Task state-machine, budget enforcement |
| CheckpointManager | `core/CheckpointManager.ts` | Before/after write snapshots |
| ReportWriter | `core/ReportWriter.ts` | NDJSON event schema + IndexedDB buffer |
| ReportIndex | `core/ReportIndex.ts` | manifest.json + latest.ndjson |
| RetentionCleaner | `core/RetentionCleaner.ts` | Rotation + compaction + indexing |
| EventBus | `core/EventBus.ts` | Typed singleton, 30+ governance events |
| VoiceService | `core/VoiceService.ts` | 4-tier voice priority chain |
| VoiceSession | `voice/VoiceSession.ts` | React adapter for voice pipeline |
| MemoryDB | `core/MemoryDB.ts` | IndexedDB wrapper |
| leewayLiveClient | `core/leewayLiveClient.ts` | leeway Live API WebSocket client |
| WorldRegistry | `core/WorldRegistry.ts` | All 20 agents + 12 supporting cast |
| Shield | `agents/Shield.ts` | security, zone enforcement, break-glass |
| ClerkArchive | `agents/ClerkArchive.ts` | report schema + index maintenance |
| JanitorSentinel | `agents/JanitorSentinel.ts` | retention + compaction |
| LibrarianAegis | `agents/LibrarianAegis.ts` | docs taxonomy enforcement |

## On-Device Filesystem Layout

```
/storage/emulated/0/AgentLee/
  system_reports/        ← operational truth (Janitor + Clerk manage)
  docs_exports/          ← optional repo doc exports
```

## Repo Layout

```
docs/                    ← developer truth (Librarian Aegis enforces)
core/                    ← governance + runtime modules
agents/                  ← agent implementations
MCP agents/              ← MCP servers
```

