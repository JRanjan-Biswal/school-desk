
import { Child } from "@/hooks/useParentState";
import { childData, todaySchedule, recentGrades, homework } from "@/data/parentData";
import AttendanceView from "@/components/parent/AttendanceView";
import PerformanceView from "@/components/parent/PerformanceView";
import ParentWelcome from "@/components/parent/ParentWelcome";
import ChildInfoCard from "@/components/parent/ChildInfoCard";
import StatsCards from "@/components/parent/StatsCards";
import ScheduleAndGrades from "@/components/parent/ScheduleAndGrades";
import HomeworkSection from "@/components/parent/HomeworkSection";
import TimetableSection from "@/components/parent/TimetableSection";
import FeesSection from "@/components/parent/FeesSection";
import PlaceholderSection from "@/components/parent/PlaceholderSection";
import ExamsEventsSection from "@/components/parent/ExamsEventsSection";
import StudyMaterialsSection from "@/components/parent/StudyMaterialsSection";
import MessagesSection from "@/components/parent/MessagesSection";
import SettingsSection from "@/components/parent/SettingsSection";

interface ParentContentRendererProps {
  activeSection: string;
  selectedChild: string;
  children: Child[];
  currentChild: Child | undefined;
  onChildChange: (childId: string) => void;
  onReportCardOpen: () => void;
  onPayFeesOpen: () => void;
}

const ParentContentRenderer = ({
  activeSection,
  selectedChild,
  children,
  currentChild,
  onChildChange,
  onReportCardOpen,
  onPayFeesOpen,
}: ParentContentRendererProps) => {
  const renderDashboard = () => (
    <div className="space-y-6">
      <ParentWelcome
        selectedChild={selectedChild}
        children={children}
        onChildChange={onChildChange}
        onReportCardOpen={onReportCardOpen}
        onPayFeesOpen={onPayFeesOpen}
      />

      {currentChild && <ChildInfoCard child={currentChild} />}

      <StatsCards childData={childData} />

      <ScheduleAndGrades
        todaySchedule={todaySchedule}
        recentGrades={recentGrades}
      />
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboard();
      case "attendance":
        return (
          <AttendanceView 
            childId={selectedChild}
            childName={currentChild?.name || ""}
            className={`${currentChild?.class} ${currentChild?.section}`}
          />
        );
      case "performance":
        return (
          <PerformanceView 
            childId={selectedChild}
            childName={currentChild?.name || ""}
            className={`${currentChild?.class} ${currentChild?.section}`}
          />
        );
      case "homework":
        return (
          <HomeworkSection
            homework={homework}
            currentChild={currentChild}
          />
        );
      case "timetable":
        return <TimetableSection currentChild={currentChild} />;
      case "fees":
        return <FeesSection currentChild={currentChild} />;
      case "exams":
        return <ExamsEventsSection currentChild={currentChild} />;
      case "materials":
        return <StudyMaterialsSection currentChild={currentChild} />;
      case "messages":
        return <MessagesSection currentChild={currentChild} />;
      case "settings":
        return <SettingsSection currentChild={currentChild} />;
      default:
        return <PlaceholderSection title="Section" />;
    }
  };

  return renderContent();
};

export default ParentContentRenderer;
