
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Eye } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ReportCardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  childName: string;
  className: string;
  section: string;
}

const ReportCardDialog = ({ open, onOpenChange, childName, className, section }: ReportCardDialogProps) => {
  const [selectedExam, setSelectedExam] = useState("mid-term-2024");

  const availableExams = [
    { id: "mid-term-2024", name: "Mid Term 2024-25", term: "Mid Term 2024-25" },
    { id: "unit-test-1", name: "Unit Test 1 2024-25", term: "Unit Test 1 2024-25" },
    { id: "quarterly-2024", name: "Quarterly Exam 2024-25", term: "Quarterly Exam 2024-25" },
    { id: "half-yearly-2024", name: "Half Yearly 2024-25", term: "Half Yearly 2024-25" }
  ];

  // Mock data that changes based on selected exam
  const getReportData = (examId: string) => {
    const baseData = {
      subjects: [
        { name: "Mathematics", marks: 85, totalMarks: 100, grade: "A", remarks: "Excellent" },
        { name: "Science", marks: 92, totalMarks: 100, grade: "A+", remarks: "Outstanding" },
        { name: "English", marks: 78, totalMarks: 100, grade: "B+", remarks: "Good" },
        { name: "Hindi", marks: 88, totalMarks: 100, grade: "A", remarks: "Very Good" },
        { name: "Social Studies", marks: 82, totalMarks: 100, grade: "A", remarks: "Good" },
        { name: "Physical Education", marks: 95, totalMarks: 100, grade: "A+", remarks: "Excellent" }
      ],
      attendance: "92%",
      overallGrade: "A",
      position: "5th",
      totalStudents: 45,
      teacherRemarks: "A bright student who shows consistent performance across all subjects. Needs to focus more on English language skills."
    };

    // Slightly modify marks for different exams
    if (examId === "unit-test-1") {
      baseData.subjects = baseData.subjects.map(subject => ({
        ...subject,
        marks: Math.max(subject.marks - 5, 70)
      }));
      baseData.position = "7th";
      baseData.attendance = "88%";
    }

    return baseData;
  };

  const currentExam = availableExams.find(exam => exam.id === selectedExam);
  const reportData = getReportData(selectedExam);

  const totalMarks = reportData.subjects.reduce((sum, subject) => sum + subject.marks, 0);
  const totalPossible = reportData.subjects.reduce((sum, subject) => sum + subject.totalMarks, 0);
  const percentage = ((totalMarks / totalPossible) * 100).toFixed(1);

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+': return 'bg-green-100 text-green-800';
      case 'A': return 'bg-blue-100 text-blue-800';
      case 'B+': return 'bg-yellow-100 text-yellow-800';
      case 'B': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-6xl h-[95vh] overflow-hidden flex flex-col p-0">
        <DialogHeader className="p-4 sm:p-6 border-b flex-shrink-0">
          <DialogTitle className="text-purple-600 text-lg sm:text-xl">
            Report Card - {currentExam?.term}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="space-y-4 sm:space-y-6">
            {/* Exam Selection */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-purple-600 text-base sm:text-lg">Select Exam</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="examSelect">Choose Exam/Test</Label>
                  <Select value={selectedExam} onValueChange={setSelectedExam}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an exam" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableExams.map((exam) => (
                        <SelectItem key={exam.id} value={exam.id}>
                          {exam.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Student Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-purple-600 text-base sm:text-lg">Student Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Name:</span>
                    <p className="font-semibold">{childName}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Class:</span>
                    <p className="font-semibold">{className} - {section}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Attendance:</span>
                    <p className="font-semibold">{reportData.attendance}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Position:</span>
                    <p className="font-semibold">{reportData.position} of {reportData.totalStudents}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Academic Performance */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-purple-600 text-base sm:text-lg">Academic Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-[600px]">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 sm:p-3 font-semibold text-purple-600 text-sm">Subject</th>
                        <th className="text-center p-2 sm:p-3 font-semibold text-purple-600 text-sm">Marks</th>
                        <th className="text-center p-2 sm:p-3 font-semibold text-purple-600 text-sm">Total</th>
                        <th className="text-center p-2 sm:p-3 font-semibold text-purple-600 text-sm">%</th>
                        <th className="text-center p-2 sm:p-3 font-semibold text-purple-600 text-sm">Grade</th>
                        <th className="text-center p-2 sm:p-3 font-semibold text-purple-600 text-sm">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.subjects.map((subject, index) => {
                        const subjectPercentage = ((subject.marks / subject.totalMarks) * 100).toFixed(1);
                        return (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="p-2 sm:p-3 font-medium text-sm">{subject.name}</td>
                            <td className="p-2 sm:p-3 text-center text-sm">{subject.marks}</td>
                            <td className="p-2 sm:p-3 text-center text-sm">{subject.totalMarks}</td>
                            <td className="p-2 sm:p-3 text-center text-sm">{subjectPercentage}%</td>
                            <td className="p-2 sm:p-3 text-center">
                              <Badge className={`${getGradeColor(subject.grade)} text-xs`}>
                                {subject.grade}
                              </Badge>
                            </td>
                            <td className="p-2 sm:p-3 text-center text-xs">{subject.remarks}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 bg-purple-50">
                        <td className="p-2 sm:p-3 font-bold text-purple-600 text-sm">Overall</td>
                        <td className="p-2 sm:p-3 text-center font-bold text-sm">{totalMarks}</td>
                        <td className="p-2 sm:p-3 text-center font-bold text-sm">{totalPossible}</td>
                        <td className="p-2 sm:p-3 text-center font-bold text-sm">{percentage}%</td>
                        <td className="p-2 sm:p-3 text-center">
                          <Badge className={getGradeColor(reportData.overallGrade)}>
                            {reportData.overallGrade}
                          </Badge>
                        </td>
                        <td className="p-2 sm:p-3 text-center">-</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Teacher's Remarks */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-purple-600 text-base sm:text-lg">Teacher's Remarks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{reportData.teacherRemarks}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Actions - Fixed at bottom */}
        <div className="border-t p-4 sm:p-6 flex-shrink-0 bg-white">
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
            <Button variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50 w-full sm:w-auto">
              <Eye className="mr-2" size={16} />
              Print Preview
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto">
              <Download className="mr-2" size={16} />
              Download PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportCardDialog;
