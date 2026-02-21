"use client";

import { useWallet } from "@/context/WalletContext";
import { CreateTokenForm } from "@/components/launchpad/CreateTokenForm";
import { TokenFeatures } from "@/components/launchpad/TokenFeatures";

/**
 * Token Launchpad Page.
 * Allows users to create new SIP-010 fungible tokens.
 */
export default function LaunchpadPage() {
  const { connected } = useWallet();

  if (!connected) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Token Launchpad</h1>
        <p className="text-gray-600">Please connect your wallet to launch tokens</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">🚀 Token Launchpad</h1>
      <p className="text-gray-600 mb-8">Launch your own token on Stacks for just 5 STX</p>

      <CreateTokenForm />
      <TokenFeatures />
    </div>
  );
}
