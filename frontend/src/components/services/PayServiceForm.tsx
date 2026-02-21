"use client";

import { useState } from "react";
import { payForService } from "@/lib/contracts";

export function PayServiceForm() {
  const [serviceId, setServiceId] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handlePay = async () => {
    if (!serviceId) return alert("Please enter service ID");
    const id = parseInt(serviceId);
    if (isNaN(id) || id < 0) return alert("Invalid Service ID");
    
    setIsPending(true);
    try {
      await payForService(id);
      setServiceId("");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Pay for Service</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service ID</label>
          <input
            type="number"
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            placeholder="1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div className="p-3 bg-green-50 rounded-lg">
          <div className="flex justify-between text-sm">
            <span className="text-green-800">Platform Fee</span>
            <span className="text-green-900 font-medium">1.5%</span>
          </div>
        </div>
        <button
          onClick={handlePay}
          disabled={isPending}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50"
        >
          {isPending ? "Processing..." : "Pay for Service"}
        </button>
      </div>
    </div>
  );
}
