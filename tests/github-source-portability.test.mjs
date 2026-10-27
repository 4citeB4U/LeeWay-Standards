/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.TESTS
TAG: LEEWAY.STANDARDS.TESTS.PORTABLE_SOURCE_AUDIT_V1
DISCOVERY_PIPELINE: Voice -> Intent -> Location -> Vertical -> Ranking -> Render
5WH:
WHAT = Verify source path audit flags executable authority binding without rewriting it
WHY = Enforce R10/R25 while keeping evidence and valid runtime adapters intact
WHO = LeeWay Standards engineering
WHERE = tests/github-source-portability.test.mjs
WHEN = 2026-10-27
HOW = Isolated temporary checkout with positive, negative and historical cases
LICENSE: Existing LeeWay repository terms remain unchanged
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {auditSourceText,auditCheckout} from '../scripts/audit-github-source-portability.mjs';

const repository='4citeB4U/Leeway-Runtime-Fabric';
const commit='a'.repeat(40);
test('hardcoded drive source used by production loader is ACTION_REQUIRED',()=>{
 const source="const writerPath = 'E:/legacy/ledger/append.mjs';\nconst x = await import('file:///C:/legacy/runtime.mjs');";
 const r=auditSourceText(source,{file:'automation-runtime/ledger-loader.mjs',repository,commit});
 assert.equal(r.length,2);
 assert.ok(r.every(x=>x.classification==='ACTION_REQUIRED'));
 assert.equal(r[0].repository,repository);
});
test('hostname-based authority rule is actionable, independent of device name',()=>{
 const r=auditSourceText("if (os.hostname() !== 'LEO') throw Error('DENIED');",{
   file:'automation-runtime/authority.mjs',repository,commit});
 assert.equal(r.length,1);
 assert.equal(r[0].reason,'HOST_IDENTITY_MUST_NOT_SELECT_VERITAS_AUTHORITY');
});
test('evidence and historical documentation are flagged without rewriting',()=>{
 const r=auditSourceText("Prior writer was E:/legacy/ledger/append.mjs",{
   file:'docs/historical-proof.md',repository,commit});
 assert.equal(r[0].classification,'HISTORICAL_REFERENCE');
 assert.equal(r[0].severity,'REVIEW_ONLY');
});
test('test fixture paths are not automatic production bans',()=>{
 const r=auditSourceText("const simulated = 'E:/legacy/test-data.json'",{
   file:'tests/fixtures/paths.json',repository,commit});
 assert.equal(r[0].classification,'TEST_OR_EXAMPLE_REFERENCE');
});
test('portable package-relative and authorized dynamic binding are not flagged',()=>{
 const r=auditSourceText("const root=path.resolve(import.meta.dirname,'../');\nconst source=process.env.LEEWAY_RUNTIME_ROOT;",{
   file:'automation-runtime/host.mjs',repository,commit});
 assert.deepEqual(r,[]);
});
test('read-only tree scan scopes only selected files and leaves source unchanged',t=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'leeway-source-audit-'));
 t.after(()=>fs.rmSync(dir,{recursive:true,force:true}));
 const folder=path.join(dir,'automation-runtime');fs.mkdirSync(folder,{recursive:true});
 const target=path.join(folder,'provider.mjs'),original="const sourcePath='D:/historical/build/source.mjs';";
 fs.writeFileSync(target,original);fs.mkdirSync(path.join(dir,'docs'));
 fs.writeFileSync(path.join(dir,'docs','history.md'),'old C:/archive/backup.json');
 const report=auditCheckout({root:dir,repo:repository,commit,selectedPaths:['automation-runtime/provider.mjs']});
 assert.equal(report.counts.ACTION_REQUIRED,1);
 assert.equal(report.scannedFiles,1);
 assert.equal(report.productionAdmissionAuthorized,false);
 assert.equal(fs.readFileSync(target,'utf8'),original);
});
test('missing original deployment path does not force drive-identity decisions',()=>{
 const a=auditSourceText("const keyPath='/home/lee/.keys/veritas.pem';",{
  file:'automation-runtime/key-loader.mjs',repository,commit});
 assert.equal(a[0].classification,'ACTION_REQUIRED');
});
