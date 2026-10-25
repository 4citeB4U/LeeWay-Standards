/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.TESTS
TAG: ENGINEERING_LOOP_ADMISSION_TEST_V1
5WH: WHAT = Negative admission regression; WHY = No work completed on absent approvals;
WHO = LeeWay Standards; WHERE = tests/engineering-loop-admission.test.mjs;
WHEN = 2026-10-25; HOW = Node test fixtures without production trust. LICENSE: MIT.
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import {ENGINEERING_STAGES,evaluateEngineeringLoopCheckpoint as gate} from '../standards/engineering-loop-admission.mjs';
const hash='a'.repeat(64);
const fixture=()=>({missionId:'mission-001',sourceSha256:hash,
 stages:Object.fromEntries(ENGINEERING_STAGES.map(s=>[s,{state:'PASS',evidenceSha256:hash}])),
 qualification:{owner:'provider-001',requestId:'request-001',state:'APPROVED',authorityVerified:true,decisionSha256:hash},
 acceptance:{state:'PASS',testEvidenceSha256:hash},
 evidence:{veritasVerified:true,veritasReceiptSha256:hash,canonicalReceiptAdmitted:true,canonicalReceiptSha256:hash}
});
test('all ten stages require evidence and unchanged ordering',()=>{
 assert.equal(ENGINEERING_STAGES.length,10);
 for(const stage of ENGINEERING_STAGES){const f=fixture();delete f.stages[stage];assert.deepEqual({reason:gate(f).reason,stage:gate(f).stage},{reason:'ENGINEERING_STAGE_NOT_VERIFIED',stage});}
});
test('pending qualification does not become silent success',()=>{
 const f=fixture();f.qualification.state='PENDING';assert.equal(gate(f).reason,'QUALIFICATION_PENDING');
});
test('unverified approval flags cannot release',()=>{
 const f=fixture();f.qualification.authorityVerified=false;assert.equal(gate(f).reason,'QUALIFICATION_AUTHORITY_UNVERIFIED');
});
test('missing real receipt is denied',()=>{
 const f=fixture();f.evidence.canonicalReceiptAdmitted=false;assert.equal(gate(f).reason,'CANONICAL_VERITAS_OR_RECEIPT_MISSING');
});
test('complete synthetic checkpoint remains non-production',()=>{
 const r=gate(fixture());assert.equal(r.state,'STANDARDS_CHECKPOINT_COMPLETE');assert.equal(r.productionAuthorized,false);
});
