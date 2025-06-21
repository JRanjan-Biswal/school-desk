import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Settings, User, Bell, Shield, Eye, Save, Edit } from "lucide-react";
import ChangePasswordDialog from "./ChangePasswordDialog";

interface SettingsSectionProps {
  currentChild: any;
}

const SettingsSection = ({ currentChild }: SettingsSectionProps) => {
  // Profile Settings
  const [profileData, setProfileData] = useState({
    parentName: "Parent 1",
    email: "parent1@email.com",
    phone: "+123456789",
    address: "Address",
    emergencyContact: "+123456789"
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Dialog states
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    attendanceAlerts: true,
    gradeUpdates: true,
    homeworkReminders: true,
    examNotifications: true,
    emergencyAlerts: true,
    eventReminders: false
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: "30"
  });

  // Privacy Settings
  const [privacySettings, setPrivacySettings] = useState({
    sharePhotoPermission: true,
    dataSharing: false,
    marketingEmails: false
  });

  // App Settings
  const [appSettings, setAppSettings] = useState({
    language: "english",
    timezone: "est",
    theme: "light"
  });

  const handleProfileSave = () => {
    console.log('Saving profile:', profileData);
    setIsEditingProfile(false);
    alert("Profile updated successfully!");
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

  const handlePrivacyChange = (key: string, value: boolean) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: value
    }));
    console.log(`Privacy setting changed: ${key} = ${value}`);
  };

  const handleAppSettingChange = (key: string, value: string) => {
    setAppSettings(prev => ({
      ...prev,
      [key]: value
    }));
    console.log(`App setting changed: ${key} = ${value}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Settings className="mr-2" />
            Settings
          </h1>
          <p className="text-gray-600">
            Manage your account preferences for {currentChild?.name}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 w-5 h-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="parentName">Parent Name</Label>
                <Input
                  id="parentName"
                  value={profileData.parentName}
                  onChange={(e) => setProfileData(prev => ({ ...prev, parentName: e.target.value }))}
                  disabled={!isEditingProfile}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  disabled={!isEditingProfile}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  disabled={!isEditingProfile}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={profileData.address}
                  onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                  disabled={!isEditingProfile}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="emergency">Emergency Contact</Label>
                <Input
                  id="emergency"
                  value={profileData.emergencyContact}
                  onChange={(e) => setProfileData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                  disabled={!isEditingProfile}
                  className="mt-1"
                />
              </div>
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

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 w-5 h-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <Switch
                  id="email-notifications"
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <Switch
                  id="sms-notifications"
                  checked={notificationSettings.smsNotifications}
                  onCheckedChange={(checked) => handleNotificationChange('smsNotifications', checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <Label htmlFor="attendance-alerts">Attendance Alerts</Label>
                <Switch
                  id="attendance-alerts"
                  checked={notificationSettings.attendanceAlerts}
                  onCheckedChange={(checked) => handleNotificationChange('attendanceAlerts', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="grade-updates">Grade Updates</Label>
                <Switch
                  id="grade-updates"
                  checked={notificationSettings.gradeUpdates}
                  onCheckedChange={(checked) => handleNotificationChange('gradeUpdates', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="homework-reminders">Homework Reminders</Label>
                <Switch
                  id="homework-reminders"
                  checked={notificationSettings.homeworkReminders}
                  onCheckedChange={(checked) => handleNotificationChange('homeworkReminders', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="exam-notifications">Exam Notifications</Label>
                <Switch
                  id="exam-notifications"
                  checked={notificationSettings.examNotifications}
                  onCheckedChange={(checked) => handleNotificationChange('examNotifications', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="emergency-alerts">Emergency Alerts</Label>
                <Switch
                  id="emergency-alerts"
                  checked={notificationSettings.emergencyAlerts}
                  onCheckedChange={(checked) => handleNotificationChange('emergencyAlerts', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="event-reminders">Event Reminders</Label>
                <Switch
                  id="event-reminders"
                  checked={notificationSettings.eventReminders}
                  onCheckedChange={(checked) => handleNotificationChange('eventReminders', checked)}
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
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">Add an extra layer of security</p>
                </div>
                <Switch
                  id="two-factor"
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={(checked) => handleSecurityChange('twoFactorAuth', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="login-alerts">Login Alerts</Label>
                  <p className="text-sm text-gray-500">Get notified of new logins</p>
                </div>
                <Switch
                  id="login-alerts"
                  checked={securitySettings.loginAlerts}
                  onCheckedChange={(checked) => handleSecurityChange('loginAlerts', checked)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout</Label>
                <Select
                  value={securitySettings.sessionTimeout}
                  onValueChange={(value) => handleSecurityChange('sessionTimeout', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Eye className="mr-2 w-5 h-5" />
              Privacy Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="photo-permission">Photo Sharing Permission</Label>
                  <p className="text-sm text-gray-500">Allow school to share child's photos</p>
                </div>
                <Switch
                  id="photo-permission"
                  checked={privacySettings.sharePhotoPermission}
                  onCheckedChange={(checked) => handlePrivacyChange('sharePhotoPermission', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="data-sharing">Data Sharing</Label>
                  <p className="text-sm text-gray-500">Share data for educational research</p>
                </div>
                <Switch
                  id="data-sharing"
                  checked={privacySettings.dataSharing}
                  onCheckedChange={(checked) => handlePrivacyChange('dataSharing', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="marketing-emails">Marketing Emails</Label>
                  <p className="text-sm text-gray-500">Receive promotional content</p>
                </div>
                <Switch
                  id="marketing-emails"
                  checked={privacySettings.marketingEmails}
                  onCheckedChange={(checked) => handlePrivacyChange('marketingEmails', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* App Settings */}
      <Card>
        <CardHeader>
          <CardTitle>App Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={appSettings.language}
                onValueChange={(value) => handleAppSettingChange('language', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select
                value={appSettings.timezone}
                onValueChange={(value) => handleAppSettingChange('timezone', value)}
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
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select
                value={appSettings.theme}
                onValueChange={(value) => handleAppSettingChange('theme', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Account Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Change Password</h4>
                <p className="text-sm text-gray-500">Update your account password</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => setChangePasswordOpen(true)}
              >
                Change Password
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Download Data</h4>
                <p className="text-sm text-gray-500">Download a copy of your data</p>
              </div>
              <Button variant="outline">Download</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-red-600">Delete Account</h4>
                <p className="text-sm text-gray-500">Permanently delete your account</p>
              </div>
              <Button variant="destructive">Delete Account</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ChangePasswordDialog 
        open={changePasswordOpen}
        onOpenChange={setChangePasswordOpen}
      />
    </div>
  );
};

export default SettingsSection;
