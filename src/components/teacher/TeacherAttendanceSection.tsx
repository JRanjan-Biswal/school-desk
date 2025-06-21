
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface AttendanceStats {
  totalMarked: number;
  present: number;
  absent: number;
  late: number;
}

interface TeacherAttendanceSectionProps {
  attendanceStats: AttendanceStats;
  myClasses: Array<{ id: number; name: string; section: string; students: number; subject: string }>;
  onMarkAttendance: () => void;
}

const TeacherAttendanceSection = ({ attendanceStats, myClasses, onMarkAttendance }: TeacherAttendanceSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-purple-600">Attendance Management</h2>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          onClick={onMarkAttendance}
        >
          Mark New Attendance
        </Button>
      </div>

      {/* Today's Attendance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Classes Marked</h3>
          <p className="text-3xl font-bold text-purple-600">{attendanceStats.totalMarked > 0 ? Math.ceil(attendanceStats.totalMarked / 42) : 0}</p>
          <p className="text-sm text-gray-500">out of {myClasses.length} classes</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Present Today</h3>
          <p className="text-3xl font-bold text-green-600">{attendanceStats.present}</p>
          <p className="text-sm text-gray-500">students present</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Absent Today</h3>
          <p className="text-3xl font-bold text-red-600">{attendanceStats.absent}</p>
          <p className="text-sm text-gray-500">students absent</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Late Today</h3>
          <p className="text-3xl font-bold text-yellow-600">{attendanceStats.late}</p>
          <p className="text-sm text-gray-500">students late</p>
        </div>
      </div>

      {/* Recent Attendance Records */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-purple-600">Recent Attendance Records</h3>
        <AttendanceHistory />
      </div>
    </div>
  );
};

const AttendanceHistory = () => {
  const [attendanceHistory, setAttendanceHistory] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('attendanceData') || '[]');
    const sortedData = data.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setAttendanceHistory(sortedData.slice(0, 10)); // Show last 10 records
  }, []);

  if (attendanceHistory.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No attendance records found.</p>
        <p className="text-sm">Start by marking attendance for your classes.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {attendanceHistory.map((record, index) => (
        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium">{record.class}</p>
            <p className="text-sm text-gray-600">{record.date}</p>
          </div>
          <div className="flex gap-2">
            <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
              P: {record.summary.present}
            </span>
            <span className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded">
              A: {record.summary.absent}
            </span>
            <span className="text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
              L: {record.summary.late}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeacherAttendanceSection;
