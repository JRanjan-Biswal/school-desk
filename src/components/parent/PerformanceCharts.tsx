
import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";

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

interface PerformanceChartsProps {
  gradeRecords: GradeRecord[];
  subjectPerformance: SubjectPerformance[];
}

const PerformanceCharts = ({ gradeRecords, subjectPerformance }: PerformanceChartsProps) => {
  const chartData = gradeRecords
    .slice(0, 15)
    .reverse()
    .map(record => ({
      date: new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      score: record.score,
      subject: record.subject
    }));

  const subjectChartData = subjectPerformance.map(subject => ({
    subject: subject.subject.length > 8 ? subject.subject.substring(0, 8) + '...' : subject.subject,
    fullSubject: subject.subject,
    average: subject.averageScore,
    tests: subject.totalTests
  }));

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
      <Card className="p-4 sm:p-6 bg-white border border-gray-200 shadow-sm">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-purple-600">Score Trend</h3>
        <div className="h-64 sm:h-80 lg:h-96 w-full overflow-hidden">
          <ChartContainer
            config={{
              score: {
                label: "Score",
                color: "#8B5CF6",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={chartData}
                margin={{ top: 20, right: 20, left: 10, bottom: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="date" 
                  fontSize={10}
                  tick={{ fontSize: 10, fill: "#6B7280" }}
                  interval="preserveStartEnd"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  axisLine={{ stroke: "#D1D5DB" }}
                />
                <YAxis 
                  domain={[0, 100]} 
                  fontSize={10}
                  tick={{ fontSize: 10, fill: "#6B7280" }}
                  axisLine={{ stroke: "#D1D5DB" }}
                  tickLine={{ stroke: "#D1D5DB" }}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  labelStyle={{ color: "#374151" }}
                  contentStyle={{ 
                    backgroundColor: "white", 
                    border: "1px solid #D1D5DB",
                    borderRadius: "8px"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  dot={{ fill: "#8B5CF6", r: 4, strokeWidth: 2, stroke: "white" }}
                  activeDot={{ r: 6, stroke: "#8B5CF6", strokeWidth: 2, fill: "white" }}
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </Card>

      <Card className="p-4 sm:p-6 bg-white border border-gray-200 shadow-sm">
        <h3 className="text-lg sm:text-xl font-semibold mb-4 text-purple-600">Subject Performance</h3>
        <div className="h-64 sm:h-80 lg:h-96 w-full overflow-hidden">
          <ChartContainer
            config={{
              average: {
                label: "Average Score",
                color: "#A855F7",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={subjectChartData}
                margin={{ top: 20, right: 20, left: 10, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="subject" 
                  fontSize={9}
                  tick={{ fontSize: 9, fill: "#6B7280" }}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={70}
                  axisLine={{ stroke: "#D1D5DB" }}
                />
                <YAxis 
                  domain={[0, 100]} 
                  fontSize={10}
                  tick={{ fontSize: 10, fill: "#6B7280" }}
                  axisLine={{ stroke: "#D1D5DB" }}
                  tickLine={{ stroke: "#D1D5DB" }}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  labelFormatter={(value, payload) => {
                    const item = payload?.[0]?.payload;
                    return item?.fullSubject || value;
                  }}
                  contentStyle={{ 
                    backgroundColor: "white", 
                    border: "1px solid #D1D5DB",
                    borderRadius: "8px"
                  }}
                />
                <Bar 
                  dataKey="average" 
                  fill="#A855F7"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </Card>
    </div>
  );
};

export default PerformanceCharts;
