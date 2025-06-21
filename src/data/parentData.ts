
import { Child, ChildData, Homework, ScheduleItem, Grade } from "@/hooks/useParentState";

export const children: Child[] = [
  { id: "child1", name: "Child 1", class: "Class 1", section: "A", rollNo: "001" },
  { id: "child2", name: "Child 2", class: "Class 3", section: "B", rollNo: "045" }
];

export const childData: ChildData = {
  attendanceToday: "Present",
  attendancePercentage: 92,
  homeworkPending: 2,
  upcomingExams: 1,
  feesDue: 0
};

export const todaySchedule: ScheduleItem[] = [
  { time: "09:00 AM", subject: "Mathematics", teacher: "Teacher 1" },
  { time: "10:00 AM", subject: "Science", teacher: "Teacher 2" },
  { time: "11:00 AM", subject: "English", teacher: "Teacher 3" },
  { time: "02:00 PM", subject: "History", teacher: "Teacher 4" }
];

export const recentGrades: Grade[] = [
  { subject: "Mathematics", score: 85, grade: "A", date: "2024-05-15" },
  { subject: "Science", score: 92, grade: "A+", date: "2024-05-12" },
  { subject: "English", score: 78, grade: "B+", date: "2024-05-10" },
  { subject: "History", score: 88, grade: "A", date: "2024-05-08" }
];

export const homework: Homework[] = [
  { id: 1, subject: "Mathematics", title: "Chapter 5 Exercises", dueDate: "2024-06-07", status: "pending" },
  { id: 2, subject: "Science", title: "Lab Report", dueDate: "2024-06-08", status: "pending" },
  { id: 3, subject: "English", title: "Essay Writing", dueDate: "2024-06-05", status: "submitted" }
];

export const menuItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "attendance", label: "Attendance" },
  { id: "performance", label: "Performance" },
  { id: "homework", label: "Homework" },
  { id: "timetable", label: "Timetable" },
  { id: "fees", label: "Fees" },
  { id: "exams", label: "Exams & Events" },
  { id: "materials", label: "Study Materials" },
  { id: "messages", label: "Messages" },
  { id: "settings", label: "Settings" }
];
