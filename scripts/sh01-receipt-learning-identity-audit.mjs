/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.SH01.RECEIPT.COMPATIBILITY
TAG: LEEWAY.SH01.READONLY.RECEIPT_HASH_PAIR_AUDIT_V1
5WH: WHO=SH-01 Standards source auditor; WHAT=read-only source-fixture consistency gate;
WHEN=2026-10-28; WHERE=scripts/sh01-receipt-learning-identity-audit.mjs;
WHY=prevent execution-receipt and chained-record proof identities being silently conflated;
HOW=check v1 original producer/consumer wire shape and deterministic source digest only.
AUTHORITY: AUDIT ONLY. Does NOT verify signer, production host, real Receipt Authority or canonical Learning.
LICENSE: existing Standards repository terms.
*/
import {createHash} from 'node:crypto';

const hash=x=>createHash('sha256').update(x).digest('hex');
const H=/^[a-f0-9]{64}$/;
const ID=/^[A-Za-z0-9][A-Za-z0-9._-]{2,159}$/;
const own=(o,k)=>Object.prototype.hasOwnProperty.call(o,k);
const object=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const canonical=x=>JSON.stringify(x,(_k,v)=>object(v)
 ? Object.fromEntries(Object.keys(v).sort().map(k=>[k,v[k]])):v);
const block=(reason)=>({status:'BLOCKED',reason,independentVeritasVerified:false,
 canonicalReceiptAuthorityVerified:false,canonicalLearningAdmitted:false,productionAuthorized:false});
const eventKeys=[
 'schema','requestId','outcomeId','receiptHash','formulaReceiptHash',
 'veritasPreReceiptHash','veritasPostReceiptHash','independentReadbackHash',
 'sourceRevision','capabilityId','patternCode','outcomeState','scope'
];
const obligationKeys=[
 'schema','obligationId','requestId','outcomeId','receiptHash',
 'receiptRecordId','receiptCommitId','admissionKey','eventDigest',
 'commitState','scope','origin','event'
];
const exact=(o,keys)=>object(o)&&Object.keys(o).sort().join('|')===[...keys].sort().join('|');
/**
 * Source-compatibility audit on supplied candidate JSON, NOT original receipt authentication.
 * This does not import, write, start, verify or promote the canonical Ledger.
 * Any claimed independent verification in these inputs is treated as untrusted metadata.
 */
export function auditC3ReceiptHashPair({event,record,readback}={}){
 if(!exact(event,eventKeys)||
    event.schema!=='leeway.learning.verified-technical-outcome.v1'||
    !ID.test(event.requestId||'')||!ID.test(event.outcomeId||'')||
    ![event.receiptHash,event.formulaReceiptHash,event.veritasPreReceiptHash,
      event.veritasPostReceiptHash,event.independentReadbackHash].every(x=>H.test(x||''))||
    !/^[a-f0-9]{40}$/.test(event.sourceRevision||'')||
    !['VERIFIED_SUCCESS','VERIFIED_FAILURE','VERIFIED_DENIAL'].includes(event.outcomeState)||
    event.scope!=='LEEWAY_INSTITUTIONAL_NONPERSONAL')
  return block('EXECUTION_RECEIPT_EVENT_SHAPE_INVALID');
 if(!object(record)||!object(record.entry)||!object(record.proof)||
    !H.test(record.proof.sha256||'')||!own(record,'previousHash')||
    typeof record.createdAt!=='string'||!record.createdAt||
    (record.previousHash!==null&&!H.test(record.previousHash)))
  return block('CHAIN_RECORD_SHAPE_INVALID');
 // The exact v1 writer hashes JSON.stringify({entry,previousHash,createdAt}), not
 // a canonicalized rewrite of the existing receipt record; preserve history.
 const sourceProof=hash(JSON.stringify({entry:record.entry,
   previousHash:record.previousHash,createdAt:record.createdAt}));
 if(sourceProof!==record.proof.sha256)
  return block('CHAIN_RECORD_PROOF_MISMATCH');
 const obligation=record.entry.learningObligation;
 if(!exact(obligation,obligationKeys)||!exact(obligation?.event,eventKeys)||
    obligation.schema!=='leeway.receipt.learning-obligation.v1'||
    obligation.origin!=='CANONICAL_RECEIPT_AUTHORITY'||
    obligation.commitState!=='COMMITTED'||
    record.entry.type!=='c3-governed-learning-outcome'||
    record.entry.schema!=='leeway.receipt.c3-learning-record.v1')
  return block('ATOMIC_OBLIGATION_SHAPE_INVALID');
 if(canonical(event)!==canonical(obligation.event)||
    obligation.requestId!==event.requestId||obligation.outcomeId!==event.outcomeId||
    obligation.receiptHash!==event.receiptHash||
    obligation.eventDigest!==hash(canonical(event))||
    obligation.admissionKey!==event.requestId+':'+event.outcomeId+':'+event.receiptHash||
    record.entry.requestId!==event.requestId||
    record.entry.executionReceiptHash!==event.receiptHash||
    record.entry.receiptRecordId!==obligation.receiptRecordId||
    record.entry.receiptCommitId!==obligation.receiptCommitId)
  return block('EXECUTION_RECEIPT_OBLIGATION_MISMATCH');
 // In v1 the event's receiptHash is the execution digest. The enclosing
 // record's proof.sha256 is a *different identity*; never use it as admission key.
 if(event.receiptHash===record.proof.sha256)
  return block('EXECUTION_AND_CHAIN_PROOF_IDENTITY_CONFLATED');
 if(!object(readback)||
    !['SOURCE_COMMIT_READBACK','ALREADY_COMMITTED_IDENTICAL'].includes(readback.status)||
    readback.receiptRecordId!==obligation.receiptRecordId||
    readback.receiptCommitId!==obligation.receiptCommitId||
    readback.obligationId!==obligation.obligationId||
    readback.chainProofHash!==record.proof.sha256||
    readback.productionAuthorized!==false||
    readback.learningLedgerAdmitted!==false)
  return block('CHAIN_PROOF_READBACK_NOT_BOUND');
 return {status:'SOURCE_COMPATIBLE_UNVERIFIED',reason:'HASH_IDENTITIES_DISTINCT_AND_SOURCE_CORRELATED',
   executionReceiptHash:event.receiptHash,chainProofHash:record.proof.sha256,
   admissionKey:obligation.admissionKey,eventDigest:obligation.eventDigest,
   independentVeritasVerified:false,canonicalReceiptAuthorityVerified:false,
   canonicalLearningAdmitted:false,productionAuthorized:false};
}
