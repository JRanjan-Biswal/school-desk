
import { Card } from "@/components/ui/card";
import { Users, Calendar, Settings, ArrowUp } from "lucide-react";

interface TeacherData {
  name: string;
  subject: string;
  classes: string[];
  totalStudents: number;
  todayClasses: number;
  pendingHomework: number;
}

interface TeacherStatsProps {
  teacherData: TeacherData;
}

const TeacherStats = ({ teacherData }: TeacherStatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <Card className="p-4 md:p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                <Users className="text-purple-600" size={16} />
              </div>
              <p className="text-purple-600 font-semibold text-sm">My Classes</p>
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{teacherData.classes.length}</p>
            <div className="flex items-center">
              <span className="text-gray-500 text-xs font-medium">Active classes</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 md:p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                <Users className="text-purple-600" size={16} />
              </div>
              <p className="text-purple-600 font-semibold text-sm">Total Students</p>
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{teacherData.totalStudents}</p>
            <div className="flex items-center">
              <ArrowUp className="text-green-500 mr-1 flex-shrink-0" size={14} />
              <span className="text-green-600 text-xs font-medium">+3% this month</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 md:p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                <Calendar className="text-purple-600" size={16} />
              </div>
              <p className="text-purple-600 font-semibold text-sm">Today's Classes</p>
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{teacherData.todayClasses}</p>
            <div className="flex items-center">
              <span className="text-gray-500 text-xs font-medium">Scheduled today</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 md:p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                <Settings className="text-purple-600" size={16} />
              </div>
              <p className="text-purple-600 font-semibold text-sm">Pending Homework</p>
            </div>
            <p className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{teacherData.pendingHomework}</p>
            <div className="flex items-center">
              <span className="text-gray-500 text-xs font-medium">To be reviewed</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TeacherStats;
