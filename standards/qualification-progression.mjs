/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.QUALIFICATION
TAG: LEEWAY.STANDARDS.QUALIFICATION.PROGRESSION
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render
5WH:
WHAT = Define original-job qualification progression and safe resumption evidence
WHY = Keep pending authority repair resumable without automatic execution grants
WHO = LeeWay Standards / Creator-authorized engineering
WHERE = standards/qualification-progression.mjs
WHEN = 2026-10-25
HOW = Require scoped reconciliation and signed decision proofs before recommending resumption
AUTHORITY: Existing Standards source; production trust remains with Runtime Fabric and independent Veritas.
LICENSE: MIT
*/
export const QUALIFICATION_TERMS=Object.freeze([
 'authorizedReconciliation','safeResumption','hardwareAttestation','cryptographicProof',
 'signedDecisionValidation','revocationCheck','replayProtection','executionUncertainty',
 'idempotencyControl','checkpointIntegrity','providerReadiness','evidenceCorrelation',
 'qualificationProgression'
]);
const valid=x=>typeof x==='string'&&/^[A-Za-z0-9._:-]{3,160}$/.test(x);
const sha=x=>typeof x==='string'&&/^[a-f0-9]{64}$/.test(x);
const refuse=(stage,reason,nextAction)=>Object.freeze({state:'ACTION_REQUIRED',stage,reason,nextAction,
 executionAuthorized:false,canResume:false});
export function evaluateQualificationProgression({request,proof,reconciliation,resumption,policy}={}){
 if(!request||!valid(request.requestId)||!valid(request.originalJobId)||!sha(request.originalCheckpointSha256))
  return refuse('checkpointIntegrity','ORIGINAL_CHECKPOINT_MISSING','RECOVER_EXISTING_JOB');
 if(!policy||policy.approvedForScope!==true||policy.revocationChecked!==true)
  return refuse('revocationCheck','SCOPE_OR_REVOCATION_UNVERIFIED','VALIDATE_CANONICAL_DELEGATION');
 if(policy.hardwareAttestationRequired===true&&proof?.hardwareAttestationVerified!==true)
  return refuse('hardwareAttestation','HARDWARE_ATTESTATION_REQUIRED','VERIFY_DEVICE_ATTESTATION');
 if(!proof||proof.cryptographicProofVerified!==true||proof.signedDecisionValidated!==true||
  !sha(proof.signedDecisionSha256)||proof.requestId!==request.requestId)
  return refuse('signedDecisionValidation','SIGNED_DECISION_NOT_VERIFIED','VERIFY_ORIGINAL_SIGNED_DECISION');
 if(proof.replayReservationVerified!==true)
  return refuse('replayProtection','REPLAY_RESERVATION_NOT_VERIFIED','RESERVE_REQUEST_NONCE');
 if(!reconciliation||reconciliation.requestId!==request.requestId||
  reconciliation.authorizedExecutionVerified!==true||!sha(reconciliation.executionEvidenceSha256))
  return refuse('authorizedReconciliation','AUTHORIZED_RECONCILIATION_INCOMPLETE','EXECUTE_QUALIFIED_REPAIR');
 if(reconciliation.executionOutcomeKnown!==true||reconciliation.idempotencyVerified!==true)
  return refuse('executionUncertainty','EXECUTION_OUTCOME_UNCERTAIN','RECONCILE_SIDE_EFFECTS');
 if(reconciliation.providerReady!==true||reconciliation.evidenceCorrelated!==true)
  return refuse('providerReadiness','PROVIDER_OR_CORRELATION_MISSING','VERIFY_PROVIDER_AND_EVIDENCE');
 if(!resumption||resumption.originalJobId!==request.originalJobId||
  resumption.checkpointSha256!==request.originalCheckpointSha256||
  resumption.originalCheckpointVerified!==true||resumption.ownerAcceptancePreserved!==true)
  return refuse('safeResumption','ORIGINAL_CHECKPOINT_UNVERIFIED','REVALIDATE_ORIGINAL_WORKPLANE_STATE');
 return Object.freeze({state:'READY_FOR_RUNTIME_RESUMPTION_ADMISSION',
  requestId:request.requestId,originalJobId:request.originalJobId,
  originalCheckpointSha256:request.originalCheckpointSha256,
  nextAction:'EXISTING_RUNTIME_HANDLER_REVALIDATE_AND_RESUME',
  executionAuthorized:false,canResume:false});
}
