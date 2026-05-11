# LeeWay Canonical Runtime Stack

**Authority:** LeeWay Standards  
**Scope:** LeeWay VS Code sovereign runtime  
**Effective:** 2026-05-10  
**Status:** Canonical source of truth

This document is the authoritative runtime specification for the live **LeeWay VS Code** sovereign stack rooted at `%USERPROFILE%\.leeway-vscode`.

All other guides, manifests, curriculum documents, activation docs, and architecture summaries should defer to this file when naming the runtime host, model stack, sovereign agents, MCP plane, LVIS workers, and governance rules.

Machine-readable registry: [sovereign-runtime-registry.json](./sovereign-runtime-registry.json)

## Source Of Authority

All sovereign agents used by LeeWay VS Code originate from **LeeWay Standards**.

LeeWay VS Code is permitted to consume, project, and execute those identities, but it may not privately fork or redefine canonical sovereign agents outside the law declared here and in [sovereign-runtime-registry.json](./sovereign-runtime-registry.json).

## Marketplace Extension Link

LeeWay Standards links to the canonical VS Code extension identity:

- Extension ID: `leeway.agent-lee-leeway-coding-system`
- Marketplace: `https://marketplace.visualstudio.com/items?itemName=leeway.agent-lee-leeway-coding-system`
- VS Code deep link: `vscode:extension/leeway.agent-lee-leeway-coding-system`

Install command:

```powershell
code --install-extension leeway.agent-lee-leeway-coding-system
```

## Runtime Identity

| Role | Canonical Identity |
|---|---|
| Host | `Leeway VS Code` |
| Primary Sovereign Agent | `agent-lee-prime` |
| Visual Governance Agent | `leeway-visual-orchestrator-agent` |
| Visual Subsystem | `leeway-visual-intelligence-system` |

## Canonical LLM Stack

| Model | Purpose |
|---|---|
| `qwen2.5-coder:1.5b` | Lightweight coding and local routing |
| `qwen2.5-coder:7b` | Coding, classification, and tool orchestration |
| `qwen2.5-coder:14b` | Backend synthesis and heavier engineering |
| `deepseek-coder-v2:16b` | Heavy code synthesis and multi-file reasoning |
| `llama3.1:8b` | Scene generation and structural synthesis |
| `llava:7b` | Vision understanding and image interpretation |
| `phi3:mini` | Lightweight execution tasks |
| `nomic-embed-text` | Vector memory and retrieval |
| `azr` | Repair-loop reasoning |
| `echo` | Diagnostics, receipts, and memory continuity |

## Canonical Sovereign Agents

| Agent | Function |
|---|---|
| `agent-lee-prime` | Final speaker, constitutional orchestrator, and runtime sovereign |
| `fs-nav-agent` | Governed filesystem navigation and discovery |
| `host-exec-agent` | Approval-bound terminal execution |
| `media-forge-agent` | Media analysis and asset generation support |
| `mutation-agent` | Controlled workspace mutation and patch application |
| `perception-agent` | Web, browser, and external perception workflows |
| `leeway-visual-orchestrator-agent` | LVIS routing, reconstruction control, and export governance |
| `shield-governor-agent` | Security enforcement, boundary checks, and escalation control |
| `attestation-marshal-agent` | Verification receipts, approval evidence, and trust attestation |
| `memory-warden-agent` | Provenance-bearing memory policy and continuity control |
| `threat-sentinel-agent` | Threat detection, adversarial drift review, and safe-mode triggers |

## Canonical MCP Plane

- `leeway-agent-registry`
- `leeway-desktop-commander`
- `leeway-docs-rag`
- `leeway-health`
- `leeway-insforge`
- `leeway-memory`
- `leeway-planner`
- `leeway-playwright`
- `leeway-scheduling`
- `leeway-testsprite`
- `leeway-validation`
- `frontend-mcp`
- `backend-mcp`
- `design-system-mcp`
- `creative-mcp`
- `memory-mcp`
- `scheduler-mcp`
- `ui-builder-mcp`
- `leeway-build-auditor-mcp`
- `leeway-ci-blueprint-mcp`
- `leeway-edge-optimizer-mcp`
- `leeway-full-repo-checker-mcp`
- `leeway-responsive-ui-mcp`
- `qa-mcp`
- `react-native-mcp`
- `leeway-visual-intelligence-system`

## Canonical LVIS Workers

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

## Canonical Governance Rules

- `schema-first`
- `local-first`
- `receipt-required`
- `deterministic-tools-first`
- `pending-edits workflow`
- `agent ownership`
- `auditability`
- `repair loops`
- `quality gates`
- `no blind edits`

## Runtime Governance Domains

- `agent-lee`
- `safety`
- `sandbox`
- `workspace`
- `knowledge`
- `logs`
- `memory`
- `patches`
- `reports`

## Runtime Domain Laws

- [Safety Domain Governance](../Docs/governance/runtime-domain-safety.md)
- [Sandbox Domain Governance](../Docs/governance/runtime-domain-sandbox.md)
- [Workspace Domain Governance](../Docs/governance/runtime-domain-workspace.md)
- [Knowledge Domain Governance](../Docs/governance/runtime-domain-knowledge.md)
- [Logs Domain Governance](../Docs/governance/runtime-domain-logs.md)
- [Memory Domain Governance](../Docs/governance/runtime-domain-memory.md)
- [Patches Domain Governance](../Docs/governance/runtime-domain-patches.md)
- [Reports Domain Governance](../Docs/governance/runtime-domain-reports.md)

## Runtime Operations Registry

Internal runtime operations are governed by:

- [runtime-operations-registry.json](./runtime-operations-registry.json)

## Canonical LVIS Objective

Transform LeeWay VS Code into a sovereign visual engineering platform capable of:

- `image -> SVG`
- `image -> voxel`
- `SVG -> voxel`
- `image -> 3D scene`
- `3D asset -> React component`
- `asset -> validated project integration`

with:

- local models
- local orchestration
- LeeWay workers
- MCP governance
- deterministic reconstruction
- developer-safe workflows

## Upstream Evidence Sources

- `.leeway-vscode/agent-lee/mcp/leeway-mcp-registry.json`
- `.leeway-vscode/agent-lee/mcp/mcp-registry.json`
- `.leeway-vscode/agent-lee/visual-intelligence/workers/worker-registry.json`