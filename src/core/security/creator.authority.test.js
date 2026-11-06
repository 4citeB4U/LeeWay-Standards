import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import ts from 'typescript';

// Evaluates the exact existing TypeScript module under test, not a copy.
// This suite uses SYNTHETIC trust callbacks and proves logic only;
// it does not enroll any production signing key or authenticate the Creator.
const source = readFileSync(join(process.cwd(), 'src/core/security/creator.authority.ts'), 'utf8');
const js = ts.transpileModule(source.replace("import crypto from 'crypto';", "import crypto from 'node:crypto';"), {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const { CreatorAuthority, CreatorAuthLevel, LEEWAY_CREATOR } =
  await import('data:text/javascript;base64,' + Buffer.from(js).toString('base64'));

const manifest = () => ({
  founderId: LEEWAY_CREATOR.id,
  authorityLevel: CreatorAuthLevel.SOVEREIGN,
  currentKeypair: { publicKey:'synthetic-only', privateKeyPath:'not-a-secret', keyId:'test', createdAt:1 },
  recoveryEnabled:false, canBypassIntegrityLock:false, canRotateSignatures:true,
  canChangePolicyMode:true, canInspectAuditTrail:true, canResetTrustChain:false,
  selfSignature:'fixture-only', manifestVersion:1,
});
const syntheticVerifier = {
  verifyManifestSignature: m => m.selfSignature === 'fixture-only',
  verifyProofToken: (token, id) => token === 'fixture-proof' && id === LEEWAY_CREATOR.id,
};

test('default constructor has no trusted verifier; fail closed', () => {
  const a=new CreatorAuthority();
  assert.equal(a.initialize(manifest()),false);
  assert.equal(a.authenticate('anything', CreatorAuthLevel.SOVEREIGN),null);
});

test('the public founder string is not authentication evidence', () => {
  const a=new CreatorAuthority(syntheticVerifier);
  const m=manifest();m.founderId='Lee';
  assert.equal(a.initialize(m),false);
});

test('synthetic grant rejects invalid token and limits level', () => {
  const a=new CreatorAuthority(syntheticVerifier);
  assert.equal(a.initialize(manifest()),true);
  assert.equal(a.authenticate('anything',CreatorAuthLevel.SOVEREIGN),null);
  const ctx=a.authenticate('fixture-proof',CreatorAuthLevel.USER);
  assert.ok(ctx);
  assert.equal(a.isAuthorized(ctx,'canIssuePolicies'),false);
  assert.equal(a.isAuthorized(ctx,'canInspectAuditTrail'),true);
  assert.equal(ctx.authProofToken,'');
  assert.equal(Object.isFrozen(ctx),true);
  assert.equal(Object.isFrozen(ctx.overrideCapabilities),true);
});

test('a forged authorization context cannot authorize creator capabilities', () => {
  const a=new CreatorAuthority(syntheticVerifier);
  assert.equal(a.initialize(manifest()),true);
  const ctx=a.authenticate('fixture-proof',CreatorAuthLevel.SOVEREIGN);
  assert.ok(ctx);
  assert.equal(a.isAuthorized(ctx,'canIssuePolicies'),true);
  assert.equal(a.isAuthorized({...ctx},'canIssuePolicies'),false);
});

test('a verified authority reload invalidates cached contexts', () => {
  const a=new CreatorAuthority(syntheticVerifier);
  assert.equal(a.initialize(manifest()),true);
  const ctx=a.authenticate('fixture-proof',CreatorAuthLevel.SOVEREIGN);
  assert.equal(a.isAuthorized(ctx,'canIssuePolicies'),true);
  assert.equal(a.initialize(manifest()),true);
  assert.equal(a.isAuthorized(ctx,'canIssuePolicies'),false);
});

test('manifest display copy redacts private key location', () => {
  const a=new CreatorAuthority(syntheticVerifier);
  assert.equal(a.initialize(manifest()),true);
  const m=a.getManifest();
  assert.equal(m.currentKeypair.privateKeyPath,'[REDACTED]');
});
