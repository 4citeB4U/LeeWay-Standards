<!--
DOC_CLASS: GOVERNANCE
DOC_ID: governance.runtime-domain-safety
OWNER: Shield Governor
LAST_UPDATED: 2026-05-10
-->

# Runtime Domain Governance — Safety

## Purpose

The `safety` domain exists to ensure that LeeWay VS Code never stops being governed simply because it is powerful.

This domain is owned by **LeeWay Standards** and consumed by LeeWay VS Code as a projection runtime. Safety logic may execute in the runtime, but its constitutional authority originates here.

## Canonical Rule

> Projection runtimes may consume safety agents and policies from LeeWay Standards, but they may not privately redefine the law that governs them.

## Governing Agents

- `shield-governor-agent`
- `attestation-marshal-agent`
- `threat-sentinel-agent`

## Responsibilities

- threat detection and escalation review
- approval enforcement for risky actions
- mutation and command boundary review
- break-glass control and auditability
- redaction of secrets and sensitive values
- safe-mode activation when runtime integrity is at risk

## Allowed State

- policy files
- scanners
- rollback logic
- attestation outputs
- safety receipts
- redaction and incident metadata

## Forbidden State

- hidden bypass flags
- silent approval overrides
- unreceipted privileged mutation
- direct secret disclosure in user-facing output
- private runtime-only redefinition of canonical safety identities

## Minimum Evidence Requirements

- receipt for each high-risk approval
- audit trail for break-glass events
- incident log for blocked or escalated threats
- traceable mapping to the governing action or request

## Relationship To LeeWay VS Code

LeeWay VS Code may host and execute safety workflows, but it must source its sovereign safety identities from [../../standards/sovereign-runtime-registry.json](../../standards/sovereign-runtime-registry.json) and [../../standards/CANONICAL_RUNTIME_STACK.md](../../standards/CANONICAL_RUNTIME_STACK.md).