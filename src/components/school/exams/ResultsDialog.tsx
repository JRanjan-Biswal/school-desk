
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

interface ResultsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exam: Exam;
  results: Result[];
}

const ResultsDialog = ({ open, onOpenChange, exam, results }: ResultsDialogProps) => {
  const calculateStats = () => {
    if (results.length === 0) return { average: 0, highest: 0, lowest: 0, passRate: 0 };
    
    const scores = results.map(r => (r.marksObtained / r.totalMarks) * 100);
    const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const highest = Math.max(...scores);
    const lowest = Math.min(...scores);
    const passRate = (scores.filter(score => score >= 40).length / scores.length) * 100;
    
    return { average, highest, lowest, passRate };
  };

  const stats = calculateStats();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-purple-600">
            Results: {exam.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Average Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {stats.average.toFixed(1)}%
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Highest Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {stats.highest.toFixed(1)}%
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Lowest Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {stats.lowest.toFixed(1)}%
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Pass Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {stats.passRate.toFixed(1)}%
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-purple-600">Student Results</CardTitle>
            </CardHeader>
            <CardContent>
              {results.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-purple-600 font-semibold">Roll No</TableHead>
                      <TableHead className="text-purple-600 font-semibold">Student Name</TableHead>
                      <TableHead className="text-purple-600 font-semibold">Marks Obtained</TableHead>
                      <TableHead className="text-purple-600 font-semibold">Total Marks</TableHead>
                      <TableHead className="text-purple-600 font-semibold">Percentage</TableHead>
                      <TableHead className="text-purple-600 font-semibold">Grade</TableHead>
                      <TableHead className="text-purple-600 font-semibold">Remarks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((result) => {
                      const percentage = ((result.marksObtained / result.totalMarks) * 100).toFixed(1);
                      return (
                        <TableRow key={result.id}>
                          <TableCell className="font-medium">{result.rollNo}</TableCell>
                          <TableCell>{result.studentName}</TableCell>
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
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No results available for this exam yet.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResultsDialog;
