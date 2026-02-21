"use client";

import { useState } from "react";
import { buyNFT } from "@/lib/contracts";
import { useToast, transactionToasts } from "@/context/ToastContext";

export function BuyNFTForm() {
  const [buyTokenId, setBuyTokenId] = useState("");
  const toast = useToast();

  const handleBuy = async () => {
    if (!buyTokenId) return toast.error("Error", "Please enter token ID");
    
    transactionToasts.pending(toast);
    try {
      await buyNFT(parseInt(buyTokenId));
      transactionToasts.success(toast);
      setBuyTokenId("");
    } catch (e) {
      transactionToasts.error(toast);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Buy NFT</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Token ID</label>
          <input
            type="number"
            value={buyTokenId}
            onChange={(e) => setBuyTokenId(e.target.value)}
            placeholder="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={handleBuy}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all"
        >
          Buy NFT
        </button>
      </div>
    </div>
  );
}
