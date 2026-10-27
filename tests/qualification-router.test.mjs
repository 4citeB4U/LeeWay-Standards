/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.TESTS
TAG: LEEWAY.STANDARDS.TESTS.QUALIFICATION.ROUTER
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render
5WH:
WHAT = Test qualified delegated authority routing and missing-Veritas responses
WHY = Prevent silent privilege escalation or dead-end blocked work
WHO = LeeWay Standards / Creator-authorized engineering
WHERE = tests/qualification-router.test.mjs
WHEN = 2026-10-25
HOW = Exercise deterministic scope and independent-verifier counterexamples
AUTHORITY: Synthetic source regression only; no production grant or fabricated independent Veritas.
LICENSE: MIT
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import {resolveQualification,classifyQualificationFailure} from '../standards/qualification-router.mjs';
const now=100000;
const request={requestId:'request-001',subject:'skills-service',scope:'skills.invoke',action:'execute',actor:'agent-lee'};
const grant={status:'ACTIVE',subject:request.subject,scope:request.scope,actions:['execute'],notBefore:0,expiresAt:200000,issuer:'creator-root',grantee:'agent-lee',rootVerified:true,signatureVerified:true};
const provider={status:'QUALIFIED',scope:request.scope,role:'INDEPENDENT_VERIFIER',rootVerified:true,providerId:'veritas-independent'};
test('without existing delegated authority, route to actual root',()=>{
 const x=resolveQualification({request,now});assert.equal(x.nextAction,'ROUTE_TO_ROOT_OF_TRUST');assert.equal(x.authorized,false);
});
test('verified delegation and separate verifier produce next action, not auto-grant',()=>{
 const x=resolveQualification({request,delegations:[grant],providers:[provider],now});
 assert.equal(x.state,'READY_FOR_AUTHORITY_EVALUATION');assert.equal(x.nextAction,'OBTAIN_SIGNED_PRE_DECISION');assert.equal(x.authorized,false);
});
test('expired grants and self-grants are refused',()=>{
 for(const g of [{...grant,expiresAt:1},{...grant,issuer:'agent-lee'}])
 assert.equal(resolveQualification({request,delegations:[g],providers:[provider],now}).state,'ACTION_REQUIRED');
});
test('no independent verifier must route enrollment',()=>{
 assert.equal(resolveQualification({request,delegations:[grant],providers:[],now}).nextAction,'ENROLL_OR_ASSIGN_VERIFIER');
});
test('repeated binding hash mismatch routes concrete reconciliation',()=>{
 const x=classifyQualificationFailure({reasonCode:'NATIVE_BINDING_HASH_MISMATCH',requestId:request.requestId});
 assert.equal(x.nextAction,'RECONCILE_PINNED_DEPENDENCY');assert.equal(x.automaticallyAuthorized,false);
});
