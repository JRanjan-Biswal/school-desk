
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Plus, Users, Calendar, Eye } from "lucide-react";
import HomeworkDetailsDialog from "@/components/school/homework/HomeworkDetailsDialog";
import SubmissionsDialog from "@/components/school/homework/SubmissionsDialog";

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

interface HomeworkSectionProps {
  onAddHomework: () => void;
}

const HomeworkSection = ({ onAddHomework }: HomeworkSectionProps) => {
  const [homeworkList, setHomeworkList] = useState<Homework[]>([]);
  const [selectedHomework, setSelectedHomework] = useState<Homework | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [submissionsOpen, setSubmissionsOpen] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  // Mock homework data
  useEffect(() => {
    const mockHomework: Homework[] = [
      {
        id: 1,
        title: "Mathematics Chapter 5 - Fractions",
        subject: "Mathematics",
        class: "Class 1",
        section: "A",
        description: "Complete exercises 1-10 from the textbook. Show all working steps clearly.",
        dueDate: "2024-01-20",
        assignedDate: "2024-01-15",
        status: "active",
        assignedBy: "Teacher 1",
        totalStudents: 42,
        submittedCount: 15
      },
      {
        id: 2,
        title: "Science Project - Solar System",
        subject: "Science",
        class: "Class 2",
        section: "B",
        description: "Create a model of the solar system using cardboard and paint.",
        dueDate: "2024-01-25",
        assignedDate: "2024-01-10",
        status: "active",
        assignedBy: "Teacher 1",
        totalStudents: 43,
        submittedCount: 8
      },
      {
        id: 3,
        title: "English Essay - My School",
        subject: "English",
        class: "Class 1",
        section: "A",
        description: "Write a 200-word essay about your school experience.",
        dueDate: "2024-01-18",
        assignedDate: "2024-01-12",
        status: "overdue",
        assignedBy: "Teacher 1",
        totalStudents: 42,
        submittedCount: 38
      }
    ];
    setHomeworkList(mockHomework);
  }, []);

  // Mock submissions data
  const generateSubmissions = (homeworkId: number, totalStudents: number, submittedCount: number): Submission[] => {
    const submissions: Submission[] = [];
    for (let i = 1; i <= submittedCount; i++) {
      submissions.push({
        id: i,
        homeworkId,
        studentId: i,
        studentName: `Student ${i}`,
        rollNo: `${String(i).padStart(3, '0')}`,
        submissionDate: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: Math.random() > 0.8 ? 'late' : 'submitted',
        grade: Math.random() > 0.5 ? ['A', 'B', 'C'][Math.floor(Math.random() * 3)] : undefined,
        feedback: Math.random() > 0.7 ? "Good work, keep it up!" : undefined
      });
    }
    return submissions;
  };

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

  const handleViewDetails = (homework: Homework) => {
    setSelectedHomework(homework);
    setDetailsOpen(true);
  };

  const handleViewSubmissions = (homework: Homework) => {
    setSelectedHomework(homework);
    const mockSubmissions = generateSubmissions(homework.id, homework.totalStudents, homework.submittedCount);
    setSubmissions(mockSubmissions);
    setSubmissionsOpen(true);
  };

  const activeHomework = homeworkList.filter(hw => hw.status === 'active');
  const overdueHomework = homeworkList.filter(hw => hw.status === 'overdue');
  const totalSubmissions = homeworkList.reduce((sum, hw) => sum + hw.submittedCount, 0);
  const totalAssigned = homeworkList.reduce((sum, hw) => sum + hw.totalStudents, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-purple-600">Homework Management</h2>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          onClick={onAddHomework}
        >
          <Plus className="h-4 w-4 mr-2" />
          Assign New Homework
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Assignments</CardTitle>
            <BookOpen className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{homeworkList.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{activeHomework.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Overdue</CardTitle>
            <Calendar className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueHomework.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Submissions</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalSubmissions}</div>
            <p className="text-xs text-gray-500">out of {totalAssigned}</p>
          </CardContent>
        </Card>
      </div>

      {/* Homework List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-purple-600">My Homework Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          {homeworkList.length > 0 ? (
            <div className="space-y-4">
              {homeworkList.map((homework) => (
                <div key={homework.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{homework.title}</h3>
                      <p className="text-sm text-gray-600">{homework.subject} • {homework.class}-{homework.section}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(homework.status)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                    <div>
                      <span className="text-gray-500">Assigned:</span>
                      <p className="font-medium">{new Date(homework.assignedDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Due Date:</span>
                      <p className="font-medium">{new Date(homework.dueDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Total Students:</span>
                      <p className="font-medium">{homework.totalStudents}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Submissions:</span>
                      <p className="font-medium">{homework.submittedCount}/{homework.totalStudents}</p>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails(homework)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button 
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => handleViewSubmissions(homework)}
                    >
                      <Users className="h-4 w-4 mr-1" />
                      View Submissions
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No homework assignments found.</p>
              <p className="text-sm">Start by creating your first homework assignment.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      {selectedHomework && (
        <>
          <HomeworkDetailsDialog
            open={detailsOpen}
            onOpenChange={setDetailsOpen}
            homework={selectedHomework}
          />
          <SubmissionsDialog
            open={submissionsOpen}
            onOpenChange={setSubmissionsOpen}
            homework={selectedHomework}
            submissions={submissions}
          />
        </>
      )}
    </div>
  );
};

export default HomeworkSection;
