
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface SubjectPerformance {
  subject: string;
  averageScore: number;
  totalTests: number;
  trend: "up" | "down" | "stable";
  lastScore: number;
}

interface SubjectAnalysisProps {
  subjectPerformance: SubjectPerformance[];
}

const SubjectAnalysis = ({ subjectPerformance }: SubjectAnalysisProps) => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="text-green-500" size={16} />;
      case "down": return <TrendingDown className="text-red-500" size={16} />;
      default: return <div className="w-4 h-4 bg-gray-300 rounded-full"></div>;
    }
  };

  return (
    <Card className="p-4 sm:p-6 bg-white border border-gray-200 shadow-sm">
      <h3 className="text-lg sm:text-xl font-semibold mb-4 text-purple-600">Subject-wise Analysis</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4">
        {subjectPerformance.map((subject, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-medium text-gray-900 text-sm sm:text-base truncate pr-2">{subject.subject}</h4>
              <div className="flex-shrink-0">{getTrendIcon(subject.trend)}</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600">Average:</span>
                <span className="font-semibold">{subject.averageScore}%</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600">Tests:</span>
                <span>{subject.totalTests}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600">Last Score:</span>
                <span className="font-semibold">{subject.lastScore}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SubjectAnalysis;
