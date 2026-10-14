/*
LEEWAY HEADER — DO NOT REMOVE

REGION: CORE.TESTS.GOVERNANCE
TAG: CORE.TESTS.STANDARDS_ENFORCER.MAIN
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render

5WH:
WHAT = Regression tests for the canonical LeeWay governance enforcer
WHY = Prevent misleading header acceptance and unsafe changes to source semantics
WHO = LeeWay Standards engineering
WHERE = tests/standards-enforcer.test.mjs
WHEN = 2026-10-14 (header governance review)
HOW = Node.js test runner invokes the real governance CLI against temporary fixtures

AGENTS:
AUDIT

LICENSE:
MIT
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

test('header-looking strings in source body cannot bypass scan',t=>{const root=fixture(t),f=path.join(root,'spoof.mjs');const source="const x='LEEWAY HEADER REGION: TAG: DISCOVERY_PIPELINE:';\\n";fs.writeFileSync(f,source);const r=run(root);assert.notEqual(r.status,0);assert.equal(JSON.parse(r.stdout).changed,1);assert.equal(fs.readFileSync(f,'utf8'),source)});

test('strict scan rejects markers without complete 5WH and license',t=>{const root=fixture(t),f=path.join(root,'partial.mjs');const source='/*\nLEEWAY HEADER — DO NOT REMOVE\nREGION: CORE\nTAG: CORE.TEST.PARTIAL.MAIN\nDISCOVERY_PIPELINE: valid\n*/\nexport const x=1;\n';fs.writeFileSync(f,source);const r=run(root,['--strict']);assert.notEqual(r.status,0);const report=JSON.parse(r.stdout);assert.equal(report.invalid,1);assert.ok(report.results[0].validationErrors.includes('MISSING_LICENSE'));assert.ok(report.results[0].validationErrors.includes('MISSING_5WH_WHAT'));assert.equal(fs.readFileSync(f,'utf8'),source)});

test('format-aware read-only validation covers Python PowerShell YAML HTML',t=>{
 const root=fixture(t);
 const comment="# LEEWAY HEADER — DO NOT REMOVE\n# REGION: CORE.TEST.FORMAT\n# TAG: CORE.TEST.FORMAT.MAIN\n# DISCOVERY_PIPELINE: governed\n# 5WH:\n# WHAT = test\n# WHY = validation\n# WHO = LeeWay\n# WHERE = fixture\n# WHEN = 2026-10-14\n# HOW = parser\n# LICENSE:\n# MIT\n";
 const htmlHeader='<!--\n'+"LEEWAY HEADER — DO NOT REMOVE\nREGION: CORE.TEST.FORMAT\nTAG: CORE.TEST.FORMAT.MAIN\nDISCOVERY_PIPELINE: governed\n5WH:\nWHAT = test\nWHY = validation\nWHO = LeeWay\nWHERE = fixture\nWHEN = 2026-10-14\nHOW = parser\nLICENSE:\nMIT"+'\n-->\n';
 for (const ext of ['py','ps1','yaml','yml']) fs.writeFileSync(path.join(root,'good.'+ext),comment+'\n');
 fs.writeFileSync(path.join(root,'good.html'),htmlHeader+'<!doctype html>\n');
 const r=run(root,['--strict']);
 assert.equal(r.status,0,r.stderr+' '+r.stdout);
 assert.equal(JSON.parse(r.stdout).scanned,5);
 assert.equal(JSON.parse(r.stdout).invalid,0);
});
test('incoming noncompliant Python and YAML are reported, never rewritten',t=>{
 const root=fixture(t);
 for(const ext of ['py','yml'])fs.writeFileSync(path.join(root,'bad.'+ext),'print(1)\n');
 const r=run(root,['--strict']);
 assert.notEqual(r.status,0);
 assert.equal(JSON.parse(r.stdout).scanned,2);
 assert.equal(JSON.parse(r.stdout).invalid,2);
 assert.equal(fs.readFileSync(path.join(root,'bad.py'),'utf8'),'print(1)\n');
});

test('SPDX license preamble before LeeWay identity remains valid',t=>{
 const root=fixture(t),f=path.join(root,'spdx.mjs');
 const source=[
 '/**',' * @license',' * SPDX-License-Identifier: MIT',' */',
 '/*','LEEWAY HEADER — DO NOT REMOVE','REGION: CORE.TEST.MODULE','TAG: CORE.TEST.SPDX.MODULE',
 'DISCOVERY_PIPELINE: governed','5WH:','WHAT = Source test','WHY = Preserve notices',
 'WHO = LeeWay','WHERE = spdx.mjs','WHEN = 2026-10-14','HOW = Node test',
 'LICENSE: MIT','*/','export const ok = true;',''].join('\n');
 fs.writeFileSync(f,source);
 const r=run(root,['--strict']);
 assert.equal(r.status,0,r.stderr+' '+r.stdout);
 assert.equal(JSON.parse(r.stdout).invalid,0);
 assert.equal(JSON.parse(r.stdout).changed,0);
 assert.equal(fs.readFileSync(f,'utf8'),source);
});

test('indented 5WH lines already used in LeeWay source validate',t=>{
 const root=fixture(t),f=path.join(root,'aligned.ts');
 const source=[
 '/*','LEEWAY HEADER — DO NOT REMOVE','REGION: CORE.TEST.ALIGN',
 'TAG: CORE.TEST.ALIGN.MAIN','DISCOVERY_PIPELINE: governed',
 '5WH:','  WHAT = Source file','  WHY  = Preserve alignment',
 '  WHO  = LeeWay','  WHERE = aligned.ts','  WHEN = 2026',
 '  HOW  = Node test','LICENSE: MIT','*/','export const ok=1;',''
 ].join('\n');
 fs.writeFileSync(f,source);
 const r=run(root,['--strict']);
 assert.equal(r.status,0,r.stderr+' '+r.stdout);
 assert.equal(JSON.parse(r.stdout).invalid,0);
 assert.equal(fs.readFileSync(f,'utf8'),source);
});

test('Markdown skill header with complete canonical 5WH does not require discovery marker',t=>{
 const root=fixture(t),f=path.join(root,'SKILL.md');
 const source=[
 '<!--','LEEWAY HEADER — DO NOT REMOVE','REGION: AI.SKILL.TEST',
 'TAG: AI.SKILL.TEST.CANONICAL','5WH:',
 'WHAT = Skill','WHY = Identity','WHO = LeeWay',
 'WHERE = SKILL.md','WHEN = 2026','HOW = Markdown','LICENSE:','MIT','-->',
 '# Skill',''].join('\n');
 fs.writeFileSync(f,source);
 const result=run(root,['--strict']);
 assert.equal(result.status,0,result.stderr+' '+result.stdout);
 assert.equal(JSON.parse(result.stdout).changed,0);
 assert.equal(JSON.parse(result.stdout).invalid,0);
});
