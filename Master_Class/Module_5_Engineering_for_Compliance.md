<!--
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.EDUCATION
TAG: LEEWAY.STANDARDS.EDUCATION.MODULE_5_ENGINEERING_COMPLIANCE.MAIN
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render
5WH:
WHAT = Preserve existing LeeWay Module_5_Engineering_for_Compliance.md curriculum
WHY = Qualify legacy leading Markdown governance metadata without altering curriculum
WHO = Agent Lee / LeeWay Standards repository stewardship
WHERE = Master_Class/Module_5_Engineering_for_Compliance.md
WHEN = 2026-10-25 (metadata qualification)
HOW = Replace only legacy leading comment and retain lesson body verbatim
LICENSE: Existing file and repository terms remain unchanged
-->

# Module 5: Engineering for Compliance

A Sovereign AI system must be auditable and self-repairing. To achieve this, human developers and AI agents must abide by strict structural rules. This module covers the automated tools that enforce the LeeWay Standard.

## The Compliance Fleet
Instead of relying on human code reviews to enforce the 85/100 score target, the LeeWay ecosystem uses a fleet of autonomous background agents.

### The StandardsAgent: HeaderInjector
Extracted directly from the LeeWay technical blueprints, the `HeaderInjector` is a specialized PowerShell script and AI hybrid agent.

**Core Function**: Automatically injects mandatory LeeWay headers into all compliant files (JS, PY, JSX, TS, MD).

**Example Output:**
```powershell
# == 📦 StandardsAgent: HeaderInjector ==
# Task: Automatically inject mandatory LeeWay headers into compliant files.
# Standard: Score Target 85/100 required.
# Action: Scanned 14 files, injected headers into 3 non-compliant files.
```

## Mandatory Structural Elements
To pass the Veritas Gate, all code must contain:
1. **Compliance Headers:** Declaring the file path and monitoring status.
2. **Action Regions:** Using strict `# REGION` and `# ENDREGION` block comments so `NovaForge` agents can surgically replace code without breaking the entire file.
3. **Intent Tags:** Small metadata tags next to complex functions explaining *why* a function exists, satisfying the "Auditable" pillar of the LeeWay Standard.

## The AutonomyAuditor
Before any pull request is merged or any skill is saved, the `AutonomyAuditor` scans the structural elements. If it falls below the 85/100 score target, it routes the failure to the Nova family for automatic refactoring.
