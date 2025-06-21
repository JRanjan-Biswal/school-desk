
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StudentPerformanceData {
  id: number;
  name: string;
  class: string;
  lastScore: number;
  trend: "up" | "down";
}

interface StudentPerformanceProps {
  students: StudentPerformanceData[];
}

const StudentPerformance = ({ students }: StudentPerformanceProps) => {
  return (
    <Card className="p-4 md:p-6 bg-white border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-purple-600">Student Performance Alerts</h3>
      <div className="space-y-3">
        {students.map((student) => (
          <div key={student.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-gray-50 rounded-lg border border-gray-100 gap-2">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">{student.name}</p>
              <p className="text-sm text-gray-600">{student.class} - Score: {student.lastScore}%</p>
            </div>
            <Badge 
              variant={student.trend === "up" ? "default" : "destructive"}
              className={`flex-shrink-0 self-start sm:self-center ${
                student.trend === "up" 
                  ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-200" 
                  : "bg-red-100 text-red-800 border-red-200 hover:bg-red-200"
              }`}
            >
              {student.trend === "up" ? "Improving" : "Needs Help"}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default StudentPerformance;
