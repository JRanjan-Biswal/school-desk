import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  BookOpen, 
  Users, 
  Edit3, 
  Save, 
  X,
  Settings,
  Bell,
  Shield
} from "lucide-react";

interface TeacherProfile {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    dateOfBirth: string;
    joiningDate: string;
    employeeId: string;
  };
  professionalInfo: {
    subjects: string[];
    classes: string[];
    qualification: string;
    experience: string;
    department: string;
  };
  preferences: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    parentCommunication: boolean;
    darkMode: boolean;
  };
}

const TeacherProfileSection = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  const [profile, setProfile] = useState<TeacherProfile>({
    personalInfo: {
      firstName: "Teacher",
      lastName: "1",
      email: "teacher1@schooldesk.com",
      phone: "+123456789",
      address: "Address 1",
      dateOfBirth: "1985-06-15",
      joiningDate: "2020-08-01",
      employeeId: "TCH001"
    },
    professionalInfo: {
      subjects: ["Mathematics", "Physics"],
      classes: ["Grade 9A", "Grade 10B", "Grade 11C"],
      qualification: "Master's in Mathematics Education",
      experience: "8 years",
      department: "Science & Mathematics"
    },
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      parentCommunication: true,
      darkMode: false
    }
  });

  const [editedProfile, setEditedProfile] = useState<TeacherProfile>(profile);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const updateProfessionalInfo = (field: string, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      professionalInfo: {
        ...prev.professionalInfo,
        [field]: value
      }
    }));
  };

  const updatePreferences = (field: string, value: boolean) => {
    setEditedProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value
      }
    }));
  };

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "professional", label: "Professional", icon: BookOpen },
    { id: "preferences", label: "Preferences", icon: Settings }
  ];

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          {isEditing ? (
            <Input
              id="firstName"
              value={editedProfile.personalInfo.firstName}
              onChange={(e) => updatePersonalInfo("firstName", e.target.value)}
            />
          ) : (
            <p className="text-sm text-gray-700 p-2 bg-gray-50 rounded">{profile.personalInfo.firstName}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          {isEditing ? (
            <Input
              id="lastName"
              value={editedProfile.personalInfo.lastName}
              onChange={(e) => updatePersonalInfo("lastName", e.target.value)}
            />
          ) : (
            <p className="text-sm text-gray-700 p-2 bg-gray-50 rounded">{profile.personalInfo.lastName}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-gray-500" />
            {isEditing ? (
              <Input
                id="email"
                type="email"
                value={editedProfile.personalInfo.email}
                onChange={(e) => updatePersonalInfo("email", e.target.value)}
                className="flex-1"
              />
            ) : (
              <p className="text-sm text-gray-700 p-2 bg-gray-50 rounded flex-1">{profile.personalInfo.email}</p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-gray-500" />
            {isEditing ? (
              <Input
                id="phone"
                value={editedProfile.personalInfo.phone}
                onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                className="flex-1"
              />
            ) : (
              <p className="text-sm text-gray-700 p-2 bg-gray-50 rounded flex-1">{profile.personalInfo.phone}</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <div className="flex items-start space-x-2">
          <MapPin className="h-4 w-4 text-gray-500 mt-1" />
          {isEditing ? (
            <Textarea
              id="address"
              value={editedProfile.personalInfo.address}
              onChange={(e) => updatePersonalInfo("address", e.target.value)}
              className="flex-1"
              rows={2}
            />
          ) : (
            <p className="text-sm text-gray-700 p-2 bg-gray-50 rounded flex-1">{profile.personalInfo.address}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            {isEditing ? (
              <Input
                id="dateOfBirth"
                type="date"
                value={editedProfile.personalInfo.dateOfBirth}
                onChange={(e) => updatePersonalInfo("dateOfBirth", e.target.value)}
                className="flex-1"
              />
            ) : (
              <p className="text-sm text-gray-700 p-2 bg-gray-50 rounded flex-1">
                {new Date(profile.personalInfo.dateOfBirth).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="joiningDate">Joining Date</Label>
          {isEditing ? (
            <Input
              id="joiningDate"
              type="date"
              value={editedProfile.personalInfo.joiningDate}
              onChange={(e) => updatePersonalInfo("joiningDate", e.target.value)}
            />
          ) : (
            <p className="text-sm text-gray-700 p-2 bg-gray-50 rounded">
              {new Date(profile.personalInfo.joiningDate).toLocaleDateString()}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="employeeId">Employee ID</Label>
          <p className="text-sm text-gray-700 p-2 bg-gray-50 rounded">{profile.personalInfo.employeeId}</p>
        </div>
      </div>
    </div>
  );

  const renderProfessionalInfo = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Subjects</Label>
        <div className="flex flex-wrap gap-2">
          {profile.professionalInfo.subjects.map((subject, index) => (
            <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700">
              {subject}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Classes</Label>
        <div className="flex flex-wrap gap-2">
          {profile.professionalInfo.classes.map((classItem, index) => (
            <Badge key={index} variant="outline" className="border-blue-200 text-blue-700">
              <Users className="h-3 w-3 mr-1" />
              {classItem}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="qualification">Qualification</Label>
          {isEditing ? (
            <Input
              id="qualification"
              value={editedProfile.professionalInfo.qualification}
              onChange={(e) => updateProfessionalInfo("qualification", e.target.value)}
            />
          ) : (
            <p className="text-sm text-gray-700 p-2 bg-gray-50 rounded">{profile.professionalInfo.qualification}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="experience">Experience</Label>
          {isEditing ? (
            <Input
              id="experience"
              value={editedProfile.professionalInfo.experience}
              onChange={(e) => updateProfessionalInfo("experience", e.target.value)}
            />
          ) : (
            <p className="text-sm text-gray-700 p-2 bg-gray-50 rounded">{profile.professionalInfo.experience}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="department">Department</Label>
        {isEditing ? (
          <Input
            id="department"
            value={editedProfile.professionalInfo.department}
            onChange={(e) => updateProfessionalInfo("department", e.target.value)}
          />
        ) : (
          <p className="text-sm text-gray-700 p-2 bg-gray-50 rounded">{profile.professionalInfo.department}</p>
        )}
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Bell className="h-5 w-5 mr-2" />
          Notification Preferences
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <Label htmlFor="emailNotifications">Email Notifications</Label>
              <p className="text-sm text-gray-600">Receive notifications via email</p>
            </div>
            <Switch
              id="emailNotifications"
              checked={editedProfile.preferences.emailNotifications}
              onCheckedChange={(checked) => updatePreferences("emailNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <Label htmlFor="smsNotifications">SMS Notifications</Label>
              <p className="text-sm text-gray-600">Receive notifications via SMS</p>
            </div>
            <Switch
              id="smsNotifications"
              checked={editedProfile.preferences.smsNotifications}
              onCheckedChange={(checked) => updatePreferences("smsNotifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <Label htmlFor="parentCommunication">Parent Communication</Label>
              <p className="text-sm text-gray-600">Allow parents to contact you directly</p>
            </div>
            <Switch
              id="parentCommunication"
              checked={editedProfile.preferences.parentCommunication}
              onCheckedChange={(checked) => updatePreferences("parentCommunication", checked)}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          Security & Privacy
        </h3>
        
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
          <div>
            <Label htmlFor="darkMode">Dark Mode</Label>
            <p className="text-sm text-gray-600">Use dark theme for the interface</p>
          </div>
          <Switch
            id="darkMode"
            checked={editedProfile.preferences.darkMode}
            onCheckedChange={(checked) => updatePreferences("darkMode", checked)}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-purple-600">Profile</h2>
          <p className="text-gray-600">Manage your personal and professional information</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button onClick={handleCancel} variant="outline" size="sm">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} size="sm" className="bg-purple-600 hover:bg-purple-700">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={handleEdit} size="sm" className="bg-purple-600 hover:bg-purple-700">
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Profile Summary Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-purple-100 flex items-center justify-center">
              <User className="h-10 w-10 text-purple-600" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-semibold text-gray-900">
                {profile.personalInfo.firstName} {profile.personalInfo.lastName}
              </h3>
              <p className="text-gray-600">{profile.professionalInfo.department}</p>
              <p className="text-sm text-gray-500">Employee ID: {profile.personalInfo.employeeId}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64">
          <div className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? "bg-purple-50 text-purple-600 border-r-2 border-purple-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                {tabs.find(tab => tab.id === activeTab)?.icon && (
                  React.createElement(tabs.find(tab => tab.id === activeTab)!.icon, { 
                    className: "h-5 w-5 mr-2" 
                  })
                )}
                {tabs.find(tab => tab.id === activeTab)?.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activeTab === "personal" && renderPersonalInfo()}
              {activeTab === "professional" && renderProfessionalInfo()}
              {activeTab === "preferences" && renderPreferences()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfileSection;
