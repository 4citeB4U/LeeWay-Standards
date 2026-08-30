<!--
DOC_CLASS: ARCHITECTURE
DOC_ID: architecture.master-plan
OWNER: Leonard J Lee / Leeway Innovations
LAST_UPDATED: 2026-08-30
-->

# Agent Lee Agentic Operating System — Master Plan (Current State)

> **Current canonical architecture:** LeeWay uses a hybrid Harness + Kernel Fabric. Harnesses remain domain authorities; kernels are bounded executable capabilities. Persistent memory is owned by LeeWay through the Memory Harness / Echo Memory Authority and is independent of any model, agent, session, container, device, or provider. See `Docs/architecture/leeway-kernel-fabric-architecture-standard.md`.

## Security Foundation
All execution remains governed by LeeWay identity, policy, Formula/runtime admission, Security Harness enforcement, Veritas, and receipt evidence. Availability of a model, MCP, kernel, device, or workflow does not itself grant authority to use it.

## Agent And Operative Model
Agents are command intelligence. Operatives are endpoint-bound execution workers.

- Agent: plans, routes, governs, and approves within policy.
- Operative: executes on one active endpoint through approved channels.

Hard invariant:

> One operative, one endpoint, one live assignment context.

Endpoint classes:
- Mobile operatives
- Desktop operatives
- Communications operatives

## Canonical Runtime System
LeeWay Standards govern the full LeeWay runtime, not one model or one host shell. Runtime Fabric provides lifecycle, capability-provider discovery, dependency resolution, health, fallback, and execution-plane authority.

### Canonical Harness Estate
- Memory Harness / Echo Memory Authority
- Intelligence Harness
- Sensory Harness
- Security Harness
- Automation Harness
- Engineering Harness
- Vision Harness
- Database Harness
- Presence / Workplace layer

Harnesses may remain HARNESS-NATIVE, expose KERNEL-NATIVE capabilities, or operate as HYBRID compositions. Working Harnesses are not decomposed merely for architectural purity.

### Hybrid Kernel Fabric
Every admitted kernel is a bounded capability. A canonical Kernel Contract may include Identity, Capability Class, Formula State, Dependencies, Inputs, Outputs, Permissions, Memory Scope, Execution Scope, Events, Lifecycle, Health, Provider, Evidence Contract, Cleanup/Rollback, Veritas Contract, Version/Hash, and Provenance.

Kernels may be in-process, local services, containers, edge services, or remote/GPU-backed. Runtime Fabric resolves the provider without changing the Harness contract.

## Memory Authority
Persistent memory belongs to LeeWay.

- Memory = durable LeeWay knowledge/state.
- Context = task-specific authorized subset of memory/data.
- Cache = temporary reuse of computed/retrieved material.
- Model Session = disposable interaction/runtime state.
- Learning = verified new knowledge or capability accepted through governance.

Models, agents, MCPs, kernels, sessions, containers, and devices consume authorized memory but do not own canonical durable memory. Employee memory access remains scoped by identity, employer, role, permission, policy, and task.

## Formula-Governed Inference Ladder
Runtime should start at the cheapest authorized level capable of meeting the required evidence/confidence threshold:

1. Formula / deterministic lookup
2. Verified cached result
3. Deterministic Skill
4. Kernel / MCP direct execution
5. ~1B specialist
6. Larger local/self-hosted model
7. Large reasoning model
8. Multi-agent research/reasoning

The objective is deterministic-first execution and Zero-Inference Search Debt: once expensive reasoning is verified, repeated equivalent work should be converted into reusable memory, Skills, routing knowledge, or deterministic capabilities where appropriate.

## MCP and Skill Fabrics
MCPs are governed capability interfaces, not memory or planning authorities. Runtime should expose only the minimum relevant tool surface for a task.

Skills are verified procedural intelligence containing prerequisites, capability dependencies, execution steps, validation, failure conditions, provenance, and evidence requirements. Verified repeated reasoning should become Skill candidates rather than being rediscovered indefinitely.

## Specialist Model Layer
Small ~1B workers may be attached to capability families for ambiguity, diagnostics, optimization, or bounded planning. They are not mini Agent Lees and cannot self-authorize actions. Known deterministic work should bypass them.

Initial candidates include n8n workflow specialization and Home Assistant environment specialization. Domain LoRA is admitted only after measured benefit.

## External Capability Assimilation
External systems are capability donors, references, or wrapped engines. They never supersede LeeWay authority by default.

- LiveKit: RTC/signaling/reconnect/media mechanics.
- Hermes Agent: messaging, skill loading, delegation, scheduling, Home Assistant integration, context/session techniques.
- OpenCode: repository intelligence, LSP, patching, shell, permissions, context/tool budgeting.
- DeepSeek Harness/Cordis: plugin lifecycle, fibers, reversible effects, scoped contexts, typed events, trajectory, runtime modes, Code Mode, durable teams.
- n8n: mature workflow engine wrapped as a LeeWay Automation Kernel.
- Home Assistant: mature environmental/device engine wrapped as a LeeWay Automation/Presence Kernel.

Adjudication labels:
LEEWAY_HAS / LEEWAY_HAS_BUT_WEAKER / LEEWAY_MISSING / FOREIGN_AUTHORITY_CONFLICT

Disposition:
KEEP / ENHANCE / EXTRACT / REJECT / BENCHMARK / REFERENCE_ONLY

## Veritas, Receipts, and Learning
LeeWay evidence law remains:
- generated != executed
- executed != healthy
- healthy != authorized
- tool call != successful outcome
- mounted != proven
- model output != proof
- animation != execution

Veritas determines evidentiary success. Receipts preserve proof. Learning Ledger accepts verified outcomes only. PASS teaches and FAIL teaches.

## Employment Center / Agent Factory
An employee is a governed runtime composition, not an LLM wrapper. Employee composition may include identity, role, permissions, Memory Harness scope, Harness configuration, Skills, Kernels, MCPs/tools, models, voice/avatar, Workplace connectors, and Veritas/evidence policy.

The future Agent Factory / Harness Factory must compose from canonical LeeWay registries and standards rather than inventing architecture per employee.

## Presence / Workplace Model
Three authorities remain separate:
1. Ownership/Admin — Master QR workflow.
2. Employment/System Access — Workplace Harness and employer permissions.
3. Physical/Digital Presence — Presence Fabric, Wi-Fi/LAN, Home Assistant, and authorized endpoints.

One employee runtime may project to multiple devices without duplicating memory authority. Multiple employees may share one display while retaining separate identities and scopes.

## Digital Brain Target
Digital Brain should become a live graph of Harness and Kernel state, exposing where available: health, dependencies, provider, current task, Formula route, model, memory retrieval, MCP calls, version/hash, Veritas result, and receipt.

## Broader Completion Path
- C0 — Whole-System Diagnostic Baseline
- C1 — LeeWay Root + Runtime Fabric Authority
- C2 — Agent Lee Identity + Runtime Routing
- C3 — Harness + Formula + Veritas Governed Execution Artery
- C4 — Operational Health + Capabilities / Models / Workers
- C5 — Default Workspaces / Applications
- C6 — Databases / Receipts

## Kernel Fabric Completion Program
The detailed LK-00 through LK-56 sequence is canonical in `Docs/architecture/leeway-kernel-fabric-architecture-standard.md`. It covers Harness inventory, Formula recovery, Kernel Contract, lifecycle/dependencies, scoped contexts, Event Fabric, external audits, Memory authority, MCP/Skill Fabrics, specialist models, first-kernel proof, inference benchmarking, Digital Brain integration, and Employment Center expansion.

## Target Finish State
ONE LeeWay OS.
ONE LeeWay governance authority.
ONE canonical Formula authority.
ONE Runtime Fabric.
ONE LeeWay-owned Memory authority.
MANY Harnesses.
MANY bounded Kernels.
MANY MCP/tool interfaces.
MANY verified Skills.
REPLACEABLE models/providers.
DETERMINISTIC FIRST.
INFERENCE ONLY WHEN REQUIRED.
VERITAS BEFORE CLAIM.
LEARNING ONLY AFTER VERIFICATION.
ZERO unnecessary foreign control-plane dependencies.
