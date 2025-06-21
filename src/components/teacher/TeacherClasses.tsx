
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ClassItem {
  id: number;
  name: string;
  section: string;
  students: number;
  subject: string;
}

interface TeacherClassesProps {
  classes: ClassItem[];
  onMarkAttendance: () => void;
}

const TeacherClasses = ({ classes, onMarkAttendance }: TeacherClassesProps) => {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-purple-600">My Classes</h2>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full sm:w-auto">
          View All Students
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {classes.map((classItem) => (
          <Card key={classItem.id} className="p-4 md:p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
              <div>
                <h3 className="text-xl font-semibold text-purple-600">{classItem.name}</h3>
                <p className="text-gray-600">Section {classItem.section}</p>
              </div>
              <Badge className="bg-purple-100 text-purple-700 self-start">{classItem.subject}</Badge>
            </div>
            <div className="space-y-2 mb-4">
              <p className="text-gray-600">Students: {classItem.students}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-purple-200 text-purple-700 hover:bg-purple-50 w-full sm:w-auto"
                onClick={onMarkAttendance}
              >
                Take Attendance
              </Button>
              <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50 w-full sm:w-auto">
                View Students
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeacherClasses;
