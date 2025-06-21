
import { Users, Calendar, Settings, Check, ArrowUp } from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: any;
}

interface ParentSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const ParentSidebar = ({ activeSection, onSectionChange }: ParentSidebarProps) => {
  const menuItems: MenuItem[] = [
    { id: "dashboard", label: "Dashboard", icon: Calendar },
    { id: "attendance", label: "Attendance", icon: Check },
    { id: "performance", label: "Performance", icon: ArrowUp },
    { id: "homework", label: "Homework", icon: Settings },
    { id: "timetable", label: "Timetable", icon: Calendar },
    { id: "fees", label: "Fees", icon: Settings },
    { id: "exams", label: "Exams & Events", icon: Calendar },
    { id: "materials", label: "Study Materials", icon: Settings },
    { id: "messages", label: "Messages", icon: Users },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-gray-900">School Desk</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">Parent Portal</p>
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

export default ParentSidebar;
