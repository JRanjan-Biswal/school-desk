import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Users, Search } from "lucide-react";
import QuickAddDialog from "./QuickAddDialog";
import EditClassDialog from "./EditClassDialog";

interface Class {
  id: number;
  name: string;
  section: string;
  capacity: number;
  currentStudents: number;
  classTeacher: string;
  subjects: string[];
}

const ClassesManagement = () => {
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data - in a real app this would come from a backend
  const classes: Class[] = [
    {
      id: 1,
      name: "Class 1",
      section: "A",
      capacity: 30,
      currentStudents: 25,
      classTeacher: "Teacher 1",
      subjects: ["Mathematics", "English", "Science", "Hindi", "Social Studies"]
    },
    {
      id: 2,
      name: "Class 1",
      section: "B",
      capacity: 30,
      currentStudents: 28,
      classTeacher: "Teacher 2",
      subjects: ["Mathematics", "English", "Science", "Hindi", "Social Studies"]
    },
    {
      id: 3,
      name: "Class 2",
      section: "A",
      capacity: 32,
      currentStudents: 30,
      classTeacher: "Teacher 3",
      subjects: ["Mathematics", "English", "Science", "Hindi", "Social Studies", "Computer"]
    },
    {
      id: 4,
      name: "Class 2",
      section: "B",
      capacity: 32,
      currentStudents: 27,
      classTeacher: "Teacher 1",
      subjects: ["Mathematics", "English", "Science", "Hindi", "Social Studies", "Computer"]
    }
  ];

  const handleAddClass = () => {
    setQuickAddOpen(true);
  };

  const handleEditClass = (classItem: Class) => {
    setSelectedClass(classItem);
    setEditDialogOpen(true);
  };

  const getCapacityColor = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100;
    if (percentage >= 90) return "bg-red-100 text-red-800 border-red-200";
    if (percentage >= 75) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-green-100 text-green-800 border-green-200";
  };

  // Filter classes based on search query
  const filteredClasses = classes.filter((classItem) =>
    classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    classItem.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
    classItem.classTeacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
    `${classItem.name}-${classItem.section}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-purple-600">Classes & Subjects</h2>
        <Button 
          className="bg-purple-600 hover:bg-purple-700 text-white"
          onClick={handleAddClass}
        >
          <Plus className="mr-2" size={16} />
          Add Class
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <Input
          type="text"
          placeholder="Search classes by name, section, or teacher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.length > 0 ? (
          filteredClasses.map((classItem) => (
            <Card key={classItem.id} className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {classItem.name}-{classItem.section}
                    </h3>
                    <p className="text-gray-600">Class Teacher: {classItem.classTeacher}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-purple-200 text-purple-700 hover:bg-purple-50"
                    onClick={() => handleEditClass(classItem)}
                  >
                    <Edit className="mr-1" size={14} />
                    Edit
                  </Button>
                </div>

                <div className="flex items-center space-x-2">
                  <Users size={16} className="text-gray-500" />
                  <span className="text-gray-700">
                    {classItem.currentStudents}/{classItem.capacity} Students
                  </span>
                  <Badge 
                    variant="outline" 
                    className={`${getCapacityColor(classItem.currentStudents, classItem.capacity)} font-medium ml-2`}
                  >
                    {Math.round((classItem.currentStudents / classItem.capacity) * 100)}%
                  </Badge>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Subjects:</h4>
                  <div className="flex flex-wrap gap-2">
                    {classItem.subjects.map((subject, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className="bg-blue-50 text-blue-700 border-blue-200"
                      >
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No classes found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        )}
      </div>

      <QuickAddDialog open={quickAddOpen} onOpenChange={setQuickAddOpen} />
      <EditClassDialog 
        open={editDialogOpen} 
        onOpenChange={setEditDialogOpen}
        classData={selectedClass}
      />
    </div>
  );
};

export default ClassesManagement;
