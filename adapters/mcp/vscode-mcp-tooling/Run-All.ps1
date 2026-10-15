# LEEWAY HEADER — DO NOT REMOVE
# REGION: CORE.SOURCE.PS1
# TAG: CORE.SOURCE.ADAPTERS_MCP_VSCODE_MCP_TOOLING_RUN_ALL_PS1.MAIN
# 5WH:
# WHAT = Run-All.ps1 existing LeeWay source
# WHY = Preserve the source and qualify documented governance identity
# WHO = LeeWay Standards repository (stewardship, original author unverified)
# WHERE = adapters/mcp/vscode-mcp-tooling/Run-All.ps1
# WHEN = 2026-10-15 (conformance review)
# HOW = Existing source body remains unchanged
# LICENSE: MIT (package metadata; original source license scope requires confirmation)
# LEEWAY HEADER BLOCK
# File: vscode-mcp-tooling/Run-All.ps1
# Purpose: MCP orchestrator for Agent Lee OS
# Security: LEEWAY-CORE-2026 compliant
# Performance: Sovereign MCP orchestration
# Discovery: Part of Agent Lee OS QA pipeline
$ErrorActionPreference = "Stop"
Set-Location "$PSScriptRoot"
Write-Host "PWD: $PSScriptRoot" -ForegroundColor Cyan
node src/tool.js testsprite
node src/tool.js playwright
node src/tool.js insforge
node src/tool.js stitch
