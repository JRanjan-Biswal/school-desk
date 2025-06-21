
import { Calendar, Users, Settings, Check, BookOpen, DollarSign, MessageSquare } from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: any;
}

interface SchoolSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const SchoolSidebar = ({ activeSection, onSectionChange }: SchoolSidebarProps) => {
  const menuItems: MenuItem[] = [
    { id: "dashboard", label: "Dashboard", icon: Calendar },
    { id: "students", label: "Students", icon: Users },
    { id: "staff", label: "Staff", icon: Users },
    { id: "classes", label: "Classes & Subjects", icon: BookOpen },
    { id: "attendance", label: "Attendance", icon: Check },
    { id: "exams", label: "Exams & Results", icon: Calendar },
    { id: "homework", label: "Homework", icon: BookOpen },
    { id: "fees", label: "Fees", icon: DollarSign },
    { id: "communication", label: "Communication", icon: MessageSquare },
    { id: "reports", label: "Reports", icon: Calendar },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6 border-b">
        <div className="flex flex-col">
          <span className="text-xl font-bold text-gray-900">School Desk</span>
          <p className="text-sm text-gray-600 mt-1">School Admin</p>
        </div>
      </div>
      <nav className="p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                activeSection === item.id
                  ? "bg-purple-50 text-purple-600 border-r-2 border-purple-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default SchoolSidebar;
