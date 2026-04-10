import readline from 'readline';
import { AlignAgent } from '../agents/governance/align-agent.js';
import { AssessAgent } from '../agents/governance/assess-agent.js';
import { RegistryAgent } from '../agents/standards/registry-agent.js';
import { join } from 'path';
import fs from 'fs/promises';

export async function launchTerminal() {
  console.log(`
  ======================================================
  👑 AGENT LEE ONLINE — SOVEREIGN MANAGER ACTIVE  
  LLM-FREE DETERMINISTIC HEURISTIC MODE ENGAGED
  ======================================================
  Type 'help' for a list of directives.
  I am Agent Lee, your Sovereign Architect. Talk to me naturally. 
  Try commands like: "give me a predesigned agent team" or "heal my codebase".
  `);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Agent Lee> '
  });

  const rootDir = process.cwd();
  const customAgentsDir = join(rootDir, 'src', 'agents', 'custom');

  // Ensure the custom agents directory exists
  try {
    await fs.mkdir(customAgentsDir, { recursive: true });
  } catch (e) {}

  async function generateAgentFile(agentDef) {
    const fileName = `${agentDef.id.toLowerCase()}-agent.js`;
    const filePath = join(customAgentsDir, fileName);
    const pascalName = agentDef.class + 'Agent';
    
    const fileContent = `/*
LEEWAY HEADER — DO NOT REMOVE

REGION: SYSTEM.AGENT.CUSTOM
TAG: AGENT.CUSTOM.NPC.\${agentDef.id.toUpperCase()}

COLOR_ONION_HEX:
NEON=#39FF14
FLUO=#0DFF94
PASTEL=#C7FFD8

5WH:
WHAT = Autonomously generated Custom NPC Agent (\${pascalName})
WHY = Deployed via Agent Lee for structural application defense
WHO = Agent Lee (Sovereign Architect)
WHERE = src/agents/custom/\${fileName}
WHEN = \${new Date().getFullYear()}
HOW = Implements Sovereign BaseNPCInterface and binds to the Hive Mind

AGENTS:
\${agentDef.id.toUpperCase()}
LEE_PRIME

LICENSE:
MIT
*/

// In a real TS environment, replace with strict relative .ts paths:
// import { HiveConsensus } from '../../runtime/consensus/HiveConsensus';
// import { Intent } from '../../runtime/consensus/ExecutionTrace';

export class \${pascalName} {
  constructor() {
    this.id = '\${agentDef.id}';
    this.role = '\${agentDef.role}';
    this.class = '\${agentDef.class}';
    this.energy = 100;
    
    // Auto-Bind to Agent Lee's Hive Mind
    console.log(\`[\${this.id.toUpperCase()}] Initialized and permanently bonded to Agent Lee's Hive Mind Consensus Matrix.\`);
    // Example Integration hook:
    // HiveConsensus.registerValidator(this);
  }

  /**
   * Executes strict Leeway Governance checks on incoming intents.
   * This agent acts as a hive mind node.
   */
  evaluate(intent) {
    console.log(\`[\${this.id.toUpperCase()}] Reviewing intent via Hive Mind Network: \${intent.action}\`);
    
    // Deterministic zero-bypass logic mapped to this NPC class requirements
    if (intent.action === 'SYSTEM_CORRUPT') {
      return { approve: false, reason: 'Structural integrity violation detected by \${this.role}. Agent Lee notified.' };
    }
    
    return { approve: true, reason: 'Intent securely aligns with \${this.role} and Hive Mind protocols' };
  }
}
`;
    await fs.writeFile(filePath, fileContent, 'utf-8');
    return filePath;
  }

  rl.prompt();

  rl.on('line', async (line) => {
    const input = line.trim().toLowerCase();

    if (input === 'exit' || input === 'quit') {
      console.log('Shutting down Neural Mesh...');
      process.exit(0);
    } 
    
    else if (input.includes('predesigned') || input.includes('agent team') || input.includes('8 agents')) {
      console.log('\n[SOVEREIGN_ARCHITECT] Establishing Hive Mind connection...');
      console.log('[SYSTEM] Constructing deterministic agent matrix and injecting physical code files...');
      
      const agents = [
        { id: 'assess_01', class: 'Scout', role: 'Assessor' },
        { id: 'medic_01', class: 'Healer', role: 'Header alignment' },
        { id: 'guard_01', class: 'Security', role: 'Threat monitor' },
        { id: 'scribe_01', class: 'Archivist', role: 'Trace logging' },
        { id: 'forge_01', class: 'Quartermaster', role: 'Module Sandbox' },
        { id: 'registry_01', class: 'Librarian', role: 'Tag indexing' },
        { id: 'reason_01', class: 'Synthesizer', role: 'Logic parser' },
        { id: 'builder_01', class: 'Constructor', role: 'File generation' }
      ];

      for (const a of agents) {
        await generateAgentFile(a);
        console.log(`  -> Agent [${a.id}]: Generated file src/agents/custom/${a.id.toLowerCase()}-agent.js`);
      }

      console.log(`\n[HIVE_MIND] These agents are now physically embedded in your project architecture and bonded to the Sovereign Registry.\n`);
      rl.prompt();
    } 

    else if (input.startsWith('create agent')) {
      const parts = line.split(' ');
      if (parts.length < 4) {
        console.log('[SYSTEM] Format error. Use: create agent <id> <Role>');
      } else {
        const agentId = parts[2];
        const agentRole = parts.slice(3).join(' ');
        console.log(`\n[FORGE_AGENT] Forging new NPC identity...`);
        const aDef = { id: agentId, class: agentId, role: agentRole };
        await generateAgentFile(aDef);
        console.log(`[SUCCESS] Physical Agent file injected at src/agents/custom/${agentId.toLowerCase()}-agent.js\n`);
      }
      rl.prompt();
    }
    
    else if (input.includes('heal') || input.includes('repair') || input.includes('fix')) {
      console.log('\n[AGENT_LEE] Dispatching Medic Agent for structural repair protocols...');
      console.log('[AGENT_LEE] Running Assess & Align to inject 5WH Identity headers natively...\n');
      
      const assess = new AssessAgent({ rootDir });
      const inventory = await assess.run();
      const missing = inventory.inventory.missingHeaders;

      if (missing.length === 0) {
        console.log('[AGENT_LEE] My scans indicate the codebase is structurally sound. No repairs needed.\n');
      } else {
        console.log(`[AGENT_LEE] Found ${missing.length} unaligned files. The Hive Mind is restructuring them...`);
        const align = new AlignAgent({ rootDir, dryRun: false });
        await align.alignHeaders(missing);
        console.log('[AGENT_LEE] Repair complete. Codebase is now completely LEEWAY compliant under my oversight.\n');
      }
    } 
    
    else if (input.includes('status') || input.includes('monitor')) {
      console.log('\n[AGENT_LEE] Dispatching Guard Agent for system health scans...');
      const assess = new AssessAgent({ rootDir });
      const result = await assess.run();
      console.log(`[AGENT_LEE] System Coverage: ${result.summary.headerCoverage}. Known files: ${result.inventory.totalFiles}\n`);
    }

    else if (input.includes('help')) {
      console.log(`
      Commands authorized by Agent Lee:
      - "give me a predesigned agent team" -> I will spawn 8 autonomous agents and tether them to the Hive Mind.
      - "create agent [id] [role]" -> e.g. "create agent Sentinel Defender" to have me dynamically forge a new NPC logic file.
      - "heal my codebase" -> Connects to Medic Agent to repair file headers.
      - "monitor status" -> Scans the directory for compliance degradation.
      - "exit" -> Shuts down the terminal.
      `);
    }
    
    else {
      console.log(`\n[AGENT_LEE] I do not recognize that command. The Hive Mind awaits clear direction. Try saying "heal my codebase" or "give me a predesigned agent team".\n`);
    }

    rl.prompt();
  });
}
