/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.SH01
TAG: LEEWAY.STANDARDS.SH01.GRAPH_VERIFIER
DISCOVERY_PIPELINE: Voice -> Intent -> Location -> Vertical -> Ranking -> Render
5WH:
WHAT = Validate mainline pins and unique owners
WHY = Reject source drift, duplicated authority and cycles
WHO = LeeWay Standards source audit
WHERE = scripts/verify-sh01-snapshot.mjs
WHEN = 2026-10-28
HOW = Read-only deterministic Node source verifier
LICENSE: Existing LeeWay repository terms
*/
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
export const SNAPSHOT_SCHEMA='leeway.sh01.sovereign-ecosystem-source-snapshot.v1';
const VALID=new Set(['ALREADY_BUILT','PARTIALLY_BUILT','MISSING_GLUE','TRULY_MISSING','UNVERIFIED']);
const sha=x=>typeof x==='string'&&/^[0-9a-f]{40}$/.test(x);
const fail=(reason)=>({status:'SOURCE_AUDIT_REJECTED',reason,productionAdmissionAuthorized:false,
  independentVeritasCertified:false,protectedLedgerMutated:false});

export function verifySh01Snapshot(s){
 if(!s||typeof s!=='object'||Array.isArray(s)||s.schema!==SNAPSHOT_SCHEMA||
    s.missionId!=='SH-01'||s.productionAdmissionAuthorized!==false||
    s.independentVeritasCertified!==false||s.protectedLedgerMutated!==false)
  return fail('SNAPSHOT_NOT_SOURCE_ONLY');
 if(!Array.isArray(s.repositories)||s.repositories.length<15||
    !Array.isArray(s.workstreams)||!s.dependencies||
    typeof s.dependencies!=='object'||Array.isArray(s.dependencies))
  return fail('SNAPSHOT_INVENTORY_MISSING');
 const ids=new Set(),repos=new Set(),roles=new Set();
 for(const r of s.repositories){
   if(!r||typeof r!=='object'||typeof r.id!=='string'||ids.has(r.id)||
      !/^4citeB4U\/[A-Za-z0-9._-]+$/.test(r.repository||'')||
      repos.has(r.repository)||r.defaultBranch!=='main'||!sha(r.pinnedMainSha)||
      !VALID.has(r.bindingStatus)||r.liveProductionQualified!==false||
      typeof r.ownerRole!=='string'||roles.has(r.ownerRole)||
      !Array.isArray(r.blockers)||r.blockers.length===0||
      r.sourceVerification!=='GITHUB_REPOSITORY_MAIN_TREE_AND_PACKAGE_INSPECTED_WHERE_AVAILABLE')
     return fail('REPOSITORY_IDENTITY_AUTHORITY_OR_EVIDENCE_INVALID');
   ids.add(r.id);repos.add(r.repository);roles.add(r.ownerRole);
 }
 for(const must of ['standards','formula','runtime','veritas','receipt','learning',
   'continuum','vram','gpu','model','agent','skills','device','federate']){
   if(!ids.has(must))return fail('CORE_OWNER_MISSING:'+must);
 }
 const index=new Map(s.repositories.map(r=>[r.id,r]));
 if(index.get('receipt').repository===index.get('learning').repository||
    index.get('runtime').repository===index.get('veritas').repository||
    index.get('standards').repository===index.get('formula').repository)
   return fail('CANONICAL_SOVEREIGN_OWNER_COLLISION');
 const graph=new Map(),pending=new Set(ids);
 for(const id of ids){
   const edges=s.dependencies[id];
   if(!Array.isArray(edges)||edges.some(x=>typeof x!=='string'||!ids.has(x)||x===id)||
     edges.length!==new Set(edges).size)return fail('REPOSITORY_DEPENDENCY_INVALID:'+id);
   graph.set(id,edges);
 }
 if(Object.keys(s.dependencies).some(x=>!ids.has(x)))
   return fail('DEPENDENCY_REFERENCES_UNKNOWN_REPOSITORY');
 const stages=new Map();
 const visit=(node)=>{
   const state=stages.get(node)||0;
   if(state===1)return false;
   if(state===2)return true;
   stages.set(node,1);
   for(const dep of graph.get(node)||[])if(!visit(dep))return false;
   stages.set(node,2);pending.delete(node);return true;
 };
 for(const id of ids)if(!visit(id))return fail('DEPENDENCY_CYCLE');
 const vIds=new Set();
 for(const w of s.workstreams){
   if(!w||vIds.has(w.id)||ids.has(w.id)||
      !VALID.has(w.status)||!Array.isArray(w.dependencies)||
      w.dependencies.some(x=>!ids.has(x)&&!s.workstreams.some(t=>t.id===x))||
      w.ownerRepository!==null&&!repos.has(w.ownerRepository))
     return fail('LOGICAL_WORKSTREAM_BOUNDARY_INVALID');
   vIds.add(w.id);
 }
 // Workstream dependencies may only refer to previously verified nodes or
 // upstream virtual nodes; ensure the extended graph is acyclic too.
 const extended=new Map(graph);
 for(const w of s.workstreams)extended.set(w.id,w.dependencies);
 const extStates=new Map();
 function extVisit(id){
   if(extStates.get(id)===1)return false;
   if(extStates.get(id)===2)return true;
   extStates.set(id,1);
   for(const dep of extended.get(id)||[])if(!extended.has(dep)||!extVisit(dep))return false;
   extStates.set(id,2);return true;
 }
 for(const id of extended.keys())if(!extVisit(id))return fail('VIRTUAL_DEPENDENCY_CYCLE_OR_UNKNOWN');
 if(!Array.isArray(s.liveObservations)||s.liveObservations.length===0||
    !s.liveObservations.some(x=>x.kind==='HOST_INDEPENDENCE_GATE_FAIL_10_DRAFT'))
   return fail('KNOWN_RED_HOST_GATE_MUST_BE_PRESERVED');
 for(const e of s.liveObservations){
   if(!e||!repos.has(e.repo)||!sha(e.sha)||
      typeof e.url!=='string'||!e.url.startsWith('https://github.com/4citeB4U/'))
     return fail('OBSERVATION_PROVENANCE_INVALID');
 }
 if(!Array.isArray(s.gates)||s.gates.some(x=>x.status!=='OPEN'&&x.status!=='PARTIAL'))
   return fail('LIVE_PRODUCTION_GATES_MISCLASSIFIED');
 return {status:'SOURCE_SNAPSHOT_VALID',repositories:s.repositories.length,
   logicalWorkstreams:s.workstreams.length,graphNodes:extended.size,
   knownHostRedGatePreserved:true,sourceOnly:true,
   productionAdmissionAuthorized:false,independentVeritasCertified:false,
   protectedLedgerMutated:false};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const file=path.resolve(process.argv[2]||
   new URL('../standards/sh01-main-revision-snapshot.v1.json',import.meta.url).pathname);
 let report;
 try{report=verifySh01Snapshot(JSON.parse(fs.readFileSync(file,'utf8')))}
 catch(e){report=fail('SOURCE_SNAPSHOT_UNREADABLE_OR_INVALID_JSON');}
 process.stdout.write(JSON.stringify(report,null,2)+'\n');
 if(report.status!=='SOURCE_SNAPSHOT_VALID')process.exitCode=1;
}
