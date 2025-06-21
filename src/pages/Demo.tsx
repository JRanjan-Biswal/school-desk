
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Users, Calendar, Settings, ArrowUp } from "lucide-react";

const Demo = () => {
  const demoPortals = [
    {
      title: "Super Admin Portal",
      description: "Manage multiple schools, monitor performance, and handle billing",
      icon: Settings,
      link: "/super-admin",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "School Admin Portal",
      description: "Manage students, teachers, classes, and school operations",
      icon: Users,
      link: "/school-admin",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Teacher Portal",
      description: "Track classes, manage homework, and monitor student progress",
      icon: Calendar,
      link: "/teacher",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Parent Portal",
      description: "View child's progress, attendance, and communicate with teachers",
      icon: ArrowUp,
      link: "/parent",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            School Desk
          </span>
        </Link>
        <Link to="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </header>

      {/* Demo Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Live Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore different user roles and see how School Desk transforms school management. 
            Click on any portal below to experience the interface.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {demoPortals.map((portal, index) => {
            const Icon = portal.icon;
            return (
              <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm group">
                <div className={`w-16 h-16 bg-gradient-to-r ${portal.color} rounded-xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">{portal.title}</h3>
                <p className="text-gray-600 mb-6 text-center leading-relaxed">
                  {portal.description}
                </p>
                <Link to={portal.link} className="block">
                  <Button className={`w-full bg-gradient-to-r ${portal.color} hover:shadow-lg transition-all`}>
                    Try This Portal
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Ready to get started with your own school?
          </p>
          <Link to="/">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Demo;
