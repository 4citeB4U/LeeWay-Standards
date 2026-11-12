/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.GOVERNED_ASSEMBLY
TAG: LEEWAY.STANDARDS.SEVEN_AUTHORITY_TOPOLOGY_GATE_V1
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render
5WH:
WHAT = Verify the existing ecosystem registry's seven-governance-authority handoff contract.
WHY = Reject silently missing/duplicated roles and forged automatic approval before source admission.
WHO = LeeWay Standards source authority (not the Runtime or an independent reviewer).
WHERE = scripts/verify-governed-assembly.mjs.
WHEN = 2026-11-11.
HOW = Deterministic source-only structural inspection, negative tests, no host credentials.
LICENSE: Existing LeeWay Standards source terms apply.
*/
const EXPECTED=Object.freeze({"standards":{"repo":"4citeB4U/LeeWay-Standards","role":"CONSTITUTIONAL_RULES"},"runtime-fabric":{"repo":"4citeB4U/Leeway-Runtime-Fabric","role":"GOVERNED_EXECUTION"},"machine-consciousness":{"repo":"4citeB4U/Machine-Consciousness","role":"DETERMINISTIC_POLICY_SENTINEL"},"veritas":{"repo":"4citeB4U/LEEWAY-VERITAS","role":"INDEPENDENT_REVIEW"},"receipt-authority":{"repo":"4citeB4U/Receipt-Authority","role":"CANONICAL_RECEIPT_CUSTODY"},"learning-ledger":{"repo":"4citeB4U/LeeWay-Learning-Ledger","role":"VERIFIED_LEARNING"},"production-final":{"repo":"4citeB4U/LeeWay-Production-Final-Execution-Layer","role":"PRODUCTION_RELEASE"}});
const EDGES=Object.freeze({"POLICY_INTAKE":{"from":"standards","to":"runtime-fabric","requiredProof":["standardsRevision","ownerAuthorization","activeMissionId"]},"SENTINEL_ALERT":{"from":"machine-consciousness","to":"runtime-fabric","requiredProof":["standardsRevision","observedPolicyViolation","correlationId"]},"EXECUTION_REVIEW":{"from":"runtime-fabric","to":"veritas","requiredProof":["sourceRevision","formulaDecision","originalExecutionEvidence","correlationId"]},"VERIFIED_EVIDENCE_CUSTODY":{"from":"veritas","to":"receipt-authority","requiredProof":["independentDecisionReadback","sourceRevision","correlationId"]},"VERIFIED_LEARNING":{"from":"receipt-authority","to":"learning-ledger","requiredProof":["durableReceiptReadback","atomicLearningObligation","correlationId"]},"PRE_RELEASE_HANDOFF":{"from":"receipt-authority","to":"production-final","requiredProof":["standardsRevision","signedReleaseAuthorization","independentReviewReadback","canonicalReceiptReadback","rollbackPlan","correlationId"]},"DEPLOYED_POST_REVIEW":{"from":"production-final","to":"veritas","requiredProof":["approvedDeploymentTarget","deployedPoststate","sourceRevision","correlationId"]},"POST_DEPLOYMENT_CUSTODY":{"from":"veritas","to":"receipt-authority","requiredProof":["signedDeployedPostReview","deployedReadback","correlationId"]},"LEARNING_POLICY_OBSERVATION":{"from":"learning-ledger","to":"machine-consciousness","requiredProof":["verifiedLearningReadback","correlationId"]}});
const CYCLE=Object.freeze(["INVESTIGATE","DIAGNOSE","PLAN","IMPLEMENT","TEST","VALIDATE","REPAIR","RETEST","VERIFY","EVIDENCE","CHECKPOINT","CONTINUE"]);
const PRODUCT=Object.freeze(["IDEA","NEED","POLICY_ADMISSION","FORMULA_DECISION","GOVERNED_BUILD","SOURCE_TEST","EVIDENCE_CAPTURE","INDEPENDENT_REVIEW","CANONICAL_RECEIPT","ELIGIBLE_LEARNING","PRODUCTION_RELEASE_REVIEW","TARGET_DEPLOYMENT","INDEPENDENT_DEPLOYED_POST","DEPLOYED_RECEIPT","MARKETABLE_PRODUCT_ACCEPTANCE"]);
const fail=code=>{throw Error('LEEWAY_ASSEMBLY_'+code)};
const exact=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
export function validateGovernedAssembly(a){
 if(!a||a.schema!=='leeway.standards.governed-assembly.v1'||
  a.status!=='SOURCE_TOPOLOGY_ONLY_PRODUCTION_NOT_ADMITTED'||a.contractOnly!==true||
  a.canonicalPolicy!=='4citeB4U/LeeWay-Standards')
  fail('SOURCE_CONTRACT_OR_ID_INVALID');
 if(!exact(a.engineeringCycle,CYCLE)||!exact(a.productPath,PRODUCT))fail('LIFECYCLE_DRIFT');
 const policy=a.enforcement;
 if(!policy||policy.actionAdmissionOwner!=='runtime-fabric'||
  policy.observationOwner!=='machine-consciousness'||
  policy.independentDecisionOwner!=='veritas'||
  policy.receiptCustodyOwner!=='receipt-authority'||
  policy.learningAdmissionOwner!=='learning-ledger'||
  policy.releaseOwner!=='production-final'||
  !['noDirectLlmExecution','noUnknownApiOrFileAdmission','rejectUnqualifiedEvidence','noSelfApproval','failClosedOnMissingBindings'].every(x=>policy[x]===true)||
  policy.liveIngressWired!==false||policy.productionAuthorized!==false)
   fail('CLAIMED_PERMISSION_OR_INGRESS_PROMOTION');
 if(!Array.isArray(a.nodes)||a.nodes.length!==7)fail('AUTHORITY_COUNT_INVALID');
 const seen=new Set();
 for(const node of a.nodes){
  if(!node||!Object.hasOwn(EXPECTED,node.id)||seen.has(node.id))fail('UNKNOWN_OR_DUPLICATE_AUTHORITY');
  seen.add(node.id);
  const expected=EXPECTED[node.id];
  if(node.repo!==expected.repo||node.role!==expected.role||
    node.sourceOnly!==true||node.approvedRuntimeBinding!=='NOT_VERIFIED'||node.productionQualified!==false)
    fail('AUTHORITY_IMPERSONATION_OR_PROMOTION');
 }
 if(!Array.isArray(a.transitions)||a.transitions.length!==Object.keys(EDGES).length)
  fail('HANDOFF_COUNT_INVALID');
 const found=new Set();
 for(const transition of a.transitions){
  if(!transition||!Object.hasOwn(EDGES,transition.id)||found.has(transition.id))
   fail('UNKNOWN_OR_DUPLICATE_HANDOFF');
  found.add(transition.id);
  const expected=EDGES[transition.id];
  if(transition.from!==expected.from||transition.to!==expected.to||
   transition.sourceOnly!==true||!exact(transition.requiredProof,expected.requiredProof))
   fail('HANDOFF_PROOF_OR_AUTHORITY_DRIFT');
 }
 if(a.alertPolicy?.emitter!=='machine-consciousness'||
   a.alertPolicy?.receiver!=='runtime-fabric'||
   a.alertPolicy?.operation!=='REQUEST_HOLD_AND_ALERT_ONLY'||
   a.alertPolicy?.mayDirectlyAuthorize!==false)
  fail('UNAUTHORIZED_SENTINEL_ESCALATION');
 return Object.freeze({status:'PASS_SOURCE_ASSEMBLY_TOPOLOGY',authorities:seen.size,
  handoffs:found.size,liveIngressQualified:false,productionAuthorized:false,
  independentVeritasVerified:false,receiptWritten:false,learningAdmitted:false});
}
