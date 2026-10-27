<!--
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.GOVERNANCE
TAG: LEEWAY.STANDARDS.GOVERNANCE.ENGINEERING_LOOP_EVIDENCE_ADMISSION_V1
DISCOVERY_PIPELINE: Voice -> Intent -> Location -> Vertical -> Ranking -> Render
5WH:
WHAT = Define ten-stage completion documentation and independent Veritas handoff
WHY = Prevent missing engineering-loop records from silently stalling C3 qualification and repeat repairs
WHO = LeeWay Standards / Creator-governed mission owners
WHERE = Docs/governance/ENGINEERING-LOOP-EVIDENCE-ADMISSION-V1.md
WHEN = 2026-10-27
HOW = Versioned checklist and read-only source-evidence preflight with scoped missing-evidence reasons
LICENSE: Existing file and repository terms remain unchanged
-->

# LeeWay Engineering Loop — documented evidence and Veritas handoff v1

**Governing parent:** [Canonical Engineering Laws](LEEWAY-CANONICAL-ENGINEERING-LAWS.md), especially LAW 05, LAW 07, LAW 09, LAW 12 and draft LAW 15; existing R01–R25. This document is a **proposed source-stage implementation** within Standards PR #54. It does not create a new verifier, receipt writer, learning admission service, Formula evaluator or control plane.

## Defect and governing distinction

A passing unit test without the surrounding engineering-loop history is not a completed task. A documented engineering loop is not in itself evidence that the requested operation passed. A failed or blocked attempt can still have useful, fully documented diagnostic evidence suitable for **independent** verification and possible learning.

Three states must remain distinct:

- `DOCUMENTATION_BLOCKED`: one or more required stages, observations, scopes, source pins, Formula states, tests or evidence links are missing or contradictory.
- `SOURCE_EVIDENCE_READY_FOR_INDEPENDENT_REVIEW`: a claimed successful task has a structurally complete record; its source references and runtime observations **still require readback and authentication by independent Veritas**.
- `DIAGNOSTIC_DOCUMENTED_OUTCOME_UNQUALIFIED`: all ten stages have an honest accountable record, but the original acceptance failed, was blocked or was not executed. Preserve evidence for review and learning eligibility; never mark the original target PASS.

No source document, CI result, unsigned manifest, prompt or checklist may emit Veritas PASS, append a production receipt, or promote Learning Ledger.

## Required document record (not a synthetic receipt)

For each consequential mission use schema `leeway.engineering.loop-evidence.v1`. Store the actual document in the **existing owning GitHub issue/PR** or the existing protected receipt store where required by privacy. Do not publish personal transcripts, private key material, credentials, raw device data or sensitive per-user learning records in a public repository.

| Field | Required meaning |
| --- | --- |
| `workId`, `checkpointId`, `ownerRole` | Same unfinished mission, who owns evidence and authority |
| `source.repository`, `source.commit`, `source.artifactSha256`, `source.evidenceRef` | Actual owning GitHub source, exact immutable commit and verifiable artifact bytes |
| `scope.objective`, `scope.acceptanceCriteria` | Creator-approved target, observable acceptance denominator and negative cases |
| `scope.authorizationId`, `scope.authorizationRef` | Exact scoped owner approval reference; inspect authenticity separately |
| `scope.rollbackStrategy`, `scope.rollbackEvidenceRef` | Actual preserved rollback and observed verification |
| `stages.<name>` | **Every one** of the ten stages, with status, observation and provenance-bound evidence reference |
| `formula.executionState` | `EXECUTED`, `NOT_EXECUTED`, `BLOCKED`, `FAILED` without inventing math |
| `tests` | Actual positive and negative result labels and their evidence pointers |
| `outcome` | Whether the original acceptance was met, with exact observation/evidence |
| Veritas/Receipt/Learning readback | Separate from this record; only the existing independently authenticated providers can issue them |

The stage order is immutable:

`Investigate → Diagnose → Plan → Implement → Test → Validate → Repair → Retest → Verify → Evidence`

Each stage is `EVIDENCED`, `BLOCKED`, or `NOT_APPLICABLE`, with an evidence pointer and a substantive observation. A `BLOCKED` stage must have a concrete reason, actual observation and the owning recovery gate. **Only Repair and Retest** may be `NOT_APPLICABLE`, and only with a specific reason and an authorized exception reference. An unattempted step must never be recorded as executed.

## Record template for contributors

Use this **human-facing template** in the existing mission issue/PR, linking original proof rather than pasting unverifiable declarations:

| Stage | Actual observation (not prediction) | Result | Evidence ref | Blocker / next gate |
| --- | --- | --- | --- | --- |
| Investigate | Prior commits, receipts, existing solution, source provenance | | | |
| Diagnose | Reproduction and cause versus hypothesis | | | |
| Plan | Approved scope, dependencies, acceptance and rollback | | | |
| Implement | Exact source diff and commit readback | | | |
| Test | Real test command, inputs, outputs, negative cases | | | |
| Validate | Compare observed result to original acceptance | | | |
| Repair | Actual correction, or approved not-applicable explanation | | | |
| Retest | Reproduction regression and related cases, or authorized exception | | | |
| Verify | Independent evidence, physical behavior if required, Formula binding, observed post-state | | | |
| Evidence | Immutable source/CI links, verified claims, remaining unverified scope, exact handoff | | | |

Add checkpoint, source commit, owner authority, Formula evaluator state, runtime state, original acceptance numerator/denominator, rollback result, Veritas status, canonical Receipt ID/hash and Learning Ledger readback **only where actually observed**. Include measured tokens, duration and rework counts when real comparable telemetry exists. Otherwise record `UNMEASURED`, not estimated savings.

## Source preflight — integration, not proof

Run `node scripts/check-engineering-loop-evidence.mjs <path-to-owned-record.json>` on an authorized checkout of this GitHub-owned source. The command is **read-only**, validates the typed ten-stage record and prints exact incomplete fields. It never changes production keys, tests host access, authenticates links, issues decisions or writes ledgers.

Use `inspectEngineeringLoopEvidence(record)` from the same module in existing contributor source checks when authorized. Positive unit fixtures are synthetic and must be labeled TEST ONLY. All source pointers are claims to be checked; even a valid pinned commit URL cannot prove an action occurred. Where record credentials or runtime observations must stay confidential, use a protected receipt reference and independently authorized readback instead of copying data into a public PR.

## Formula and cumulative experience

Before executing consequential work, confirm the canonical Formula implementation/version, evaluator authorization and input mapping. If the evaluator cannot run, preserve `formula.executionState=NOT_EXECUTED` (or `BLOCKED`) and record why. **A successful production-target claim cannot pass the source preflight without a documented Formula evaluation**, but a blocked, fully documented diagnostic may be preserved for learning review without inventing a Formula result.

Previous experience is discoverable evidence, not automatic peer proof. Resolve each claimed lesson to source version, original attempted task, actual observed failure/success, counterexamples and current acceptance conditions. Independently verified failures are eligible learning candidates and cannot retroactively pass an unexecuted multi-model replay.

## Mandatory handoff and promotion protocol

1. At task claim time: record owning issue/PR, actual SHA, original acceptance gate, dependencies and rollback.
2. During each meaningful stage: append dated observations and source/receipt links to the same existing owner issue/PR; do not wait until completion to reconstruct events from memory.
3. Before saying DONE: run the ten-stage document preflight, verify **all** scoped evidence references and actual source/CI readback; identify unresolved fields instead of silently waiving them.
4. Invoke the existing authorized **independent** Veritas PRE/POST or appropriate scoped independent diagnostic verifier. Veritas must authenticate runtime observations, source hashes, Formula lineage, owner role, signatures, replay protection, acceptance and stage claims. The preflight cannot substitute.
5. Only after qualified verification use the **existing canonical Receipt Ledger**, then correlate and read back eligible **Learning Ledger** promotion. Success and verified failure remain separate outcome classes. Reuse only eligible learning and preserve corrections/counterexamples.
6. Return to the original acceptance gate until verified; otherwise preserve exact blocker and next owner. An incomplete document blocks **only its claimed promotion**, not unrelated authorized work.

### Required negative tests

A production implementation must reject missing `Validate`, absent observation/evidence references, unauthenticated or mutable source links, fake exception on `Investigate`, claimed PASS with failed negative tests, claimed PASS without documented Formula execution, and self-declared Veritas/production/learning success. It must preserve fully documented blocked attempts as diagnostic evidence without converting them into verified learning.

## Current qualification boundary

Source schema + static test PASS can mean **DOCUMENTATION STRUCTURALLY CHECKED** only. Real multi-LLM replay, native host execution, independent Veritas decision, Formula execution and canonical Receipt/Learning admission remain separate tests. Never backfill receipts, approval or Formula hashes by inventing fields.
