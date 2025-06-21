
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle, XCircle, Clock } from "lucide-react";

interface Homework {
  id: number;
  title: string;
  subject: string;
  class: string;
  section: string;
  totalStudents: number;
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

interface SubmissionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  homework: Homework;
  submissions: Submission[];
}

const SubmissionsDialog = ({ open, onOpenChange, homework, submissions }: SubmissionsDialogProps) => {
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

  const submittedCount = submissions.filter(s => s.status === 'submitted').length;
  const lateCount = submissions.filter(s => s.status === 'late').length;
  const notSubmittedCount = homework.totalStudents - submissions.length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-purple-600 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Homework Submissions
          </DialogTitle>
          <DialogDescription>
            {homework.title} - {homework.class} {homework.section}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Submitted</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{submittedCount}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Late</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{lateCount}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Not Submitted</CardTitle>
                <XCircle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{notSubmittedCount}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-purple-600">Submission Details</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-purple-600 font-semibold">Student Name</TableHead>
                      <TableHead className="text-purple-600 font-semibold">Roll No</TableHead>
                      <TableHead className="text-purple-600 font-semibold">Submission Date</TableHead>
                      <TableHead className="text-purple-600 font-semibold">Status</TableHead>
                      <TableHead className="text-purple-600 font-semibold">Grade</TableHead>
                      <TableHead className="text-purple-600 font-semibold">Feedback</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.length > 0 ? (
                      submissions.map((submission) => (
                        <TableRow key={submission.id}>
                          <TableCell className="font-medium">{submission.studentName}</TableCell>
                          <TableCell>{submission.rollNo}</TableCell>
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
                              <span className="text-gray-400">Not graded</span>
                            )}
                          </TableCell>
                          <TableCell className="max-w-[200px]">
                            <div className="truncate" title={submission.feedback}>
                              {submission.feedback || <span className="text-gray-400">No feedback</span>}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          No submissions yet
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Total Students:</span>
                <span className="ml-2 font-medium">{homework.totalStudents}</span>
              </div>
              <div>
                <span className="text-gray-600">Submission Rate:</span>
                <span className="ml-2 font-medium">
                  {homework.totalStudents > 0 
                    ? Math.round((submittedCount / homework.totalStudents) * 100)
                    : 0}%
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
            <Button 
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => {
                // This could implement grading functionality
                console.log("Grade submissions");
              }}
            >
              Grade Submissions
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionsDialog;
