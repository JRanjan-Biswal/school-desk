
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Eye, Edit, FileText, Calendar, Clock, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CreateHomeworkDialog from "./homework/CreateHomeworkDialog";
import HomeworkDetailsDialog from "./homework/HomeworkDetailsDialog";
import SubmissionsDialog from "./homework/SubmissionsDialog";

interface Homework {
  id: number;
  title: string;
  subject: string;
  class: string;
  section: string;
  description: string;
  dueDate: string;
  assignedDate: string;
  status: 'active' | 'completed' | 'overdue';
  assignedBy: string;
  totalStudents: number;
  submittedCount: number;
}

interface Submission {
  id: number;
  homeworkId: number;
  studentId: number;
  studentName: string;
  rollNo: string;
  submissionDate: string;
  status: 'submitted' | 'late' | 'not_submitted';
  grade?: string;
  feedback?: string;
}

const HomeworkManagement = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("homework");
  const [createHomeworkOpen, setCreateHomeworkOpen] = useState(false);
  const [homeworkDetailsOpen, setHomeworkDetailsOpen] = useState(false);
  const [submissionsOpen, setSubmissionsOpen] = useState(false);
  const [selectedHomework, setSelectedHomework] = useState<Homework | null>(null);

  const [homework, setHomework] = useState<Homework[]>([
    {
      id: 1,
      title: "Mathematics Chapter 5 - Fractions",
      subject: "Mathematics",
      class: "Class 5",
      section: "A",
      description: "Complete exercises 1-10 from page 45. Show all working steps.",
      dueDate: "2025-06-15",
      assignedDate: "2025-06-08",
      status: 'active',
      assignedBy: "Teacher 1",
      totalStudents: 25,
      submittedCount: 18
    },
    {
      id: 2,
      title: "Science Project - Plant Growth",
      subject: "Science",
      class: "Class 4",
      section: "B",
      description: "Observe and record plant growth over 7 days. Include photos and measurements.",
      dueDate: "2025-06-20",
      assignedDate: "2025-06-10",
      status: 'active',
      assignedBy: "Teacher 2",
      totalStudents: 30,
      submittedCount: 12
    },
    {
      id: 3,
      title: "English Essay - My Summer Vacation",
      subject: "English",
      class: "Class 3",
      section: "A",
      description: "Write a 200-word essay about your summer vacation plans.",
      dueDate: "2025-06-05",
      assignedDate: "2025-06-01",
      status: 'overdue',
      assignedBy: "Teacher 3",
      totalStudents: 22,
      submittedCount: 20
    }
  ]);

  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: 1,
      homeworkId: 1,
      studentId: 1,
      studentName: "Student 1",
      rollNo: "001",
      submissionDate: "2025-06-12",
      status: 'submitted',
      grade: "A",
      feedback: "Excellent work!"
    },
    {
      id: 2,
      homeworkId: 1,
      studentId: 2,
      studentName: "Student 2",
      rollNo: "002",
      submissionDate: "2025-06-14",
      status: 'submitted',
      grade: "B+",
      feedback: "Good effort, minor calculation errors."
    },
    {
      id: 3,
      homeworkId: 2,
      studentId: 3,
      studentName: "Student 3",
      rollNo: "003",
      submissionDate: "2025-06-11",
      status: 'submitted',
      grade: "A-",
      feedback: "Creative presentation!"
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-blue-100 text-blue-800">Active</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getSubmissionStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Badge className="bg-green-100 text-green-800">Submitted</Badge>;
      case 'late':
        return <Badge className="bg-yellow-100 text-yellow-800">Late</Badge>;
      case 'not_submitted':
        return <Badge className="bg-red-100 text-red-800">Not Submitted</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleCreateHomework = (homeworkData: any) => {
    const newHomework: Homework = {
      id: Date.now(),
      ...homeworkData,
      assignedDate: new Date().toISOString().split('T')[0],
      status: 'active' as const,
      submittedCount: 0
    };
    setHomework([...homework, newHomework]);
    toast({
      title: "Homework Assigned",
      description: `${homeworkData.title} has been assigned successfully.`,
    });
  };

  const handleViewDetails = (hw: Homework) => {
    setSelectedHomework(hw);
    setHomeworkDetailsOpen(true);
  };

  const handleViewSubmissions = (hw: Homework) => {
    setSelectedHomework(hw);
    setSubmissionsOpen(true);
  };

  const getCompletionPercentage = (submitted: number, total: number) => {
    return total > 0 ? Math.round((submitted / total) * 100) : 0;
  };

  return (
    <div className="max-w-full space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-600">Homework Management</h2>
          <p className="text-gray-600 text-sm sm:text-base">Assign and track homework submissions</p>
        </div>
        <Button 
          onClick={() => setCreateHomeworkOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto"
        >
          <Plus className="mr-2" size={16} />
          Assign Homework
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="homework">Homework</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
        </TabsList>

        <TabsContent value="homework" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Active Homework</CardTitle>
                <BookOpen className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {homework.filter(hw => hw.status === 'active').length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Overdue</CardTitle>
                <Clock className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {homework.filter(hw => hw.status === 'overdue').length}
                </div>
              </CardContent>
            </Card>

            <Card className="sm:col-span-2 lg:col-span-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
                <FileText className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {homework.filter(hw => hw.status === 'completed').length}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-purple-600">All Homework Assignments</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-purple-600 font-semibold min-w-[200px]">Title</TableHead>
                      <TableHead className="text-purple-600 font-semibold min-w-[100px]">Subject</TableHead>
                      <TableHead className="text-purple-600 font-semibold min-w-[100px]">Class</TableHead>
                      <TableHead className="text-purple-600 font-semibold min-w-[120px]">Due Date</TableHead>
                      <TableHead className="text-purple-600 font-semibold min-w-[120px]">Progress</TableHead>
                      <TableHead className="text-purple-600 font-semibold min-w-[100px]">Status</TableHead>
                      <TableHead className="text-purple-600 font-semibold min-w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {homework.map((hw) => (
                      <TableRow key={hw.id}>
                        <TableCell className="font-medium">{hw.title}</TableCell>
                        <TableCell>{hw.subject}</TableCell>
                        <TableCell>{hw.class}-{hw.section}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {new Date(hw.dueDate).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{hw.submittedCount}/{hw.totalStudents}</div>
                            <div className="text-gray-500">
                              {getCompletionPercentage(hw.submittedCount, hw.totalStudents)}% completed
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(hw.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewDetails(hw)}
                              className="border-purple-200 text-purple-700 hover:bg-purple-50 p-2"
                            >
                              <Eye size={14} />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewSubmissions(hw)}
                              className="border-green-200 text-green-700 hover:bg-green-50 p-2"
                            >
                              <FileText size={14} />
                            </Button>
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

        <TabsContent value="submissions" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-600">Recent Submissions</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-purple-600 font-semibold min-w-[140px]">Student</TableHead>
                      <TableHead className="text-purple-600 font-semibold min-w-[100px]">Roll No</TableHead>
                      <TableHead className="text-purple-600 font-semibold min-w-[200px]">Homework</TableHead>
                      <TableHead className="text-purple-600 font-semibold min-w-[120px]">Submitted On</TableHead>
                      <TableHead className="text-purple-600 font-semibold min-w-[100px]">Status</TableHead>
                      <TableHead className="text-purple-600 font-semibold min-w-[80px]">Grade</TableHead>
                      <TableHead className="text-purple-600 font-semibold min-w-[150px]">Feedback</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission) => {
                      const hw = homework.find(h => h.id === submission.homeworkId);
                      return (
                        <TableRow key={submission.id}>
                          <TableCell className="font-medium">{submission.studentName}</TableCell>
                          <TableCell>{submission.rollNo}</TableCell>
                          <TableCell>{hw?.title}</TableCell>
                          <TableCell>
                            {new Date(submission.submissionDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{getSubmissionStatusBadge(submission.status)}</TableCell>
                          <TableCell>
                            {submission.grade ? (
                              <Badge className="bg-blue-100 text-blue-800">
                                {submission.grade}
                              </Badge>
                            ) : (
                              '-'
                            )}
                          </TableCell>
                          <TableCell className="max-w-[150px] truncate">
                            {submission.feedback || '-'}
                          </TableCell>
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

      <CreateHomeworkDialog 
        open={createHomeworkOpen} 
        onOpenChange={setCreateHomeworkOpen}
        onCreateHomework={handleCreateHomework}
      />

      {selectedHomework && (
        <HomeworkDetailsDialog 
          open={homeworkDetailsOpen} 
          onOpenChange={setHomeworkDetailsOpen}
          homework={selectedHomework}
        />
      )}

      {selectedHomework && (
        <SubmissionsDialog 
          open={submissionsOpen} 
          onOpenChange={setSubmissionsOpen}
          homework={selectedHomework}
          submissions={submissions.filter(s => s.homeworkId === selectedHomework.id)}
        />
      )}
    </div>
  );
};

export default HomeworkManagement;
