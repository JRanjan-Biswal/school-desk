
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Homework {
  id: number;
  subject: string;
  title: string;
  dueDate: string;
  status: string;
}

interface HomeworkSectionProps {
  homework: Homework[];
  currentChild?: { name: string };
}

const HomeworkSection = ({ homework, currentChild }: HomeworkSectionProps) => {
  const getStatusVariant = (status: string) => {
    return status === "submitted" ? "default" : "destructive";
  };

  const getStatusAccentColor = (status: string) => {
    if (status === "submitted") {
      return "bg-green-100 text-green-700 border-green-300 hover:bg-green-200";
    } else {
      return "bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-purple-600">Homework & Assignments</h2>
        <div className="text-sm text-gray-600">
          Child: {currentChild?.name}
        </div>
      </div>
      <Card className="p-6 bg-white border border-gray-200 shadow-sm">
        <div className="space-y-4">
          {homework.map((hw) => (
            <div key={hw.id} className="flex justify-between items-center p-4 bg-gray-50 border border-gray-100 rounded-lg">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">{hw.title}</h4>
                <p className="text-sm text-gray-600">{hw.subject}</p>
                <p className="text-sm text-gray-600">Due: {hw.dueDate}</p>
              </div>
              <Badge 
                variant="outline"
                className={`flex-shrink-0 ${getStatusAccentColor(hw.status)}`}
              >
                {hw.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default HomeworkSection;
