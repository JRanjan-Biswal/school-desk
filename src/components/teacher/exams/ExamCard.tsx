
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, BarChart3 } from "lucide-react";

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

interface ExamCardProps {
  exam: Exam;
  onViewDetails: (exam: Exam) => void;
  onViewResults: (exam: Exam) => void;
}

const ExamCard = ({ exam, onViewDetails, onViewResults }: ExamCardProps) => {
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

  return (
    <div className="border rounded-lg p-4 hover:bg-gray-50">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{exam.name}</h3>
          <p className="text-sm text-gray-600">{exam.subject} • {exam.class}-{exam.section}</p>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusBadge(exam.status)}
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
        <div>
          <span className="text-gray-500">Type:</span>
          <p className="font-medium">{exam.type}</p>
        </div>
        <div>
          <span className="text-gray-500">Date:</span>
          <p className="font-medium">{new Date(exam.date).toLocaleDateString()}</p>
        </div>
        <div>
          <span className="text-gray-500">Time:</span>
          <p className="font-medium">{exam.time}</p>
        </div>
        <div>
          <span className="text-gray-500">Total Marks:</span>
          <p className="font-medium">{exam.totalMarks}</p>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onViewDetails(exam)}
        >
          <Eye className="h-4 w-4 mr-1" />
          View Details
        </Button>
        {exam.status === 'completed' && (
          <Button 
            size="sm"
            className="bg-purple-600 hover:bg-purple-700"
            onClick={() => onViewResults(exam)}
          >
            <BarChart3 className="h-4 w-4 mr-1" />
            View Results
          </Button>
        )}
      </div>
    </div>
  );
};

export default ExamCard;
