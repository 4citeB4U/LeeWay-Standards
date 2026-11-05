/*
LEEWAY HEADER — DO NOT REMOVE

REGION: MCP.AGENT.ENDPOINT.TEST
TAG: MCP.ENDPOINT.AGENT.SOURCE_CONTRACT_TEST

5WH:
WHAT = Test static Node, Python, Express and Fastify endpoint discovery.
WHY = Prevent false route claims and cross-service conflict reports.
WHO = LeeWay Industries; authorized source-test contributors.
WHERE = src/agents/mcp/endpoint-agent.test.js
WHEN = 2026-11-05
HOW = Isolated file fixtures and Node test runner; no device or network commands.

AUTHORIZED_ROLES: Source regression test only; no execution or deployment authority.
LICENSE: MIT
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, writeFile, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {EndpointAgent} from './endpoint-agent.js';

async function withSource(t, name, source) {
 const dir = await mkdtemp(join(tmpdir(),'leeway-endpoint-source-'));
 t.after(()=>rm(dir,{recursive:true,force:true}));
 await writeFile(join(dir,name),source);
 return {agent:new EndpointAgent({rootDir:dir}),file:name};
}

test('preserves Express and Fastify declarations with exact methods',async t=>{
 const {agent,file}=await withSource(t,'server.js',`app.get('/health', check);\nrouter.post('/v1/requests', run);\nfastify.delete('/v1/items/:id', remove);`);
 const found=await agent.scanFile(file,{serviceId:'rtc'});
 assert.equal(found.status,'scanned');
 assert.deepEqual(found.endpoints.map(x=>[x.method,x.path]),[['GET','/health'],['POST','/v1/requests'],['DELETE','/v1/items/:id']]);
 assert.ok(found.endpoints.every(x=>x.serviceId==='rtc'&&x.evidenceState==='SOURCE_ONLY_NOT_PROBED'));
});

test('recognizes direct Node HTTP literal method/path without a dummy root route',async t=>{
 const {agent,file}=await withSource(t,'service.mjs',`http.createServer((req,res)=>{\n if(req.method==='GET'&&url.pathname==='/v1/status')return ok();\n if(req.method==='POST'&&url.pathname==='/v1/generate')return ok();\n if(req.method==='GET'&&url.pathname.startsWith('/v1/files/'))return ok();\n if(req.method==='GET') {if(route==='health')return ok();}\n});`);
 const found=await agent.scanFile(file,{serviceId:'gpu'});
 assert.deepEqual(found.endpoints.map(x=>[x.method,x.path,x.matchType]),[['GET','/v1/status','exact'],['POST','/v1/generate','exact'],['GET','/v1/files/*','prefix']]);
 assert.equal(found.endpoints.some(x=>x.path==='/'),false);
});

test('discovers Python do_GET/do_POST literals but not unrelated methods',async t=>{
 const {agent,file}=await withSource(t,'studio-server.py',`class Handler:\n    def do_GET(self):\n        if parsed.path == '/api/local/status': pass\n        elif parsed.path.startswith('/api/local/preview/'): pass\n    def do_POST(self):\n        if parsed.path == '/api/local/synthesize': pass\n    def helper(self):\n        if parsed.path == '/private/not-route': pass\n`);
 const found=await agent.scanFile(file,{serviceId:'voice'});
 assert.deepEqual(found.endpoints.map(x=>[x.method,x.path,x.matchType]),[['GET','/api/local/status','exact'],['GET','/api/local/preview/*','prefix'],['POST','/api/local/synthesize','exact']]);
});

test('same route across distinct services is not a duplicate',async t=>{
 const {agent,file}=await withSource(t,'routes.js',`app.get('/health', status);`);
 const left=await agent.scanFile(file,{serviceId:'voice'});
 const right=await agent.scanFile(file,{serviceId:'rtc'});
 assert.equal(agent.detectDuplicates([left,right]).duplicates.length,0);
 assert.equal(agent.detectDuplicates([left,left]).duplicates.length,1);
});

test('missing file and invalid service identity fail without authority promotion',async t=>{
 const {agent,file}=await withSource(t,'routes.js',`app.get('/health', status);`);
 assert.equal((await agent.scanFile('missing.py')).status,'error');
 const invalid=await agent.scanFile(file,{serviceId:'x/y'});
 assert.equal(invalid.status,'error');
 assert.deepEqual(invalid.endpoints,[]);
});
