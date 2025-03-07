import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProfileForm } from "@/components/dashboard/profile-form"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader heading="My Profile" text="View and manage your personal information" />

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notification Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardContent className="pt-6">
              <ProfileForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Security Settings</h3>
              <p className="text-muted-foreground mb-6">Manage your password and security preferences</p>
              {/* Security settings form would go here */}
              <div className="space-y-4">
                <div className="grid gap-2">
                  <h4 className="font-medium">Change Password</h4>
                  <p className="text-sm text-muted-foreground">Update your password to maintain account security</p>
                  <div className="flex justify-end">
                    <button className="text-sm font-medium text-primary">Change Password</button>
                  </div>
                </div>

                <div className="grid gap-2">
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  <div className="flex justify-end">
                    <button className="text-sm font-medium text-primary">Enable 2FA</button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
              <p className="text-muted-foreground mb-6">Control how and when you receive notifications</p>
              {/* Notification preferences form would go here */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <div className="flex h-5 items-center">
                    <input
                      id="email-notifications"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                      defaultChecked
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">In-App Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive notifications within the application</p>
                  </div>
                  <div className="flex h-5 items-center">
                    <input
                      id="in-app-notifications"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                      defaultChecked
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Course Reminders</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive reminders about upcoming and incomplete courses
                    </p>
                  </div>
                  <div className="flex h-5 items-center">
                    <input
                      id="course-reminders"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                      defaultChecked
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

