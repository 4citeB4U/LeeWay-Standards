import * as vm from 'vm';
import { GovernanceContract } from '../GovernanceContract';
import * as fs from 'fs/promises';

export class ModuleLoaderAgent {
  /**
   * Lazy-loads an external module into an isolated, sandbox-guarded environment.
   */
  public static async loadModule(moduleId: string, filePath: string, expectedSignature: string): Promise<any> {
    console.log(`[ModuleLoaderAgent] Attempting to load module from ${filePath}`);
    
    // 1. Read the source code
    let sourceCode: string;
    try {
      sourceCode = await fs.readFile(filePath, 'utf-8');
    } catch (error) {
       throw new Error(`Failed to read module file at ${filePath}.`);
    }

    // 2. Pass through the Governance Contract
    GovernanceContract.verifyModuleSignature(moduleId, sourceCode, expectedSignature);

    // 3. Create isolated sandbox environment
    const sandboxContext = {
      module: { exports: {} },
      exports: {},
      console: {
        log: (...args: any[]) => console.log(`[Sandbox ${moduleId}]`, ...args),
        error: (...args: any[]) => console.error(`[Sandbox ${moduleId}]`, ...args)
      },
      Buffer, // Allow basic operations if needed, but restrict fs/child_process
    };
    
    vm.createContext(sandboxContext);

    // 4. Execute script within the sandbox
    try {
      const script = new vm.Script(sourceCode);
      script.runInContext(sandboxContext, { timeout: 1000 }); // Prevent infinite loops
      
      console.log(`[ModuleLoaderAgent] Moduled loaded and sandboxed successfully: ${moduleId}`);
      return sandboxContext.module.exports;
    } catch (error) {
      console.error(`[ModuleLoaderAgent] Sandbox execution failed for module ${moduleId}.`);
      throw error;
    }
  }
}
