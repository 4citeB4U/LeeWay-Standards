<!--
DOC_CLASS: GOVERNANCE
DOC_ID: governance.runtime-domain-workspace
OWNER: Agent Lee Prime
LAST_UPDATED: 2026-05-11
-->

# Runtime Domain Governance — Workspace

## Purpose

The `workspace` domain is the governed action plane where planning, coding, mutation, verification, and tool orchestration occur.

## Canonical Rule

> Workspace execution is where work happens, but runtime law still originates in LeeWay Standards.

## Responsibilities

- enforce pending-edits workflow for high-risk changes
- keep write actions attributable to declared runtime units
- maintain deterministic tool routing and model-lane decisions
- prevent blind edits and unreceipted mutation

## Allowed State

- source files
- staged edits
- pending-edits packets
- verification artifacts tied to active work

## Forbidden State

- direct hidden mutation bypassing approvals
- unowned agent edits
- runtime-private override of canonical agent IDs

## Minimum Law

- approval before risky writes
- receipt for write and verify loops
- rollback pathway for destructive operations

Canonical references:
- [../../standards/sovereign-runtime-registry.json](../../standards/sovereign-runtime-registry.json)
- [../../standards/runtime-operations-registry.json](../../standards/runtime-operations-registry.json)