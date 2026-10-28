# LeeWay Three-Part GitHub–Ecosystem–Vercel Delivery Law (Proposed)

Status: PROPOSED — not effective until owner review, Veritas validation and approved merge.
Authority: LeeWay Standards → Runtime Fabric → Agent Lee Prime → Applications.
Scope: all LeeWay repositories, apps, services, widgets, deployment workflows and runtime integrations.

## Law
Every LeeWay capability MUST have one governed, traceable delivery path across three coordinated parts:
1. **GitHub** is the canonical source-control, standards, change-review, CI, release-manifest and evidence-link authority. Publish eligible static public interfaces on GitHub Pages; do not attempt to run persistent privileged services on Pages.
2. **LeeWay Ecosystem** provides governed runtime execution, Formula evaluation, Runtime Fabric service orchestration, Device Bridge, GPU compute where applicable, RTC/Live transport where qualified, Continuum state/recovery, Veritas, Receipt Ledger and Learning Ledger. Do not duplicate canonical authority or introduce device-specific dependencies into universal contracts.
3. **Vercel** deploys eligible web/API ingress and application services, with explicit environment bindings, upstream health, OAuth and transport qualification. Vercel Functions are not a durable identity database, signing-key store or substitute for Runtime Fabric admission.

## Mandatory invariants
- Every deliverable identifies its canonical GitHub repository, commit SHA, applicable GitHub Pages surface, Vercel project/deployment (if applicable), and LeeWay runtime provider binding. An inapplicable surface is recorded as N/A with rationale; never fabricate deployment.
- Source merged != deployed; deployed != reachable; reachable != authenticated; authenticated != authorized; authorized != executed; executed != verified. Each requires independent evidence.
- GitHub Pages hosts static/PWA/browser-capable artifacts only. Persistent services, private secrets, OAuth issuers, trusted signing keys, databases and privileged execution require a qualified durable runtime.
- Do not require Docker, Windows, Android, Apple, a particular GPU, or a single cloud provider in universal LeeWay contracts. Device-specific adapters may be used behind governed interfaces.
- No secrets, owner credentials, private identity state or bearer tokens in GitHub commits, GitHub Pages, Vercel public variables, build logs or receipts.
- All stateful authority must define a single canonical writer, durable storage, restart recovery, backup, restore verification and key custody.
- Production admission requires explicit owner permission, independent Veritas PRE/POST, bounded execution, canonical receipt, and Learning Ledger handling where applicable. Fail closed on missing authorities.
- Every cross-repository change must record dependencies, source revisions, compatibility, deployment targets, rollback, evidence and open blockers.
- Do not represent proposals, mock tests, static pages, or unverified RTC/federation as live hosting or production execution.

## Release acceptance
A release is COMPLETE only when source, GitHub Pages (when applicable), Vercel (when applicable), and the LeeWay governed runtime have been separately tested and their cross-system integration is proven. Missing infrastructure must be recorded as BLOCKED, never silently substituted with a new vendor or bypassed.

## Pocket ID application
Pocket ID remains one logical OIDC issuer with durable key custody and state. GitHub governs its source/deployment definition, Vercel may serve qualified ingress, and LeeWay governs hosting/transport/recovery only after live qualification. A GitHub repo or GitHub Pages cannot by itself host the issuer. Read-only MCP discovery does not authorize Windows command execution.
