/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.SH01.RECEIPT.COMPATIBILITY.TEST
TAG: LEEWAY.SH01.RECEIPT_HASH_PAIR_NEGATIVE_SOURCE_TEST
5WH: WHO=SH-01 contributor; WHAT=synthetic negative source-fixture tests; WHEN=2026-10-28;
WHERE=tests/sh01-receipt-learning-identity-audit.test.mjs; WHY=defend v1 hash identity semantics;
HOW=Node 22 built-in test runner, no external services or credentials.
AUTHORITY: TEST ONLY, never real production Veritas/Receipt/Learning evidence.
LICENSE: existing Standards repository terms.
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {auditC3ReceiptHashPair} from '../scripts/sh01-receipt-learning-identity-audit.mjs';

const hash=x=>createHash('sha256').update(x).digest('hex');
const sorted=x=>JSON.stringify(x,(_k,v)=>v&&typeof v==='object'&&!Array.isArray(v)
 ?Object.fromEntries(Object.keys(v).sort().map(k=>[k,v[k]])):v);
const H='a'.repeat(64),B='b'.repeat(64),C='c'.repeat(64),D='d'.repeat(64),E='e'.repeat(64);
function fixture(){
 const event={schema:'leeway.learning.verified-technical-outcome.v1',
   requestId:'req-001',outcomeId:'out-001',receiptHash:H,
   formulaReceiptHash:B,veritasPreReceiptHash:C,veritasPostReceiptHash:D,
   independentReadbackHash:E,sourceRevision:'f'.repeat(40),
   capabilityId:'device-info',patternCode:'observed-state',
   outcomeState:'VERIFIED_SUCCESS',scope:'LEEWAY_INSTITUTIONAL_NONPERSONAL'};
 const admissionKey=event.requestId+':'+event.outcomeId+':'+event.receiptHash;
 const identityDigest=hash(admissionKey),eventDigest=hash(sorted(event));
 const obligation={schema:'leeway.receipt.learning-obligation.v1',
   obligationId:'obl-'+identityDigest,requestId:event.requestId,
   outcomeId:event.outcomeId,receiptHash:event.receiptHash,
   receiptRecordId:'rr-'+identityDigest,
   receiptCommitId:'rc-'+hash('c3-receipt-commit-v1:'+identityDigest+':'+eventDigest),
   admissionKey,eventDigest,commitState:'COMMITTED',
   scope:'LEEWAY_INSTITUTIONAL_NONPERSONAL',origin:'CANONICAL_RECEIPT_AUTHORITY',
   event:structuredClone(event)};
 const entry={type:'c3-governed-learning-outcome',schema:'leeway.receipt.c3-learning-record.v1',
   requestId:event.requestId,executionReceiptHash:event.receiptHash,
   receiptRecordId:obligation.receiptRecordId,receiptCommitId:obligation.receiptCommitId,
   learningObligation:obligation};
 const record={entry,previousHash:null,createdAt:'2026-10-28T00:00:00.000Z'};
 record.proof={sha256:hash(JSON.stringify(record))};
 const readback={status:'SOURCE_COMMIT_READBACK',canonicalReceiptCommitted:true,
   atomicLearningObligationCommitted:true,learningLedgerAdmitted:false,
   productionAuthorized:false,obligationId:obligation.obligationId,
   receiptRecordId:obligation.receiptRecordId,
   receiptCommitId:obligation.receiptCommitId,
   chainProofHash:record.proof.sha256,entries:1};
 return {event,record,readback};
}
const mutate=(caseName,change,expected)=>test(caseName,()=>{
 const x=fixture();change(x);const result=auditC3ReceiptHashPair(x);
 assert.equal(result.status,'BLOCKED');assert.equal(result.reason,expected);
 assert.equal(result.productionAuthorized,false);assert.equal(result.canonicalLearningAdmitted,false);
});
test('untrusted source fixture keeps both hashes distinct and never promotes',()=>{
 const x=fixture(),result=auditC3ReceiptHashPair(x);
 assert.equal(result.status,'SOURCE_COMPATIBLE_UNVERIFIED');
 assert.equal(result.executionReceiptHash,H);
 assert.equal(result.chainProofHash,x.record.proof.sha256);
 assert.notEqual(result.chainProofHash,result.executionReceiptHash);
 assert.equal(result.admissionKey,'req-001:out-001:'+H);
 assert.equal(result.independentVeritasVerified,false);
 assert.equal(result.canonicalReceiptAuthorityVerified,false);
 assert.equal(result.canonicalLearningAdmitted,false);
 assert.equal(result.productionAuthorized,false);
});
test('source fixture also supports verified-denial and verified-failure classification without execution PASS',()=>{
 for(const state of ['VERIFIED_FAILURE','VERIFIED_DENIAL']){
  const x=fixture();x.event.outcomeState=state;x.record.entry.learningObligation.event.outcomeState=state;
  const digest=hash(sorted(x.event));x.record.entry.learningObligation.eventDigest=digest;
  const keyHash=hash(x.record.entry.learningObligation.admissionKey);
  x.record.entry.learningObligation.receiptCommitId='rc-'+hash('c3-receipt-commit-v1:'+keyHash+':'+digest);
  x.record.entry.receiptCommitId=x.record.entry.learningObligation.receiptCommitId;
  x.readback.receiptCommitId=x.record.entry.receiptCommitId;
  x.record.proof.sha256=hash(JSON.stringify({entry:x.record.entry,previousHash:null,createdAt:x.record.createdAt}));
  x.readback.chainProofHash=x.record.proof.sha256;
  assert.equal(auditC3ReceiptHashPair(x).status,'SOURCE_COMPATIBLE_UNVERIFIED',state);
 }
});
mutate('reject chain proof tampering',x=>{x.record.proof.sha256='f'.repeat(64)},'CHAIN_RECORD_PROOF_MISMATCH');
mutate('reject swapped execution identity when proof is unchanged',x=>{x.event.receiptHash=B},'EXECUTION_RECEIPT_OBLIGATION_MISMATCH');
mutate('reject admission key using chained record proof',x=>{
 x.record.entry.learningObligation.admissionKey='req-001:out-001:'+x.record.proof.sha256;
 x.record.proof.sha256=hash(JSON.stringify({entry:x.record.entry,previousHash:null,createdAt:x.record.createdAt}));
 x.readback.chainProofHash=x.record.proof.sha256;
},'EXECUTION_RECEIPT_OBLIGATION_MISMATCH');
mutate('reject stale independent readback proof',x=>{
 x.readback.chainProofHash='f'.repeat(64);
},'CHAIN_PROOF_READBACK_NOT_BOUND');
mutate('reject source-only readback falsely promoting production',x=>{
 x.readback.productionAuthorized=true;
},'CHAIN_PROOF_READBACK_NOT_BOUND');
mutate('reject source-only readback falsely promoting learning',x=>{
 x.readback.learningLedgerAdmitted=true;
},'CHAIN_PROOF_READBACK_NOT_BOUND');
mutate('reject result identity substitution',x=>{
 x.record.entry.learningObligation.outcomeId='out-002';
 x.record.proof.sha256=hash(JSON.stringify({entry:x.record.entry,previousHash:null,createdAt:x.record.createdAt}));
 x.readback.chainProofHash=x.record.proof.sha256;
},'EXECUTION_RECEIPT_OBLIGATION_MISMATCH');
mutate('reject invented event data',x=>{x.event.privateTranscript='not transferable'},'EXECUTION_RECEIPT_EVENT_SHAPE_INVALID');
mutate('reject wrong scope',x=>{x.event.scope='USER_PRIVATE'},'EXECUTION_RECEIPT_EVENT_SHAPE_INVALID');
mutate('reject replay tuple ambiguity',x=>{x.event.requestId='req:001'},'EXECUTION_RECEIPT_EVENT_SHAPE_INVALID');
mutate('reject absent producer proof',x=>{delete x.record.proof},'CHAIN_RECORD_SHAPE_INVALID');
mutate('reject absent obligation',x=>{
 delete x.record.entry.learningObligation;
 x.record.proof.sha256=hash(JSON.stringify({entry:x.record.entry,previousHash:null,createdAt:x.record.createdAt}));
 x.readback.chainProofHash=x.record.proof.sha256;
},'ATOMIC_OBLIGATION_SHAPE_INVALID');
mutate('reject non-source readback status as a synthetic admission',x=>{
 x.readback.status='VERIFIED';
},'CHAIN_PROOF_READBACK_NOT_BOUND');
mutate('reject missing source readback',x=>{delete x.readback},'CHAIN_PROOF_READBACK_NOT_BOUND');
