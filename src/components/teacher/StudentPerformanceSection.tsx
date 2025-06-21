
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingUp, TrendingDown, Eye, AlertTriangle, Award, Users } from "lucide-react";
import StudentPerformanceDialog from "./StudentPerformanceDialog";

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

const StudentPerformanceSection = () => {
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState<StudentPerformance | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const studentPerformanceData: StudentPerformance[] = [
    {
      id: 1,
      name: "Student 1",
      rollNo: "001",
      class: "Class 1",
      section: "A",
      averageScore: 85,
      lastScore: 88,
      trend: "up",
      subjects: [
        { subject: "Mathematics", score: 88, grade: "A" },
        { subject: "Science", score: 82, grade: "B+" },
        { subject: "English", score: 85, grade: "A-" }
      ],
      attendance: 95,
      behavior: "excellent",
      recentTests: [
        { test: "Unit Test 1", subject: "Mathematics", score: 88, date: "2025-06-08" },
        { test: "Quiz 2", subject: "Science", score: 82, date: "2025-06-06" }
      ]
    },
    {
      id: 2,
      name: "Student 2",
      rollNo: "002",
      class: "Class 1",
      section: "A",
      averageScore: 72,
      lastScore: 68,
      trend: "down",
      subjects: [
        { subject: "Mathematics", score: 68, grade: "C+" },
        { subject: "Science", score: 75, grade: "B-" },
        { subject: "English", score: 73, grade: "B-" }
      ],
      attendance: 88,
      behavior: "good",
      recentTests: [
        { test: "Unit Test 1", subject: "Mathematics", score: 68, date: "2025-06-08" },
        { test: "Quiz 2", subject: "Science", score: 75, date: "2025-06-06" }
      ]
    },
    {
      id: 3,
      name: "Student 3",
      rollNo: "003",
      class: "Class 2",
      section: "B",
      averageScore: 91,
      lastScore: 94,
      trend: "up",
      subjects: [
        { subject: "Mathematics", score: 94, grade: "A+" },
        { subject: "Science", score: 89, grade: "A" },
        { subject: "English", score: 90, grade: "A" }
      ],
      attendance: 98,
      behavior: "excellent",
      recentTests: [
        { test: "Unit Test 1", subject: "Mathematics", score: 94, date: "2025-06-08" },
        { test: "Quiz 2", subject: "Science", score: 89, date: "2025-06-06" }
      ]
    },
    {
      id: 4,
      name: "Student 4",
      rollNo: "004",
      class: "Class 2",
      section: "B",
      averageScore: 65,
      lastScore: 62,
      trend: "down",
      subjects: [
        { subject: "Mathematics", score: 62, grade: "D+" },
        { subject: "Science", score: 68, grade: "C+" },
        { subject: "English", score: 65, grade: "C" }
      ],
      attendance: 82,
      behavior: "fair",
      recentTests: [
        { test: "Unit Test 1", subject: "Mathematics", score: 62, date: "2025-06-08" },
        { test: "Quiz 2", subject: "Science", score: 68, date: "2025-06-06" }
      ]
    }
  ];

  const chartData = [
    { month: "Jan", average: 78 },
    { month: "Feb", average: 80 },
    { month: "Mar", average: 82 },
    { month: "Apr", average: 79 },
    { month: "May", average: 85 },
    { month: "Jun", average: 83 }
  ];

  const subjectData = [
    { subject: "Mathematics", average: 78 },
    { subject: "Science", average: 81 },
    { subject: "English", average: 79 }
  ];

  const filteredStudents = selectedClass === "all" 
    ? studentPerformanceData 
    : studentPerformanceData.filter(student => student.class === selectedClass);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-400" />;
    }
  };

  const getTrendBadge = (trend: string, score: number) => {
    if (trend === "up") {
      return <Badge className="bg-green-100 text-green-800">Improving</Badge>;
    } else if (trend === "down" && score < 70) {
      return <Badge className="bg-red-100 text-red-800">Needs Help</Badge>;
    } else if (trend === "down") {
      return <Badge className="bg-yellow-100 text-yellow-800">Declining</Badge>;
    }
    return <Badge className="bg-blue-100 text-blue-800">Stable</Badge>;
  };

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

  const handleViewDetails = (student: StudentPerformance) => {
    setSelectedStudent(student);
    setDetailsOpen(true);
  };

  const performanceStats = {
    totalStudents: filteredStudents.length,
    topPerformers: filteredStudents.filter(s => s.averageScore >= 85).length,
    needsAttention: filteredStudents.filter(s => s.averageScore < 70).length,
    averageClassScore: Math.round(filteredStudents.reduce((sum, s) => sum + s.averageScore, 0) / filteredStudents.length) || 0
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-purple-600">Student Performance</h2>
          <p className="text-gray-600">Monitor and analyze student academic progress</p>
        </div>
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            <SelectItem value="Class 1">Class 1</SelectItem>
            <SelectItem value="Class 2">Class 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Performance Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{performanceStats.totalStudents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Top Performers</CardTitle>
            <Award className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{performanceStats.topPerformers}</div>
            <p className="text-xs text-gray-500">85% and above</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Needs Attention</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{performanceStats.needsAttention}</div>
            <p className="text-xs text-gray-500">Below 70%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Class Average</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{performanceStats.averageClassScore}%</div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-purple-600">Class Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{
              average: { label: "Average Score", color: "#8b5cf6" }
            }} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="average" stroke="#8b5cf6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-purple-600">Subject-wise Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{
              average: { label: "Average Score", color: "#8b5cf6" }
            }} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="average" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Student Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-purple-600">Individual Student Performance</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-purple-600 font-semibold min-w-[120px]">Roll No</TableHead>
                  <TableHead className="text-purple-600 font-semibold min-w-[140px]">Student Name</TableHead>
                  <TableHead className="text-purple-600 font-semibold min-w-[100px]">Class</TableHead>
                  <TableHead className="text-purple-600 font-semibold min-w-[120px]">Average Score</TableHead>
                  <TableHead className="text-purple-600 font-semibold min-w-[120px]">Last Score</TableHead>
                  <TableHead className="text-purple-600 font-semibold min-w-[100px]">Trend</TableHead>
                  <TableHead className="text-purple-600 font-semibold min-w-[120px]">Attendance</TableHead>
                  <TableHead className="text-purple-600 font-semibold min-w-[100px]">Behavior</TableHead>
                  <TableHead className="text-purple-600 font-semibold min-w-[100px]">Status</TableHead>
                  <TableHead className="text-purple-600 font-semibold min-w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.rollNo}</TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.class}-{student.section}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{student.averageScore}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span>{student.lastScore}%</span>
                        {getTrendIcon(student.trend)}
                      </div>
                    </TableCell>
                    <TableCell>{getTrendBadge(student.trend, student.averageScore)}</TableCell>
                    <TableCell>
                      <span className={student.attendance >= 90 ? "text-green-600" : student.attendance >= 80 ? "text-yellow-600" : "text-red-600"}>
                        {student.attendance}%
                      </span>
                    </TableCell>
                    <TableCell>{getBehaviorBadge(student.behavior)}</TableCell>
                    <TableCell>
                      {student.averageScore >= 85 ? (
                        <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                      ) : student.averageScore >= 70 ? (
                        <Badge className="bg-blue-100 text-blue-800">Good</Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">Needs Help</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewDetails(student)}
                        className="border-purple-200 text-purple-700 hover:bg-purple-50"
                      >
                        <Eye size={14} className="mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {selectedStudent && (
        <StudentPerformanceDialog
          open={detailsOpen}
          onOpenChange={setDetailsOpen}
          student={selectedStudent}
        />
      )}
    </div>
  );
};

export default StudentPerformanceSection;
