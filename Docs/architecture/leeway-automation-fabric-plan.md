# LeeWay Automation Fabric Architecture Plan

**Status:** Canonical architecture plan  
**Authority:** LeeWay Standards

## Purpose

LeeWay Automation is an independently usable governed automation domain that also serves Agent Lee, other agents/workers, Device Bridge, Presence/Workplace, Robotics and future LeeWay applications.

Automation authority belongs to LeeWay. External engines donate execution capabilities.

## Existing assets

- LeeWay Formula F8 Automation: trigger × governance × conditions → EXECUTE/HOLD.
- Runtime Fabric: durable jobs, queues, schedulers, adapters, receipts.
- LeeWay Device Bridge: physical capability authority and provider registry.
- n8n: deterministic workflow/orchestration provider.
- Home Assistant: device/environment aggregation provider.
- Automatisch: workflow-automation donor/provider; Community Edition is AGPL-3.0 and Enterprise files have separate licensing.
- Agent Skills/Workflows: reusable procedural and workflow knowledge.
- Veritas/Receipts/Learning Ledger: outcome proof and promotion.
- LoRA/lightweight ML: optional learned routing/policy after verified evidence.
- Robotics: future embodiment consumer through device/actuator adapters.

## Separation of authority

```
Intent / event / schedule / Formula state
        ↓
LeeWay Automation Harness
        ↓
F2 governance + F8 automation gate
        ↓
Runtime Fabric
        ↓
Automation Adapter Fabric
   ├─ native deterministic workflow
   ├─ n8n
   ├─ Home Assistant
   ├─ Automatisch
   ├─ Device Bridge
   └─ robotics/actuator runtime
        ↓
Execution
        ↓
fresh observed state
        ↓
Veritas → Receipt → Learning
```

## Provider law

n8n, Home Assistant, Automatisch and future engines are providers, not LeeWay authority.

Do not copy foreign provider code into the LeeWay core merely to achieve integration. Use adapters/contracts unless a separately justified extraction is license-compatible and passes provenance review.

## Automation classes

1. digital workflow
2. device/environment
3. scheduled/temporal
4. event-driven
5. business process
6. agent/worker jobs
7. data movement/transformation
8. recovery/remediation
9. presence/workplace
10. robotics/physical actuation

## F8 closure work

Current F8:

`Fire_a(t)=T_a(t)G_a(t)∏C_a,j(t)`

`q_A(t)=69 Fire_a(t)`

The empty-condition policy remains an explicit Formula gap. Automation Fabric MUST fail closed for unqualified zero-condition actions until Formula authority resolves it.

## Non-LLM operation

Known workflows, triggers, policies, state machines, capability routing and verified procedures SHOULD run without an LLM.

Escalation order:

```
deterministic rule / Formula / verified skill
→ native workflow
→ lightweight ML / LoRA
→ small specialist model
→ larger reasoning model only when needed
```

## Robotics boundary

Robotics is not a special exception. A robot is a physical execution target:

```
Cognitive/Automation Harness
→ Formula + Security
→ Runtime Fabric
→ Device/robot adapter
→ actuator
→ sensor feedback
→ Veritas
```

Robot embodiment MUST preserve emergency stop, permission, actuator limits, observed post-state and rollback/safe-state rules.

## Roadmap

### A0 — Discovery and ownership
Inventory existing Runtime Fabric automation-runtime, Device Bridge, n8n evidence, Home Assistant contracts, Automatisch fork, Agent Skills workflows and robotics artifacts.

### A1 — Universal automation contract
Define workflow/event/action/state/authorization/rollback/evidence schemas.

### A2 — Provider adapters
Qualify native Runtime, n8n, Home Assistant and Automatisch independently.

### A3 — Formula adapter
Define six calibrated Automation-domain dimensions and 16×6 state mapping into canonical Formula runtime-state-v1.

### A4 — Automation UI
Create a standalone Pages UI for workflow registry, provider health, triggers, dry-run, receipts and Formula state; Pages remains control/discovery UI, real execution remains on authorized runtimes.

### A5 — Device/Presence integration
Bind Device Bridge and Home Assistant through capability contracts, not vendor commands.

### A6 — Cognitive promotion
Verified repeated workflows graduate from model-assisted reasoning into deterministic Skill/Automation procedures. LoRA/lightweight ML may optimize classification/routing after Veritas evidence.

### A7 — Robotics
Add robot/actuator/sensor adapters and safety contracts; prove simulation first, then authorized physical hardware.

## Acceptance

Automation is not production-proven because a workflow definition exists. Acceptance requires real provider execution, observed post-state where applicable, Veritas and receipt.
