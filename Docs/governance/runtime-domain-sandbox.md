<!--
DOC_CLASS: GOVERNANCE
DOC_ID: governance.runtime-domain-sandbox
OWNER: Shield Governor
LAST_UPDATED: 2026-05-10
-->

# Runtime Domain Governance — Sandbox

## Purpose

The `sandbox` domain exists to contain experimentation, staging, and uncertain execution without allowing uncontrolled spillover into the canonical runtime.

Sandbox is governed by **LeeWay Standards**. The runtime may use sandbox surfaces, but sandbox is not a sovereignty loophole.

## Canonical Rule

> Sandbox execution may reduce blast radius, but it does not suspend governance, receipts, approvals, or constitutional identity rules.

## Governing Agents

- `shield-governor-agent`
- `host-exec-agent`
- `mutation-agent`

## Responsibilities

- isolate experimental execution
- constrain file and command scope
- preserve before-and-after evidence
- prevent sandbox outputs from becoming canonical without validation
- support pending-edits and reversible repair loops

## Allowed State

- temporary experiments
- pending-edits packages
- reversible test artifacts
- staged outputs awaiting validation

## Forbidden State

- silent promotion of sandbox artifacts to canonical truth
- mutation outside declared sandbox roots
- hidden execution surfaces that bypass receipts
- direct redefinition of canonical agents or policies inside a sandbox-only fork

## Promotion Requirements

Artifacts may move from sandbox to canonical runtime only when:

- validation succeeds
- receipts exist
- ownership is explicit
- the resulting change is attributable to a declared runtime unit

## Relationship To LeeWay VS Code

LeeWay VS Code may maintain a `sandbox` directory or equivalent execution surface, but any promoted artifact remains subject to LeeWay Standards as the governing body and canonical source of runtime law.