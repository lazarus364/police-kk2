"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, FileText, Download, Printer } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ManageReportsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock reports data
  const reports = [
    {
      id: "PD-2023-1234",
      type: "Theft",
      location: "123 Main St",
      date: "2023-10-15",
      status: "Open",
      submittedBy: "John Doe",
      priority: "Medium",
    },
    {
      id: "PD-2023-1235",
      type: "Assault",
      location: "456 Oak Ave",
      date: "2023-10-14",
      status: "In Progress",
      submittedBy: "Jessica Martinez",
      priority: "High",
    },
    {
      id: "PD-2023-1236",
      type: "Vandalism",
      location: "789 Pine Rd",
      date: "2023-10-13",
      status: "Closed",
      submittedBy: "David Wilson",
      priority: "Low",
    },
    {
      id: "PD-2023-1237",
      type: "Burglary",
      location: "101 Elm St",
      date: "2023-10-12",
      status: "Open",
      submittedBy: "Emily Taylor",
      priority: "High",
    },
    {
      id: "PD-2023-1238",
      type: "Domestic Dispute",
      location: "202 Maple Dr",
      date: "2023-10-11",
      status: "In Progress",
      submittedBy: "Robert Brown",
      priority: "Medium",
    },
  ]

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.submittedBy.toLowerCase().includes(searchQuery.toLowerCase())

    if (statusFilter === "all") return matchesSearch
    return matchesSearch && report.status.toLowerCase().replace(" ", "-") === statusFilter
  })

  const handleStatusChange = (reportId: string, newStatus: string) => {
    toast({
      title: "Status updated",
      description: `Report ${reportId} status changed to ${newStatus}`,
    })
  }

  const handleDeleteReport = (reportId: string) => {
    toast({
      title: "Report deleted",
      description: `Report ${reportId} has been deleted`,
    })
  }

  const handleExportReports = () => {
    toast({
      title: "Reports exported",
      description: "All reports have been exported to CSV",
    })
  }

  const handlePrintReports = () => {
    toast({
      title: "Printing reports",
      description: "Sending reports to printer",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Open":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Open
          </Badge>
        )
      case "In Progress":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            In Progress
          </Badge>
        )
      case "Closed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Closed
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            High
          </Badge>
        )
      case "Medium":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Medium
          </Badge>
        )
      case "Low":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Low
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader heading="Manage Reports" text="View and manage all incident reports">
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportReports}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" onClick={handlePrintReports}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </DashboardHeader>

      <Card>
        <CardHeader>
          <CardTitle>All Reports</CardTitle>
          <CardDescription>Manage and update incident reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search reports..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Submitted By</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No reports found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.id}</TableCell>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>{report.location}</TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>{getStatusBadge(report.status)}</TableCell>
                        <TableCell>{getPriorityBadge(report.priority)}</TableCell>
                        <TableCell>{report.submittedBy}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => (window.location.href = `/admin/reports/${report.id}`)}>
                                <FileText className="mr-2 h-4 w-4" />
                                View details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleStatusChange(report.id, "Open")}>
                                Set as Open
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(report.id, "In Progress")}>
                                Set as In Progress
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(report.id, "Closed")}>
                                Set as Closed
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteReport(report.id)}>
                                Delete report
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

