"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Info, AlertTriangle, Megaphone, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NotificationsPage() {
  // Mock notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Report Status Update",
      message: "Your theft report #2023-0003 has been updated to 'In Progress'",
      date: "2 hours ago",
      type: "update",
      read: false,
    },
    {
      id: 2,
      title: "New Course Available",
      message: "A new training course on 'Community Policing' is now available",
      date: "Yesterday",
      type: "announcement",
      read: false,
    },
    {
      id: 3,
      title: "System Maintenance",
      message: "The system will be down for maintenance on Saturday from 2AM to 4AM",
      date: "3 days ago",
      type: "alert",
      read: true,
    },
    {
      id: 4,
      title: "Report Reminder",
      message: "Please complete your incident report submission that was started on 10/12/2023",
      date: "1 week ago",
      type: "reminder",
      read: true,
    },
  ])

  const getIcon = (type: string) => {
    switch (type) {
      case "update":
        return <Info className="h-5 w-5 text-blue-500" />
      case "announcement":
        return <Megaphone className="h-5 w-5 text-green-500" />
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "reminder":
        return <Bell className="h-5 w-5 text-yellow-500" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read",
    })
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read",
    })
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader heading="Notifications" text="View all your system notifications">
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            <Check className="mr-2 h-4 w-4" />
            Mark All as Read
          </Button>
        )}
      </DashboardHeader>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Notifications</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>You have {unreadCount} unread notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.length === 0 ? (
                  <div className="text-center py-8">
                    <Bell className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No notifications to display</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-4 p-4 rounded-lg border ${!notification.read ? "bg-muted/50" : ""}`}
                    >
                      <div className="mt-1">{getIcon(notification.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{notification.title}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{notification.date}</span>
                            {!notification.read && (
                              <Badge variant="default" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 text-xs"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread">
          <Card>
            <CardHeader>
              <CardTitle>Unread Notifications</CardTitle>
              <CardDescription>Notifications you haven't read yet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.filter((n) => !n.read).length === 0 ? (
                  <div className="text-center py-8">
                    <Check className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">You're all caught up!</p>
                  </div>
                ) : (
                  notifications
                    .filter((n) => !n.read)
                    .map((notification) => (
                      <div key={notification.id} className="flex items-start gap-4 p-4 rounded-lg border bg-muted/50">
                        <div className="mt-1">{getIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{notification.title}</h3>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">{notification.date}</span>
                              <Badge variant="default" className="text-xs">
                                New
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 text-xs"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as read
                          </Button>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

