
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { User, BookOpen, Calendar, TrendingUp, Award } from "lucide-react";

interface StudentPerformance {
  id: number;
  name: string;
  rollNo: string;
  class: string;
  section: string;
  averageScore: number;
  lastScore: number;
  trend: "up" | "down" | "stable";
  subjects: {
    subject: string;
    score: number;
    grade: string;
  }[];
  attendance: number;
  behavior: "excellent" | "good" | "fair" | "poor";
  recentTests: {
    test: string;
    subject: string;
    score: number;
    date: string;
  }[];
}

interface StudentPerformanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: StudentPerformance;
}

const StudentPerformanceDialog = ({ open, onOpenChange, student }: StudentPerformanceDialogProps) => {
  const performanceTrend = [
    { month: "Jan", score: student.averageScore - 8 },
    { month: "Feb", score: student.averageScore - 5 },
    { month: "Mar", score: student.averageScore - 2 },
    { month: "Apr", score: student.averageScore + 1 },
    { month: "May", score: student.averageScore + 3 },
    { month: "Jun", score: student.lastScore }
  ];

  const subjectRadarData = student.subjects.map(subject => ({
    subject: subject.subject,
    score: subject.score,
    fullMark: 100
  }));

  const getBehaviorBadge = (behavior: string) => {
    switch (behavior) {
      case "excellent":
        return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
      case "good":
        return <Badge className="bg-blue-100 text-blue-800">Good</Badge>;
      case "fair":
        return <Badge className="bg-yellow-100 text-yellow-800">Fair</Badge>;
      case "poor":
        return <Badge className="bg-red-100 text-red-800">Poor</Badge>;
      default:
        return <Badge>{behavior}</Badge>;
    }
  };

  const getGradeBadge = (grade: string) => {
    if (grade.includes("A")) {
      return <Badge className="bg-green-100 text-green-800">{grade}</Badge>;
    } else if (grade.includes("B")) {
      return <Badge className="bg-blue-100 text-blue-800">{grade}</Badge>;
    } else if (grade.includes("C")) {
      return <Badge className="bg-yellow-100 text-yellow-800">{grade}</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800">{grade}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-purple-600 flex items-center">
            <User className="mr-2" size={20} />
            {student.name} - Performance Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Student Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-600 flex items-center">
                <BookOpen className="mr-2" size={18} />
                Student Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Roll Number</p>
                  <p className="font-semibold">{student.rollNo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Class & Section</p>
                  <p className="font-semibold">{student.class}-{student.section}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Average Score</p>
                  <p className="font-semibold text-purple-600">{student.averageScore}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Attendance</p>
                  <p className={`font-semibold ${student.attendance >= 90 ? "text-green-600" : student.attendance >= 80 ? "text-yellow-600" : "text-red-600"}`}>
                    {student.attendance}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Score</p>
                  <p className="font-semibold">{student.lastScore}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Behavior</p>
                  {getBehaviorBadge(student.behavior)}
                </div>
                <div>
                  <p className="text-sm text-gray-600">Trend</p>
                  <div className="flex items-center">
                    {student.trend === "up" ? (
                      <Badge className="bg-green-100 text-green-800">Improving</Badge>
                    ) : student.trend === "down" ? (
                      <Badge className="bg-red-100 text-red-800">Declining</Badge>
                    ) : (
                      <Badge className="bg-blue-100 text-blue-800">Stable</Badge>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Overall Status</p>
                  {student.averageScore >= 85 ? (
                    <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                  ) : student.averageScore >= 70 ? (
                    <Badge className="bg-blue-100 text-blue-800">Good</Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-800">Needs Help</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-purple-600 flex items-center">
                  <TrendingUp className="mr-2" size={18} />
                  Performance Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{
                  score: { label: "Score", color: "#8b5cf6" }
                }} className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-purple-600 flex items-center">
                  <Award className="mr-2" size={18} />
                  Subject Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{
                  score: { label: "Score", color: "#8b5cf6" }
                }} className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={subjectRadarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis domain={[0, 100]} />
                      <Radar name="Score" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                    </RadarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Subject-wise Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-600">Subject-wise Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {student.subjects.map((subject, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{subject.subject}</h4>
                      {getGradeBadge(subject.grade)}
                    </div>
                    <div className="text-2xl font-bold text-purple-600">{subject.score}%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${subject.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Test Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-600 flex items-center">
                <Calendar className="mr-2" size={18} />
                Recent Test Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {student.recentTests.map((test, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border">
                    <div>
                      <p className="font-medium">{test.test}</p>
                      <p className="text-sm text-gray-600">{test.subject} - {new Date(test.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-purple-600">{test.score}%</p>
                      {test.score >= 85 ? (
                        <Badge className="bg-green-100 text-green-800 text-xs">Excellent</Badge>
                      ) : test.score >= 70 ? (
                        <Badge className="bg-blue-100 text-blue-800 text-xs">Good</Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800 text-xs">Needs Improvement</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentPerformanceDialog;
