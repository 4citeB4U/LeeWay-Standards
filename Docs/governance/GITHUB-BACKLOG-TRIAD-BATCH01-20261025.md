<!--
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.GITHUB
TAG: LEEWAY.STANDARDS.GITHUB.BACKLOG_TRIAD_BATCH01
5WH:
WHAT = Organize safe pull-request review in bounded batches, preserving existing evidence.
WHY = Prevent repeated source rebuilds and unsafe merges of unrelated code.
WHO = LeeWay Industries, creator-authorized workflow.
WHERE = Docs/governance/GITHUB-BACKLOG-TRIAD-BATCH01-20261025.md
WHEN = 2026-10-25
HOW = Discover → pin → diff → verify → test → review → merge → readback.
AUTHORITY: OWNER_APPROVED_REVIEW_WORKFLOW; this file grants no signing, administrator or bypass capability.
LICENSE: Existing LeeWay terms.
-->

# LeeWay GitHub Backlog Triad — Batch 01

## Agent responsibilities (roles, not newly deployed daemons)

- **Discovery Agent:** inventory a capped, paginated PR list; record repo/PR, HEAD SHA, target base, changed paths, CI run and dependency lineage. Classify ALREADY MERGED / SOURCE-READY / STACKED / CI-FAILED / SECURITY-HOLD / PRODUCTION-GATED. Never make a mutation.
- **Source & Test Agent:** independently compare changed paths to claimed scope; inspect source, credential/command injection, dependencies and CI logs; require exact-head test results rather than borrowing historical green checks. Can propose targeted repair branch, cannot certify independently.
- **Veritas Review Agent:** independently re-read source hashes and test results, check owner-approved scope, flag signed/provider/receipt requirements, and issue a separate review decision with observed evidence. Must not create fictional signatures or bypass branch rules.
- **Merge Executor:** existing GitHub-approved merge path only; verify acceptable PR head, base, exact-head checks, reviews and staged dependencies. Merge one PR, verify target branch readback, then move to next. Stop on unexpected paths, 403, conflicts or unqualified runtime changes.

## Batch 01: Standards dependencies

| PR | Expected scope | Current disposition |
| --- | --- | --- |
| [#15](https://github.com/4citeB4U/LeeWay-Standards/pull/15) | Scanner + negative regression test (2 files observed) | FIRST: verify exact-head CI and mergeability |
| [#16](https://github.com/4citeB4U/LeeWay-Standards/pull/16) | Canonical LAW/R23 docs (2 files observed) | Independent documentation branch, review |
| [#17](https://github.com/4citeB4U/LeeWay-Standards/pull/17) | Incoming watcher + scanner + tests (3 files observed) | AFTER #15: reconcile duplicate hunks |
| [#18](https://github.com/4citeB4U/LeeWay-Standards/pull/18) | Extend watcher to Python/PowerShell/HTML/YAML (3 files observed) | AFTER #17: validate parsing/fixtures |
| [#19](https://github.com/4citeB4U/LeeWay-Standards/pull/19) | 100% compliance gate, claimed scope | SECURITY HOLD: GitHub currently reports extensive unrelated runtime, voice, agent and document files. Isolate a minimal enforcement-only PR rather than bulk merge. |

No PR in this table is considered production-approved solely by this document. Source-only and production-admission checks are separate.

## Sequential acceptance per PR

1. Fetch immutable HEAD and BASE identities; enumerate **all** changed paths, not excerpts.
2. Validate exactly the intended paths and explicit provenance; reject hidden binary uploads, embedded secrets, command injection, unsigned permission expansion and unrelated source changes.
3. Check all relevant workflows for the **exact** source SHA; build, targeted tests and required security checks must succeed. Investigate 403/protection, conflicts, absent reviews and failing CI as different categories.
4. Preserve owner-approved evidence and existing releases. Never rewrite or reset unrelated worktrees or force-push main.
5. Merge only the reviewed head via GitHub; independently inspect destination source and document post-merge checks. If blocked, record exact blocker and next minimal repair.

## Next batches

- Batch 02: Device Bridge CLI/MCP and SDK parity, Android SAF, voice and read-only tool enrollment.
- Batch 03: Runtime Fabric pinned host bindings, supervisor, B8 issuer/Veritas/recovery/ledgers, with stricter production gate.
- Batch 04: Formula H-08/H-09 source-bound registration and independently attested canonical operation.
- Batch 05: cross-device Pocket, Vision, VT, Voice, GPU, Maps, Logistics. Actual device tests where required.

**Safety:** No Docker. No unsupervised merge agent. No production permission derived from review-only pass. The existing LeeWay Device Bridge is primary device-control authority; Audit Triad is reused for proof, not replaced.
