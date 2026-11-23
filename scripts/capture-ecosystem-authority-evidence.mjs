/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.GOVERNED_ASSEMBLY.CI
TAG: LEEWAY.STANDARDS.ASSEMBLY_EVIDENCE_CAPTURE_V1
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render
5WH:
WHAT = Run the existing authority validator and tests and preserve both outcomes.
WHY = Passing tests without source hashes and artifact custody become orphaned proof.
WHO = LeeWay Standards source CI, not independent Veritas or Receipt Authority.
WHERE = scripts/capture-ecosystem-authority-evidence.mjs.
WHEN = Each Standards ecosystem-assembly CI execution.
HOW = Execute Node checks, hash original output and upload sanitized candidate evidence.
LICENSE: Existing LeeWay Standards source terms apply.
*/
import {spawn} from 'node:child_process';
import {createHash} from 'node:crypto';
import {mkdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
const sha=data=>createHash('sha256').update(data).digest('hex');
async function check(name,args){
 const outHash=createHash('sha256'),errHash=createHash('sha256');
 let tail='',stdoutBytes=0,stderrBytes=0,spawnError=null;
 const child=spawn(process.execPath,args,{stdio:['ignore','pipe','pipe']});
 child.stdout.on('data',data=>{outHash.update(data);stdoutBytes+=data.length;process.stdout.write(data);tail=(tail+data.toString('utf8')).slice(-65536);});
 child.stderr.on('data',data=>{errHash.update(data);stderrBytes+=data.length;process.stderr.write(data);});
 const exitCode=await new Promise(done=>{child.on('error',e=>{spawnError=e.code||'SPAWN_FAILED';});child.on('close',code=>done(code));});
 const count=key=>{const m=[...tail.matchAll(new RegExp('^# '+key+' (\\d+)','gm'))];return m.length?Number(m.at(-1)[1]):null};
 const tests={total:count('tests'),passed:count('pass'),failed:count('fail')};
 const complete=name==='TESTS'?exitCode===0&&tests.total>0&&tests.passed===tests.total&&tests.failed===0:exitCode===0&&tail.includes('PASS_ECOSYSTEM_AUTHORITY');
 return {name,command:'node '+args.join(' '),exitCode,spawnError,
   stdoutSha256:outHash.digest('hex'),stderrSha256:errHash.digest('hex'),stdoutBytes,stderrBytes,
   tests:name==='TESTS'?tests:null,status:complete?'PASS_SOURCE':'FAIL_SOURCE'};
}
const checks=[
 await check('REGISTRY',['scripts/verify-ecosystem-authority.mjs']),
 await check('TESTS',['--test','tests/ecosystem-authority.test.mjs','tests/governed-assembly.test.mjs'])
];
const accepted=checks.every(x=>x.status==='PASS_SOURCE');
const evidence={schema:'leeway.standards.source-assembly-evidence.v1',
 originalSource:'4citeB4U/LeeWay-Standards',
 originalRunId:process.env.GITHUB_RUN_ID||null,
 sourceRevision:process.env.GITHUB_SHA||null,
 event:process.env.GITHUB_EVENT_NAME||null,
 recordedAt:new Date().toISOString(),
 state:accepted?'SOURCE_ASSEMBLY_TEST_PASS':'SOURCE_ASSEMBLY_TEST_FAIL',
 checks,
 scope:'SOURCE_ONLY_NO_LIVE_CLIENT_OR_PRODUCTION_BINDING',
 independentVeritas:'NOT_EVALUATED',
 receiptAuthority:'NOT_ADMITTED',learningLedger:'NOT_UPDATED',
 productionAuthorized:false,privateDeviceDataIncluded:false};
const data=JSON.stringify(evidence,null,2)+'\n';
const dir=resolve('.local-evidence');
await mkdir(dir,{recursive:true,mode:0o700});
await writeFile(resolve(dir,'source-evidence.json'),data,{mode:0o600});
await writeFile(resolve(dir,'source-evidence.sha256'),sha(data)+'  source-evidence.json\n',{mode:0o600});
if(!accepted)process.exitCode=1;
