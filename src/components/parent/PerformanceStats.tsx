
import { Card } from "@/components/ui/card";
import { Award, Target, BookOpen, TrendingUp } from "lucide-react";

interface PerformanceStatsProps {
  stats: {
    overallAverage: number;
    rank: number;
    totalStudents: number;
    improvement: number;
    strongestSubject: string;
    weakestSubject: string;
  };
}

const PerformanceStats = ({ stats }: PerformanceStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      <Card className="p-4 sm:p-5 lg:p-6 bg-white border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Award className="text-purple-600" size={16} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Overall Average</p>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600">{stats.overallAverage}%</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 sm:p-5 lg:p-6 bg-white border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Target className="text-blue-600" size={16} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Class Rank</p>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">{stats.rank}/{stats.totalStudents}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 sm:p-5 lg:p-6 bg-white border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <BookOpen className="text-green-600" size={16} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Strongest Subject</p>
            <p className="text-sm sm:text-base lg:text-lg font-bold text-green-600 truncate">{stats.strongestSubject}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 sm:p-5 lg:p-6 bg-white border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <TrendingUp className="text-orange-600" size={16} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Improvement</p>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-600">
              {stats.improvement > 0 ? "+" : ""}{stats.improvement}%
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PerformanceStats;
