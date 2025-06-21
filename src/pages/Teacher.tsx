
import { useState } from "react";
import MarkAttendanceDialog from "@/components/teacher/MarkAttendanceDialog";
import CreateHomeworkDialog from "@/components/school/homework/CreateHomeworkDialog";
import TeacherDashboard from "@/components/teacher/TeacherDashboard";
import TeacherClasses from "@/components/teacher/TeacherClasses";
import StudentPerformanceSection from "@/components/teacher/StudentPerformanceSection";
import PlaceholderSection from "@/components/teacher/PlaceholderSection";
import HomeworkSection from "@/components/teacher/HomeworkSection";
import ExamsSection from "@/components/teacher/ExamsSection";
import LearningMaterialsSection from "@/components/teacher/LearningMaterialsSection";
import TeacherTimetableSection from "@/components/teacher/TeacherTimetableSection";
import TeacherAttendanceSection from "@/components/teacher/TeacherAttendanceSection";
import TeacherCommunicationSection from "@/components/teacher/TeacherCommunicationSection";
import TeacherProfileSection from "@/components/teacher/TeacherProfileSection";
import TeacherLayout from "@/components/teacher/TeacherLayout";
import { useTeacherData } from "@/hooks/useTeacherData";
import { useToast } from "@/hooks/use-toast";

const Teacher = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [attendanceOpen, setAttendanceOpen] = useState(false);
  const [homeworkOpen, setHomeworkOpen] = useState(false);
  const { toast } = useToast();

  const {
    teacherData,
    todaySchedule,
    myClasses,
    studentPerformance,
    attendanceStats,
    handleAttendanceMarked
  } = useTeacherData();

  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "classes", label: "My Classes" },
    { id: "attendance", label: "Attendance" },
    { id: "performance", label: "Student Performance" },
    { id: "homework", label: "Homework" },
    { id: "exams", label: "Exams & Marks" },
    { id: "materials", label: "Learning Materials" },
    { id: "timetable", label: "Timetable" },
    { id: "communication", label: "Communication" },
    { id: "profile", label: "Profile" }
  ];

  const handleCreateHomework = (homeworkData: any) => {
    console.log("Creating homework:", homeworkData);
    toast({
      title: "Homework Assigned Successfully",
      description: `${homeworkData.title} has been assigned to ${homeworkData.class} - Section ${homeworkData.section}`,
    });
  };

  const handleMarkAttendance = () => {
    setAttendanceOpen(true);
  };

  const handleAddHomework = () => {
    setHomeworkOpen(true);
  };

  const handleCreateExam = () => {
    console.log("Creating exam from teacher panel");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <TeacherDashboard
            teacherData={teacherData}
            todaySchedule={todaySchedule}
            studentPerformance={studentPerformance}
            onMarkAttendance={handleMarkAttendance}
            onAddHomework={handleAddHomework}
          />
        );
      case "classes":
        return (
          <TeacherClasses
            classes={myClasses}
            onMarkAttendance={handleMarkAttendance}
          />
        );
      case "attendance":
        return (
          <TeacherAttendanceSection
            attendanceStats={attendanceStats}
            myClasses={myClasses}
            onMarkAttendance={handleMarkAttendance}
          />
        );
      case "performance":
        return <StudentPerformanceSection />;
      case "homework":
        return <HomeworkSection onAddHomework={handleAddHomework} />;
      case "exams":
        return <ExamsSection onCreateExam={handleCreateExam} />;
      case "materials":
        return <LearningMaterialsSection />;
      case "timetable":
        return <TeacherTimetableSection />;
      case "communication":
        return <TeacherCommunicationSection />;
      case "profile":
        return <TeacherProfileSection />;
      default:
        const currentMenuItem = menuItems.find(item => item.id === activeSection);
        return <PlaceholderSection title={currentMenuItem?.label || "Section"} />;
    }
  };

  return (
    <TeacherLayout activeSection={activeSection} setActiveSection={setActiveSection}>
      {renderContent()}

      {/* Dialogs */}
      <MarkAttendanceDialog 
        open={attendanceOpen} 
        onOpenChange={setAttendanceOpen}
        onAttendanceMarked={handleAttendanceMarked}
      />
      <CreateHomeworkDialog 
        open={homeworkOpen} 
        onOpenChange={setHomeworkOpen}
        onCreateHomework={handleCreateHomework}
      />
    </TeacherLayout>
  );
};

export default Teacher;
