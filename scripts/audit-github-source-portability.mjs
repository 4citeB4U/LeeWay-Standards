/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.AUDIT
TAG: LEEWAY.STANDARDS.AUDIT.GITHUB_SOURCE_PORTABILITY_V1
DISCOVERY_PIPELINE: Voice -> Intent -> Location -> Vertical -> Ranking -> Render
5WH:
WHAT = Read-only audit of host-path assumptions in canonical GitHub checkouts
WHY = Identify authority-coupled drive/host assumptions without rewriting historical evidence
WHO = LeeWay Standards engineering / owner-authorized repository maintainers
WHERE = scripts/audit-github-source-portability.mjs
WHEN = 2026-10-27
HOW = Deterministic path classification, bounded walk, optional changed-file strict gate
LICENSE: Existing LeeWay repository terms remain unchanged
AUTHORITY: Report and scoped CI guard only; no production Veritas promotion
*/
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const SELF_ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const IGNORE=new Set(['.git','node_modules','vendor','dist','build','coverage','.next','.cache','__pycache__']);
const SOURCE=new Set(['.js','.jsx','.mjs','.cjs','.ts','.tsx','.py','.ps1','.sh','.cs','.go','.rs','.java','.json','.yaml','.yml','.toml','.ini','.config']);
const WINDOWS_ABSOLUTE=/(?:file:\/\/\/)?[A-Za-z]:[\\/][^\s"'\u0060<>),;]*/g;
const HOME_ABSOLUTE=/\/(?:home|Users)\/[A-Za-z0-9._-]+\/[A-Za-z0-9._/\\-]+/g;
const HOST_GUARD=/(?:hostname\s*\(\s*\)|COMPUTERNAME|HOSTNAME)[^\r\n]{0,90}(?:===|!==|==|!=)[^\r\n]{0,90}/i;
const DRIVE_IDENTITY=/(?:issuerHost|originHost|signerHost|productionSource|canonicalRoot|trustedRoot|identity|sourceRoot|rootPath|receiptWriter|keyPath|providerPath|privateKey|publicKey|ledgerPath|filePath|SOURCE_ROOT)/i;
const OPERATIVE=/(?:import\s*\(|from\s*['"]file:|readFile|writeFile|load\w*\(|require\s*\(|path\.resolve|path\.join|existsSync|spawn|execFile|process\.env|\bpath\s*[:=]|\broot\s*[:=]|\bledgerDir\s*[:=])/i;
const SHA=/^[a-f0-9]{40}$/i;
const REPO=/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;

function classification(file){
  const normalized=file.replaceAll('\\','/').toLowerCase();
  if(/(^|\/)(?:docs?|receipts?|evidence|forensic|history|historical|archive|backup|snapshots?)(\/|$)/.test(normalized))
    return 'HISTORICAL_REFERENCE';
  if(/(?:^|\/)(?:test|tests|test-fixtures|fixtures|examples)(?:\/|$)|(?:\.test\.|\.spec\.)/.test(normalized))
    return 'TEST_OR_EXAMPLE_REFERENCE';
  if(!SOURCE.has(path.extname(normalized)))return 'NON_EXECUTABLE_REFERENCE';
  return 'EXECUTABLE_SOURCE';
}
export function auditSourceText(text,{file='unknown',repository='UNVERIFIED',commit=null}={}){
  const category=classification(file);
  const findings=[];
  const lines=String(text).split(/\r?\n/);
  for(let i=0;i<lines.length;i++){
    const line=lines[i];
    const matches=[...line.matchAll(WINDOWS_ABSOLUTE),...line.matchAll(HOME_ABSOLUTE)];
    const guarded=HOST_GUARD.test(line);
    if(matches.length===0&&!guarded)continue;
    const location=matches.length>0?'ABSOLUTE_HOST_PATH':'HOSTNAME_AUTHORITY_COMPARISON';
    const assignment=/\b(?:const|let|var)\s+[A-Za-z0-9_]*(?:Path|Dir|Root|Writer|File)\s*=/i.test(line);
    const authorityContext=DRIVE_IDENTITY.test(line)||OPERATIVE.test(line)||assignment||guarded;
    const actionRequired=category==='EXECUTABLE_SOURCE'&&authorityContext;
    findings.push({
      repository,commit,file:file.replaceAll('\\','/'),line:i+1,
      signal:location,classification:actionRequired?'ACTION_REQUIRED':
        category==='EXECUTABLE_SOURCE'?'REVIEW_REQUIRED':category,
      severity:actionRequired?'BLOCK_NEW_SOURCE_PROMOTION':'REVIEW_ONLY',
      reason:guarded?'HOST_IDENTITY_MUST_NOT_SELECT_VERITAS_AUTHORITY':
        actionRequired?'EXECUTABLE_ABSOLUTE_PATH_REQUIRES_PORTABLE_BINDING':
        'HOST_PATH_OBSERVATION_NOT_CANONICAL_IDENTITY'
    });
  }
  return findings;
}
function options(argv){
  const config={root:SELF_ROOT,repo:null,commit:null,strict:false,pathsFile:null};
  for(let i=0;i<argv.length;i++){
    const arg=argv[i];
    if(arg==='--strict'){config.strict=true;continue;}
    if(['--root','--repo','--commit','--paths-file'].includes(arg)){
      if(!argv[i+1])throw Error('MISSING_ARGUMENT:'+arg);
      config[{'--root':'root','--repo':'repo','--commit':'commit','--paths-file':'pathsFile'}[arg]]=argv[++i];
      continue;
    }
    throw Error('UNKNOWN_ARGUMENT:'+arg);
  }
  if(!config.repo||!REPO.test(config.repo))throw Error('REPOSITORY_ID_REQUIRED');
  if(config.commit&&!SHA.test(config.commit))throw Error('INVALID_COMMIT_SHA');
  config.root=path.resolve(config.root);
  return config;
}
function within(root,relative){
  if(!relative||path.isAbsolute(relative))throw Error('UNSAFE_ABSOLUTE_FILE_SELECTION');
  const normalized=relative.replaceAll('\\','/');
  if(normalized.split('/').some(x=>x==='..'||x==='.'))throw Error('UNSAFE_RELATIVE_FILE_SELECTION');
  const destination=path.resolve(root,normalized);
  if(destination!==root&&!destination.startsWith(root+path.sep))throw Error('FILE_OUTSIDE_CHECKOUT');
  return destination;
}
function walk(root,at,files){
  const stat=fs.lstatSync(at);
  if(stat.isSymbolicLink())return;
  if(stat.isFile()){files.push(at);return;}
  if(!stat.isDirectory())return;
  for(const entry of fs.readdirSync(at,{withFileTypes:true})){
    if(IGNORE.has(entry.name)||entry.isSymbolicLink())continue;
    walk(root,path.join(at,entry.name),files);
  }
}
export function auditCheckout({root,repo,commit=null,selectedPaths=null}){
  const checkout=path.resolve(root);
  if(!fs.statSync(checkout).isDirectory())throw Error('CHECKOUT_NOT_DIRECTORY');
  const targets=[];
  if(selectedPaths){
    for(const relative of selectedPaths){
      const candidate=within(checkout,relative);
      if(fs.existsSync(candidate))walk(checkout,candidate,targets);
    }
  }else walk(checkout,checkout,targets);
  const files=[...new Set(targets)].sort();
  const result=[];
  let scanned=0;
  for(const file of files){
    const relative=path.relative(checkout,file).replaceAll('\\','/');
    if(relative.startsWith('.git/')||!SOURCE.has(path.extname(relative.toLowerCase()))&&
       !/\.(?:md|txt)$/i.test(relative))continue;
    if(fs.statSync(file).size>1024*1024)continue;
    scanned++;
    result.push(...auditSourceText(fs.readFileSync(file,'utf8'),{file:relative,repository:repo,commit}));
  }
  const counts={ACTION_REQUIRED:0,REVIEW_REQUIRED:0,HISTORICAL_REFERENCE:0,
    TEST_OR_EXAMPLE_REFERENCE:0,NON_EXECUTABLE_REFERENCE:0};
  for(const finding of result)counts[finding.classification]++;
  return {schema:'leeway.standards.github-source-portability-audit.v1',
    repository:repo,commit:commit||'UNVERIFIED',sourceIdentity:'GITHUB_CHECKOUT_UNATTESTED_UNLESS_SHA_VERIFIED',
    readOnly:true,productionAdmissionAuthorized:false,scannedFiles:scanned,
    selectedScope:selectedPaths!==null,counts,findings:result};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  try{
    const opts=options(process.argv.slice(2));
    let selected=null;
    if(opts.pathsFile){
      const list=fs.readFileSync(opts.pathsFile,'utf8').split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
      selected=list;
    }
    const report=auditCheckout({root:opts.root,repo:opts.repo,commit:opts.commit,selectedPaths:selected});
    process.stdout.write(JSON.stringify(report,null,2)+'\n');
    if(opts.strict&&report.counts.ACTION_REQUIRED>0)process.exitCode=2;
  }catch(e){process.stderr.write('PORTABILITY_AUDIT_BLOCKED:'+e.message+'\n');process.exitCode=1;}
}
