#!/usr/bin/env node
/*
LEEWAY HEADER — DO NOT REMOVE

REGION: CORE
TAG: CORE.CORE.SCRIPTS.VERIFY_ECOSYSTEM_AUTHORITY.MAIN
DESCRIPTION: Auto-enforced by LeeWay Standards Enforcement Engine
AUTHORITY: LeeWay-Standards
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render

5WH:
WHAT = verify-ecosystem-authority.mjs — governed module
WHY = Enforce LeeWay architectural standards in this file
WHO = Leeway Innovations / LeeWay Standards Enforcement Engine
WHERE = scripts/verify-ecosystem-authority.mjs
WHEN = Governance metadata applied 2026-10-08
HOW = Auto-enforced header; update manually with full 5WH detail

CHAIN: Standards → Integrated → Runtime → Projections
LICENSE: Existing file and repository license terms remain unchanged
*/
import fs from "node:fs";
const p="standards/leeway-ecosystem-authority.v1.json";
const s="schemas/leeway-ecosystem-authority.v1.schema.json";
const a="contracts/leeway-application-manifest.v1.schema.json";
for(const f of [p,s,a]) if(!fs.existsSync(f)) throw new Error("Missing ecosystem authority artifact: "+f);
const r=JSON.parse(fs.readFileSync(p,"utf8"));
if(r.registryId!=="LEEWAY_ECOSYSTEM_AUTHORITY_V1") throw new Error("Registry identity drift");
const byId=new Map();
for(const x of r.authorities){
  if(byId.has(x.id)) throw new Error("Duplicate authority id: "+x.id);
  byId.set(x.id,x);
  if(x.id!=="standards" && !/^[0-9a-f]{40}$/.test(x.approvedCommit||"")) throw new Error("Unpinned external authority: "+x.id);
}
for(const id of r.requiredCoreIds) if(!byId.has(id)) throw new Error("Missing required core authority: "+id);
if(byId.get("runtime-fabric")?.repo!=="4citeB4U/Leeway-Runtime-Fabric") throw new Error("Runtime Fabric authority drift");
if(byId.get("formula")?.repo!=="4citeB4U/Leeway-formula-live") throw new Error("Formula authority drift");
if(byId.get("skills")?.repo!=="4citeB4U/LeeWay-Agent-Skills") throw new Error("Skills authority drift");
if(byId.get("device-bridge")?.repo!=="4citeB4U/LEEWAY-DEVICE-BRIDGE") throw new Error("Device Bridge authority drift");
const recovery=byId.get("recovery-20260925");
if(recovery?.authorityClass!=="EVIDENCE_ONLY" || recovery?.executionEligible!==false) throw new Error("Recovery repository must remain evidence-only");
const raw=fs.readFileSync(p,"utf8");
for(const forbidden of ["127.0.0.1","localhost","D:\\\\","E:\\\\"]) if(raw.includes(forbidden)) throw new Error("Host-bound identity leaked into canonical registry: "+forbidden);
if(r.executionLaw?.dockerRole!=="OPTIONAL_DEVELOPMENT_QUALIFICATION_PACKAGING_ADAPTER") throw new Error("Docker role drift");
if(r.formulaControl?.evaluatorClaim!=="NOT_EXECUTED_BY_REGISTRY") throw new Error("Registry must not claim Formula execution");
console.log(JSON.stringify({state:"PASS_ECOSYSTEM_AUTHORITY",registryId:r.registryId,authorities:r.authorities.length,core:r.requiredCoreIds.length,runtime:r.executionLaw.runtimeAuthority,device:r.executionLaw.deviceExecutionAuthority},null,2));
