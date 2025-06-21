
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ScheduleAndGradesProps {
  todaySchedule: Array<{ time: string; subject: string; teacher: string }>;
  recentGrades: Array<{ subject: string; score: number; grade: string; date: string }>;
}

const ScheduleAndGrades = ({ todaySchedule, recentGrades }: ScheduleAndGradesProps) => {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'A':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'B+':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'B':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'C':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6 bg-white border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-purple-600">Today's Schedule</h3>
        <div className="space-y-3">
          {todaySchedule.map((schedule, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900">{schedule.time}</p>
                <p className="text-sm text-gray-600">{schedule.subject}</p>
              </div>
              <p className="text-sm text-gray-600 flex-shrink-0">{schedule.teacher}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-white border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-purple-600">Recent Grades</h3>
        <div className="space-y-3">
          {recentGrades.map((grade, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{grade.subject}</p>
                <p className="text-sm text-gray-600">{grade.date}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <Badge className={`mb-1 border ${getGradeColor(grade.grade)}`}>
                  {grade.grade}
                </Badge>
                <p className="text-sm text-gray-600">{grade.score}%</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ScheduleAndGrades;
