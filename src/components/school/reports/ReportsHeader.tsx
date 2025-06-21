
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

interface ReportsHeaderProps {
  onGenerateReport: () => void;
}

const ReportsHeader = ({ onGenerateReport }: ReportsHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600 mt-1">Generate and manage school reports</p>
      </div>
      <Button 
        onClick={onGenerateReport}
        className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
      >
        <BarChart3 className="w-4 h-4 mr-2" />
        Generate Report
      </Button>
    </div>
  );
};

export default ReportsHeader;
