import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Check, Users, Calendar, Settings, Star, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const features = [{
    title: "Multi-School Management",
    description: "Centralized administration for multiple schools with customized permissions and workflows.",
    icon: Settings
  }, {
    title: "User Role Management",
    description: "Define custom roles and permissions for administrators, teachers, parents and other stakeholders.",
    icon: Users
  }, {
    title: "Performance Analytics",
    description: "Comprehensive analytics and reports to track student progress, attendance and school performance.",
    icon: Calendar
  }, {
    title: "Smart Notifications",
    description: "Automated alerts for homework due dates, absentees, and fee payment reminders.",
    icon: Check
  }, {
    title: "Homework & Assignments",
    description: "Easy task tracking and assignment with AI-based submission tracking and progress monitoring.",
    icon: Calendar
  }, {
    title: "Fee Management",
    description: "Streamlined fee collection with online payment options and automated reminder systems.",
    icon: Settings
  }, {
    title: "Communication Tools",
    description: "Integrated messaging system for seamless communication between stakeholders.",
    icon: Users
  }, {
    title: "Event Calendar",
    description: "Centralized calendar for managing school events, exams, holidays and parent-teacher meetings.",
    icon: Calendar
  }, {
    title: "Security & Compliance",
    description: "Enterprise-grade security with role-based access controls and compliance monitoring.",
    icon: Check
  }];
  const pricingPlans = [{
    name: "Essential",
    duration: "6 Months",
    price: "$12",
    unit: "per student",
    features: ["Basic Management", "Parent Portal", "Attendance Tracking", "Fee Management", "Mobile App Access"],
    popular: false,
    description: "Perfect for small schools getting started"
  }, {
    name: "Professional",
    duration: "12 Months",
    price: "$10",
    unit: "per student",
    features: ["Everything in Essential", "Advanced Analytics", "Custom School Themes", "Priority Support", "API Access", "Unlimited Storage"],
    popular: true,
    description: "Ideal for growing educational institutions"
  }, {
    name: "Enterprise",
    duration: "12 Months",
    price: "Custom",
    unit: "pricing",
    features: ["Everything in Professional", "Multi-School Management", "Custom Integrations", "Dedicated Support", "White-label Solution"],
    popular: false,
    description: "For large educational groups and districts"
  }];
  const testimonials = [{
    school: "School 1",
    location: "City 1",
    rating: 5,
    text: "School Desk has revolutionized how we manage our daily operations. The parent engagement has increased by 80% since implementation.",
    author: "School Principal"
  }, {
    school: "School 2",
    location: "City 2",
    rating: 5,
    text: "The fee management system alone has saved us countless hours. Parents love the transparency and ease of payment.",
    author: "Admin Director"
  }, {
    school: "School 3",
    location: "City 3",
    rating: 5,
    text: "From attendance tracking to performance analytics, School Desk provides everything we need in one comprehensive platform.",
    author: "Technology Coordinator"
  }];
  const roleFeatures = [{
    title: "Multi-school management analytics",
    description: "Cross-school performance comparison",
    category: "admin"
  }, {
    title: "Role-based access management",
    description: "Performance tracking controls",
    category: "admin"
  }, {
    title: "Cross-school performance comparison",
    description: "Advanced reporting tools",
    category: "admin"
  }];
  const renderHome = () => <>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-[25px]">
        <div className="text-center mb-16">
          {/* School Desk Logo */}
          <div className="mb-8">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text mb-4 text-purple-500">
              School Desk
            </h1>
          </div>
          
          {/* Visual Elements */}
          
          
          <Badge className="mb-6 bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200">
            Trusted by 500+ Schools Worldwide
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight max-w-4xl mx-auto">
            <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Transform Your School with Comprehensive Management Platform
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect administrators, teachers, and parents while streamlining operations. 
            Simplify school management with our all-in-one solution.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/super-admin">
              <Button size="lg" className="px-8 py-4 text-lg bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white">
                Start Free Trial
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-purple-300 text-purple-700 hover:bg-purple-50">
              <Play className="mr-2" size={16} />
              Schedule Demo
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Check className="text-green-500" size={16} />
              <span>Free 30-day trial</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="text-green-500" size={16} />
              <span>No setup fees</span>
            </div>
          </div>
        </div>
        
        {/* Dashboard Preview - Centered */}
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="ml-4 text-sm text-gray-500">Today's Attendance</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium">Class 1A</span>
                <span className="text-green-600 font-bold">28/30</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium">Class 2B</span>
                <span className="text-blue-600 font-bold">25/28</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-sm font-medium">Class 3C</span>
                <span className="text-purple-600 font-bold">32/35</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Overall Today</p>
                  <p className="text-2xl font-bold text-purple-700">94.2%</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-violet-700">89.7%</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-3 border border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="text-green-600" size={14} />
              </div>
              <span className="text-sm font-medium">Fee collected</span>
            </div>
          </div>
          
          <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3 border border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="text-blue-600" size={14} />
              </div>
              <span className="text-sm font-medium">New assignment</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20 bg-gray-50">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Everything Your School Needs</h2>
          <p className="text-xl text-gray-600">Comprehensive tools for modern education management</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
          const Icon = feature.icon;
          return <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-0 bg-white">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl mb-4 flex items-center justify-center">
                  <Icon className="text-white" size={20} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-3 text-lg">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </Card>;
        })}
        </div>
      </section>

      {/* Tailored for Every Role */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
            Tailored for Every Role
          </h2>
          <p className="text-xl text-gray-600">Our platform is designed to meet the unique needs of all stakeholders in the educational ecosystem</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Settings className="text-purple-600" size={18} />
                </div>
                Multi-school management analytics
              </h3>
              <div className="space-y-4 ml-11">
                <div className="flex items-center gap-3">
                  <Check className="text-green-500" size={16} />
                  <span className="text-gray-700">Role-based access and utility management</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-green-500" size={16} />
                  <span className="text-gray-700">School statistical and tracking controls</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-green-500" size={16} />
                  <span className="text-gray-700">Cross-school performance comparison</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="text-blue-600" size={18} />
                </div>
                School statistical management
              </h3>
              <div className="space-y-4 ml-11">
                <div className="flex items-center gap-3">
                  <Check className="text-green-500" size={16} />
                  <span className="text-gray-700">Class scheduling and management</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-green-500" size={16} />
                  <span className="text-gray-700">Advanced and fee management</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="text-green-500" size={16} />
                  <span className="text-gray-700">Easy custom and flexible school</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="font-bold text-lg mb-4">School Dashboard</h4>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">12,450</p>
                  <p className="text-sm text-gray-600">Total Students</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">$240k</p>
                  <p className="text-sm text-gray-600">Revenue</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">94.2%</p>
                  <p className="text-sm text-gray-600">Attendance</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-violet-600">89.7%</p>
                  <p className="text-sm text-gray-600">Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20 bg-gray-50">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Loved by Schools Everywhere</h2>
          <p className="text-xl text-gray-600">Hear what our customers say about School Desk</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => <Card key={index} className="p-6 bg-white border-0 shadow-lg">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />)}
              </div>
              <p className="text-gray-600 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
              <div className="border-t pt-4">
                <p className="font-semibold text-lg">{testimonial.school}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
                <p className="text-sm text-purple-600 font-medium">{testimonial.author}</p>
              </div>
            </Card>)}
        </div>
      </section>

      {/* CTA Section - Updated Design */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 rounded-3xl p-16 text-center relative overflow-hidden border border-gray-100">
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              Ready to Transform Your School Management?
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join thousands of schools already using School Desk to simplify administration, 
              enhance learning, and improve communication.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/super-admin">
                <Button size="lg" className="px-10 py-4 text-lg bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  View Pricing
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-10 py-4 text-lg border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 rounded-xl font-semibold transition-all duration-300">
                Contact Sales
              </Button>
            </div>
          </div>
          
          {/* Background decoration elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-200 to-violet-200 rounded-full opacity-20 -translate-x-16 -translate-y-16"></div>
          <div className="absolute top-1/4 right-0 w-24 h-24 bg-gradient-to-br from-violet-200 to-indigo-200 rounded-full opacity-30 translate-x-12"></div>
          <div className="absolute bottom-0 left-1/4 w-20 h-20 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-25 translate-y-10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-gradient-to-br from-purple-300 to-violet-300 rounded-full opacity-20"></div>
        </div>
      </section>
    </>;
  const renderPricing = () => <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600">Pay only for active students. No hidden fees, no setup costs.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingPlans.map((plan, index) => <Card key={index} className={`p-8 relative ${plan.popular ? 'border-2 border-purple-500 shadow-xl transform scale-105' : 'border-0'} bg-white/70 backdrop-blur-sm`}>
            {plan.popular && <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500">
                Most Popular
              </Badge>}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-2">{plan.description}</p>
              <p className="text-sm text-gray-500 mb-4">{plan.duration}</p>
              <div className="text-4xl font-bold mb-2">
                {plan.price}
                {plan.price !== "Custom" && <span className="text-lg text-gray-600 font-normal">/{plan.unit}</span>}
                {plan.price === "Custom" && <span className="text-lg text-gray-600 font-normal"> {plan.unit}</span>}
              </div>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, featureIndex) => <li key={featureIndex} className="flex items-center">
                  <Check className="text-green-500 mr-3" size={16} />
                  <span className="text-sm">{feature}</span>
                </li>)}
            </ul>
            <Button className={`w-full ${plan.popular ? 'bg-purple-600 hover:bg-purple-700' : ''}`} variant={plan.popular ? "default" : "outline"}>
              {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
            </Button>
          </Card>)}
      </div>
      <div className="text-center mt-12">
        <p className="text-gray-600 mb-4">Need a custom solution for your educational institution?</p>
        <Button variant="outline" className="border-purple-300 text-purple-700">
          Contact Our Sales Team
        </Button>
      </div>
    </section>;
  const renderContact = () => <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
        <p className="text-xl text-gray-600">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div>
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-purple-600 mb-2">Sales Inquiries</h3>
              <p className="text-gray-600">sales@schooldesk.com</p>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div>
              <h3 className="font-semibold text-purple-600 mb-2">Technical Support</h3>
              <p className="text-gray-600">support@schooldesk.com</p>
              <p className="text-gray-600">+1 (555) 123-4568</p>
            </div>
            <div>
              <h3 className="font-semibold text-purple-600 mb-2">General Information</h3>
              <p className="text-gray-600">info@schooldesk.com</p>
              <p className="text-gray-600">+1 (555) 123-4569</p>
            </div>
          </div>
        </div>
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">School/Organization</label>
              <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea rows={5} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"></textarea>
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              Send Message
            </Button>
          </form>
        </Card>
      </div>
    </section>;
  return <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
            School Desk
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <button onClick={() => setCurrentPage("home")} className={`transition-colors font-medium ${currentPage === "home" ? "text-purple-600" : "text-gray-600 hover:text-purple-600"}`}>
            Home
          </button>
          <button onClick={() => setCurrentPage("pricing")} className={`transition-colors font-medium ${currentPage === "pricing" ? "text-purple-600" : "text-gray-600 hover:text-purple-600"}`}>
            Pricing
          </button>
          <button onClick={() => setCurrentPage("contact")} className={`transition-colors font-medium ${currentPage === "contact" ? "text-purple-600" : "text-gray-600 hover:text-purple-600"}`}>
            Contact
          </button>
          <Link to="/demo">
            <Button variant="ghost" className="hover:bg-purple-50 font-medium text-violet-500">
              Live Demo
            </Button>
          </Link>
          <Link to="/super-admin">
            <Button className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 px-6">
              Get Started
            </Button>
          </Link>
        </nav>
      </header>

      {/* Page Content */}
      {currentPage === "home" && renderHome()}
      {currentPage === "pricing" && renderPricing()}
      {currentPage === "contact" && renderContact()}

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <span className="text-xl font-bold">School Desk</span>
              <p className="text-gray-400 mb-4 mt-2">Transform your school with our comprehensive management platform.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support Center</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 School Desk. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>;
};

export default Index;
