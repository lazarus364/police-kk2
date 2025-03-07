"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Mail, Bell, AlertTriangle, Info, Megaphone } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { deleteNotification, resendNotification } from "@/lib/actions/notification-actions"

// Mock data for demonstration
const notifications = [
  {
    id: "notif-001",
    title: "New Training Course Available",
    message: "A new training course on Advanced Investigation Techniques is now available. Enroll today!",
    type: "announcement",
    priority: "normal",
    sentTo: "All Officers",
    sentVia: ["email", "in-app"],
    sentDate: "2023-11-15",
    sentBy: "Admin User",
  },
  {
    id: "notif-002",
    title: "System Maintenance",
    message: "The system will be down for maintenance on Saturday, November 18th from 2:00 AM to 4:00 AM.",
    type: "alert",
    priority: "high",
    sentTo: "All Users",
    sentVia: ["email", "in-app"],
    sentDate: "2023-11-14",
    sentBy: "System Administrator",
  },
  {
    id: "notif-003",
    title: "Course Completion Reminder",
    message: "Please complete your assigned training courses by the end of the month.",
    type: "reminder",
    priority: "normal",
    sentTo: "Course Participants",
    sentVia: ["email"],
    sentDate: "2023-11-10",
    sentBy: "Training Coordinator",
  },
  {
    id: "notif-004",
    title: "Emergency Protocol Update",
    message: "New emergency protocols have been implemented. Please review the updated procedures immediately.",
    type: "update",
    priority: "urgent",
    sentTo: "All Officers",
    sentVia: ["email", "in-app"],
    sentDate: "2023-11-05",
    sentBy: "Chief of Police",
  },
  {
    id: "notif-005",
    title: "Quarterly Performance Review",
    message: "Quarterly performance reviews will begin next week. Please prepare your documentation.",
    type: "announcement",
    priority: "low",
    sentTo: "All Officers",
    sentVia: ["in-app"],
    sentDate: "2023-11-01",
    sentBy: "HR Department",
  },
]

export function NotificationsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")
  const [resending, setResending] = useState<string | null>(null)

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase())

    if (filter === "all") return matchesSearch
    return matchesSearch && notification.type === filter
  })

  const handleDeleteNotification = async (notificationId: string) => {
    try {
      await deleteNotification(notificationId)
      toast({
        title: "Notification deleted",
        description: "The notification has been successfully deleted.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the notification. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleResendNotification = async (notificationId: string) => {
    setResending(notificationId)
    try {
      await resendNotification(notificationId)
      toast({
        title: "Notification resent",
        description: "The notification has been successfully resent.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend the notification. Please try again.",
        variant: "destructive",
      })
    } finally {
      setResending(null)
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "announcement":
        return <Megaphone className="h-4 w-4" />
      case "alert":
        return <AlertTriangle className="h-4 w-4" />
      case "reminder":
        return <Bell className="h-4 w-4" />
      case "update":
        return <Info className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "low":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Low
          </Badge>
        )
      case "normal":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Normal
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">
            High
          </Badge>
        )
      case "urgent":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            Urgent
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification History</CardTitle>
        <CardDescription>View and manage all notifications sent through the system</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search notifications..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
                All
              </Button>
              <Button
                variant={filter === "announcement" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("announcement")}
              >
                Announcements
              </Button>
              <Button variant={filter === "alert" ? "default" : "outline"} size="sm" onClick={() => setFilter("alert")}>
                Alerts
              </Button>
              <Button
                variant={filter === "reminder" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("reminder")}
              >
                Reminders
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Notification</TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
                  <TableHead className="hidden md:table-cell">Priority</TableHead>
                  <TableHead className="hidden md:table-cell">Sent To</TableHead>
                  <TableHead className="hidden md:table-cell">Sent Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNotifications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No notifications found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredNotifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium flex items-center">
                            {getTypeIcon(notification.type)}
                            <span className="ml-2">{notification.title}</span>
                          </div>
                          <div className="text-sm text-muted-foreground line-clamp-1 md:hidden mt-1">
                            {notification.sentDate} • {notification.sentTo}
                          </div>
                          <div className="text-sm text-muted-foreground line-clamp-1 mt-1">{notification.message}</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="capitalize">{notification.type}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{getPriorityBadge(notification.priority)}</TableCell>
                      <TableCell className="hidden md:table-cell">{notification.sentTo}</TableCell>
                      <TableCell className="hidden md:table-cell">{notification.sentDate}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleResendNotification(notification.id)}
                            disabled={resending === notification.id}
                          >
                            {resending === notification.id ? (
                              <div className="flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                                <span>Sending</span>
                              </div>
                            ) : (
                              <>
                                <Mail className="mr-2 h-4 w-4" />
                                Resend
                              </>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteNotification(notification.id)}
                          >
                            Delete
                          </Button>
                        </div>
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
  )
}

