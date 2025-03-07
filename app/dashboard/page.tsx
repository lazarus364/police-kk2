import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader heading="Dashboard" text="Welcome to your Police Management System dashboard">
        <Link href="/dashboard/report-incident">
          <Button>Report New Incident</Button>
        </Link>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">All incidents you've reported</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Currently being investigated</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Completed cases</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Your most recently submitted incident reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">Theft Report #2023-0003</p>
                  <p className="text-sm text-muted-foreground">Submitted on Oct 15, 2023</p>
                </div>
                <div className="flex h-6 items-center rounded-full bg-yellow-100 px-2 text-xs font-medium text-yellow-800">
                  Pending
                </div>
              </div>
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">Vandalism Report #2023-0002</p>
                  <p className="text-sm text-muted-foreground">Submitted on Sep 28, 2023</p>
                </div>
                <div className="flex h-6 items-center rounded-full bg-blue-100 px-2 text-xs font-medium text-blue-800">
                  In Progress
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Noise Complaint #2023-0001</p>
                  <p className="text-sm text-muted-foreground">Submitted on Aug 12, 2023</p>
                </div>
                <div className="flex h-6 items-center rounded-full bg-green-100 px-2 text-xs font-medium text-green-800">
                  Resolved
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Police Information</CardTitle>
            <CardDescription>Important contacts and resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Emergency Contacts</h3>
                <p className="text-sm text-muted-foreground mt-1">Police Emergency: 911</p>
                <p className="text-sm text-muted-foreground">Non-Emergency: (555) 123-4567</p>
              </div>
              <div>
                <h3 className="font-medium">Local Police Station</h3>
                <p className="text-sm text-muted-foreground mt-1">123 Main Street</p>
                <p className="text-sm text-muted-foreground">Cityville, State 12345</p>
                <p className="text-sm text-muted-foreground">Hours: 24/7</p>
              </div>
              <div>
                <h3 className="font-medium">Community Resources</h3>
                <p className="text-sm text-muted-foreground mt-1">Victim Support: (555) 987-6543</p>
                <p className="text-sm text-muted-foreground">Anonymous Tip Line: (555) 765-4321</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

