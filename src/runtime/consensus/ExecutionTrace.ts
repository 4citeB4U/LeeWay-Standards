export type TraceID = string;

export interface Intent {
  id: string;
  action: string;
  payload: Record<string, any>;
  timestamp: number;
}

export interface ValidatorSignature {
  validatorId: string;
  signature: string;
  vote: 'APPROVE' | 'REJECT';
  timestamp: number;
  reasoning?: string;
}

export interface ExecutionTraceParams {
  traceId: TraceID;
  intent: Intent;
  owner: string;
  validators: ValidatorSignature[];
}

export class ExecutionTrace {
  public readonly traceId: TraceID;
  public readonly intent: Intent;
  public readonly owner: string;
  public readonly validators: ValidatorSignature[];
  public readonly createdAt: number;

  constructor(params: ExecutionTraceParams) {
    this.traceId = params.traceId;
    this.intent = params.intent;
    this.owner = params.owner;
    this.validators = params.validators || [];
    this.createdAt = Date.now();
  }

  public get isFullyValidated(): boolean {
    return this.validators.length > 0 && this.validators.every(v => v.vote === 'APPROVE');
  }
}
