<!--
DOC_CLASS: ARCHITECTURE
DOC_ID: architecture.documentation-authority-map
OWNER: Librarian Aegis / Creator Authority
LAST_UPDATED: 2026-10-02
-->

# LeeWay Documentation Authority Map

## Purpose

Organize LeeWay documentation by authority and evidence class without copying every document into one repository. The documentation system is an index of canonical owners, not a new duplicate archive.

## Governing law

1. Documentation lives with the component that owns the truth.
2. LeeWay-Standards owns documentation taxonomy and authority rules.
3. Product/research repositories own their implementation-specific evidence.
4. Cross-repository maps point to canonical sources; they do not replace them.
5. A generated summary is not canonical when a source document exists.
6. Receipts and immutable evidence are not rewritten into narrative docs.
7. Historical documents remain lineage/evidence unless explicitly promoted.
8. Conflicts are resolved by authority, version/hash and evidence—not filename similarity or recency alone.

## Documentation layers

### L0 — Constitutional / Canon

Owner: `4citeB4U/LeeWay-Standards`  
Purpose: identity, principles, constitutional laws, non-negotiable governance.

Examples:
- `Docs/canon/*`
- standards/policy authorities

### L1 — Architecture / Governance

Owner: `4citeB4U/LeeWay-Standards` plus canonical subsystem owners  
Purpose: system boundaries, ownership, authority, lifecycle, security, documentation taxonomy.

Examples:
- `Docs/architecture/*`
- `Docs/governance/*`
- Librarian Aegis documentation rules

### L2 — Scientific / Research

Owner: the canonical research repository  
Purpose: hypotheses, mathematical definitions, experiment design, claim boundaries, failures, calibration and scientific interpretation.

Current Machine Consciousness owner:
- `4citeB4U/Leeway-formula-live/docs/machine-consciousness/*`

### L3 — Implementation / Runtime

Owner: the canonical implementation repository  
Purpose: interfaces, source architecture, runtime contracts, provider/adaptor implementation, deployment details.

Examples:
- `4citeB4U/Leeway-Runtime-Fabric`
- `4citeB4U/LeeWay-Agent-Skills`
- `4citeB4U/LEEWAY-DEVICE-BRIDGE`
- `4citeB4U/LeeWay-Voice-Fabric`

### L4 — Verification / Evidence

Owner: the subsystem that executed plus canonical receipt authority  
Purpose: PASS/FAIL evidence, hashes, test traces, signed/qualified receipts, failure boundaries.

Rules:
- execution evidence must remain distinguishable from narrative;
- SOURCE_IMPLEMENTED is not EXECUTED;
- EXECUTED is not VERIFIED;
- a self-authored PASS marker is not independent verification.

### L5 — Product / Human Presentation

Owner: product repository  
Purpose: user-facing explanation, onboarding, story, product documentation, demonstrations.

Examples:
- `4citeB4U/RapidWebDev` — Why LeeWay, dedication/creator narrative, Digital Brain and guided presentation
- product-specific READMEs and user docs

Human presentation may summarize lower layers but must link back to evidence for technical claims.

### L6 — Historical / Lineage

Owner: original source repository or designated estate/recovery archive  
Purpose: preserve prior implementations, superseded designs and intellectual lineage.

Promotion path:
`discover → classify → deduplicate → normalize → qualify → promote → register → re-enumerate`

Use `leeway-legacy-capability-recovery`; do not bulk-copy historical repositories into canonical systems.

## Document status vocabulary

Every important document should make its state clear where practical:

- CANONICAL
- CURRENT
- PROPOSED
- BUILD-READY
- SOURCE_IMPLEMENTED
- EXECUTED_UNVERIFIED
- VERIFIED
- SUPERSEDED
- HISTORICAL
- BLOCKED
- FAILED

## Machine Consciousness document stack

Canonical current research stack in `Leeway-formula-live/docs/machine-consciousness/`:

1. Origin conversation — source history.
2. Master Plan — governing scientific/engineering plan.
3. Research Notebook — mathematics, research notes, open questions.
4. Decision Ledger — settled/superseded decisions.
5. Experiment Log — experiment chronology.
6. Claim Register — exact claim/evidence boundary.
7. Scientific Dossier — consolidated technical explanation.
8. Failure/Repair Ledger — reusable negative evidence.
9. Learning Ledger — Veritas-qualified reusable learning.
10. Reference Template / publication/integration plans — application/presentation layers.
11. MC-G11 Ecosystem Capability Integration Proof — proof that non-LLM cognition can reuse the existing LeeWay capability/runtime fabric.

## Cross-repository ownership for MC-G11

| Concern | Canonical owner |
|---|---|
| Machine cognition | Leeway-formula-live |
| Formula | Leeway-formula-live |
| Capability manifold | LeeWay-Agent-Skills |
| Skill orchestration | LeeWay-Agent-Skills |
| Tool gateway | LeeWay-Agent-Skills |
| Runtime fabric | Leeway-Runtime-Fabric |
| Device execution | LEEWAY-DEVICE-BRIDGE |
| Voice | LeeWay-Voice-Fabric |
| Standards / documentation taxonomy | LeeWay-Standards |
| Human-facing LeeWay story | RapidWebDev |

## Anti-duplication documentation rule

Before creating a new LeeWay document:
1. search the canonical owner;
2. search the historical estate when reuse is plausible;
3. determine whether the need is an update, index, cross-reference, experiment record or truly new authority;
4. update or cross-link the canonical artifact whenever possible;
5. create a new document only when it represents a distinct authority, experiment, contract or audience.

Documentation must follow the same profitability law as code:
**write authoritative knowledge once, verify it, and reuse it through references.**
