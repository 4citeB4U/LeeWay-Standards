/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.UNIVERSAL_ACCESS.TEST
TAG: LEEWAY.UNIVERSAL_ACCESS.POLICY.TEST.V1
5WH:
WHAT = Validate free setup, active-service charging, ownership disclosure, and zero-mandatory operator cost.
WHY = Prevent billing for setup or non-use while preserving defined LeeWay service charges and owner-controlled backend paths.
WHO = LeeWay Standards maintainers.
WHERE = tests/universal-access-policy.test.mjs.
WHEN = 2026-11-19.
HOW = Read the canonical policy and assert lifecycle charges, ownership disclosure, no-cost backend paths, and truthful fallback semantics.
AUTHORITY: SOURCE_POLICY_TEST_ONLY; not live product, provider, Veritas, receipt, or production verification.
LICENSE: MIT
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const policy = JSON.parse(fs.readFileSync(new URL('../standards/leeway-universal-access.v1.json', import.meta.url), 'utf8'));

test('developer setup and backend contracts have a no-cost path without converting consent into a fee', () => {
  assert.equal(policy.contractId, 'LEEWAY-UNIVERSAL-ACCESS-V1');
  assert.equal(policy.developerAndOwnerAccess.setupAndConfiguration, 'FREE_WITHOUT_MANDATORY_LEEWAY_BACKEND_PAYMENT');
  assert.equal(policy.developerAndOwnerAccess.identityAndConsent, 'REQUIRED_BUT_NOT_A_FEE_GATE');
  for (const path of ['self_hosted_runtime', 'bring_your_own_storage', 'bring_your_own_provider_credentials', 'local_first_or_owner_selected_hosting']) {
    assert.ok(policy.developerAndOwnerAccess.requiredNoCostPaths.includes(path));
  }
  for (const gate of ['PAY_TO_CONFIGURE_LEEWAY', 'PAY_TO_ACCESS_DEVELOPER_BACKEND_CONTRACTS', 'MANDATORY_LEEWAY_MANAGED_STORAGE_FEE', 'MANDATORY_LEEWAY_HOSTED_RUNTIME_FEE']) {
    assert.ok(policy.developerAndOwnerAccess.prohibitedMandatoryBackendGates.includes(gate));
  }
});

test('all user-facing LeeWay surfaces carry the same developer and owner access policy', () => {
  for (const surface of ['agent_virtual_tablet', 'floating_widgets', 'universal_extension', 'web_experiences', 'native_applications']) {
    assert.ok(policy.developerAndOwnerAccess.requiredSurfaces.includes(surface));
  }
});

test('only active LeeWay services may be charged and inactive use has no recurring LeeWay charge', () => {
  assert.equal(policy.customerCommercialLifecycle.setup, 'FREE_NO_LEEWAY_CHARGE');
  assert.equal(policy.customerCommercialLifecycle.activeService, 'EXPLICIT_PAYMENT_GATE_PERMITTED_FOR_DEFINED_LEEWAY_SERVICE');
  assert.equal(policy.customerCommercialLifecycle.inactiveOrNotUsingService, 'NO_RECURRING_LEEWAY_SERVICE_CHARGE');
  assert.ok(policy.customerCommercialLifecycle.requirements.some((rule) => rule.includes('stops using a billed LeeWay service')));
});

test('user storage stays owner controlled and ownership is disclosed per asset or service', () => {
  for (const choice of ['owner_local_storage', 'owner_selected_cloud_storage', 'owner_selected_self_hosted_service']) {
    assert.ok(policy.storageAndHostingOwnership.requiredChoices.includes(choice));
  }
  assert.ok(policy.storageAndHostingOwnership.prohibitedDesigns.includes('LEEWAY_OWNED_STORAGE_AS_ONLY_PATH'));
  assert.ok(policy.ownershipDisclosure.minimumDisclosure.includes('customer_owned_data_and_exports'));
  assert.ok(policy.ownershipDisclosure.prohibitedClaims.includes('UNDECLARED_POST_SERVICE_LOCKOUT'));
});

test('commercial gates stay scoped and the Creator retains a zero-mandatory-cost operating path', () => {
  assert.ok(policy.commerceBoundary.permittedOptionalGates.includes('OPTIONAL_MANAGED_SERVICE'));
  assert.match(policy.commerceBoundary.requiredDisclosure, /self-hosted or owner-selected alternative/i);
  for (const path of ['local_first_execution', 'self_hosted_runtime', 'self_hosted_storage']) {
    assert.ok(policy.operatorCostBoundary.requiredPaths.includes(path));
  }
  assert.ok(policy.operatorCostBoundary.prohibitedDesigns.includes('MANDATORY_PAID_CLOUD_RUNTIME_FOR_CORE_LEEWAY'));
});

test('external provider eligibility is truthful and never becomes a compulsory LeeWay backend fee', () => {
  assert.equal(policy.externalProviderBoundary.requiredAvailabilityState, 'EXTERNAL_PROVIDER_UNAVAILABLE_OR_REQUIRES_PROVIDER_ELIGIBILITY');
  assert.ok(policy.externalProviderBoundary.prohibitedResponses.includes('PAYWALL_BYPASS'));
  assert.equal(policy.runtimeAndDeviceBoundary.noPrivilegeFromPayment, true);
  assert.equal(policy.runtimeAndDeviceBoundary.noFeeFromAuthorizationDenial, true);
});
