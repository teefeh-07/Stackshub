"use client";

import { useState } from "react";
import { stakeSTX } from "@/lib/contracts";
import { toMicroStx } from "@/lib/utils";

export function StakingForm() {
  const [stakeAmount, setStakeAmount] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleStake = async () => {
    if (!stakeAmount) return alert("Please enter amount");
    const val = parseFloat(stakeAmount);
    if (isNaN(val) || val <= 0) return alert("Amount must be positive");
    
    setIsPending(true);
    try {
      const amount = toMicroStx(val);
      await stakeSTX(amount);
      setStakeAmount("");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Stake STX</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount (STX)</label>
          <div className="relative">
            <input
              type="number"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              placeholder="100"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button 
              className="absolute right-2 top-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200"
              onClick={() => alert("Insufficient balance loaded")} // Placeholder behavior
            >
              MAX
            </button>
          </div>
        </div>
        <button
          onClick={handleStake}
          disabled={isPending}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50"
        >
          {isPending ? "Staking..." : "Stake STX"}
        </button>
      </div>
    </div>
  );
}
