import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Users,
  Calendar,
  Settings,
  Plus,
  ArrowUp,
  LayoutDashboard,
  GraduationCap,
  BarChart3,
  DollarSign,
  FileText,
  MessageSquare,
  Cog,
  HelpCircle,
  TrendingUp,
  Award,
  Clock,
  Download,
  Printer,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  UserPlus,
  Shield,
  Activity,
  Target,
  ChartLine,
  PieChart
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useForm } from "react-hook-form";

interface School {
  id: number;
  name: string;
  students: number;
  teachers: number;
  status: "active" | "pending" | "block";
  revenue: number;
  address?: string;
  phone?: string;
  email?: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: "super_admin" | "school_admin" | "teacher" | "student" | "parent";
  school?: string;
  status: "active" | "inactive" | "suspended";
  lastLogin: string;
  joinedDate: string;
}

interface PerformanceMetric {
  id: number;
  school: string;
  metric: string;
  value: number;
  target: number;
  trend: "up" | "down" | "stable";
  period: string;
}

interface AddSchoolForm {
  name: string;
  address: string;
  phone: string;
  email: string;
}

interface ManageSchoolForm {
  name: string;
  address: string;
  phone: string;
  email: string;
  students: number;
  teachers: number;
  status: "active" | "pending" | "block";
  revenue: number;
}

const SuperAdmin = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isAddSchoolOpen, setIsAddSchoolOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isManageSchoolOpen, setIsManageSchoolOpen] = useState(false);
  const [isViewSchoolOpen, setIsViewSchoolOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUserPage, setCurrentUserPage] = useState(1);
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("all");
  const schoolsPerPage = 10;
  const usersPerPage = 10;
  
  const [schools, setSchools] = useState<School[]>([
    {
      id: 1,
      name: "School 1",
      students: 450,
      teachers: 25,
      status: "active",
      revenue: 5400,
      address: "123 Main St",
      phone: "(555) 123-4567",
      email: "contact@school1.edu"
    },
    {
      id: 2,
      name: "School 2",
      students: 320,
      teachers: 18,
      status: "active",
      revenue: 3840,
      address: "456 Oak Ave",
      phone: "(555) 234-5678",
      email: "info@school2.edu"
    },
    {
      id: 3,
      name: "School 3",
      students: 680,
      teachers: 35,
      status: "active",
      revenue: 8160,
      address: "789 Pine Rd",
      phone: "(555) 345-6789",
      email: "admin@school3.edu"
    },
    {
      id: 4,
      name: "School 4",
      students: 290,
      teachers: 16,
      status: "pending",
      revenue: 0,
      address: "321 Elm St",
      phone: "(555) 456-7890",
      email: "contact@school4.edu"
    }
  ]);

  const [users] = useState<User[]>([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@school1.edu",
      role: "school_admin",
      school: "School 1",
      status: "active",
      lastLogin: "2024-01-15",
      joinedDate: "2023-08-15"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@school2.edu",
      role: "school_admin",
      school: "School 2",
      status: "active",
      lastLogin: "2024-01-14",
      joinedDate: "2023-09-01"
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike.davis@school1.edu",
      role: "teacher",
      school: "School 1",
      status: "active",
      lastLogin: "2024-01-15",
      joinedDate: "2023-09-15"
    },
    {
      id: 4,
      name: "Emily Wilson",
      email: "emily.wilson@school3.edu",
      role: "teacher",
      school: "School 3",
      status: "inactive",
      lastLogin: "2024-01-10",
      joinedDate: "2023-10-01"
    },
    {
      id: 5,
      name: "David Brown",
      email: "david.brown@school2.edu",
      role: "teacher",
      school: "School 2",
      status: "active",
      lastLogin: "2024-01-15",
      joinedDate: "2023-11-01"
    },
    {
      id: 6,
      name: "Lisa Taylor",
      email: "lisa.taylor@school1.edu",
      role: "teacher",
      school: "School 1",
      status: "suspended",
      lastLogin: "2024-01-05",
      joinedDate: "2023-08-20"
    },
    {
      id: 7,
      name: "Robert Martinez",
      email: "robert.martinez@school3.edu",
      role: "school_admin",
      school: "School 3",
      status: "active",
      lastLogin: "2024-01-15",
      joinedDate: "2023-07-10"
    },
    {
      id: 8,
      name: "Jennifer Lee",
      email: "jennifer.lee@school4.edu",
      role: "school_admin",
      school: "School 4",
      status: "active",
      lastLogin: "2024-01-12",
      joinedDate: "2023-12-01"
    },
    {
      id: 9,
      name: "Mark Anderson",
      email: "mark.anderson@school2.edu",
      role: "teacher",
      school: "School 2",
      status: "active",
      lastLogin: "2024-01-14",
      joinedDate: "2023-10-15"
    },
    {
      id: 10,
      name: "Amanda Clark",
      email: "amanda.clark@school1.edu",
      role: "teacher",
      school: "School 1",
      status: "active",
      lastLogin: "2024-01-15",
      joinedDate: "2023-09-30"
    },
    {
      id: 11,
      name: "Chris Garcia",
      email: "chris.garcia@school3.edu",
      role: "teacher",
      school: "School 3",
      status: "active",
      lastLogin: "2024-01-13",
      joinedDate: "2023-11-15"
    },
    {
      id: 12,
      name: "Nicole Rodriguez",
      email: "nicole.rodriguez@school4.edu",
      role: "teacher",
      school: "School 4",
      status: "inactive",
      lastLogin: "2024-01-08",
      joinedDate: "2023-12-10"
    }
  ]);

  const [performanceMetrics] = useState<PerformanceMetric[]>([
    {
      id: 1,
      school: "School 1",
      metric: "Student Attendance",
      value: 94,
      target: 95,
      trend: "up",
      period: "This Month"
    },
    {
      id: 2,
      school: "School 1",
      metric: "Teacher Satisfaction",
      value: 87,
      target: 85,
      trend: "up",
      period: "This Quarter"
    },
    {
      id: 3,
      school: "School 2",
      metric: "Student Attendance",
      value: 91,
      target: 95,
      trend: "down",
      period: "This Month"
    },
    {
      id: 4,
      school: "School 2",
      metric: "Exam Pass Rate",
      value: 78,
      target: 80,
      trend: "stable",
      period: "Last Quarter"
    },
    {
      id: 5,
      school: "School 3",
      metric: "Student Attendance",
      value: 96,
      target: 95,
      trend: "up",
      period: "This Month"
    },
    {
      id: 6,
      school: "School 3",
      metric: "Revenue Growth",
      value: 15,
      target: 10,
      trend: "up",
      period: "This Year"
    },
    {
      id: 7,
      school: "School 4",
      metric: "System Adoption",
      value: 65,
      target: 70,
      trend: "up",
      period: "Since Launch"
    },
    {
      id: 8,
      school: "School 1",
      metric: "Parent Engagement",
      value: 82,
      target: 80,
      trend: "stable",
      period: "This Month"
    },
    {
      id: 9,
      school: "School 2",
      metric: "Digital Learning Usage",
      value: 73,
      target: 75,
      trend: "up",
      period: "This Month"
    },
    {
      id: 10,
      school: "School 3",
      metric: "Student-Teacher Ratio",
      value: 19,
      target: 20,
      trend: "stable",
      period: "Current"
    }
  ]);
  
  const form = useForm<AddSchoolForm>({
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      email: ""
    }
  });

  const manageForm = useForm<ManageSchoolForm>({
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      email: "",
      students: 0,
      teachers: 0,
      status: "pending",
      revenue: 0
    }
  });

  const totalStudents = schools.reduce((sum, school) => sum + school.students, 0);
  const totalTeachers = schools.reduce((sum, school) => sum + school.teachers, 0);
  const totalRevenue = schools.reduce((sum, school) => sum + school.revenue, 0);
  const activeSchools = schools.filter(school => school.status === "active").length;
  const pendingSchools = schools.filter(school => school.status === "pending").length;

  // Filter users based on search and role
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
                         (user.school && user.school.toLowerCase().includes(userSearchTerm.toLowerCase()));
    const matchesRole = userRoleFilter === "all" || user.role === userRoleFilter;
    return matchesSearch && matchesRole;
  });

  // Pagination calculations
  const totalPages = Math.ceil(schools.length / schoolsPerPage);
  const totalUserPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * schoolsPerPage;
  const endIndex = startIndex + schoolsPerPage;
  const currentSchools = schools.slice(startIndex, endIndex);
  
  const userStartIndex = (currentUserPage - 1) * usersPerPage;
  const userEndIndex = userStartIndex + usersPerPage;
  const currentUsers = filteredUsers.slice(userStartIndex, userEndIndex);
  
  const menuItems = [{
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard
  }, {
    id: "schools",
    label: "Schools",
    icon: GraduationCap
  }, {
    id: "users",
    label: "Users",
    icon: Users
  }, {
    id: "performance",
    label: "Performance",
    icon: BarChart3
  }, {
    id: "finance",
    label: "Finance",
    icon: DollarSign
  }, {
    id: "reports",
    label: "Reports",
    icon: FileText
  }, {
    id: "communication",
    label: "Communication",
    icon: MessageSquare
  }, {
    id: "system",
    label: "System",
    icon: Cog
  }, {
    id: "support",
    label: "Support",
    icon: HelpCircle
  }];

  const handleAddSchool = (data: AddSchoolForm) => {
    const newSchool: School = {
      id: schools.length + 1,
      name: data.name,
      students: 0,
      teachers: 0,
      status: "pending",
      revenue: 0,
      address: data.address,
      phone: data.phone,
      email: data.email
    };
    
    setSchools([...schools, newSchool]);
    setIsAddSchoolOpen(false);
    form.reset();
    
    console.log(`School "${data.name}" added successfully!`);
  };

  const handleManageSchool = (school: School) => {
    setSelectedSchool(school);
    manageForm.reset({
      name: school.name,
      address: school.address || "",
      phone: school.phone || "",
      email: school.email || "",
      students: school.students,
      teachers: school.teachers,
      status: school.status,
      revenue: school.revenue
    });
    setIsManageSchoolOpen(true);
  };

  const handleViewSchool = (school: School) => {
    setSelectedSchool(school);
    setIsViewSchoolOpen(true);
  };

  const handleUpdateSchool = (data: ManageSchoolForm) => {
    if (!selectedSchool) return;
    
    const updatedSchools = schools.map(school => 
      school.id === selectedSchool.id 
        ? { ...school, ...data }
        : school
    );
    
    setSchools(updatedSchools);
    setIsManageSchoolOpen(false);
    setSelectedSchool(null);
    
    console.log(`School "${data.name}" updated successfully!`);
  };

  const handleDeleteSchool = () => {
    if (!selectedSchool) return;
    
    const updatedSchools = schools.filter(school => school.id !== selectedSchool.id);
    setSchools(updatedSchools);
    setIsManageSchoolOpen(false);
    setSelectedSchool(null);
    
    console.log(`School "${selectedSchool.name}" deleted successfully!`);
  };

  const handleGenerateReport = () => {
    setIsReportOpen(true);
    console.log("Report generated successfully!");
  };

  const handleDownloadReport = () => {
    // Create and download the file
    const reportDate = new Date().toLocaleDateString();
    const reportContent = `
SCHOOL MANAGEMENT SYSTEM REPORT
Generated on: ${reportDate}

SUMMARY STATISTICS:
- Total Schools: ${schools.length}
- Active Schools: ${activeSchools}
- Pending Schools: ${pendingSchools}
- Total Students: ${totalStudents.toLocaleString()}
- Total Teachers: ${totalTeachers}
- Total Monthly Revenue: $${totalRevenue.toLocaleString()}

SCHOOL DETAILS:
${schools.map(school => `
- ${school.name}
  Status: ${school.status}
  Students: ${school.students}
  Teachers: ${school.teachers}
  Revenue: $${school.revenue.toLocaleString()}
  Email: ${school.email}
  Phone: ${school.phone}
  Address: ${school.address}
`).join('')}

Report generated by School Desk Super Admin Dashboard
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `school-report-${reportDate.replace(/\//g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    console.log("Report downloaded successfully!");
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "super_admin":
        return "bg-purple-100 text-purple-700";
      case "school_admin":
        return "bg-blue-100 text-blue-700";
      case "teacher":
        return "bg-green-100 text-green-700";
      case "student":
        return "bg-yellow-100 text-yellow-700";
      case "parent":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "inactive":
        return "bg-gray-100 text-gray-700";
      case "suspended":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="text-green-500" size={16} />;
      case "down":
        return <TrendingUp className="text-red-500 rotate-180" size={16} />;
      default:
        return <div className="w-4 h-1 bg-gray-400 rounded-full"></div>;
    }
  };

  const getMetricColor = (value: number, target: number) => {
    if (value >= target) return "text-green-600";
    if (value >= target * 0.8) return "text-yellow-600";
    return "text-red-600";
  };

  const ViewSchoolDialog = () => (
    <Dialog open={isViewSchoolOpen} onOpenChange={setIsViewSchoolOpen}>
      <DialogContent className="w-full max-w-[95vw] sm:max-w-[600px] md:max-w-[700px] max-h-[90vh] overflow-y-auto mx-auto p-4 sm:p-6">
        <DialogHeader className="space-y-3 pb-4">
          <DialogTitle className="text-purple-600 text-xl sm:text-2xl font-semibold text-center sm:text-left">
            School Details: {selectedSchool?.name}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-gray-600 text-center sm:text-left">
            View complete school information and performance metrics.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 bg-purple-50 border-purple-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{selectedSchool?.students || 0}</p>
                <p className="text-sm text-purple-700 font-medium">Students</p>
              </div>
            </Card>
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{selectedSchool?.teachers || 0}</p>
                <p className="text-sm text-blue-700 font-medium">Teachers</p>
              </div>
            </Card>
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">${selectedSchool?.revenue.toLocaleString() || 0}</p>
                <p className="text-sm text-green-700 font-medium">Revenue</p>
              </div>
            </Card>
            <Card className="p-4 bg-amber-50 border-amber-200">
              <div className="text-center">
                <Badge 
                  className={
                    selectedSchool?.status === "active" 
                      ? "bg-green-100 text-green-700" 
                      : selectedSchool?.status === "block"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }
                >
                  {selectedSchool?.status}
                </Badge>
                <p className="text-sm text-amber-700 font-medium mt-1">Status</p>
              </div>
            </Card>
          </div>

          {/* Contact Information */}
          <Card className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-purple-600 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Email Address</p>
                <p className="text-gray-900 break-all">{selectedSchool?.email || "Not provided"}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Phone Number</p>
                <p className="text-gray-900">{selectedSchool?.phone || "Not provided"}</p>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <p className="text-sm font-medium text-gray-500">Address</p>
                <p className="text-gray-900">{selectedSchool?.address || "Not provided"}</p>
              </div>
            </div>
          </Card>

          {/* Performance Metrics */}
          <Card className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-purple-600 mb-4">Performance Metrics</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Student-Teacher Ratio</span>
                <Badge className="bg-blue-100 text-blue-700">
                  {selectedSchool?.teachers && selectedSchool.teachers > 0 
                    ? `${Math.round(selectedSchool.students / selectedSchool.teachers)}:1`
                    : "N/A"
                  }
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">Revenue per Student</span>
                <Badge className="bg-green-100 text-green-700">
                  ${selectedSchool?.students && selectedSchool.students > 0 
                    ? Math.round(selectedSchool.revenue / selectedSchool.students)
                    : 0
                  }
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">School Size</span>
                <Badge className="bg-purple-100 text-purple-700">
                  {selectedSchool?.students && selectedSchool.students > 500 
                    ? "Large" 
                    : selectedSchool?.students && selectedSchool.students > 200 
                    ? "Medium" 
                    : "Small"
                  }
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-6">
          <Button 
            onClick={() => {
              setIsViewSchoolOpen(false);
              if (selectedSchool) handleManageSchool(selectedSchool);
            }}
            className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Edit className="mr-2" size={16} />
            Manage School
          </Button>
          <Button 
            variant="outline"
            onClick={() => setIsViewSchoolOpen(false)}
            className="w-full sm:w-auto border-purple-200 text-purple-700 hover:bg-purple-50"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
  
  const ManageSchoolDialog = () => (
    <Dialog open={isManageSchoolOpen} onOpenChange={setIsManageSchoolOpen}>
      <DialogContent className="w-full max-w-[95vw] sm:max-w-[700px] lg:max-w-[900px] max-h-[90vh] overflow-y-auto mx-auto p-4 sm:p-6">
        <DialogHeader className="space-y-3 pb-4">
          <DialogTitle className="text-purple-600 text-xl sm:text-2xl font-semibold text-center sm:text-left">
            Manage School: {selectedSchool?.name}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-gray-600 text-center sm:text-left">
            Update school information, monitor performance, and manage settings.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 bg-purple-50 border-purple-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{selectedSchool?.students || 0}</p>
                <p className="text-sm text-purple-700 font-medium">Students</p>
              </div>
            </Card>
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{selectedSchool?.teachers || 0}</p>
                <p className="text-sm text-blue-700 font-medium">Teachers</p>
              </div>
            </Card>
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">${selectedSchool?.revenue.toLocaleString() || 0}</p>
                <p className="text-sm text-green-700 font-medium">Revenue</p>
              </div>
            </Card>
            <Card className="p-4 bg-amber-50 border-amber-200">
              <div className="text-center">
                <Badge 
                  className={
                    selectedSchool?.status === "active" 
                      ? "bg-green-100 text-green-700" 
                      : selectedSchool?.status === "block"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }
                >
                  {selectedSchool?.status}
                </Badge>
                <p className="text-sm text-amber-700 font-medium mt-1">Status</p>
              </div>
            </Card>
          </div>

          {/* Edit Form */}
          <Card className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-purple-600 mb-4">School Information</h3>
            <Form {...manageForm}>
              <form onSubmit={manageForm.handleSubmit(handleUpdateSchool)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={manageForm.control}
                    name="name"
                    rules={{ required: "School name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-purple-600 font-medium">School Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter school name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={manageForm.control}
                    name="email"
                    rules={{ 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-purple-600 font-medium">Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={manageForm.control}
                    name="address"
                    rules={{ required: "Address is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-purple-600 font-medium">Address *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={manageForm.control}
                    name="phone"
                    rules={{ required: "Phone is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-purple-600 font-medium">Phone *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter phone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={manageForm.control}
                    name="students"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-purple-600 font-medium">Students Count</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Enter student count" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={manageForm.control}
                    name="teachers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-purple-600 font-medium">Teachers Count</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Enter teacher count" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={manageForm.control}
                    name="revenue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-purple-600 font-medium">Monthly Revenue</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Enter revenue" 
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={manageForm.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-purple-600 font-medium">Status</FormLabel>
                        <FormControl>
                          <select 
                            {...field}
                            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                          >
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="block">Block</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-6">
                  <Button 
                    type="button" 
                    variant="destructive"
                    onClick={handleDeleteSchool}
                    className="w-full sm:w-auto order-1"
                  >
                    <Trash2 className="mr-2" size={16} />
                    Delete School
                  </Button>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 w-full sm:w-auto order-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsManageSchoolOpen(false)}
                      className="w-full sm:w-auto border-purple-200 text-purple-700 hover:bg-purple-50"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      <Edit className="mr-2" size={16} />
                      Update School
                    </Button>
                  </div>
                </DialogFooter>
              </form>
            </Form>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
  
  const ReportDialog = () => (
    <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
      <DialogContent className="w-full max-w-[95vw] sm:max-w-[800px] lg:max-w-[1000px] max-h-[90vh] overflow-y-auto mx-auto p-4 sm:p-6">
        <DialogHeader className="space-y-3 pb-4">
          <DialogTitle className="text-purple-600 text-xl sm:text-2xl font-semibold text-center sm:text-left">
            School Management Report
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-gray-600 text-center sm:text-left">
            Comprehensive overview of all schools and their performance metrics.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Summary Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 bg-purple-50 border-purple-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{schools.length}</p>
                <p className="text-sm text-purple-700 font-medium">Total Schools</p>
              </div>
            </Card>
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{activeSchools}</p>
                <p className="text-sm text-green-700 font-medium">Active Schools</p>
              </div>
            </Card>
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{totalStudents.toLocaleString()}</p>
                <p className="text-sm text-blue-700 font-medium">Total Students</p>
              </div>
            </Card>
            <Card className="p-4 bg-amber-50 border-amber-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-600">${totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-amber-700 font-medium">Monthly Revenue</p>
              </div>
            </Card>
          </div>

          {/* Detailed School Data */}
          <Card className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-purple-600 mb-4">School Performance Overview</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold text-purple-600">School</TableHead>
                    <TableHead className="font-semibold text-purple-600">Status</TableHead>
                    <TableHead className="font-semibold text-purple-600">Students</TableHead>
                    <TableHead className="font-semibold text-purple-600">Teachers</TableHead>
                    <TableHead className="font-semibold text-purple-600">Revenue</TableHead>
                    <TableHead className="font-semibold text-purple-600">Ratio</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schools.map(school => (
                    <TableRow key={school.id}>
                      <TableCell className="font-medium text-gray-900">{school.name}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={school.status === "active" ? "default" : "secondary"}
                          className={school.status === "active" 
                            ? "bg-green-100 text-green-700" 
                            : school.status === "block"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                          }
                        >
                          {school.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{school.students}</TableCell>
                      <TableCell>{school.teachers}</TableCell>
                      <TableCell>${school.revenue.toLocaleString()}</TableCell>
                      <TableCell>
                        {school.teachers > 0 ? Math.round(school.students / school.teachers) : 0}:1
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>

          {/* Performance Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-purple-600 mb-4">Top Performing Schools</h3>
              <div className="space-y-3">
                {schools
                  .filter(school => school.status === "active")
                  .sort((a, b) => b.revenue - a.revenue)
                  .slice(0, 3)
                  .map((school, index) => (
                    <div key={school.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                          index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-600'
                        }`}>
                          {index + 1}
                        </div>
                        <span className="font-medium">{school.name}</span>
                      </div>
                      <span className="text-green-600 font-bold">${school.revenue.toLocaleString()}</span>
                    </div>
                  ))
                }
              </div>
            </Card>

            <Card className="p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-purple-600 mb-4">System Health</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">System Status</span>
                  <Badge className="bg-green-100 text-green-700">Operational</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">Active Schools</span>
                  <Badge className="bg-blue-100 text-blue-700">{Math.round((activeSchools / schools.length) * 100)}%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium">Average Students/School</span>
                  <Badge className="bg-purple-100 text-purple-700">
                    {Math.round(totalStudents / schools.length)}
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:gap-2 pt-6">
          <Button 
            variant="outline" 
            onClick={handleDownloadReport}
            className="w-full sm:w-auto border-purple-200 text-purple-700 hover:bg-purple-50 h-10 sm:h-12 text-sm sm:text-base px-4 sm:px-6"
          >
            <Download className="mr-2" size={16} />
            Download Report
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.print()}
            className="w-full sm:w-auto border-purple-200 text-purple-700 hover:bg-purple-50 h-10 sm:h-12 text-sm sm:text-base px-4 sm:px-6"
          >
            <Printer className="mr-2" size={16} />
            Print Report
          </Button>
          <Button 
            onClick={() => setIsReportOpen(false)}
            className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white h-10 sm:h-12 text-sm sm:text-base px-4 sm:px-6"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
  
  const AddSchoolDialog = () => (
    <Dialog open={isAddSchoolOpen} onOpenChange={setIsAddSchoolOpen}>
      <DialogContent className="w-full max-w-[95vw] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] max-h-[90vh] overflow-y-auto mx-auto p-4 sm:p-6">
        <DialogHeader className="space-y-3 pb-4">
          <DialogTitle className="text-purple-600 text-xl sm:text-2xl font-semibold text-center sm:text-left">
            Add New School
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base text-gray-600 text-center sm:text-left">
            Fill in the school details to add a new educational institution to the platform.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAddSchool)} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <FormField
                control={form.control}
                name="name"
                rules={{ required: "School name is required" }}
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="text-purple-600 font-medium text-sm sm:text-base">
                      School Name *
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter school name" 
                        {...field} 
                        className="w-full h-10 sm:h-12 text-sm sm:text-base px-3 sm:px-4"
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                rules={{ 
                  required: "School email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                }}
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="text-purple-600 font-medium text-sm sm:text-base">
                      School Email Address *
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="Enter school email address" 
                        {...field} 
                        className="w-full h-10 sm:h-12 text-sm sm:text-base px-3 sm:px-4"
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="address"
                rules={{ required: "Address is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-600 font-medium text-sm sm:text-base">
                      Address *
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter school address" 
                        {...field} 
                        className="w-full h-10 sm:h-12 text-sm sm:text-base px-3 sm:px-4"
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                rules={{ required: "Phone number is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-purple-600 font-medium text-sm sm:text-base">
                      Phone Number *
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter phone number" 
                        {...field} 
                        className="w-full h-10 sm:h-12 text-sm sm:text-base px-3 sm:px-4"
                      />
                    </FormControl>
                    <FormMessage className="text-xs sm:text-sm" />
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row gap-3 sm:gap-2 pt-4 sm:pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsAddSchoolOpen(false)}
                className="w-full sm:w-auto order-2 sm:order-1 border-purple-200 text-purple-700 hover:bg-purple-50 h-10 sm:h-12 text-sm sm:text-base px-4 sm:px-6"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="w-full sm:w-auto order-1 sm:order-2 bg-purple-600 hover:bg-purple-700 text-white h-10 sm:h-12 text-sm sm:text-base px-4 sm:px-6"
              >
                Add School
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
  
  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Clean Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">Welcome, Super Admin</h1>
          <p className="text-gray-600 text-lg">Here's what's happening with your schools.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="border-purple-200 text-purple-700 hover:bg-purple-50"
            onClick={handleGenerateReport}
          >
            <Calendar className="mr-2" size={16} />
            Generate Report
          </Button>
          <Button 
            onClick={() => setIsAddSchoolOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            <Plus className="mr-2" size={16} />
            Add New School
          </Button>
        </div>
      </div>

      {/* Clean Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <GraduationCap className="text-purple-600" size={20} />
            </div>
            <h3 className="text-purple-600 font-semibold">Total Schools</h3>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-gray-900">{schools.length}</p>
            <div className="flex items-center text-sm">
              <TrendingUp className="text-green-500 mr-1" size={14} />
              <span className="text-green-600 font-medium">+12% this month</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="text-purple-600" size={20} />
            </div>
            <h3 className="text-purple-600 font-semibold">Total Students</h3>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-gray-900">{totalStudents.toLocaleString()}</p>
            <div className="flex items-center text-sm">
              <TrendingUp className="text-green-500 mr-1" size={14} />
              <span className="text-green-600 font-medium">+8% this month</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="text-purple-600" size={20} />
            </div>
            <h3 className="text-purple-600 font-semibold">Total Teachers</h3>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-gray-900">{totalTeachers}</p>
            <div className="flex items-center text-sm">
              <Award className="text-amber-500 mr-1" size={14} />
              <span className="text-amber-600 font-medium">95% satisfaction</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-purple-600" size={20} />
            </div>
            <h3 className="text-purple-600 font-semibold">Monthly Revenue</h3>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
            <div className="flex items-center text-sm">
              <TrendingUp className="text-green-500 mr-1" size={14} />
              <span className="text-green-600 font-medium">+15% this month</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Activity and Performance Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="text-purple-600" size={18} />
            </div>
            <h3 className="text-lg font-semibold text-purple-600">Recent Activity</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700 font-medium">New school registered</span>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">2 min ago</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700 font-medium">Payment received</span>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">5 min ago</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700 font-medium">Report generated</span>
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">10 min ago</Badge>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="text-purple-600" size={18} />
            </div>
            <h3 className="text-lg font-semibold text-purple-600">System Performance</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700 font-medium">System Uptime</span>
              <Badge className="bg-green-100 text-green-700">99.9%</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700 font-medium">Active Users</span>
              <Badge className="bg-blue-100 text-blue-700">1,234</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700 font-medium">Response Time</span>
              <Badge className="bg-green-100 text-green-700">125ms</Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Schools Table */}
      <Card className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <GraduationCap className="text-purple-600" size={20} />
            </div>
            <h3 className="text-xl font-semibold text-purple-600">School Overview</h3>
          </div>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="font-semibold text-purple-600">School Name</TableHead>
                  <TableHead className="font-semibold text-purple-600">Students</TableHead>
                  <TableHead className="font-semibold text-purple-600">Teachers</TableHead>
                  <TableHead className="font-semibold text-purple-600">Status</TableHead>
                  <TableHead className="font-semibold text-purple-600">Revenue</TableHead>
                  <TableHead className="font-semibold text-purple-600">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schools.map(school => (
                  <TableRow key={school.id} className="hover:bg-gray-50 border-gray-200">
                    <TableCell className="font-medium text-gray-900">{school.name}</TableCell>
                    <TableCell className="text-gray-700">{school.students}</TableCell>
                    <TableCell className="text-gray-700">{school.teachers}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={school.status === "active" ? "default" : "secondary"} 
                        className={school.status === "active" 
                          ? "bg-green-100 text-green-700" 
                          : school.status === "block"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                        }
                      >
                        {school.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-gray-900">${school.revenue.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-purple-700 hover:bg-purple-50"
                          onClick={() => handleManageSchool(school)}
                        >
                          <Edit size={14} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-gray-700 hover:bg-gray-50"
                          onClick={() => handleViewSchool(school)}
                        >
                          <Eye size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>

      <AddSchoolDialog />
      <ReportDialog />
      <ManageSchoolDialog />
      <ViewSchoolDialog />
    </div>
  );
  
  const renderSchools = () => (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-6">
        <div className="flex items-center space-x-3 lg:space-x-6">
          <div className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
            <GraduationCap className="text-purple-600" size={window.innerWidth >= 1024 ? 24 : 20} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600 mb-1 md:mb-2">School Management</h2>
            <p className="text-gray-600 text-base md:text-lg lg:text-xl font-medium">Oversee and manage all educational institutions</p>
          </div>
        </div>
        <Button 
          onClick={() => setIsAddSchoolOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 text-sm md:text-base lg:text-lg font-semibold rounded-xl flex-shrink-0 w-full sm:w-auto"
        >
          <Plus className="mr-2 lg:mr-3" size={16} />
          Add School
        </Button>
      </div>

      {/* Schools List Table */}
      <Card className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="text-purple-600" size={18} />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-purple-600">Schools List</h3>
            </div>
            <p className="text-sm md:text-base text-gray-600">Total: {schools.length} schools</p>
          </div>
        </div>
        <div className="p-4 md:p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="font-semibold text-purple-600 min-w-[150px]">School Name</TableHead>
                  <TableHead className="font-semibold text-purple-600 text-center">Students</TableHead>
                  <TableHead className="font-semibold text-purple-600 text-center">Teachers</TableHead>
                  <TableHead className="font-semibold text-purple-600 text-center">Status</TableHead>
                  <TableHead className="font-semibold text-purple-600 text-center">Revenue</TableHead>
                  <TableHead className="font-semibold text-purple-600 text-center min-w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentSchools.map(school => (
                  <TableRow key={school.id} className="hover:bg-gray-50 border-gray-200">
                    <TableCell className="font-medium text-gray-900">{school.name}</TableCell>
                    <TableCell className="text-gray-700 text-center">{school.students}</TableCell>
                    <TableCell className="text-gray-700 text-center">{school.teachers}</TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        variant={school.status === "active" ? "default" : "secondary"} 
                        className={school.status === "active" 
                          ? "bg-green-100 text-green-700" 
                          : school.status === "block"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                        }
                      >
                        {school.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-gray-900 text-center">${school.revenue.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 text-gray-700 hover:bg-gray-50"
                          onClick={() => handleViewSchool(school)}
                          title="View School Details"
                        >
                          <Eye size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 md:p-6 border-t border-gray-200">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page);
                          }}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  return null;
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </Card>

      <AddSchoolDialog />
      <ManageSchoolDialog />
      <ViewSchoolDialog />
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-6">
        <div className="flex items-center space-x-3 lg:space-x-6">
          <div className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Users className="text-purple-600" size={window.innerWidth >= 1024 ? 24 : 20} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600 mb-1 md:mb-2">User Management</h2>
            <p className="text-gray-600 text-base md:text-lg lg:text-xl font-medium">Manage all platform users and their access</p>
          </div>
        </div>
        <Button 
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 text-sm md:text-base lg:text-lg font-semibold rounded-xl flex-shrink-0 w-full sm:w-auto"
        >
          <UserPlus className="mr-2 lg:mr-3" size={16} />
          Add User
        </Button>
      </div>

      {/* User Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="text-purple-600" size={20} />
            </div>
            <h3 className="text-purple-600 font-semibold">Total Users</h3>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-gray-900">{users.length}</p>
            <div className="flex items-center text-sm">
              <TrendingUp className="text-green-500 mr-1" size={14} />
              <span className="text-green-600 font-medium">+5% this month</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Activity className="text-green-600" size={20} />
            </div>
            <h3 className="text-green-600 font-semibold">Active Users</h3>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-gray-900">{users.filter(user => user.status === "active").length}</p>
            <div className="flex items-center text-sm">
              <span className="text-green-600 font-medium">{Math.round((users.filter(user => user.status === "active").length / users.length) * 100)}% of total</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Shield className="text-blue-600" size={20} />
            </div>
            <h3 className="text-blue-600 font-semibold">Admins</h3>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-gray-900">{users.filter(user => user.role.includes("admin")).length}</p>
            <div className="flex items-center text-sm">
              <span className="text-blue-600 font-medium">System administrators</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <GraduationCap className="text-amber-600" size={20} />
            </div>
            <h3 className="text-amber-600 font-semibold">Teachers</h3>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-gray-900">{users.filter(user => user.role === "teacher").length}</p>
            <div className="flex items-center text-sm">
              <span className="text-amber-600 font-medium">Educational staff</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-4 md:p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Search users..."
                value={userSearchTerm}
                onChange={(e) => {
                  setUserSearchTerm(e.target.value);
                  setCurrentUserPage(1);
                }}
                className="pl-10 w-full sm:w-64"
              />
            </div>
            <select
              value={userRoleFilter}
              onChange={(e) => {
                setUserRoleFilter(e.target.value);
                setCurrentUserPage(1);
              }}
              className="h-10 px-3 rounded-md border border-input bg-background text-sm w-full sm:w-auto"
            >
              <option value="all">All Roles</option>
              <option value="super_admin">Super Admin</option>
              <option value="school_admin">School Admin</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
              <option value="parent">Parent</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Users List Table */}
      <Card className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="text-purple-600" size={18} />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-purple-600">Users List</h3>
            </div>
            <p className="text-sm md:text-base text-gray-600">Showing {currentUsers.length} of {filteredUsers.length} users</p>
          </div>
        </div>
        <div className="p-4 md:p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="font-semibold text-purple-600 min-w-[180px]">Name</TableHead>
                  <TableHead className="font-semibold text-purple-600 min-w-[200px]">Email</TableHead>
                  <TableHead className="font-semibold text-purple-600 text-center">Role</TableHead>
                  <TableHead className="font-semibold text-purple-600 min-w-[120px]">School</TableHead>
                  <TableHead className="font-semibold text-purple-600 text-center">Status</TableHead>
                  <TableHead className="font-semibold text-purple-600 text-center">Last Login</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUsers.map(user => (
                  <TableRow key={user.id} className="hover:bg-gray-50 border-gray-200">
                    <TableCell className="font-medium text-gray-900">{user.name}</TableCell>
                    <TableCell className="text-gray-700">{user.email}</TableCell>
                    <TableCell className="text-center">
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-700">{user.school || "N/A"}</TableCell>
                    <TableCell className="text-center">
                      <Badge className={getStatusBadgeColor(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-700 text-center">{user.lastLogin}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* User Pagination */}
        {totalUserPages > 1 && (
          <div className="p-4 md:p-6 border-t border-gray-200">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentUserPage > 1) setCurrentUserPage(currentUserPage - 1);
                    }}
                    className={currentUserPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalUserPages }, (_, i) => i + 1).map((page) => {
                  if (
                    page === 1 ||
                    page === totalUserPages ||
                    (page >= currentUserPage - 1 && page <= currentUserPage + 1)
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentUserPage(page);
                          }}
                          isActive={currentUserPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  } else if (
                    page === currentUserPage - 2 ||
                    page === currentUserPage + 2
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  return null;
                })}
                
                <PaginationItem>
                  <PaginationNext 
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentUserPage < totalUserPages) setCurrentUserPage(currentUserPage + 1);
                    }}
                    className={currentUserPage === totalUserPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </Card>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-6">
        <div className="flex items-center space-x-3 lg:space-x-6">
          <div className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
            <BarChart3 className="text-purple-600" size={window.innerWidth >= 1024 ? 24 : 20} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-600 mb-1 md:mb-2">Performance Analytics</h2>
            <p className="text-gray-600 text-base md:text-lg lg:text-xl font-medium">Monitor and analyze school performance metrics</p>
          </div>
        </div>
        <Button 
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 text-sm md:text-base lg:text-lg font-semibold rounded-xl flex-shrink-0 w-full sm:w-auto"
        >
          <Download className="mr-2 lg:mr-3" size={16} />
          Export Data
        </Button>
      </div>

      {/* Performance Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Target className="text-green-600" size={20} />
            </div>
            <h3 className="text-green-600 font-semibold">Avg Attendance</h3>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-gray-900">93.5%</p>
            <div className="flex items-center text-sm">
              <TrendingUp className="text-green-500 mr-1" size={14} />
              <span className="text-green-600 font-medium">+2.1% vs last month</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Award className="text-blue-600" size={20} />
            </div>
            <h3 className="text-blue-600 font-semibold">Teacher Satisfaction</h3>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-gray-900">85.7%</p>
            <div className="flex items-center text-sm">
              <TrendingUp className="text-blue-500 mr-1" size={14} />
              <span className="text-blue-600 font-medium">+1.5% improvement</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <ChartLine className="text-purple-600" size={20} />
            </div>
            <h3 className="text-purple-600 font-semibold">Revenue Growth</h3>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-gray-900">12.3%</p>
            <div className="flex items-center text-sm">
              <TrendingUp className="text-green-500 mr-1" size={14} />
              <span className="text-green-600 font-medium">Year over year</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <PieChart className="text-amber-600" size={20} />
            </div>
            <h3 className="text-amber-600 font-semibold">System Usage</h3>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-gray-900">78.4%</p>
            <div className="flex items-center text-sm">
              <TrendingUp className="text-amber-500 mr-1" size={14} />
              <span className="text-amber-600 font-medium">Daily active usage</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Performance Metrics Table */}
      <Card className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-purple-600" size={18} />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-purple-600">Performance Metrics by School</h3>
            </div>
            <p className="text-sm md:text-base text-gray-600">Last updated: 1 hour ago</p>
          </div>
        </div>
        <div className="p-4 md:p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200">
                  <TableHead className="font-semibold text-purple-600 min-w-[120px]">School</TableHead>
                  <TableHead className="font-semibold text-purple-600 min-w-[150px]">Metric</TableHead>
                  <TableHead className="font-semibold text-purple-600 text-center">Current</TableHead>
                  <TableHead className="font-semibold text-purple-600 text-center">Target</TableHead>
                  <TableHead className="font-semibold text-purple-600 text-center">Trend</TableHead>
                  <TableHead className="font-semibold text-purple-600 text-center">Period</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {performanceMetrics.map(metric => (
                  <TableRow key={metric.id} className="hover:bg-gray-50 border-gray-200">
                    <TableCell className="font-medium text-gray-900">{metric.school}</TableCell>
                    <TableCell className="text-gray-700">{metric.metric}</TableCell>
                    <TableCell className="text-center">
                      <span className={`font-bold ${getMetricColor(metric.value, metric.target)}`}>
                        {metric.value}{metric.metric.includes("Rate") || metric.metric.includes("Attendance") || metric.metric.includes("Growth") || metric.metric.includes("Usage") || metric.metric.includes("Satisfaction") ? "%" : ""}
                      </span>
                    </TableCell>
                    <TableCell className="text-center text-gray-600">
                      {metric.target}{metric.metric.includes("Rate") || metric.metric.includes("Attendance") || metric.metric.includes("Growth") || metric.metric.includes("Usage") || metric.metric.includes("Satisfaction") ? "%" : ""}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center">
                        {getTrendIcon(metric.trend)}
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-gray-600 text-sm">{metric.period}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-green-600" size={18} />
            </div>
            <h3 className="text-lg font-semibold text-purple-600">Top Performing Areas</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-gray-700 font-medium">School 3 - Attendance</span>
              <Badge className="bg-green-100 text-green-700">96% (Target: 95%)</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-gray-700 font-medium">School 3 - Revenue Growth</span>
              <Badge className="bg-green-100 text-green-700">15% (Target: 10%)</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-gray-700 font-medium">School 1 - Teacher Satisfaction</span>
              <Badge className="bg-green-100 text-green-700">87% (Target: 85%)</Badge>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Target className="text-red-600" size={18} />
            </div>
            <h3 className="text-lg font-semibold text-purple-600">Areas Needing Attention</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <span className="text-gray-700 font-medium">School 2 - Attendance</span>
              <Badge className="bg-red-100 text-red-700">91% (Target: 95%)</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <span className="text-gray-700 font-medium">School 2 - Exam Pass Rate</span>
              <Badge className="bg-yellow-100 text-yellow-700">78% (Target: 80%)</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <span className="text-gray-700 font-medium">School 4 - System Adoption</span>
              <Badge className="bg-yellow-100 text-yellow-700">65% (Target: 70%)</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
  
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboard();
      case "schools":
        return renderSchools();
      case "users":
        return renderUsers();
      case "performance":
        return renderPerformance();
      default:
        return (
          <div className="text-center py-20">
            <Card className="p-12 lg:p-16 mx-auto max-w-lg bg-white border border-gray-200 shadow-sm rounded-2xl">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                {React.createElement(menuItems.find(item => item.id === activeSection)?.icon || Settings, { 
                  className: "text-white", 
                  size: 28
                })}
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-purple-600">
                {menuItems.find(item => item.id === activeSection)?.label}
              </h2>
              <p className="text-gray-600 text-base lg:text-lg mb-8">This section is under development</p>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg rounded-xl transition-all duration-300">
                Coming Soon
              </Button>
            </Card>
          </div>
        );
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 lg:w-72 bg-white shadow-lg border-r border-gray-200 flex-shrink-0">
        <div className="p-6 lg:p-8 border-b border-gray-200">
          <div className="flex items-center space-x-3 lg:space-x-4">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <GraduationCap className="text-white" size={24} />
            </div>
            <div className="min-w-0">
              <span className="text-xl lg:text-2xl font-bold text-gray-900 block truncate">School Desk</span>
              <p className="text-purple-600 text-base lg:text-lg font-semibold">Super Admin</p>
            </div>
          </div>
        </div>
        <nav className="p-4 lg:p-6">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 lg:space-x-4 px-4 lg:px-6 py-3 lg:py-4 rounded-xl mb-3 transition-all duration-300 text-sm lg:text-base ${
                  activeSection === item.id 
                    ? "bg-purple-50 text-purple-700 border border-purple-200" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon size={18} className="flex-shrink-0" />
                <span className="font-medium truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto min-w-0">
        {renderContent()}
      </div>
    </div>
  );
};

export default SuperAdmin;
