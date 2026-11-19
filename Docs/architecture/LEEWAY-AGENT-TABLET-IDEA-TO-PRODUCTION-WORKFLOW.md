# LeeWay Agent Tablet: Idea-to-Product Operating Workflow

**Status:** Proposed operating model; individual app integrations and stage completion must be qualified with evidence.
**Governing idea:** LeeWay is one interconnected ecosystem of six interlocking functions sharing identity, permissions, provenance and recoverable state—not a stack of independent apps.

## 1. The 5W1H product record

Every product workspace establishes and continuously updates:
- **WHO:** accountable owner, collaborators, agents, customers, approvers, operators and support roles.
- **WHAT:** problem, target audience, requirements, product/service definition, deliverables, exclusions and acceptance criteria.
- **WHEN:** milestones, dependencies, deadlines, releases, review dates, maintenance and retirement.
- **WHERE:** workspace, source repository, test and production environments, deployment targets, customer/market, devices and operating locations.
- **WHY:** user pain, evidence of demand, value proposition, differentiation, intended outcomes and business rationale.
- **HOW:** workflow, resources, skills, architecture, implementation plan, validations, launch, operation, replication and training.

These are durable project fields and linked artifacts, not a one-time questionnaire.

## 2. Lifecycle stages, Tablet experience and app responsibilities

### Stage 1 — Idea capture and discovery
**Outcome:** validated problem framing, initial customer hypothesis, concept record and discovery plan.
**Tablet surfaces:** Virtual Tablet workspace; Office Suites for notes, briefs and research; Agent Lee Vision when visual input is relevant; Voice Fabric for speech capture; Agent Skills and Model Hub for authorized research/analysis assistance; Learning Ledger to preserve decision/learning lineage.
**Gate:** named owner; 5W1H draft; problem statement; evidence and assumptions distinguished; initial scope.

### Stage 2 — Market and business validation
**Outcome:** customer segments, competitor/market research, value proposition, pricing hypotheses, demand evidence and business case.
**Tablet surfaces:** Office Suites for business plan and research artifacts; Agentic CRM/ERP for prospective customer/lead and commercial workflow if applicable; Logistics for delivery/fulfillment requirements if applicable; Agent Skills/Model Hub for assistance; Formula Live for declared deterministic calculations, with inputs and formula provenance.
**Gate:** target customer and value proposition; assumptions recorded; viability decision and supporting evidence; risks.

### Stage 3 — Requirements and product design
**Outcome:** versioned requirements, UX/design artifacts, system boundaries, architecture, backlog, test plan, product specification.
**Tablet surfaces:** LeeWay IDE for technical design and code; Office Suites for specifications, design brief and customer-facing documents; Engineering for engineering lifecycle and traceable work; Standards for applicable contracts/architecture constraints; Agent Skills/Model Hub as helpers.
**Gate:** requirements traceable to user/business outcomes; architecture and interfaces defined; acceptance tests planned; ownership/permissions established.

### Stage 4 — Build and prototype
**Outcome:** working prototype or implementation, assets, source, build instructions and linked work items.
**Tablet surfaces:** LeeWay IDE for source, edits and development; Digital Workforce for delegated tasks and controlled agent execution; Agent Skills and Model Hub for capability/model selection; Runtime Fabric for approved runtime/task coordination; VRAM Database and Edge GPU when relevant and available; Device Bridge for declared device integrations; Edge RTC for applicable real-time interfaces; Voice Fabric and Agent Lee Vision when product features require them.
**Gate:** build artifacts and version identified; implementation linked to requirements; test environment and configuration recorded; no claim of completion solely from generated code.

### Stage 5 — Integration, test and qualification
**Outcome:** test results, defect/risk disposition, contrary evidence, verification report and release candidate.
**Tablet surfaces:** LeeWay IDE and Engineering for tests/defect work; Digital Brain Diagnostics for diagnostic data when supported; Veritas for defined verification; Formula Live for applicable authoritative computations; Receipt Authority for evidence custody/receipts; Standards for qualification criteria; Runtime Fabric and Device Bridge for relevant integration tests.
**Required inspection sequence:** Model → Work → Test → Contrary Evidence → Review.
**Gate:** acceptance criteria evaluated; integration, security, failure and recovery tests appropriate to scope; evidence captured; outstanding gaps and risks explicitly reviewed; authorized release decision.

### Stage 6 — Product packaging, commercial readiness and launch
**Outcome:** marketable product package, customer-facing collateral, pricing and licensing terms (reviewed by accountable people), distribution/installation instructions, release notes, support plan and launch plan.
**Tablet surfaces:** Office Suites for marketing collateral, proposals, instructions and product documentation; Agentic CRM/ERP for pipeline, customer, orders and commercial operations when applicable; Logistics for fulfillment and inventory/delivery when applicable; LeeWay IDE for packaging and release artifacts; Engineering for release traceability; Receipt Authority/Veritas for applicable evidence.
**Gate:** product package version and contents identified; claims match evidence; sales/support responsibilities, delivery, licensing and acceptance terms approved; release authorized.

### Stage 7 — Production deployment and operation
**Outcome:** controlled deployed product/service, operational ownership, monitoring, support, incident and maintenance processes.
**Tablet surfaces:** Production Final Execution Layer for approved production execution; Runtime Fabric for applicable execution coordination; Tailscale for approved private network connectivity; Device Bridge for authorized device operations; Edge GPU/VRAM Database/Edge RTC for applicable infrastructure; Digital Brain Diagnostics for supported health/diagnostic signals; Continuum for approved continuity/recovery; Agentic CRM/ERP for customer/operational records; Logistics for applicable fulfillment.
**Gate:** production environment and release identity confirmed; deployment authority and permissions; readiness/rollback and support plans; operational signals and recovery paths; evidence of deployment and review.

### Stage 8 — Replication, onboarding and training
**Outcome:** repeatable installation/deployment package, operator/customer training, reproducible configuration, handover and measured readiness.
**Tablet surfaces:** LeeWay IDE for reproducible code/build artifacts; Engineering for runbooks and procedures; Office Suites for training manuals, checklists and learning materials; Agent Skills for packaged task instructions where governed; Digital Workforce for bounded training/demo tasks; Learning Ledger for lineage and lessons; Continuum for authorized state restoration; Federate Web for approved discovery/federation; Device Bridge for enrollment workflows; Standards for repeatability requirements; Veritas for reproduction evidence; Receipt Authority for evidence custody.
**Gate:** documented prerequisites; clean reproduction from approved artifacts; training steps and learner/operator checks; identity, permissions and recovery tested; replication evidence and handover reviewed.

### Stage 9 — Feedback, improvement and lifecycle
**Outcome:** customer feedback, product metrics with source and definition, backlog, updates, retraining, versioned improvements and eventual retirement plan.
**Tablet surfaces:** Agentic CRM/ERP for customer feedback/workflows; Learning Ledger for learning lineage; Digital Brain Diagnostics for relevant signals; Engineering/IDE for improvements; Formula Live for declared calculations; Veritas and Receipt Authority for applicable verification/evidence; Continuum for continuity; Standards for change/requalification.
**Gate:** feedback and signals are sourced and contextualized; change impact assessed; improvements tested and reviewed; lifecycle status updated.

## 3. App role catalog — every app has a reason to be present

| App/system | Assigned functional role | Why it belongs in the Tablet workflow |
|---|---|---|
| Agent Virtual Tablet | Orchestration and user workspace | Shows the lifecycle, work, app handoffs, status, approvals, evidence, gaps and recovery without becoming the authority for underlying systems. |
| LeeWay-office-suites | Documents and communication artifacts | Creates/maintains briefs, specifications, proposals, manuals, marketing collateral and training materials. |
| Leeway-live | Live experience/work surface (subject to audit) | Provides its declared live interaction/work capability; route product workflow only through qualified interfaces. |
| leeway-ide | Engineering and build workspace | Source, design implementation, build, test, packaging and versioned technical artifacts. |
| LeeWay-Engineering | Engineering lifecycle/traceability | Links requirements, work, changes, defects, reviews, release and technical evidence. |
| LeeWay-Agent-Skills | Reusable capability/task instructions | Provides versioned task skills with declared permissions and prerequisites; skills do not bypass authorization. |
| LeeWay-Model-Hub | Model discovery/selection/integration | Exposes model choices and declared capabilities; models are assistive, not approval or authority. |
| Machine-Consciousness | Project-defined cognitive/agent capability | Its role must be defined from actual audited functionality; name alone is not a claim of consciousness. |
| Leeway-formula-live | Deterministic calculation/formula authority | Performs declared calculations with provenance and inputs; never invents outputs or silently replaces formula authority. |
| LeeWay-Voice-Fabric | Speech/audio capability | Voice input/output and audio tasks when needed for product or workspace interaction. |
| LeeWay-Agent-Lee-Vision | Visual/perception capability | Processes visual input when the workflow or product requires it, subject to privacy and permission. |
| LeeWay-Digital-Workforce | Task/worker orchestration | Assigns, tracks and coordinates authorized human/agent work with boundaries and outcomes. |
| Leeway-Runtime-Fabric | Runtime/execution coordination | Coordinates applicable persistent or managed execution within defined authority and recovery rules. |
| LeeWay-Continuum | Continuity and restoration | Preserves/restores authorized workspace or execution state, with recovery tested rather than presumed. |
| LeeWay-VRAM-Database | Declared data/resource capability | Provides audited resource/data functions for workloads; role and interfaces must be confirmed in repository. |
| LeeWay-Edge-GPU | Edge hardware/compute | Provides local/edge compute when applicable; hardware performance claims require measurements. |
| Leeway-Tailscale | Private connectivity | Enables scoped private network connectivity where configured; network presence is not application authorization. |
| LEEWAY-DEVICE-BRIDGE | Device interface and enrollment | Connects and manages permitted devices; enrollment/passport/authentication must be demonstrated. |
| LeeWay-Edge-RTC | Real-time transport | Provides applicable realtime communication transport, not identity or authority by itself. |
| Leeway-Federate-Web | Federation/discovery | Enables declared federation/discovery interactions; federation does not imply trust or unrestricted access. |
| Receipt-Authority | Receipt/evidence custody | Captures/holds receipts and evidence through its canonical contract; receipt claims require actual records. |
| LEEWAY-VERITAS | Verification | Verifies defined claims against evidence and conditions; does not manufacture evidence. |
| LeeWay-Standards | Governance/contracts | Defines contracts, boundaries, qualification rules and architecture reconciliation. |
| LeeWay-Learning-Ledger | Learning and lineage | Records relevant learning/lineage and version context for reproducibility and improvement. |
| LeeWay-Digital-Brain-Diagnostics | Diagnostics | Provides diagnostics and operational signals where implemented and validated. |
| LeeWay-Production-Final-Execution-Layer | Controlled production execution | Executes approved production tasks subject to permission, release and operational gates. |
| Leeway-Agentic-CRM-ERP | Customer/commercial operations | Manages commercial/customer workflow such as leads, accounts, opportunities, orders or operations as audited. |
| LEEWAY-LOGISTICS- | Logistics/fulfillment domain | Supports applicable supply, inventory, delivery or fulfillment workflow based on audited functionality. |

## 4. Six interlocking functions (functional architecture)

These are cross-cutting functions, not sequential app silos:

1. **Identity & access:** owner, users, agents, devices, service identity, permissions, scoped approvals, revocation and enrollment.
2. **Work & orchestration:** product stages, tasks, dependencies, delegated work, execution coordination, workspace handoffs.
3. **Capability & infrastructure:** data, compute, models, formula, voice, vision, networking, devices, realtime and domain capabilities.
4. **Governance & verification:** standards, requirements, approvals, test gates, contrary evidence, Veritas and release qualification.
5. **Provenance & evidence:** versioned artifacts, events, source/actor/time, correlation, receipts, evidence custody and review.
6. **Continuity & replication:** persistent project state, reproducible artifacts, recovery, deployment, onboarding, training and repeatable operations.

A workflow stage may use multiple functions simultaneously. A relationship must be declared and qualified; diagrammatic relationships do not imply live integrations.

## 5. Tablet workflow behavior

- Present a product workspace and lifecycle stage with next action, prerequisites, owner, due date, status, risks, decisions, evidence and review state.
- Route tasks to relevant apps through their declared interfaces. Where an adapter is absent, display NOT_CONFIGURED or UNAVAILABLE and offer a documented manual handoff—not a false success.
- Keep a canonical product/project identity, artifact versioning, stage status, task linkage, permission context and evidence references across handoffs.
- Require stage gates and approvals where defined; do not let model-generated output approve itself.
- Record outcomes, failures, retries, recovery and change history when supported by contracts.
- Support reusable product templates and replication packs, while retaining instance-specific identities, secrets and configuration.
- Separate development, test, release and production environments.
- Show the product's progress as evidence-backed state, not a cosmetic percentage.

## 6. Replication package

A release intended to be replicable/trainable should include, where applicable:
- product and release identity/version;
- source and artifact references, integrity checks and build provenance;
- requirements, architecture and interface contracts;
- reproducible build/install/deploy steps and dependency inventory;
- configuration template (secrets excluded), environment prerequisites and permissions;
- tests, test results, contrary evidence, verification and approval records;
- rollback, backup, restoration, maintenance and support instructions;
- customer-facing documentation, license/terms, marketing claims and sales package;
- operator and user training plan, checklists and competency checks;
- evidence of successful reproduction and recovery under defined conditions.

## 7. Operating inspection gate

**Model → Work → Test → Contrary Evidence → Review**

1. Model: specify intent, requirements, interfaces, boundaries and expected outcomes.
2. Work: implement and execute authorized tasks.
3. Test: test against explicit acceptance criteria and expected behavior.
4. Contrary Evidence: actively search for failure, mismatch, limitations and unsupported claims.
5. Review: accountable review, disposition, approval or rejection, status and evidence custody.

Source-level tests do not prove physical hardware behavior. Production status requires applicable real-world evidence. No lifecycle stage is considered complete solely because an app, repo, document, agent or dashboard exists.

## 8. Qualification and gap reporting

For every Tablet app integration, audit the repository or hosted endpoint before claiming it works. Record: role; current interface; identity/authentication; permissions; input/output; dependencies; health; failure behavior; adapter status; test status; evidence; gaps; reviewer; next action.

Use status vocabulary from the existing Standards contracts and do not infer implementation from this proposed role map.
