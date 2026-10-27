/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.TESTS
TAG: LEEWAY_STANDARDS_ENGINEERING_LOOP_NA_REGRESSION_V1
5WH: WHAT = Test conditional Repair/Retest N/A and fail-closed engineering-stage policy.
WHY = Never invent repairs or accept missing evidence as a verified success.
WHO = LeeWay Standards. WHERE = tests/engineering-loop-evidence-not-applicable.test.mjs.
WHEN = 2026-10-27. HOW = Deterministic tests against the canonical draft evaluator.
LICENSE: MIT.
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import {ENGINEERING_STAGES,evaluateEngineeringLoopCheckpoint as evaluate} from '../standards/engineering-loop-admission.mjs';
const h='b'.repeat(64);
const baseline=()=>({
 missionId:'mission-verified-0001',sourceSha256:h,
 stages:Object.fromEntries(ENGINEERING_STAGES.map(stage=>[stage,{state:'PASS',evidenceSha256:h}])),
 qualification:{owner:'approved-verifier-001',requestId:'request-evidence-001',state:'APPROVED',authorityVerified:true,decisionSha256:h},
 acceptance:{state:'PASS',testEvidenceSha256:h},
 evidence:{veritasVerified:true,veritasReceiptSha256:h,canonicalReceiptAdmitted:true,canonicalReceiptSha256:h}
});
test('prior all-ten-stage PASS contract remains source-compatible and nonproduction',()=>{
 const result=evaluate(baseline());
 assert.equal(result.state,'STANDARDS_CHECKPOINT_COMPLETE');
 assert.equal(result.productionAuthorized,false);
});
test('no-repair first pass retains ten-stage evidence with authenticated-N/A prerequisite',()=>{
 const p=baseline();
 p.repairDisposition='NONE_REQUIRED';
 p.stages.Repair={state:'NOT_APPLICABLE',evidenceSha256:h};
 p.stages.Retest={state:'NOT_APPLICABLE',evidenceSha256:h};
 assert.equal(evaluate(p).state,'STANDARDS_CHECKPOINT_COMPLETE');
});
test('repair N/A cannot be asserted without an explicit disposition',()=>{
 const p=baseline();p.stages.Repair={state:'NOT_APPLICABLE',evidenceSha256:h};
 p.stages.Retest={state:'NOT_APPLICABLE',evidenceSha256:h};
 assert.equal(evaluate(p).state,'BLOCKED');
});
test('partial N/A is refused rather than hiding a missing regression',()=>{
 const p=baseline();p.repairDisposition='NONE_REQUIRED';
 p.stages.Repair={state:'NOT_APPLICABLE',evidenceSha256:h};
 assert.equal(evaluate(p).state,'BLOCKED');
});
test('N/A still requires an actual evidence digest and prerequisite PASS',()=>{
 const p=baseline();p.repairDisposition='NONE_REQUIRED';
 p.stages.Repair={state:'NOT_APPLICABLE',evidenceSha256:h};
 p.stages.Retest={state:'NOT_APPLICABLE',evidenceSha256:h};
 delete p.stages.Retest.evidenceSha256;
 assert.deepEqual({reason:evaluate(p).reason,stage:evaluate(p).stage},{reason:'ENGINEERING_STAGE_NOT_VERIFIED',stage:'Retest'});
 p.stages.Retest.evidenceSha256=h;p.stages.Test.state='FAILED';
 assert.equal(evaluate(p).state,'BLOCKED');
});
test('synthetic PASS strings alone never grant production execution',()=>{
 const p=baseline();
 assert.equal(evaluate(p).productionAuthorized,false);
 p.evidence.canonicalReceiptAdmitted=false;
 assert.equal(evaluate(p).reason,'CANONICAL_VERITAS_OR_RECEIPT_MISSING');
});
