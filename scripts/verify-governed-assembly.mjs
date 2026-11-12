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
const STATIONS=Object.freeze([[1,"LAW","4citeB4U/LeeWay-Standards"],[2,"DEVICE_SENSORY","4citeB4U/Leeway-Digital-Brain-Diagnostincs-pkg"],[3,"FORMULA_MATH","4citeB4U/Leeway-formula-live"],[4,"GOVERNED_RUNTIME","4citeB4U/Leeway-Runtime-Fabric"],[5,"ENGINEERING_LOOP","4citeB4U/LeeWay-Engineering"],[6,"DETERMINISTIC_SENTINEL","4citeB4U/Machine-Consciousness"],[7,"RECEIPT_CUSTODY","4citeB4U/Receipt-Authority"],[8,"VERIFIED_LEARNING","4citeB4U/LeeWay-Learning-Ledger"],[9,"INDEPENDENT_VERITAS","4citeB4U/LEEWAY-VERITAS"],[10,"PRODUCTION_SHIPPING","4citeB4U/LeeWay-Production-Final-Execution-Layer"]]);
const WORKFORCE=Object.freeze(['TRUSTED_HOST_DETERMINISTIC_SENTINEL','LOCAL_IRON_BUILDER','OUTSIDE_DIPLOMATIC_CANDIDATE']);
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

 const exception=a.deviceExclusiveException;
 if(!exception||exception.schema!=='leeway.standards.device-exclusive-exception.v1'||
   exception.status!=='SOURCE_ONLY_NATIVE_RUNTIME_NOT_ENROLLED'||
   exception.otherEcosystemComponents!=='HARDWARE_AGNOSTIC'||
   exception.leewayRole!=='SOFTWARE_CREATOR_AND_SOURCE_ORIGIN_ONLY'||
   exception.nativeAccessStillRequiresOsAndHumanAuthorization!==true||
   exception.externalRawIndexExportDefault!==false||
   exception.genuineNativeIdentityVerified!==false||
   exception.deviceNotLegalPerson!==true||exception.sourceOnly!==true)
   fail('DEVICE_EXCEPTION_SCOPE_OR_AUTHORITY_DRIFT');
 const exclusiveProducts=['digital-brain','diagnostics'];
 if(!Array.isArray(exception.deviceExclusiveFamilies)||
   exception.deviceExclusiveFamilies.length!==2||
   !exclusiveProducts.every(id=>exception.deviceExclusiveFamilies.some(x=>x?.product===id)))
   fail('EXCLUSIVE_DEVICE_PRODUCT_SET_DRIFT');
 const exclusiveSeen=new Set();
 for(const item of exception.deviceExclusiveFamilies){
   if(exclusiveSeen.has(item.product))fail('EXCLUSIVE_DEVICE_PRODUCT_DUPLICATED');
   exclusiveSeen.add(item.product);
   if(item.repository!=='4citeB4U/Leeway-Digital-Brain-Diagnostincs-pkg'||
      item.operationalAllegiance!=='ORIGIN_DEVICE_EXCLUSIVE'||
      item.runtimeResidence!=='DEVICE_ONLY'||
      item.nativePaths!=='ORIGIN_DEVICE_ONLY'||
      item.nativeHardware!=='ORIGIN_DEVICE_ONLY'||
      item.crossDeviceIdentityReuse!==false)
     fail('EXCLUSIVE_DEVICE_IDENTITY_OR_PATH_DRIFT');
 }


 const factory=a.factoryFloor;
 if(!factory||factory.schema!=='leeway.standards.ten-station-factory-floor.v1'||
   factory.status!=='SOURCE_CONTRACT_ONLY_RUNTIME_BOOTSTRAP_UNQUALIFIED'||
   factory.deviceExceptionRef!=='leeway.standards.device-exclusive-exception.v1'||
   factory.productionIngressWired!==false)
   fail('FACTORY_FLOOR_SOURCE_SCOPE_DRIFT');
 if(!Array.isArray(factory.stations)||factory.stations.length!==STATIONS.length)
   fail('FACTORY_STATION_COUNT_INVALID');
 for(let i=0;i<STATIONS.length;i++){
   const [number,station,repository]=STATIONS[i],s=factory.stations[i];
   if(!s||s.number!==number||s.station!==station||s.repository!==repository||s.sourceOnly!==true)
     fail('FACTORY_STATION_ROLE_OR_ORDER_DRIFT');
 }
 if(!Array.isArray(factory.workforceTiers)||factory.workforceTiers.length!==3)
   fail('WORKFORCE_TIER_COUNT_INVALID');
 for(let i=0;i<3;i++){
   const tier=factory.workforceTiers[i];
   if(!tier||tier.tier!==i||tier.identity!==WORKFORCE[i]||tier.requiresRuntimeAdmission!==true)
     fail('WORKFORCE_TIER_IDENTITY_DRIFT');
 }
 if(factory.workforceTiers[0].directReceiptSigning!==false||
   factory.workforceTiers[0].directProductionApproval!==false||
   factory.workforceTiers[1].localWritePermission!=='SPECIFIC_GRANTED_CAPABILITY_ONLY'||
   factory.workforceTiers[1].canBypassNativeOs!==false||
   factory.workforceTiers[2].localWritePermission!=='DENIED'||
   factory.workforceTiers[2].sourceContribution!=='CREATOR_APPROVED_DRAFT_PR_CANDIDATE_ONLY'||
   factory.workforceTiers[2].canClaimHardwareExecution!==false)
   fail('WORKFORCE_TIER_ESCALATION');
 const cold=factory.coldStart;
 if(!cold||cold.activeSourcePinRequired!==true||
   cold.exactAgentAndWorkIdRequired!==true||
   cold.deviceBridgeRequiredWhenDeviceAction!==true||
   cold.readOriginalEvidenceBeforeRetest!==true||
   cold.sessionAdmissionVerified!==false||
   cold.voiceRuleZero!=='BEHAVIORAL_COMPLIANCE_NOT_CRYPTOGRAPHIC_IDENTITY'||
   cold.cryptographicIdentity!=='TRUSTED_HOST_ISSUED_SCOPED_ADMISSION_NOT_LLM_SELF_ATTESTED')
   fail('COLD_START_SECURITY_CLAIM_DRIFT');
 const h=factory.handoff;
 if(!h||h.creatorSource!=='IDEA'||h.candidateOnlyBeforeHostAdmission!==true||
    !['modelSelfSigningForbidden','authenticatedTransportAndScopeRequired','preserveOriginalTestLogAndHash',
      'independentVeritasPrePostRequired','receiptAppendAndReadbackRequired',
      'eligibleLearningOnlyAfterVerifiedReceipt','ownerApprovedDeploymentRequired',
      'independentDeployedPostRequired','sourceTestsAloneCannotGrantProduction',
      'noAdditionalQueueLedgerVerifier'].every(k=>h[k]===true))
    fail('FACTORY_HANDOFF_PROOF_MISSING');

 if(a.alertPolicy?.emitter!=='machine-consciousness'||
   a.alertPolicy?.receiver!=='runtime-fabric'||
   a.alertPolicy?.operation!=='REQUEST_HOLD_AND_ALERT_ONLY'||
   a.alertPolicy?.mayDirectlyAuthorize!==false)
  fail('UNAUTHORIZED_SENTINEL_ESCALATION');
 return Object.freeze({status:'PASS_SOURCE_ASSEMBLY_TOPOLOGY',authorities:seen.size,
  handoffs:found.size,liveIngressQualified:false,productionAuthorized:false,
  independentVeritasVerified:false,receiptWritten:false,learningAdmitted:false});
}
