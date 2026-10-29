<!--
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.SH01.RECEIPT.CONTRACT.EVIDENCE
TAG: LEEWAY.SH01.RECEIPT.CONTRACT.EVIDENCE
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render
5WH:
WHAT = Record read-only v1 producer-consumer two-hash identity audit and actual CI defect/repair
WHY = Prevent false Learning/Receipt promotion from conflated hash references and preserve full engineering loop
WHO = Creator-authorized SH-01 contributor under LeeWay Standards
WHERE = standards/SH01_RECEIPT_LEARNING_HASH_IDENTITY_EVIDENCE_20261028.md
WHEN = 2026-10-28
HOW = GitHub exact source inspection, staged synthetic audit tests, actual CI logs and corrected 5WH metadata
LICENSE: Existing LeeWay Standards repository terms remain unchanged
-->
# SH-01 — Receipt versus chained-ledger hash source compatibility: engineering evidence

**Mission:** Parent [Standards SH-01 #22](https://github.com/4citeB4U/LeeWay-Standards/issues/22), existing [SH-01 PR #61](https://github.com/4citeB4U/LeeWay-Standards/pull/61), stacked [candidate PR #64](https://github.com/4citeB4U/LeeWay-Standards/pull/64), original [Runtime C3 #21](https://github.com/4citeB4U/Leeway-Runtime-Fabric/issues/21), Receipt-owned obligation [#111](https://github.com/4citeB4U/Leeway-Runtime-Fabric/issues/111). No new Ledger, signer, Formula implementation or privilege path.

## Proven source contract — existing V1, preserve without silent reinterpretation

1. Runtime producer [Receipt obligation](https://github.com/4citeB4U/Leeway-Runtime-Fabric/blob/review/c3-receipt-owned-atomic-learning-obligation-20261027/ledger/receipt-learning-obligation.mjs) Git blob `0a60fa71aebe0cf9dc948c7990ee4ca47d04fe04` specifies `event.receiptHash` = original execution-receipt SHA-256; **not** enclosing chained receipt record `proof.sha256`.
2. Existing writer [append.mjs](https://github.com/4citeB4U/Leeway-Runtime-Fabric/blob/review/c3-receipt-owned-atomic-learning-obligation-20261027/ledger/append.mjs) Git blob `0751b685c426b9edf34aaaaaf82eeef2075eaa95` maps `entry.executionReceiptHash=event.receiptHash`, separately builds original record `proof.sha256`, returns `chainProofHash`. It remains **opt-in source only**, does not replace the historical canonical installed writer.
3. Learning consumer [canonical-learning-inbox.mjs](https://github.com/4citeB4U/LeeWay-Learning-Ledger/blob/review/c3-canonical-learning-inbox-recovery-20261027/src/canonical-learning-inbox.mjs) Git blob `357d466015b5154463fbb047c9b813b50a3e972e` expects the **original** Receipt keeper to provide `verifyAtomicReceiptCommit` and independently qualified Veritas. Consumer schema `receiptHash` is the execution-receipt digest, and its `admissionKey` derives `requestId:outcomeId:receiptHash`.
4. Separate dedicated [Receipt Authority PR #1](https://github.com/4citeB4U/Receipt-Authority/pull/1) stores a `payload_sha` in its own candidate SQLite vault, not a proven on-host replacement for the original chained receipt `proof.sha256`.
5. **Missing production glue:** owner-approved source/pinned installed writer, real original history and epoch custody, source-version contract, signed verifier identity, atomic receipt + outbox service and authentic readback that correlates **both** distinct hash identities. Do not silently reinterpret a v1 `receiptHash` as a chain hash, or migrate historical receipt bytes.

## Source-only repair delivered

- `scripts/sh01-receipt-learning-identity-audit.mjs`, Git blob `96deaa1cd6278782268f2369df72a9999375d38a`: pure source fixture checker with deterministic recomputation of v1 chained proof, scope, original execution hash, event digest, admission key and deterministic record/commit IDs. **Not an independent authority**; it neither mutates nor reads the actual owner ledger.
- `tests/sh01-receipt-learning-identity-audit.test.mjs`, Git blob `00492d1dc5281e2f5f2a5b06698a2eb20b3141a2`: source-fixture negatives for swapped hash, stale readback, missing proof, invalid scope, mixed IDs, replay ambiguity, false authorizations, etc.
- `.github/workflows/sh01-receipt-learning-identity-audit.yml`, Git blob `2ad7c5fb5b7bf8e59b4ba6c893090721d3166bcd`: bounded Node 22 source CI on review paths, with only contents:read.
- No original Runtime/Receipt/Learning code, ledger record, deployment, credential, device, user files, trust root or provider registry changed.

## Actual ten-stage engineering loop and repair record

| Canonical stage | Recorded evidence / classification |
| --- | --- |
| Investigate | Fetched and read exact producer PR #115 and consumer PR #3 source, original atomic writer and dedicated Receipt PR #1, current SH-01 PR #61/#62 ownership and C3 #21 |
| Diagnose | Source maps execution vs chain hash in separate fields already. Outstanding is actual authenticated dual-hash host/custodian linkage and downstream proof, NOT missing hash arithmetic source. |
| Plan | Auditable source-only checker stacked on SH-01 PR #61, no owner-code collision; reject fabricated verifier/Receipt/Learning success |
| Implement | Source checker + tests + bounded GitHub CI; no production mutations |
| Test | Initial candidate [Actions #40794147600](https://github.com/4citeB4U/LeeWay-Standards/actions/runs/40794147600) **16/16 source-fixture PASS**; later source scope adds two more negative tests |
| Validate | Initial [Incoming Source Watch #40794147638](https://github.com/4citeB4U/LeeWay-Standards/actions/runs/40794147638) **FAILED** with `MISSING_5WH_BLOCK` and field/header errors in all three changed files; exact logs independently read |
| Repair | Fetched actual canonical `scripts/auto-enforce-file-governance.mjs`, inspected parser; replaced compact 5WH comments with mandatory multiline `5WH:\nWHAT = ...` and full field sets, including YAML leading comments. Hardened missing obligation scope and deterministic IDs |
| Retest | [18/18 source-fixture tests PASS, zero failures/skips — Actions #40794280441](https://github.com/4citeB4U/LeeWay-Standards/actions/runs/40794280441), repaired source commit `f9393c84e3471a205ed0446294f2f8b6a0ab743a`. Source check [Incoming Watch #40794280525](https://github.com/4citeB4U/LeeWay-Standards/actions/runs/40794280525) SUCCESS; [layer governance #40794280709](https://github.com/4citeB4U/LeeWay-Standards/actions/runs/40794280709) SUCCESS; [Standards enforcement #40794280551](https://github.com/4citeB4U/LeeWay-Standards/actions/runs/40794280551) SUCCESS. This is source-only regression, NOT live authority |
| Verify | Source readback confirms all three repaired blobs; **independent production Veritas NOT RUN**, no actual signed role or host custody |
| Evidence | This document + linked exact original source identities + first passing fixture run + observed governance failure + repair/test commits. Not a canonical receipt |

**Source integrity:** Git blob IDs are **not** SHA-256 of physically installed files. The source audit reproduces v1 serialization for synthetic fixture consistency but cannot authenticate the original chain, record predecessor, process authority, credential, host, clock or volume/fsync.

## Unfinished original acceptance and next exact action

1. Exact repaired source commit `f9393c84e3471a205ed0446294f2f8b6a0ab743a` has 18/18 tests and the three other source/governance checks SUCCESS. Preserve that evidence; when later documentation-only commits occur, verify the executable file blobs remain identical and check any newly triggered source-watch result.
2. Receipt Authority owner approves a versioned compatibility document stating the semantics of `receiptHash`, `executionReceiptHash`, `chainProofHash`, `proof.sha256` and `payload_sha`. A new version, if needed, must be additive and independently validated; do not rewrite v1 history.
3. Host owner pins actual Receipt writer, verifier roles, source/installed SHA-256 and chain custody. Independently validate `verifyAtomicReceiptCommit` against the original chained record and both hashes, including wrong predecessor, wrong host/owner, crash/replay and conflicting admissions.
4. Reuse Learning PR #3 and original canonical Learning writer to prove true once-only effect, restart readback and production PRE/POST. Preserve all historical results.

**Acceptance disposition:** This is a source-only candidate with negative tests. C3 OPEN; no canonical Formula evaluation, real native host action, independent Veritas, production Receipt append or Learning Ledger admission from this effort.
