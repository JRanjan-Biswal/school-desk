
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TimetableDatePickerProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const TimetableDatePicker = ({ selectedDate, onDateSelect }: TimetableDatePickerProps) => {
  return (
    <Card className="p-6 bg-white border border-gray-200 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <h3 className="text-lg font-semibold text-purple-600">Select Date</h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full sm:w-[280px] justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && onDateSelect(date)}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
    </Card>
  );
};

export default TimetableDatePicker;
