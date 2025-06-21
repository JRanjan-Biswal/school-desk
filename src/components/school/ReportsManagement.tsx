
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportsDialog from "./ReportsDialog";
import GenerateReportDialog from "./reports/GenerateReportDialog";
import ReportsHeader from "./reports/ReportsHeader";
import ReportsStatsCards from "./reports/ReportsStatsCards";
import ReportsOverviewTab from "./reports/ReportsOverviewTab";
import ReportsRecentTab from "./reports/ReportsRecentTab";
import ReportsTemplatesTab from "./reports/ReportsTemplatesTab";

interface ReportsManagementProps {
  schoolData: any;
  students: any[];
  teachers: any[];
}

const ReportsManagement = ({ schoolData, students, teachers }: ReportsManagementProps) => {
  const [isReportsDialogOpen, setIsReportsDialogOpen] = useState(false);
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [selectedReportCategory, setSelectedReportCategory] = useState<string>("");
  const [activeTab, setActiveTab] = useState("overview");

  const reportData = {
    totalReports: 156,
    monthlyReports: 24,
    pendingReports: 8,
    automatedReports: 12
  };

  const recentReports = [
    {
      id: 1,
      name: "Monthly Attendance Report",
      type: "Attendance",
      generatedBy: "System",
      date: "2024-06-05",
      status: "completed",
      size: "2.4 MB"
    },
    {
      id: 2,
      name: "Fee Collection Summary",
      type: "Financial",
      generatedBy: "Admin User",
      date: "2024-06-04",
      status: "completed",
      size: "1.8 MB"
    },
    {
      id: 3,
      name: "Student Performance Analysis",
      type: "Academic",
      generatedBy: "System",
      date: "2024-06-03",
      status: "processing",
      size: "3.2 MB"
    },
    {
      id: 4,
      name: "Teacher Attendance Report",
      type: "Staff",
      generatedBy: "HR Manager",
      date: "2024-06-02",
      status: "completed",
      size: "1.1 MB"
    }
  ];

  const handleGenerateQuickReport = (type: string) => {
    setSelectedReportCategory(type);
    setIsGenerateDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <ReportsHeader onGenerateReport={() => setIsReportsDialogOpen(true)} />
      
      <ReportsStatsCards reportData={reportData} />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <ReportsOverviewTab onGenerateQuickReport={handleGenerateQuickReport} />
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <ReportsRecentTab recentReports={recentReports} />
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <ReportsTemplatesTab />
        </TabsContent>
      </Tabs>

      <ReportsDialog 
        open={isReportsDialogOpen} 
        onOpenChange={setIsReportsDialogOpen} 
      />
      
      <GenerateReportDialog 
        open={isGenerateDialogOpen} 
        onOpenChange={setIsGenerateDialogOpen}
        initialReportCategory={selectedReportCategory}
      />
    </div>
  );
};

export default ReportsManagement;
