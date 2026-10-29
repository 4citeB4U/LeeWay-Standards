<!--
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.SH01.SOURCE_EVIDENCE
TAG: LEEWAY.SH01.PINNED_WORKSTREAM_AUDIT.20261028
5WH:
WHAT = Record source-pinned independent sovereign-host workstream findings and qualification gaps.
WHY = Prevent repository existence, CI success, or candidate code from being mistaken for production operation.
WHO = LeeWay Standards audit contributor under Creator authority.
WHERE = standards/SH01_SOURCE_PINS_AND_GATES_20261028.md.
WHEN = 2026-10-28.
HOW = Read-only connected GitHub branch, root-tree, README, source, PR and workflow-run inspection.
LICENSE: Existing LeeWay Standards repository terms; no new license grant asserted.
AUTHORITY: Audit evidence only; no independent Veritas, Formula or release decision.
-->

# SH-01 — Pinned Source and Independent Qualification Annex

**Parent:** [SH-01 Standards audit PR #61](https://github.com/4citeB4U/LeeWay-Standards/pull/61) and [C3 original Runtime mission #21](https://github.com/4citeB4U/Leeway-Runtime-Fabric/issues/21). **Date:** 2026-10-28 (source observations, not a production timestamp). This annex extends the existing SH-01 workstream; it does not create a new authority registry, supervisor, ledger, agent, model, or service.

## Inspection scope and interpretation

The authenticated repository listing returned **83 repositories** under `4citeB4U`. This pass checked the default `main` branch and immutable HEAD SHA of **24 major workstream repositories**. It separately inspected repository roots, selected READMEs, selected `package.json` scripts, source-level provider code, current draft PRs and existing GitHub Actions run metadata. The other 59 repositories, executable startup of every node, real native providers, physical host state and many service configurations were **not exhaustively inspected**.

A source candidate is never an authorized runtime provider. Existing passing CI is historical evidence for the recorded exact commit, not an independently performed live C3 test. The main-branch commits below are observations, not a proposal to replace Standards-approved commit pins; compare them with approved release identities before execution.

## Current source inventory (main HEAD, exact IDs)

| Owner/workstream | Repository | Inspected main SHA | Scope / source classification |
| --- | --- | --- | --- |
| Constitutional rules | `LeeWay-Standards` | `8df16fa0221e073be2530a28033b2601eb67dd35` | ALREADY BUILT governance; runtime application of each rule UNVERIFIED |
| Golden Formula | `Leeway-formula-live` | `c1033eb7bedb88661f21b7eec6016a6404ce2153` | ALREADY BUILT source/evaluator contracts; live task decision UNVERIFIED |
| Runtime + sovereign host | `Leeway-Runtime-Fabric` | `2f765288f6c150a2273f873670a2ed876a130864` | PARTIALLY BUILT service/workplane; independent persistent host acceptance UNVERIFIED |
| Independent Veritas | `LEEWAY-VERITAS` | `64ab653a649408a014529fbbecbbf3cf30808579` | PARTIALLY BUILT source; production root/custodian PRE/POST MISSING GLUE |
| Receipt Authority | `Receipt-Authority` | `439618b2960539513619a673ad236bb461e8a6fa` | README only on main; implementation in draft PR #1; production MISSING GLUE |
| Learning Ledger | `LeeWay-Learning-Ledger` | `7c68a824b326b26a1d386edfba11d352863531a0` | README only on main; candidates in draft PR #1/#3; canonical delivery UNVERIFIED |
| Final production handoff | `LeeWay-Production-Final-Execution-Layer` | `ef4f13749e615e5c43791dbdf84b4c2166620d9b` | Source handoff/doc only; Runtime-owned deployment MISSING GLUE |
| Continuum | `LeeWay-Continuum` | `a8107cd61377079ac2c2fc9f99aa2061824bda21` | PARTIALLY BUILT adapters and storage source; live recovery UNVERIFIED |
| VRAM checkpoint companion | `LeeWay-VRAM-Database` | `e77cb786bdbb07d84f72957ae9de70eae5112e8c` | PARTIALLY BUILT SQLite/encryption candidate; LDWMD live binding UNVERIFIED |
| LeeWay GPU | `LeeWay-Edge-GPU` | `d7347eddeb1db3423f322fdc599c82e5f26eae5f` | PARTIALLY BUILT portable/native code; inference admission UNVERIFIED |
| Model Hub | `LeeWay-Model-Hub` | `c6d367155f01f769c44256e13b5f7913b5cc1214` | PARTIALLY BUILT local inference candidate; qualified compute path MISSING GLUE |
| Agent Lee source | `Agent-Lee-The-Sum-of-All-Systems` | `93731899ccaa3e317768d38555af4ac3710a8de8` | Legacy/overlapping source; current single live identity UNVERIFIED |
| Machine Consciousness | `Machine-Consciousness` | `bce8661016a0b4ef52406080305fbcf4579a1465` | README only on main; original executable tree in Runtime Fabric; migration MISSING GLUE |
| Skills and MCP | `LeeWay-Agent-Skills` | `26bb0e7df29d95008b20f23497d469c0e0ca6eab` | ALREADY BUILT skill/MCP source; live provider authorization UNVERIFIED |
| Native Device Bridge | `LEEWAY-DEVICE-BRIDGE` | `506fa7329c4570503783300e09a874f47c34746b` | ALREADY BUILT Android and API source; universal device execution UNVERIFIED |
| Samsung Pocket Agent | `LeeWay-Pocket-Agent` | `d5753fc1c13c3481263ca88d89ca9c0420fcbdb5` | PARTIALLY BUILT Android app; physical parity UNVERIFIED |
| Federate Web | `Leeway-Federate-Web` | `0bc64d62e2056f22450cfb79a68e62fb8b62f308` | ALREADY BUILT static/browser projections; live cross-network peers UNVERIFIED |
| Live front door | `Leeway-live` | `fd0b310601dc2c82130ddd7b2150c27d8432748a` | PARTIALLY BUILT browser/installer; live full Agent Lee chain UNVERIFIED |
| Real-time communication | `LeeWay-Edge-RTC` | `ba28fb8e3c636f8edddec88bdd4fa7d2a6b45840` | PARTIALLY BUILT RTC code; mobility/AEC/liveness UNVERIFIED |
| Voice authority | `LeeWay-Voice-Fabric` | `76dff6a1ff3482c0c17b60c4d294945224e3d8a1` | PARTIALLY BUILT voice provider/UI; physical duplex acceptance UNVERIFIED |
| Vision surface | `Leeway-Agent-Lee-Vision` | `4751ea36a531d970fe2d7aba796b23c30b57a5d2` | Static UI/tests present; actual sensor execution UNVERIFIED |
| Agent VT / Open Notebook | `LeeWay-Agent-Workstation-Open-Notebook` | `de8525e5209a10df10438b6a40c6a910b6172874` | PARTIALLY BUILT employee work UI; governed operational communication MISSING GLUE |
| Digital Workforce / VT consumer | `LeeWay-Digital-Workforce` | `83bfcd976655a41e4422dda7abf27b730c5bfe4d` | PARTIALLY BUILT workforce and embedded tablet; canonical VT source parity UNVERIFIED |
| Engineering education | `LeeWay-Engineering` | `2f558d336750f29ca85b41273de4de8c974746d9` | Education and conformance material; no execution or verification authority |

All table classifications are **source-level triage**. None is a complete production PASS. The external BPv7/orbital/mesh study in the Creator's plan is **UNVERIFIED EXTERNAL DEPENDENCY**, not an additional deployed LeeWay node or a claim of accessible satellite transport.

## Confirmed blockers and ownership collisions

1. **Receipt-source gap:** `Receipt-Authority/main` lists only `README.md`. [PR #1](https://github.com/4citeB4U/Receipt-Authority/pull/1) contains nine changed paths for atomic SQLite receipt and outbox work. Exact PR HEAD `b65037c9f773197b7463e13a32938ed8ba6a4f1c` has source CI SUCCESS ([run #40627862573](https://github.com/4citeB4U/Receipt-Authority/actions/runs/40627862573)); it is still DRAFT, not a deployed canonical receipt writer. [Standards PR #56](https://github.com/4citeB4U/LeeWay-Standards/pull/56) is a separate prerequisite.
2. **Learning provenance:** `LeeWay-Learning-Ledger/main` currently contains only `README.md`. Draft [PR #3](https://github.com/4citeB4U/LeeWay-Learning-Ledger/pull/3), stacked on PR #1, holds source-only receipt-owned ingress work; exact HEAD `3b50a9b41a99cf0d48b2bb369f12447a207ae23c` has CI SUCCESS ([run #40630992313](https://github.com/4citeB4U/LeeWay-Learning-Ledger/actions/runs/40630992313)). This does not establish an authentic original writer or independent admission.
3. **Portable-path defect confirmed:** Runtime `automation-runtime/learning-ledger-provider.mjs` at Git blob `35d6c25ce4f5dc99ebefef67e3a8db7c8dc0b724` retains default physical `E:/LeeWay-Work/...` ledger and receipt directories. These defaults cannot be the universal platform contract. Existing owners must resolve storage from approved deployment bindings, preserving history.
4. **Machine Consciousness migration:** `Machine-Consciousness/main` contains only its README, while Runtime Fabric owns `machine-consciousness/` executable source. Import and SHA preservation are not equivalent to production runtime switchover.
5. **Production Layer's own README** explicitly describes source documentation/release handoff, not a running deployment service. Runtime Fabric remains the process/service execution owner.
6. **Authority registry coverage:** `LeeWay-Standards/standards/leeway-ecosystem-authority.v1.json` Git blob `aa58d8c87096ac77e46eca2c5aa90962d3a8b66d` contains older approved source pins and a subset of the present 24 homes. A main-branch SHA difference does not authorize changing an approved pin. Require independent owner review of scope and lineage before any registry reconciliation.
7. **Workforce surface omitted from the supplied hosting workstream list:** Agent VT is the existing Creator-approved work and communication instrument for Agent Lee and digital employees; connect it through Device Bridge, per-device Digital Brain, Diagnostics, Runtime and Continuum without another executor or identity authority.
8. **RTC source-claim tension:** Edge RTC README advertises production readiness and Docker orchestration, but no current C3 real full-duplex/native acceptance was observed by this audit. Treat README marketing claims as non-admission and preserve Creator's no-Docker production constraint.
9. **Static hosting limitation:** GitHub Pages/Actions cannot continuously run the required native workers after a runner terminates. Device independence removes any mandatory **particular personal PC**; sovereign persistent execution still requires one or more genuinely available approved runtime hosts/nodes.

## Inspected entrypoints and bounded test routes

| Owning source | Observed source command / entrypoint | Qualification limitation |
| --- | --- | --- |
| Standards | `npm run leeway:compliance:check`; `npm test` | Source validation, not owner-granted production |
| Formula | `docs/RUNTIME-RECOVERY.md`, `runtime/`, `tests/` | No root npm package observed; use owning workflow, not invented command |
| Runtime Fabric | `npm run start:server`; persistent workplane; `npm run test:provider-fabric` | Heavy host and verified endpoint readiness still separate |
| Veritas | `npm test`, `npm run review:serve` | Review service and synthetic trust cannot self-qualify signer |
| Receipt Authority PR #1 | `python -m unittest discover -s tests -v` | Execute on PR source; main has no implementation paths |
| Learning Ledger PR #3 | `npm test` in candidate source | Production ingress provider and original Ledger readback remain separate |
| Continuum | `npm test`; `npm run check:syntax` | Storage/readback and offline restore require real host |
| VRAM | `npm test` on Node 22.13+ | CI candidate snapshots not live LDWMD leases |
| GPU | `npm run test:portable`, `npm run test:software` | Kernel/LLM physical identity and production admission separate |
| Model Hub | `npm start`, `npm test` | Local service is not public Pages inference |
| Skills | `npm run verify:request-completion-fixture`; MCP server build | Skill listing is not tool execution |
| Device Bridge | `npm run test:mcp`, `npm run test:cli` | Device installation and permission/live readback separate |
| RTC | `npm run build`, `npm run test:conversation` | Real ICE/media and AEC tests separate |
| Voice | `npm test`, `npm run check` | Live mic/AEC/barge-in separately required |
| Agent VT | `npm run build`, `npm run lint`, `npm run dev` | Running UI not proof of real workforce execution |
| Digital Workforce | `npm run build`, `npm run lint` | Tablet/employee provisioning not independently admitted |

Unlisted test commands must be discovered from each actual source, not guessed. Source investigation above read package manifests where available; commands were **not invoked by this audit**.

## Independent existing CI evidence (not freshly rerun by SH-01)

| Component and exact revision | Relevant observed GitHub Actions |
| --- | --- |
| Formula main `c1033eb7...` | [Formula portable runtime #40346077779](https://github.com/4citeB4U/Leeway-formula-live/actions/runs/40346077779) SUCCESS |
| Continuum main `a8107cd6...` | [Continuum source-only #40647915213](https://github.com/4citeB4U/LeeWay-Continuum/actions/runs/40647915213) SUCCESS |
| VRAM main `e77cb786...` | [VRAM DB candidate tests #40386259724](https://github.com/4citeB4U/LeeWay-VRAM-Database/actions/runs/40386259724) SUCCESS |
| Veritas reviewed branch `7d5e04d3...` | [Veritas source proof #40630016630](https://github.com/4citeB4U/LEEWAY-VERITAS/actions/runs/40630016630) SUCCESS |
| Receipt draft `b65037c9...` | [Receipt C3 tests #40627862573](https://github.com/4citeB4U/Receipt-Authority/actions/runs/40627862573) SUCCESS |
| Learning draft `3b50a9b4...` | [Learning candidate tests #40630992313](https://github.com/4citeB4U/LeeWay-Learning-Ledger/actions/runs/40630992313) SUCCESS |
| Device Bridge main `506fa732...` | [Pages build #40764504811](https://github.com/4citeB4U/LEEWAY-DEVICE-BRIDGE/actions/runs/40764504811) SUCCESS |
| Federate main `0bc64d62...` | [Peer transport proof #36418398671](https://github.com/4citeB4U/Leeway-Federate-Web/actions/runs/36418398671) SUCCESS; not proof of external nodes |

Source-only CI evidence is insufficient for physical deployment, signer qualification, continuity or real same-request Formula → Veritas → Receipt → Learning admission. Any attempt to copy the table's SHA abbreviations into a production pin must first re-resolve the **full SHA**, approved authority and deployable artifact.

## Independent acceptance gates and non-duplication graph

`Creator → Standards/approved source identity → Formula decision → Runtime Fabric workplane + existing Skill Orchestrator → qualified Device Bridge/native capability → independent Veritas PRE/POST → original Receipt Authority atomic append + pending-learning obligation → canonical Learning Ledger exact readback → Production Fabric release decision.`

Continuum is the existing durable memory/storage authority and must be bound for applicable workloads. VRAM/LDWMD owns working-memory allocation rather than becoming a substitute for Continuum; GPU/Model Hub are bounded compute/model providers. Agent VT and Live are interfaces, not authority issuers. Federate Web/RTC provide communication and transport, not trusted verification. Runtime Fabric owns portable supervisor/host lifecycle; do not construct a parallel sovereign service manager.

**SH-01 independent acceptance:** for each listed workstream, inspect entrypoint, health/probe behavior, auth/config keys, resource budget, native dependencies, exact source/release pin, CI evidence, real execution and independent acceptance. Run genuine authorized read-only tests first; record any external credential, hardware and owner decision gate. One sovereign host must boot without GitHub, authenticate the authorized user, dispatch a genuine request, store/recover verified evidence across restart and deny unqualified providers. Multi-node authorization/failover is a later independent gate.

## Engineering-cycle evidence for this annex

- **Investigate:** GitHub source/main branches, root paths, README, selected package manifests, original Standards registry, active SH-01/C3 PRs and CI runs.
- **Diagnose:** outdated coverage versus added source homes, empty implementation on several default branches, path-bound Learning provider, missing live external signer and outbox chain, and source/production status confusion.
- **Plan:** extend existing Standards SH-01 checkpoint with additive read-only annex; do not change registry, signers, service deployment, Formula, or Ledger data.
- **Implement:** this annex on a **stacked review branch**, plus source header correction to existing SH-01 Markdown; no release mutation.
- **Test:** source-authoring CI should validate exact changed Markdown; its actual results are recorded separately in GitHub.
- **Validate:** compare current SHA and PR status against GitHub readback; any conflict remains an open issue, not proof of deployment.
- **Repair / Retest:** existing SH-01 PR #61 failed the incoming-source header check at run [#40791718793](https://github.com/4citeB4U/LeeWay-Standards/actions/runs/40791718793); the header correction on the stacked branch requires an actual passing retest.
- **Verify:** source-level tests only; independently authorized Veritas NOT EXECUTED for SH-01.
- **Evidence:** GitHub pull request, exact head, CI links and C3 issue handoff; **RECEIPT NOT CREATED; LEARNING LEDGER NOT UPDATED**.

**SH-01 disposition: PARTIALLY INVESTIGATED / PRODUCTION UNQUALIFIED.** No SH-01 analysis is permission to deploy, re-enroll a root key, change a canonical approved SHA, move private receipts, or invoke an external hardware/satellite service.
