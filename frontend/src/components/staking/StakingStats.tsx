export function StakingStats() {
  return (
    <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Your Stake</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-sm text-green-600">Staked Amount</div>
          <div className="text-2xl font-bold text-green-900">0 STX</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-sm text-blue-600">Lock Status</div>
          <div className="text-2xl font-bold text-blue-900">-</div>
        </div>
      </div>
    </div>
  );
}

export function FeeStructure() {
  return (
    <div className="mt-8 bg-green-50 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-green-900 mb-2">Fee Structure</h3>
      <div className="grid md:grid-cols-2 gap-4 text-green-800">
        <div className="bg-white rounded-lg p-4">
          <div className="font-medium">Normal Withdrawal</div>
          <div className="text-2xl font-bold">0.5%</div>
          <div className="text-sm">After ~1 day lock period</div>
        </div>
        <div className="bg-white rounded-lg p-4">
          <div className="font-medium">Early Withdrawal</div>
          <div className="text-2xl font-bold">2.5%</div>
          <div className="text-sm">Before lock period ends</div>
        </div>
      </div>
    </div>
  );
}
