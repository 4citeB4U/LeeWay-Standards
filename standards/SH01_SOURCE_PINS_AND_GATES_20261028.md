<!--
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.SH01.SOURCE_PINS
TAG: LEEWAY.SH01.IMMUTABLE_SOURCE_CI_SUPPLEMENT.V1
5WH:
WHAT = Preserve exact main-branch commit pins and existing CI outcomes for the existing SH-01 audit.
WHY = Avoid treating historic CI, README descriptions, or changing GitHub heads as production qualification.
WHO = LeeWay Standards audit contributor under Creator authority.
WHERE = standards/SH01_SOURCE_PINS_AND_GATES_20261028.md.
WHEN = 2026-10-28.
HOW = Read-only authenticated GitHub branch and Actions observations, referencing the original SH-01 owners.
LICENSE: Existing LeeWay Standards repository terms; no new rights asserted.
AUTHORITY: Supplemental evidence only, not an execution or Veritas decision.
-->

# SH-01 — Immutable Source and CI Supplement

**Owning audit:** [Standards PR #61](https://github.com/4citeB4U/LeeWay-Standards/pull/61). **Existing detailed scope/ownership report:** `standards/SH01_ESTATE_SCOPE_AND_SERVICE_EVIDENCE_20261028.md` on that PR. **Original production gate:** [Runtime Fabric C3 #21](https://github.com/4citeB4U/Leeway-Runtime-Fabric/issues/21).

This document intentionally does **not** duplicate the owner's 83-repository scope taxonomy, README blob matrix, dependency owner map, or service tests. It adds immutable HEAD observations and existing Actions evidence for source drift and continuous audit handoff. These HEADs are *observed main commits*, not an instruction to replace protected Standards `approvedCommit` values.

## Exact observed `main` commits (2026-10-28)

| Source home | Full main commit SHA |
| --- | --- |
| `4citeB4U/LeeWay-Standards` | `8df16fa0221e073be2530a28033b2601eb67dd35` |
| `4citeB4U/Leeway-formula-live` | `c1033eb7bedb88661f21b7eec6016a6404ce2153` |
| `4citeB4U/Leeway-Runtime-Fabric` | `2f765288f6c150a2273f873670a2ed876a130864` |
| `4citeB4U/LEEWAY-VERITAS` | `64ab653a649408a014529fbbecbbf3cf30808579` |
| `4citeB4U/Receipt-Authority` | `439618b2960539513619a673ad236bb461e8a6fa` |
| `4citeB4U/LeeWay-Learning-Ledger` | `7c68a824b326b26a1d386edfba11d352863531a0` |
| `4citeB4U/LeeWay-Production-Final-Execution-Layer` | `ef4f13749e615e5c43791dbdf84b4c2166620d9b` |
| `4citeB4U/LeeWay-Continuum` | `a8107cd61377079ac2c2fc9f99aa2061824bda21` |
| `4citeB4U/LeeWay-VRAM-Database` | `e77cb786bdbb07d84f72957ae9de70eae5112e8c` |
| `4citeB4U/LeeWay-Edge-GPU` | `d7347eddeb1db3423f322fdc599c82e5f26eae5f` |
| `4citeB4U/LeeWay-Model-Hub` | `c6d367155f01f769c44256e13b5f7913b5cc1214` |
| `4citeB4U/Agent-Lee-The-Sum-of-All-Systems` | `93731899ccaa3e317768d38555af4ac3710a8de8` |
| `4citeB4U/Machine-Consciousness` | `bce8661016a0b4ef52406080305fbcf4579a1465` |
| `4citeB4U/LeeWay-Agent-Skills` | `26bb0e7df29d95008b20f23497d469c0e0ca6eab` |
| `4citeB4U/LEEWAY-DEVICE-BRIDGE` | `506fa7329c4570503783300e09a874f47c34746b` |
| `4citeB4U/LeeWay-Pocket-Agent` | `d5753fc1c13c3481263ca88d89ca9c0420fcbdb5` |
| `4citeB4U/Leeway-Federate-Web` | `0bc64d62e2056f22450cfb79a68e62fb8b62f308` |
| `4citeB4U/Leeway-live` | `fd0b310601dc2c82130ddd7b2150c27d8432748a` |
| `4citeB4U/LeeWay-Edge-RTC` | `ba28fb8e3c636f8edddec88bdd4fa7d2a6b45840` |
| `4citeB4U/LeeWay-Voice-Fabric` | `76dff6a1ff3482c0c17b60c4d294945224e3d8a1` |
| `4citeB4U/Leeway-Agent-Lee-Vision` | `4751ea36a531d970fe2d7aba796b23c30b57a5d2` |
| `4citeB4U/LeeWay-Agent-Workstation-Open-Notebook` | `de8525e5209a10df10438b6a40c6a910b6172874` |
| `4citeB4U/LeeWay-Digital-Workforce` | `83bfcd976655a41e4422dda7abf27b730c5bfe4d` |
| `4citeB4U/LeeWay-Engineering` | `2f558d336750f29ca85b41273de4de8c974746d9` |

These observations are not a complete audit of the other account repositories. A different branch may carry more recent implementation work; a main SHA alone never replaces separately approved production source lineage.

## Existing GitHub Actions evidence (NOT newly executed by SH-01)

| Source and scope | Exact-run observation |
| --- | --- |
| Formula `main` `c1033eb7...` | [portable runtime #40346077779](https://github.com/4citeB4U/Leeway-formula-live/actions/runs/40346077779) SUCCESS |
| Continuum `main` `a8107cd6...` | [source-only #40647915213](https://github.com/4citeB4U/LeeWay-Continuum/actions/runs/40647915213) SUCCESS |
| VRAM `main` `e77cb786...` | [candidate #40386259724](https://github.com/4citeB4U/LeeWay-VRAM-Database/actions/runs/40386259724) SUCCESS |
| Device Bridge `main` `506fa732...` | [Pages #40764504811](https://github.com/4citeB4U/LEEWAY-DEVICE-BRIDGE/actions/runs/40764504811) SUCCESS; not a native execution proof |
| Federate `main` `0bc64d62...` | [peer transport #36418398671](https://github.com/4citeB4U/Leeway-Federate-Web/actions/runs/36418398671) SUCCESS; not live external peers |
| GPU `main` `d7347edd...` | [Windows KMD/UMD source #40146848670](https://github.com/4citeB4U/LeeWay-Edge-GPU/actions/runs/40146848670) SUCCESS; [Fly deployment #40146848637](https://github.com/4citeB4U/LeeWay-Edge-GPU/actions/runs/40146848637) FAILURE |
| Veritas draft `7d5e04d3...` | [source proof #40630016630](https://github.com/4citeB4U/LEEWAY-VERITAS/actions/runs/40630016630) SUCCESS; production signer unqualified |
| Receipt draft `b65037c9...` | [C3 source #40627862573](https://github.com/4citeB4U/Receipt-Authority/actions/runs/40627862573) SUCCESS; main is README-only |
| Learning draft `3b50a9b4...` | [candidate #40630992313](https://github.com/4citeB4U/LeeWay-Learning-Ledger/actions/runs/40630992313) SUCCESS; actual canonical append unqualified |

Separate historic CI on non-main branches must **not** be called passing main checks. Recheck each source SHA, workflow type, tests, provisioning status, installed build and credential/host boundary at the actual release gate.

## Measured SH-01 governance failure and corrective scope

[Standards incoming-source run #40791718793](https://github.com/4citeB4U/LeeWay-Standards/actions/runs/40791718793) on SH-01 PR #61 head `49b990d8b22b5ddb7726d62cfc1460fb8b2f9739` completed FAILURE. The underlying `standards-enforcer.test.mjs` test run passed **11/11**, but the actual changed Markdown source scan reported `scanned:1,invalid:1` on `standards/SH01_SOVEREIGN_AUDIT.md`. It listed `MISSING_HEADER_IDENTITY`, `MISSING_REGION`, `MISSING_TAG`, `MISSING_LICENSE` and incomplete 5WH because the metadata appeared after the title, not as a leading header. This annex and the corrected SH-01 document on the stacked branch need a fresh exact-source CI retest. Do not equate enforcement-unit PASS with source compliance.

## Engineering loop and original task preservation

**Investigate:** Existing PR #61 and its newer estate/service annex, exact 24 main commits, selected packages and historical CI; **Diagnose:** SH-01 source-header failure, historical-versus-actual build confusion and outstanding C3 gates; **Plan:** layered minimal header repair plus distinct source/CI pin supplement; **Implement:** review-branch source/docs only; **Test / Validate:** exact-head Incoming Source Watch and source-file readback required; **Repair / Retest:** original failed run preserved; independent retry required; **Verify:** independent production Veritas NOT EXECUTED; **Evidence:** this source document, PR review and linked Actions logs.

**Acceptance state:** SH-01 remains PARTIAL / REVIEW. C3 original objective remains OPEN. No source-only test qualifies a sovereign host, owner Veritas signer, protected Receipt Authority, canonical Learning Ledger, Agent VT/Device Bridge physical execution, BPv7, or orbital node. **RECEIPT NOT CREATED; LEARNING LEDGER NOT UPDATED.**
