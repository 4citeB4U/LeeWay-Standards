# SH-01 — Sovereign Ecosystem Authority and Dependency Checkpoint

<!-- REGION: LEEWAY.STANDARDS.SH01
TAG: LEEWAY.SH01.AUTHORITY_AUDIT
5WH: WHO=LeeWay Standards governance; WHAT=read-only source inventory and gap register;
WHEN=2026-10-28; WHERE=standards/SH01_SOVEREIGN_AUDIT.md;
WHY=preserve unique canonical owners; HOW=GitHub source checks and separate production gates.
LICENSE: MIT. STATUS: audit evidence, NOT a Veritas PASS. -->

**Mission:** Independently qualify each LeeWay system before assembling a sovereign self-hosted production environment. Parent C3 remains open. This checkpoint does not supersede the existing authority registry, Formula, Runtime Fabric, Veritas, or Receipt Authority.

## Verified repository locations (2026-10-28)

The following repositories were individually returned by GitHub's repository API as existing with default branch `main`. An existing repository is not proof of runtime readiness.

| Workstream | Repository | Owner role / source limitation |
| --- | --- | --- |
| Standards | 4citeB4U/LeeWay-Standards | Constitutional governance |
| Formula | 4citeB4U/Leeway-formula-live | Mathematical source; actual running Formula not established |
| Runtime / Sovereign Host | 4citeB4U/Leeway-Runtime-Fabric | Existing execution owner; boot/restart acceptance unverified |
| Receipt | 4citeB4U/Receipt-Authority | Source implementation PR #1 still draft |
| Veritas | 4citeB4U/LEEWAY-VERITAS | Separate verifier repository; signer/trust runtime unverified |
| Learning Ledger | Runtime Fabric provider and LeeWay-Agent-Skills contract | No new sovereign provider |
| Continuum | 4citeB4U/LeeWay-Continuum | Storage owner; live durability unverified |
| VRAM | 4citeB4U/LeeWay-VRAM-Database | Checkpoint/data candidate; original allocator remains Runtime-owned |
| GPU | 4citeB4U/LeeWay-Edge-GPU | Native provider; C3 production qualification unverified |
| Model Hub | 4citeB4U/LeeWay-Model-Hub | Model/provider source; production binding unverified |
| Skills / MCP | 4citeB4U/LeeWay-Agent-Skills | Skill orchestration and capabilities |
| Device Bridge | 4citeB4U/LEEWAY-DEVICE-BRIDGE | Native device execution interfaces |
| Federate Web | 4citeB4U/Leeway-Federate-Web | Federation discovery/transport |

## Authority observation

The **existing** canonical registry is `standards/leeway-ecosystem-authority.v1.json` (Git blob `aa58d8c87096ac77e46eca2c5aa90962d3a8b66d`). It defines Standards, Formula, Skills, Runtime Fabric, Device Bridge and Federate Web along with several UI/application/recovery entries. It does **not** list newer standalone Receipt Authority, Veritas, Continuum, VRAM Database or Model Hub as independent entries. This is a **registry reconciliation proposal**, not permission to invent parallel authorities or change identities without review.

## Production acceptance dependency graph

1. Standards policy source, signer and approved trust roots.
2. Canonical Formula source plus actual deterministic evaluator proof.
3. Runtime Fabric startup and service registry, obligation persistence, dispatcher and supervisor.
4. Independently deployed Veritas PRE/POST trust custodian.
5. Receipt Authority durable admission, original custody verification, readback and atomic learning outbox.
6. Learning Ledger eligible idempotent delivery; Continuum approved storage/reconstruction.
7. VRAM/GPU/Model Hub and Skills/Agent Lee actual execution.
8. Sovereign Host/device access, then Live/RTC/Voice/Vision and approved federation.

These are acceptance **dependencies**, not restrictions against independent parallel source testing.

## Verified outstanding governance dependencies

- [Standards Receipt Authority PR #56](https://github.com/4citeB4U/LeeWay-Standards/pull/56): OPEN DRAFT, unmerged at inspection.
- [Receipt Authority PR #1](https://github.com/4citeB4U/Receipt-Authority/pull/1): OPEN DRAFT, unmerged; earlier synthetic-source CI only.
- [Runtime C3 issue #21](https://github.com/4citeB4U/Leeway-Runtime-Fabric/issues/21): active governing end-to-end objective.
- [Runtime receipt outbox issue #111](https://github.com/4citeB4U/Leeway-Runtime-Fabric/issues/111): specific atomic learning obligation work item.

## Next investigation tasks

- [x] Recover canonical authority registry and enumerate representative repositories.
- [x] Reconfirm open Receipt Authority and Standards draft PRs.
- [ ] Inspect every workstream's pinned source commit, entrypoints, real service commands, health endpoints, policy manifests and test suites.
- [ ] Identify canonical issuer/trust root identities for Veritas and Receipt Authority.
- [ ] Define portable service bootstrap and dependency health using the existing Runtime supervisor.
- [ ] Run independent CI per repository, record exact job IDs, failures and reproducible test commands.
- [ ] Test sovereign-host boot, source-to-host identity, authenticated operation, shutdown/restart recovery and offline operation.
- [ ] Run whole-system C3 with Formula, Veritas PRE/POST, Receipt readback and Learning admission.


## Source root and executable test entrypoint findings (second pass)

GitHub `main` root directories were inspected for the 12 repositories listed in the first checkpoint. This establishes source structure, **not** a successful run of any tests or a hosted service.

| Workstream | Root evidence observed | Exact source test/start script found |
| --- | --- | --- |
| Standards | `standards/`, `contracts/`, `tests/`, `services/`, `package.json` | Script values not yet retrieved |
| Runtime Fabric | `automation-runtime/`, `api/`, `contracts/`, `adapter.registry.json` | Entrypoints still require independent review |
| Receipt Authority | **main branch contains only `README.md`** | Implementation is on draft [PR #1](https://github.com/4citeB4U/Receipt-Authority/pull/1); cannot claim deployed from main |
| Independent Veritas | `src/`, `bin/`, `tests/`, `package.json` | `npm test` = `node --test tests/*.test.mjs`; `npm run check` includes syntax and tests; `npm run review:serve` = `node bin/start-review-service.mjs` |
| Continuum | `src/`, `tests/`, `ui/`, `config/`, `package.json` | `npm test` is explicit Node suite across adapters, storage, host binding, capacity, UI and evidence; `npm run check:syntax` |
| VRAM Database | `src/`, `sql/`, `test/`, `evidence/`, `package.json` | `npm test` = `node --test`; `npm run demo` = `node examples/local-demo.mjs` |
| Model Hub | `src/`, `clients/`, `catalog/`, `tests/`, `package.json` | `npm start` = `node src/server.mjs`; `npm test` = `node --test tests/*.test.mjs`; `npm run check` |
| GPU | `native/`, `contracts/`, `dispatch/`, `tests/` or equivalent root-level areas | Build and native acceptance commands not yet confirmed |
| Device Bridge | `packages/`, `providers/`, `apps/`, `receipts/`, `tests/` | Device-specific command qualification pending |
| Skills / MCP | `mcp-server/`, `mcp-remote/`, `skills/`, `receipts/`, `tests/` | Actual MCP provider startup proof pending |
| Formula | `authority/`, `contracts/`, `runtime/`, `receipts/`, `tests/` | Frozen canonical evaluator and fixtures require hash pin |
| Federate Web | `src/`, `bootstrap.json`, `ecosystem.manifest.json`, `tests/` | Live peer attach not established |

The inspected package source blobs were: Veritas `3d8f38f8646b6c13cbf098ca0c3e2059bd875897`; Continuum `fa43164015f1b999b9171409e5855d5947f33694`; VRAM `a8945c56a3df6a72afef72ca05295d22bcf4316f`; Model Hub `87266981262c2570831001ae80910c285a8df6a7`. These are Git blob identifiers, **not** independently computed release SHA-256 hashes.

**Qualification distinction:** identifying commands is INVESTIGATE evidence, not TEST PASS. The next stage must pin checked revisions, inspect actual registry/boot arguments and run the declared suites, then inspect CI/job logs and real host evidence. Receipt Authority PR #1 must be reviewed and integrated under Standards before a production Runtime binds it.

## Full engineering loop checkpoint

INVESTIGATE: GitHub repository API and existing Standards registry; source PRs/issue.
DIAGNOSE: registry coverage and cross-provider production evidence remain incomplete.
PLAN: one Standards-owned audit, no duplicate execution/authority registry.
IMPLEMENT: this audit document on a review branch.
TEST / VALIDATE: exact GitHub changes and checks must be observed after commit. No operational test claimed.
REPAIR / RETEST: only after a measured failure and bounded correction.
VERIFY: independent production Veritas NOT PERFORMED.
EVIDENCE: source records and GitHub links above; no runtime receipt created.

**Status:** SOURCE AUDIT PARTIAL; full SH-01 and C3 production BLOCKED / UNVERIFIED. No production receipt or Learning Ledger admission.
