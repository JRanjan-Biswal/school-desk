
import { useState, useEffect } from "react";

interface AttendanceStats {
  totalMarked: number;
  present: number;
  absent: number;
  late: number;
}

interface TeacherData {
  name: string;
  subject: string;
  classes: string[];
  totalStudents: number;
  todayClasses: number;
  pendingHomework: number;
  attendanceStats?: AttendanceStats;
}

export const useTeacherData = () => {
  const [attendanceStats, setAttendanceStats] = useState<AttendanceStats>({ 
    totalMarked: 0, 
    present: 0, 
    absent: 0, 
    late: 0 
  });

  const teacherData: TeacherData = {
    name: "Teacher 1",
    subject: "Mathematics",
    classes: ["Class 1", "Class 2"],
    totalStudents: 85,
    todayClasses: 4,
    pendingHomework: 12,
    attendanceStats
  };

  const todaySchedule = [
    { time: "09:00 AM", class: "Class 1", subject: "Mathematics", duration: "45 min" },
    { time: "10:00 AM", class: "Class 2", subject: "Mathematics", duration: "45 min" },
    { time: "02:00 PM", class: "Class 1", subject: "Mathematics", duration: "45 min" },
    { time: "03:00 PM", class: "Class 2", subject: "Mathematics", duration: "45 min" }
  ];

  const myClasses = [
    { id: 1, name: "Class 1", section: "A", students: 42, subject: "Mathematics" },
    { id: 2, name: "Class 2", section: "B", students: 43, subject: "Mathematics" }
  ];

  const studentPerformance = [
    { id: 1, name: "Student 1", class: "Class 1", lastScore: 85, trend: "up" as const },
    { id: 2, name: "Student 2", class: "Class 1", lastScore: 72, trend: "down" as const },
    { id: 3, name: "Student 3", class: "Class 2", lastScore: 91, trend: "up" as const },
    { id: 4, name: "Student 4", class: "Class 2", lastScore: 68, trend: "down" as const }
  ];

  // Load attendance data on component mount
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const attendanceData = JSON.parse(localStorage.getItem('attendanceData') || '[]');
    const todayAttendance = attendanceData.filter((record: any) => record.date === today);
    
    let totalPresent = 0, totalAbsent = 0, totalLate = 0, totalMarked = 0;
    
    todayAttendance.forEach((record: any) => {
      totalPresent += record.summary.present;
      totalAbsent += record.summary.absent;
      totalLate += record.summary.late;
      totalMarked += record.summary.total;
    });

    setAttendanceStats({
      totalMarked,
      present: totalPresent,
      absent: totalAbsent,
      late: totalLate
    });
  }, []);

  const handleAttendanceMarked = (attendanceData: any) => {
    setAttendanceStats(prev => ({
      totalMarked: prev.totalMarked + attendanceData.summary.total,
      present: prev.present + attendanceData.summary.present,
      absent: prev.absent + attendanceData.summary.absent,
      late: prev.late + attendanceData.summary.late
    }));
  };

  return {
    teacherData,
    todaySchedule,
    myClasses,
    studentPerformance,
    attendanceStats,
    handleAttendanceMarked
  };
};
