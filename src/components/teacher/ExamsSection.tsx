
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ExamDetailsDialog from "@/components/school/exams/ExamDetailsDialog";
import ResultsDialog from "@/components/school/exams/ResultsDialog";
import CreateExamDialog from "@/components/school/exams/CreateExamDialog";
import ExamStatsCards from "./exams/ExamStatsCards";
import ExamsList from "./exams/ExamsList";
import { generateMockResults, getMockExams } from "./exams/examUtils";

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

interface ExamsSectionProps {
  onCreateExam: () => void;
}

const ExamsSection = ({ onCreateExam }: ExamsSectionProps) => {
  const [examsList, setExamsList] = useState<Exam[]>([]);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [createExamOpen, setCreateExamOpen] = useState(false);
  const [examResults, setExamResults] = useState<Result[]>([]);

  useEffect(() => {
    setExamsList(getMockExams());
  }, []);

  const handleViewDetails = (exam: Exam) => {
    setSelectedExam(exam);
    setDetailsOpen(true);
  };

  const handleViewResults = (exam: Exam) => {
    setSelectedExam(exam);
    const mockResults = generateMockResults(exam.id);
    setExamResults(mockResults);
    setResultsOpen(true);
  };

  const handleCreateExam = (examData: any) => {
    const newExam: Exam = {
      id: examsList.length + 1,
      ...examData,
      status: new Date(examData.date) > new Date() ? 'upcoming' : 'completed'
    };
    setExamsList([...examsList, newExam]);
    console.log("Creating exam:", examData);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-purple-600">Exams & Marks</h2>
        <Button 
          className="bg-purple-600 hover:bg-purple-700"
          onClick={() => setCreateExamOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Schedule New Exam
        </Button>
      </div>

      <ExamStatsCards examsList={examsList} />

      <ExamsList 
        examsList={examsList}
        onViewDetails={handleViewDetails}
        onViewResults={handleViewResults}
      />

      {selectedExam && (
        <>
          <ExamDetailsDialog
            open={detailsOpen}
            onOpenChange={setDetailsOpen}
            exam={selectedExam}
          />
          <ResultsDialog
            open={resultsOpen}
            onOpenChange={setResultsOpen}
            exam={selectedExam}
            results={examResults}
          />
        </>
      )}
      
      <CreateExamDialog
        open={createExamOpen}
        onOpenChange={setCreateExamOpen}
        onCreateExam={handleCreateExam}
      />
    </div>
  );
};

export default ExamsSection;
