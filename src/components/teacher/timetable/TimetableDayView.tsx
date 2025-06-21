
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock, Users, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, subDays } from "date-fns";
import { cn } from "@/lib/utils";

interface TimetableEntry {
  day: string;
  time: string;
  class: string;
  section: string;
  subject: string;
  room: string;
  students: number;
}

interface TimetableDayViewProps {
  timetableData: TimetableEntry[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onMarkAttendance?: () => void;
  onViewDetails?: (entry: TimetableEntry) => void;
}

const TimetableDayView = ({ 
  timetableData, 
  selectedDate, 
  onDateChange, 
  onMarkAttendance,
  onViewDetails 
}: TimetableDayViewProps) => {
  const dayName = format(selectedDate, "EEEE");
  const formattedDate = format(selectedDate, "MMMM d, yyyy");
  
  const todayClasses = timetableData
    .filter(entry => entry.day === dayName)
    .sort((a, b) => a.time.localeCompare(b.time));

  const handlePreviousDay = () => {
    onDateChange(subDays(selectedDate, 1));
  };

  const handleNextDay = () => {
    onDateChange(addDays(selectedDate, 1));
  };

  const handleViewDetails = (entry: TimetableEntry) => {
    if (onViewDetails) {
      onViewDetails(entry);
    }
  };

  const handleMarkAttendance = () => {
    if (onMarkAttendance) {
      onMarkAttendance();
    }
  };

  return (
    <div className="space-y-6">
      {/* Date Navigation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-purple-600">Select Date</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handlePreviousDay}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? formattedDate : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && onDateChange(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <Button variant="outline" size="sm" onClick={handleNextDay}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-lg font-semibold text-purple-600">
              {dayName}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Day Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="text-purple-600">
            Schedule for {formattedDate}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {todayClasses.length > 0 ? (
            <div className="space-y-4">
              {todayClasses.map((entry, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-5 w-5 text-purple-600" />
                        <span className="text-lg font-semibold text-purple-600">{entry.time}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {entry.class} - Section {entry.section}
                      </h3>
                      
                      <p className="text-gray-600 mb-3">{entry.subject}</p>
                      
                      <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{entry.room}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{entry.students} students</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(entry)}
                      >
                        View Details
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-purple-600 hover:bg-purple-700"
                        onClick={handleMarkAttendance}
                      >
                        Mark Attendance
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">No classes scheduled for {dayName}</p>
              <p className="text-sm">Enjoy your free day!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TimetableDayView;
