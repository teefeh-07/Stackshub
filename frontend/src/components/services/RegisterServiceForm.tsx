"use client";

import { useState } from "react";
import { registerService } from "@/lib/contracts";

export function RegisterServiceForm() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleRegister = async () => {
    if (!title || !price) return alert("Please fill all fields");
    const val = parseFloat(price);
    if (isNaN(val) || val <= 0) return alert("Price must be positive");

    setIsPending(true);
    try {
      const priceInMicrostacks = val * 1000000;
      await registerService(title, priceInMicrostacks);
      setTitle("");
      setPrice("");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Register Service</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Web Development"
            maxLength={64}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price (STX)</label>
          <div className="relative">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="100"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <button 
              className="absolute right-2 top-2 text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded hover:bg-orange-200"
              onClick={() => alert("Market price fetcher unimplemented")}
            >
              ESTIMATE
            </button>
          </div>
        </div>
        <div className="p-3 bg-orange-50 rounded-lg">
          <div className="flex justify-between text-sm">
            <span className="text-orange-800">Listing Fee</span>
            <span className="text-orange-900 font-medium">2.5 STX</span>
          </div>
        </div>
        <button
          onClick={handleRegister}
          disabled={isPending}
          className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 text-white py-3 rounded-lg font-medium hover:from-orange-700 hover:to-yellow-700 transition-all disabled:opacity-50"
        >
          {isPending ? "Registering..." : "Register Service (2.5 STX)"}
        </button>
      </div>
    </div>
  );
}
