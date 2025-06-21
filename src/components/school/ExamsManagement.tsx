
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Eye, Edit, FileText, Calendar, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CreateExamDialog from "./exams/CreateExamDialog";
import ExamDetailsDialog from "./exams/ExamDetailsDialog";
import ResultsDialog from "./exams/ResultsDialog";

interface Exam {
  id: number;
  name: string;
  type: string;
  class: string;
  section: string;
  subject: string;
  date: string;
  time: string;
  duration: number;
  totalMarks: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  description?: string;
}

interface Result {
  id: number;
  examId: number;
  studentId: number;
  studentName: string;
  rollNo: string;
  marksObtained: number;
  totalMarks: number;
  grade: string;
  remarks?: string;
}

const ExamsManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("exams");
  const [createExamOpen, setCreateExamOpen] = useState(false);
  const [examDetailsOpen, setExamDetailsOpen] = useState(false);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);

  const [exams, setExams] = useState<Exam[]>([
    {
      id: 1,
      name: "Mid Term Mathematics",
      type: "Mid Term",
      class: "Class 5",
      section: "A",
      subject: "Mathematics",
      date: "2025-06-15",
      time: "10:00",
      duration: 120,
      totalMarks: 100,
      status: 'upcoming',
      description: "Mid term examination covering chapters 1-5"
    },
    {
      id: 2,
      name: "Unit Test Science",
      type: "Unit Test",
      class: "Class 4",
      section: "B",
      subject: "Science",
      date: "2025-06-08",
      time: "09:00",
      duration: 60,
      totalMarks: 50,
      status: 'completed',
      description: "Unit test on Plants and Animals"
    },
    {
      id: 3,
      name: "Final English Exam",
      type: "Final Exam",
      class: "Class 3",
      section: "A",
      subject: "English",
      date: "2025-06-20",
      time: "11:00",
      duration: 90,
      totalMarks: 80,
      status: 'upcoming'
    }
  ]);

  const [results, setResults] = useState<Result[]>([
    {
      id: 1,
      examId: 2,
      studentId: 1,
      studentName: "Student 1",
      rollNo: "001",
      marksObtained: 45,
      totalMarks: 50,
      grade: "A",
      remarks: "Excellent performance"
    },
    {
      id: 2,
      examId: 2,
      studentId: 2,
      studentName: "Student 2",
      rollNo: "002",
      marksObtained: 38,
      totalMarks: 50,
      grade: "B",
      remarks: "Good work"
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>;
      case 'ongoing':
        return <Badge className="bg-yellow-100 text-yellow-800">Ongoing</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleCreateExam = (examData: any) => {
    const newExam: Exam = {
      id: Date.now(),
      ...examData,
      status: 'upcoming' as const
    };
    setExams([...exams, newExam]);
    toast({
      title: "Exam Created",
      description: `${examData.name} has been scheduled successfully.`,
    });
  };

  const handleViewDetails = (exam: Exam) => {
    setSelectedExam(exam);
    setExamDetailsOpen(true);
  };

  const handleViewResults = (exam: Exam) => {
    setSelectedExam(exam);
    setResultsOpen(true);
  };

  return (
    <div className="max-w-full space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-600">Exams & Results</h2>
          <p className="text-gray-600 text-sm sm:text-base">Manage examinations and view results</p>
        </div>
        <Button 
          onClick={() => setCreateExamOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
        >
          <Plus className="mr-2" size={16} />
          Schedule Exam
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="exams">Examinations</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="exams" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Upcoming Exams</CardTitle>
                <Calendar className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {exams.filter(exam => exam.status === 'upcoming').length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Ongoing Exams</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {exams.filter(exam => exam.status === 'ongoing').length}
                </div>
              </CardContent>
            </Card>

            <Card className="sm:col-span-2 lg:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Completed Exams</CardTitle>
                <FileText className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {exams.filter(exam => exam.status === 'completed').length}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-purple-600">All Examinations</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-purple-600 font-semibold min-w-[150px]">Exam Name</TableHead>
                      <TableHead className="text-purple-600 font-semibold min-w-[100px]">Type</TableHead>
                      <TableHead className="text-purple-600 font-semibold min-w-[100px]">Class</TableHead>
                      <TableHead className="text-purple-600 font-semibold min-w-[120px]">Subject</TableHead>
                      <TableHead className="text-purple-600 font-semibold min-w-[140px]">Date & Time</TableHead>
                      <TableHead className="text-purple-600 font-semibold min-w-[100px]">Status</TableHead>
                      <TableHead className="text-purple-600 font-semibold min-w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {exams.map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell className="font-medium">{exam.name}</TableCell>
                        <TableCell>{exam.type}</TableCell>
                        <TableCell>{exam.class}-{exam.section}</TableCell>
                        <TableCell>{exam.subject}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{new Date(exam.date).toLocaleDateString()}</div>
                            <div className="text-gray-500">at {exam.time}</div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(exam.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewDetails(exam)}
                              className="border-purple-200 text-purple-700 hover:bg-purple-50 p-2"
                            >
                              <Eye size={14} />
                            </Button>
                            {exam.status === 'completed' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleViewResults(exam)}
                                className="border-green-200 text-green-700 hover:bg-green-50 p-2"
                              >
                                <FileText size={14} />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-600">Exam Results</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-purple-600 font-semibold min-w-[140px]">Student Name</TableHead>
                      <TableHead className="text-purple-600 font-semibold min-w-[100px]">Roll No</TableHead>
                      <TableHead className="text-purple-600 font-semibold min-w-[150px]">Exam</TableHead>
                      <TableHead className="text-purple-600 font-semibold min-w-[120px]">Marks Obtained</TableHead>
                      <TableHead className="text-purple-600 font-semibold min-w-[110px]">Total Marks</TableHead>
                      <TableHead className="text-purple-600 font-semibold min-w-[100px]">Percentage</TableHead>
                      <TableHead className="text-purple-600 font-semibold min-w-[80px]">Grade</TableHead>
                      <TableHead className="text-purple-600 font-semibold min-w-[120px]">Remarks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((result) => {
                      const exam = exams.find(e => e.id === result.examId);
                      const percentage = ((result.marksObtained / result.totalMarks) * 100).toFixed(1);
                      return (
                        <TableRow key={result.id}>
                          <TableCell className="font-medium">{result.studentName}</TableCell>
                          <TableCell>{result.rollNo}</TableCell>
                          <TableCell>{exam?.name}</TableCell>
                          <TableCell>{result.marksObtained}</TableCell>
                          <TableCell>{result.totalMarks}</TableCell>
                          <TableCell>{percentage}%</TableCell>
                          <TableCell>
                            <Badge className={`${
                              result.grade === 'A' ? 'bg-green-100 text-green-800' :
                              result.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                              result.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {result.grade}
                            </Badge>
                          </TableCell>
                          <TableCell>{result.remarks || '-'}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CreateExamDialog 
        open={createExamOpen} 
        onOpenChange={setCreateExamOpen}
        onCreateExam={handleCreateExam}
      />

      {selectedExam && (
        <ExamDetailsDialog 
          open={examDetailsOpen} 
          onOpenChange={setExamDetailsOpen}
          exam={selectedExam}
        />
      )}

      {selectedExam && (
        <ResultsDialog 
          open={resultsOpen} 
          onOpenChange={setResultsOpen}
          exam={selectedExam}
          results={results.filter(r => r.examId === selectedExam.id)}
        />
      )}
    </div>
  );
};

export default ExamsManagement;
