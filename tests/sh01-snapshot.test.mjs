/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.SH01.GRAPH_SOURCE_TEST
TAG: LEEWAY.SH01.AUTHORITY_UNIQUENESS_NEGATIVE_TEST_V1
WHO: Source-only LeeWay Standards qualification.
WHAT: Verify independent owner, source pin, graph, real red blocker and no false production PASS.
WHEN: 2026-10-28.
WHERE: tests/sh01-snapshot.test.mjs.
WHY: Source audit must be machine-checkable and preserve unresolved production gates.
HOW: Node 22 local fixture with no privileged providers, files or credentials.
LICENSE: MIT.
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {verifySh01Snapshot} from '../scripts/verify-sh01-snapshot.mjs';
const main=JSON.parse(fs.readFileSync(new URL('../standards/sh01-main-revision-snapshot.v1.json',import.meta.url),'utf8'));
const copy=()=>structuredClone(main);
const assess=s=>verifySh01Snapshot(s);
test('01 current connected-GitHub revision inventory is valid source-only checkpoint',()=>{
 const r=assess(copy());
 assert.equal(r.status,'SOURCE_SNAPSHOT_VALID');
 assert.equal(r.repositories,20);assert.equal(r.logicalWorkstreams,5);
 assert.equal(r.productionAdmissionAuthorized,false);
 assert.equal(r.protectedLedgerMutated,false);
});
test('02 cannot relabel source audit as production admitted',()=>{
 const s=copy();s.productionAdmissionAuthorized=true;
 assert.equal(assess(s).reason,'SNAPSHOT_NOT_SOURCE_ONLY');
});
test('03 duplicate canonical repo cannot assert second owner',()=>{
 const s=copy();s.repositories[1].repository=s.repositories[0].repository;
 assert.equal(assess(s).status,'SOURCE_AUDIT_REJECTED');
});
test('04 Receipt Authority and Learning remain separate canonical owner repositories',()=>{
 const s=copy();
 s.repositories.find(x=>x.id==='receipt').repository='4citeB4U/LeeWay-Learning-Ledger';
 assert.equal(assess(s).status,'SOURCE_AUDIT_REJECTED');
});
test('05 duplicate independent signer/executor role fails',()=>{
 const s=copy();s.repositories.find(x=>x.id==='veritas').ownerRole=
   s.repositories.find(x=>x.id==='runtime').ownerRole;
 assert.equal(assess(s).status,'SOURCE_AUDIT_REJECTED');
});
test('06 missing or malformed source pin cannot masquerade as verified main',()=>{
 const s=copy();s.repositories.find(x=>x.id==='model').pinnedMainSha='not-a-commit';
 assert.equal(assess(s).reason,'REPOSITORY_IDENTITY_AUTHORITY_OR_EVIDENCE_INVALID');
});
test('07 cycle across actual repositories fails',()=>{
 const s=copy();s.dependencies.standards=['host'];
 assert.equal(assess(s).reason,'REPOSITORY_DEPENDENCY_INVALID:standards');
 const t=copy();t.dependencies.standards=['agent'];
 assert.equal(assess(t).reason,'DEPENDENCY_CYCLE');
});
test('08 invented production PASS instead of known red host independence CI is refused',()=>{
 const s=copy();s.liveObservations=s.liveObservations.filter(x=>x.kind!=='HOST_INDEPENDENCE_GATE_FAIL_10_DRAFT');
 assert.equal(assess(s).reason,'KNOWN_RED_HOST_GATE_MUST_BE_PRESERVED');
});
test('09 specific logical host cannot impersonate a new sovereign repo/owner',()=>{
 const s=copy();s.workstreams.find(x=>x.id==='host').ownerRepository='4citeB4U/Fake-Host-Authority';
 assert.equal(assess(s).reason,'LOGICAL_WORKSTREAM_BOUNDARY_INVALID');
});
test('10 BPv7/orbital remain explicitly UNVERIFIED external adapters',()=>{
 const s=copy();for(const id of ['bpv7','orbital']){
  const w=s.workstreams.find(x=>x.id===id);
  assert.equal(w.ownerRepository,null);assert.equal(w.status,'UNVERIFIED');
 }
 assert.equal(assess(s).status,'SOURCE_SNAPSHOT_VALID');
});
test('11 no workstream can secretly grant production authority',()=>{
 const s=copy();s.gates[2].status='PASS';
 assert.equal(assess(s).reason,'LIVE_PRODUCTION_GATES_MISCLASSIFIED');
});
test('12 unknown virtual dependency or cycle is refused',()=>{
 const s=copy();s.workstreams.find(x=>x.id==='host').dependencies.push('orbital');
 s.workstreams.find(x=>x.id==='orbital').dependencies=['host'];
 assert.equal(assess(s).reason,'VIRTUAL_DEPENDENCY_CYCLE_OR_UNKNOWN');
});
test('13 no CI observation without exact source revision and GitHub URL',()=>{
 const s=copy();s.liveObservations[0].sha='0000';
 assert.equal(assess(s).reason,'OBSERVATION_PROVENANCE_INVALID');
});
test('14 unknown or synthetic repository classifications are refused',()=>{
 const s=copy();s.repositories[0].bindingStatus='PRODUCTION_GREEN';
 assert.equal(assess(s).status,'SOURCE_AUDIT_REJECTED');
});
