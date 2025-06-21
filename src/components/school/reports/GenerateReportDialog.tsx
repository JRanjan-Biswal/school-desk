
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, GraduationCap, Calendar, TrendingUp, DollarSign, ArrowLeft, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GenerateReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialReportCategory?: string;
}

const GenerateReportDialog = ({ open, onOpenChange, initialReportCategory }: GenerateReportDialogProps) => {
  const [step, setStep] = useState(1);
  const [selectedTarget, setSelectedTarget] = useState<string>("");
  const [selectedReportType, setSelectedReportType] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const { toast } = useToast();

  const classes = [
    "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
    "Class 6", "Class 7", "Class 8", "Class 9", "Class 10"
  ];

  const reportTypes = {
    students: [
      { id: "attendance", label: "Attendance Report", icon: Calendar, description: "Daily, weekly, and monthly attendance summaries" },
      { id: "performance", label: "Performance Report", icon: TrendingUp, description: "Academic performance and exam results" },
      { id: "financial", label: "Financial Report", icon: DollarSign, description: "Fee payments and pending amounts" }
    ],
    teachers: [
      { id: "attendance", label: "Attendance Report", icon: Calendar, description: "Teacher attendance and leave records" },
      { id: "performance", label: "Performance Report", icon: TrendingUp, description: "Teaching performance and evaluations" },
      { id: "assignments", label: "Assignment Report", icon: FileText, description: "Class assignments and subject coverage" }
    ]
  };

  const handleReset = () => {
    setStep(1);
    setSelectedTarget("");
    setSelectedReportType("");
    setSelectedClass("");
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(handleReset, 300);
  };

  const handleGenerateReport = () => {
    const reportName = `${selectedReportType} Report for ${selectedTarget} - ${selectedClass}`;
    toast({
      title: "Report Generation Started",
      description: `Generating ${reportName}...`,
    });
    console.log(`Generating report:`, {
      target: selectedTarget,
      reportType: selectedReportType,
      class: selectedClass,
      category: initialReportCategory
    });
    handleClose();
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Report Target</h3>
        <p className="text-gray-600">Choose whether you want to generate reports for students or teachers</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className={`p-6 cursor-pointer border-2 transition-all hover:shadow-md ${
            selectedTarget === "students" ? "border-blue-500 bg-blue-50" : "border-gray-200"
          }`}
          onClick={() => setSelectedTarget("students")}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <GraduationCap className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Students</h4>
          </div>
          <p className="text-sm text-gray-600">Generate reports related to student data, performance, and activities</p>
        </Card>

        <Card 
          className={`p-6 cursor-pointer border-2 transition-all hover:shadow-md ${
            selectedTarget === "teachers" ? "border-green-500 bg-green-50" : "border-gray-200"
          }`}
          onClick={() => setSelectedTarget("teachers")}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Teachers</h4>
          </div>
          <p className="text-sm text-gray-600">Generate reports related to teacher data, performance, and activities</p>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={() => setStep(2)} 
          disabled={!selectedTarget}
          className="bg-purple-600 hover:bg-purple-700"
        >
          Next Step
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Select Report Type</h3>
          <p className="text-gray-600">Choose the type of report for {selectedTarget}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {reportTypes[selectedTarget as keyof typeof reportTypes]?.map((reportType) => {
          const Icon = reportType.icon;
          return (
            <Card 
              key={reportType.id}
              className={`p-4 cursor-pointer border-2 transition-all hover:shadow-md ${
                selectedReportType === reportType.id ? "border-purple-500 bg-purple-50" : "border-gray-200"
              }`}
              onClick={() => setSelectedReportType(reportType.id)}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Icon className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{reportType.label}</h4>
                  <p className="text-sm text-gray-600">{reportType.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={() => setStep(3)} 
          disabled={!selectedReportType}
          className="bg-purple-600 hover:bg-purple-700"
        >
          Next Step
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => setStep(2)}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Select Class</h3>
          <p className="text-gray-600">Choose the class for the {selectedReportType} report</p>
        </div>
      </div>

      <div className="space-y-4">
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            {classes.map((className) => (
              <SelectItem key={className} value={className}>
                {className}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedClass && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Report Summary</h4>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Target:</span> {selectedTarget}</p>
              <p><span className="font-medium">Report Type:</span> {selectedReportType}</p>
              <p><span className="font-medium">Class:</span> {selectedClass}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={handleClose}>
          Cancel
        </Button>
        <Button 
          onClick={handleGenerateReport} 
          disabled={!selectedClass}
          className="bg-purple-600 hover:bg-purple-700"
        >
          Generate Report
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-purple-600 flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Generate Report - Step {step} of 3
          </DialogTitle>
        </DialogHeader>
        
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </DialogContent>
    </Dialog>
  );
};

export default GenerateReportDialog;
