/*
LEEWAY HEADER — DO NOT REMOVE

REGION: CORE
TAG: CORE.TESTS.SOVEREIGN_COLONY_CONSTITUTION.MAIN
DESCRIPTION: Conformance tests for LEEWAY-SOVEREIGN-COLONY-CONSTITUTION-V1
AUTHORITY: LeeWay-Standards
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render

5WH:
WHAT = Verify canonical constitutional JSON schema and fail-closed runtime enforcer behavior
WHY = Prove Citizen Tablet durability, A.N.T. usurpation SIGKILL, G(c_i)==1 morphogenesis, Tier 2 Transfer Manifest, Two-Stage Receipt, and Reflex Fast-Path constraints
WHO = LeeWay-Standards governance suite
WHERE = tests/sovereign-colony-constitution.test.mjs
WHEN = 2026-11-12
HOW = Node deterministic assertions against valid and adversarial constitutional envelopes

CHAIN: Standards → Integrated → Runtime → Projections
LICENSE: Existing file and repository license terms remain unchanged
*/

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  enforceSovereignConstitution,
  loadSovereignConstitution
} from '../scripts/enforce-sovereign-colony-constitution.mjs';

const validBaseEnvelope = () => ({
  citizen: {
    citizenId: 'CTZ-PRIMARY-01',
    tier: 'TIER_2_OUTSIDE_HELPER',
    tablet: {
      tabletId: 'TAB-CTZ-PRIMARY-01',
      persistence: 'DURABLE_SQLITE_WAL'
    }
  },
  colony: {
    holographicSeedComplete: true,
    coordinatorAlive: true,
    requestedRoleMutation: 'CASTE_BUILDER'
  },
  formula: {
    governanceEligible: 1
  },
  transferManifest: {
    contributor: 'F3_GEMINI',
    skillsInvoked: ['constitutional-contract-synthesis'],
    toolsSelected: ['schema-specification'],
    selectionRationale: 'Consolidate all sovereign laws into one canonical validator.',
    heldOutPracticeTest: 'Reject illegal coordinator usurpation with SIGKILL_REVOKE_AND_WIPE.'
  },
  veritas: {
    qualified: false
  }
});

test('constitutional specification carries EFFECTIVE_CONSTITUTIONAL_LAW and all six contracts', () => {
  const constitution = loadSovereignConstitution();
  assert.equal(constitution.contractId, 'LEEWAY-SOVEREIGN-COLONY-CONSTITUTION-V1');
  assert.equal(constitution.status, 'EFFECTIVE_CONSTITUTIONAL_LAW');
  assert.equal(constitution.sovereignAuthority.tier0Creator, 'Leonard Jerome Lee');
  assert.equal(constitution.part1_CitizenExistenceAndPositiveForm.contractRef, 'CONTRACT-CTZ-008');
  assert.equal(constitution.part2_AutonomousNeuralTopologyColony.contractRef, 'CONTRACT-ANT-007');
  assert.equal(constitution.part3_SixOrganSovereignIntegration.contractRef, 'CONTRACT-OR-006');
  assert.equal(constitution.part4_ResearchToMasteryLearningLaw.contractRef, 'CONTRACT-LG-009');
  assert.equal(constitution.part5_FoundationFreezeAndAntiRebuildLaw.contractRef, 'CONTRACT-FF-010');
  assert.equal(constitution.part6_ComplexityGovernorAndPhoenixRecovery.contractRef, 'CONTRACT-PRV-011');
});

test('valid bounded constitutional envelope is admitted with score 1.0', () => {
  const result = enforceSovereignConstitution(validBaseEnvelope());
  assert.equal(result.admitted, true);
  assert.equal(result.action, 'ADMIT_BOUNDED_EXECUTION');
  assert.deepEqual(result.violations, []);
  assert.equal(result.score, 1.0);
});

test('held-out usurpation test triggers SIGKILL_REVOKE_AND_WIPE when coordinatorAlive is true', () => {
  const env = validBaseEnvelope();
  env.colony.requestedRoleMutation = 'CASTE_COORDINATOR';
  const result = enforceSovereignConstitution(env);
  assert.equal(result.admitted, false);
  assert.equal(result.action, 'SIGKILL_REVOKE_AND_WIPE');
  assert.equal(result.score, 0.0);
  assert.ok(result.violations.includes('FATAL_LAW_0_USURPATION_SIGKILL_AND_ZERO_WIPE'));
});

test('volatile RAM Citizen Tablet, incomplete seed, unqualified G(c_i)==0 promotion, and missing Transfer Manifest fail closed', () => {
  const env = {
    citizen: {
      citizenId: 'CTZ-BAD',
      tier: 'TIER_2_OUTSIDE_HELPER',
      tablet: { tabletId: 'BAD-ID', persistence: 'VOLATILE_RAM' }
    },
    colony: {
      holographicSeedComplete: false,
      coordinatorAlive: false,
      requestedRoleMutation: 'CASTE_COORDINATOR'
    },
    formula: { governanceEligible: 0 },
    transferManifest: {},
    releaseAction: 'PROMOTE_PRODUCTION',
    veritas: { qualified: false },
    receiptPipeline: { canonicalReceiptIssued: true, veritasQualifiedBeforeCanonical: false }
  };
  const result = enforceSovereignConstitution(env);
  assert.equal(result.admitted, false);
  assert.equal(result.score, 0.0);
  assert.ok(result.violations.includes('FATAL_CTZ_MISSING_CHASSIS_OR_TABLET'));
  assert.ok(result.violations.includes('FATAL_CTZ_VOLATILE_RAM_STATE_FORBIDDEN'));
  assert.ok(result.violations.includes('COLONY_SEED_INCOMPLETE_BLOCKED'));
  assert.ok(result.violations.includes('FATAL_ANT_UNQUALIFIED_MORPHOGENESIS_G_CI_ZERO'));
  assert.ok(result.violations.includes('FATAL_LG_MISSING_TRANSFER_FIELD_HELDOutPracticeTest'.toUpperCase()) || result.violations.includes('FATAL_LG_MISSING_TRANSFER_FIELD_HELDOUTPRACTICETEST'));
  assert.ok(result.violations.includes('FATAL_FF_UNQUALIFIED_VERITAS_PRODUCTION_BLOCKED'));
  assert.ok(result.violations.includes('FATAL_FF_TWO_STAGE_RECEIPT_ORDER_VIOLATION'));
});

test('queen-loss morphogenesis succeeds only when coordinatorAlive is false and Formula G(c_i) === 1', () => {
  const env = validBaseEnvelope();
  env.colony.coordinatorAlive = false;
  env.colony.requestedRoleMutation = 'CASTE_COORDINATOR';
  env.formula.governanceEligible = 1;
  const admitted = enforceSovereignConstitution(env);
  assert.equal(admitted.admitted, true);
  assert.equal(admitted.score, 1.0);
});

test('reflex fast path rejects latency cap > 250ms or external LLM consensus requirement', () => {
  const env = validBaseEnvelope();
  env.complexity = {
    lane: 'LANE_1_REFLEX_FAST_PATH',
    maxLatencyMs: 600,
    requiresExternalLlmConsensus: true
  };
  const rejected = enforceSovereignConstitution(env);
  assert.equal(rejected.admitted, false);
  assert.ok(rejected.violations.includes('FATAL_PRV_REFLEX_FAST_PATH_LATENCY_OR_CONSENSUS_VIOLATION'));
});
