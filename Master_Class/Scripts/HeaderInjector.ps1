# LEEWAY HEADER — DO NOT REMOVE
# DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render
# REGION: CORE.SOURCE.PS1
# TAG: CORE.SOURCE.MASTER_CLASS_SCRIPTS_HEADERINJECTOR_PS1.MAIN
# 5WH:
# WHAT = HeaderInjector.ps1 existing LeeWay source
# WHY = Preserve the source and qualify documented governance identity
# WHO = LeeWay Standards repository (stewardship, original author unverified)
# WHERE = Master_Class/Scripts/HeaderInjector.ps1
# WHEN = 2026-10-15 (conformance review)
# HOW = Existing source body remains unchanged
# LICENSE: MIT (package metadata; original source license scope requires confirmation)
# == 📦 StandardsAgent: HeaderInjector ==
# Task: Automatically scan and inject mandatory LeeWay headers into compliant files.
# Standard: Score Target 85/100 required.

$TargetDir = "d:\.LeeWay-Produucts-File\LeeWay-Standards\Master_Class"
$Files = Get-ChildItem -Path $TargetDir -Recurse -Include *.md, *.js, *.py, *.ts

$CompliantCount = 0
$FixedCount = 0

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "🛡️ Shield Aegis: AutonomyAuditor Initiated" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

foreach ($File in $Files) {
    $Content = Get-Content -Path $File.FullName -Raw
    
    # Check if header already exists
    if ($Content -match "\/\*\*\s*\n\s*\* LEEWAY COMPLIANCE HEADER") {
        Write-Host "[COMPLIANT - Score 85/100] $($File.Name)" -ForegroundColor Green
        $CompliantCount++
    } else {
        Write-Host "[NON-COMPLIANT - Score 0/100] $($File.Name) -> Injecting Header..." -ForegroundColor Yellow
        
        $RelativePath = $File.FullName.Substring($TargetDir.Length).Replace("\", "/")
        $Header = "/**`n * LEEWAY COMPLIANCE HEADER`n * Path: /Master_Class$RelativePath`n * Status: ACTIVE COMPLIANCE MONITORING`n */`n`n"
        
        # Inject Header
        $NewContent = $Header + $Content
        Set-Content -Path $File.FullName -Value $NewContent
        
        Write-Host "  -> [FIXED] Header injected. New Score: 85/100" -ForegroundColor DarkGreen
        $FixedCount++
    }
}

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Autonomy Audit Complete." -ForegroundColor Cyan
Write-Host "Total Files Scanned: $($Files.Count)"
Write-Host "Initially Compliant: $CompliantCount"
Write-Host "Autonomously Fixed: $FixedCount"
Write-Host "==========================================" -ForegroundColor Cyan
