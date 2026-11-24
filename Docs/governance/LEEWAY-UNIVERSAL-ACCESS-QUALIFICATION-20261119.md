<!--
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.UNIVERSAL_ACCESS.QUALIFICATION
TAG: LEEWAY.UNIVERSAL_ACCESS.QUALIFICATION.20261119
5WH:
WHAT = Records the source-policy qualification for free setup, active-service billing, disclosed ownership, and zero-mandatory operator cost.
WHY = Preserve the Creator-approved rule that billing is tied to active LeeWay services rather than setup, non-use, or a compulsory paid backend.
WHO = Creator, LeeWay Standards maintainers, product owners, Runtime owners, and application maintainers.
WHERE = Docs/governance/LEEWAY-UNIVERSAL-ACCESS-QUALIFICATION-20261119.md.
WHEN = 2026-11-19 America/Chicago.
HOW = Define a testable customer billing lifecycle and self-hosted operator path, execute focused regression tests, and keep provider costs distinct.
LICENSE = MIT
-->

# LeeWay free setup, active service, and backend ownership qualification — 2026-11-19

## Checkpoint

- `IDENTITY`: Codex local LeeWay engineering worker.
- `PROJECT`: LeeWay Standards.
- `GATE`: Source-policy qualification only.
- `CREATOR DECISION`: Setup is free. LeeWay may charge for a named active LeeWay service. A person not using that service must not continue receiving LeeWay recurring service charges. LeeWay's core operation retains a zero-mandatory-provider-cost path.
- `POLICY ARTIFACT`: `standards/leeway-universal-access.v1.json`.
- `TEST ARTIFACT`: `tests/universal-access-policy.test.mjs`.

## Accepted source policy

LeeWay setup, development, configuration, backend contracts, and the user-owned storage path must not require a compulsory paid LeeWay service. A charge may appear only for a clearly named active LeeWay service, not for account creation, initial configuration, exported configuration, or access to the independently available backend contract. When use of a billed service stops, its LeeWay recurring service charge must stop under the service terms.

The tablet, floating widgets, Universal Extension, web, and native applications must expose a self-hosted, local-first, bring-your-own-storage, or owner-selected-provider route where the applicable adapter supports it. Identity, owner consent, device grants, authorization, safety, and platform permissions remain mandatory; none of those controls are fees.

Ownership is not a blanket claim: customer data, exports, selected storage, licensing/subscription rights, and post-service access must be disclosed per asset or service. LeeWay may retain separately defined product, subscription, marketplace, or managed-service payment gates, but they must say what is purchased and must not pretend the core backend or user storage is paid-only when an owner-controlled alternative exists.

The Creator's core LeeWay operation must retain a local-first, self-hosted, and self-hosted-storage path so a paid cloud runtime or paid storage provider is never mandatory. Hardware, electricity, internet, domains, and consciously chosen third-party providers can still carry external cost; the system must disclose those costs instead of hiding them or claiming the physical world is free. User data remains under the user's controlled local storage, chosen cloud storage, or self-hosted service—not mandatory LeeWay storage.

## Evidence

Executed in this worktree on 2026-11-19 America/Chicago:

```text
node --test tests/universal-access-policy.test.mjs
pass 6; fail 0

npm test
pass 3; fail 0
```

`npm run leeway:enforce:check` was also executed. It remains failing on the repository baseline (`invalid: 246`, `complianceScore: 74`) because hundreds of pre-existing files are outside this change. The new universal-access policy test was inspected in that scan and has no validation errors. This does not qualify the baseline as compliant.

## Acceptance boundary

This is source-level policy and regression-test evidence only. It does **not** prove that every product surface already exposes a self-hosted route, that recurring charges stop in a live billing system, that a third-party provider is free, or that any device/runtime path is live. Product owners must integrate the policy into their manifests, billing adapters, and UI adapters, then execute physical surface tests and independent Veritas review before production admission.

## Next executable action

Bind the policy to the Universal Extension, Agent Virtual Tablet, Runtime, and billing adapters so free setup, active-service charges, no-use billing cessation, ownership disclosure, and owner-selected storage are enforced end to end.
