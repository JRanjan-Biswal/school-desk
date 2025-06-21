
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, Clock } from "lucide-react";

interface AttendanceRecord {
  date: string;
  status: "present" | "absent" | "late";
  class: string;
}

interface AttendanceViewProps {
  childId: string;
  childName: string;
  className: string;
}

const AttendanceView = ({ childId, childName, className }: AttendanceViewProps) => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [stats, setStats] = useState({
    totalDays: 0,
    present: 0,
    absent: 0,
    late: 0,
    percentage: 0
  });

  useEffect(() => {
    // Load attendance data from localStorage (simulating data for the child)
    const allAttendanceData = JSON.parse(localStorage.getItem('attendanceData') || '[]');
    
    // Filter records for this child's class and generate some sample data
    const childRecords: AttendanceRecord[] = [];
    const today = new Date();
    
    // Generate attendance records for the last 30 days
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue;
      
      // Check if there's real attendance data for this date
      const realRecord = allAttendanceData.find((record: any) => 
        record.date === dateStr && record.class === className.split(' ')[0]
      );
      
      let status: "present" | "absent" | "late";
      if (realRecord) {
        // Find this child in the real record
        const studentRecord = realRecord.students?.find((s: any) => 
          s.name === childName || s.id.toString() === childId
        );
        status = studentRecord?.status || "present";
      } else {
        // Generate random status with higher probability of present
        const rand = Math.random();
        if (rand < 0.85) status = "present";
        else if (rand < 0.95) status = "late";
        else status = "absent";
      }
      
      childRecords.push({
        date: dateStr,
        status,
        class: className
      });
    }
    
    setAttendanceRecords(childRecords);
    
    // Calculate statistics
    const totalDays = childRecords.length;
    const present = childRecords.filter(r => r.status === "present").length;
    const absent = childRecords.filter(r => r.status === "absent").length;
    const late = childRecords.filter(r => r.status === "late").length;
    const percentage = totalDays > 0 ? Math.round((present / totalDays) * 100) : 0;
    
    setStats({ totalDays, present, absent, late, percentage });
  }, [childId, childName, className]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present": return "bg-green-100 text-green-800 border-green-200";
      case "absent": return "bg-red-100 text-red-800 border-red-200";
      case "late": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-0">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
        <h2 className="text-2xl sm:text-3xl font-bold text-purple-600">Attendance Records</h2>
        <div className="text-xs sm:text-sm text-gray-600 bg-gray-50 p-2 rounded-lg sm:bg-transparent sm:p-0">
          <div className="sm:text-right">
            <div>Child: {childName}</div>
            <div>Class: {className}</div>
          </div>
        </div>
      </div>

      {/* Attendance Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <Card className="p-3 sm:p-4 lg:p-6 bg-white border border-gray-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
              <TrendingUp className="text-purple-600" size={14} />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Attendance Rate</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600">{stats.percentage}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-3 sm:p-4 lg:p-6 bg-white border border-gray-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
              <Calendar className="text-green-600" size={14} />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Present Days</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">{stats.present}</p>
            </div>
          </div>
        </Card>

        <Card className="p-3 sm:p-4 lg:p-6 bg-white border border-gray-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
              <Calendar className="text-red-600" size={14} />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Absent Days</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600">{stats.absent}</p>
            </div>
          </div>
        </Card>

        <Card className="p-3 sm:p-4 lg:p-6 bg-white border border-gray-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
              <Clock className="text-yellow-600" size={14} />
            </div>
            <div className="text-center sm:text-left">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Late Days</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-yellow-600">{stats.late}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Attendance Records */}
      <Card className="p-4 sm:p-6 bg-white border border-gray-200 shadow-sm">
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-purple-600">Recent Attendance (Last 30 Days)</h3>
        
        {attendanceRecords.length === 0 ? (
          <div className="text-center py-6 sm:py-8 text-gray-500">
            <p className="text-sm sm:text-base">No attendance records found.</p>
            <p className="text-xs sm:text-sm mt-1">Records will appear as teachers mark attendance.</p>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-3 max-h-80 sm:max-h-96 overflow-y-auto">
            {attendanceRecords.slice().reverse().map((record, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-gray-50 rounded-lg border border-gray-100 gap-2 sm:gap-0">
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm sm:text-base">{formatDate(record.date)}</p>
                  <p className="text-xs sm:text-sm text-gray-600">{record.class}</p>
                </div>
                <Badge className={`border ${getStatusColor(record.status)} capitalize self-start sm:self-center text-xs`}>
                  {record.status}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Monthly Summary */}
      <Card className="p-4 sm:p-6 bg-white border border-gray-200 shadow-sm">
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-purple-600">This Month's Summary</h3>
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-green-600">{stats.present}</p>
            <p className="text-xs sm:text-sm text-gray-600">Present</p>
          </div>
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-red-600">{stats.absent}</p>
            <p className="text-xs sm:text-sm text-gray-600">Absent</p>
          </div>
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-bold text-yellow-600">{stats.late}</p>
            <p className="text-xs sm:text-sm text-gray-600">Late</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AttendanceView;
