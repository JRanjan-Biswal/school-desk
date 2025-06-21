
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Settings, School, Users, Bell, Shield, Database, Save, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SchoolSettingsSection = () => {
  const { toast } = useToast();

  // School Profile Settings
  const [schoolProfile, setSchoolProfile] = useState({
    schoolName: "School 1",
    schoolCode: "SCH001",
    address: "School Address",
    city: "City",
    state: "State",
    zipCode: "12345",
    phone: "+123456789",
    email: "school1@email.com",
    website: "www.school1.edu",
    principalName: "Principal Name",
    establishedYear: "2000",
    description: "A leading educational institution committed to excellence."
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // System Settings
  const [systemSettings, setSystemSettings] = useState({
    academicYear: "2024-2025",
    timeZone: "est",
    dateFormat: "MM/DD/YYYY",
    language: "english",
    currency: "USD",
    autoBackup: true,
    maintenanceMode: false,
    sessionTimeout: "30"
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    parentNotifications: true,
    teacherNotifications: true,
    attendanceAlerts: true,
    feeReminders: true,
    examNotifications: true,
    emergencyAlerts: true
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    passwordPolicy: "strong",
    loginAttempts: "5",
    dataEncryption: true,
    auditLogs: true,
    ipRestriction: false
  });

  // Academic Settings
  const [academicSettings, setAcademicSettings] = useState({
    gradingSystem: "percentage",
    passingGrade: "60",
    maxAbsences: "10",
    termSystem: "semester",
    reportCardFormat: "detailed",
    homeworkSubmission: true
  });

  const handleProfileSave = () => {
    console.log('Saving school profile:', schoolProfile);
    setIsEditingProfile(false);
    toast({
      title: "Success",
      description: "School profile updated successfully!",
    });
  };

  const handleSystemSettingChange = (key: string, value: string | boolean) => {
    setSystemSettings(prev => ({
      ...prev,
      [key]: value
    }));
    console.log(`System setting changed: ${key} = ${value}`);
    toast({
      title: "Setting Updated",
      description: `${key} has been updated`,
    });
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: value
    }));
    console.log(`Notification setting changed: ${key} = ${value}`);
  };

  const handleSecurityChange = (key: string, value: boolean | string) => {
    setSecuritySettings(prev => ({
      ...prev,
      [key]: value
    }));
    console.log(`Security setting changed: ${key} = ${value}`);
  };

  const handleAcademicChange = (key: string, value: string | boolean) => {
    setAcademicSettings(prev => ({
      ...prev,
      [key]: value
    }));
    console.log(`Academic setting changed: ${key} = ${value}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Settings className="mr-2" />
            School Settings
          </h1>
          <p className="text-gray-600">
            Manage your school's configuration and preferences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* School Profile */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <School className="mr-2 w-5 h-5" />
              School Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="schoolName">School Name</Label>
                <Input
                  id="schoolName"
                  value={schoolProfile.schoolName}
                  onChange={(e) => setSchoolProfile(prev => ({ ...prev, schoolName: e.target.value }))}
                  disabled={!isEditingProfile}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="schoolCode">School Code</Label>
                <Input
                  id="schoolCode"
                  value={schoolProfile.schoolCode}
                  onChange={(e) => setSchoolProfile(prev => ({ ...prev, schoolCode: e.target.value }))}
                  disabled={!isEditingProfile}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={schoolProfile.address}
                  onChange={(e) => setSchoolProfile(prev => ({ ...prev, address: e.target.value }))}
                  disabled={!isEditingProfile}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={schoolProfile.city}
                  onChange={(e) => setSchoolProfile(prev => ({ ...prev, city: e.target.value }))}
                  disabled={!isEditingProfile}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={schoolProfile.phone}
                  onChange={(e) => setSchoolProfile(prev => ({ ...prev, phone: e.target.value }))}
                  disabled={!isEditingProfile}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={schoolProfile.email}
                  onChange={(e) => setSchoolProfile(prev => ({ ...prev, email: e.target.value }))}
                  disabled={!isEditingProfile}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="principalName">Principal Name</Label>
                <Input
                  id="principalName"
                  value={schoolProfile.principalName}
                  onChange={(e) => setSchoolProfile(prev => ({ ...prev, principalName: e.target.value }))}
                  disabled={!isEditingProfile}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="establishedYear">Established Year</Label>
                <Input
                  id="establishedYear"
                  value={schoolProfile.establishedYear}
                  onChange={(e) => setSchoolProfile(prev => ({ ...prev, establishedYear: e.target.value }))}
                  disabled={!isEditingProfile}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={schoolProfile.description}
                onChange={(e) => setSchoolProfile(prev => ({ ...prev, description: e.target.value }))}
                disabled={!isEditingProfile}
                className="mt-1"
                rows={3}
              />
            </div>
            <div className="flex gap-2 pt-2">
              {!isEditingProfile ? (
                <Button onClick={() => setIsEditingProfile(true)} className="bg-purple-600 hover:bg-purple-700">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button onClick={handleProfileSave} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-1" />
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2 w-5 h-5" />
              System Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="academicYear">Academic Year</Label>
                <Select
                  value={systemSettings.academicYear}
                  onValueChange={(value) => handleSystemSettingChange('academicYear', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2023-2024">2023-2024</SelectItem>
                    <SelectItem value="2024-2025">2024-2025</SelectItem>
                    <SelectItem value="2025-2026">2025-2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="timeZone">Time Zone</Label>
                <Select
                  value={systemSettings.timeZone}
                  onValueChange={(value) => handleSystemSettingChange('timeZone', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="est">Eastern (EST)</SelectItem>
                    <SelectItem value="cst">Central (CST)</SelectItem>
                    <SelectItem value="mst">Mountain (MST)</SelectItem>
                    <SelectItem value="pst">Pacific (PST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="language">Language</Label>
                <Select
                  value={systemSettings.language}
                  onValueChange={(value) => handleSystemSettingChange('language', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoBackup">Auto Backup</Label>
                  <p className="text-sm text-gray-500">Automatically backup data daily</p>
                </div>
                <Switch
                  id="autoBackup"
                  checked={systemSettings.autoBackup}
                  onCheckedChange={(checked) => handleSystemSettingChange('autoBackup', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                  <p className="text-sm text-gray-500">Put system in maintenance mode</p>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={systemSettings.maintenanceMode}
                  onCheckedChange={(checked) => handleSystemSettingChange('maintenanceMode', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 w-5 h-5" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                </div>
                <Switch
                  id="twoFactorAuth"
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={(checked) => handleSecurityChange('twoFactorAuth', checked)}
                />
              </div>
              <div>
                <Label htmlFor="passwordPolicy">Password Policy</Label>
                <Select
                  value={securitySettings.passwordPolicy}
                  onValueChange={(value) => handleSecurityChange('passwordPolicy', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="strong">Strong</SelectItem>
                    <SelectItem value="very-strong">Very Strong</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dataEncryption">Data Encryption</Label>
                  <p className="text-sm text-gray-500">Encrypt sensitive data</p>
                </div>
                <Switch
                  id="dataEncryption"
                  checked={securitySettings.dataEncryption}
                  onCheckedChange={(checked) => handleSecurityChange('dataEncryption', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auditLogs">Audit Logs</Label>
                  <p className="text-sm text-gray-500">Keep detailed activity logs</p>
                </div>
                <Switch
                  id="auditLogs"
                  checked={securitySettings.auditLogs}
                  onCheckedChange={(checked) => handleSecurityChange('auditLogs', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 w-5 h-5" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <Switch
                  id="emailNotifications"
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="parentNotifications">Parent Notifications</Label>
                <Switch
                  id="parentNotifications"
                  checked={notificationSettings.parentNotifications}
                  onCheckedChange={(checked) => handleNotificationChange('parentNotifications', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="teacherNotifications">Teacher Notifications</Label>
                <Switch
                  id="teacherNotifications"
                  checked={notificationSettings.teacherNotifications}
                  onCheckedChange={(checked) => handleNotificationChange('teacherNotifications', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="attendanceAlerts">Attendance Alerts</Label>
                <Switch
                  id="attendanceAlerts"
                  checked={notificationSettings.attendanceAlerts}
                  onCheckedChange={(checked) => handleNotificationChange('attendanceAlerts', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="feeReminders">Fee Reminders</Label>
                <Switch
                  id="feeReminders"
                  checked={notificationSettings.feeReminders}
                  onCheckedChange={(checked) => handleNotificationChange('feeReminders', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="emergencyAlerts">Emergency Alerts</Label>
                <Switch
                  id="emergencyAlerts"
                  checked={notificationSettings.emergencyAlerts}
                  onCheckedChange={(checked) => handleNotificationChange('emergencyAlerts', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 w-5 h-5" />
              Academic Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="gradingSystem">Grading System</Label>
                <Select
                  value={academicSettings.gradingSystem}
                  onValueChange={(value) => handleAcademicChange('gradingSystem', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="gpa">GPA</SelectItem>
                    <SelectItem value="letter">Letter Grade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="passingGrade">Passing Grade</Label>
                <Input
                  id="passingGrade"
                  value={academicSettings.passingGrade}
                  onChange={(e) => handleAcademicChange('passingGrade', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="termSystem">Term System</Label>
                <Select
                  value={academicSettings.termSystem}
                  onValueChange={(value) => handleAcademicChange('termSystem', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semester">Semester</SelectItem>
                    <SelectItem value="trimester">Trimester</SelectItem>
                    <SelectItem value="quarter">Quarter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="homeworkSubmission">Online Homework Submission</Label>
                  <p className="text-sm text-gray-500">Allow digital homework submission</p>
                </div>
                <Switch
                  id="homeworkSubmission"
                  checked={academicSettings.homeworkSubmission}
                  onCheckedChange={(checked) => handleAcademicChange('homeworkSubmission', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">System Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Backup Data</h4>
                <p className="text-sm text-gray-500">Create a backup of all school data</p>
              </div>
              <Button variant="outline">Create Backup</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Export Reports</h4>
                <p className="text-sm text-gray-500">Export all system reports</p>
              </div>
              <Button variant="outline">Export Data</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-red-600">Reset System</h4>
                <p className="text-sm text-gray-500">Reset all settings to default</p>
              </div>
              <Button variant="destructive">Reset Settings</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchoolSettingsSection;
