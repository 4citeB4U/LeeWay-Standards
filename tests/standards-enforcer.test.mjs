/*
LEEWAY HEADER - DO NOT REMOVE
REGION: CORE
TAG: CORE.TESTS.STANDARDS_ENFORCER.MAIN
DISCOVERY_PIPELINE: Voice -> Intent -> Location -> Vertical -> Ranking -> Render
WHAT: Verify governance repair without changing executable source semantics.
WHY: Prevent source relicensing and line-ending mutation.
WHO: LeeWay Standards engineering. WHERE: tests/standards-enforcer.test.mjs.
WHEN: Qualification 2026-10-08.
HOW: Temporary fixtures and actual CLI.
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
const tool=fileURLToPath(new URL('../scripts/auto-enforce-file-governance.mjs',import.meta.url));
const fixture=t=>{const root=fs.mkdtempSync(path.join(os.tmpdir(),'leeway-standard-gate-'));t.after(()=>fs.rmSync(root,{force:true,recursive:true}));return root;};
const run=(root,extra=[])=>spawnSync(process.execPath,[tool,'--root',root,...extra],{encoding:'utf8'});
test('no-source scan cannot pass governance',t=>{const root=fixture(t);assert.notEqual(run(root).status,0)});
test('report mode never changes deficient source',t=>{const root=fixture(t),f=path.join(root,'plain.mjs');fs.writeFileSync(f,'export const n=1;\n');const r=run(root);assert.notEqual(r.status,0);assert.equal(fs.readFileSync(f,'utf8'),'export const n=1;\n')});
test('repair preserves shebang, SPDX, and original source',t=>{const root=fixture(t),f=path.join(root,'program.mjs');const source='#!/usr/bin/env node\n// SPDX-License-Identifier: MIT\nexport const n=1;\n';fs.writeFileSync(f,source);const r=run(root,['--apply']);assert.equal(r.status,0,r.stderr);const after=fs.readFileSync(f,'utf8');assert.ok(after.startsWith('#!/usr/bin/env node\n'));assert.ok(after.includes('// SPDX-License-Identifier: MIT\nexport const n=1;\n'));assert.ok(after.includes('LEEWAY HEADER'));assert.ok(!after.includes('LICENSE: PROPRIETARY'));const second=run(root);assert.equal(second.status,0,second.stderr);assert.equal(JSON.parse(second.stdout).changed,0)});
test('partial header gets markers without changing CRLF',t=>{const root=fixture(t),f=path.join(root,'prior.ts');const source='/*\r\nLEEWAY HEADER\r\n*/\r\nexport const a=7;\r\n';fs.writeFileSync(f,source);const r=run(root,['--apply']);assert.equal(r.status,0,r.stderr);const after=fs.readFileSync(f,'utf8');assert.ok(after.includes('REGION:'));assert.ok(after.includes('TAG:'));assert.ok(after.includes('DISCOVERY_PIPELINE:'));assert.ok(after.endsWith('*/\r\nexport const a=7;\r\n'));assert.equal((after.match(/(?<!\r)\n/g)||[]).length,0)});
