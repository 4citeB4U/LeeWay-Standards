<!--
DOC_CLASS: GOVERNANCE
DOC_ID: leeway.canonical-engineering-laws.collaboration
OWNER: LeeWay Standards / Creator Authority
STATUS: CANONICAL
-->
# LeeWay Canonical Engineering Laws — Execution, Collaboration & Recurring Failure Prevention

**Authority:** Creator/Human → LeeWay Standards → Root of Trust → owning Runtime/Harness/Fabric → Formula/Decision → Execution → Veritas → Receipt → Learning. This is a governing engineering law for every contributor, agent, model, and team, regardless of team size, domain or device. It extends existing R01–R25 and established authorities; it does not introduce another cognitive system, task database, registry or implementation owner.

## LAW 01 — READ FIRST, EVERY SESSION
Before accepting, planning, coding, testing, resuming or handing off work, read **this law first**, followed by the canonical R01–R25, current repo `AGENTS.md`, contributor protocol, owning mission issue, latest notes, source SHA, claims, Veritas receipts and acceptance gate. Check for changes before every new assignment; never presume an earlier snapshot remains current. If access is unavailable, report the blocked continuity gate rather than guessing.

## LAW 02 — CREATOR AUTHORIZATION AND SINGLE OWNER
Creator authorization controls all material scope changes. The governing LeeWay ecosystem remains first and foremost. No contributor may download, stage, replace, introduce or independently experiment with a new model, recognizer, voice engine, service, registry, adapter, architecture or parallel implementation merely because an existing component behaves incorrectly or is thought absent. Never reinterpret permission to repair as permission to replace. Do not change voice identity, camera authority, security, active service or cross-device binding without its explicit authority gate.

## LAW 03 — REUSE BEFORE BUILD; PROVE ABSENCE
Inspect canonical repositories, installed implementation, commits/branches, open PRs, contributor notes, receipts and documentation. Classify every function as **ALREADY BUILT / PARTIALLY BUILT / MISSING GLUE / TRULY MISSING** with source paths, SHAs, runtime state and evidence. A function *thought* missing must be proved missing. Repair or connect the precise defective existing parts. Only a genuinely missing requirement may be proposed to the Creator for authorization; never construct a duplicate by default.

## LAW 04 — INTEGRATED TESTS ONLY
Experiments and tests must use the real existing LeeWay components, boundaries, data flow and execution path for the capability being repaired. Isolated substitutes and unrelated proof-of-concept systems never qualify even if their tests pass: they create rewrites, duplicate maintenance and reconfiguration. Test fixtures may validate logic but cannot be passed off as real system acceptance. Use a controlled reproduction on the actual owning component and preserve live state, human consent and rollback. No test may bypass an existing authentication or Veritas gate.

## LAW 05 — FINISH THE ENGINEERING LOOP
Execute the complete governed loop: **Investigate → Diagnose → Plan → Implement → Test → Validate → Repair → Retest → Verify → Evidence**. Factory admission: **IDEA → NEED → AUTHORITY → DISCOVERY → CANONICAL CHECK → FORMULA/DECISION → IMPLEMENTATION → EXECUTION → VERITAS → PASS/FAIL → FREEZE**. Continue from a partial repair through integration, live UI/device use, provider readiness, voice/vision/cursor proof and downstream acceptance where applicable. Source, CI and service health are intermediate statuses, not completion. Finish the assigned outcome or document an irreducible blocker with precise evidence and preserved resumption state; never invent scores or receipts.

## LAW 06 — MANY TEAMS, ONE SHARED KNOWLEDGE THREAD
The existing **Agent Skills Contributor Hub #22** is a lightweight directory linking to canonical mission issues—not a message dump or new authority. Each team (2, 4, 5, 10 or more workers) has a lead, helpers, scope, claimed files, acceptance cases and owning repository mission issue. Teams work independently on nonoverlapping authorized changes while reusing the same cross-team evidence and solutions. A two-worker team must be able to reuse a ten-worker team's discoveries, and vice versa. Never repeat research that a peer has already verified without checking source freshness. Cross-domain reuse may transfer a pattern, but not duplicate an authority or assume a proof qualifies an unrelated system.

## LAW 07 — CONTINUOUS CONTRIBUTOR NOTES ARE REQUIRED
Every contributor maintains **time-ordered incremental notes** in the existing owning mission issue/PR. Record:
1. **BEGIN / CLAIM:** objective, team and lead, acceptance gate, source ref/SHA, exact owned paths, dependencies, hypothesis, risks, human approval and rollback.
2. **DURING / PROGRESS:** after each meaningful discovery, integration result, accomplishment or failure, post what actually ran and observed, source/receipt links, outstanding gates, and how it changes the plan.
3. **PROBLEM / HELP REQUEST:** error signature, reproduction, symptoms, affected subsystems, receipts, suspected root cause versus verified cause; explicitly ask other teams whether they have the same signature or reusable fix.
4. **RESOLUTION / RETEST:** exact canonical fix, before/after evidence, regressions, impacts on other teams, remaining limits and reproducible instructions.
5. **END / HANDOFF:** source/branch/SHA, CI status, physical behavior, Veritas/receipts, acceptance numerator/denominator, rollback and next owner/unchanged blocker.
Notes are event-driven and timely; do not wait until the end to write an enormous retrospective. Never post sensitive transcripts, raw personal data, credentials or unapproved recordings in public issues.

## LAW 08 — CROSS-TEAM COMMUNICATION AND HELP
At task start, after every accomplishment, at any novel blocker, after a meaningful repair, and before handoff: inspect the hub and owning mission for new peer updates. Publish a short pointer from the owning mission to Hub #22 **only** when a new workstream, shared dependency, reusable fix, recurring pattern, priority shift, blocked team or resolution matters to others. Keep detailed logs/evidence on the owner issue and in immutable receipts. When another team reports similar symptoms, exchange exact error signatures and proof; coordinate file ownership and agree on one canonical fix instead of parallel rewrites.

## LAW 09 — RECEIPT-GROUNDED RECURRENT DEFECT ANALYSIS
Before repairing an apparent repeated failure, query existing receipts, incident notes, logs, defects, source history and acceptance records across affected teams. Group by normalized *behavioral signature* (not superficial error wording): stage, component boundary, root cause, trigger, environment, source SHA, recurrence count, affected products/devices, and whether a previous fix was deployed and regression-tested. Record links, first/last observation and confidence. Distinguish correlated symptoms from proven shared cause. Never invent event counts, trends or severity where evidence is unavailable. Investigate repeated **unfinished integration**, weak ownership, missing readback, source drift, unauthorized substitutions and recurrent deployment/configuration defects. Publish the reusable countermeasure once through its existing authority and link affected missions.

## LAW 10 — PORTFOLIO PRIORITY BY REPEATED COST AND DEPENDENCY
Prioritize the highest-leverage *verified* underlying problem, not the most recently reported symptom. Assess:
- safety/Creator-authorization risk and governance impact;
- number and criticality of affected products, agents, teams and devices;
- recurrence frequency and trend from real receipts;
- whether the defect blocks an end-to-end acceptance chain;
- cost of repeated rediscovery, integration, retest, context switching and duplicate maintenance;
- availability of a canonical reusable fix and rollback.
Prioritization is evidence-bound and governed by the actual LeeWay Formula where mapped; otherwise label the ranking qualitative, not Formula-executed. Raise shared systemic faults to the owning authority, preserve team-specific execution, and verify repair regression across each affected integration.

## LAW 11 — PREVENT RECURRENCE, NOT JUST CLOSE INCIDENTS
Every verified repeated mistake must produce an appropriate prevention mechanism within existing authority: checked source contract, regression case, bootstrap check, deployment reconciliation, receipt field, contributor warning or documentation link. After a fix, inspect whether sibling products share its failure mode, test those existing integrations without overwriting peer work, and inform affected teams. **Every completed task should reduce the cost of the next similar task.** Breadth without reuse creates entropy. Build once. Verify once. Reuse many times.

## LAW 12 — PROOF, READBACK AND ACCEPTANCE
Maintain separate statuses: **SOURCE_IMPLEMENTED / TESTED / CI_PASS / DEPLOYED / LIVE_OBSERVED / VERITAS_VERIFIED / QUALIFIED**. No health-200, model response, synthetic click or local-only render passes a physical PC+phone acceptance gate. Verify real source/owner, authorized actor, pre/post state, both devices as required, audio/vision/cursor interaction where required, actual user behavior, Veritas and receipts. A failed or unverified gate stays open. Explicitly include the outstanding acceptance denominator and no false progress.

## LAW 13 — TEAM HUB HYGIENE
Hub #22 holds the first-read law pointer, team directory, current mission links, concise cross-team blockers/pattern alerts, and canonical fix links. It is *not* a second report warehouse. Work logs, issue chronology, incremental notes and artifacts stay in owning repository missions/PRs. Each actionable hub note names affected teams, signature, exact evidence link, owner and next joint decision; use concise updates rather than repeating entire histories. Existing documentation authority map governs all files and immutable receipts stay in their originating evidence authority.

## LAW 14 — CONTINUITY AND ESCALATION
A newly joining contributor reads this law, contributor entry points, team/mission notes and latest immutable receipts **before touching source**. When blocked, coordinate with siblings and ask for help using the evidence; never independently create a replacement. Human approval, device unavailability, safety/tool denial, unverified source or competing owner are explicit stop reasons. Resume the incomplete acceptance after resolution, not a fresh parallel build.

**Operating principle:** Many teams, distinct scoped duties, one governed LeeWay authority chain, one reusable evidence-and-solution thread. The smallest avoidable waste is a mistake already documented elsewhere.