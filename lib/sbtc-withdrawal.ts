// sBTC Withdrawal Functionality
// Provides utilities for withdrawing sBTC from Stacks to Bitcoin

export interface WithdrawalRequest {
  amount: bigint;
  btcAddress: string;
  stxAddress: string;
}

export interface WithdrawalStatus {
  requestId: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  btcTxid?: string;
}

export interface WithdrawalRequestResult {
  requestId: string;
  success: boolean;
  error?: string;
}

export class SbtcWithdrawer {
  private sbtcContract: string;
  
  constructor(sbtcContract: string) {
    this.sbtcContract = sbtcContract;
  }
  
  async request(withdrawal: WithdrawalRequest): Promise<WithdrawalRequestResult> {
    return { requestId: 'mock-id', success: true };
  }
}

export function validateBtcAddress(address: string): boolean {
  return address.startsWith('bc1') || address.startsWith('1') || address.startsWith('3');
}

export function validateWithdrawalAmount(amount: bigint): boolean {
  return amount > 0n;
}

export interface WithdrawalFee {
  amount: bigint;
  percent: number;
}

export function calculateWithdrawalFee(amount: bigint, feePercent: number): WithdrawalFee {
  const fee = (amount * BigInt(feePercent)) / 100n;
  return { amount: fee, percent: feePercent };
}

export function calculateNetAmount(grossAmount: bigint, feePercent: number): bigint {
  return grossAmount - calculateWithdrawalFee(grossAmount, feePercent).amount;
}

export interface WithdrawalHistory {
  requestId: string;
  amount: bigint;
  btcAddress: string;
  timestamp: Date;
  status: string;
}

export class WithdrawalHistoryManager {
  private history: WithdrawalHistory[] = [];
  
  add(entry: WithdrawalHistory): void {
    this.history.push(entry);
  }
  
  getAll(): WithdrawalHistory[] {
    return this.history;
  }
}

export interface WithdrawalRequestOptions {
  fee?: number;
  nonce?: number;
  memo?: string;
}

export const MINIMUM_WITHDRAWAL = 10000n;
export const MAXIMUM_WITHDRAWAL = 100000000n;

export function validateWithdrawalLimits(amount: bigint): boolean {
  return amount >= MINIMUM_WITHDRAWAL && amount <= MAXIMUM_WITHDRAWAL;
}

export interface WithdrawalConfirmation {
  requestId: string;
  amount: bigint;
  btcAddress: string;
  fee: bigint;
  netAmount: bigint;
}

export function createConfirmation(request: WithdrawalRequest, fee: bigint): WithdrawalConfirmation {
  return {
    requestId: 'mock-id',
    amount: request.amount,
    btcAddress: request.btcAddress,
    fee,
    netAmount: request.amount - fee,
  };
}

export const WITHDRAWAL_ERRORS = {
  INVALID_BTC_ADDRESS: 'Invalid Bitcoin address',
  AMOUNT_TOO_LOW: 'Amount below minimum',
  AMOUNT_TOO_HIGH: 'Amount above maximum',
  INSUFFICIENT_BALANCE: 'Insufficient sBTC balance',
} as const;

export interface WithdrawalProgress {
  status: WithdrawalStatus['status'];
  confirmations: number;
  requiredConfirmations: number;
}

export async function getWithdrawalProgress(requestId: string): Promise<WithdrawalProgress> {
  return { status: 'pending', confirmations: 0, requiredConfirmations: 6 };
}

export default {
  SbtcWithdrawer,
  WithdrawalHistoryManager,
  calculateWithdrawalFee,
  calculateNetAmount,
  validateWithdrawalLimits,
  validateBtcAddress,
};
