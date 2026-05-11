<!--
DOC_CLASS: GOVERNANCE
DOC_ID: governance.runtime-domain-logs
OWNER: Janitor Sentinel
LAST_UPDATED: 2026-05-11
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