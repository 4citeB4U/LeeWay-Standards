#!/usr/bin/env node
/*
LEEWAY HEADER — DO NOT REMOVE

REGION: CORE
TAG: CORE.MODULE.CHECK_LAYER_PATHS.MAIN
DESCRIPTION: Auto-enforced by LeeWay Standards Enforcement Engine
AUTHORITY: LeeWay-Standards
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render

5WH:
WHAT = check-layer-paths — governed module
WHY = Enforce LeeWay architectural standards in this file
WHO = Leeway Innovations / LeeWay Standards Enforcement Engine
WHERE = scripts/check-layer-paths.mjs
WHEN = 2026-04-18
HOW = Auto-enforced header; update manually with full 5WH detail

CHAIN: Standards → Integrated → Runtime → Projections
LICENSE: PROPRIETARY
*/

import fs from "node:fs/promises";
import path from "node:path";

const standardsRoot = process.cwd();
const workspaceRoot = process.env.LEEWAY_WORKSPACE_ROOT
  ? path.resolve(process.env.LEEWAY_WORKSPACE_ROOT)
  : path.resolve(standardsRoot, "..");

const policyPath = path.resolve(standardsRoot, ".leeway", "layer-policy.json");
const policy = JSON.parse(await fs.readFile(policyPath, "utf8"));
const ignoreDirs = new Set(policy.ignoreDirs || []);
const scanExtensions = new Set(policy.scanExtensions || []);

function shouldScanFile(filePath) {
  return scanExtensions.has(path.extname(filePath));
}

async function walk(dirPath, out) {
  let entries = [];
  try {
    entries = await fs.readdir(dirPath, { withFileTypes: true });
  } catch {
    return;
  }

  for (const entry of entries) {
    const full = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      if (ignoreDirs.has(entry.name)) continue;
      await walk(full, out);
      continue;
    }
    if (entry.isFile() && shouldScanFile(full)) {
      out.push(full);
    }
  }
}

function extractImports(content) {
  const tokens = [];
  const patterns = [
    /import\\s+[^"'`]+?from\\s+["']([^"']+)["']/g,
    /import\\s*\\(\\s*["']([^"']+)["']\\s*\\)/g,
    /require\\s*\\(\\s*["']([^"']+)["']\\s*\\)/g
  ];

  for (const re of patterns) {
    let match;
    while ((match = re.exec(content)) !== null) {
      if (match[1]) tokens.push(match[1]);
    }
  }
  return tokens;
}

function findRepoByFile(filePath) {
  const absolute = path.resolve(filePath);
  for (const [repoKey, base] of repoBases) {
    const relative = path.relative(base, absolute);
    if (relative && relative !== '..' && !relative.startsWith('..' + path.sep) && !path.isAbsolute(relative)) {
      return { repoKey, repo: policy.repos[repoKey] };
    }
  }
  return null;
}

const files = [];
const repoBases = new Map();
const absentRepositories = [];
for (const [repoKey, repo] of Object.entries(policy.repos)) {
  const candidate = path.resolve(workspaceRoot, repo.path);
  const present = await fs.stat(candidate).then(stat => stat.isDirectory()).catch(() => false);
  const selected = present ? candidate : (repoKey === 'standards' && !process.env.LEEWAY_WORKSPACE_ROOT ? standardsRoot : null);
  if (!selected) { absentRepositories.push(repoKey); continue; }
  repoBases.set(repoKey, selected);
  await walk(selected, files);
}
if (process.env.LEEWAY_WORKSPACE_ROOT && absentRepositories.length) {
  throw new Error('DECLARED_WORKSPACE_MISSING_REPOSITORIES:' + absentRepositories.join(','));
}

if (files.length === 0) {
  console.error("Layer path validation blocked: no source files were discovered under the declared workspace.");
  process.exit(2);
}

const violations = [];
for (const filePath of files) {
  const repoInfo = findRepoByFile(filePath);
  if (!repoInfo) continue;

  const content = await fs.readFile(filePath, "utf8").catch(() => "");
  if (!content) continue;

  const imports = extractImports(content);
  if (imports.length === 0) continue;

  for (const token of imports) {
    for (const forbidden of repoInfo.repo.forbiddenImportTokens || []) {
      if (token.includes(forbidden)) {
        violations.push({
          rule: "forbidden-import-token",
          repo: repoInfo.repoKey,
          file: path.relative(workspaceRoot, filePath).replaceAll("\\\\", "/"),
          importToken: token,
          forbidden
        });
      }
    }
  }
}

if (violations.length > 0) {
  console.error("Layer path validation failed.");
  for (const v of violations) {
    console.error(`- [${v.repo}] ${v.file} imports '${v.importToken}' (forbidden token: ${v.forbidden})`);
  }
  process.exit(1);
}

console.log(`Layer path validation passed. Scanned ${files.length} files across ${repoBases.size}/${Object.keys(policy.repos).length} declared repositories.`);
