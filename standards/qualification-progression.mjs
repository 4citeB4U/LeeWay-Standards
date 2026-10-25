/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.QUALIFICATION
TAG: LEEWAY_QUALIFICATION_PROGRESSION_CONTRACT_V1
WHO: LeeWay Standards. WHAT: Define mandatory authority, reconciliation, and safe-resumption evidence.
WHEN: 2026-10-25. WHERE: standards/qualification-progression.mjs.
WHY: A discovered blocker must become a governed and resumable workflow, not a dead end.
HOW: Deterministic required-evidence evaluation with typed next actions; no implicit grants.
AUTHORITY: Standards contract only; production trust is established by independent providers.
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
