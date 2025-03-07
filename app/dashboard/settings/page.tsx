import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { SettingsForm } from "@/components/dashboard/settings-form"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader heading="Settings" text="Manage your account settings and preferences" />

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <CardContent className="pt-6">
              <SettingsForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Appearance Settings</h3>
              <p className="text-muted-foreground mb-6">Customize the appearance of the application</p>

              <div className="space-y-4">
                <div className="grid gap-2">
                  <h4 className="font-medium">Theme</h4>
                  <p className="text-sm text-muted-foreground">Select your preferred theme</p>
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <input id="theme-light" type="radio" name="theme" className="h-4 w-4" defaultChecked />
                      <label htmlFor="theme-light">Light</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input id="theme-dark" type="radio" name="theme" className="h-4 w-4" />
                      <label htmlFor="theme-dark">Dark</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input id="theme-system" type="radio" name="theme" className="h-4 w-4" />
                      <label htmlFor="theme-system">System</label>
                    </div>
                  </div>
                </div>

                <div className="grid gap-2">
                  <h4 className="font-medium">Font Size</h4>
                  <p className="text-sm text-muted-foreground">Adjust the font size for better readability</p>
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <input id="font-small" type="radio" name="font-size" className="h-4 w-4" />
                      <label htmlFor="font-small">Small</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input id="font-medium" type="radio" name="font-size" className="h-4 w-4" defaultChecked />
                      <label htmlFor="font-medium">Medium</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input id="font-large" type="radio" name="font-size" className="h-4 w-4" />
                      <label htmlFor="font-large">Large</label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accessibility">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Accessibility Settings</h3>
              <p className="text-muted-foreground mb-6">Customize accessibility options for a better experience</p>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Screen Reader Support</h4>
                    <p className="text-sm text-muted-foreground">Optimize the interface for screen readers</p>
                  </div>
                  <div className="flex h-5 items-center">
                    <input id="screen-reader" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Reduced Motion</h4>
                    <p className="text-sm text-muted-foreground">Minimize animations throughout the interface</p>
                  </div>
                  <div className="flex h-5 items-center">
                    <input id="reduced-motion" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">High Contrast</h4>
                    <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                  </div>
                  <div className="flex h-5 items-center">
                    <input id="high-contrast" type="checkbox" className="h-4 w-4 rounded border-gray-300" />
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

