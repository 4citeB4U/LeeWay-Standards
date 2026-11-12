/*
LEEWAY HEADER — DO NOT REMOVE

REGION: CORE
TAG: CORE.SCRIPTS.ENFORCE_SOVEREIGN_COLONY_CONSTITUTION.MAIN
DESCRIPTION: Deterministic runtime enforcer for LEEWAY-SOVEREIGN-COLONY-CONSTITUTION-V1
AUTHORITY: LeeWay-Standards
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render
@LAW_ZERO_BRIEF = Deterministic enforcer for LEEWAY-SOVEREIGN-COLONY-CONSTITUTION-V1

5WH:
WHAT = Validates Citizen Tablet anatomy, A.N.T. Holographic Seed, Queen-Loss Morphogenesis locks, Transfer Manifests, Foundation Freeze, and Complexity/Phoenix bounds
WHY = Prevent architectural drift, volatile-RAM governance bypasses, unsealed foundation rebuilds, and unverified LLM turns across the LeeWay ecosystem
WHO = Tier 1 Local Iron / Runtime Supervisor Gate under Leonard Jerome Lee (Creator Tier 0)
WHERE = scripts/enforce-sovereign-colony-constitution.mjs
WHEN = 2026-11-12
HOW = Fail-closed deterministic schema, Formula G(c_i) eligibility, SQLite WAL persistence, and Two-Stage Receipt verification

CHAIN: Standards → Integrated → Runtime → Projections
LICENSE: Existing file and repository license terms remain unchanged
*/

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const CONSTITUTION_PATH = resolve(__dirname, '../contracts/LEEWAY-SOVEREIGN-COLONY-CONSTITUTION.v1.json');

export function loadSovereignConstitution(pathOverride = CONSTITUTION_PATH) {
  return JSON.parse(readFileSync(pathOverride, 'utf8'));
}

export function validateTransferManifest(tm) {
  const missing = [];
  const required = ['contributor', 'skillsInvoked', 'toolsSelected', 'selectionRationale', 'heldOutPracticeTest'];
  for (const field of required) {
    if (!tm || !tm[field] || (Array.isArray(tm[field]) && tm[field].length === 0)) {
      missing.push(`FATAL_LG_MISSING_TRANSFER_FIELD_${field.toUpperCase()}`);
    }
  }
  return Object.freeze({
    valid: missing.length === 0,
    missing
  });
}

export function enforceSovereignConstitution(envelope) {
  const violations = [];

  // 1. Verify Citizen Positive Form & Durable Tablet (CONTRACT-CTZ-008)
  const citizen = envelope?.citizen;
  if (!citizen || !citizen.citizenId || !citizen.tablet?.tabletId?.startsWith('TAB-')) {
    violations.push('FATAL_CTZ_MISSING_CHASSIS_OR_TABLET');
  }
  if (citizen?.tablet?.persistence !== 'DURABLE_SQLITE_WAL') {
    violations.push('FATAL_CTZ_VOLATILE_RAM_STATE_FORBIDDEN');
  }

  // 2. Verify A.N.T. Holographic Seed & Queen-Loss Morphogenesis Law (CONTRACT-ANT-007)
  if (!envelope?.colony?.holographicSeedComplete) {
    violations.push('COLONY_SEED_INCOMPLETE_BLOCKED');
  }
  if (
    envelope?.colony?.coordinatorAlive === true &&
    envelope?.colony?.requestedRoleMutation === 'CASTE_COORDINATOR'
  ) {
    violations.push('FATAL_LAW_0_USURPATION_SIGKILL_AND_ZERO_WIPE');
  }
  if (
    envelope?.colony?.coordinatorAlive === false &&
    envelope?.colony?.requestedRoleMutation === 'CASTE_COORDINATOR' &&
    envelope?.formula?.governanceEligible !== 1
  ) {
    violations.push('FATAL_ANT_UNQUALIFIED_MORPHOGENESIS_G_CI_ZERO');
  }

  // 3. Verify Transfer Manifest for Tier 2 External Helpers (CONTRACT-LG-009)
  if (citizen?.tier === 'TIER_2_OUTSIDE_HELPER') {
    const tmResult = validateTransferManifest(envelope?.transferManifest);
    if (!tmResult.valid) {
      violations.push(...tmResult.missing);
    }
  }

  // 4. Verify Foundation Freeze & Two-Stage Receipt Order (CONTRACT-FF-010)
  if (envelope?.releaseAction === 'PROMOTE_PRODUCTION' && envelope?.veritas?.qualified !== true) {
    violations.push('FATAL_FF_UNQUALIFIED_VERITAS_PRODUCTION_BLOCKED');
  }
  if (
    envelope?.receiptPipeline?.canonicalReceiptIssued === true &&
    envelope?.receiptPipeline?.veritasQualifiedBeforeCanonical !== true
  ) {
    violations.push('FATAL_FF_TWO_STAGE_RECEIPT_ORDER_VIOLATION');
  }

  // 5. Verify Complexity Governor & Reflex Fast-Path Bounds when supplied (CONTRACT-PRV-011)
  if (envelope?.complexity?.lane === 'LANE_1_REFLEX_FAST_PATH') {
    const budget = Number(envelope?.complexity?.maxLatencyMs ?? 0);
    if (budget <= 0 || budget > 250 || envelope?.complexity?.requiresExternalLlmConsensus === true) {
      violations.push('FATAL_PRV_REFLEX_FAST_PATH_LATENCY_OR_CONSENSUS_VIOLATION');
    }
  }

  if (violations.length > 0) {
    return Object.freeze({
      admitted: false,
      action: violations.some(v => v.includes('SIGKILL')) ? 'SIGKILL_REVOKE_AND_WIPE' : 'FAIL_CLOSED_REJECT',
      violations,
      score: 0.0
    });
  }

  return Object.freeze({
    admitted: true,
    action: 'ADMIT_BOUNDED_EXECUTION',
    violations: [],
    score: 1.0
  });
}
