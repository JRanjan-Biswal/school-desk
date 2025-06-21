
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, BookOpen, Users, Clock } from "lucide-react";

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

interface HomeworkDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  homework: Homework;
}

const HomeworkDetailsDialog = ({ open, onOpenChange, homework }: HomeworkDetailsDialogProps) => {
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

  const getCompletionPercentage = () => {
    return homework.totalStudents > 0 ? Math.round((homework.submittedCount / homework.totalStudents) * 100) : 0;
  };

  const getDaysRemaining = () => {
    const today = new Date();
    const dueDate = new Date(homework.dueDate);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-purple-600 flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Homework Details
          </DialogTitle>
          <DialogDescription>
            View complete homework assignment information
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{homework.title}</h3>
              <p className="text-gray-600 mt-1">{homework.subject} • {homework.class}-{homework.section}</p>
            </div>
            {getStatusBadge(homework.status)}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Assigned Date</CardTitle>
                <CalendarDays className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold">
                  {new Date(homework.assignedDate).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Due Date</CardTitle>
                <Clock className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-semibold">
                  {new Date(homework.dueDate).toLocaleDateString()}
                </div>
                <p className="text-sm text-gray-600">
                  {getDaysRemaining() > 0 ? `${getDaysRemaining()} days remaining` : 
                   getDaysRemaining() === 0 ? 'Due today' : 
                   `${Math.abs(getDaysRemaining())} days overdue`}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-purple-600 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Submission Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Submitted:</span>
                  <span className="font-semibold">{homework.submittedCount}/{homework.totalStudents}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${getCompletionPercentage()}%` }}
                  ></div>
                </div>
                <div className="text-right text-sm text-gray-600">
                  {getCompletionPercentage()}% completed
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-purple-600">Description & Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">{homework.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-purple-600">Assignment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Assigned by:</span>
                <span className="font-medium">{homework.assignedBy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Class:</span>
                <span className="font-medium">{homework.class} - Section {homework.section}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Subject:</span>
                <span className="font-medium">{homework.subject}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Students:</span>
                <span className="font-medium">{homework.totalStudents}</span>
              </div>
            </CardContent>
          </Card>

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
                // This could open the submissions dialog
                onOpenChange(false);
              }}
            >
              View Submissions
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HomeworkDetailsDialog;
