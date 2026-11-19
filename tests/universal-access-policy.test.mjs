/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.UNIVERSAL_ACCESS.TEST
TAG: LEEWAY.UNIVERSAL_ACCESS.POLICY.TEST.V1
5WH:
WHAT = Validate the free-to-all LeeWay access contract and its external-provider boundary.
WHY = Prevent LeeWay clients from introducing a paywall or conflating provider eligibility with LeeWay pricing.
WHO = LeeWay Standards maintainers.
WHERE = tests/universal-access-policy.test.mjs.
WHEN = 2026-11-19.
HOW = Read the canonical policy and assert required prohibitions, surfaces, and truthful fallback semantics.
AUTHORITY: SOURCE_POLICY_TEST_ONLY; not live product, provider, Veritas, receipt, or production verification.
LICENSE: MIT
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const policy = JSON.parse(fs.readFileSync(new URL('../standards/leeway-universal-access.v1.json', import.meta.url), 'utf8'));

test('LeeWay-owned experience is free for all users without converting consent into a fee', () => {
  assert.equal(policy.contractId, 'LEEWAY-UNIVERSAL-ACCESS-V1');
  assert.equal(policy.userExperience.leeWayOwnedAccess, 'FREE_TO_ALL_USERS');
  assert.equal(policy.userExperience.identityAndConsent, 'REQUIRED_BUT_NOT_A_FEE_GATE');
  for (const gate of ['LEEWAY_PAYMENT_REQUIRED', 'LEEWAY_PREMIUM_ONLY_CAPABILITY', 'LEEWAY_PAYWALL_UI', 'LEEWAY_PAID_TIER_REQUIRED']) {
    assert.ok(policy.userExperience.prohibitedLeeWayGates.includes(gate));
  }
});

test('all user-facing LeeWay surfaces carry the same access policy', () => {
  for (const surface of ['agent_virtual_tablet', 'floating_widgets', 'universal_extension', 'web_experiences', 'native_applications']) {
    assert.ok(policy.userExperience.requiredSurfaces.includes(surface));
  }
});

test('external provider eligibility is truthful and never becomes a LeeWay paywall bypass', () => {
  assert.equal(policy.externalProviderBoundary.requiredAvailabilityState, 'EXTERNAL_PROVIDER_UNAVAILABLE_OR_REQUIRES_PROVIDER_ELIGIBILITY');
  assert.ok(policy.externalProviderBoundary.prohibitedResponses.includes('PAYWALL_BYPASS'));
  assert.equal(policy.runtimeAndDeviceBoundary.noPrivilegeFromPayment, true);
  assert.equal(policy.runtimeAndDeviceBoundary.noFeeFromAuthorizationDenial, true);
});
