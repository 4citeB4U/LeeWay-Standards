/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.GOVERNED_ASSEMBLY.TEST
TAG: LEEWAY.STANDARDS.SEVEN_AUTHORITY_TOPOLOGY_NEGATIVE_V1
5WH:
WHAT = Test current seven-authority graph and fail-closed drift.
WHY = Prevent governance documents from silently becoming execution approvals.
WHO = LeeWay Standards maintainers.
WHERE = tests/governed-assembly.test.mjs.
WHEN = 2026-11-11.
HOW = Import the exact current source registry and mutate fixture copies.
LICENSE: Existing LeeWay Standards source terms apply.
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import {validateGovernedAssembly} from '../scripts/verify-governed-assembly.mjs';
const manifest=JSON.parse(fs.readFileSync(fileURLToPath(new URL('../standards/leeway-ecosystem-authority.v1.json',import.meta.url)),'utf8')).governedAssembly;
const probe=mutator=>{
 const a=structuredClone(manifest);mutator(a);
 assert.throws(()=>validateGovernedAssembly(a),/LEEWAY_ASSEMBLY_/);
};
test('real Standards-owned registry has seven source-only roles and required handoffs',()=>{
 const result=validateGovernedAssembly(manifest);
 assert.equal(result.authorities,7);assert.equal(result.handoffs,9);
 assert.equal(result.productionAuthorized,false);assert.equal(result.receiptWritten,false);
});
test('rejects missing authority',()=>probe(x=>x.nodes.pop()));
test('rejects duplicate authority',()=>probe(x=>x.nodes[2].id=x.nodes[1].id));
test('rejects substituting an unrelated source as Veritas',()=>probe(x=>x.nodes.find(n=>n.id==='veritas').repo='thirdparty/test'));
test('rejects self-awarded production authority',()=>probe(x=>x.enforcement.productionAuthorized=true));
test('rejects falsely claimed live ingress',()=>probe(x=>x.enforcement.liveIngressWired=true));
test('rejects learning before receipt custody',()=>probe(x=>x.transitions.find(t=>t.id==='VERIFIED_LEARNING').requiredProof=[]));
test('rejects missing deployed POST',()=>probe(x=>x.transitions=x.transitions.filter(t=>t.id!=='DEPLOYED_POST_REVIEW')));
test('rejects consciousness self-authorization',()=>probe(x=>x.alertPolicy.mayDirectlyAuthorize=true));
test('rejects shortened engineering loop',()=>probe(x=>x.engineeringCycle.pop()));
