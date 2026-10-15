/*
LEEWAY HEADER — DO NOT REMOVE
REGION: CORE.SOURCE.MODULE
TAG: CORE.SOURCE.SRC_CORE_TEMPLATES_JS.MAIN
5WH:
WHAT = templates.js existing LeeWay source
WHY = Preserve original functionality and enforce source identity
WHO = LeeWay Standards source stewardship (original author pending review)
WHERE = src/core/templates.js
WHEN = 2026-10-15 (conformance review)
HOW = Original source is retained below the leading governance comment
LICENSE: MIT (repository package metadata; source scope pending review)
*/
/*
LEEWAY HEADER — DO NOT REMOVE

DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render
REGION: CORE
TAG: CORE.SOVEREIGN.TEMPLATES
*/

export const SOVEREIGN_TEMPLATES = {
  time_check: `
# LEEWAY AUTO-SYNC [TIME]
# WHY: Maintain temporal accuracy for agent tracking
Get-Date -Format "yyyy-MM-dd HH:mm:ss" | Out-File -Append .leeway/activity.log
`,
  
  weather_sync: `
# LEEWAY AUTO-SYNC [WEATHER]
# WHY: Environmental awareness for contextual interaction
curl -s wttr.in/?format=3 | Out-File -Append .leeway/activity.log
`,

  file_monitor: `
# LEEWAY AUTO-SYNC [INTEGRITY]
# WHY: Track file mutations for Governance audit
Get-ChildItem -Recurse | Select-Object FullName, LastWriteTime | Export-Csv .leeway/registry.csv -NoTypeInformation
`
};
