
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, MapPin } from "lucide-react";
import TimetableWeekView from "./timetable/TimetableWeekView";
import TimetableDayView from "./timetable/TimetableDayView";
import TimetableStatsCards from "./timetable/TimetableStatsCards";
import ClassDetailsDialog from "./timetable/ClassDetailsDialog";
import MarkAttendanceDialog from "./MarkAttendanceDialog";

interface TimetableEntry {
  day: string;
  time: string;
  class: string;
  section: string;
  subject: string;
  room: string;
  students: number;
}

const TeacherTimetableSection = () => {
  const [viewMode, setViewMode] = useState<"week" | "day">("week");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedClass, setSelectedClass] = useState<TimetableEntry | null>(null);
  const [classDetailsOpen, setClassDetailsOpen] = useState(false);
  const [attendanceOpen, setAttendanceOpen] = useState(false);

  // Sample teacher timetable data
  const timetableData = [
    { day: "Monday", time: "09:00-09:45", class: "Class 1", section: "A", subject: "Mathematics", room: "Room 101", students: 42 },
    { day: "Monday", time: "10:45-11:30", class: "Class 2", section: "B", subject: "Mathematics", room: "Room 102", students: 43 },
    { day: "Monday", time: "14:00-14:45", class: "Class 1", section: "A", subject: "Mathematics", room: "Room 101", students: 42 },
    
    { day: "Tuesday", time: "09:00-09:45", class: "Class 2", section: "B", subject: "Mathematics", room: "Room 102", students: 43 },
    { day: "Tuesday", time: "11:30-12:15", class: "Class 1", section: "A", subject: "Mathematics", room: "Room 101", students: 42 },
    { day: "Tuesday", time: "13:00-13:45", class: "Class 3", section: "C", subject: "Mathematics", room: "Room 103", students: 40 },
    
    { day: "Wednesday", time: "10:00-10:45", class: "Class 1", section: "A", subject: "Mathematics", room: "Room 101", students: 42 },
    { day: "Wednesday", time: "11:30-12:15", class: "Class 2", section: "B", subject: "Mathematics", room: "Room 102", students: 43 },
    { day: "Wednesday", time: "14:30-15:15", class: "Class 3", section: "C", subject: "Mathematics", room: "Room 103", students: 40 },
    
    { day: "Thursday", time: "08:15-09:00", class: "Class 2", section: "B", subject: "Mathematics", room: "Room 102", students: 43 },
    { day: "Thursday", time: "10:45-11:30", class: "Class 1", section: "A", subject: "Mathematics", room: "Room 101", students: 42 },
    { day: "Thursday", time: "13:45-14:30", class: "Class 3", section: "C", subject: "Mathematics", room: "Room 103", students: 40 },
    
    { day: "Friday", time: "09:45-10:30", class: "Class 1", section: "A", subject: "Mathematics", room: "Room 101", students: 42 },
    { day: "Friday", time: "11:00-11:45", class: "Class 2", section: "B", subject: "Mathematics", room: "Room 102", students: 43 },
    { day: "Friday", time: "15:00-15:45", class: "Class 3", section: "C", subject: "Mathematics", room: "Room 103", students: 40 }
  ];

  const stats = {
    totalClasses: 15,
    weeklyHours: 11.25,
    uniqueClasses: 3,
    averageStudents: 42
  };

  const handleViewDetails = (entry: TimetableEntry) => {
    setSelectedClass(entry);
    setClassDetailsOpen(true);
  };

  const handleMarkAttendance = () => {
    setAttendanceOpen(true);
  };

  const handleAttendanceMarked = (attendanceData: any) => {
    // Handle attendance marked callback if needed
    console.log("Attendance marked:", attendanceData);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-purple-600">My Timetable</h2>
          <p className="text-gray-600">View and manage your teaching schedule</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "week" ? "default" : "outline"}
            onClick={() => setViewMode("week")}
            className={viewMode === "week" ? "bg-purple-600 hover:bg-purple-700" : ""}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Week View
          </Button>
          <Button
            variant={viewMode === "day" ? "default" : "outline"}
            onClick={() => setViewMode("day")}
            className={viewMode === "day" ? "bg-purple-600 hover:bg-purple-700" : ""}
          >
            <Clock className="mr-2 h-4 w-4" />
            Day View
          </Button>
        </div>
      </div>

      <TimetableStatsCards stats={stats} />

      {viewMode === "week" ? (
        <TimetableWeekView timetableData={timetableData} />
      ) : (
        <TimetableDayView 
          timetableData={timetableData} 
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          onMarkAttendance={handleMarkAttendance}
          onViewDetails={handleViewDetails}
        />
      )}

      {/* Dialogs */}
      <ClassDetailsDialog
        open={classDetailsOpen}
        onOpenChange={setClassDetailsOpen}
        classData={selectedClass}
      />
      
      <MarkAttendanceDialog
        open={attendanceOpen}
        onOpenChange={setAttendanceOpen}
        onAttendanceMarked={handleAttendanceMarked}
      />
    </div>
  );
};

export default TeacherTimetableSection;
