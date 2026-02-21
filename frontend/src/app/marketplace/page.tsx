"use client";

import { useWallet } from "@/context/WalletContext";
import { MintNFTForm } from "@/components/marketplace/MintNFTForm";
import { ListNFTForm } from "@/components/marketplace/ListNFTForm";
import { BuyNFTForm } from "@/components/marketplace/BuyNFTForm";
import { PageContainer } from "@/components/layout/PageContainer";

/**
 * NFT Marketplace Page.
 * - Mint new NFTs
 * - List owned NFTs for sale
 * - Buy listed NFTs
 */
export default function MarketplacePage() {
  const { connected } = useWallet();

  if (!connected) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">NFT Marketplace</h1>
        <p className="text-gray-600">Please connect your wallet to access the marketplace</p>
      </div>
    );
  }

  return (
    <PageContainer maxWidth="max-w-6xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">🎨 NFT Marketplace</h1>
      <p className="text-gray-600 mb-8">Mint, list, and trade NFTs with only 1.25% platform fee</p>

      <div className="grid md:grid-cols-3 gap-6">
        <MintNFTForm />
        <ListNFTForm />
        <BuyNFTForm />
      </div>

      {/* Info Section */}
      <div className="mt-12 bg-purple-50 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-purple-900 mb-2">How it works</h3>
        <ul className="text-purple-800 space-y-2">
          <li>• Upload your image to IPFS (use Pinata, NFT.Storage, etc.)</li>
          <li>• Mint your NFT with the IPFS URI</li>
          <li>• List it for sale at your desired price</li>
          <li>• When sold, 1.25% goes to the platform, rest to you</li>
        </ul>
      </div>
    </PageContainer>
  );
}
