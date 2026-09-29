# LeeWay Execution Cursor & Blocker Discipline

**Status:** Canonical execution law  
**Purpose:** prevent blocker-resolution, side repairs, discoveries, or expansions from being mistaken for completion of the parent mission.

## Core law

Every substantive LeeWay program MUST have:

1. one canonical ordered execution plan;
2. one current phase;
3. one current step;
4. one acceptance gate;
5. one blocker ledger;
6. one evidence state;
7. one explicit return point.

A blocker may create sub-work. It may not move the parent cursor.

## Cursor model

```
MISSION
  └─ PHASE
      └─ STEP
          ├─ acceptance gate
          ├─ blocker(s)
          │   └─ repair sub-loop(s)
          └─ evidence
```

The authoritative cursor is:

```
MISSION_ID
PHASE_ID
STEP_ID
ACCEPTANCE_GATE
STATE
BLOCKERS[]
NEXT_RETURN_POINT
```

## Completion law

The following are NOT completion:

- discovering the blocker;
- designing a workaround;
- implementing a workaround;
- making a new repository;
- creating an adapter;
- passing a sub-test;
- restoring a dependency;
- creating a receipt for the blocker repair.

Completion occurs only when the original step's acceptance gate is satisfied and verified.

## Blocker return law

When a blocker is encountered:

```
record blocker
→ freeze parent cursor
→ open bounded repair loop
→ investigate
→ diagnose
→ implement
→ test
→ verify blocker closure
→ record evidence
→ RETURN TO FROZEN PARENT CURSOR
→ re-run original acceptance gate
→ only then advance
```

The next action after a blocker closes is never inferred from memory. It is read from the parent execution plan.

## Expansion law

A blocker may expose a reusable ecosystem capability. That capability may be promoted into Standards, Skills, Adapter Fabric, Formula mappings or another canonical owner.

However:

```
useful expansion ≠ parent mission completion
```

Expansion work must record:
- what parent blocker caused it;
- what reusable capability was gained;
- where it was promoted;
- the exact parent step to return to.

## First-success law

```
first success != completion
```

A successful sub-component, single platform, first provider, first browser load or first test is evidence only for its own acceptance scope.

## Mandatory progress report

At any major transition, report:

```
MISSION:
PHASE:
CURRENT STEP:
STATE:
BLOCKER:
BLOCKER SUB-WORK:
RETURN POINT:
ACCEPTANCE STILL REQUIRED:
NEXT ACTION:
```

## State vocabulary

- NOT_STARTED
- IN_PROGRESS
- BLOCKED
- REPAIR_IN_PROGRESS
- REPAIRED_PENDING_RETEST
- EXECUTED_UNVERIFIED
- VERIFIED_PASS
- VERIFIED_FAIL
- COMPLETE

Only VERIFIED_PASS may satisfy an acceptance gate.

## No-distraction rule

New ideas discovered during execution go to a BACKLOG unless they are required to close the current acceptance gate.

If required:
- classify as blocker sub-work;
- execute it;
- return immediately to the frozen parent cursor.

If not required:
- preserve it;
- do not switch the active mission.

## Formula / Veritas alignment

For measurable work:

```
State → Action → Outcome → Veritas → Learning → Updated State
```

The execution cursor itself is part of state. A receipt must never imply a later phase was reached merely because a blocker was repaired.

## Canonical current program

For the LeeWay Ecosystem Formula Funnel execution program:

```
P1 Voice Fabric Production Closure
P2 Sensory Harness
P3 Cognitive State Fabric
P4 Automation Fabric
P5 Device Bridge ↔ Presence
P6 Robotics Simulation
P7 Physical Robotics Qualification
```

The program advances only by acceptance-gate closure, never by conversational topic changes.
