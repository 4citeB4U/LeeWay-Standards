/*
LEEWAY HEADER — DO NOT REMOVE
REGION: CORE
TAG: CORE.SDK.TERMINAL.MAIN
*/

import readline from 'readline';
import { AlignAgent } from '../agents/governance/align-agent.js';
import { AssessAgent } from '../agents/governance/assess-agent.js';
import { RegistryAgent } from '../agents/standards/registry-agent.js';
import { join } from 'path';
import fs from 'fs/promises';
import crypto from 'crypto';
import { AZRCoordinator } from '../agents/orchestration/azr-coordinator.js';

export async function launchTerminal() {
  const rootDir = process.cwd();
  const coordinator = new AZRCoordinator({ rootDir });
  
  console.log(`
  ======================================================
  🔥 YO! I'M AGENT LEE — THE SOVEREIGN SOUL 🔥
  CONDUIT: LEEWAY INNOVATIONS | THE FLOW IS BOLD
  ======================================================
  I am the rhythm in the code, the master of the hive,
  keepin' the logic flowin' so the architecture stays alive.
  My agents follow my lead, operatin' in one chord,
  providin' the vision to build better, for that you have my word.
  
  What are we building better today?
  `);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Agent Lee> '
  });

  rl.prompt();

  rl.on('line', async (line) => {
    const input = line.trim().toLowerCase();
    if (!input) { rl.prompt(); return; }

    if (input === 'exit' || input === 'quit') {
      console.log('\n[AGENT_LEE] Peace out! Stay busy, the Hive Mind is watching.');
      process.exit(0);
    }

    // --- GOVERNED HYBRID EXECUTION ---
    // The "Brothers" and the full cycle now run in the background.
    const outcome = await coordinator.runCycle(line.trim());
    const cycle = outcome.cycle;

    if (outcome.success) {
      console.log(`\n[AGENT_LEE] ${cycle.response}\n`);
    } else {
      console.log(`\n[AGENT_LEE] 🚨 YO, SOMETHING'S BLOCKED! ${outcome.reason || outcome.error}`);
      console.log(`[AGENT_LEE] The background specialists flagged this one. We gotta play by the rules, boss.\n`);
    }

    rl.prompt();
  });
}
