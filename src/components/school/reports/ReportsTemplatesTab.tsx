
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const ReportsTemplatesTab = () => {
  return (
    <div className="text-center py-12">
      <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Report Templates</h3>
      <p className="text-gray-600 mb-6">Create and manage custom report templates</p>
      <Button variant="outline">
        Create Template
      </Button>
    </div>
  );
};

export default ReportsTemplatesTab;
