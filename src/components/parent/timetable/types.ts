
export interface TimetableEntry {
  day: string;
  time: string;
  subject: string;
  teacher: string;
  room: string;
  type: "class" | "break" | "lunch" | "activity";
}

export interface TimetableSectionProps {
  currentChild?: { name: string };
}
