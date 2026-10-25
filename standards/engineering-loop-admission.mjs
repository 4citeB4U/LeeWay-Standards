/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.ENGINEERING
TAG: LEEWAY_ENGINEERING_LOOP_ADMISSION_V1
5WH: WHAT = Enforce canonical engineering-loop completion; WHY = Prevent repeated unadvanced blocked qualifications and unsupported PASS.
WHO = LeeWay Standards; WHERE = standards/engineering-loop-admission.mjs; WHEN = 2026-10-25.
HOW = Bounded deterministic checkpoint evidence and no implicit trust or autoapproval.
AUTHORITY: Standards decision contract; caller must separately bind authenticated evidence and Veritas.
LICENSE: MIT
*/
export const ENGINEERING_STAGES=Object.freeze(['Investigate','Diagnose','Plan','Implement','Test','Validate','Repair','Retest','Verify','Evidence']);
const id=x=>typeof x==='string'&&/^[A-Za-z0-9._:-]{8,160}$/.test(x);
const sha=x=>typeof x==='string'&&/^[a-f0-9]{64}$/.test(x);
const blocked=(reason,stage=null)=>Object.freeze({state:'BLOCKED',reason,stage,completed:false,productionAuthorized:false});
export function evaluateEngineeringLoopCheckpoint({missionId,sourceSha256,stages,qualification,acceptance,evidence}={}){
 if(!id(missionId)||!sha(sourceSha256))return blocked('MISSION_OR_SOURCE_PROVENANCE_MISSING');
 if(!stages||typeof stages!=='object'||Array.isArray(stages))return blocked('ENGINEERING_STAGE_EVIDENCE_MISSING');
 for(const stage of ENGINEERING_STAGES){
  const item=stages[stage];
  if(!item||item.state!=='PASS'||!sha(item.evidenceSha256))
   return blocked('ENGINEERING_STAGE_NOT_VERIFIED',stage);
 }
 if(!qualification||!id(qualification.owner)||!id(qualification.requestId))
   return blocked('QUALIFICATION_OWNER_OR_REQUEST_MISSING');
 if(qualification.state!=='APPROVED')
   return blocked(qualification.state==='DENIED'?'QUALIFICATION_DENIED':'QUALIFICATION_PENDING',qualification.stage||null);
 if(!qualification.authorityVerified||!sha(qualification.decisionSha256))
   return blocked('QUALIFICATION_AUTHORITY_UNVERIFIED');
 if(!acceptance||acceptance.state!=='PASS'||!sha(acceptance.testEvidenceSha256))
   return blocked('TASK_ACCEPTANCE_NOT_VERIFIED');
 if(!evidence||!evidence.veritasVerified||!sha(evidence.veritasReceiptSha256)||
    !evidence.canonicalReceiptAdmitted||!sha(evidence.canonicalReceiptSha256))
   return blocked('CANONICAL_VERITAS_OR_RECEIPT_MISSING');
 return Object.freeze({state:'STANDARDS_CHECKPOINT_COMPLETE',completed:true,productionAuthorized:false,
  missionId,sourceSha256,nextGate:'AUTHENTICATED_RUNTIME_RELEASE_DECISION'});
}
