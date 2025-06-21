
import { Card } from "@/components/ui/card";
import { Check, ArrowUp, Settings, Calendar } from "lucide-react";

interface StatsCardsProps {
  childData: {
    attendanceToday: string;
    attendancePercentage: number;
    homeworkPending: number;
    upcomingExams: number;
  };
}

const StatsCards = ({ childData }: StatsCardsProps) => {
  const statsCards = [
    {
      icon: Check,
      title: "Today's Status",
      value: childData.attendanceToday,
      subtitle: "Current status",
      color: "purple"
    },
    {
      icon: ArrowUp,
      title: "Attendance",
      value: `${childData.attendancePercentage}%`,
      subtitle: "+2% this month",
      color: "purple",
      trend: true
    },
    {
      icon: Settings,
      title: "Pending Homework",
      value: childData.homeworkPending,
      subtitle: "Due this week",
      color: "purple"
    },
    {
      icon: Calendar,
      title: "Upcoming Exams",
      value: childData.upcomingExams,
      subtitle: "Next week",
      color: "purple"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    <Icon className="text-purple-600" size={16} />
                  </div>
                  <p className="text-purple-600 font-semibold text-sm">{stat.title}</p>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
                <div className="flex items-center">
                  {stat.trend && <ArrowUp className="text-green-500 mr-1 flex-shrink-0" size={14} />}
                  <span className={`text-xs font-medium ${stat.trend ? 'text-green-600' : 'text-gray-500'}`}>
                    {stat.subtitle}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCards;
