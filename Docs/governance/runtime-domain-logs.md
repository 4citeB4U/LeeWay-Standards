<!--
DOC_CLASS: GOVERNANCE
DOC_ID: governance.runtime-domain-logs
OWNER: Janitor Sentinel
LAST_UPDATED: 2026-05-11
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.GOVERNANCE
TAG: LEEWAY.STANDARDS.GOVERNANCE.RUNTIME_DOMAIN_LOGS
DISCOVERY_PIPELINE: Voice -> Intent -> Location -> Vertical -> Ranking -> Render
5WH:
WHAT = Preserve the existing logs runtime-domain governance document
WHY = Qualify existing source ownership without changing established policy
WHO = Janitor Sentinel
WHERE = Docs/governance/runtime-domain-logs.md
WHEN = 2026-10-25 header qualification; original LAST_UPDATED remains 2026-05-11
HOW = Retain original body and authority boundaries intact
LICENSE: Existing file and repository terms remain unchanged
-->

# Runtime Domain Governance — Logs

## Purpose

The `logs` domain carries operational event streams for runtime behavior, errors, diagnostics, and governance-relevant system activity.

## Canonical Rule

> Logs are operational truth signals, not optional debug noise.

## Responsibilities

- preserve attributable runtime event trails
- support incident review and governance forensics
- enforce retention and rotation policies
- prevent secret leakage in log output

## Allowed State

- runtime event logs
- error traces
- health and drift diagnostics
- retention metadata

## Forbidden State

- secret-bearing logs
- silent log deletion without policy basis
- mutation of historical logs without audit annotation

## Minimum Law

- redact sensitive values
- retain timestamped event context
- apply retention with auditability

Canonical references:
- [./runtime-domain-safety.md](./runtime-domain-safety.md)
- [./runtime-domain-reports.md](./runtime-domain-reports.md)