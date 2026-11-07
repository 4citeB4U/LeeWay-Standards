/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.TESTS
TAG: LEEWAY.STANDARDS.TESTS.PERMANENT_ENGINEERING_RULES
DISCOVERY_PIPELINE: Voice -> Intent -> Location -> Vertical -> Ranking -> Render
5WH:
WHAT = Verify exact R01-R25 source law, lifecycle and GitHub authority invariant
WHY = Reject omitted or self-certifying rules before source admission
WHO = LeeWay Standards engineering
WHERE = tests/permanent-engineering-rules.test.mjs
WHEN = 2026-10-27 amended governing assertions, original test suite retained
HOW = Read exact canonical JSON and Markdown contracts; Node regression tests
LICENSE: Existing LeeWay repository terms remain unchanged
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8').replace(/^\uFEFF/,'');
const policy=JSON.parse(read('../standards/permanent-engineering-rules.v1.json'));
const prose=read('../standards/PERMANENT-ENGINEERING-RULES.md');
test('exactly R01 to R25 exist once',()=>{const ids=[...prose.matchAll(/^R(\d{2}) /gm)].map(m=>'R'+m[1]);assert.deepEqual(ids,Array.from({length:25},(_,i)=>'R'+String(i+1).padStart(2,'0')));assert.deepEqual(ids,policy.ruleIds);assert.equal(policy.ruleCount,25)});
test('the prescribed repair lifecycle is immutable in scope',()=>assert.deepEqual(policy.lifecycle,['Investigate','Diagnose','Plan','Implement','Test','Validate','Repair','Retest','Verify','Evidence']));
test('C3 remains the mission and SK cannot be prematurely promoted',()=>{assert.match(policy.mission,/Golden Package C3/);assert.equal(policy.releaseRule,'NO_SK_WHILE_C3_OPEN');assert.match(prose,/Do not announce SK while C3 is open/)});
test('authorization, rollback, capability execution and evidence remain explicit',()=>{for(const term of ['authorization','rollback','real-physical-evidence','Veritas','human-approval'])assert.ok(policy.requires.includes(term));for(const id of ['R07','R08','R12','R13','R17','R18','R24'])assert.ok(prose.includes(id+' '))});

test('R25 mandates GitHub before building and after verification without mistaking source for deployment',()=>{assert.match(prose,/^R25 GitHub-First Source and Reuse Authority:/m);assert.ok(policy.requires.includes('github-source-first'));assert.ok(policy.requires.includes('github-post-change-reconciliation'));assert.match(policy.githubFirstRule.before,/canonical GitHub source/);assert.match(policy.githubFirstRule.after,/GitHub commit, PR, CI/);assert.equal(policy.githubFirstRule.noFixedHostIdentity,true);assert.equal(policy.githubFirstRule.executionAuthority,'AUTHORIZED_RUNTIME_AND_VERITAS');});

test('LAW 15 and R10/R25 retain GitHub source authority without inventing live execution',()=>{
 const laws=read('../Docs/governance/LEEWAY-CANONICAL-ENGINEERING-LAWS.md');
 assert.match(laws,/LAW 15 — GITHUB SOURCE AUTHORITY/);
 assert.match(laws,/GitHub distributes versioned source and contracts/);
 assert.match(laws,/Engineering-loop evidence is an admission prerequisite/);
 assert.match(laws,/A manifest or CI report may be/);
 assert.equal(policy.githubFirstRule.consequentialAcceptanceRequiresIndependentVeritas,true);
 assert.equal(policy.githubFirstRule.veritasMustNotSelfCertify,true);
 assert.equal(policy.githubFirstRule.hardcodedHostPathIsAuthority,false);
 assert.equal(policy.githubFirstRule.installedRuntimeMustMatchGitHubPinnedSource,true);
 assert.deepEqual(policy.portableSourceAndEngineeringAdmission.evidenceStages,policy.lifecycle);
 assert.equal(policy.portableSourceAndEngineeringAdmission.sourceTestDoesNotAuthorizeProduction,true);
 assert.equal(policy.portableSourceAndEngineeringAdmission.noGlobalBlockForScopedLegacyDebt,true);
 assert.match(prose,/^R10 Treat drive paths as observed local deployment bindings/m);
 assert.match(prose,/^R25 GitHub-First Source and Reuse Authority:.*ten-stage engineering loop/m);
});
