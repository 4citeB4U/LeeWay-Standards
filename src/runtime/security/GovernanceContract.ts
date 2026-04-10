import * as crypto from 'crypto';

export class GovernanceContract {
  /**
   * Verifies the SHA-256 signature of a code module against an expected signature.
   * Throws an error if the signature does not match.
   */
  public static verifyModuleSignature(moduleId: string, sourceCode: string, expectedSignature: string): boolean {
    const hash = crypto.createHash('sha256').update(sourceCode).digest('hex');

    if (hash !== expectedSignature) {
      console.error(`[GovernanceContract] Signature Mismatch for module ${moduleId}. Expected ${expectedSignature}, got ${hash}.`);
      throw new Error(`SECURITY EXCEPTION: Module ${moduleId} failed Governance Contract signature validation. Execution blocked.`);
    }

    console.log(`[GovernanceContract] Module ${moduleId} verified successfully.`);
    return true;
  }
}
