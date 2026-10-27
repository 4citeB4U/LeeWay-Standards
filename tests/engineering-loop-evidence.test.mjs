/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.TESTS
TAG: LEEWAY.STANDARDS.TESTS.ENGINEERING_LOOP_EVIDENCE_V1
DISCOVERY_PIPELINE: Voice -> Intent -> Location -> Vertical -> Ranking -> Render
5WH:
WHAT = Test exact 10-stage evidence accounting, negative cases and false-production-claim refusal
WHY = Prevent Veritas work from stalling on undocumented engineering or inventing approval
WHO = LeeWay Standards engineering / source-qualification review
WHERE = tests/engineering-loop-evidence.test.mjs
WHEN = 2026-10-27
HOW = Deterministic synthetic fixtures for both success and diagnostic outcome, no native execution
LICENSE: Existing LeeWay repository terms remain unchanged
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import {inspectEngineeringLoopEvidence,STAGES} from '../scripts/check-engineering-loop-evidence.mjs';

const sha='a'.repeat(40);
const blob='b'.repeat(64);
const reference='https://github.com/4citeB4U/LeeWay-Standards/commit/'+sha;
const receipt='leeway-receipt://TEST-ONLY/'+blob;
const stage=(status='EVIDENCED',other={})=>({
  status, observation:'Synthetic controlled test fixture observation',observedAt:'2026-10-27T20:00:00.000Z',evidenceRef:reference,...other
});
function documentedFixture(){
  return {
    schema:'leeway.engineering.loop-evidence.v1',
    workId:'C3.TEST_ONLY',checkpointId:'C3_B8',ownerRole:'StandardsReviewer',
    source:{repository:'4citeB4U/LeeWay-Standards',commit:sha,artifactSha256:blob,evidenceRef:reference},
    scope:{objective:'Verify the scoped source-review test fixture',acceptanceCriteria:[
      'Observed fixture is accounted for at all ten stages','Negative tests were run in fixture'
    ],authorizationId:'FIXTURE_OWNER_APPROVAL_ONLY',authorizationRef:reference,
      rollbackStrategy:'Restore earlier fixture state without changing live providers',
      rollbackEvidenceRef:reference},
    stages:Object.fromEntries(STAGES.map(s=>[s,stage()])),
    formula:{executionState:'EXECUTED',inputSha256:blob,decisionSha256:blob,evaluationEvidenceRef:receipt},
    tests:{result:'PASS',evidenceRef:reference,negativeCases:'PASS',negativeEvidenceRef:reference},
    outcome:{status:'PASS',acceptanceMet:true,evidenceRef:reference,
      observation:'Synthetic source-review fixture says acceptance passed'},
  };
}
const contains=(a,needle)=>assert.ok(a.problems.includes(needle),JSON.stringify(a));
test('canonical fixed ten-stage loop is stable',()=>assert.deepEqual(STAGES,[
  'Investigate','Diagnose','Plan','Implement','Test','Validate',
  'Repair','Retest','Verify','Evidence'
]));
test('complete claimed success can only be SOURCE_EVIDENCE_READY, never production qualified',()=>{
  const r=inspectEngineeringLoopEvidence(documentedFixture());
  assert.equal(r.documentationComplete,true,JSON.stringify(r));
  assert.equal(r.sourceReviewReady,true);
  assert.equal(r.state,'SOURCE_EVIDENCE_READY_FOR_INDEPENDENT_REVIEW');
  assert.equal(r.productionAuthorized,false);
  assert.equal(r.independentVeritasVerified,false);
  assert.equal(r.learningAdmitted,false);
});
test('unaccounted-for stage blocks documentation and identifies exact missing stage',()=>{
  const q=documentedFixture();delete q.stages.Validate;
  const r=inspectEngineeringLoopEvidence(q);
  assert.equal(r.documentationComplete,false);contains(r,'STAGE_NOT_ACCOUNTED_FOR:Validate');
});
test('silent missing evidence on a stage blocks documentation even when it claims PASS',()=>{
  const q=documentedFixture();q.stages.Verify.evidenceRef='';
  const r=inspectEngineeringLoopEvidence(q);
  assert.equal(r.documentationComplete,false);contains(r,'STAGE_EVIDENCE_REFERENCE_MISSING:Verify');
});
test('repair/retest NOT_APPLICABLE requires a specific explicit authorized exception',()=>{
  const q=documentedFixture();
  q.stages.Repair=stage('NOT_APPLICABLE',{reason:'No repair was needed because tests passed at first attempt'});
  const r=inspectEngineeringLoopEvidence(q);
  contains(r,'STAGE_EXCEPTION_UNDOCUMENTED:Repair');
  q.stages.Repair.exceptionApprovalRef=reference;
  q.stages.Retest=stage('NOT_APPLICABLE',{
    reason:'No repair means no post-repair retest was required',exceptionApprovalRef:reference
  });
  const full=inspectEngineeringLoopEvidence(q);
  assert.equal(full.documentationComplete,true,JSON.stringify(full));
});
test('all other stages are mandatory and may not be waived',()=>{
  const q=documentedFixture();
  q.stages.Investigate=stage('NOT_APPLICABLE',{
    reason:'Cannot waive investigation for the scoped mission',exceptionApprovalRef:reference
  });
  contains(inspectEngineeringLoopEvidence(q),'STAGE_CANNOT_BE_NOT_APPLICABLE:Investigate');
});
test('blocked execution can be FULLY DOCUMENTED without upgrading original failed task',()=>{
  const q=documentedFixture();
  q.outcome={status:'BLOCKED',acceptanceMet:false,evidenceRef:reference,
    observation:'Actual model replay not performed by this controlled fixture'};
  q.stages.Implement=stage('BLOCKED',{
    reason:'No authorized live model replay adapter was available in this fixture'
  });
  q.stages.Test=stage('BLOCKED',{
    reason:'No actual live behavior test could run without adapter authorization'
  });
  q.formula={executionState:'NOT_EXECUTED',
    reason:'Qualified runtime Formula evaluator unavailable in this synthetic fixture'};
  q.tests.result='NOT_EXECUTED';q.tests.negativeCases='NOT_EXECUTED';
  const r=inspectEngineeringLoopEvidence(q);
  assert.equal(r.documentationComplete,true,JSON.stringify(r));
  assert.equal(r.sourceReviewReady,false);
  assert.equal(r.state,'DIAGNOSTIC_DOCUMENTED_OUTCOME_UNQUALIFIED');
  assert.equal(r.learningAdmitted,false);
});
test('not-run Formula on a claimed successful consequential task refuses source review',()=>{
  const q=documentedFixture();q.formula={executionState:'NOT_EXECUTED',
    reason:'No authenticated evaluator was exposed for this fixture'};
  const r=inspectEngineeringLoopEvidence(q);
  contains(r,'PASS_WITHOUT_DOCUMENTED_FORMULA_EVALUATION');
});
test('contradictory success and negative test failure are rejected',()=>{
  const q=documentedFixture();q.tests.negativeCases='FAIL';
  contains(inspectEngineeringLoopEvidence(q),'PASS_WITH_UNQUALIFIED_TESTS');
  q.outcome.status='FAIL';
  contains(inspectEngineeringLoopEvidence(q),'CONTRADICTORY_ACCEPTANCE_CLAIM');
});
test('self-declared Veritas or ledger success can never be admitted',()=>{
  const q=documentedFixture();
  q.veritasPass=true;q.productionAuthorized=true;q.learningAdmitted=true;
  const r=inspectEngineeringLoopEvidence(q);
  contains(r,'SELF_ASSERTED_PRODUCTION_OR_LEARNING_AUTHORITY');
  assert.equal(r.productionAuthorized,false);
  assert.equal(r.independentVeritasVerified,false);
  assert.equal(r.learningAdmitted,false);
});
test('mutable GitHub branch link or local path does not count as evidence',()=>{
  const q=documentedFixture();
  q.stages.Evidence.evidenceRef='https://github.com/4citeB4U/LeeWay-Standards/blob/main/README.md';
  q.scope.authorizationRef='E:/LeeWay-Work/consent.txt';
  const r=inspectEngineeringLoopEvidence(q);
  contains(r,'STAGE_EVIDENCE_REFERENCE_MISSING:Evidence');
  contains(r,'SCOPED_AUTHORIZATION_DOCUMENTATION_MISSING');
});
test('unknown stages and missing input fail closed without crashing',()=>{
  assert.equal(inspectEngineeringLoopEvidence(null).documentationComplete,false);
  const q=documentedFixture();q.stages.HiddenPromotion=stage();
  contains(inspectEngineeringLoopEvidence(q),'UNKNOWN_ENGINEERING_STAGE:HiddenPromotion');
});

test('pinned GitHub source evidence must match the exact source repository and commit',()=>{
 const q=documentedFixture();
 q.source.evidenceRef='https://github.com/4citeB4U/LeeWay-Standards/commit/'+'c'.repeat(40);
 contains(inspectEngineeringLoopEvidence(q),'GITHUB_SOURCE_PIN_READBACK_REFERENCE_MISSING');
 q.source.evidenceRef='https://github.com/external-supplier/other-project/commit/'+sha;
 contains(inspectEngineeringLoopEvidence(q),'GITHUB_SOURCE_PIN_READBACK_REFERENCE_MISSING');
});
test('ordered UTC stage observations are mandatory and reverse chronology blocks source readiness',()=>{
 const q=documentedFixture();
 q.stages.Implement.observedAt='2026-10-27T19:00:00.000Z';
 contains(inspectEngineeringLoopEvidence(q),'STAGE_CHRONOLOGY_REVERSED:Implement');
 q.stages.Implement.observedAt='tomorrow';
 contains(inspectEngineeringLoopEvidence(q),'STAGE_TIMESTAMP_MISSING_OR_INVALID:Implement');
});
test('canonical source cannot be an unaffiliated non-LeeWay repository',()=>{
 const q=documentedFixture();q.source.repository='unapproved/example';
 const r=inspectEngineeringLoopEvidence(q);
 contains(r,'CANONICAL_REPOSITORY_MISSING');
});
