"use client";

import { useWallet } from "@/context/WalletContext";
import { ServicesInfo } from "@/components/services/ServicesInfo";
import { RegisterServiceForm } from "@/components/services/RegisterServiceForm";
import { PayServiceForm } from "@/components/services/PayServiceForm";

/**
 * Service Registry Page.
 * Allows providers to register services and users to pay for them.
 * Interacts with `serenehub-service-registry` contract.
 */
export default function ServicesPage() {
  const { connected } = useWallet();

  if (!connected) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Service Registry</h1>
        <p className="text-gray-600">Please connect your wallet to access services</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">🛠️ Service Registry</h1>
      <p className="text-gray-600 mb-8">Offer and pay for services on-chain</p>

      <div className="grid md:grid-cols-2 gap-6">
        <RegisterServiceForm />
        <PayServiceForm />
      </div>

      {/* Services List Placeholder */}
      <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Available Services</h2>
        <div className="text-center py-8 text-gray-500">
          <p>No services listed yet. Be the first to offer your services!</p>
        </div>
      </div>

      {/* Info Section */}
      <ServicesInfo />
    </div>
  );
}
