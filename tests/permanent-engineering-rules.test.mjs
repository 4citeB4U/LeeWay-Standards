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

const canonicalLaws=read('../Docs/governance/LEEWAY-CANONICAL-ENGINEERING-LAWS.md');
test('canonical LAW 01 through LAW 14 remain present exactly once',()=>{
 const ids=[...canonicalLaws.matchAll(/^## LAW (\d{2}) — /gm)].map(x=>x[1]);
 assert.deepEqual(ids,Array.from({length:14},(_,i)=>String(i+1).padStart(2,'0')));
});
test('canonical Formula/Loop law coupling preserves execution and learning evidence boundaries',()=>{
 const clause=canonicalLaws.split('### LAW 05 implementation clause — Formula, Engineering Loop, and acceptance convergence')[1]?.split('## LAW 06')[0];
 assert.ok(clause,'LAW 05 convergence clause must exist');
 for(const term of [
  'FORMULA_EXECUTION_STATE=NOT_EXECUTED',
  'measured 16×6 observations and six finite ranges',
  'indirect qualitative Formula Funnel governance',
  'Veritas pre-gate',
  'Veritas post-gate',
  'INDEPENDENT_VERITAS',
  'LEARNING_LEDGER=NOT_UPDATED',
  'C3 L03–L07 OPEN',
  'NOT_CONVERGED',
  'no automatic state promotion'
 ])assert.ok(clause.toLowerCase().includes(term.toLowerCase()),'missing law gate: '+term);
 for(const stage of policy.lifecycle)assert.ok(clause.includes(stage),'missing stage '+stage);
 assert.match(clause,/authenticated write, stable record ID, independent durable readback, and tamper\/replay\/denial tests/);
 assert.match(clause,/Receipt Authority records only executed\/observed facts/);
});
