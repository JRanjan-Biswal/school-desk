
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import TimetableDatePicker from "./timetable/TimetableDatePicker";
import TimetableEntryItem from "./timetable/TimetableEntryItem";
import TimetableLegend from "./timetable/TimetableLegend";
import { timetableData } from "./timetable/timetableData";
import { TimetableSectionProps } from "./timetable/types";

const TimetableSection = ({ currentChild }: TimetableSectionProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const getSelectedDayName = () => {
    return daysOfWeek[selectedDate.getDay()];
  };

  const getTimetableForSelectedDay = () => {
    const dayName = getSelectedDayName();
    return timetableData.filter(entry => entry.day === dayName);
  };

  const selectedDayTimetable = getTimetableForSelectedDay();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-3xl font-bold text-purple-600">Timetable</h2>
        <div className="text-sm text-gray-600">
          Child: {currentChild?.name}
        </div>
      </div>

      <TimetableDatePicker 
        selectedDate={selectedDate} 
        onDateSelect={setSelectedDate} 
      />

      <Card className="p-6 bg-white border border-gray-200 shadow-sm">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-purple-600 mb-2">
            {getSelectedDayName()}, {format(selectedDate, "MMMM d, yyyy")}
          </h3>
          {selectedDayTimetable.length === 0 && (
            <p className="text-gray-500">No classes scheduled for this day.</p>
          )}
        </div>

        {selectedDayTimetable.length > 0 && (
          <div className="space-y-3">
            {selectedDayTimetable.map((entry, index) => (
              <TimetableEntryItem key={index} entry={entry} />
            ))}
          </div>
        )}
      </Card>

      <TimetableLegend />
    </div>
  );
};

export default TimetableSection;
