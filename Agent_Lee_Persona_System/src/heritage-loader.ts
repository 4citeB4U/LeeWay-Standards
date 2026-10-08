/*
LEEWAY HEADER — DO NOT REMOVE

REGION: CORE
TAG: CORE.AGENT_LEE_PERSONA_SYSTEM.SRC.HERITAGE_LOADER.MAIN
DESCRIPTION: Auto-enforced by LeeWay Standards Enforcement Engine
AUTHORITY: LeeWay-Standards
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render

5WH:
WHAT = heritage-loader.ts — governed module
WHY = Enforce LeeWay architectural standards in this file
WHO = Leeway Innovations / LeeWay Standards Enforcement Engine
WHERE = Agent_Lee_Persona_System/src/heritage-loader.ts
WHEN = Governance metadata applied 2026-10-08
HOW = Auto-enforced header; update manually with full 5WH detail

CHAIN: Standards → Integrated → Runtime → Projections
LICENSE: Existing file and repository license terms remain unchanged
*/
/*
LEEWAY_HEADER - DO NOT REMOVE

TAG: AI.PERSONA.HERITAGE.LOADER
REGION: 🧠 AI
PURPOSE: Loads Agent Lee heritage canon assets from the standalone persona module.
DISCOVERY_PIPELINE:
  Voice → Intent → Location → Vertical → Ranking → Render
*/

import * as fs from "fs";
import * as path from "path";

function root() {
  return path.resolve(__dirname, "..");
}

export function loadAgentLeeHeritage() {
  const assetMarkdownPath = path.join(root(), "assets", "06_HERITAGE", "agentlee_heritage_canon.md");
  const assetJsonPath = path.join(root(), "assets", "06_HERITAGE", "agentlee_heritage_canon.json");
  const directMarkdownPath = path.join(root(), "06_HERITAGE", "agentlee_heritage_canon.md");
  const directJsonPath = path.join(root(), "06_HERITAGE", "agentlee_heritage_canon.json");
  const markdownPath = fs.existsSync(assetMarkdownPath) ? assetMarkdownPath : directMarkdownPath;
  const jsonPath = fs.existsSync(assetJsonPath) ? assetJsonPath : directJsonPath;
  let markdown = "";
  let json: Record<string, unknown> = {};

  try {
    markdown = fs.readFileSync(markdownPath, "utf8");
  } catch {}

  try {
    json = JSON.parse(fs.readFileSync(jsonPath, "utf8")) as Record<string, unknown>;
  } catch {}

  return {
    markdownPath,
    jsonPath,
    markdown,
    json
  };
}
