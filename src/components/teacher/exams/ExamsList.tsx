
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import ExamCard from "./ExamCard";

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

interface ExamsListProps {
  examsList: Exam[];
  onViewDetails: (exam: Exam) => void;
  onViewResults: (exam: Exam) => void;
}

const ExamsList = ({ examsList, onViewDetails, onViewResults }: ExamsListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-purple-600">My Exams</CardTitle>
      </CardHeader>
      <CardContent>
        {examsList.length > 0 ? (
          <div className="space-y-4">
            {examsList.map((exam) => (
              <ExamCard
                key={exam.id}
                exam={exam}
                onViewDetails={onViewDetails}
                onViewResults={onViewResults}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No exams scheduled yet.</p>
            <p className="text-sm">Start by scheduling your first exam.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExamsList;
