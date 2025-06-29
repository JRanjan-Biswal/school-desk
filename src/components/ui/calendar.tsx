
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 pointer-events-auto", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium text-lavender-700",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-70 hover:opacity-100 border-lavender-300 hover:border-lavender-500 hover:bg-lavender-50 text-lavender-600"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-lavender-600 rounded-md w-9 font-normal text-[0.8rem] font-medium",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-lavender-100/50 [&:has([aria-selected])]:bg-lavender-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-lavender-100 hover:text-lavender-800 text-gray-700"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-lavender-600 text-white hover:bg-lavender-700 hover:text-white focus:bg-lavender-600 focus:text-white rounded-md",
        day_today: "bg-lavender-100 text-lavender-800 font-medium border border-lavender-300",
        day_outside:
          "day-outside text-gray-400 opacity-50 aria-selected:bg-lavender-100/50 aria-selected:text-lavender-600 aria-selected:opacity-70",
        day_disabled: "text-gray-300 opacity-50",
        day_range_middle:
          "aria-selected:bg-lavender-100 aria-selected:text-lavender-800",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4 text-lavender-600" />,
        IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4 text-lavender-600" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
