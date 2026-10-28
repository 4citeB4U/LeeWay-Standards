/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.DOMAINS.CLOUDFLARE.TEST
TAG: LEEWAY.DOMAIN_OWNER_BOUNDED_NAMESPACE_QUALIFIER.TEST.V1
DISCOVERY_PIPELINE: Voice -> Intent -> Location -> Vertical -> Ranking -> Render
5WH:
WHAT = Test legacy-domain preservation, exact owner observation, first-level TLS and private services.
WHY = A remembered RapidWeb name or old Cloudflare tunnel must not gain DNS write or production authority.
WHO = LeeWay Standards authorizers
WHERE = tests/cloudflare-domain-namespace.test.mjs
WHEN = 2026-10-28
HOW = Synthetic fixture/negative matrix; no Cloudflare credentials, network calls or writes.
AUTHORITY: SOURCE_CONTRACT_ONLY; not live zone, issuer, Veritas, receipt or provider verification.
LICENSE: MIT
*/
import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {qualifyCloudflareDomainNamespace} from "../scripts/qualify-cloudflare-domain-namespace.mjs";

const canonical=JSON.parse(readFileSync(new URL("../config/cloudflare-domain-namespace.candidate.json",import.meta.url),"utf8"));
const clone=()=>structuredClone(canonical);
const originalZone={
  zone:{id:"a".repeat(32),name:"rapidwebdevelop.com",status:"active",accountId:"owner-cloudflare-account"},
  accountId:"owner-cloudflare-account",ownerConfirmed:true,
  nameserversVerified:true,tlsFirstLevelVerified:true
};

test("strict candidate passes source checks without DNS write or production claims",()=>{
  const v=qualifyCloudflareDomainNamespace(canonical);
  assert.equal(v.status,"SOURCE_CANDIDATE_PASSED");
  assert.equal(v.candidateDomain,"rapidwebdevelop.com");
  assert.equal(v.similarlyNamedButUnverifiedDomain,"rapidweb.com");
  assert.equal(v.publicHosts.length,8);
  assert.equal(v.dnsRecordChanges,"NOT_PERFORMED");
  assert.equal(v.ownershipVerification,"NOT_PROVEN");
  assert.equal(v.productionAdmission,"NOT_GRANTED");
});

test("confusing rapidweb.com with historical domain is denied",()=>{
  const x=clone();x.historicalDomain="rapidweb.com";
  assert.throws(()=>qualifyCloudflareDomainNamespace(x),/LEEWAY_DOMAIN_IDENTITY_CONFLICT/);
});

test("source cannot claim Cloudflare account ownership or real zone ID",()=>{
  for(const item of [
    ["ownerConfirmed",true],["currentConnectedCloudflareZoneId","a".repeat(32)],
    ["activeZoneVerified",true],["dnsMutationAuthorized",true]
  ]){
    const x=clone();x.ownership[item[0]]=item[1];
    assert.throws(()=>qualifyCloudflareDomainNamespace(x),/LEEWAY_DOMAIN_OWNER_PROOF_NOT_PRESENT/);
  }
});

test("nested hostnames and disabled proxied TLS deny candidate",()=>{
  const nested=clone();nested.records[0].name="mcp.leeway";
  assert.throws(()=>qualifyCloudflareDomainNamespace(nested),/LEEWAY_DOMAIN_UNTRUSTED_PUBLIC_RECORD/);
  const tls=clone();tls.certificate.requiresProxiedDns=false;
  assert.throws(()=>qualifyCloudflareDomainNamespace(tls),/LEEWAY_DOMAIN_TLS_SCOPE_INVALID/);
});

test("no direct public Continuum, receipts, Veritas, GPU or execution hostname",()=>{
  const x=clone();x.records[0].name="continuum";
  assert.throws(()=>qualifyCloudflareDomainNamespace(x),/LEEWAY_DOMAIN_UNTRUSTED_PUBLIC_RECORD/);
  const y=clone();y.privateAuthorities=y.privateAuthorities.filter(z=>z!=="RECEIPT_AUTHORITY");
  assert.throws(()=>qualifyCloudflareDomainNamespace(y),/LEEWAY_DOMAIN_PRIVATE_AUTHORITIES_EXPOSED/);
});

test("Pocket ID and MCP resource boundaries are noninterchangeable",()=>{
  const x=clone();x.records.find(z=>z.name==="identity").access="PUBLIC_UI";
  assert.throws(()=>qualifyCloudflareDomainNamespace(x),/LEEWAY_DOMAIN_OAUTH_MCP_ISOLATION_INVALID/);
  const y=clone();y.records.find(z=>z.name==="mcp").route="/admin";
  assert.throws(()=>qualifyCloudflareDomainNamespace(y),/LEEWAY_DOMAIN_OAUTH_MCP_ISOLATION_INVALID/);
});

test("not even source may authorize DNS creation, data migration or device actions",()=>{
  for(const key of ["createZone","createDnsRecords","replaceDomain","migrateDatabases","issueIdentity","publishDeviceCommands"]){
    const x=clone();x.mutation[key]=true;
    assert.throws(()=>qualifyCloudflareDomainNamespace(x),/LEEWAY_DOMAIN_MUTATION_NOT_AUTHORIZED/);
  }
});

test("a recovered different Cloudflare account or invalid zone cannot be treated as domain proof",()=>{
  for(const patch of [
    {accountId:"different"},
    {zone:{...originalZone.zone,name:"rapidweb.com"}},
    {nameserversVerified:false},
    {ownerConfirmed:false},
    {tlsFirstLevelVerified:false}
  ]){
    const x={...originalZone,...patch};
    assert.throws(()=>qualifyCloudflareDomainNamespace(canonical,x),/LEEWAY_DOMAIN_ORIGINAL_ZONE_NOT_QUALIFIED/);
  }
});

test("even exact owner zone readback does not confer issuer, DNS write, or production admission",()=>{
  const observed=qualifyCloudflareDomainNamespace(canonical,originalZone);
  assert.equal(observed.status,"ORIGINAL_ZONE_READ_ONLY_OBSERVED");
  assert.equal(observed.dnsReadback,"ZONE_METADATA_ONLY");
  assert.equal(observed.dnsRecordChanges,"NOT_PERFORMED");
  assert.equal(observed.productionAdmission,"NOT_GRANTED");
  assert.equal(observed.issuerAndMcp,"NOT_PROBED");
});

test("RDAP confirms registration but may not be treated as restored Cloudflare",()=>{
  const v=qualifyCloudflareDomainNamespace(canonical);
  assert.equal(v.registryStatus,"OWNER_SUPPLIED_RDAP_ACTIVE");
  assert.equal(v.historicCloudflareZone,"PURGED");
  assert.equal(v.oldNameservers,"HISTORICAL_DELEGATION_DO_NOT_REUSE");
  assert.equal(v.registrarAccess,"NOT_PROVEN");
  assert.equal(v.replacementNameservers,"NOT_ASSIGNED");
  assert.equal(v.googleWorkspaceAndEmailDns,"NOT_RECONSTRUCTED");
  assert.equal(v.dnsRecordChanges,"NOT_PERFORMED");
});

test("tampered registry ownership, nameserver reuse and email claims cannot pass source",()=>{
  for(const [k,val] of [
    ["registrableDomain","rapidweb.com"],
    ["registrar","Cloudflare Inc."],
    ["reseller","Unknown"],
    ["oldCloudflareZoneStatus","ACTIVE"],
    ["registrarAccountControlVerified",true],
    ["replacementNameservers",["guss.ns.cloudflare.com","pat.ns.cloudflare.com"]],
    ["currentAuthoritativeSoaProbed",true],
    ["currentMxTxtDkimDmarcPreserved",true],
    ["identityAndEmailMigrationAuthorized",true]
  ]){
    const x=clone();x.registrarEvidence[k]=val;
    assert.throws(()=>qualifyCloudflareDomainNamespace(x),/LEEWAY_DOMAIN_RDAP_IS_NOT_CLOUDFLARE_ACTIVATION/,k);
  }
});
