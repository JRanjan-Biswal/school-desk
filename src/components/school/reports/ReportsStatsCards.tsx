
import { Card } from "@/components/ui/card";
import { FileText, Calendar, TrendingUp, BarChart3 } from "lucide-react";

interface ReportsStatsCardsProps {
  reportData: {
    totalReports: number;
    monthlyReports: number;
    pendingReports: number;
    automatedReports: number;
  };
}

const ReportsStatsCards = ({ reportData }: ReportsStatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <Card className="p-4 sm:p-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-sm sm:text-lg font-semibold text-gray-900">Total Reports</h3>
            <p className="text-2xl sm:text-3xl font-bold text-purple-600">{reportData.totalReports}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 sm:p-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm sm:text-lg font-semibold text-gray-900">This Month</h3>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600">{reportData.monthlyReports}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 sm:p-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
          </div>
          <div>
            <h3 className="text-sm sm:text-lg font-semibold text-gray-900">Pending</h3>
            <p className="text-2xl sm:text-3xl font-bold text-yellow-600">{reportData.pendingReports}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 sm:p-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-sm sm:text-lg font-semibold text-gray-900">Automated</h3>
            <p className="text-2xl sm:text-3xl font-bold text-green-600">{reportData.automatedReports}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ReportsStatsCards;
