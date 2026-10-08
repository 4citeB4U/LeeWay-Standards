/*
LEEWAY HEADER - DO NOT REMOVE
REGION: CORE
TAG: CORE.TESTS.PERMANENT_ENGINEERING_RULES.MAIN
DISCOVERY_PIPELINE: Voice -> Intent -> Location -> Vertical -> Ranking -> Render
WHAT: Validate permanent engineering governance without inventing execution evidence.
WHY: Prevent omitted rules, mission drift or unauthorized SK promotion.
WHO: LeeWay Standards. WHERE: tests/permanent-engineering-rules.test.mjs.
WHEN: 2026-10-08. HOW: Read canonical governed contract and numbered rule text.
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
