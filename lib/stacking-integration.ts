// Stacking Integration
// Provides utilities for Stacks PoX stacking

export interface StackingInfo {
  stacker: string;
  amount: bigint;
  lockPeriod: number;
  unlockHeight: number;
}

export interface StackingCycle {
  cycleNumber: number;
  startHeight: number;
  endHeight: number;
}

export interface PoolInfo {
  poolAddress: string;
  poolName: string;
  rewardsAddress: string;
}

export class StackingClient {
  private network: string;
  
  constructor(network: string) {
    this.network = network;
  }
  
  async getStackingInfo(address: string): Promise<StackingInfo | null> {
    return null;
  }
}

export interface StackRequest {
  amount: bigint;
  lockPeriod: number;
  poxAddress: string;
}

export interface DelegateStackRequest {
  stacker: string;
  amount: bigint;
  lockPeriod: number;
}

export function calculateRewards(amount: bigint, cycles: number, rewardRate: number): bigint {
  return (amount * BigInt(cycles) * BigInt(rewardRate)) / 100n;
}

export function getMinimumStackAmount(network: string): bigint {
  return network === 'mainnet' ? 100000000n : 1000000n;
}

export function getMaximumLockPeriod(): number {
  return 12;
}

export interface StackingStatus {
  active: boolean;
  currentCycle: number;
  stackedAmount: bigint;
}

export class StackingManager {
  private address: string;
  
  constructor(address: string) {
    this.address = address;
  }
  
  async getStatus(): Promise<StackingStatus> {
    return { active: false, currentCycle: 0, stackedAmount: 0n };
  }
}

export interface DelegationInfo {
  delegate: string;
  stacker: string;
  amount: bigint;
}

export function validateStackRequest(request: StackRequest): boolean {
  if (request.amount <= 0n) return false;
  if (request.lockPeriod < 1 || request.lockPeriod > 12) return false;
  return true;
}

export function getCycleDuration(): number {
  return 2100;
}

export interface RewardAddress {
  hashbytes: string;
  version: number;
}

export function createRewardAddress(poxAddress: string): RewardAddress {
  return { hashbytes: poxAddress, version: 1 };
}

export const STACKING_ERRORS = {
  INSUFFICIENT_STX: 'Insufficient STX balance',
  BELOW_MINIMUM: 'Below minimum stacking amount',
  INVALID_LOCK_PERIOD: 'Invalid lock period',
} as const;

export interface StackingStats {
  totalStaked: bigint;
  totalStackers: number;
  rewardCycle: number;
}

export async function getStackingStats(network: string): Promise<StackingStats> {
  return { totalStaked: 0n, totalStackers: 0, rewardCycle: 0 };
}

export default {
  StackingClient,
  StackingManager,
  StackRequest,
  calculateRewards,
  validateStackRequest,
  getMinimumStackAmount,
};
