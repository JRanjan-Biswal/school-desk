
interface FeeStatsCardsProps {
  totalFees: number;
  totalPaid: number;
  totalPending: number;
}

const FeeStatsCards = ({ totalFees, totalPaid, totalPending }: FeeStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900">Total Fees</h3>
        <p className="text-3xl font-bold text-purple-600">₹{totalFees.toLocaleString()}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900">Collected</h3>
        <p className="text-3xl font-bold text-green-600">₹{totalPaid.toLocaleString()}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900">Pending</h3>
        <p className="text-3xl font-bold text-red-600">₹{totalPending.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default FeeStatsCards;
