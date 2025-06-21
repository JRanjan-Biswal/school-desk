import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SchoolStats from "./SchoolStats";
import RecentActivity from "./RecentActivity";
import QuickAddDialog from "./QuickAddDialog";
import ReportsDialog from "./ReportsDialog";

interface SchoolData {
  name: string;
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  attendanceToday: string;
  feesPending: number;
  upcomingExams: number;
}

interface Student {
  id: number;
  name: string;
  class: string;
  section: string;
  rollNo: string;
  status: string;
}

interface Teacher {
  id: number;
  name: string;
  subject: string;
  classes: string[];
  status: string;
}

interface SchoolDashboardProps {
  schoolData: SchoolData;
  students: Student[];
  teachers: Teacher[];
}

const SchoolDashboard = ({ schoolData, students, teachers }: SchoolDashboardProps) => {
  const navigate = useNavigate();
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);

  const handleQuickAdd = () => {
    setQuickAddOpen(true);
  };

  const handleViewReports = () => {
    setReportsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-purple-600">{schoolData.name} Dashboard</h2>
          <p className="text-gray-600">Welcome back, Admin</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
            onClick={handleQuickAdd}
          >
            <Plus className="mr-2" size={16} />
            Quick Add
          </Button>
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={handleViewReports}
          >
            View Reports
          </Button>
        </div>
      </div>

      <SchoolStats schoolData={schoolData} />
      <RecentActivity students={students} teachers={teachers} />

      <QuickAddDialog open={quickAddOpen} onOpenChange={setQuickAddOpen} />
      <ReportsDialog open={reportsOpen} onOpenChange={setReportsOpen} />
    </div>
  );
};

export default SchoolDashboard;
