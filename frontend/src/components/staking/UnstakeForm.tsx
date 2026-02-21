"use client";

import { useState } from "react";
import { requestUnstake } from "@/lib/contracts";
import { toMicroStx } from "@/lib/utils";

export function UnstakeForm() {
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleUnstake = async () => {
    if (!unstakeAmount) return alert("Please enter amount");
    const val = parseFloat(unstakeAmount);
    if (isNaN(val) || val <= 0) return alert("Amount must be positive");

    setIsPending(true);
    try {
      const amount = toMicroStx(val);
      await requestUnstake(amount);
      setUnstakeAmount("");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Request Unstake</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount (STX)</label>
          <input
            type="number"
            value={unstakeAmount}
            onChange={(e) => setUnstakeAmount(e.target.value)}
            placeholder="50"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={handleUnstake}
          disabled={isPending}
          className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 text-white py-3 rounded-lg font-medium hover:from-orange-700 hover:to-yellow-700 transition-all disabled:opacity-50"
        >
          {isPending ? "Requesting..." : "Request Unstake"}
        </button>
      </div>
    </div>
  );
}
