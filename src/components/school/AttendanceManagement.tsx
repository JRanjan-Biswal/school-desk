import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Check, X } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface Student {
  id: number;
  name: string;
  class: string;
  section: string;
  rollNo: string;
  status: string;
}

interface AttendanceRecord {
  studentId: number;
  date: string;
  status: "present" | "absent" | "late";
}

interface AttendanceManagementProps {
  students: Student[];
}

const AttendanceManagement = ({ students }: AttendanceManagementProps) => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [currentAttendance, setCurrentAttendance] = useState<Record<number, "present" | "absent" | "late">>({});

  const classes = ["all", ...Array.from(new Set(students.map(student => student.class)))];
  const filteredStudents = selectedClass === "all" 
    ? students 
    : students.filter(student => student.class === selectedClass);

  const markAttendance = (studentId: number, status: "present" | "absent" | "late") => {
    setCurrentAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const saveAttendance = () => {
    const dateStr = format(selectedDate, "yyyy-MM-dd");
    const newRecords = Object.entries(currentAttendance).map(([studentId, status]) => ({
      studentId: parseInt(studentId),
      date: dateStr,
      status
    }));

    setAttendanceRecords(prev => {
      // Remove existing records for this date and add new ones
      const filtered = prev.filter(record => record.date !== dateStr);
      return [...filtered, ...newRecords];
    });

    toast({
      title: "Attendance Saved",
      description: `Attendance for ${format(selectedDate, "PPP")} has been saved successfully.`,
    });

    setCurrentAttendance({});
  };

  const getAttendanceForDate = (studentId: number, date: string) => {
    return attendanceRecords.find(record => 
      record.studentId === studentId && record.date === date
    )?.status;
  };

  const getTodayAttendanceStats = () => {
    const today = format(new Date(), "yyyy-MM-dd");
    const todayRecords = attendanceRecords.filter(record => record.date === today);
    const present = todayRecords.filter(record => record.status === "present").length;
    const absent = todayRecords.filter(record => record.status === "absent").length;
    const late = todayRecords.filter(record => record.status === "late").length;
    
    return { present, absent, late, total: todayRecords.length };
  };

  const stats = getTodayAttendanceStats();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-purple-600">Attendance Management</h2>
          <p className="text-gray-600">Mark and track student attendance</p>
        </div>
      </div>

      {/* Today's Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Present</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.present}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Absent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Late</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.late}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Marked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.total}</div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-purple-600 text-xl font-semibold">Mark Attendance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <label className="text-sm font-medium">Select Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal border-purple-200 hover:border-purple-300">
                    <CalendarIcon className="mr-2 h-4 w-4 text-black" />
                    {format(selectedDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                    className="p-3 pointer-events-auto [&_.rdp-day_selected]:bg-purple-600 [&_.rdp-day_selected]:text-white [&_.rdp-day_today]:bg-purple-100 [&_.rdp-day_today]:text-purple-800 [&_.rdp-button:hover]:bg-purple-100"
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium">Filter by Class</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="border-purple-200 hover:border-purple-300">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((className) => (
                    <SelectItem key={className} value={className}>
                      {className === "all" ? "All Classes" : className}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {Object.keys(currentAttendance).length > 0 && (
            <Button onClick={saveAttendance} className="bg-purple-600 hover:bg-purple-700">
              Save Attendance ({Object.keys(currentAttendance).length} students)
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-purple-600 text-xl font-semibold">Student List - {format(selectedDate, "PPP")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-purple-600 font-semibold">Roll No</TableHead>
                <TableHead className="text-purple-600 font-semibold">Student Name</TableHead>
                <TableHead className="text-purple-600 font-semibold">Class</TableHead>
                <TableHead className="text-purple-600 font-semibold">Section</TableHead>
                <TableHead className="text-purple-600 font-semibold">Current Status</TableHead>
                <TableHead className="text-purple-600 font-semibold">Mark Attendance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => {
                const dateStr = format(selectedDate, "yyyy-MM-dd");
                const savedStatus = getAttendanceForDate(student.id, dateStr);
                const currentStatus = currentAttendance[student.id];
                const displayStatus = currentStatus || savedStatus;

                return (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.rollNo}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>{student.section}</TableCell>
                    <TableCell>
                      {displayStatus ? (
                        <Badge 
                          variant={displayStatus === "present" ? "default" : "secondary"}
                          className={
                            displayStatus === "present" 
                              ? "bg-green-100 text-green-800 border-green-200" 
                              : displayStatus === "absent"
                              ? "bg-red-100 text-red-800 border-red-200"
                              : "bg-yellow-100 text-yellow-800 border-yellow-200"
                          }
                        >
                          {displayStatus}
                        </Badge>
                      ) : (
                        <span className="text-gray-400">Not marked</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={displayStatus === "present" ? "default" : "outline"}
                          onClick={() => markAttendance(student.id, "present")}
                          className={
                            displayStatus === "present" 
                              ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-md" 
                              : "border-emerald-300 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-400"
                          }
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={displayStatus === "absent" ? "default" : "outline"}
                          onClick={() => markAttendance(student.id, "absent")}
                          className={
                            displayStatus === "absent" 
                              ? "bg-rose-500 hover:bg-rose-600 text-white shadow-md" 
                              : "border-rose-300 text-rose-600 hover:bg-rose-50 hover:border-rose-400"
                          }
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant={displayStatus === "late" ? "default" : "outline"}
                          onClick={() => markAttendance(student.id, "late")}
                          className={
                            displayStatus === "late" 
                              ? "bg-amber-500 hover:bg-amber-600 text-white shadow-md" 
                              : "border-amber-300 text-amber-600 hover:bg-amber-50 hover:border-amber-400"
                          }
                        >
                          L
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceManagement;
