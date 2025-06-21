
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Student {
  id: number;
  name: string;
  rollNo: string;
  status: "present" | "absent" | "late" | null;
}

interface MarkAttendanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAttendanceMarked?: (attendanceData: any) => void;
}

const MarkAttendanceDialog = ({ open, onOpenChange, onAttendanceMarked }: MarkAttendanceDialogProps) => {
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState("Class 1");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "Student 1", rollNo: "001", status: null },
    { id: 2, name: "Student 2", rollNo: "002", status: null },
    { id: 3, name: "Student 3", rollNo: "003", status: null },
    { id: 4, name: "Student 4", rollNo: "004", status: null },
    { id: 5, name: "Student 5", rollNo: "005", status: null },
    { id: 6, name: "Student 6", rollNo: "006", status: null },
  ]);

  const markAttendance = (studentId: number, status: "present" | "absent" | "late") => {
    setStudents(prev => prev.map(student => 
      student.id === studentId ? { ...student, status } : student
    ));
  };

  const markAllPresent = () => {
    setStudents(prev => prev.map(student => ({ ...student, status: "present" as const })));
  };

  const clearAll = () => {
    setStudents(prev => prev.map(student => ({ ...student, status: null })));
  };

  const handleSubmit = () => {
    const totalStudents = students.length;
    const presentCount = students.filter(s => s.status === "present").length;
    const absentCount = students.filter(s => s.status === "absent").length;
    const lateCount = students.filter(s => s.status === "late").length;
    const unmarkedCount = students.filter(s => s.status === null).length;

    if (unmarkedCount > 0) {
      toast({
        title: "Incomplete Attendance",
        description: `${unmarkedCount} students haven't been marked. Please mark all students before submitting.`,
        variant: "destructive",
      });
      return;
    }

    const attendanceData = {
      class: selectedClass,
      date: selectedDate,
      students: students.map(s => ({ id: s.id, name: s.name, rollNo: s.rollNo, status: s.status })),
      summary: { present: presentCount, absent: absentCount, late: lateCount, total: totalStudents }
    };

    // Save to localStorage for persistence
    const existingAttendance = JSON.parse(localStorage.getItem('attendanceData') || '[]');
    const updatedAttendance = existingAttendance.filter((record: any) => 
      !(record.class === selectedClass && record.date === selectedDate)
    );
    updatedAttendance.push(attendanceData);
    localStorage.setItem('attendanceData', JSON.stringify(updatedAttendance));

    toast({
      title: "Attendance Marked Successfully",
      description: `${selectedClass} (${selectedDate}): ${presentCount} present, ${absentCount} absent, ${lateCount} late`,
    });

    if (onAttendanceMarked) {
      onAttendanceMarked(attendanceData);
    }
    
    onOpenChange(false);
    // Reset for next use
    setStudents(prev => prev.map(student => ({ ...student, status: null })));
  };

  const presentCount = students.filter(s => s.status === "present").length;
  const absentCount = students.filter(s => s.status === "absent").length;
  const lateCount = students.filter(s => s.status === "late").length;
  const totalMarked = presentCount + absentCount + lateCount;
  const totalStudents = students.length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-purple-600 flex items-center">
            <Users className="mr-2" size={20} />
            Mark Attendance
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Class</label>
              <select 
                value={selectedClass} 
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Date</label>
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Badge variant="outline" className="bg-green-50 text-green-700">
              Present: {presentCount}
            </Badge>
            <Badge variant="outline" className="bg-red-50 text-red-700">
              Absent: {absentCount}
            </Badge>
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
              Late: {lateCount}
            </Badge>
            <Badge variant="outline" className="bg-gray-50 text-gray-700">
              Progress: {totalMarked}/{totalStudents}
            </Badge>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={markAllPresent}
              className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
            >
              Mark All Present
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearAll}
              className="bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
            >
              Clear All
            </Button>
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto">
            {students.map((student) => (
              <Card key={student.id} className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-gray-600">Roll No: {student.rollNo}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={student.status === "present" ? "default" : "outline"}
                      className={student.status === "present" ? "bg-green-600 hover:bg-green-700" : "border-green-600 text-green-600 hover:bg-green-50"}
                      onClick={() => markAttendance(student.id, "present")}
                    >
                      <Check size={16} />
                    </Button>
                    <Button
                      size="sm"
                      variant={student.status === "late" ? "default" : "outline"}
                      className={student.status === "late" ? "bg-yellow-600 hover:bg-yellow-700" : "border-yellow-600 text-yellow-600 hover:bg-yellow-50"}
                      onClick={() => markAttendance(student.id, "late")}
                    >
                      L
                    </Button>
                    <Button
                      size="sm"
                      variant={student.status === "absent" ? "destructive" : "outline"}
                      className={student.status === "absent" ? "" : "border-red-600 text-red-600 hover:bg-red-50"}
                      onClick={() => markAttendance(student.id, "absent")}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={handleSubmit}
              disabled={totalMarked !== totalStudents}
            >
              Submit Attendance ({totalMarked}/{totalStudents})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MarkAttendanceDialog;
