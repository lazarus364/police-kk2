// This file serves as our in-memory database for the application
// In a real application, this would be replaced with a proper database

// Types
export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "user" | "moderator"
  status: "active" | "inactive"
  lastLogin: string
  password?: string // Only used for authentication, not returned in API
}

export interface Report {
  id: string
  type: string
  location: string
  date: string
  status: "Open" | "In Progress" | "Closed"
  submittedBy: string
  submittedById: string
  priority: "High" | "Medium" | "Low"
  description: string
  attachments?: string[]
}

export interface Course {
  id: string
  title: string
  description: string
  duration: string
  startDate: string
  status: "active" | "upcoming" | "completed"
  enrolledOfficers: number
  maxEnrollment: number
  instructorName: string
  instructorEmail: string
  videoCount: number
}

export interface Notification {
  id: number
  title: string
  message: string
  date: string
  type: "update" | "announcement" | "alert" | "reminder"
  read: boolean
  userId: string // The user this notification is for
}

export interface SystemSetting {
  id: string
  category: "general" | "security" | "notification" | "backup"
  key: string
  value: string | boolean | number
}

// In-memory data store
class DataStore {
  private users: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "user@example.com",
      role: "user",
      status: "active",
      lastLogin: "2023-11-15 09:23 AM",
      password: "password123", // In a real app, this would be hashed
    },
    {
      id: "2",
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      status: "active",
      lastLogin: "2023-11-15 08:45 AM",
      password: "admin123", // In a real app, this would be hashed
    },
    {
      id: "3",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "user",
      status: "active",
      lastLogin: "2023-11-14 03:12 PM",
      password: "password123",
    },
    {
      id: "4",
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      role: "user",
      status: "inactive",
      lastLogin: "2023-10-25 11:30 AM",
      password: "password123",
    },
    {
      id: "5",
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      role: "moderator",
      status: "active",
      lastLogin: "2023-11-13 02:45 PM",
      password: "password123",
    },
  ]

  private reports: Report[] = [
    {
      id: "PD-2023-1234",
      type: "Theft",
      location: "123 Main St",
      date: "2023-10-15",
      status: "Open",
      submittedBy: "John Doe",
      submittedById: "1",
      priority: "Medium",
      description:
        "My bicycle was stolen from outside the grocery store. It's a red mountain bike with black handlebars.",
    },
    {
      id: "PD-2023-1235",
      type: "Assault",
      location: "456 Oak Ave",
      date: "2023-10-14",
      status: "In Progress",
      submittedBy: "Jessica Martinez",
      submittedById: "3",
      priority: "High",
      description: "I was assaulted by an unknown individual while walking home from work.",
    },
    {
      id: "PD-2023-1236",
      type: "Vandalism",
      location: "789 Pine Rd",
      date: "2023-10-13",
      status: "Closed",
      submittedBy: "David Wilson",
      submittedById: "4",
      priority: "Low",
      description: "Graffiti was sprayed on the side of my garage. The tags appear to be gang-related.",
    },
    {
      id: "PD-2023-1237",
      type: "Burglary",
      location: "101 Elm St",
      date: "2023-10-12",
      status: "Open",
      submittedBy: "Emily Taylor",
      submittedById: "5",
      priority: "High",
      description: "My home was broken into while I was away. Several valuable items were stolen.",
    },
    {
      id: "PD-2023-1238",
      type: "Domestic Dispute",
      location: "202 Maple Dr",
      date: "2023-10-11",
      status: "In Progress",
      submittedBy: "Robert Brown",
      submittedById: "1",
      priority: "Medium",
      description: "Loud argument between neighbors that escalated to shouting and possible physical altercation.",
    },
  ]

  private courses: Course[] = [
    {
      id: "course-001",
      title: "Basic Police Training",
      description: "Fundamental training for new police officers",
      duration: "8 weeks",
      startDate: "2023-11-01",
      status: "active",
      enrolledOfficers: 24,
      maxEnrollment: 30,
      instructorName: "Captain Johnson",
      instructorEmail: "johnson@police.gov",
      videoCount: 12,
    },
    {
      id: "course-002",
      title: "Advanced Investigation Techniques",
      description: "Advanced methods for criminal investigations",
      duration: "4 weeks",
      startDate: "2023-11-15",
      status: "active",
      enrolledOfficers: 16,
      maxEnrollment: 20,
      instructorName: "Detective Smith",
      instructorEmail: "smith@police.gov",
      videoCount: 8,
    },
    {
      id: "course-003",
      title: "Crisis Management",
      description: "Handling high-stress situations and crisis scenarios",
      duration: "2 weeks",
      startDate: "2023-12-01",
      status: "upcoming",
      enrolledOfficers: 0,
      maxEnrollment: 32,
      instructorName: "Sergeant Davis",
      instructorEmail: "davis@police.gov",
      videoCount: 6,
    },
    {
      id: "course-004",
      title: "Cybercrime Investigation",
      description: "Digital forensics and online crime investigation",
      duration: "6 weeks",
      startDate: "2023-09-15",
      status: "completed",
      enrolledOfficers: 18,
      maxEnrollment: 20,
      instructorName: "Officer Wilson",
      instructorEmail: "wilson@police.gov",
      videoCount: 15,
    },
    {
      id: "course-005",
      title: "Community Policing",
      description: "Building relationships with the community",
      duration: "3 weeks",
      startDate: "2023-10-20",
      status: "active",
      enrolledOfficers: 28,
      maxEnrollment: 30,
      instructorName: "Lieutenant Adams",
      instructorEmail: "adams@police.gov",
      videoCount: 9,
    },
  ]

  private notifications: Notification[] = [
    {
      id: 1,
      title: "Report Status Update",
      message: "Your theft report #2023-0003 has been updated to 'In Progress'",
      date: "2 hours ago",
      type: "update",
      read: false,
      userId: "1",
    },
    {
      id: 2,
      title: "New Course Available",
      message: "A new training course on 'Community Policing' is now available",
      date: "Yesterday",
      type: "announcement",
      read: false,
      userId: "1",
    },
    {
      id: 3,
      title: "System Maintenance",
      message: "The system will be down for maintenance on Saturday from 2AM to 4AM",
      date: "3 days ago",
      type: "alert",
      read: true,
      userId: "1",
    },
    {
      id: 4,
      title: "Report Reminder",
      message: "Please complete your incident report submission that was started on 10/12/2023",
      date: "1 week ago",
      type: "reminder",
      read: true,
      userId: "1",
    },
    {
      id: 5,
      title: "Admin Alert: New User Registration",
      message: "A new user has registered and requires approval",
      date: "1 hour ago",
      type: "alert",
      read: false,
      userId: "2",
    },
    {
      id: 6,
      title: "System Update Complete",
      message: "The system has been updated to version 2.3.0",
      date: "2 days ago",
      type: "announcement",
      read: true,
      userId: "2",
    },
  ]

  private systemSettings: SystemSetting[] = [
    {
      id: "1",
      category: "general",
      key: "systemName",
      value: "Police Management System",
    },
    {
      id: "2",
      category: "general",
      key: "contactEmail",
      value: "support@policeportal.gov",
    },
    {
      id: "3",
      category: "general",
      key: "maxFileSize",
      value: 10,
    },
    {
      id: "4",
      category: "general",
      key: "maintenanceMode",
      value: false,
    },
    {
      id: "5",
      category: "security",
      key: "passwordPolicy",
      value: "medium",
    },
    {
      id: "6",
      category: "security",
      key: "sessionTimeout",
      value: 30,
    },
    {
      id: "7",
      category: "security",
      key: "twoFactorAuth",
      value: true,
    },
    {
      id: "8",
      category: "security",
      key: "ipRestriction",
      value: false,
    },
    {
      id: "9",
      category: "notification",
      key: "emailNotifications",
      value: true,
    },
    {
      id: "10",
      category: "notification",
      key: "smsNotifications",
      value: false,
    },
    {
      id: "11",
      category: "notification",
      key: "systemAnnouncements",
      value: true,
    },
    {
      id: "12",
      category: "notification",
      key: "reportUpdates",
      value: true,
    },
    {
      id: "13",
      category: "backup",
      key: "autoBackup",
      value: true,
    },
    {
      id: "14",
      category: "backup",
      key: "backupFrequency",
      value: "daily",
    },
    {
      id: "15",
      category: "backup",
      key: "retentionPeriod",
      value: 30,
    },
    {
      id: "16",
      category: "backup",
      key: "backupLocation",
      value: "cloud",
    },
  ]

  // User methods
  getUsers(): User[] {
    return this.users.map(({ password, ...user }) => user) // Don't return passwords
  }

  getUserById(id: string): User | undefined {
    const user = this.users.find((u) => u.id === id)
    if (user) {
      const { password, ...userWithoutPassword } = user
      return userWithoutPassword
    }
    return undefined
  }

  getUserByEmail(email: string): User | undefined {
    const user = this.users.find((u) => u.email === email)
    return user // Include password for authentication
  }

  addUser(user: Omit<User, "id">): User {
    const newUser = {
      ...user,
      id: `user-${Date.now()}`,
    }
    this.users.push(newUser as User)
    const { password, ...userWithoutPassword } = newUser as User
    return userWithoutPassword
  }

  updateUser(id: string, userData: Partial<User>): User | undefined {
    const index = this.users.findIndex((u) => u.id === id)
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...userData }
      const { password, ...userWithoutPassword } = this.users[index]
      return userWithoutPassword
    }
    return undefined
  }

  deleteUser(id: string): boolean {
    const initialLength = this.users.length
    this.users = this.users.filter((u) => u.id !== id)
    return this.users.length !== initialLength
  }

  // Report methods
  getReports(): Report[] {
    return this.reports
  }

  getReportById(id: string): Report | undefined {
    return this.reports.find((r) => r.id === id)
  }

  getReportsByUserId(userId: string): Report[] {
    return this.reports.filter((r) => r.submittedById === userId)
  }

  addReport(report: Omit<Report, "id">): Report {
    const newReport = {
      ...report,
      id: `PD-${new Date().getFullYear()}-${1000 + this.reports.length}`,
    }
    this.reports.push(newReport as Report)
    return newReport as Report
  }

  updateReport(id: string, reportData: Partial<Report>): Report | undefined {
    const index = this.reports.findIndex((r) => r.id === id)
    if (index !== -1) {
      this.reports[index] = { ...this.reports[index], ...reportData }
      return this.reports[index]
    }
    return undefined
  }

  deleteReport(id: string): boolean {
    const initialLength = this.reports.length
    this.reports = this.reports.filter((r) => r.id !== id)
    return this.reports.length !== initialLength
  }

  // Course methods
  getCourses(): Course[] {
    return this.courses
  }

  getCourseById(id: string): Course | undefined {
    return this.courses.find((c) => c.id === id)
  }

  addCourse(course: Omit<Course, "id">): Course {
    const newCourse = {
      ...course,
      id: `course-${this.courses.length + 1}`.padStart(9, "0"),
    }
    this.courses.push(newCourse as Course)
    return newCourse as Course
  }

  updateCourse(id: string, courseData: Partial<Course>): Course | undefined {
    const index = this.courses.findIndex((c) => c.id === id)
    if (index !== -1) {
      this.courses[index] = { ...this.courses[index], ...courseData }
      return this.courses[index]
    }
    return undefined
  }

  deleteCourse(id: string): boolean {
    const initialLength = this.courses.length
    this.courses = this.courses.filter((c) => c.id !== id)
    return this.courses.length !== initialLength
  }

  // Notification methods
  getNotifications(): Notification[] {
    return this.notifications
  }

  getNotificationsByUserId(userId: string): Notification[] {
    return this.notifications.filter((n) => n.userId === userId)
  }

  getNotificationById(id: number): Notification | undefined {
    return this.notifications.find((n) => n.id === id)
  }

  addNotification(notification: Omit<Notification, "id">): Notification {
    const newNotification = {
      ...notification,
      id: this.notifications.length + 1,
    }
    this.notifications.push(newNotification as Notification)
    return newNotification as Notification
  }

  updateNotification(id: number, notificationData: Partial<Notification>): Notification | undefined {
    const index = this.notifications.findIndex((n) => n.id === id)
    if (index !== -1) {
      this.notifications[index] = { ...this.notifications[index], ...notificationData }
      return this.notifications[index]
    }
    return undefined
  }

  deleteNotification(id: number): boolean {
    const initialLength = this.notifications.length
    this.notifications = this.notifications.filter((n) => n.id !== id)
    return this.notifications.length !== initialLength
  }

  markNotificationAsRead(id: number): Notification | undefined {
    return this.updateNotification(id, { read: true })
  }

  markAllNotificationsAsRead(userId: string): Notification[] {
    const userNotifications = this.getNotificationsByUserId(userId)
    userNotifications.forEach((notification) => {
      this.markNotificationAsRead(notification.id)
    })
    return this.getNotificationsByUserId(userId)
  }

  // System Settings methods
  getSystemSettings(): SystemSetting[] {
    return this.systemSettings
  }

  getSystemSettingsByCategory(category: SystemSetting["category"]): SystemSetting[] {
    return this.systemSettings.filter((s) => s.category === category)
  }

  getSystemSettingByKey(key: string): SystemSetting | undefined {
    return this.systemSettings.find((s) => s.key === key)
  }

  updateSystemSetting(key: string, value: SystemSetting["value"]): SystemSetting | undefined {
    const index = this.systemSettings.findIndex((s) => s.key === key)
    if (index !== -1) {
      this.systemSettings[index] = { ...this.systemSettings[index], value }
      return this.systemSettings[index]
    }
    return undefined
  }

  // Generate report data
  generateReportData(reportType: string, dateRange: string): any {
    // This would normally query the database based on parameters
    // For now, we'll return mock data

    switch (reportType) {
      case "incident":
        return {
          title: "Incident Report",
          date: new Date().toISOString(),
          summary: {
            totalIncidents: this.reports.length,
            openIncidents: this.reports.filter((r) => r.status === "Open").length,
            inProgressIncidents: this.reports.filter((r) => r.status === "In Progress").length,
            closedIncidents: this.reports.filter((r) => r.status === "Closed").length,
          },
          incidentsByType: {
            Theft: this.reports.filter((r) => r.type === "Theft").length,
            Assault: this.reports.filter((r) => r.type === "Assault").length,
            Vandalism: this.reports.filter((r) => r.type === "Vandalism").length,
            Burglary: this.reports.filter((r) => r.type === "Burglary").length,
            "Domestic Dispute": this.reports.filter((r) => r.type === "Domestic Dispute").length,
          },
          incidentsByPriority: {
            High: this.reports.filter((r) => r.priority === "High").length,
            Medium: this.reports.filter((r) => r.priority === "Medium").length,
            Low: this.reports.filter((r) => r.priority === "Low").length,
          },
          recentIncidents: this.reports.slice(0, 5),
        }

      case "user":
        return {
          title: "User Activity Report",
          date: new Date().toISOString(),
          summary: {
            totalUsers: this.users.length,
            activeUsers: this.users.filter((u) => u.status === "active").length,
            inactiveUsers: this.users.filter((u) => u.status === "inactive").length,
          },
          usersByRole: {
            admin: this.users.filter((u) => u.role === "admin").length,
            moderator: this.users.filter((u) => u.role === "moderator").length,
            user: this.users.filter((u) => u.role === "user").length,
          },
          recentUsers: this.users.slice(0, 5).map(({ password, ...user }) => user),
        }

      case "performance":
        // Mock performance data
        return {
          title: "System Performance Report",
          date: new Date().toISOString(),
          summary: {
            averageResponseTime: "1.2s",
            uptime: "99.9%",
            totalRequests: 15243,
            errorRate: "0.05%",
          },
          resourceUsage: {
            cpu: "45%",
            memory: "62%",
            disk: "38%",
          },
          peakTimes: {
            day: "Wednesday",
            hour: "2:00 PM - 3:00 PM",
          },
        }

      case "audit":
        // Mock audit data
        return {
          title: "Audit Log Report",
          date: new Date().toISOString(),
          summary: {
            totalEvents: 1243,
            loginEvents: 532,
            dataModificationEvents: 421,
            systemConfigEvents: 290,
          },
          recentEvents: [
            { timestamp: "2023-11-15 09:23:45", user: "admin@example.com", action: "User Login", ip: "192.168.1.1" },
            {
              timestamp: "2023-11-15 09:45:12",
              user: "admin@example.com",
              action: "Update System Settings",
              ip: "192.168.1.1",
            },
            { timestamp: "2023-11-15 10:12:33", user: "user@example.com", action: "User Login", ip: "192.168.1.2" },
            { timestamp: "2023-11-15 10:15:22", user: "user@example.com", action: "Create Report", ip: "192.168.1.2" },
            {
              timestamp: "2023-11-15 11:05:18",
              user: "admin@example.com",
              action: "Update User Role",
              ip: "192.168.1.1",
            },
          ],
        }

      default:
        return {
          title: "Unknown Report Type",
          date: new Date().toISOString(),
          error: "Invalid report type specified",
        }
    }
  }
}

// Export a singleton instance
export const dataStore = new DataStore()

