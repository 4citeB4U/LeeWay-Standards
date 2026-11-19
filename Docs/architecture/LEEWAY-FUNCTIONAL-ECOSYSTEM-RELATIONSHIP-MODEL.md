# LeeWay Functional Ecosystem Relationship Model

Status: Proposed baseline subject to repository audits. Scope: exact user-listed repositories/endpoints; no scope expansion.

## Relationship vocabulary
- PROVIDES: exposes a capability.
- CONSUMES: uses a capability.
- GOVERNS: establishes requirements or boundaries.
- VERIFIES: evaluates evidence/conditions.
- RECORDS: captures evidence, events, outcomes or receipts.
- INTEGRATES_WITH: exchanges data through a documented interface.
- DEPENDS_ON: requires a capability, contract or resource under a specified mode.

Group arrows are not universal direct-call edges, network connections, deployment mandates, or authorization grants.

## Functional groups
Foundation/connectivity: Federate Web (discovery/federation), VRAM Database (data/resource), Continuum (continuity/state), Runtime Fabric (runtime coordination), Tailscale (private networking), Device Bridge (device interfaces), Edge GPU (edge compute), Edge RTC (real-time communications).
Intelligence/capabilities: Model Hub, Agent Skills, Machine-Consciousness (project name; no claim of scientifically established consciousness), Formula Live, Voice Fabric, Agent Lee Vision, Learning Ledger.
Governance/evidence: Standards, Veritas, Receipt Authority, Engineering, Digital Brain Diagnostics.
Work/execution: Digital Workforce, Production Final Execution Layer.
Experiences/workspaces: Virtual Tablet hosted endpoint, Leeway-live, LeeWay IDE, Leeway-office-suites.
Specialized domains: LEEWAY-LOGISTICS-, Leeway-Agentic-CRM-ERP.

## Relationship interpretation
Foundation enables only applicable capabilities and explicitly declared optional/required dependencies. Intelligence assists execution/workspaces/domains but model output does not grant authority. Governance/evidence establishes, records, and verifies requirements and outcomes, not necessarily through network control. Execution remains authorization-bounded. Experiences request, observe, display or approve within granted permissions; they do not implicitly own domain authority.

## System contract
Each system declares stable identity, canonical URL, version, purpose, scope, owner, status, group; provided/consumed capabilities and required/optional dependencies; interfaces/protocols, inputs/outputs, permissions, errors, modes; events (source, timestamps, correlation/causation IDs, actor, version, integrity); health (HEALTHY, DEGRADED, UNAVAILABLE, UNKNOWN, NOT_CONFIGURED, NOT_APPLICABLE); authority boundaries and evidence expectations. Reconcile with existing application manifest, don't replace it. Events don't confer authority.

## Lifecycle and completion gate
Inspect; establish role and boundaries; define WHO / WHAT / WHEN / WHERE / WHY / HOW; configure identity, capabilities, interfaces, events, permissions, health; declare justified links; test contracts/integration/security/failure/recovery; verify and record evidence/gaps; register status; only then proceed. Completion gate requires identity, boundaries, capabilities, interfaces, permissions, applicable events, health, tests or non-integration rationale, evidence and map registration. Status: VERIFIED, PARTIAL, PLANNED, DEGRADED, UNKNOWN, NOT_CONFIGURED.

## Reconciliation
Preserve existing Standards authority registry, application manifest, Formula, Skills, Runtime Fabric, Device Bridge, Federate Web, Veritas, receipts and architecture law. No invention of formula results, thresholds, rankings, state, hashes or receipts. Inventory scope entries are identifiers, not verified implementations.

## Agent Tablet operating workflow alignment

The Agent Virtual Tablet is the user's orchestration and workspace surface for an idea-to-product lifecycle: idea discovery, market validation, requirements/design, build/prototype, integration qualification, commercial readiness/launch, production operation, replication/training, and improvement. The Tablet must expose relevant tasks, app handoffs, status, permissions, decisions, risks, evidence, review and recovery. It is not an authority replacement.

Every product workspace maintains WHO, WHAT, WHEN, WHERE, WHY and HOW as persistent, linked project context. The 5W1H answers must evolve as the project progresses and be connected to requirements, decisions, tasks, artifacts, evidence, approvals and release state.

The detailed lifecycle and proposed app role assignments are defined in `Docs/architecture/LEEWAY-AGENT-TABLET-IDEA-TO-PRODUCTION-WORKFLOW.md`; the proposed workspace schema is `schemas/leeway-product-lifecycle.v1.schema.json`; and the qualification checklist is `Docs/governance/LEEWAY-AGENT-TABLET-LIFECYCLE-QUALIFICATION-CHECKLIST.md`. These define intended roles and acceptance criteria, not proof of deployed adapters or actual capability. Each app must be audited and qualified individually. Missing adapters must be shown as NOT_CONFIGURED or UNKNOWN, not treated as successful integrations.

The lifecycle gate is **Model → Work → Test → Contrary Evidence → Review**. A marketable, sellable, production-running, replicable and trainable product requires evidence appropriate to each gate, explicit approval where required, a versioned release and replication package, operational/recovery procedures, and training/handover evidence. Source tests alone do not prove physical hardware performance. Production admission remains evidence-based and separate from this proposal.