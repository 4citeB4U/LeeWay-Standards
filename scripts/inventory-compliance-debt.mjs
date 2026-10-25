/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.STANDARDS.AUDIT
TAG: LEEWAY.STANDARDS.AUDIT.COMPLIANCE_INVENTORY
DISCOVERY_PIPELINE: Voice -> Intent -> Location -> Vertical -> Ranking -> Render
5WH:
WHAT = Generate a read-only, evidence-based Standards compliance debt inventory
WHY = Separate actual invalid headers, absent headers, and manual exemption review without touching governed code
WHO = LeeWay Standards engineering
WHERE = scripts/inventory-compliance-debt.mjs
WHEN = 2026-10-25
HOW = Execute existing canonical scanner in report mode, parse results and print bounded structured facts
LICENSE: Existing LeeWay repository terms
*/
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const scanner = path.join(root, 'scripts/auto-enforce-file-governance.mjs');
const proc = spawnSync(process.execPath, [scanner, '--root', root], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
if (![0, 2].includes(proc.status) || !proc.stdout) {
  process.stderr.write('SCANNER_EXECUTION_BLOCKED: ' + String(proc.stderr || proc.status) + '\n');
  process.exit(1);
}
let report;
try { report = JSON.parse(proc.stdout); } catch (error) { process.stderr.write('SCANNER_REPORT_NOT_JSON ' + error.message + ' size=' + proc.stdout.length + ' suffix=' + JSON.stringify(proc.stdout.slice(-300)) + '\n'); process.exit(1); }
const groups = { compliant: [], missingLeadingHeader: [], malformedOrIncompleteHeader: [], unknown: [] };
for (const item of report.results || []) {
  const relativePath = String(item.relativePath || '').replaceAll('\\', '/');
  const problems = Array.isArray(item.validationErrors) ? item.validationErrors : [];
  const key = problems.length === 0 && !item.changed ? 'compliant'
    : problems.includes('MISSING_HEADER_IDENTITY') ? 'missingLeadingHeader'
    : problems.length ? 'malformedOrIncompleteHeader' : 'unknown';
  groups[key].push({ path: relativePath, errors: problems });
}
const counts = Object.fromEntries(Object.entries(groups).map(([k, v]) => [k, v.length]));
const output = {
  schema: 'leeway.standards.compliance-debt-inventory.v1',
  readOnly: true,
  gateReplaced: false,
  reportedScanned: report.scanned,
  reportInvalid: report.invalid,
  reportChanged: report.changed,
  classifiedTotal: Object.values(counts).reduce((a, b) => a + b, 0),
  counts,
  reviewNeeded: [
    'Manually check ownership, SPDX and generated/vendor/immutable provenance before editing.',
    'Do not treat file path alone as a permitted exemption.',
    'Do not use --apply or publish invented file owner/license metadata.',
    'This inventory neither overrides nor disables existing enforcement or production authority.'
  ],
  groups
};
if (output.classifiedTotal !== report.scanned || report.scanned === 0) {
  process.stderr.write('INCOMPLETE_INVENTORY\n'); process.exit(1);
}
process.stdout.write(JSON.stringify(output, null, 2) + '\n');
