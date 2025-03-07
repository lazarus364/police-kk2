import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, AlertTriangle, CheckCircle, Clock, Users } from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader heading="Admin Dashboard" text="Manage all police department operations">
        <Button>Generate System Report</Button>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">Currently being investigated</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">60</div>
            <p className="text-xs text-muted-foreground">Completed cases</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registered Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,204</div>
            <p className="text-xs text-muted-foreground">+86 from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Incident Reports</CardTitle>
          <CardDescription>Manage and update the status of recent incident reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-[1fr_100px_100px_80px] items-center gap-4 rounded-md border p-4">
              <div>
                <p className="font-medium">Theft Report #2023-0128</p>
                <p className="text-sm text-muted-foreground">Submitted by John Doe on Oct 18, 2023</p>
              </div>
              <div className="flex h-6 items-center justify-center rounded-full bg-yellow-100 px-2 text-xs font-medium text-yellow-800">
                Pending
              </div>
              <div className="text-sm text-muted-foreground">High Priority</div>
              <Button size="sm">Review</Button>
            </div>
            <div className="grid grid-cols-[1fr_100px_100px_80px] items-center gap-4 rounded-md border p-4">
              <div>
                <p className="font-medium">Assault Report #2023-0127</p>
                <p className="text-sm text-muted-foreground">Submitted by Jane Smith on Oct 17, 2023</p>
              </div>
              <div className="flex h-6 items-center justify-center rounded-full bg-blue-100 px-2 text-xs font-medium text-blue-800">
                In Progress
              </div>
              <div className="text-sm text-muted-foreground">High Priority</div>
              <Button size="sm">Update</Button>
            </div>
            <div className="grid grid-cols-[1fr_100px_100px_80px] items-center gap-4 rounded-md border p-4">
              <div>
                <p className="font-medium">Vandalism Report #2023-0126</p>
                <p className="text-sm text-muted-foreground">Submitted by Mike Johnson on Oct 16, 2023</p>
              </div>
              <div className="flex h-6 items-center justify-center rounded-full bg-blue-100 px-2 text-xs font-medium text-blue-800">
                In Progress
              </div>
              <div className="text-sm text-muted-foreground">Medium Priority</div>
              <Button size="sm">Update</Button>
            </div>
            <div className="grid grid-cols-[1fr_100px_100px_80px] items-center gap-4 rounded-md border p-4">
              <div>
                <p className="font-medium">Noise Complaint #2023-0125</p>
                <p className="text-sm text-muted-foreground">Submitted by Sarah Williams on Oct 15, 2023</p>
              </div>
              <div className="flex h-6 items-center justify-center rounded-full bg-green-100 px-2 text-xs font-medium text-green-800">
                Resolved
              </div>
              <div className="text-sm text-muted-foreground">Low Priority</div>
              <Button size="sm" variant="outline">
                View
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

