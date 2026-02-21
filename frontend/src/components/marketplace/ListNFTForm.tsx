"use client";

import { useState } from "react";
import { listNFT } from "@/lib/contracts";
import { useToast, transactionToasts } from "@/context/ToastContext";

export function ListNFTForm() {
  const [listTokenId, setListTokenId] = useState("");
  const [listPrice, setListPrice] = useState("");
  const toast = useToast();

  const handleList = async () => {
    if (!listTokenId || !listPrice) return toast.error("Error", "Please fill all fields");
    
    transactionToasts.pending(toast);
    try {
      await listNFT(parseInt(listTokenId), parseInt(listPrice) * 1000000);
      transactionToasts.success(toast);
      setListTokenId("");
      setListPrice("");
    } catch (e) {
      transactionToasts.error(toast);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">List for Sale</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Token ID</label>
          <input
            type="number"
            value={listTokenId}
            onChange={(e) => setListTokenId(e.target.value)}
            placeholder="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price (STX)</label>
          <input
            type="number"
            value={listPrice}
            onChange={(e) => setListPrice(e.target.value)}
            placeholder="10"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={handleList}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all"
        >
          List NFT
        </button>
      </div>
    </div>
  );
}
