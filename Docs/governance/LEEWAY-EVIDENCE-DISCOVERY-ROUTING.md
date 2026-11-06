<!--
REGION: LEEWAY.STANDARDS.EVIDENCE_ROUTING
TAG: LEEWAY.C3.STANDARDS.RECEIPT_DISCOVERY
5WH:
WHAT = Document existing evidence search and submission guidance for contributors
WHY = Enable all agents/LLMs to find reusable proofs without duplicating authorities
WHO = LeeWay Standards reviewers with W05 proposal
WHERE = LeeWay-Standards/Docs/governance/LEEWAY-EVIDENCE-DISCOVERY-ROUTING.md
WHEN = 2026-11-06
HOW = Point to existing Receipt Authority contract and original repository notes
LICENSE: Existing LeeWay repository terms
AUTHORITY: Draft guidance only, not deployed execution or approved new authority
-->

# LeeWay evidence discoverability — proposed contributor guidance

**PROPOSED, not adopted constitutional authority.** Read the [canonical engineering laws](LEEWAY-CANONICAL-ENGINEERING-LAWS.md), owning issue, current contributor notes, original source hash, and [Standards Receipt contract PR #56](https://github.com/4citeB4U/LeeWay-Standards/pull/56) before this companion.

For all LeeWay LLMs and agents: **search before test**. Look in original LeeWay repo, its own evidence/receipt/test artifacts, original workplane records, authorized Receipt Authority catalog, Continuum storage and independent Veritas evidence. Record source + work/event IDs, exact test/CI results, errors and readback. Never re-run equivalent independently qualified tests simply because an index or host is offline. Keep documented/observed/tested/verified/production-admitted statuses separate.

Use [Receipt Authority JSON taxonomy](https://github.com/4citeB4U/Receipt-Authority/blob/w05-evidence-discovery-routing-20261106/config/evidence-routing.v1.json) for machine-readable domains (GPU, API, Nodes and other LeeWay domains), artifact types, distinct outcome/verification/custody states, and search hierarchy. Documents remain documents; failures, attempted runs, repair and retest remain linked. Human viewer and machine queries derive from the same JSON index.

**Write once, reference many:** Original source artifacts and tests stay with their owning repository/authorized custodian. Only the existing owner-approved canonical receipt writer creates original receipts; index references must not mint an alternative receipt, overwrite historical chains, or grant Veritas/Formula/Learning authority. Tenant-sensitive payloads remain under scoped original storage/Continuum. Required contributor notes: BEGIN, PROGRESS, PROBLEM, RESOLUTION/RETEST and HANDOFF including exact evidence location, source revision, UTC timestamp, execution truth and outstanding approval gates. Refer to [Receipt Authority discovery contract](https://github.com/4citeB4U/Receipt-Authority/blob/w05-evidence-discovery-routing-20261106/docs/EVIDENCE_DISCOVERY_AND_ROUTING.md). Existing [Runtime C3 #111](https://github.com/4citeB4U/Leeway-Runtime-Fabric/issues/111) remains owner. Approval and deployment require Creator/Standards/owner review; no source-only automatic adoption.

## Artifact discovery and machine-readable recordkeeping
The evidence-first law also covers **all LeeWay artifacts**: source and compiled outputs, CI workflow ZIPs, release assets, device traces, build packages, model/compute kernels, test logs, deployment manifests, reports, recordings, images, checkpoints, and failures. Follow the [Receipt Authority artifact taxonomy](https://github.com/4citeB4U/Receipt-Authority/blob/w05-evidence-discovery-routing-20261106/config/artifact-discovery.v1.json) and [bounded initial artifact references](https://github.com/4citeB4U/Receipt-Authority/blob/w05-evidence-discovery-routing-20261106/catalog/artifact-leads.v1.json). An artifact is classified separately from a receipt and independently verified PASS. Contributors record its original locator and lifecycle state (`DISCOVERED_REFERENCE`, `BYTES_READBACK_VERIFIED`, `EXPIRED_REFERENCE_ONLY`, etc.), reported vs rehashed SHA-256, run/commit, device/backend, UTC timestamp, scope and approval criteria in owning mission notes. Search historical assets before re-running builds. Private artifacts stay with authorized original custodian/Continuum. Adoption remains subject to Standards review; no new writer or bulk-copy grant.
