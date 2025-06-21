
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart, FileText, TrendingUp, Users, Calendar, DollarSign } from "lucide-react";

interface ReportsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ReportsDialog = ({ open, onOpenChange }: ReportsDialogProps) => {
  const reportCategories = [
    {
      title: "Attendance Reports",
      icon: Calendar,
      reports: [
        "Daily Attendance Summary",
        "Monthly Attendance Report",
        "Class-wise Attendance",
        "Student Attendance History"
      ],
      color: "bg-blue-500"
    },
    {
      title: "Academic Performance",
      icon: TrendingUp,
      reports: [
        "Exam Results Analysis",
        "Subject-wise Performance",
        "Class Performance Comparison",
        "Student Progress Report"
      ],
      color: "bg-green-500"
    },
    {
      title: "Fee Collection",
      icon: DollarSign,
      reports: [
        "Fee Collection Summary",
        "Pending Fees Report",
        "Monthly Fee Analysis",
        "Payment History"
      ],
      color: "bg-yellow-500"
    },
    {
      title: "Teacher Performance",
      icon: Users,
      reports: [
        "Teacher Attendance",
        "Class Assignment Report",
        "Subject Coverage Analysis",
        "Performance Evaluation"
      ],
      color: "bg-purple-500"
    },
    {
      title: "Administrative Reports",
      icon: FileText,
      reports: [
        "Student Enrollment",
        "Staff Directory",
        "Infrastructure Report",
        "Compliance Reports"
      ],
      color: "bg-red-500"
    }
  ];

  const handleGenerateReport = (reportName: string) => {
    console.log(`Generating report: ${reportName}`);
    // In a real application, this would trigger report generation
    alert(`Generating ${reportName}...`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-purple-600 flex items-center gap-2">
            <BarChart className="w-6 h-6" />
            Reports Dashboard
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card key={index} className="p-6 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${category.color}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{category.title}</h3>
                </div>
                
                <div className="space-y-2">
                  {category.reports.map((report, reportIndex) => (
                    <Button
                      key={reportIndex}
                      variant="ghost"
                      className="w-full justify-start text-left p-2 h-auto hover:bg-purple-50 hover:text-purple-600"
                      onClick={() => handleGenerateReport(report)}
                    >
                      <FileText className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{report}</span>
                    </Button>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
          <h4 className="font-semibold text-purple-600 mb-2">Quick Actions</h4>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
              Export All Reports
            </Button>
            <Button size="sm" variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
              Schedule Reports
            </Button>
            <Button size="sm" variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
              Custom Report Builder
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportsDialog;
