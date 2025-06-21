
import { useState } from "react";

export interface Child {
  id: string;
  name: string;
  class: string;
  section: string;
  rollNo: string;
}

export interface ChildData {
  attendanceToday: string;
  attendancePercentage: number;
  homeworkPending: number;
  upcomingExams: number;
  feesDue: number;
}

export interface Homework {
  id: number;
  subject: string;
  title: string;
  dueDate: string;
  status: string;
}

export interface ScheduleItem {
  time: string;
  subject: string;
  teacher: string;
}

export interface Grade {
  subject: string;
  score: number;
  grade: string;
  date: string;
}

export const useParentState = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [selectedChild, setSelectedChild] = useState("child1");
  const [reportCardOpen, setReportCardOpen] = useState(false);
  const [payFeesOpen, setPayFeesOpen] = useState(false);

  return {
    activeSection,
    setActiveSection,
    selectedChild,
    setSelectedChild,
    reportCardOpen,
    setReportCardOpen,
    payFeesOpen,
    setPayFeesOpen,
  };
};
