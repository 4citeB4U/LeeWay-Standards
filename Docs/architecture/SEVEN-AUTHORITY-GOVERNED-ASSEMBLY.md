<!--
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.GOVERNED_ASSEMBLY
TAG: LEEWAY.SEVEN_AUTHORITY_SOURCE_ALIGNMENT.V1
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render
5WH:
WHAT=Describe seven owning authorities and two-stage independent release reviews.
WHY=Prevent orphaned source tests, false Veritas promotion, unreceipted learning, and ungoverned deployment.
WHO=LeeWay Standards owner and external support contributor under owner review.
WHERE=Docs/architecture/SEVEN-AUTHORITY-GOVERNED-ASSEMBLY.md.
WHEN=2026-11-11.
HOW=The existing ecosystem registry enforces source graph invariants; Runtime integration is separately qualified.
LICENSE: Existing LeeWay Standards source terms apply.
-->
# LeeWay seven-authority assembly — one workId, one governed body

**State: SOURCE CONTRACT CANDIDATE. This does not grant live admission.**

This specification extends the existing `standards/leeway-ecosystem-authority.v1.json` registry; it is **not a second registry, model, Runtime, verifier, queue or receipt ledger**. Seven roles are source-linked, with zero inferred approved production bindings.

## Roles and handoff

1. **Standards** owns constitutional law, the active acceptance gate and owner-authorized policy; denies unknown principal/API/artifact until its existing runtime gateway admits them.
2. **Runtime Fabric** alone owns persistent workplane dispatch and effectful execution after caller identity, Formula, authorized capability and current Standards evidence are checked; prompts are not security boundaries.
3. **Machine Consciousness** observes mission state, missing required evidence, risk and source/policy drift deterministically; it requests an authenticated Runtime HOLD + security alert, never signs independent PASS or executes direct model commands.
4. **Veritas** accepts read-only source/execution dossiers and an independent custodian signs genuine scope-bound PRE/POST. Source tests/CI are never that signature.
5. **Receipt Authority** owns atomic immutable append and readback plus the learning outbox. GitHub evidence links are discovery references, not private receipt custody.
6. **Learning Ledger** reconciles eligible signed/verifiable Receipt obligations, including qualified failures and denials, with durable readback and correction history; cannot turn a hypothesis into a permission.
7. **Production & Final Execution** accepts only exact source, original mission, deployment target, authenticated release authorizations, independent Veritas, canonical Receipt readback and rollback; after deploy it requires a distinct independent deployed POST and new receipt readback.

### State machine rather than a one-way checklist

`IDEA → NEED → POLICY_ADMISSION → FORMULA_DECISION → GOVERNED_BUILD → SOURCE_TEST → EVIDENCE_CAPTURE → INDEPENDENT_REVIEW → CANONICAL_RECEIPT → ELIGIBLE_LEARNING → PRODUCTION_RELEASE_REVIEW → TARGET_DEPLOYMENT → INDEPENDENT_DEPLOYED_POST → DEPLOYED_RECEIPT → MARKETABLE_PRODUCT_ACCEPTANCE`.

Failure at any stage creates an immutable, source-correlated `HOLD`/repair obligation and leaves verified earlier nodes reusable. Runtime is the sole enforcer; Machine Consciousness is the sentinel. State transitions are deterministic and idempotent by original workId/nonce/sourceHash, not a fictional quantum computation or an extra work queue. Feedback loops after deployment and continuous learning are required, not circular self-approval.

**Mandatory atomic evidence invariant:** Once a test finishes, preserve its original job/result/source SHA and original log hash, including FAILED tests. A success becomes a `SOURCE_TEST_PASS` candidate only; independent review, Receipt append/readback and Learning admission remain separate explicit authorities. A prior verified node never needs retesting solely because a pointer was missing, provided original bytes and qualification remain valid.

**Exact source-to-host distinction:** Source graph CI checks only `PASS_SOURCE_ASSEMBLY_TOPOLOGY`; no actual LLM, API, file, Device Bridge request or Production deploy is blocked by *this source file alone*. Live enforcement requires the existing Runtime identity gateway to load a reviewed source pin, authenticate subjects, reject unregistered actors and enforce tool/file/API capabilities server-side; those tests require same-transport physical/host evidence. Unknown providers, unpinned source, unsigned approvals, or mismatched work IDs must reject with a recorded security event.

**Live blockers:** Learning and Production source homes are not yet enrolled running authorities on their current mains; independent Veritas production signer roots are not established; Runtime↔Bridge discovery has previously failed 401; canonical Receipt/Learning exact append-readback chain remains unproven. No user private raw test data or secrets go into this public repo.

**Rollback:** revert only this proposed assembly contract and its source checks; do not rewrite prior receipts, merge competing implementations or promote source-only nodes.

## Source CI negative evidence and scoped repair

The first proposed source commit [b01fbddf](https://github.com/4citeB4U/LeeWay-Standards/commit/b01fbddf562645d8d4d619bd7103f49407c9e607) passed the [existing ecosystem validator and all ten assembly tests](https://github.com/4citeB4U/LeeWay-Standards/actions/runs/43129756350). The concurrent [Incoming Source Watch run 43129756419](https://github.com/4citeB4U/LeeWay-Standards/actions/runs/43129756419) **failed**: the changed YAML lacked governance identity, and authored document/script/test headers required canonical LICENSE and 5WH fields. The correct fix changes those exact headers, preserves the validated underlying source, and requires a fresh positive watch result. No historical source test or fault is erased, and no production receipt is claimed.

The second [source-watch run 43130163874](https://github.com/4citeB4U/LeeWay-Standards/actions/runs/43130163874) reported **0 invalid headers but 4 files requiring mutation** because the existing canonical scanner requires a leading `DISCOVERY_PIPELINE` marker in addition to the full identity/5WH block. This follow-up adds that marker without weakening the scanner or changing executable gate behavior. The original source-watch failures remain linked.

## Continuous Standards source-evidence custody

The existing [ecosystem authority workflow](../../.github/workflows/verify-ecosystem-authority.yml) now runs the authority validator and source regressions inside a bounded Node capture process. Both positive and negative results produce a source SHA/run-bound JSON packet plus SHA-256 file and are uploaded even on test failure, with read-only artifact indexing. GitHub artifact retention is time-limited; independent Veritas and canonical private Receipt Authority must separately receive, authenticate and read back eligible evidence before advancing it. The watcher and original files remain under unchanged law; a passing code result must never hide a metadata or custody failure.
