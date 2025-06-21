
import { Button } from "@/components/ui/button";
import { Check, Plus } from "lucide-react";
import TeacherStats from "./TeacherStats";
import TodaySchedule from "./TodaySchedule";
import StudentPerformance from "./StudentPerformance";

interface TeacherData {
  name: string;
  subject: string;
  classes: string[];
  totalStudents: number;
  todayClasses: number;
  pendingHomework: number;
  attendanceStats?: {
    totalMarked: number;
    present: number;
    absent: number;
    late: number;
  };
}

interface ScheduleItem {
  time: string;
  class: string;
  subject: string;
  duration: string;
}

interface StudentPerformanceData {
  id: number;
  name: string;
  class: string;
  lastScore: number;
  trend: "up" | "down";
}

interface TeacherDashboardProps {
  teacherData: TeacherData;
  todaySchedule: ScheduleItem[];
  studentPerformance: StudentPerformanceData[];
  onMarkAttendance: () => void;
  onAddHomework: () => void;
}

const TeacherDashboard = ({ 
  teacherData, 
  todaySchedule, 
  studentPerformance, 
  onMarkAttendance, 
  onAddHomework 
}: TeacherDashboardProps) => {
  const attendancePercentage = teacherData.attendanceStats?.totalMarked > 0 
    ? Math.round((teacherData.attendanceStats.present / teacherData.attendanceStats.totalMarked) * 100) 
    : 0;

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-purple-600">Welcome, {teacherData.name}</h2>
          <p className="text-gray-600">{teacherData.subject} Teacher</p>
          {teacherData.attendanceStats && teacherData.attendanceStats.totalMarked > 0 && (
            <p className="text-sm text-green-600 mt-1">
              Today's Attendance: {attendancePercentage}% ({teacherData.attendanceStats.present}/{teacherData.attendanceStats.totalMarked})
            </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            className="border-purple-200 text-purple-700 hover:bg-purple-50 w-full sm:w-auto"
            onClick={onMarkAttendance}
          >
            <Check className="mr-2" size={16} />
            Mark Attendance
          </Button>
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto"
            onClick={onAddHomework}
          >
            <Plus className="mr-2" size={16} />
            Add Homework
          </Button>
        </div>
      </div>

      <TeacherStats teacherData={teacherData} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
        <TodaySchedule schedule={todaySchedule} />
        <StudentPerformance students={studentPerformance} />
      </div>
    </div>
  );
};

export default TeacherDashboard;
