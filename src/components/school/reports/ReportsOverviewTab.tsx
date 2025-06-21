
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, TrendingUp, DollarSign } from "lucide-react";

interface ReportsOverviewTabProps {
  onGenerateQuickReport: (type: string) => void;
}

const ReportsOverviewTab = ({ onGenerateQuickReport }: ReportsOverviewTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      <Card className="p-6 border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Attendance Reports</h3>
        </div>
        <p className="text-gray-600 mb-4 text-sm">Daily, weekly, and monthly attendance summaries</p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onGenerateQuickReport("Attendance")}
          className="w-full"
        >
          Generate Now
        </Button>
      </Card>

      <Card className="p-6 border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Academic Performance</h3>
        </div>
        <p className="text-gray-600 mb-4 text-sm">Exam results and performance analysis</p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onGenerateQuickReport("Academic Performance")}
          className="w-full"
        >
          Generate Now
        </Button>
      </Card>

      <Card className="p-6 border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <DollarSign className="w-5 h-5 text-yellow-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Fee Collection</h3>
        </div>
        <p className="text-gray-600 mb-4 text-sm">Payment summaries and pending fees</p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onGenerateQuickReport("Fee Collection")}
          className="w-full"
        >
          Generate Now
        </Button>
      </Card>
    </div>
  );
};

export default ReportsOverviewTab;
