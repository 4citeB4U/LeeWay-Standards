/*
LEEWAY HEADER - DO NOT REMOVE
REGION: CORE
TAG: CORE.TESTS.ECOSYSTEM_AUTHORITY.MAIN
DISCOVERY_PIPELINE: Voice -> Intent -> Location -> Vertical -> Ranking -> Render
WHAT: Validate host-independent registry identity and reject embedded host bindings.
WHY: Explanatory governance text must not create false failures or conceal a real authority leak.
WHO: LeeWay Standards. WHERE: tests/ecosystem-authority.test.mjs.
WHEN: Qualification 2026-10-08.
HOW: Isolated exact registry/schema files and negative binding mutation.
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
const root=fileURLToPath(new URL('../',import.meta.url));
const tool=fileURLToPath(new URL('../scripts/verify-ecosystem-authority.mjs',import.meta.url));
const names=['standards/leeway-ecosystem-authority.v1.json','schemas/leeway-ecosystem-authority.v1.schema.json','contracts/leeway-application-manifest.v1.schema.json'];
const fixture=t=>{const dir=fs.mkdtempSync(path.join(os.tmpdir(),'leeway-authority-'));t.after(()=>fs.rmSync(dir,{force:true,recursive:true}));for(const name of names){const target=path.join(dir,name);fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(path.join(root,name),target);}return dir;};
const run=dir=>spawnSync(process.execPath,[tool],{cwd:dir,encoding:'utf8'});
test('canonical explanatory law mentioning localhost does not invalidate identity',t=>{const dir=fixture(t),result=run(dir);assert.equal(result.status,0,result.stderr);assert.match(result.stdout,/PASS_ECOSYSTEM_AUTHORITY/)});
test('actual host-bound authority remains forbidden',t=>{const dir=fixture(t),name=path.join(dir,names[0]);const registry=JSON.parse(fs.readFileSync(name,'utf8'));registry.authority.deviceEndpoint='http://localhost:8891';fs.writeFileSync(name,JSON.stringify(registry,null,2));const result=run(dir);assert.notEqual(result.status,0);assert.match(result.stderr,/Host-bound identity leaked/)});
