"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Download, Calendar } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("month")

  // Mock data for charts
  const incidentData = [
    { name: "Jan", theft: 65, assault: 28, vandalism: 40 },
    { name: "Feb", theft: 59, assault: 32, vandalism: 36 },
    { name: "Mar", theft: 80, assault: 41, vandalism: 55 },
    { name: "Apr", theft: 81, assault: 34, vandalism: 42 },
    { name: "May", theft: 56, assault: 29, vandalism: 48 },
    { name: "Jun", theft: 55, assault: 25, vandalism: 38 },
    { name: "Jul", theft: 40, assault: 22, vandalism: 30 },
    { name: "Aug", theft: 45, assault: 20, vandalism: 27 },
    { name: "Sep", theft: 58, assault: 27, vandalism: 32 },
    { name: "Oct", theft: 70, assault: 30, vandalism: 45 },
    { name: "Nov", theft: 66, assault: 35, vandalism: 50 },
    { name: "Dec", theft: 75, assault: 40, vandalism: 55 },
  ]

  const userActivityData = [
    { name: "Week 1", reports: 40, logins: 120 },
    { name: "Week 2", reports: 30, logins: 100 },
    { name: "Week 3", reports: 45, logins: 130 },
    { name: "Week 4", reports: 50, logins: 140 },
  ]

  const incidentTypeData = [
    { name: "Theft", value: 35 },
    { name: "Assault", value: 20 },
    { name: "Vandalism", value: 15 },
    { name: "Burglary", value: 10 },
    { name: "Other", value: 20 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  const handleExportData = () => {
    toast({
      title: "Data exported",
      description: "Analytics data has been exported to CSV",
    })
  }

  const handleGenerateReport = () => {
    toast({
      title: "Report generated",
      description: "Analytics report has been generated and is ready for download",
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader heading="Analytics" text="View system analytics and statistics">
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportData}>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button onClick={handleGenerateReport}>Generate Report</Button>
        </div>
      </DashboardHeader>

      <div className="flex justify-end">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="incidents" className="space-y-4">
        <TabsList>
          <TabsTrigger value="incidents">Incident Reports</TabsTrigger>
          <TabsTrigger value="users">User Activity</TabsTrigger>
          <TabsTrigger value="types">Incident Types</TabsTrigger>
        </TabsList>

        <TabsContent value="incidents">
          <Card>
            <CardHeader>
              <CardTitle>Incident Reports Over Time</CardTitle>
              <CardDescription>Number of incidents reported by type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={incidentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="theft" name="Theft" fill="#0088FE" />
                    <Bar dataKey="assault" name="Assault" fill="#00C49F" />
                    <Bar dataKey="vandalism" name="Vandalism" fill="#FFBB28" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>Reports submitted and user logins over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userActivityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="reports"
                      name="Reports Submitted"
                      stroke="#0088FE"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="logins" name="User Logins" stroke="#00C49F" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="types">
          <Card>
            <CardHeader>
              <CardTitle>Incident Types Distribution</CardTitle>
              <CardDescription>Breakdown of incidents by type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={incidentTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {incidentTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Response Time</CardTitle>
            <CardDescription>Average time to respond to incidents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Theft</div>
                  <div className="text-sm font-medium">24 minutes</div>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                  <div className="h-full w-[60%] rounded-full bg-primary"></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Assault</div>
                  <div className="text-sm font-medium">12 minutes</div>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                  <div className="h-full w-[85%] rounded-full bg-primary"></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Vandalism</div>
                  <div className="text-sm font-medium">45 minutes</div>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                  <div className="h-full w-[40%] rounded-full bg-primary"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Usage</CardTitle>
            <CardDescription>User engagement metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Active Users</div>
                  <div className="text-sm font-medium">1,245</div>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                  <div className="h-full w-[75%] rounded-full bg-primary"></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Reports Submitted</div>
                  <div className="text-sm font-medium">3,427</div>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                  <div className="h-full w-[65%] rounded-full bg-primary"></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Course Completion Rate</div>
                  <div className="text-sm font-medium">68%</div>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                  <div className="h-full w-[68%] rounded-full bg-primary"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

