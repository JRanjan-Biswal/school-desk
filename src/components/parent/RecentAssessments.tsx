
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface GradeRecord {
  id: string;
  subject: string;
  score: number;
  maxScore: number;
  grade: string;
  date: string;
  examType: string;
  remarks: string;
}

interface RecentAssessmentsProps {
  gradeRecords: GradeRecord[];
}

const RecentAssessments = ({ gradeRecords }: RecentAssessmentsProps) => {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+": return "bg-green-100 text-green-800 border-green-200";
      case "A": return "bg-blue-100 text-blue-800 border-blue-200";
      case "B+": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "B": return "bg-orange-100 text-orange-800 border-orange-200";
      case "C": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className="p-4 sm:p-6 bg-white border border-gray-200 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-purple-600">Recent Assessments</h3>
        <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50 self-start sm:self-center">
          View All Grades
        </Button>
      </div>
      
      <div className="space-y-3 max-h-80 sm:max-h-96 overflow-y-auto">
        {gradeRecords.slice(0, 10).map((record, index) => (
          <div key={index} className="flex flex-col lg:flex-row lg:justify-between lg:items-center p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-100 gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{record.subject}</p>
                <span className="text-xs text-gray-500 hidden sm:inline">•</span>
                <p className="text-xs sm:text-sm text-gray-600">{record.examType}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600">
                <span>{new Date(record.date).toLocaleDateString()}</span>
                <span className="hidden sm:inline">•</span>
                <span>{record.score}/{record.maxScore}</span>
                <span className="hidden md:inline">•</span>
                <span className="text-xs">{record.remarks}</span>
              </div>
            </div>
            <div className="flex items-center justify-between lg:justify-end gap-3 self-start lg:self-center">
              <Badge className={`border ${getGradeColor(record.grade)} text-xs flex-shrink-0`}>
                {record.grade}
              </Badge>
              <span className="text-sm font-semibold text-gray-700 flex-shrink-0">
                {Math.round((record.score / record.maxScore) * 100)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentAssessments;
