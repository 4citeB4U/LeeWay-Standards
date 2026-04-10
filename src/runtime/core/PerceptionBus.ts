import { UnifiedExecutionLayer } from './UnifiedExecutionLayer';

export class PerceptionBus {
  private static instance: PerceptionBus;
  private isProcessing: boolean = false;
  private queue: Array<{rawIntent: any, owner: string}> = [];

  private constructor() {}

  public static getInstance(): PerceptionBus {
    if (!PerceptionBus.instance) {
      PerceptionBus.instance = new PerceptionBus();
    }
    return PerceptionBus.instance;
  }

  /**
   * Intakes an intent and adds it to the synchronous processing queue.
   */
  public push(rawIntent: any, owner: string = 'SYSTEM'): void {
    const timestampedIntent = {
      ...rawIntent,
      timestamp: rawIntent.timestamp || Date.now()
    };
    this.queue.push({ rawIntent: timestampedIntent, owner });
    this.processQueue();
  }

  /**
   * Serializes environment interaction deterministically.
   */
  private async processQueue(): Promise<void> {
    if (this.isProcessing || this.queue.length === 0) return;

    this.isProcessing = true;
    const item = this.queue.shift();

    if (item) {
      try {
        await UnifiedExecutionLayer.getInstance().execute(item.rawIntent, item.owner);
      } catch (error) {
        console.error(`[PerceptionBus] Intent processing failed for owner ${item.owner}.`, error);
      }
    }

    this.isProcessing = false;
    
    // Process next item recursively
    if (this.queue.length > 0) {
      this.processQueue();
    }
  }
}
