// Transaction Builder for Stacks Blockchain
// Provides utilities to construct and sign Stacks transactions

export interface TransactionOptions {
  network: 'mainnet' | 'testnet';
  fee?: number;
  nonce?: number;
}

export interface ContractCallOptions extends TransactionOptions {
  contractAddress: string;
  contractName: string;
  functionName: string;
  functionArgs: unknown[];
}

export interface TransferOptions extends TransactionOptions {
  recipient: string;
  amount: number;
  memo?: string;
}

export interface DeployContractOptions extends TransactionOptions {
  contractName: string;
  codeBody: string;
}

export class TransactionBuilder {
  private options: TransactionOptions;
  
  constructor(options: TransactionOptions) {
    this.options = options;
  }
  
  getNetwork(): string {
    return this.options.network;
  }
}

export class ContractCallBuilder extends TransactionBuilder {
  private callOptions: ContractCallOptions;
  
  constructor(options: ContractCallOptions) {
    super(options);
    this.callOptions = options;
  }
  
  getContractId(): string {
    return \`\${this.callOptions.contractAddress}.\${this.callOptions.contractName}\`;
  }
}

export interface PostCondition {
  type: 'stx' | 'ft' | 'nft';
  condition: 'eq' | 'gt' | 'gte' | 'lt' | 'lte';
  amount?: number;
}

export class PostConditionBuilder {
  private conditions: PostCondition[] = [];
  
  addSTXCondition(condition: PostCondition['condition'], amount: number): this {
    this.conditions.push({ type: 'stx', condition, amount });
    return this;
  }
  
  build(): PostCondition[] {
    return this.conditions;
  }
}

export interface TransactionSigner {
  sign(transaction: unknown): Promise<string>;
  getPublicKey(): string;
}

export interface BroadcastResult {
  txid: string;
  success: boolean;
  error?: string;
}

export class TransactionBroadcaster {
  private network: string;
  
  constructor(network: 'mainnet' | 'testnet') {
    this.network = network;
  }
  
  async broadcast(signedTx: string): Promise<BroadcastResult> {
    return { txid: 'mock-txid', success: true };
  }
}

export interface ClarityValue {
  type: string;
  value: unknown;
}

export function uint(value: number): ClarityValue {
  return { type: 'uint', value };
}

export function principal(value: string): ClarityValue {
  return { type: 'principal', value };
}

export function buffer(value: Uint8Array): ClarityValue {
  return { type: 'buffer', value };
}

export function stringAscii(value: string): ClarityValue {
  return { type: 'string-ascii', value };
}

export function stringUtf8(value: string): ClarityValue {
  return { type: 'string-utf8', value };
}

export interface TransactionEstimate {
  estimatedFee: number;
  estimatedTime: number;
}

export async function estimateTransaction(options: TransactionOptions): Promise<TransactionEstimate> {
  return { estimatedFee: 1000, estimatedTime: 600 };
}

export interface TransactionStatus {
  txid: string;
  status: 'pending' | 'success' | 'failed';
  blockHeight?: number;
}

export async function getTransactionStatus(txid: string): Promise<TransactionStatus> {
  return { txid, status: 'pending' };
}

export class BatchTransactionBuilder {
  private transactions: TransactionOptions[] = [];
  
  add(tx: TransactionOptions): this {
    this.transactions.push(tx);
    return this;
  }
  
  getCount(): number {
    return this.transactions.length;
  }
}

export interface TransactionError {
  code: string;
  message: string;
  txid?: string;
}

export const TX_ERRORS = {
  INSUFFICIENT_FUNDS: { code: 'ERR_INSUFFICIENT_FUNDS', message: 'Insufficient funds' },
  INVALID_NONCE: { code: 'ERR_INVALID_NONCE', message: 'Invalid nonce' },
} as const;

export function validateTransactionOptions(options: TransactionOptions): boolean {
  if (!options.network) return false;
  if (options.fee && options.fee < 0) return false;
  if (options.nonce && options.nonce < 0) return false;
  return true;
}

export interface AnchorMode {
  mode: 'onChainOnly' | 'offChainOnly' | 'any';
}

export const ANCHOR_MODES = {
  ON_CHAIN_ONLY: { mode: 'onChainOnly' as const },
  OFF_CHAIN_ONLY: { mode: 'offChainOnly' as const },
  ANY: { mode: 'any' as const },
};

export default {
  TransactionBuilder,
  ContractCallBuilder,
  PostConditionBuilder,
  TransactionBroadcaster,
  BatchTransactionBuilder,
  uint,
  principal,
  stringAscii,
  validateTransactionOptions,
};
