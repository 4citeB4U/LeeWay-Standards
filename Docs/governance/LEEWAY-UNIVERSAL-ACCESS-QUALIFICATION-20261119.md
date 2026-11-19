<!--
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.UNIVERSAL_ACCESS.QUALIFICATION
TAG: LEEWAY.UNIVERSAL_ACCESS.QUALIFICATION.20261119
5WH:
WHAT = Records the source-policy qualification for zero-mandatory-cost setup, backend access, and owner-controlled storage.
WHY = Preserve the Creator-approved rule that LeeWay configuration and backend contracts do not require a compulsory paid LeeWay service.
WHO = Creator, LeeWay Standards maintainers, product owners, Runtime owners, and application maintainers.
WHERE = Docs/governance/LEEWAY-UNIVERSAL-ACCESS-QUALIFICATION-20261119.md.
WHEN = 2026-11-19 America/Chicago.
HOW = Define a testable no-cost backend policy, preserve optional product commerce, execute focused regression tests, and keep provider eligibility distinct.
LICENSE = MIT
-->

# LeeWay universal access and backend ownership qualification — 2026-11-19

## Checkpoint

- `IDENTITY`: Codex local LeeWay engineering worker.
- `PROJECT`: LeeWay Standards.
- `GATE`: Source-policy qualification only.
- `CREATOR DECISION`: LeeWay setup, development, backend contracts, and owner-controlled storage have a zero-mandatory-cost path. Product payment gates may remain when explicitly scoped and optional to that backend path.
- `POLICY ARTIFACT`: `standards/leeway-universal-access.v1.json`.
- `TEST ARTIFACT`: `tests/universal-access-policy.test.mjs`.

## Accepted source policy

LeeWay setup, development, configuration, backend contracts, and the user-owned storage path must not require a compulsory paid LeeWay service. The tablet, floating widgets, Universal Extension, web, and native applications must expose a self-hosted, local-first, bring-your-own-storage, or owner-selected-provider route where the applicable adapter supports it. Identity, owner consent, device grants, authorization, safety, and platform permissions remain mandatory; none of those controls are fees.

LeeWay may retain separately defined product, subscription, marketplace, or managed-service payment gates. A paid offering must say what is being purchased and must not pretend the core backend, configuration, or the user's data storage is paid-only when an owner-controlled alternative exists.

Provider plans, account eligibility, service outages, and platform restrictions are outside this policy. They must be shown truthfully as an external-provider or authorization boundary. LeeWay must neither fabricate free provider access nor bypass a provider paywall. User data remains under the user's controlled local storage, chosen cloud storage, or self-hosted service—not mandatory LeeWay storage.

## Evidence

Executed in this worktree on 2026-11-19 America/Chicago:

```text
node --test tests/universal-access-policy.test.mjs
pass 4; fail 0

npm test
pass 3; fail 0
```

`npm run leeway:enforce:check` was also executed. It remains failing on the repository baseline (`invalid: 246`, `complianceScore: 74`) because hundreds of pre-existing files are outside this change. The new universal-access policy test was inspected in that scan and has no validation errors. This does not qualify the baseline as compliant.

## Acceptance boundary

This is source-level policy and regression-test evidence only. It does **not** prove that every product surface already exposes a self-hosted route, that a third-party provider is free, or that any device/runtime path is live. Product owners must integrate the policy into their manifests and UI adapters, then execute physical surface tests and independent Veritas review before production admission.

## Next executable action

Bind the policy to the Universal Extension, Agent Virtual Tablet, and Runtime adapters so developers can configure without a LeeWay payment requirement, select their own storage, and see optional product charges disclosed separately.
