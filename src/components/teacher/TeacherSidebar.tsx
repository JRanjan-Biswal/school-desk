
import { Button } from "@/components/ui/button";
import { Calendar, Users, Settings, Check, Menu, X, BookOpen, FileText, MessageSquare, GraduationCap, User } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface TeacherSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const TeacherSidebar = ({ 
  activeSection, 
  setActiveSection, 
  sidebarOpen, 
  setSidebarOpen 
}: TeacherSidebarProps) => {
  const menuItems: MenuItem[] = [
    { id: "dashboard", label: "Dashboard", icon: Calendar },
    { id: "classes", label: "My Classes", icon: Users },
    { id: "attendance", label: "Attendance", icon: Check },
    { id: "performance", label: "Student Performance", icon: GraduationCap },
    { id: "homework", label: "Homework", icon: FileText },
    { id: "exams", label: "Exams & Marks", icon: BookOpen },
    { id: "materials", label: "Learning Materials", icon: Settings },
    { id: "timetable", label: "Timetable", icon: Calendar },
    { id: "communication", label: "Communication", icon: MessageSquare },
    { id: "profile", label: "Profile", icon: User }
  ];

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Always visible on desktop, collapsible on mobile */}
      <div className={`fixed lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-50 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } w-64 bg-white shadow-lg h-full flex-shrink-0`}>
        <div className="p-4 md:p-6 border-b flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-900">School Desk</span>
            <p className="text-sm text-gray-600 mt-1">Teacher Portal</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </Button>
        </div>
        <nav className="p-4 overflow-y-auto h-full pb-20">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors text-left ${
                  activeSection === item.id
                    ? "bg-purple-50 text-purple-600 border-r-2 border-purple-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon size={18} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default TeacherSidebar;
