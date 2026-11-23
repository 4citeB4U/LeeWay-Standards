/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.GOVERNED_ASSEMBLY.TEST
TAG: LEEWAY.STANDARDS.SEVEN_AUTHORITY_TOPOLOGY_NEGATIVE_V1
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render
5WH:
WHAT = Test seven authority roles, ten stations, three tiers, device-only scope and fail-closed drift.
WHY = Prevent governance documents from silently becoming execution approvals.
WHO = LeeWay Standards maintainers.
WHERE = tests/governed-assembly.test.mjs.
WHEN = 2026-11-11.
HOW = Import pinned source registry and mutate authority, station, device and admission fixtures.
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

test('exact two device-exclusive product families stay attached to their origin device',()=>{
 const x=validateGovernedAssembly(manifest);
 assert.equal(x.status,'PASS_SOURCE_ASSEMBLY_TOPOLOGY');
 assert.deepEqual(manifest.deviceExclusiveException.deviceExclusiveFamilies.map(x=>x.product).sort(),['diagnostics','digital-brain']);
 assert.equal(manifest.deviceExclusiveException.otherEcosystemComponents,'HARDWARE_AGNOSTIC');
});
test('rejects portability of device-local Brain paths',()=>probe(x=>x.deviceExclusiveException.deviceExclusiveFamilies[0].nativePaths='GLOBAL'));
test('rejects a portable Diagnostics identity',()=>probe(x=>x.deviceExclusiveException.deviceExclusiveFamilies[1].crossDeviceIdentityReuse=true));
test('rejects extending device-exclusive ownership to Runtime',()=>probe(x=>x.deviceExclusiveException.deviceExclusiveFamilies.push({product:'runtime-fabric',repository:'4citeB4U/Leeway-Runtime-Fabric'})));
test('rejects claiming device allegiance waives OS and human permissions',()=>probe(x=>x.deviceExclusiveException.nativeAccessStillRequiresOsAndHumanAuthorization=false));
test('rejects claiming an unverified device as hardware-attested',()=>probe(x=>x.deviceExclusiveException.genuineNativeIdentityVerified=true));

test('all ten stations are in original factory order with distinct owners',()=>{
 const f=manifest.factoryFloor;
 assert.equal(f.stations.length,10);
 assert.equal(f.stations[1].station,'DEVICE_SENSORY');
 assert.equal(f.stations[8].station,'INDEPENDENT_VERITAS');
 assert.equal(f.handoff.independentVeritasPrePostRequired,true);
 assert.equal(f.productionIngressWired,false);
});
test('cannot skip Receipt station',()=>probe(x=>x.factoryFloor.stations.splice(6,1)));
test('cannot swap Veritas and Learning stations',()=>probe(x=>{
 const s=x.factoryFloor.stations;[s[7],s[8]]=[s[8],s[7]];
}));
test('external Tier 2 cannot silently gain local write privileges',()=>probe(x=>x.factoryFloor.workforceTiers[2].localWritePermission='ALLOWED'));
test('sentinel cannot become its own Receipt signer',()=>probe(x=>x.factoryFloor.workforceTiers[0].directReceiptSigning=true));
test('local Tier 1 cannot bypass native OS permission',()=>probe(x=>x.factoryFloor.workforceTiers[1].canBypassNativeOs=true));
test('voice cadence cannot be claimed as cryptographic proof',()=>probe(x=>x.factoryFloor.coldStart.voiceRuleZero='CRYPTOGRAPHIC_IDENTITY'));
test('self-signed model packet cannot promote an execution',()=>probe(x=>x.factoryFloor.handoff.modelSelfSigningForbidden=false));
test('cannot skip independently reviewed deployment POST',()=>probe(x=>x.factoryFloor.handoff.independentDeployedPostRequired=false));
test('cannot pretend session is admitted without host proof',()=>probe(x=>x.factoryFloor.coldStart.sessionAdmissionVerified=true));
