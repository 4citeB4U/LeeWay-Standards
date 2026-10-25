/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.TESTS
TAG: QUALIFICATION_PROGRESSION_TEST_V1
WHO: LeeWay Standards. WHAT: Reject missing reconciliation/resumption trust evidence.
WHEN: 2026-10-25. WHERE: tests/qualification-progression.test.mjs.
WHY: Production progress requires complete authorized transitions.
HOW: Synthetic inputs only. AUTHORITY: TEST_ONLY. LICENSE: MIT.
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import {evaluateQualificationProgression as evaluate, QUALIFICATION_TERMS} from '../standards/qualification-progression.mjs';
const h='a'.repeat(64);
const good=()=>({
 request:{requestId:'request-001',originalJobId:'work-001',originalCheckpointSha256:h},
 policy:{approvedForScope:true,revocationChecked:true,hardwareAttestationRequired:true},
 proof:{hardwareAttestationVerified:true,cryptographicProofVerified:true,signedDecisionValidated:true,
  signedDecisionSha256:h,requestId:'request-001',replayReservationVerified:true},
 reconciliation:{requestId:'request-001',authorizedExecutionVerified:true,executionEvidenceSha256:h,
  executionOutcomeKnown:true,idempotencyVerified:true,providerReady:true,evidenceCorrelated:true},
 resumption:{originalJobId:'work-001',checkpointSha256:h,originalCheckpointVerified:true,ownerAcceptancePreserved:true}
});
test('all thirteen system-wide qualification terms are defined',()=>assert.equal(QUALIFICATION_TERMS.length,13));
test('unsigned decision blocks reconciliation',()=>{
 const x=good();x.proof.signedDecisionValidated=false;
 assert.equal(evaluate(x).stage,'signedDecisionValidation');
});
test('hardware attestation enforced when scoped by policy',()=>{
 const x=good();x.proof.hardwareAttestationVerified=false;
 assert.equal(evaluate(x).stage,'hardwareAttestation');
});
test('missing actual reconciliation refuses progression',()=>{
 const x=good();x.reconciliation.authorizedExecutionVerified=false;
 assert.equal(evaluate(x).stage,'authorizedReconciliation');
});
test('uncertain effect prevents resumption',()=>{
 const x=good();x.reconciliation.executionOutcomeKnown=false;
 assert.equal(evaluate(x).stage,'executionUncertainty');
});
test('checkpoint mismatch refuses resumption',()=>{
 const x=good();x.resumption.checkpointSha256='b'.repeat(64);
 assert.equal(evaluate(x).stage,'safeResumption');
});
test('synthetic complete evidence cannot grant execution',()=>{
 const x=evaluate(good());assert.equal(x.state,'READY_FOR_RUNTIME_RESUMPTION_ADMISSION');
 assert.equal(x.executionAuthorized,false);assert.equal(x.canResume,false);
});
