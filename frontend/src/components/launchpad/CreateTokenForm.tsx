"use client";

import { useState } from "react";
import { createToken } from "@/lib/contracts";
import { useToast, transactionToasts } from "@/context/ToastContext";

/**
 * Form component for creating new SIP-010 tokens.
 * Handles input state, validation, and contract interaction.
 */
export function CreateTokenForm() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState("6");
  const [supply, setSupply] = useState("");
  const [isPending, setIsPending] = useState(false);
  const toast = useToast();

  const handleCreate = async () => {
    if (!name || !symbol || !supply) return toast.error("Error", "Please fill all fields");
    
    transactionToasts.pending(toast);
    setIsPending(true);
    try {
        const totalSupply = parseInt(supply) * Math.pow(10, parseInt(decimals));
        await createToken(name, symbol, parseInt(decimals), totalSupply);
        transactionToasts.success(toast);
        setName("");
        setSymbol("");
        setSupply("");
    } catch (e) {
      transactionToasts.error(toast);
    } finally {
        setIsPending(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Token</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Token Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="My Token"
            maxLength={32}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">Max 32 characters</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Symbol</label>
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            placeholder="MTK"
            maxLength={10}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">Max 10 characters</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Decimals</label>
          <select
            value={decimals}
            onChange={(e) => setDecimals(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="0">0</option>
            <option value="6">6 (Recommended)</option>
            <option value="8">8</option>
            <option value="18">18</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Initial Supply</label>
          <input
            type="number"
            value={supply}
            onChange={(e) => setSupply(e.target.value)}
            placeholder="1000000"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-blue-900 font-medium">Creation Fee</span>
          <span className="text-blue-900 font-bold">5 STX</span>
        </div>
      </div>

      <button
        onClick={handleCreate}
        disabled={isPending}
        className="w-full mt-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-cyan-700 transition-all disabled:opacity-50"
      >
        {isPending ? "Creating Token..." : "Create Token (5 STX)"}
      </button>
    </div>
  );
}
