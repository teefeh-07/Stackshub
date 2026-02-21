"use client";

import { useState } from "react";
import { mintNFT } from "@/lib/contracts";
import { useToast, transactionToasts } from "@/context/ToastContext";

export function MintNFTForm() {
  const [mintUri, setMintUri] = useState("");
  const toast = useToast();

  const handleMint = async () => {
    if (!mintUri) return toast.error("Error", "Please enter IPFS URI");
    
    transactionToasts.pending(toast);
    try {
      await mintNFT(mintUri);
      transactionToasts.success(toast);
      setMintUri("");
    } catch (e) {
      transactionToasts.error(toast);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Mint NFT</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">IPFS URI</label>
          <input
            type="text"
            value={mintUri}
            onChange={(e) => setMintUri(e.target.value)}
            placeholder="ipfs://Qm..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={handleMint}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
        >
          Mint NFT
        </button>
      </div>
    </div>
  );
}
