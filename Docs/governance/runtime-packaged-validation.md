<!--
LEEWAY HEADER — DO NOT REMOVE
DOC_CLASS: GOVERNANCE
DOC_ID: governance.runtime-packaged-validation
OWNER: Attestation Marshal
LAST_UPDATED: 2026-05-11
REGION: CORE.DOCS.GOVERNANCE
TAG: CORE.DOCS.GOVERNANCE_RUNTIME_PACKAGED_VALIDATION.MAIN
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render
5WH:
WHAT = Runtime Governance — Packaged Validation
WHY = Preserve the documented LeeWay governance and ownership contract
WHO = Attestation Marshal
WHERE = Docs/governance/runtime-packaged-validation.md
WHEN = 2026-10-14 (header conformance review)
HOW = Markdown governance documentation under original document owner
AGENTS:
AUDIT
LICENSE:
MIT
-->

# Runtime Governance — Packaged Validation

## Purpose

Defines governance requirements for packaged LeeWay VS Code runtime and extension validation workflows.

## Canonical Rule

> Packaging and installation checks are governance events, not just build events.

## Required Validation Phases

1. Build artifact generation (`.vsix` or equivalent package)
2. Isolated profile installation validation
3. Runtime launch validation
4. Core UI and command-path validation
5. Evidence and receipt collection
6. Compliance and attestation summary

## Required Evidence

- package identifier and version
- installation target and profile scope
- launch outcome
- command-path or click-through outcome
- linked runtime logs and memory artifacts
- final attestation summary with status (`verified`, `partial`, `failed`)

## Governance Constraints

- no silent install into unmanaged profiles when running validation flows
- no attestation without evidence links
- no release-level claim without verification summary

## Relationship To Domain Laws

- Safety domain governs threat boundaries during validation
- Sandbox domain governs isolated profile and test execution
- Reports domain governs attestation output
- Memory domain governs continuity and traceability of validation runs

Canonical references:
- [./runtime-domain-safety.md](./runtime-domain-safety.md)
- [./runtime-domain-sandbox.md](./runtime-domain-sandbox.md)
- [./runtime-domain-memory.md](./runtime-domain-memory.md)
- [./runtime-domain-reports.md](./runtime-domain-reports.md)