<!--
LEEWAY HEADER — DO NOT REMOVE
REGION: CORE.DOCS.GOVERNANCE
TAG: CORE.DOCS.REFACTOR_IMPLEMENTATION_NOTES.MAIN
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render
5WH:
WHAT = Phase 1 Implementation Notes
WHY = Preserve the existing LeeWay engineering authority document
WHO = LeeWay-Standards repository governance
WHERE = Docs/refactor/implementation-notes.md
WHEN = 2026-10-15 (metadata conformance)
HOW = Original Markdown canonical documentation
AGENTS:
AUDIT
LICENSE:
MIT
-->

# Phase 1 Implementation Notes

Scope: safe, non-destructive implementation artifacts only.

Delivered in this phase:

1. Layer policy configuration at .leeway/layer-policy.json
2. Automated layer path scanner at scripts/check-layer-paths.mjs
3. Quarantine utility at scripts/apply-quarantine-ledger.mjs
4. Ownership matrix at Docs/refactor/ownership-matrix.md
5. Initial purge ledger at Docs/refactor/purge-ledger.csv

Execution examples:

1. Validate layer paths:
   node scripts/check-layer-paths.mjs

2. Dry run quarantine moves:
   node scripts/apply-quarantine-ledger.mjs

3. Apply quarantine moves:
   node scripts/apply-quarantine-ledger.mjs --apply

Safety:

1. Quarantine tool defaults to dry run.
2. Ledger action QUARANTINE is the only action applied by the tool.
3. MOVE and EXTERNALIZE actions remain manual until review checkpoint.
