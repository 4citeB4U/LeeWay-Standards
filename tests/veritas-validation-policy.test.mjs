/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.VERITAS.TEST
TAG: LEEWAY.VERITAS.MEDIUM_FAILURE_AGGREGATION_REGRESSION_V1
DISCOVERY_PIPELINE: Voice -> Intent -> Location -> Vertical -> Ranking -> Render
5WH:
WHO = LeeWay Standards source owner and Veritas structural-policy verifier.
WHAT = Exercise V-07 MEDIUM FAIL, HIGH FAIL and CRITICAL BLOCK precedence.
WHEN = 2026-10-27.
WHERE = tests/veritas-validation-policy.test.mjs.
WHY = Prevent a failed MEDIUM structural policy rule from being misreported PASS.
HOW = Real TypeScript module under Node strip-types with negative and sibling cases.
AUTHORITY: SOURCE TEST ONLY, NOT INDEPENDENT CRYPTOGRAPHIC VERITAS.
LICENSE: Existing LeeWay Standards repository terms.
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import {runValidationPolicy,getValidationRules} from '../src/core/veritas/ValidationPolicy.ts';

const valid = () => ({
  requestId: 'C3-STANDARDS-V07-TEST',
  schemaType: 'leeway.veritas.structural-output.v1',
  outputPayload: {status:'REVIEW_ONLY'},
  sourceUnit: 'LEE_PRIME',
  claimsUserFacing: false,
  receiptAttached: true,
  veritasCalled: true
});
const evaluate = change => runValidationPolicy({...valid(),...change});

test('V-07 MEDIUM failure alone must report FAIL, never PASS',()=>{
 const got=evaluate({sourceUnit:''});
 assert.equal(got.status,'FAIL');
 assert.equal(got.criticalFailures,0);
 assert.deepEqual(got.ruleResults.filter(x=>!x.passed).map(x=>x.ruleId),['V-07']);
 assert.equal(got.blockedBy,undefined);
 assert.ok(got.complianceScore<1);
});
test('whitespace-only source role fails V-07',()=>{
 const got=evaluate({sourceUnit:'  '});
 assert.equal(got.status,'FAIL');
 assert.deepEqual(got.ruleResults.filter(x=>!x.passed).map(x=>x.ruleId),['V-07']);
});
test('structurally valid non-facing output retains PASS',()=>{
 const got=evaluate({});
 assert.equal(got.status,'PASS');
 assert.equal(got.ruleResults.length,7);
 assert.equal(got.complianceScore,1);
});
test('HIGH receipt flag failure remains FAIL without a fabricated receipt',()=>{
 const got=evaluate({receiptAttached:false});
 assert.equal(got.status,'FAIL');
 assert.deepEqual(got.ruleResults.filter(x=>!x.passed).map(x=>x.ruleId),['V-02']);
});
test('CRITICAL user-facing Veritas omission hard BLOCKS',()=>{
 const got=evaluate({claimsUserFacing:true,veritasCalled:false});
 assert.equal(got.status,'BLOCKED');
 assert.equal(got.blockedBy,'V-03');
});
test('CRITICAL precedence retained when V-07 MEDIUM also fails',()=>{
 const got=evaluate({claimsUserFacing:true,sourceUnit:''});
 assert.equal(got.status,'BLOCKED');
 assert.equal(got.blockedBy,'V-01');
 assert.ok(got.ruleResults.some(x=>x.ruleId==='V-07'&&!x.passed));
});
test('untyped non-string source unit cannot be accepted',()=>{
 const got=evaluate({sourceUnit:null});
 assert.equal(got.status,'FAIL');
 assert.ok(got.ruleResults.some(x=>x.ruleId==='V-07'&&!x.passed));
});
test('canonical policy remains seven rules, with V-07 at MEDIUM',()=>{
 const rules=getValidationRules();
 assert.deepEqual(rules.map(x=>x.ruleId),['V-01','V-02','V-03','V-04','V-05','V-06','V-07']);
 assert.equal(rules.find(x=>x.ruleId==='V-07').severity,'MEDIUM');
});
test('caller-provided receiptAttached and veritasCalled are NOT cryptographic proof',()=>{
 const got=evaluate({receiptAttached:true,veritasCalled:true});
 assert.equal(got.status,'PASS');
 assert.ok(!Object.hasOwn(got,'independentVeritasVerified'));
 assert.ok(!Object.hasOwn(got,'productionAuthorized'));
 assert.ok(!Object.hasOwn(got,'canonicalReceiptVerified'));
});
