
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit } from "lucide-react";
import QuickAddDialog from "./QuickAddDialog";
import EditStaffDialog from "./EditStaffDialog";

interface Teacher {
  id: number;
  name: string;
  subject: string;
  classes: string[];
  status: string;
}

interface StaffManagementProps {
  teachers: Teacher[];
}

const StaffManagement = ({ teachers }: StaffManagementProps) => {
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const handleAddStaff = () => {
    setQuickAddOpen(true);
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setEditDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    return status === "active" 
      ? "bg-green-100 text-green-800 border-green-200" 
      : "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-purple-600">Staff Management</h2>
        <Button 
          className="bg-purple-600 hover:bg-purple-700 text-white"
          onClick={handleAddStaff}
        >
          <Plus className="mr-2" size={16} />
          Add Staff
        </Button>
      </div>
      <Card className="p-6 bg-white border border-gray-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-purple-600 font-semibold">Name</th>
                <th className="text-left py-3 text-purple-600 font-semibold">Subject</th>
                <th className="text-left py-3 text-purple-600 font-semibold">Classes</th>
                <th className="text-left py-3 text-purple-600 font-semibold">Status</th>
                <th className="text-left py-3 text-purple-600 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 font-medium text-gray-900">{teacher.name}</td>
                  <td className="py-3 text-gray-700">{teacher.subject}</td>
                  <td className="py-3 text-gray-700">{teacher.classes.join(", ")}</td>
                  <td className="py-3">
                    <Badge 
                      variant="outline" 
                      className={`${getStatusColor(teacher.status)} font-medium`}
                    >
                      {teacher.status}
                    </Badge>
                  </td>
                  <td className="py-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-purple-200 text-purple-700 hover:bg-purple-50"
                      onClick={() => handleEditTeacher(teacher)}
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
      <EditStaffDialog 
        open={editDialogOpen} 
        onOpenChange={setEditDialogOpen}
        teacher={selectedTeacher}
      />
    </div>
  );
};

export default StaffManagement;
