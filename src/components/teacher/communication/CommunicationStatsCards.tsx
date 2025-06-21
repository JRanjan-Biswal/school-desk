
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Clock, Send, Eye } from "lucide-react";

interface StatsData {
  total: number;
  unread: number;
  sent: number;
  received: number;
}

interface CommunicationStatsCardsProps {
  stats: StatsData;
}

const CommunicationStatsCards = ({ stats }: CommunicationStatsCardsProps) => {
  const statsConfig = [
    {
      label: "Total Messages",
      value: stats.total,
      icon: MessageSquare,
      color: "text-purple-600"
    },
    {
      label: "Unread",
      value: stats.unread,
      icon: Clock,
      color: "text-red-600"
    },
    {
      label: "Sent",
      value: stats.sent,
      icon: Send,
      color: "text-green-600"
    },
    {
      label: "Received",
      value: stats.received,
      icon: Eye,
      color: "text-blue-600"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {statsConfig.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-xs md:text-sm font-medium text-gray-600 truncate">{stat.label}</p>
                  <p className={`text-lg md:text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <Icon className={`h-6 w-6 md:h-8 md:w-8 ${stat.color} flex-shrink-0`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default CommunicationStatsCards;
