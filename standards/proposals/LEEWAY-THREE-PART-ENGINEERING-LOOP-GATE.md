<!--
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.GOVERNANCE.PROPOSALS
TAG: LEEWAY.STANDARDS.GOVERNANCE.THREE_PART_ENGINEERING_LOOP_GATE.V1
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render
5WH:
WHAT = Propose mandatory GitHub, LeeWay Ecosystem, and Vercel evidence for each engineering-loop phase
WHY = Prevent source-only success from being misreported as qualified deployment or production execution
WHO = LeeWay Standards stewardship and owner-authorized reviewers
WHERE = standards/proposals/LEEWAY-THREE-PART-ENGINEERING-LOOP-GATE.md
WHEN = 2026-10-28
HOW = Map the canonical ten-phase engineering loop to deployment evidence and release receipt fields
LICENSE: Existing repository license and owner intellectual-property terms apply
-->

# Three-Part Delivery Gate — Engineering Loop Integration (Proposed)

Status: PROPOSED; companion to Three-Part GitHub–Ecosystem–Vercel Delivery Law.

For every LeeWay task, apply the existing engineering loop with a three-part delivery ledger:

| Phase | Required GitHub / LeeWay / Vercel evidence |
|---|---|
| Investigate | Discover canonical repos, GitHub Pages, Vercel projects, LeeWay providers, runtime state, and current source SHA. |
| Diagnose | Classify failures separately as source, build, Pages, Vercel ingress, identity, provider binding, execution, or receipts. |
| Plan | Declare owner, change scope, cross-repo dependency map, rollout and rollback, and target deployment surfaces. |
| Implement | Change canonical GitHub source on a review branch; build governed LeeWay adapters; configure Vercel without exposing secrets. |
| Test | Run unit/integration/security tests; test Pages assets and Vercel routes where applicable; exercise provider mocks without claiming production. |
| Validate | Confirm real runtime bindings, identity, authority, persistence, network reachability and compatibility. |
| Repair | Fix exact failing layer without bypassing governance or creating a second authority. |
| Retest | Re-run affected and end-to-end tests, including denied unauthorized paths. |
| Verify | Perform real owner-authorized operation and independent Veritas PRE/POST; verify readback, receipts and recovery. |
| Evidence | Record GitHub commit/PR, Pages URL and build, Vercel deployment ID/URL, LeeWay provider IDs, tests, receipts, and blockers. |

## Release receipt fields
- canonicalRepository, commitSha, pullRequest, approvedStandardsRevision
- githubPages: applicable, URL, deploymentSha, verifiedStatus
- vercel: applicable, project, deploymentId, URL, ingressAndAuthStatus
- leeway: runtimeProvider, authorityRevision, transport, storage, veritasPre, veritasPost, receiptId, learningAdmission
- qualification: sourcePass, deploymentPass, authPass, executionPass, recoveryPass, evidencePass
- unresolvedBlockers, rollbackPlan, reviewer, timestamp

Every absent or unqualified field is explicitly NOT_APPLICABLE, UNVERIFIED, or BLOCKED with explanation. Never convert missing evidence into PASS. All changes remain subject to LeeWay Standards and owner approval.
