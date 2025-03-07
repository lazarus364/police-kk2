"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

export default function SystemSettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    systemName: "Police Management System",
    contactEmail: "support@policeportal.gov",
    maxFileSize: "10",
    maintenanceMode: false,
  })

  const [securitySettings, setSecuritySettings] = useState({
    passwordPolicy: "medium",
    sessionTimeout: "30",
    twoFactorAuth: true,
    ipRestriction: false,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    systemAnnouncements: true,
    reportUpdates: true,
  })

  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: "daily",
    retentionPeriod: "30",
    backupLocation: "cloud",
  })

  const handleSaveGeneralSettings = () => {
    toast({
      title: "Settings saved",
      description: "General settings have been updated successfully",
    })
  }

  const handleSaveSecuritySettings = () => {
    toast({
      title: "Settings saved",
      description: "Security settings have been updated successfully",
    })
  }

  const handleSaveNotificationSettings = () => {
    toast({
      title: "Settings saved",
      description: "Notification settings have been updated successfully",
    })
  }

  const handleSaveBackupSettings = () => {
    toast({
      title: "Settings saved",
      description: "Backup settings have been updated successfully",
    })
  }

  const handleRunBackup = () => {
    toast({
      title: "Backup started",
      description: "System backup has been initiated",
    })
  }

  const handleClearCache = () => {
    toast({
      title: "Cache cleared",
      description: "System cache has been cleared successfully",
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader heading="System Settings" text="Configure system-wide settings and preferences" />

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="backup">Backup & Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure basic system settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3">
                <Label htmlFor="system-name">System Name</Label>
                <Input
                  id="system-name"
                  value={generalSettings.systemName}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, systemName: e.target.value })}
                />
                <p className="text-sm text-muted-foreground">This name will be displayed throughout the application</p>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="contact-email">Support Contact Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={generalSettings.contactEmail}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })}
                />
                <p className="text-sm text-muted-foreground">
                  This email will be used for system notifications and user support
                </p>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="max-file-size">Maximum File Upload Size (MB)</Label>
                <Input
                  id="max-file-size"
                  type="number"
                  value={generalSettings.maxFileSize}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, maxFileSize: e.target.value })}
                />
                <p className="text-sm text-muted-foreground">Maximum file size for uploads (in megabytes)</p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="maintenance-mode"
                  checked={generalSettings.maintenanceMode}
                  onCheckedChange={(checked) => setGeneralSettings({ ...generalSettings, maintenanceMode: checked })}
                />
                <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
              </div>
              <p className="text-sm text-muted-foreground">When enabled, only administrators can access the system</p>

              <Button onClick={handleSaveGeneralSettings}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure system security options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3">
                <Label htmlFor="password-policy">Password Policy</Label>
                <Select
                  value={securitySettings.passwordPolicy}
                  onValueChange={(value) => setSecuritySettings({ ...securitySettings, passwordPolicy: value })}
                >
                  <SelectTrigger id="password-policy">
                    <SelectValue placeholder="Select password policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Minimum 6 characters</SelectItem>
                    <SelectItem value="medium">Medium - 8+ chars with numbers</SelectItem>
                    <SelectItem value="high">High - 10+ chars with numbers and symbols</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">Set the complexity requirements for user passwords</p>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input
                  id="session-timeout"
                  type="number"
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: e.target.value })}
                />
                <p className="text-sm text-muted-foreground">
                  Time in minutes before an inactive session is automatically logged out
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="two-factor-auth"
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, twoFactorAuth: checked })}
                />
                <Label htmlFor="two-factor-auth">Two-Factor Authentication</Label>
              </div>
              <p className="text-sm text-muted-foreground">Require two-factor authentication for all admin accounts</p>

              <div className="flex items-center space-x-2">
                <Switch
                  id="ip-restriction"
                  checked={securitySettings.ipRestriction}
                  onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, ipRestriction: checked })}
                />
                <Label htmlFor="ip-restriction">IP Address Restriction</Label>
              </div>
              <p className="text-sm text-muted-foreground">Restrict admin access to specific IP addresses</p>

              <Button onClick={handleSaveSecuritySettings}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure system-wide notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="email-notifications"
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                  }
                />
                <Label htmlFor="email-notifications">Email Notifications</Label>
              </div>
              <p className="text-sm text-muted-foreground">Send system notifications via email</p>

              <div className="flex items-center space-x-2">
                <Switch
                  id="sms-notifications"
                  checked={notificationSettings.smsNotifications}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, smsNotifications: checked })
                  }
                />
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
              </div>
              <p className="text-sm text-muted-foreground">Send urgent notifications via SMS</p>

              <div className="flex items-center space-x-2">
                <Switch
                  id="system-announcements"
                  checked={notificationSettings.systemAnnouncements}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, systemAnnouncements: checked })
                  }
                />
                <Label htmlFor="system-announcements">System Announcements</Label>
              </div>
              <p className="text-sm text-muted-foreground">Display system announcements to all users</p>

              <div className="flex items-center space-x-2">
                <Switch
                  id="report-updates"
                  checked={notificationSettings.reportUpdates}
                  onCheckedChange={(checked) =>
                    setNotificationSettings({ ...notificationSettings, reportUpdates: checked })
                  }
                />
                <Label htmlFor="report-updates">Report Status Updates</Label>
              </div>
              <p className="text-sm text-muted-foreground">Notify users when their report status changes</p>

              <Button onClick={handleSaveNotificationSettings}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle>Backup & Maintenance</CardTitle>
              <CardDescription>Configure system backup and maintenance settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="auto-backup"
                  checked={backupSettings.autoBackup}
                  onCheckedChange={(checked) => setBackupSettings({ ...backupSettings, autoBackup: checked })}
                />
                <Label htmlFor="auto-backup">Automatic Backups</Label>
              </div>
              <p className="text-sm text-muted-foreground">Enable automatic system backups</p>

              <div className="grid gap-3">
                <Label htmlFor="backup-frequency">Backup Frequency</Label>
                <Select
                  value={backupSettings.backupFrequency}
                  onValueChange={(value) => setBackupSettings({ ...backupSettings, backupFrequency: value })}
                >
                  <SelectTrigger id="backup-frequency">
                    <SelectValue placeholder="Select backup frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="retention-period">Retention Period (days)</Label>
                <Input
                  id="retention-period"
                  type="number"
                  value={backupSettings.retentionPeriod}
                  onChange={(e) => setBackupSettings({ ...backupSettings, retentionPeriod: e.target.value })}
                />
                <p className="text-sm text-muted-foreground">Number of days to keep backup files</p>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="backup-location">Backup Storage Location</Label>
                <Select
                  value={backupSettings.backupLocation}
                  onValueChange={(value) => setBackupSettings({ ...backupSettings, backupLocation: value })}
                >
                  <SelectTrigger id="backup-location">
                    <SelectValue placeholder="Select storage location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local Storage</SelectItem>
                    <SelectItem value="cloud">Cloud Storage</SelectItem>
                    <SelectItem value="both">Both Local and Cloud</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleSaveBackupSettings}>Save Changes</Button>
                <Button variant="outline" onClick={handleRunBackup}>
                  Run Backup Now
                </Button>
                <Button variant="outline" onClick={handleClearCache}>
                  Clear System Cache
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

