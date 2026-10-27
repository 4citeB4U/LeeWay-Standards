<!--
REGION: LEEWAY.STANDARDS.RECEIPT_AUTHORITY
TAG: LEEWAY.C3.RECEIPT_AUTHORITY.CONSTITUTIONAL_CONTRACT
5WH:
WHO = LeeWay Standards constitutional governance; Runtime Fabric implements, Veritas independently verifies, Receipt Authority keeps custody.
WHAT = Proposed ecosystem-wide Receipt Authority requirements and C3 rollout gates.
WHEN = 2026-10-27; proposed pending review and adoption.
WHERE = LeeWay-Standards/standards/RECEIPT_AUTHORITY_CONTRACT.md.
WHY = Preserve independently testable proof of authorization, actual execution, outcomes and recovery without parallel control planes.
HOW = One governed protocol; partitioned tenant and producer streams; verified admission, immutable lineage, durability, recovery and authorized retrieval.
LICENSE: MIT
AUTHORITY: Proposed standards addition; not a deployed service, permission grant or Veritas PASS.
-->
# LeeWay Receipt Authority — proposed constitutional contract

**Status: PROPOSED / NOT PRODUCTION-QUALIFIED.** This document is subordinate to existing LeeWay Standards until approved. It establishes no new authority, identity, Runtime, Ledger writer, or Veritas verifier.

## Constitutional position
- Human/Creator Authority > LeeWay Standards > Root of Trust > Runtime Fabric > Agent Lee and governed capabilities > execution > independent Veritas > Receipt Authority custody > eligible Learning Ledger admission.
- Preserve existing C3 requirement and canonical Receipt Authority; repair rather than fork.
- **One governed receipt protocol and authority boundary, many logical evidence streams**. Each user/tenant owns an isolated evidence domain; capabilities (GPU, Device Bridge, Skills, Voice, Formula, etc.) produce purpose-scoped streams.
- One logical authority does **not** require one database, server, writable global chain, or physical location. A device may hold signed local evidence; local evidence does not imply global admission.
- Content hashes authenticate integrity relative to trusted anchors, **not** factual truth, authorization, physical execution or completeness.

## Mandatory ownership boundaries
| Owner | Responsibility | Prohibited shortcut |
| --- | --- | --- |
| LeeWay Standards | constitutional rules, schema/policy admission contract | operational self-grant |
| Runtime Fabric | authenticated jobs, leases, execution, obligations and reconciliation | claiming dispatch equals execution |
| Formula | actual verified evaluator version/inputs/outputs when required | invented Formula decisions |
| Veritas | independent PRE/POST acceptance and signed decisions | verifier grading itself without independence |
| Receipt Authority | authenticate receipt writers; validate provenance, lineage, proofs, sequencing, durable custody, checkpoints and retrieval | inventing an execution or Veritas PASS |
| Continuum | approved evidence-object retention/retrieval | treating a hash as content availability |
| Learning Ledger | idempotent ingestion of independently verified eligible receipt references | new permissions, rewriting history |

## Required receipt dimensions
Each evidence package must retain or link to:
- tenant/domain, producer identity, key and scope, schema and policy versions;
- workId, eventId, parentObjectiveId, causation and request identifiers;
- event type and classified claim/observation/verification state;
- PRE grant or denial reference; exact Formula artifact hash/result where applicable;
- capability/provider identity and actual execution identifiers, not just provider HTTP success;
- independent POST readback, verifier identity, acceptance criteria and signed decision;
- producer event time, reception time, sequencing and commit time separately;
- immutable evidence content commitments and authorized payload refs;
- chain membership, stable idempotency key, authoritative commit/checkpoint refs, and audit-friendly failure reasons.
Downstream learning acknowledgements are **separate subsequent events or query projections**, not mutable fields of a committed receipt.

## Admission state machine
PROPOSED -> AUTHENTICATED -> EVIDENCE_CHECKED -> RESERVED -> COMMITTED -> READBACK_VERIFIED -> CHECKPOINTED as policy requires -> AVAILABLE.
DENIED, BLOCKED, INCOMPLETE, REJECTED and UNKNOWN are first-class outcomes. Never promote claim to VERIFIED without required independent evidence. Commit must survive restart under the stated durability semantics. Duplicate retry of a committed admission returns the same result; inconsistent duplicate fails. Preserve evidence obligations for attempted or abandoned execution.

## Cryptographic and storage obligations
- Versioned canonical bytes (Unicode, JSON types/order, number/string encoding, newline policy, framing) and domain-separated cryptographic hashes.
- Authorized scoped producer signatures, verifier signatures, expiry/revocation, replay prevention and documented key rotation.
- Serialized commits per authority stream; crash-safe atomic state transitions, durable acknowledgement and replay recovery.
- Trusted externally held signed checkpoints and anti-rollback detection; independently reconcile required work against terminal receipts to detect **missing records**.
- Append-only journal distinct from rebuildable indexes, evidence objects, caches and recovery scratchpads.
- Immutable historical chain: governed successor records, explicit migration lineage, independently approved restoration. Never silently normalize, truncate, replace, or rewrite original evidence.
- Storage bindings are logical/portable; process cwd, drive letters and hostnames cannot establish canonical ledger identity.

## Federation and privacy
- Separate tenant encryption, authorization, retention policies, quotas, audit identities and revocation.
- Cross-tenant inspection needs explicit authorization; public checkpoint commitments cannot reveal private payloads.
- Devices maintain separately signed local monotonic sequences with causal links; disconnected events are *pending*, not globally committed. Reject unauthorized offline actions.
- Merge via governed admission with conflict and duplicate detection, not timestamp-only ordering or competing global writable heads.
- Sensitive payload deletion/expiry is handled under law/policy; retained commitments must accurately distinguish evidence present, remotely recoverable, commitment-only, intentionally deleted, and lost.

## Recovery and C3 deployment gates
1. Recover main repo identity, deployed Runtime/Receipt provider bindings, relevant source SHA-256 and original ledger custody bytes **read-only**.
2. Classify ALREADY BUILT / PARTIALLY BUILT / MISSING GLUE / TRULY MISSING against existing implementations.
3. Preserve 23-record historical source, verify custody hash independently, inspect line-ending and legacy record-23/schema incompatibility; no speculative rewrite.
4. Scope/test a staged migration with authenticated independent approval, rollback, anti-replay and immutable provenance; keep production admission blocked until qualification.
5. Test unauthorized writers, tamper, broken hash, source drift, duplicate/replay across restart, concurrent writers, crash mid-append, missing receipt, readback, checkpoints, tenant isolation, offline conflict, expired authority, missing payload and migration recovery.
6. Prove **one real C3 governed work item**: Agent Lee ingress -> Runtime -> Veritas PRE -> verified Formula -> dispatcher/provider execution -> independently observed readback -> Veritas POST -> Receipt Authority durable readback -> eligible Learning Ledger durable admission/readback.
7. Roll out producer contracts to GPU, Device Bridge, Skills, Voice, Machine Consciousness and other subsystems only after existing C3 gate; stage bounded PRs with independent tests.

## Acceptance and status
No PASS by model assertion, file existence, HTTP 200, simulated dispatch or source-only unit tests. The consuming service must bind an approved Standards version and record its exact source SHA. This contract is a proposal; deployment, Veritas, Formula and end-to-end C3 remain **UNVERIFIED** until genuine execution and readback evidence exists.

**Receipt for this document:** a GitHub commit or PR proves only the source change, not production runtime health or a governed LeeWay execution receipt.
