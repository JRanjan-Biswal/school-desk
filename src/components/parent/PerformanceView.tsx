import { useState, useEffect } from "react";
import PerformanceStats from "./PerformanceStats";
import PerformanceCharts from "./PerformanceCharts";
import SubjectAnalysis from "./SubjectAnalysis";
import RecentAssessments from "./RecentAssessments";

interface PerformanceViewProps {
  childId: string;
  childName: string;
  className: string;
}

interface GradeRecord {
  id: string;
  subject: string;
  score: number;
  maxScore: number;
  grade: string;
  date: string;
  examType: string;
  remarks: string;
}

interface SubjectPerformance {
  subject: string;
  averageScore: number;
  totalTests: number;
  trend: "up" | "down" | "stable";
  lastScore: number;
}

const PerformanceView = ({ childId, childName, className }: PerformanceViewProps) => {
  const [gradeRecords, setGradeRecords] = useState<GradeRecord[]>([]);
  const [subjectPerformance, setSubjectPerformance] = useState<SubjectPerformance[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState("current-term");
  const [performanceStats, setPerformanceStats] = useState({
    overallAverage: 0,
    rank: 0,
    totalStudents: 45,
    improvement: 0,
    strongestSubject: "",
    weakestSubject: ""
  });

  useEffect(() => {
    // Generate mock performance data
    const subjects = ["Mathematics", "Science", "English", "Hindi", "Social Studies", "Physical Education"];
    const examTypes = ["Unit Test", "Mid Term", "Assignment", "Project", "Quiz"];
    
    const mockGrades: GradeRecord[] = [];
    const subjectStats: { [key: string]: { scores: number[], total: number } } = {};
    
    // Initialize subject stats
    subjects.forEach(subject => {
      subjectStats[subject] = { scores: [], total: 0 };
    });

    // Generate grades for the last 3 months
    for (let i = 90; i >= 0; i -= 7) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue;
      
      // Generate 1-2 assessments per week
      const numAssessments = Math.random() > 0.7 ? 2 : 1;
      
      for (let j = 0; j < numAssessments; j++) {
        const subject = subjects[Math.floor(Math.random() * subjects.length)];
        const examType = examTypes[Math.floor(Math.random() * examTypes.length)];
        const baseScore = 70 + Math.random() * 25; // Base score between 70-95
        const score = Math.round(baseScore);
        const maxScore = examType === "Project" ? 50 : 100;
        
        const grade = score >= 90 ? "A+" : score >= 80 ? "A" : score >= 70 ? "B+" : score >= 60 ? "B" : "C";
        
        mockGrades.push({
          id: `grade-${i}-${j}`,
          subject,
          score,
          maxScore,
          grade,
          date: date.toISOString().split('T')[0],
          examType,
          remarks: score >= 85 ? "Excellent" : score >= 75 ? "Good" : "Needs improvement"
        });
        
        subjectStats[subject].scores.push(score);
        subjectStats[subject].total++;
      }
    }
    
    // Calculate subject performance
    const subjectPerf: SubjectPerformance[] = subjects.map(subject => {
      const stats = subjectStats[subject];
      const averageScore = stats.scores.length > 0 
        ? stats.scores.reduce((sum, score) => sum + score, 0) / stats.scores.length 
        : 0;
      
      const recentScores = stats.scores.slice(-3);
      const olderScores = stats.scores.slice(0, -3);
      const recentAvg = recentScores.length > 0 ? recentScores.reduce((a, b) => a + b, 0) / recentScores.length : 0;
      const olderAvg = olderScores.length > 0 ? olderScores.reduce((a, b) => a + b, 0) / olderScores.length : 0;
      
      let trend: "up" | "down" | "stable" = "stable";
      if (recentAvg > olderAvg + 2) trend = "up";
      else if (recentAvg < olderAvg - 2) trend = "down";
      
      return {
        subject,
        averageScore: Math.round(averageScore),
        totalTests: stats.total,
        trend,
        lastScore: stats.scores[stats.scores.length - 1] || 0
      };
    });
    
    // Calculate overall stats
    const allScores = mockGrades.map(g => g.score);
    const overallAverage = allScores.length > 0 ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length) : 0;
    const strongestSubject = subjectPerf.reduce((prev, current) => 
      (prev.averageScore > current.averageScore) ? prev : current
    ).subject;
    const weakestSubject = subjectPerf.reduce((prev, current) => 
      (prev.averageScore < current.averageScore) ? prev : current
    ).subject;
    
    setGradeRecords(mockGrades.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    setSubjectPerformance(subjectPerf);
    setPerformanceStats({
      overallAverage,
      rank: Math.floor(Math.random() * 10) + 1,
      totalStudents: 45,
      improvement: Math.floor(Math.random() * 10) - 5,
      strongestSubject,
      weakestSubject
    });
  }, [childId, selectedPeriod]);

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-0">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600 mb-2">Academic Performance</h2>
          <div className="text-sm sm:text-base text-gray-600 lg:hidden">
            <div>Child: {childName}</div>
            <div>Class: {className}</div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 lg:items-start">
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full sm:w-auto"
          >
            <option value="current-term">Current Term</option>
            <option value="last-term">Last Term</option>
            <option value="year">Full Year</option>
          </select>
          
          <div className="hidden lg:block text-sm text-gray-600 bg-gray-50 p-3 rounded-lg min-w-0">
            <div className="text-right">
              <div className="truncate">Child: {childName}</div>
              <div className="truncate">Class: {className}</div>
            </div>
          </div>
        </div>
      </div>

      <PerformanceStats stats={performanceStats} />
      
      <PerformanceCharts 
        gradeRecords={gradeRecords} 
        subjectPerformance={subjectPerformance} 
      />

      <SubjectAnalysis subjectPerformance={subjectPerformance} />

      <RecentAssessments gradeRecords={gradeRecords} />
    </div>
  );
};

export default PerformanceView;
