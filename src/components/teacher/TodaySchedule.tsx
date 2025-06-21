
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ScheduleItem {
  time: string;
  class: string;
  subject: string;
  duration: string;
}

interface TodayScheduleProps {
  schedule: ScheduleItem[];
}

const TodaySchedule = ({ schedule }: TodayScheduleProps) => {
  return (
    <Card className="p-4 md:p-6 bg-white border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-purple-600">Today's Schedule</h3>
      <div className="space-y-3">
        {schedule.map((scheduleItem, index) => (
          <div key={index} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-gray-50 rounded-lg border border-gray-100 gap-2">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900">{scheduleItem.time}</p>
              <p className="text-sm text-gray-600">{scheduleItem.class} - {scheduleItem.subject}</p>
            </div>
            <Badge variant="outline" className="flex-shrink-0 self-start sm:self-center">{scheduleItem.duration}</Badge>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TodaySchedule;
