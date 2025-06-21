
import { useState } from "react";
import { Calendar, Users, Settings, Check, BookOpen, DollarSign, MessageSquare } from "lucide-react";
import SchoolSidebar from "@/components/school/SchoolSidebar";
import SchoolDashboard from "@/components/school/SchoolDashboard";
import StudentsManagement from "@/components/school/StudentsManagement";
import StaffManagement from "@/components/school/StaffManagement";
import ClassesManagement from "@/components/school/ClassesManagement";
import AttendanceManagement from "@/components/school/AttendanceManagement";
import ExamsManagement from "@/components/school/ExamsManagement";
import HomeworkManagement from "@/components/school/HomeworkManagement";
import FeesManagement from "@/components/school/FeesManagement";
import CommunicationManagement from "@/components/school/CommunicationManagement";
import ReportsManagement from "@/components/school/ReportsManagement";
import SchoolSettingsSection from "@/components/school/SchoolSettingsSection";
import PlaceholderSection from "@/components/school/PlaceholderSection";

const SchoolAdmin = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const schoolData = {
    name: "School 1",
    totalStudents: 450,
    totalTeachers: 25,
    totalClasses: 12,
    attendanceToday: "92%",
    feesPending: 15,
    upcomingExams: 3
  };

  const students = [
    { id: 1, name: "Student 1", class: "Class 1", section: "A", rollNo: "001", status: "present" },
    { id: 2, name: "Student 2", class: "Class 1", section: "A", rollNo: "002", status: "absent" },
    { id: 3, name: "Student 3", class: "Class 2", section: "B", rollNo: "003", status: "present" },
    { id: 4, name: "Student 4", class: "Class 2", section: "B", rollNo: "004", status: "present" }
  ];

  const teachers = [
    { id: 1, name: "Teacher 1", subject: "Mathematics", classes: ["Class 1", "Class 2"], status: "active" },
    { id: 2, name: "Teacher 2", subject: "Science", classes: ["Class 3", "Class 4"], status: "active" },
    { id: 3, name: "Teacher 3", subject: "English", classes: ["Class 1", "Class 3"], status: "leave" }
  ];

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Calendar },
    { id: "students", label: "Students", icon: Users },
    { id: "staff", label: "Staff", icon: Users },
    { id: "classes", label: "Classes & Subjects", icon: BookOpen },
    { id: "attendance", label: "Attendance", icon: Check },
    { id: "exams", label: "Exams & Results", icon: Calendar },
    { id: "homework", label: "Homework", icon: BookOpen },
    { id: "fees", label: "Fees", icon: DollarSign },
    { id: "communication", label: "Communication", icon: MessageSquare },
    { id: "reports", label: "Reports", icon: Calendar },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <SchoolDashboard 
            schoolData={schoolData} 
            students={students} 
            teachers={teachers} 
          />
        );
      case "students":
        return <StudentsManagement students={students} />;
      case "staff":
        return <StaffManagement teachers={teachers} />;
      case "classes":
        return <ClassesManagement />;
      case "attendance":
        return <AttendanceManagement students={students} />;
      case "exams":
        return <ExamsManagement />;
      case "homework":
        return <HomeworkManagement />;
      case "fees":
        return <FeesManagement />;
      case "communication":
        return <CommunicationManagement />;
      case "reports":
        return <ReportsManagement schoolData={schoolData} students={students} teachers={teachers} />;
      case "settings":
        return <SchoolSettingsSection />;
      default:
        return (
          <PlaceholderSection 
            activeSection={activeSection} 
            menuItems={menuItems} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SchoolSidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-auto p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SchoolAdmin;
