# SH-01 — Revision-pinned source, authority and production gap evidence

<!-- LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.SH01.SOURCE_AUDIT
TAG: LEEWAY.SH01.20_MAIN_PINS_AND_BLOCKER_EVIDENCE_V1
WHO: Existing Standards SH-01 audit in PR #61.
WHAT: Precise repository source pins, entrypoint samples, CI observations and production denial gates.
WHEN: 2026-10-28.
WHERE: standards/SH01_REPOSITORY_REVISION_EVIDENCE.md.
WHY: Distinguish repository/source tests from real autonomous sovereign hosting.
HOW: GitHub repository+branch+contents+workflow/package reads, read-only snapshot and negative CI.
AUTHORITY: AUDIT ONLY. No keys, registry mutation, receipt, signer, deployment or approval.
-->

**Parent SH-01:** [LeeWay Standards draft PR #61](https://github.com/4citeB4U/LeeWay-Standards/pull/61), [canonical source checkpoint](SH01_SOVEREIGN_AUDIT.md). **Original four-authority C3 mission:** [Runtime Fabric #21](https://github.com/4citeB4U/Leeway-Runtime-Fabric/issues/21).

**Method and scope.** These source revisions were obtained from GitHub's **current `main` branch endpoint** for each of 20 accessible repositories, with root file inventory and workflow-directory inspection. Representative Node package commands were read where `package.json` exists. The entrypoint column is an **inspected example**, not an assertion of complete startup wiring. Branches and head SHAs may change after this checkpoint; re-query before any deployment. No protected host, service, Docker runtime, device, encrypted ledger, or private signing key was accessed.

**Structured, testable record:** [`sh01-main-revision-snapshot.v1.json`](sh01-main-revision-snapshot.v1.json). The source-only verifier validates 20 unique repository identities/source pins, owner-role uniqueness, noncyclic graph, five separately owned/logical workstreams, live-source red evidence preservation and no fake PASS. It does not query GitHub at run-time, so green CI validates **internal consistency of the pinned snapshot, not freshness or live infrastructure**.

## Mainline source pins — 20 verified repositories

| Workstream | Actual GitHub repo at verified commit | Revision | Inspected entrypoint example | Example source workflow | Binding status |
| --- | --- | --- | --- | --- | --- |
| standards | [4citeB4U/LeeWay-Standards](https://github.com/4citeB4U/LeeWay-Standards/tree/8df16fa0221e073be2530a28033b2601eb67dd35) | `8df16fa0221e` | `src/cli/leeway.js` | `enforce-leeway-standards.yml` | PARTIALLY_BUILT |
| formula | [4citeB4U/Leeway-formula-live](https://github.com/4citeB4U/Leeway-formula-live/tree/c1033eb7bedb88661f21b7eec6016a6404ce2153) | `c1033eb7bedb` | NOT INSPECTED | `portability.yml` | PARTIALLY_BUILT |
| runtime | [4citeB4U/Leeway-Runtime-Fabric](https://github.com/4citeB4U/Leeway-Runtime-Fabric/tree/2f765288f6c150a2273f873670a2ed876a130864) | `2f765288f6c1` | `server/index.cjs` | `persistent-workplane-proof.yml` | PARTIALLY_BUILT |
| veritas | [4citeB4U/LEEWAY-VERITAS](https://github.com/4citeB4U/LEEWAY-VERITAS/tree/64ab653a649408a014529fbbecbbf3cf30808579) | `64ab653a6494` | `bin/start-review-service.mjs` | `veritas-source-proof.yml` | MISSING_GLUE |
| receipt | [4citeB4U/Receipt-Authority](https://github.com/4citeB4U/Receipt-Authority/tree/439618b2960539513619a673ad236bb461e8a6fa) | `439618b29605` | NOT INSPECTED | NOT FOUND ON MAIN | MISSING_GLUE |
| learning | [4citeB4U/LeeWay-Learning-Ledger](https://github.com/4citeB4U/LeeWay-Learning-Ledger/tree/7c68a824b326b26a1d386edfba11d352863531a0) | `7c68a824b326` | NOT INSPECTED | NOT FOUND ON MAIN | MISSING_GLUE |
| continuum | [4citeB4U/LeeWay-Continuum](https://github.com/4citeB4U/LeeWay-Continuum/tree/a8107cd61377079ac2c2fc9f99aa2061824bda21) | `a8107cd61377` | `src/integration/canonical-host-binding.mjs` | `continuum-tests.yml` | PARTIALLY_BUILT |
| vram | [4citeB4U/LeeWay-VRAM-Database](https://github.com/4citeB4U/LeeWay-VRAM-Database/tree/e77cb786bdbb07d84f72957ae9de70eae5112e8c) | `e77cb786bdbb` | `src/checkpoint-database.mjs` | `ci.yml` | PARTIALLY_BUILT |
| gpu | [4citeB4U/LeeWay-Edge-GPU](https://github.com/4citeB4U/LeeWay-Edge-GPU/tree/d7347eddeb1db3423f322fdc599c82e5f26eae5f) | `d7347eddeb1d` | `app.js` | `portable-gpu-contracts.yml` | PARTIALLY_BUILT |
| model | [4citeB4U/LeeWay-Model-Hub](https://github.com/4citeB4U/LeeWay-Model-Hub/tree/c6d367155f01f769c44256e13b5f7913b5cc1214) | `c6d367155f01` | `src/server.mjs` | `ci.yml` | PARTIALLY_BUILT |
| agent | [4citeB4U/Agent-Lee-The-Sum-of-All-Systems](https://github.com/4citeB4U/Agent-Lee-The-Sum-of-All-Systems/tree/93731899ccaa3e317768d38555af4ac3710a8de8) | `93731899ccaa` | `src/cli/leeway.js` | NOT FOUND ON MAIN | UNVERIFIED |
| skills | [4citeB4U/LeeWay-Agent-Skills](https://github.com/4citeB4U/LeeWay-Agent-Skills/tree/26bb0e7df29d95008b20f23497d469c0e0ca6eab) | `26bb0e7df29d` | `mcp-server/dist/index.js` | `verify-skill-fabric.yml` | PARTIALLY_BUILT |
| device | [4citeB4U/LEEWAY-DEVICE-BRIDGE](https://github.com/4citeB4U/LEEWAY-DEVICE-BRIDGE/tree/506fa7329c4570503783300e09a874f47c34746b) | `506fa7329c45` | `operator/device-bridge-cli.mjs` | `protocol-mcp.yml` | PARTIALLY_BUILT |
| federate | [4citeB4U/Leeway-Federate-Web](https://github.com/4citeB4U/Leeway-Federate-Web/tree/0bc64d62e2056f22450cfb79a68e62fb8b62f308) | `0bc64d62e205` | `index.html` | `peer-proof.yml` | PARTIALLY_BUILT |
| live | [4citeB4U/Leeway-live](https://github.com/4citeB4U/Leeway-live/tree/fd0b310601dc2c82130ddd7b2150c27d8432748a) | `fd0b310601dc` | `index.html` | `live-runtime-gate.yml` | PARTIALLY_BUILT |
| rtc | [4citeB4U/LeeWay-Edge-RTC](https://github.com/4citeB4U/LeeWay-Edge-RTC/tree/ba28fb8e3c636f8edddec88bdd4fa7d2a6b45840) | `ba28fb8e3c63` | `src/voice/realtime-conversation.ts` | `pull-request-checks.yml` | PARTIALLY_BUILT |
| voice | [4citeB4U/LeeWay-Voice-Fabric](https://github.com/4citeB4U/LeeWay-Voice-Fabric/tree/76dff6a1ff3482c0c17b60c4d294945224e3d8a1) | `76dff6a1ff34` | `src/bridge-runtime.js` | `live-browser-gate.yml` | PARTIALLY_BUILT |
| vision | [4citeB4U/Leeway-Agent-Lee-Vision](https://github.com/4citeB4U/Leeway-Agent-Lee-Vision/tree/4751ea36a531d970fe2d7aba796b23c30b57a5d2) | `4751ea36a531` | `index.html` | `vision-floating-ui.yml` | UNVERIFIED |
| workforce | [4citeB4U/LeeWay-Digital-Workforce](https://github.com/4citeB4U/LeeWay-Digital-Workforce/tree/83bfcd976655a41e4422dda7abf27b730c5bfe4d) | `83bfcd976655` | `src` | `factory-ci.yml` | PARTIALLY_BUILT |
| pocket | [4citeB4U/LeeWay-Pocket-Agent](https://github.com/4citeB4U/LeeWay-Pocket-Agent/tree/d5753fc1c13c3481263ca88d89ca9c0420fcbdb5) | `d5753fc1c13c` | `app` | `android-apk.yml` | PARTIALLY_BUILT |

**Observation on mainline promotion:** The `4citeB4U/LeeWay-Learning-Ledger` and `4citeB4U/Receipt-Authority` main branches contain only a README in the inspected root. Their substantial code exists in **separate DRAFT PRs**. Do not silently treat review branches as deployed canonical services, or create a second writer in Runtime Fabric. Both require reviewed promotions, original host/source binding and independent runtime evidence.

## Authority graph and dependency boundaries

```text
LeeWay Standards (policy issuer, source of approved rules)
  ├── Golden Formula (single mathematical authority)
  ├── Independent Veritas (separate review signer / qualified trust roots)
  └── Runtime Fabric (single execution dispatcher, supervisor and Sovereign Host)
         ├── original Receipt Authority (only canonical immutable receipt writer)
         │      └── Learning Ledger (only qualified experience writer)
         ├── Continuum (durable canonical storage / reconstruction)
         │      └── VRAM checkpoint data (NOT another live allocator)
         ├── original LDWMD allocator → physical GPU and Model Hub
         └── Agent Lee / Skills / Device Bridge / Live / RTC / Voice / Vision
External federation: existing Federate Web adapter → optional BPv7 transport
No independent authorizing role for UI, orbital candidates or source fixtures.
```

The machine-readable dependency graph describes **acceptance dependencies**, not a forced execution scheduler. Parallel source work is allowed. Runtime Fabric continues to own the original allocator and Sovereign Host; the standalone VRAM candidate is a checkpoint/metadata provider, not a duplicate allocator. Agent Lee remains one logical identity rather than a new model per device. Physical-device-specific Digital Brain storage may remain local; portable services cannot assume one developer's `C:` or `E:` as a global prerequisite.

**Nonconflation:** Veritas signs independent PRE/POST or denial but cannot write canonical receipts; Receipt Authority commits original immutable evidence/atomic Learning obligations but cannot self-issue Veritas; Learning Ledger admits qualified lessons but cannot confer production execution; Production Fabric dispatches and proves real effects but cannot self-sign an independent verifier.

## CI evidence actually inspected (not executed by this audit)

- **SOURCE_CI_SUCCESS:** [4citeB4U/LeeWay-VRAM-Database at e77cb786bdbb](https://github.com/4citeB4U/LeeWay-VRAM-Database/actions/runs/40386259724).
- **SOURCE_CI_SUCCESS:** [4citeB4U/LeeWay-Continuum at a8107cd61377](https://github.com/4citeB4U/LeeWay-Continuum/actions/runs/40647915213).
- **SOURCE_CI_SUCCESS_DRAFT:** [4citeB4U/LeeWay-Standards at 49b990d8b22b](https://github.com/4citeB4U/LeeWay-Standards/actions/runs/40791719245).
- **SOURCE_CI_FAILURE_DRAFT:** [4citeB4U/LeeWay-Standards at 49b990d8b22b](https://github.com/4citeB4U/LeeWay-Standards/actions/runs/40791718793).
- **HOST_INDEPENDENCE_GATE_FAIL_10_DRAFT:** [4citeB4U/Leeway-Runtime-Fabric at 684bbb86d6e0](https://github.com/4citeB4U/Leeway-Runtime-Fabric/actions/runs/40791702215) — seven fixed-localhost-service references; two developer-drive-path defaults; one missing independent Veritas B8 admission source on the tested branch.
- **RECEIPT_OWNER_SOURCE_CI_SUCCESS_DRAFT_NOT_LIVE:** [4citeB4U/Leeway-Runtime-Fabric at 85477c5df378](https://github.com/4citeB4U/Leeway-Runtime-Fabric/actions/runs/40631528803).
- **LEARNING_SOURCE_CI_SUCCESS_DRAFT_NOT_LIVE:** [4citeB4U/LeeWay-Learning-Ledger at 3b50a9b41a99](https://github.com/4citeB4U/LeeWay-Learning-Ledger/actions/runs/40630987933).

**Most concrete host-independence blocker:** [Runtime review workflow #40791702215](https://github.com/4citeB4U/Leeway-Runtime-Fabric/actions/runs/40791702215) reported `C3_HOST_INDEPENDENCE_SOURCE_GATE_FAIL 10`: seven fixed-localhost service references, two default developer-drive paths in legacy `automation-runtime/learning-ledger-provider.mjs`, and missing `c3-independent-b8-veritas-admission.mjs` on **that exact review branch**. This is a source-review failure, not evidence that a live host is currently offline. Do not replace localhost with a public URL or bypass Veritas just to obtain a green CI run; solve authenticated local discovery, portable configuration and original signed provider enrollment.

[Standards SH-01 source branch #61](https://github.com/4citeB4U/LeeWay-Standards/pull/61) has a successful `layer-governance` run and a failing `LeeWay Incoming Source Watch` run at the same branch head. Those require separate diagnosis; one passing workflow does not erase the failed one.

## Work packages from the Creator's October 28 plan

| ID | Canonical owner | Independent source acceptance work | Live acceptance gate |
| --- | --- | --- | --- |
| SH-01 | Standards (this PR, stacked on #61) | Pinned inventory, unique owner and graph, all source tests | No — source audit only |
| SH-02 | Runtime Fabric | Portable service registry, source-pinned bootstrap, offline policies | Autonomous boot/restart without GitHub |
| VT-01 | Independent Veritas | Key-role contracts, revocation, PRE/POST signature/readback | Authenticated separate custodian on original host |
| RC-01 | Original Receipt Authority | One atomic receipt + learning obligation, chain history and ACK relay | Real durable append/readback/restart |
| LL-01 | Learning Ledger | Qualified idempotent original writer/consent/University readback | Real receipt-bound unique effect after restart |
| CT-01 | Continuum | Owner-scoped storage, byte-exact Formula transforms | Durable offline verified restore |
| VR-01 | Original Runtime LDWMD + VRAM candidate | Allocator/lease/checkpoint boundary | Real resource, release and restore |
| GP-01 | LeeWay GPU | Native GPU numerics and separate LLM-inference provider | Physical execution and independent receipts |
| MH-01 | Model Hub | Portable manifests and licensed model/provider identity | Qualified local inference and recovery |
| AL-01 | Agent Lee + Machine Consciousness | One persona, full reasoning-to-observation and context continuity | Real multi-turn execution and interruption resume |
| SK-01 | Agent Skills/MCP | Authenticated live read/write/action provider tests | True MCP execution under Runtime permissions |
| DB-01 | Device Bridge | Registered device/native capability and repairable sessions | Actual phone and workstation governed actions |
| FW-01 | Federate Web | Peer identity, advertised capability and revocation contracts | Two independent real peers exchange an authorized task |
| LV-01 | LeeWay Live | Genuine model/session link | Real message-to-model-to-retained-answer |
| RTC-01 | RTC + Voice Fabric | Session, echo cancellation, TTS, barge-in, restart | Measured live full-duplex conversation |
| DTN-01 | Federate Web external BPv7 | External adapter, BPSec identity, durable custody | Authenticated delivery over partition/restart |
| SH-03 | Runtime Fabric Sovereign Host | Release pins, offline policy, service health/dependency graph | Full cold boot, real Agent Lee request and verified state recovery |
| FED-01 | Federate Web + Sovereign Host | Qualified nodes and failover boundaries | Real multi-node continuity/revocation |

## Engineering loop, evidence and rollback

1. **Investigate:** Read attached SH-01 plan, existing Standards PR #61 and original authority registry, then GitHub 20 repository metadata/branch/main root and workflows.
2. **Diagnose:** Main-only README for Receipt and Learning, authority-registry coverage mismatch, host-independence red CI, open independent Veritas and canonical Writer/ACK, ambiguous source-vs-production claims.
3. **Plan:** Maintain **one** SH-01 parent, stack evidence additions rather than replace its authority registry or C3 mission; reject fake production PASS.
4. **Implement:** Versioned static source snapshot, deterministic verifier and negative tests in the existing Standards repository, separate live blockers and dependency graph.
5. **Test:** Run Node native audit tests on actual pinned snapshot. No protected services or real self-host were contacted.
6. **Validate:** Compare exact snapshot and source CI evidence; link red workflow, separate mainline and draft source states.
7. **Repair:** Fix measured script/snapshot mismatch only; retain failing test/run history rather than weakening admission.
8. **Retest:** Rerun exact source test suite and compare GitHub workflow conclusion at final revision.
9. **Verify:** Independent Veritas C3/SH-03 production qualification **NOT PERFORMED**.
10. **Evidence:** Parent SH-01 PR #61, stacked review branch, exact source SHA/CI logs, attached original user plan. No receipt created and no Learning Ledger updated.

**Disposition:** `SOURCE_AUDIT_PARTIAL / HOST_INDEPENDENCE_RED / LIVE_C3_UNQUALIFIED / FINAL_SOVEREIGN_HOST_UNQUALIFIED`. The inventory is a factual source checkpoint and work plan. It cannot authorize a deployment, alter Standards' governance registry, enroll cryptographic roots, move protected history, or declare sovereign operation.
