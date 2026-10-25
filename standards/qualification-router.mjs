/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.AUTHORITY
TAG: LEEWAY_DELEGATED_QUALIFICATION_ROUTER_V1
5WH: WHAT = Resolve qualification ownership and permitted next transitions.
WHY = Missing approvals must enter governed work, not disappear as generic BLOCKED_QUALIFICATION.
WHO = LeeWay Standards; WHERE = standards/qualification-router.mjs; WHEN = 2026-10-25.
HOW = Least-privilege, explicitly delegated scope, expiry, segregation, no self-elevation.
AUTHORITY: Decision proposal only; grants and signatures require independent Root of Trust validation.
LICENSE: MIT
*/
const valid=x=>typeof x==='string'&&/^[A-Za-z0-9._:-]{3,128}$/.test(x);
const deny=(reason,nextAction,owner=null)=>Object.freeze({state:'ACTION_REQUIRED',reason,nextAction,owner,authorized:false,automaticGrant:false});
export function resolveQualification({request,delegations=[],providers=[],now=Date.now()}={}){
 if(!request||!valid(request.requestId)||!valid(request.subject)||!valid(request.scope)||!valid(request.action)||
 !Number.isSafeInteger(now))return deny('REQUEST_INVALID','REPAIR_REQUEST');
 const eligible=delegations.filter(d=>d&&d.status==='ACTIVE'&&d.subject===request.subject&&
 d.scope===request.scope&&Array.isArray(d.actions)&&d.actions.includes(request.action)&&
 Number.isSafeInteger(d.notBefore)&&Number.isSafeInteger(d.expiresAt)&&d.notBefore<=now&&d.expiresAt>=now&&
 valid(d.issuer)&&valid(d.grantee)&&d.issuer!==d.grantee&&d.grantee===request.actor&&
 d.rootVerified===true&&d.signatureVerified===true);
 if(eligible.length!==1)return deny('NO_UNIQUE_VERIFIED_DELEGATION','ROUTE_TO_ROOT_OF_TRUST','root-of-trust');
 const grant=eligible[0];
 const verifiers=providers.filter(p=>p&&p.status==='QUALIFIED'&&p.scope===request.scope&&
 p.role==='INDEPENDENT_VERIFIER'&&p.rootVerified===true&&valid(p.providerId)&&
 p.providerId!==request.actor&&p.providerId!==grant.issuer&&p.providerId!==grant.grantee);
 if(verifiers.length!==1)return deny('INDEPENDENT_VERIFIER_UNAVAILABLE','ENROLL_OR_ASSIGN_VERIFIER','root-of-trust');
 return Object.freeze({state:'READY_FOR_AUTHORITY_EVALUATION',requestId:request.requestId,
  authorityOwner:grant.issuer,executionSubject:request.actor,verifier:verifiers[0].providerId,
  nextAction:'OBTAIN_SIGNED_PRE_DECISION',authorized:false,automaticGrant:false});
}
export function classifyQualificationFailure({reasonCode,requestId}={}){
 if(!valid(requestId)||typeof reasonCode!=='string')return deny('INVALID_FAILURE_RECORD','REPAIR_RECORD');
 const rules={
  NATIVE_BINDING_HASH_MISMATCH:['SOURCE_PROVENANCE','RECONCILE_PINNED_DEPENDENCY'],
  QUALIFICATION_PENDING:['AUTHORITY','RESUME_AUTHORITY_WORKFLOW'],
  INDEPENDENT_VERITAS_PROVIDER_UNREGISTERED:['INDEPENDENT_VERIFIER','ENROLL_OR_ASSIGN_VERIFIER'],
  CANONICAL_LEARNING_LEDGER_PROVIDER_UNREGISTERED:['LEDGER','REGISTER_EXISTING_LEDGER_PROVIDER'],
  ADMISSION_DENIED:['AUTHORITY','INSPECT_SIGNED_DENIAL']
 };
 const rule=rules[reasonCode];
 return Object.freeze({requestId,category:rule?.[0]??'UNCLASSIFIED',nextAction:rule?.[1]??'INSPECT_CANONICAL_OWNER',
  retainOriginalAcceptanceGate:true,automaticallyAuthorized:false});
}
