"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock data for demonstration
const reports = [
  {
    id: "2023-0003",
    type: "Theft",
    location: "123 Main St, Cityville",
    date: "2023-10-15",
    time: "14:30",
    description:
      "My bicycle was stolen from outside the grocery store. It's a red mountain bike with black handlebars.",
    status: "pending",
    updates: [],
  },
  {
    id: "2023-0002",
    type: "Vandalism",
    location: "456 Oak Ave, Cityville",
    date: "2023-09-28",
    time: "23:15",
    description: "Graffiti was sprayed on the side of my garage. The tags appear to be gang-related.",
    status: "in-progress",
    updates: [
      {
        date: "2023-10-01",
        content: "Officer Johnson has been assigned to your case and will be in contact shortly.",
      },
      {
        date: "2023-10-05",
        content: "Evidence has been collected from the scene and is being processed.",
      },
    ],
  },
  {
    id: "2023-0001",
    type: "Noise Complaint",
    location: "789 Pine Rd, Cityville",
    date: "2023-08-12",
    time: "01:45",
    description: "Loud music and shouting from the apartment above mine. This has been ongoing for several weekends.",
    status: "resolved",
    updates: [
      {
        date: "2023-08-13",
        content: "Officer Smith responded to the complaint and spoke with the residents.",
      },
      {
        date: "2023-08-20",
        content: "Follow-up visit conducted. No further noise complaints reported.",
      },
      {
        date: "2023-08-27",
        content: "Case closed as resolved. Please submit a new report if the issue recurs.",
      },
    ],
  },
]

export function ReportsList() {
  const [selectedReport, setSelectedReport] = useState(null)

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            In Progress
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Resolved
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="all">All Reports</TabsTrigger>
        <TabsTrigger value="active">Active</TabsTrigger>
        <TabsTrigger value="resolved">Resolved</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="space-y-4 mt-4">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>
                  {report.type} Report #{report.id}
                </CardTitle>
                {getStatusBadge(report.status)}
              </div>
              <CardDescription>
                Reported on {report.date} at {report.time}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Location: </span>
                  <span>{report.location}</span>
                </div>
                <div>
                  <span className="font-medium">Description: </span>
                  <span className="line-clamp-2">{report.description}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" onClick={() => setSelectedReport(report)}>
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {report?.type} Report #{report?.id}
                    </DialogTitle>
                    <DialogDescription>
                      Reported on {report?.date} at {report?.time}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Status:</span>
                      {getStatusBadge(report?.status)}
                    </div>
                    <div>
                      <span className="font-medium">Location:</span>
                      <p className="mt-1">{report?.location}</p>
                    </div>
                    <div>
                      <span className="font-medium">Description:</span>
                      <p className="mt-1">{report?.description}</p>
                    </div>
                    {report?.updates?.length > 0 && (
                      <div>
                        <span className="font-medium">Case Updates:</span>
                        <div className="mt-2 space-y-2">
                          {report?.updates.map((update, index) => (
                            <div key={index} className="border-l-2 border-primary pl-4 py-1">
                              <p className="text-sm font-medium">{update.date}</p>
                              <p className="text-sm">{update.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="ghost" size="sm">
                Print Report
              </Button>
            </CardFooter>
          </Card>
        ))}
      </TabsContent>
      <TabsContent value="active" className="space-y-4 mt-4">
        {reports
          .filter((r) => r.status === "pending" || r.status === "in-progress")
          .map((report) => (
            <Card key={report.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>
                    {report.type} Report #{report.id}
                  </CardTitle>
                  {getStatusBadge(report.status)}
                </div>
                <CardDescription>
                  Reported on {report.date} at {report.time}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Location: </span>
                    <span>{report.location}</span>
                  </div>
                  <div>
                    <span className="font-medium">Description: </span>
                    <span className="line-clamp-2">{report.description}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View Details</Button>
              </CardFooter>
            </Card>
          ))}
      </TabsContent>
      <TabsContent value="resolved" className="space-y-4 mt-4">
        {reports
          .filter((r) => r.status === "resolved")
          .map((report) => (
            <Card key={report.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>
                    {report.type} Report #{report.id}
                  </CardTitle>
                  {getStatusBadge(report.status)}
                </div>
                <CardDescription>
                  Reported on {report.date} at {report.time}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium">Location: </span>
                    <span>{report.location}</span>
                  </div>
                  <div>
                    <span className="font-medium">Description: </span>
                    <span className="line-clamp-2">{report.description}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View Details</Button>
              </CardFooter>
            </Card>
          ))}
      </TabsContent>
    </Tabs>
  )
}

