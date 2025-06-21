
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit } from "lucide-react";
import QuickAddDialog from "./QuickAddDialog";
import EditStudentDialog from "./EditStudentDialog";

interface Student {
  id: number;
  name: string;
  class: string;
  section: string;
  rollNo: string;
  status: string;
}

interface StudentsManagementProps {
  students: Student[];
}

const StudentsManagement = ({ students }: StudentsManagementProps) => {
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleAddStudent = () => {
    setQuickAddOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setSelectedStudent(student);
    setEditDialogOpen(true);
  };

  const getStatusBadgeVariant = (status: string) => {
    return status === "present" ? "default" : "destructive";
  };

  const getStatusColor = (status: string) => {
    return status === "present" 
      ? "bg-green-100 text-green-800 border-green-200" 
      : "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-purple-600">Student Management</h2>
        <Button 
          className="bg-purple-600 hover:bg-purple-700 text-white"
          onClick={handleAddStudent}
        >
          <Plus className="mr-2" size={16} />
          Add Student
        </Button>
      </div>
      <Card className="p-6 bg-white border border-gray-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-purple-600 font-semibold">Roll No</th>
                <th className="text-left py-3 text-purple-600 font-semibold">Name</th>
                <th className="text-left py-3 text-purple-600 font-semibold">Class</th>
                <th className="text-left py-3 text-purple-600 font-semibold">Section</th>
                <th className="text-left py-3 text-purple-600 font-semibold">Status</th>
                <th className="text-left py-3 text-purple-600 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 text-gray-900">{student.rollNo}</td>
                  <td className="py-3 font-medium text-gray-900">{student.name}</td>
                  <td className="py-3 text-gray-700">{student.class}</td>
                  <td className="py-3 text-gray-700">{student.section}</td>
                  <td className="py-3">
                    <Badge 
                      variant="outline" 
                      className={`${getStatusColor(student.status)} font-medium`}
                    >
                      {student.status}
                    </Badge>
                  </td>
                  <td className="py-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-purple-200 text-purple-700 hover:bg-purple-50"
                      onClick={() => handleEditStudent(student)}
                    >
                      <Edit className="mr-1" size={14} />
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <QuickAddDialog open={quickAddOpen} onOpenChange={setQuickAddOpen} />
      <EditStudentDialog 
        open={editDialogOpen} 
        onOpenChange={setEditDialogOpen}
        student={selectedStudent}
      />
    </div>
  );
};

export default StudentsManagement;
