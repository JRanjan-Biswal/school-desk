
import { Card } from "@/components/ui/card";
import { Users, Check, Settings, ArrowUp } from "lucide-react";

interface SchoolData {
  totalStudents: number;
  totalTeachers: number;
  attendanceToday: string;
  feesPending: number;
}

interface SchoolStatsProps {
  schoolData: SchoolData;
}

const SchoolStats = ({ schoolData }: SchoolStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                <Users className="text-purple-600" size={16} />
              </div>
              <p className="text-purple-600 font-semibold text-sm">Total Students</p>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-2">{schoolData.totalStudents}</p>
            <div className="flex items-center">
              <ArrowUp className="text-green-500 mr-1 flex-shrink-0" size={14} />
              <span className="text-green-600 text-xs font-medium">+8% this month</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                <Users className="text-purple-600" size={16} />
              </div>
              <p className="text-purple-600 font-semibold text-sm">Total Teachers</p>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-2">{schoolData.totalTeachers}</p>
            <div className="flex items-center">
              <ArrowUp className="text-green-500 mr-1 flex-shrink-0" size={14} />
              <span className="text-green-600 text-xs font-medium">+5% this month</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                <Check className="text-purple-600" size={16} />
              </div>
              <p className="text-purple-600 font-semibold text-sm">Attendance Today</p>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-2">{schoolData.attendanceToday}</p>
            <div className="flex items-center">
              <ArrowUp className="text-green-500 mr-1 flex-shrink-0" size={14} />
              <span className="text-green-600 text-xs font-medium">+2% vs yesterday</span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                <Settings className="text-purple-600" size={16} />
              </div>
              <p className="text-purple-600 font-semibold text-sm">Pending Fees</p>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-2">{schoolData.feesPending}</p>
            <div className="flex items-center">
              <span className="text-gray-500 text-xs font-medium">Students pending</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SchoolStats;
