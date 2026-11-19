<!--
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.UNIVERSAL_ACCESS.QUALIFICATION
TAG: LEEWAY.UNIVERSAL_ACCESS.QUALIFICATION.20261119
5WH:
WHAT = Records the source-policy qualification for free LeeWay-owned access.
WHY = Preserve the Creator-approved rule that LeeWay does not charge users to access its experience.
WHO = Creator, LeeWay Standards maintainers, product owners, Runtime owners, and application maintainers.
WHERE = Docs/governance/LEEWAY-UNIVERSAL-ACCESS-QUALIFICATION-20261119.md.
WHEN = 2026-11-19 America/Chicago.
HOW = Define a testable policy, execute focused regression tests, preserve wider governance-scan evidence, and keep external-provider eligibility distinct.
LICENSE = MIT
-->

# LeeWay universal access qualification — 2026-11-19

## Checkpoint

- `IDENTITY`: Codex local LeeWay engineering worker.
- `PROJECT`: LeeWay Standards.
- `GATE`: Source-policy qualification only.
- `CREATOR DECISION`: The LeeWay-owned user experience is free to all users.
- `POLICY ARTIFACT`: `standards/leeway-universal-access.v1.json`.
- `TEST ARTIFACT`: `tests/universal-access-policy.test.mjs`.

## Accepted source policy

LeeWay-owned tablet, floating-widget, Universal Extension, web, and native-application surfaces must not impose a LeeWay payment-required, premium-only, paid-tier, or paywall UI gate. Identity, owner consent, device grants, authorization, safety, and platform permissions remain mandatory; none of those controls are fees.

Provider plans, account eligibility, service outages, and platform restrictions are outside this policy. They must be shown truthfully as an external-provider or authorization boundary. LeeWay must neither fabricate free provider access nor bypass a provider paywall.

## Evidence

Executed in this worktree on 2026-11-19 America/Chicago:

```text
node --test tests/universal-access-policy.test.mjs
pass 3; fail 0

npm test
pass 3; fail 0
```

`npm run leeway:enforce:check` was also executed. It remains failing on the repository baseline (`invalid: 246`, `complianceScore: 74`) because hundreds of pre-existing files are outside this change. The new universal-access policy test was inspected in that scan and has no validation errors. This does not qualify the baseline as compliant.

## Acceptance boundary

This is source-level policy and regression-test evidence only. It does **not** prove that every product surface already enforces the policy, that a third-party provider is free, or that any device/runtime path is live. Product owners must integrate the policy into their manifests and UI adapters, then execute physical surface tests and independent Veritas review before production admission.

## Next executable action

Bind the policy to the Universal Extension, Agent Virtual Tablet, and Runtime error/status adapters so an unavailable external service is rendered honestly without a LeeWay payment gate.
