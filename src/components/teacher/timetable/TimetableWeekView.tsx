
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, MapPin } from "lucide-react";

interface TimetableEntry {
  day: string;
  time: string;
  class: string;
  section: string;
  subject: string;
  room: string;
  students: number;
}

interface TimetableWeekViewProps {
  timetableData: TimetableEntry[];
}

const TimetableWeekView = ({ timetableData }: TimetableWeekViewProps) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const getClassesForDay = (day: string) => {
    return timetableData
      .filter(entry => entry.day === day)
      .sort((a, b) => a.time.localeCompare(b.time));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-purple-600">Weekly Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {days.map(day => (
            <div key={day} className="space-y-3">
              <h3 className="font-semibold text-center p-2 bg-purple-50 rounded-lg text-purple-700">
                {day}
              </h3>
              <div className="space-y-2">
                {getClassesForDay(day).map((entry, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium text-purple-600">{entry.time}</span>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="font-semibold text-gray-900">
                        {entry.class} - {entry.section}
                      </p>
                      <p className="text-sm text-gray-600">{entry.subject}</p>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <MapPin className="h-3 w-3" />
                        <span>{entry.room}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Users className="h-3 w-3" />
                        <span>{entry.students} students</span>
                      </div>
                    </div>
                  </div>
                ))}
                {getClassesForDay(day).length === 0 && (
                  <div className="p-3 text-center text-gray-400 text-sm">
                    No classes
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimetableWeekView;
