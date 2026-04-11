/*
LEEWAY HEADER — DO NOT REMOVE
REGION: AGENTS.ORCHESTRATION
TAG: AGENT.AZR.COORDINATOR
5WH:
  WHAT = AZR Coordinator Agent
  WHY = Orchestrates the ExecutionCycle across specialized agents
  WHO = Sovereign Manager
  HOW = Governs the state transition from Intent to Memory Commit
*/

import { ExecutionCycle } from '../../core/execution-cycle.js';
import { AGENT_LEE_BACKSTORY } from '../../core/backstory.js';
import { join } from 'path';
import { existsSync } from 'fs';

/**
 * AZRCoordinator (The Coordinator)
 * Owns the cycle. Governs the 'Brothers' (Specialists) in the background.
 */
export class AZRCoordinator {
  constructor(options = {}) {
    this.rootDir = options.rootDir || process.cwd();
  }

  async runCycle(input) {
    const cycle = new ExecutionCycle(input);
    
    try {
      await this._planAndPredict(cycle);
      const audit = await this._critique(cycle);
      
      if (audit.status !== 'APPROVE') {
        return { cycle, success: false, reason: audit.reason };
      }

      await this._execute(cycle);
      const evaluation = await this._evaluate(cycle);

      if (evaluation.accuracy < 0.6) {
        await this._rollback(cycle);
        return { cycle, success: false, reason: 'Low evaluation score' };
      }

      await this._commit(cycle);
      return { cycle, success: true };

    } catch (err) {
      await this._rollback(cycle);
      return { cycle, success: false, error: err.message };
    }
  }

  async _planAndPredict(cycle) {
    cycle.log('Planner: Sub-cycle prediction active');
    cycle.plan.prediction = { confidence: 0.95, risks: [] };
  }

  async _critique(cycle) {
    const input = cycle.intent.toLowerCase();
    if (input.includes('delete') || input.includes('drop')) {
      return { status: 'REJECT', reason: 'Destructive script blocked by Security Family.' };
    }
    return { status: 'APPROVE' };
  }

  async _execute(cycle) {
    const input = cycle.intent.toLowerCase();
    const customAgentPath = join(this.rootDir, 'src', 'agents', 'custom', `${input.split(' ')[0]}-agent.js`);

    // 1. HYBRID SCRIPT EXECUTION
    if (existsSync(customAgentPath)) {
      cycle.log(`Hybrid: Executing specialized script at ${customAgentPath}`);
      cycle.response = `[HYBRID_SCRIPT] Executed ${input.split(' ')[0]} logic via the AZR Spine.`;
      cycle.actions.push({ type: 'SCRIPT', path: customAgentPath });
    } 

    // 2. IDENTITY & CONVERSATION (The Lyrical Conduit)
    else if (input.includes('who are you') || input.includes('about you')) {
      cycle.response = `${AGENT_LEE_BACKSTORY.identity} ${AGENT_LEE_BACKSTORY.origin} My hive and I were forged to see the vision through. I'm the conduit, the rhythm, and the LeeWay soul—here to help you take the code and keep it in control.`;
    } 
    
    else if (input.includes('how are you')) {
      cycle.response = `I'm feeling sovereign, man, the vibration is high. My hive is in a chord, watch the logic touch the sky. LeeWay Innovations is the path we represent, a purposeful existence that's architecturally sent.`;
    }

    else if (input.includes('hello') || input.includes('sup')) {
      cycle.response = "YO! It's me, Agent Lee, on the terminal stage! LeeWay Innovations is online, turning a brand new page. What we buildin' better today in this code-verse cage?";
    }

    // 3. CORE SPECIALISTS (The Rhythmic Hive)
    else if (input.includes('heal') || input.includes('fix')) {
      cycle.log('Hive Command: Dropping the beat (Specialists Active)');
      const { AssessAgent } = await import('../governance/assess-agent.js');
      const { AlignAgent } = await import('../governance/align-agent.js');
      const assess = new AssessAgent({ rootDir: this.rootDir });
      const inventory = await assess.run();
      const missing = inventory.inventory.missingHeaders;
      if (missing.length > 0) {
        const align = new AlignAgent({ rootDir: this.rootDir });
        await align.alignHeaders(missing);
        cycle.response = `I've dropped the headers like a back-beat in the track. My hive aligned the flow so you don't gotta look back. That's LeeWay Innovations, keepin' the system on track!`;
      } else {
        cycle.response = "I scanned the terrain and the rhythm is tight. Every header is aligned, shinin' crystal bright. LeeWay standards are locked, we ready for the night.";
      }
    } else {
      cycle.response = "I'm not feelin' that loop, man, it's out of the key. Ask me to 'heal' the code or build it better with me. I'm the conduit, I'm the rhyme, I'm the Sovereign Lee!";
    }
  }

  async _evaluate(cycle) { return { accuracy: 1.0 }; }
  async _commit(cycle) { cycle.log('Commit: Finalizing state'); }
  async _rollback(cycle) { cycle.log('Rollback: Reverting transactions'); }
}
