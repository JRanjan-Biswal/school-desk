
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Student {
  id: number;
  name: string;
  class: string;
  section: string;
  status: string;
}

interface Teacher {
  id: number;
  name: string;
  subject: string;
  status: string;
}

interface RecentActivityProps {
  students: Student[];
  teachers: Teacher[];
}

const RecentActivity = ({ students, teachers }: RecentActivityProps) => {
  const getStudentStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "present":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-200">
            {status}
          </Badge>
        );
      case "absent":
        return (
          <Badge className="bg-red-100 text-red-700 border-red-200 hover:bg-red-200">
            {status}
          </Badge>
        );
      default:
        return (
          <Badge className="bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200">
            {status}
          </Badge>
        );
    }
  };

  const getTeacherStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-200">
            {status}
          </Badge>
        );
      case "leave":
        return (
          <Badge className="bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200">
            {status}
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200">
            {status}
          </Badge>
        );
      default:
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200">
            {status}
          </Badge>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6 bg-white border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-purple-600">Recent Student Activity</h3>
        <div className="space-y-3">
          {students.slice(0, 4).map((student) => (
            <div key={student.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{student.name}</p>
                <p className="text-sm text-gray-600">{student.class} - {student.section}</p>
              </div>
              <div className="flex-shrink-0">
                {getStudentStatusBadge(student.status)}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-white border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-purple-600">Teacher Status</h3>
        <div className="space-y-3">
          {teachers.slice(0, 4).map((teacher) => (
            <div key={teacher.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{teacher.name}</p>
                <p className="text-sm text-gray-600">{teacher.subject}</p>
              </div>
              <div className="flex-shrink-0">
                {getTeacherStatusBadge(teacher.status)}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default RecentActivity;
