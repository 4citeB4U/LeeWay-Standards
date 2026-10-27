/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.GOVERNANCE
TAG: LEEWAY.STANDARDS.GOVERNANCE.ENGINEERING_LOOP_EVIDENCE_ADMISSION_V1
DISCOVERY_PIPELINE: Voice -> Intent -> Location -> Vertical -> Ranking -> Render
5WH:
WHAT = Check completeness and consistency of existing ten-stage engineering evidence documents
WHY = Make omission and incomplete handoff actionable without fabricating independent Veritas proof
WHO = LeeWay Standards / Creator-governed engineering contributors
WHERE = scripts/check-engineering-loop-evidence.mjs
WHEN = 2026-10-27
HOW = Deterministic non-mutating source-provenance and lifecycle-documentation inspection
LICENSE: Existing file and repository terms remain unchanged
AUTHORITY: DOCUMENTATION_CHECK_ONLY; no runtime Veritas root, production receipt or Learning Ledger admission
*/
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

export const STAGES = Object.freeze([
  'Investigate','Diagnose','Plan','Implement','Test',
  'Validate','Repair','Retest','Verify','Evidence'
]);
const SHA40 = /^[a-f0-9]{40}$/i;
const SHA64 = /^[a-f0-9]{64}$/i;
const NAME = /^[A-Za-z0-9._:-]{1,160}$/;
const REPO = /^4citeB4U\/[A-Za-z0-9_.-]+$/;
const STAGE_STATUS = new Set(['EVIDENCED','BLOCKED','NOT_APPLICABLE']);
const OUTCOME = new Set(['PASS','FAIL','BLOCKED','NOT_EXECUTED']);
const FORMULA = new Set(['EXECUTED','NOT_EXECUTED','BLOCKED','FAILED']);
const checkName = value => typeof value === 'string' && NAME.test(value);
const observedTime = value => {
  if(typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value))return null;
  const parsed=Date.parse(value);
  return Number.isFinite(parsed) && new Date(parsed).toISOString()===value ? parsed : null;
};
const sourceMatchesPin=(ref,source)=>{
  if(typeof ref!=='string')return false;
  const matched=/^https:\/\/github\.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)\/(?:blob|tree|commit)\/([a-f0-9]{40})(?:\/[A-Za-z0-9_.\/-]+)?$/i.exec(ref);
  return Boolean(matched && (matched[1]+'/'+matched[2]).toLowerCase()===String(source?.repository||'').toLowerCase()
    && matched[3].toLowerCase()===String(source?.commit||'').toLowerCase());
};
const hasText = value => typeof value === 'string' && value.trim().length > 8;
const sourceRef = value => {
  if(typeof value !== 'string') return false;
  // References remain claims requiring independent readback, not signed proofs.
  const github = /^https:\/\/github\.com\/([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)\/(?:blob|tree|commit)\/([a-f0-9]{40})(?:\/[A-Za-z0-9_.\/-]+)?$/i.exec(value);
  if(github) return true;
  const actions = /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/actions\/runs\/[1-9][0-9]*$/i;
  if(actions.test(value)) return true;
  return /^leeway-receipt:\/\/[A-Za-z0-9._:-]+\/[a-f0-9]{64}$/i.test(value);
};
const errorIf = (problems, predicate, code) => { if(predicate) problems.push(code); };
const dedupe = values => [...new Set(values)];

/**
 * A documentation preflight only. It never authenticates a URL, issues a
 * Veritas decision or writes a Receipt/Learning record.
 *
 * A BLOCKED/FAIL attempt can have a fully documented engineering loop. In
 * that case the documentation is reusable, but the requested outcome is not
 * upgraded to PASS.
 */
export function inspectEngineeringLoopEvidence(record) {
  const problems = [];
  if(!record || typeof record !== 'object' || Array.isArray(record))
    return Object.freeze({
      schema:'leeway.standards.engineering-loop-documentation-assessment.v1',
      documentationComplete:false,sourceReviewReady:false,
      state:'DOCUMENTATION_BLOCKED',problems:['RECORD_MISSING'],
      productionAuthorized:false,independentVeritasVerified:false,
      learningAdmitted:false,stageCount:STAGES.length
    });
  errorIf(problems,record.schema !== 'leeway.engineering.loop-evidence.v1','SCHEMA_MISMATCH');
  errorIf(problems,!checkName(record.workId),'WORK_ID_MISSING');
  errorIf(problems,!checkName(record.checkpointId),'MASTER_CHECKPOINT_MISSING');
  errorIf(problems,!checkName(record.ownerRole),'OWNER_ROLE_MISSING');
  const source=record.source;
  errorIf(problems,!REPO.test(source?.repository || ''),'CANONICAL_REPOSITORY_MISSING');
  errorIf(problems,!SHA40.test(source?.commit || ''),'IMMUTABLE_GITHUB_COMMIT_MISSING');
  errorIf(problems,!SHA64.test(source?.artifactSha256 || ''),'SOURCE_ARTIFACT_HASH_MISSING');
  errorIf(problems,!sourceMatchesPin(source?.evidenceRef,source),'GITHUB_SOURCE_PIN_READBACK_REFERENCE_MISSING');
  const scope=record.scope;
  errorIf(problems,!hasText(scope?.objective),'OBJECTIVE_MISSING');
  errorIf(problems,!Array.isArray(scope?.acceptanceCriteria) ||
    scope.acceptanceCriteria.length===0 ||
    scope.acceptanceCriteria.some(x=>!hasText(x)),'ACCEPTANCE_CRITERIA_MISSING');
  errorIf(problems,!checkName(scope?.authorizationId) ||
    !sourceRef(scope?.authorizationRef),'SCOPED_AUTHORIZATION_DOCUMENTATION_MISSING');
  errorIf(problems,!hasText(scope?.rollbackStrategy) ||
    !sourceRef(scope?.rollbackEvidenceRef),'ROLLBACK_DOCUMENTATION_MISSING');
  const stages=record.stages;
  errorIf(problems,!stages || typeof stages !== 'object' ||
    Array.isArray(stages),'STAGES_OBJECT_MISSING');
  let lastObservedTime=null;
  for(const key of STAGES){
    const evidence=stages?.[key];
    if(!evidence || !STAGE_STATUS.has(evidence.status)){
      problems.push('STAGE_NOT_ACCOUNTED_FOR:'+key);
      continue;
    }
    if(!sourceRef(evidence.evidenceRef))
      problems.push('STAGE_EVIDENCE_REFERENCE_MISSING:'+key);
    const time=observedTime(evidence.observedAt);
    if(time===null)problems.push('STAGE_TIMESTAMP_MISSING_OR_INVALID:'+key);
    else {
      if(lastObservedTime!==null && time<lastObservedTime)
        problems.push('STAGE_CHRONOLOGY_REVERSED:'+key);
      lastObservedTime=time;
    }
    if(!hasText(evidence.observation))
      problems.push('STAGE_OBSERVATION_MISSING:'+key);
    if(evidence.status==='NOT_APPLICABLE'){
      if(!['Repair','Retest'].includes(key))
        problems.push('STAGE_CANNOT_BE_NOT_APPLICABLE:'+key);
      if(!hasText(evidence.reason) || !sourceRef(evidence.exceptionApprovalRef))
        problems.push('STAGE_EXCEPTION_UNDOCUMENTED:'+key);
    }
    if(evidence.status==='BLOCKED' && !hasText(evidence.reason))
      problems.push('STAGE_BLOCKER_CAUSE_MISSING:'+key);
  }
  if(stages && typeof stages==='object' && !Array.isArray(stages)){
    for(const key of Object.keys(stages))
      if(!STAGES.includes(key))problems.push('UNKNOWN_ENGINEERING_STAGE:'+key);
  }
  const f=record.formula;
  errorIf(problems,!FORMULA.has(f?.executionState),'FORMULA_STATE_MISSING');
  if(f?.executionState==='EXECUTED'){
    errorIf(problems,!sourceRef(f?.evaluationEvidenceRef) ||
      !SHA64.test(f?.inputSha256 || '') ||
      !SHA64.test(f?.decisionSha256 || ''),'FORMULA_EVALUATION_DOCUMENTATION_INCOMPLETE');
  } else {
    errorIf(problems,!hasText(f?.reason),'FORMULA_NONEXECUTION_REASON_MISSING');
  }
  const outcome=record.outcome;
  errorIf(problems,!OUTCOME.has(outcome?.status),'TASK_OUTCOME_MISSING');
  errorIf(problems,!sourceRef(outcome?.evidenceRef),'TASK_OUTCOME_EVIDENCE_MISSING');
  errorIf(problems,!hasText(outcome?.observation),'TASK_OUTCOME_OBSERVATION_MISSING');
  if(outcome?.status!=='PASS' && outcome?.acceptanceMet===true)
    problems.push('CONTRADICTORY_ACCEPTANCE_CLAIM');
  if(outcome?.status==='PASS' && outcome?.acceptanceMet!==true)
    problems.push('PASS_WITHOUT_ACCEPTANCE_CLAIM');
  const t=record.tests;
  errorIf(problems,!['PASS','FAIL','BLOCKED','NOT_EXECUTED'].includes(t?.result) ||
    !sourceRef(t?.evidenceRef),'TEST_EXECUTION_EVIDENCE_MISSING');
  errorIf(problems,!['PASS','FAIL','BLOCKED','NOT_EXECUTED'].includes(t?.negativeCases) ||
    !sourceRef(t?.negativeEvidenceRef),'NEGATIVE_CASE_EVIDENCE_MISSING');
  if(outcome?.status==='PASS' && (t?.result!=='PASS' || t?.negativeCases!=='PASS'))
    problems.push('PASS_WITH_UNQUALIFIED_TESTS');
  const verifiedSections = ['Investigate','Diagnose','Plan','Implement','Test','Validate','Verify','Evidence'];
  if(outcome?.status==='PASS' && verifiedSections.some(k=>stages?.[k]?.status!=='EVIDENCED'))
    problems.push('PASS_WITH_MISSING_REQUIRED_ENGINEERING_STAGE');
  if(outcome?.status==='PASS' && f?.executionState!=='EXECUTED')
    problems.push('PASS_WITHOUT_DOCUMENTED_FORMULA_EVALUATION');
  if(record.productionAuthorized === true || record.veritasPass === true ||
     record.learningAdmitted === true)
    problems.push('SELF_ASSERTED_PRODUCTION_OR_LEARNING_AUTHORITY');
  const documentationComplete=problems.length===0;
  const sourceReviewReady=documentationComplete && outcome?.status==='PASS';
  return Object.freeze({
    schema:'leeway.standards.engineering-loop-documentation-assessment.v1',
    documentationComplete,
    sourceReviewReady,
    state:!documentationComplete?'DOCUMENTATION_BLOCKED':
      sourceReviewReady?'SOURCE_EVIDENCE_READY_FOR_INDEPENDENT_REVIEW':
      'DIAGNOSTIC_DOCUMENTED_OUTCOME_UNQUALIFIED',
    problems:dedupe(problems),
    productionAuthorized:false,
    independentVeritasVerified:false,
    learningAdmitted:false,
    stageCount:STAGES.length,
    nextGate:!documentationComplete?'REPAIR_SCOPED_DOCUMENTATION_GAPS':
      'AUTHENTICATE_SOURCE_AND_OBSERVATIONS_WITH_EXISTING_INDEPENDENT_VERITAS'
  });
}

if(import.meta.url.startsWith('file:') && process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  try{
    if(process.argv.length!==3)throw Error('ONE_EVIDENCE_MANIFEST_PATH_REQUIRED');
    const assessment=inspectEngineeringLoopEvidence(JSON.parse(
      fs.readFileSync(process.argv[2],'utf8')));
    process.stdout.write(JSON.stringify(assessment,null,2)+'\n');
    if(!assessment.documentationComplete)process.exitCode=2;
  }catch(e){
    process.stderr.write('ENGINEERING_LOOP_EVIDENCE_BLOCKED:'+e.message+'\n');
    process.exitCode=1;
  }
}
