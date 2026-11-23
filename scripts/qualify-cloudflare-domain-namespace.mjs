/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.DOMAINS.CLOUDFLARE
TAG: LEEWAY.DOMAIN_OWNER_BOUNDED_NAMESPACE_QUALIFIER.V1
DISCOVERY_PIPELINE: Voice -> Intent -> Location -> Vertical -> Ranking -> Render
5WH:
WHAT = Validate source-only LeeWay namespace candidates and read-only zone observation.
WHY = Keep rapidweb.com separate from historical rapidwebdevelop.com and block unsanctioned DNS or authority promotion.
WHO = LeeWay Industries and owner-authorized Standards/Veritas workers
WHERE = scripts/qualify-cloudflare-domain-namespace.mjs
WHEN = 2026-10-28
HOW = Fail-closed owner/hostname/privacy/TLS checks; never call Cloudflare mutating APIs or issue production permission.
AUTHORITY: SOURCE_CONTRACT_ONLY. Independent Veritas and real owner proof required.
LICENSE: MIT
*/
import {readFileSync} from "node:fs";
import {fileURLToPath} from "node:url";

const fail = (code) => {throw Object.assign(new Error(code),{code});};
const EXACT_ROOT = "rapidwebdevelop.com";
const DOMAIN_REGEX = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;
const PUBLIC = new Set([
  "UNIVERSAL_PUBLIC_PORTAL",
  "AGENT_LEE_UI_HISTORICAL_COMPAT",
  "CHATGPT_DEVICE_BRIDGE_MCP_INGRESS",
  "SINGLE_POCKET_ID_OIDC_ISSUER",
  "LEEWAY_MAPS_PUBLIC_PRODUCT",
  "LEEWAY_LOGISTICS_PUBLIC_PRODUCT",
  "VOICE_FABRIC_PUBLIC_GATEWAY",
  "LEEWAY_STANDARDS_AND_SKILLS_PUBLIC_DOCS"
]);
const PRIVATE = new Set([
  "LEEWAY_RUNTIME_FABRIC","LEEWAY_CONTINUUM_CANONICAL_SQLITE",
  "LEEWAY_VRAM_DATABASE","MACHINE_CONSCIOUSNESS","LEEWAY_FORMULA",
  "INDEPENDENT_VERITAS","RECEIPT_AUTHORITY","LEARNING_LEDGER",
  "NATIVE_DEVICE_EXECUTION","GPU_KERNELS","ECHO_MEMORY_AUTHORITY"
]);
const EXPECTED = ["leeway","agentlee","mcp","identity","maps","logistics","voice","docs"];

export function qualifyCloudflareDomainNamespace(plan, observation=null){
  if(plan?.schema!=="leeway.cloudflare.domain-namespace.candidate.v1"
      || plan?.evidenceStatus!=="SOURCE_CANDIDATE_UNVERIFIED"
      || plan?.historicalDomain!==EXACT_ROOT
      || plan?.spokenDomainUnverified!=="rapidweb.com"){
    fail("LEEWAY_DOMAIN_IDENTITY_CONFLICT");
  }
  // Public RDAP shows a live registration, not a live Cloudflare DNS zone.
  // A purged zone requires new assigned nameservers; the old pair cannot be
  // promoted as authoritative merely because it remains at the registrar.
  const registry=plan.registrarEvidence;
  if(registry?.source!=="OWNER_SUPPLIED_RDAP_2026-10-28T16:47:57Z"
    || registry?.registrableDomain!==EXACT_ROOT
    || registry?.registryStatus!=="active"
    || registry?.registrar!=="Squarespace Domains II LLC"
    || registry?.reseller!=="Google Workspace"
    || registry?.registrationExpiresUtc!=="2027-04-14T13:28:23Z"
    || registry?.dnssecDelegationSigned!==false
    || registry?.oldCloudflareZoneStatus!=="PURGED_2026-04-02"
    || !Array.isArray(registry.legacyNameservers)
    || registry.legacyNameservers.length!==2
    || registry.legacyNameservers[0]!=="guss.ns.cloudflare.com"
    || registry.legacyNameservers[1]!=="pat.ns.cloudflare.com"
    || registry?.replacementNameservers!==null
    || registry?.registrarAccountControlVerified!==false
    || registry?.currentAuthoritativeSoaProbed!==false
    || registry?.currentMxTxtDkimDmarcPreserved!==false
    || registry?.identityAndEmailMigrationAuthorized!==false){
    fail("LEEWAY_DOMAIN_RDAP_IS_NOT_CLOUDFLARE_ACTIVATION");
  }
  if(plan.ownership?.currentConnectedCloudflareZoneId!==null
      || plan.ownership?.ownerConfirmed!==false
      || plan.ownership?.nameserversVerified!==false
      || plan.ownership?.activeZoneVerified!==false
      || plan.ownership?.dnsMutationAuthorized!==false){
    fail("LEEWAY_DOMAIN_OWNER_PROOF_NOT_PRESENT");
  }
  if(plan.certificate?.strategy!=="CLOUDFLARE_UNIVERSAL_SSL_FIRST_LEVEL_ONLY"
      || plan.certificate?.requiresProxiedDns!==true
      || plan.certificate?.allowNestedHostnames!==false){
    fail("LEEWAY_DOMAIN_TLS_SCOPE_INVALID");
  }
  if(!Array.isArray(plan.records) || plan.records.length!==EXPECTED.length)fail("LEEWAY_DOMAIN_NAMESPACE_INCOMPLETE");
  const seen=new Set(),purposes=new Set();
  for(const record of plan.records){
    if(!DOMAIN_REGEX.test(record?.name||"") || record.name.includes(".")
      || !EXPECTED.includes(record.name) || seen.has(record.name)
      || !PUBLIC.has(record.purpose)||purposes.has(record.purpose)
      || record.origin!==null || record.state!=="UNBOUND"
      || !record.route?.startsWith("/")
      || !record.access || typeof record.access!=="string"){
      fail("LEEWAY_DOMAIN_UNTRUSTED_PUBLIC_RECORD");
    }
    seen.add(record.name);purposes.add(record.purpose);
  }
  if(EXPECTED.some(x=>!seen.has(x)))fail("LEEWAY_DOMAIN_NAMESPACE_INCOMPLETE");
  const identity=plan.records.find(x=>x.name==="identity");
  const mcp=plan.records.find(x=>x.name==="mcp");
  if(identity.access!=="OIDC_ISSUER" || mcp.access!=="OAUTH_BEARER" || mcp.route!=="/mcp"){
    fail("LEEWAY_DOMAIN_OAUTH_MCP_ISOLATION_INVALID");
  }
  if(!Array.isArray(plan.privateAuthorities)
      || plan.privateAuthorities.length!==PRIVATE.size
      || new Set(plan.privateAuthorities).size!==PRIVATE.size
      || !plan.privateAuthorities.every(x=>PRIVATE.has(x))){
    fail("LEEWAY_DOMAIN_PRIVATE_AUTHORITIES_EXPOSED");
  }
  if(!Array.isArray(plan.productionGates) || plan.productionGates.length<10
      || !plan.productionGates.includes("OWNER_PROVES_DOMAIN_AND_CLOUDFLARE_ZONE")
      || !plan.productionGates.includes("INDEPENDENT_VERITAS_PRE_AND_POST")
      || !plan.productionGates.includes("RECEIPT_AUTHORITY_AND_LEARNING_LEDGER")){
    fail("LEEWAY_DOMAIN_PRODUCTION_GATES_INCOMPLETE");
  }
  const forbidden=["createZone","createDnsRecords","replaceDomain","migrateDatabases","issueIdentity","publishDeviceCommands"];
  if(forbidden.some(key=>plan.mutation?.[key]!==false)){
    fail("LEEWAY_DOMAIN_MUTATION_NOT_AUTHORIZED");
  }
  if(plan.platform?.canonicalStorage!=="LEEWAY_CONTINUUM_OWNER_AUTHORITY"
     || plan.platform?.authoritativeCode!=="github"
     || plan.platform?.devicePolicy!=="NO_CREATOR_PC_DEPENDENCY_FOR_CLOUD"){
    fail("LEEWAY_DOMAIN_AUTHORITY_BOUNDARY_INVALID");
  }
  const publicHosts=plan.records.map(x=>x.name+"."+EXACT_ROOT);
  const source={
    status:"SOURCE_CANDIDATE_PASSED",
    candidateDomain:EXACT_ROOT,
    similarlyNamedButUnverifiedDomain:plan.spokenDomainUnverified,
    publicHosts,
    privateAuthorities:plan.privateAuthorities,
    registryStatus:"OWNER_SUPPLIED_RDAP_ACTIVE",
    historicCloudflareZone:"PURGED",
    oldNameservers:"HISTORICAL_DELEGATION_DO_NOT_REUSE",
    replacementNameservers:"NOT_ASSIGNED",
    registrarAccess:"NOT_PROVEN",
    googleWorkspaceAndEmailDns:"NOT_RECONSTRUCTED",
    dnsRecordChanges:"NOT_PERFORMED",
    ownershipVerification:"NOT_PROVEN",
    dnsReadback:"NOT_PROBED",
    tlsValidation:"NOT_PROBED",
    issuerAndMcp:"NOT_PROBED",
    continuumReadback:"NOT_PROBED",
    independentVeritas:"NOT_PROBED",
    productionAdmission:"NOT_GRANTED"
  };
  if(observation===null)return Object.freeze(source);
  // Observations are intentionally read-only and never authorize mutations.
  // Restrict identity to the exact recovered original zone; an email alone is not proof.
  const zone=observation?.zone;
  if(typeof zone?.id!=="string" || !/^[a-f0-9]{32}$/.test(zone.id)
    || zone?.name!==EXACT_ROOT || zone?.status!=="active"
    || observation?.accountId!==zone?.accountId
    || observation?.ownerConfirmed!==true
    || observation?.nameserversVerified!==true
    || observation?.tlsFirstLevelVerified!==true){
    fail("LEEWAY_DOMAIN_ORIGINAL_ZONE_NOT_QUALIFIED");
  }
  return Object.freeze({
    ...source,status:"ORIGINAL_ZONE_READ_ONLY_OBSERVED",
    ownershipVerification:"EXACT_OWNER_ZONE_AND_NAMESERVERS_OBSERVED",
    dnsReadback:"ZONE_METADATA_ONLY",
    tlsValidation:"FIRST_LEVEL_OBSERVED",
    issuerAndMcp:"NOT_PROBED",
    productionAdmission:"NOT_GRANTED"
  });
}

if(process.argv[1] && fileURLToPath(import.meta.url)===process.argv[1]){
  try {
    const input=new URL("../config/cloudflare-domain-namespace.candidate.json",import.meta.url);
    const plan=JSON.parse(readFileSync(input,"utf8"));
    console.log(JSON.stringify(qualifyCloudflareDomainNamespace(plan),null,2));
  } catch(error){
    console.error(JSON.stringify({status:"FAILED",code:error?.code||"LEEWAY_DOMAIN_SOURCE_INVALID"}));
    process.exitCode=1;
  }
}
