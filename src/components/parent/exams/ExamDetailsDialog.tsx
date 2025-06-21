
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, FileText, BookOpen, AlertCircle } from "lucide-react";

interface Exam {
  id: number;
  name: string;
  subject: string;
  date: string;
  time: string;
  duration: number;
  totalMarks: number;
  status: 'upcoming' | 'completed';
  syllabus?: string;
  instructions?: string;
}

interface ExamDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exam: Exam;
}

const ExamDetailsDialog = ({ open, onOpenChange, exam }: ExamDetailsDialogProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800">Upcoming</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-purple-600 flex items-center justify-between">
            Exam Details
            {getStatusBadge(exam.status)}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-purple-600">{exam.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Subject:</span>
                  <span className="font-medium">{exam.subject}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Total Marks:</span>
                  <span className="font-medium">{exam.totalMarks}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Date:</span>
                  <span className="font-medium">{new Date(exam.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Time:</span>
                  <span className="font-medium">{exam.time}</span>
                </div>
                <div className="flex items-center space-x-2 col-span-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Duration:</span>
                  <span className="font-medium">{exam.duration} minutes</span>
                </div>
              </div>
              
              {exam.syllabus && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Syllabus:
                  </h4>
                  <p className="text-gray-600 text-sm bg-blue-50 p-3 rounded-lg">{exam.syllabus}</p>
                </div>
              )}

              {exam.instructions && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Instructions:
                  </h4>
                  <p className="text-gray-600 text-sm bg-yellow-50 p-3 rounded-lg">{exam.instructions}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExamDetailsDialog;
