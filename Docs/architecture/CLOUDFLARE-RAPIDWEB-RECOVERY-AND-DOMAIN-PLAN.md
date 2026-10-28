<!--
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.CLOUDFLARE.RAPIDWEB_RECOVERY
TAG: LEEWAY.DOMAIN_RECOVERY_AND_SUBDOMAIN_AUTHORITY.V1
DISCOVERY_PIPELINE: Voice -> Intent -> Location -> Vertical -> Ranking -> Render
5WH:
WHAT = Recover historical RapidWebDevelop Cloudflare zone and reserve an owner-gated LeeWay domain namespace
WHY = The spoken rapidweb.com differs from GitHub-documented rapidwebdevelop.com and ownership is unverified
WHO = LeeWay Industries and independent Veritas reviewers
WHERE = Docs/architecture/CLOUDFLARE-RAPIDWEB-RECOVERY-AND-DOMAIN-PLAN.md
WHEN = 2026-10-28
HOW = Read-only original account/domain proof, public first-level names, separately governed private origins
AUTHORITY: SOURCE_CANDIDATE_ONLY; no DNS write, owner identity, or production grant.
LICENSE: MIT
-->
# LeeWay Cloudflare domain recovery and first-level subdomain plan

STATUS: SOURCE CANDIDATE — NO DNS OR ACCOUNT MUTATION.

## Original domain and account recovery

- Historical Agent Lee repository 4citeB4U/agentx23, February 2026 logs and QA reports consistently identify rapidwebdevelop.com, including agentlee.rapidwebdevelop.com. The spoken rapidweb.com is a DIFFERENT registered domain. Ownership of neither has been verified in the currently connected Cloudflare account.
- Quick Tunnel logs dated February 19–20, 2026 explicitly describe accountless trycloudflare.com tunnels connected to a Windows localhost service on ports 8000/8001. Those ephemeral connections cannot serve as persistent cloud authorities.
- Old agentx23 backend/src/routes/cfDeployment.ts may report deployed despite failed DNS or dummy InsForge publish. Old apps.ts includes hardcoded demo services and synthetic metrics. Require independent origin and DNS readback; do not copy these success semantics.
- The currently connected Cloudflare account had no zones, named tunnels, Pages, Workers or D1. R2 returned code 10042 (not enabled). A security notification in another connected mailbox dated October 26, 2026 reports that its recipient has at least one Cloudflare Tunnel. That is an account-recovery lead only, not zone ownership proof. NEVER commit private email addresses, tokens, zone IDs or account identification to GitHub public source.

## Recover the original account — no premature DNS changes

1. Owner signs into the official Cloudflare dashboard with the mailbox that received the recent Tunnel update notification, then reconnects Cloudflare to ChatGPT under that correct account.
2. Read accounts/zones, tunnel list including deleted, Pages/Workers, zone DNS records, Cloudflare assigned nameservers, certificate coverage and actual origin health. Compare to the documented legacy Agent Lee URLs.
3. Independently verify control at the REGISTRAR and public authoritative nameservers for the EXACT intended registrable domain. Do not equate rapidweb.com and rapidwebdevelop.com.
4. Preserve existing route records and take an owner-authorized DNS snapshot and rollback plan. Do not transfer domains or modify their nameservers on a source-only assertion.
5. Any reused cloudflared binary must be upgraded to 2026.10.2 or later under the Cloudflare October 20, 2026 certificate compromise guidance. Never disable TLS origin verification.

## Public namespace — first-level subdomains of verified rapidwebdevelop.com

| Proposed hostname | Scope | Admission |
| --- | --- | --- |
| leeway.rapidwebdevelop.com | LeeWay application portal | Public display; owner features require auth |
| agentlee.rapidwebdevelop.com | Historical Agent Lee UI alias | Preserve historical compatibility; no native commands |
| mcp.rapidwebdevelop.com | ChatGPT/device bridge /mcp | Pocket ID exact bearer audience and owner scope |
| identity.rapidwebdevelop.com | Single Pocket ID OIDC issuer | Durable own database and signing-key storage |
| maps.rapidwebdevelop.com | LeeWay Maps public product | Public UI, protected private data |
| logistics.rapidwebdevelop.com | LeeWay Logistics public product | Public UI, protected enterprise data |
| voice.rapidwebdevelop.com | Voice Fabric RTC ingress | Authenticated realtime; separate consent and AEC |
| docs.rapidwebdevelop.com | Standards and Skills docs | Public read-only verified reference |

These are CANDIDATES not deployed URLs. Cloudflare Universal SSL on a full setup covers the root plus first-level subdomains. Avoid nested mcp.leeway.rapidwebdevelop.com unless an appropriate deeper hostname certificate is independently verified. A public DNS record is not by itself a physical hosting service; the origin remains a separately qualified and persistent host.

## Private authority and execution plane

Remain private by default: Runtime Fabric execution, canonical Continuum SQLite and VRAM, Machine Consciousness, Formula, independent Veritas, Receipt Authority, Learning Ledger, GPU kernels, Echo Memory and native device execution. Do not create public DNS records or unrestricted Cloudflare Worker passthroughs for these authorities.

Canonical chain: GitHub source → authorized HTTPS ingress → single Pocket ID → Runtime Fabric / Formula → Continuum owner-scoped data → independent Veritas PRE/POST → Receipt Authority → Learning Ledger. Any physical Windows/Android host is a separately enrolled client; cloud infrastructure must keep working when the creator's PC is offline.

No replacement databases, new R2 bucket or direct provider writes are authorized. R2 can become an encrypted backup/replica AFTER original Continuum readback and owner approval.

## Full engineering loop and evidence

1. Investigate: original Cloudflare account and domain identity using historical source and login.
2. Diagnose: DNS, TLS, tunnel security, deployed origins and false-positive legacy publishers.
3. Plan: exact first-level names, issuer/audience binding, private service network and rollback.
4. Implement: only after owner and zone verification, configure selected records and real origins.
5. Test: source-only negative cases and authenticated request matrix.
6. Validate: authoritative DNS readback, TLS certificate match, live origin, issuer and protected MCP.
7. Repair: fix actual failures; no success on missing DNS or fake application publish.
8. Retest: negative auth, restart, detached-device, DNS and failed-provider recovery.
9. Verify: independent Veritas approval with real Formula/Receipt/Learning evidence.
10. Evidence: source SHA, exact zone/NS and DNS-diff receipts, live issuer/resource, service deployments, original Continuum hash and governed rollback receipts.

References:
- https://github.com/4citeB4U/agentx23/blob/main/QA_FINAL_REPORT.md
- https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/limitations/
- https://blog.cloudflare.com/emudhra-certificate-compromise/

Implementation: config/cloudflare-domain-namespace.candidate.json and scripts/qualify-cloudflare-domain-namespace.mjs.
