"use client";

import { useWallet } from "@/context/WalletContext";
import { StakingForm } from "@/components/staking/StakingForm";
import { UnstakeForm } from "@/components/staking/UnstakeForm";
import { StakingStats, FeeStructure } from "@/components/staking/StakingStats";

/**
 * Staking Vault Page.
 * Users can stake STX to earn rewards and request unstaking.
 * Interacts with `serenehub-staking-vault`.
 */
export default function StakingPage() {
  const { connected } = useWallet();

  if (!connected) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Staking Vault</h1>
        <p className="text-gray-600">Please connect your wallet to stake STX</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">🏦 Staking Vault</h1>
      <p className="text-gray-600 mb-8">Stake your STX with minimal withdrawal fees</p>

      <div className="grid md:grid-cols-2 gap-6">
        <StakingForm />
        <UnstakeForm />
      </div>

      <StakingStats />
      <FeeStructure />
    </div>
  );
}
