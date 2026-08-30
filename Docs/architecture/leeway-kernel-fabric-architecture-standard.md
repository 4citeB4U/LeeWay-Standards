<!--
DOC_CLASS: ARCHITECTURE_STANDARD
DOC_ID: architecture.leeway-kernel-fabric
OWNER: Leonard J Lee / LeeWay
STATUS: CANONICAL
LAST_UPDATED: 2026-08-30
-->

# LeeWay Kernel Fabric Architecture Standard

## Purpose
This document establishes the canonical LeeWay hybrid Harness + Kernel architecture and incorporates the current Memory Harness, MCP Fabric, Skill Fabric, inference-efficiency, external capability assimilation, Employment Center, Presence, Veritas, and Learning rules.

## 1. Core Architectural Decision
LeeWay remains harness-centric. Harnesses are governed domain authorities. Kernels are bounded executable capabilities beneath Harnesses. External projects may donate proven mechanisms or remain wrapped engines, but they do not become LeeWay control-plane authorities.

### Locked laws
1. LeeWay Standards remain canonical governance.
2. Runtime Fabric governs runtime identity, lifecycle, dependency resolution, capability-provider selection, and availability.
3. Harnesses remain domain authorities.
4. Kernels are bounded capabilities, never independent governance authorities.
5. LeeWay Formula performs canonical deterministic state/classification/routing/admission functions only through its verified implementation.
6. Security governs authorization.
7. Veritas determines evidentiary success.
8. Receipts preserve inspectable proof.
9. Learning Ledger accepts verified outcomes only.
10. External systems are capability donors/reference implementations unless a dependency is explicitly proven necessary.

## 2. Canonical Harness Estate
Before importing any foreign capability, LeeWay must compare it against its existing Harness authority.

- Memory Harness / Echo Memory Authority — persistent LeeWay-owned memory, retrieval, continuity, context supply.
- Intelligence Harness — reasoning, model use, research, delegation, cognitive work.
- Sensory Harness — listening, voice, VAD, barge-in, realtime perception, vision/RTC integration.
- Security Harness — identity, authorization, permissions, policy, boundary enforcement.
- Automation Harness — jobs, triggers, workflows, n8n, Home Assistant, business/device automation.
- Engineering Harness — repository intelligence, diagnostics, patching, execution, testing, validation.
- Vision Harness — visual analysis/perception where separated from Sensory.
- Database Harness — governed storage/database capabilities.
- Presence / Workplace layer — authorized physical/digital presence and employer-system access.

## 3. Harness vs Kernel
A Harness is a governed operational domain. A Kernel is a bounded capability that implements a stable LeeWay contract.

Classify capabilities as:
- HARNESS-NATIVE — retain mature LeeWay implementation intact.
- KERNEL-NATIVE — bounded reusable capability.
- HYBRID — Harness owns workflow/policy while kernels provide functions.

Do not decompose working Harnesses merely for architectural purity. Kernelization is justified only where it improves modularity, isolation, lifecycle control, provider replacement, reuse, benchmarking, context efficiency, inference efficiency, or evidence quality.

## 4. LeeWay Kernel Contract
Every canonical LeeWay Kernel should expose, as applicable:

- Identity
- Capability Class
- Formula State / Admission State
- Dependencies
- Inputs
- Outputs
- Permissions
- Memory Scope
- Execution Scope
- Events
- Lifecycle
- Health
- Provider
- Evidence Contract
- Cleanup / Rollback
- Veritas Contract
- Version / Hash / Provenance

A kernel may run in-process, as a local service, in Docker, on an edge device, or remotely/GPU-backed. Runtime Fabric resolves the provider while preserving the capability contract.

## 5. Memory Authority — Canonical Rule
Persistent memory belongs to LeeWay. It is not owned by Agent Lee, an employee agent, an LLM, a model provider, a kernel, an MCP, a session, a container, or a device.

### Required separation
- Memory — durable LeeWay knowledge/state.
- Context — authorized subset supplied for one task.
- Cache — temporary reuse of already-computed/retrieved material.
- Model Session — disposable interaction/runtime state.
- Learning — verified new knowledge/capability accepted through governance.

Models and agents are authorized consumers of Memory Harness context, not owners of durable memory. Swapping models or restarting containers must not require migrating canonical memory authority.

Kernels may hold ephemeral scratch state, working buffers, temporary caches, and local execution state, but durable knowledge remains governed by Memory Harness.

Employee memory access is scoped by identity, role, employer, permission, policy, and task. Shared LeeWay infrastructure does not imply unrestricted shared memory.

## 6. Formula-Governed Inference Reduction
Kernelization alone does not save inference. Savings come from avoiding unnecessary model calls, loading smaller context/tool surfaces, reusing verified procedures, and escalating only when required.

### LeeWay inference ladder
- L0 — Formula / deterministic lookup
- L1 — verified cached result
- L2 — deterministic Skill
- L3 — Kernel / MCP direct execution
- L4 — ~1B specialist
- L5 — larger local/self-hosted model
- L6 — large reasoning model
- L7 — multi-agent research/reasoning

Runtime law: start at the cheapest authorized level capable of satisfying the task with the required confidence and evidence. Escalate only when necessary.

## 7. Zero-Inference Search Debt
LeeWay should avoid repeatedly paying inference cost to rediscover known work.

Novel task:
Formula -> no known skill -> reasoning/research -> tools -> solution -> Veritas -> receipt -> Learning Ledger -> skill/capability candidate.

Equivalent future task:
Formula -> Memory Harness -> verified Skill -> Kernel/MCP -> execution -> Veritas.

The objective is to spend expensive intelligence once, verify it, then reuse procedural intelligence cheaply whenever equivalent conditions recur.

## 8. MCP Fabric
MCP is a capability/interface layer — the system's governed hands. MCP is not memory authority, planning authority, or governance authority.

LeeWay should maintain a capability registry and expose only the minimum relevant MCP/tool surface required for the current task. Hundreds of irrelevant schemas should not be injected into every model context.

Do not place a separate LLM inside every MCP. Use deterministic execution where possible; use a specialist model at the capability-family level only when ambiguity or diagnosis requires it.

## 9. Skill Fabric
A Skill is verified procedural intelligence, not an LLM, MCP, Kernel, or memory authority.

A canonical Skill should specify:
- procedure
- prerequisites
- capability dependencies
- execution sequence
- validation
- failure conditions
- provenance
- evidence requirements

Repeated verified reasoning paths should become Skill candidates and enter the Skill Registry only after testing and verification.

## 10. Specialist ~1B Layer
Small specialist models are optional bounded reasoning workers, not mini Agent Lees.

Use them for ambiguity, diagnosis, optimization, domain interpretation, or bounded planning. Do not invoke them for already-known deterministic actions.

Examples:
- n8n workflow specialist
- Home Assistant environment specialist
- Engineering triage specialist
- Research/query-decomposition specialist

Specialists may recommend actions but cannot self-authorize them. Domain LoRA may be added only when benchmark evidence demonstrates benefit.

## 11. n8n and Home Assistant
Do not rewrite mature n8n or Home Assistant engines solely to make them "LeeWay-native." Wrap them behind LeeWay Kernel Contracts.

### n8n Automation Kernel
Automation Harness -> Formula/Policy -> n8n Kernel -> n8n engine -> optional workflow specialist -> Memory Harness client -> Veritas.

Known workflows execute deterministically. The specialist is used only for new/ambiguous/failed workflow reasoning.

### Home Assistant Kernel
Automation/Presence Harness -> Formula + Security -> Home Assistant Kernel -> HA engine/entities/devices/services -> optional environment specialist -> Memory Harness client -> evidence.

Network reachability never equals authorization.

## 12. External Capability Assimilation Standard
External systems are adjudicated against the existing LeeWay capability estate.

Classification:
- LEEWAY_HAS
- LEEWAY_HAS_BUT_WEAKER
- LEEWAY_MISSING
- FOREIGN_AUTHORITY_CONFLICT

Disposition:
- KEEP
- ENHANCE
- EXTRACT
- REJECT
- BENCHMARK
- REFERENCE_ONLY

### LiveKit
Study RTC, signaling, reconnect, media transport, turn-taking, and realtime failure recovery. Do not import governance/identity authority.

### Hermes Agent
Study messaging gateways, Home Assistant adapters, skill loading, delegation, terminal backends, scheduling, context optimization, session recovery, auxiliary-model routing, provider fallback. Reject Hermes persona, memory authority, and orchestration authority as LeeWay replacements.

### OpenCode
Study repository search, LSP/code intelligence, patching, shell execution, Build/Plan/Explore role separation, child-session isolation, permissions, MCP integration, context budgeting, tool budgeting, compaction. Do not import session memory or agent persona as LeeWay authority.

### DeepSeek Harness / Cordis
Study plugin lifecycle, fibers/lifecycle ownership, reversible effects, scoped contexts, typed events, append-only trajectory, Code Mode/tool composition, runtime modes, durable teams, Creator Mode patterns. Cordis does not become LeeWay control-plane authority.

Preserve exact source provenance and license when extracting implementation techniques.

## 13. Mathematics and Provenance
Never invent equations and attribute them to LeeWay or external projects.

Separate:
- published research mathematics
- model/training mathematics
- runtime algorithms
- runtime heuristics/thresholds
- state machines
- dependency graphs
- resource optimization
- LeeWay-native formalization

Potential formal structures such as dependency graphs, finite-state machines, capability admission functions, and resource-aware executor selection may be used as LeeWay formalizations, but must not be mislabeled as published external equations.

Before extending Formula mathematics, recover and hash-verify the canonical LeeWay Formula implementation, mappings, constants, tests, and provenance from the LeeWay estate.

## 14. Runtime Fabric Responsibilities
Runtime Fabric should:
- discover capability providers
- validate canonical identity
- mount/unmount kernels
- resolve dependencies
- track health/degraded states
- perform cleanup/rollback
- select local/container/remote providers
- perform allowed failover
- expose capability registry
- emit lifecycle events and evidence

Multiple providers may satisfy the same capability contract.

## 15. Security Boundary
Availability is not authorization.

- Model recommendation != permission.
- MCP exists != agent may invoke it.
- Kernel healthy != current identity may use it.
- Device reachable != device trusted.
- Generated code != executable authority.
- Avatar statement != proof of execution.

Security Harness + policy + Formula/runtime admission determine whether an operation may proceed.

## 16. Veritas, Receipts, and Learning
LeeWay evidence doctrine remains:
- generated != executed
- executed != healthy
- healthy != authorized
- tool call != successful result
- mounted != proven
- model output != proof
- animation != execution

Veritas determines whether evidence supports the claim. Receipts preserve proof. Learning Ledger accepts only verified outcomes.

PASS teaches. FAIL teaches. Possible verified learning products include new Skills, improved retrieval, safer failure conditions, improved adapters, new tests, routing improvements, or specialist-model adaptations.

## 17. Employment Center / Agent Factory
An AI employee is a governed runtime composition, not an LLM wrapper.

Employee configuration may include:
- identity
- role
- permissions
- Memory Harness access scope
- Harness configuration
- Skills
- Kernels
- MCPs/tools
- models
- voice/avatar
- workplace connector
- Veritas/evidence policy

Shared infrastructure must preserve separate identity, permissions, employer data, context, and evidence scopes.

The Agent Factory / Harness Factory should consume LeeWay Standards, Harness Registry, Kernel Registry, Skill Registry, Model Registry, Memory Scope Contract, Security Policy, and Formula routing rather than inventing architecture from scratch.

## 18. Presence / Workplace Authority Separation
Three separate authorities:
1. Ownership/Admin — Master QR workflow.
2. Employment/System Access — Workplace Harness + employer permissions.
3. Physical/Digital Presence — Presence Fabric + Wi-Fi/LAN + Home Assistant + authorized endpoints.

One authoritative employee runtime may project to multiple devices without duplicating memory authority. Multiple employees may share a display while retaining separate runtimes and scopes.

## 19. Digital Brain
Digital Brain should evolve into a live graph of actual Harness/Kernel state. Nodes should expose, where available:
- state
- health
- dependencies
- provider
- active task
- Formula route
- current model
- Memory retrieval
- MCP calls
- last event
- version/hash
- Veritas result
- latest receipt

## 20. Benchmark Standard
Do not claim efficiency improvement without measurement. Compare baseline vs Formula-routed architecture for:
- model-call count
- input/output tokens
- time to first action
- total latency
- CPU/GPU
- RAM
- energy where measurable
- context size
- tool schemas loaded
- verified success rate
- failure recovery
- evidence completeness

Architecture changes are admitted only when evidence justifies them.

## 21. Migration Standard
1. Inventory existing LeeWay implementation.
2. Identify current canonical authority.
3. Audit external source as reference only.
4. Classify overlap/gap/conflict.
5. Identify exact upstream files/functions/algorithms and provenance.
6. Extract the smallest useful capability.
7. Remove foreign authority assumptions.
8. Bind to LeeWay Harness/Kernel contract.
9. Test one bounded capability.
10. Benchmark against baseline.
11. Run Veritas.
12. Create receipt only after proof.
13. Migrate incrementally.

## 22. Ordered Kernel Fabric Program
- LK-00 Lock LeeWay sole authority.
- LK-01 Canonical Harness inventory.
- LK-02 Recover/hash-verify canonical Formula.
- LK-03 Define Kernel Contract.
- LK-04 Formula -> Kernel admission contract.
- LK-05 Lifecycle/dependency/effect contract.
- LK-06 Scoped-context/identity isolation.
- LK-07 Typed Event Fabric.
- LK-08 Trajectory -> Veritas -> Receipt relationship.
- LK-09 Capability-provider registry/fallback.
- LK-10 Classify Harness internals as HARNESS-NATIVE / KERNEL-NATIVE / HYBRID.
- LK-11 LiveKit audit.
- LK-12 Hermes audit.
- LK-13 OpenCode audit.
- LK-14 DeepSeek/Cordis audit.
- LK-15 n8n + Home Assistant wrapper audit.
- LK-16 Reproducibly strong feature audit.
- LK-17 LeeWay overlap/gap matrix.
- LK-18 Exact upstream source map.
- LK-19 KEEP/ENHANCE/EXTRACT/REJECT/BENCHMARK adjudication.
- LK-20 License/provenance verification.
- LK-21 Lock Memory Harness authority.
- LK-22 Audit current Memory Harness retrieval/index/cache/context mechanisms.
- LK-23 Benchmark external context/retrieval algorithms only where LeeWay may be weaker.
- LK-24 Lock sessions/caches/models as non-authoritative.
- LK-25 Define model/agent/kernel-agnostic memory access contract.
- LK-26 MCP capability registry/minimum-tool-surface routing.
- LK-27 MCP authority boundary.
- LK-28 Skill Registry / Skill Runtime.
- LK-29 Skill packaging/verification schema.
- LK-30 Convert repeated verified reasoning into Skill candidates.
- LK-31 Define specialist ~1B contract/wake policy.
- LK-32 n8n specialist.
- LK-33 Home Assistant specialist.
- LK-34 Add specialists only after benchmark.
- LK-35 Prohibit specialist self-authorization.
- LK-36 Add LoRA only after measured improvement.
- LK-37 Select first bounded kernel.
- LK-38 Mount/unmount/dependency/cleanup proof.
- LK-39 Formula admission/routing proof.
- LK-40 Memory Harness client proof without local memory authority.
- LK-41 MCP/Skill integration proof.
- LK-42 Deterministic path proof without model invocation.
- LK-43 1B escalation proof where ambiguity requires it.
- LK-44 Veritas validation.
- LK-45 Receipt creation.
- LK-46 Capture baseline inference/resource metrics.
- LK-47 Run Formula-routed version.
- LK-48 Compare deterministic/Skill/Kernel/1B/larger-model paths.
- LK-49 Quantify inference savings/failure tradeoffs.
- LK-50 Admit evidence-supported changes only.
- LK-51 Incremental Harness refactor only where justified.
- LK-52 Keep mature engines wrapped where replacement adds no value.
- LK-53 Support multiple providers where useful.
- LK-54 Integrate live Kernel graph into Digital Brain.
- LK-55 Expand scoped runtime model into Employment Center.
- LK-56 Repeat until no justified external capability gaps remain.

## 23. Target Finish State
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
