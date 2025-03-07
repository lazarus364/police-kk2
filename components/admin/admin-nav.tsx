"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FileText, Home, Users, Settings, LogOut, BarChart, BookOpen, Bell } from "lucide-react"
import { useAuthContext } from "@/components/auth-provider"
import { useRouter } from "next/navigation"

export function AdminNav() {
  const pathname = usePathname()
  const { logout } = useAuthContext()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <nav className="grid items-start gap-2 py-4">
      <Link href="/admin">
        <Button variant={pathname === "/admin" ? "default" : "ghost"} className="w-full justify-start">
          <Home className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
      </Link>
      <Link href="/admin/reports">
        <Button variant={pathname === "/admin/reports" ? "default" : "ghost"} className="w-full justify-start">
          <FileText className="mr-2 h-4 w-4" />
          Manage Reports
        </Button>
      </Link>
      <Link href="/admin/users">
        <Button variant={pathname === "/admin/users" ? "default" : "ghost"} className="w-full justify-start">
          <Users className="mr-2 h-4 w-4" />
          User Management
        </Button>
      </Link>
      <Link href="/admin/courses">
        <Button variant={pathname === "/admin/courses" ? "default" : "ghost"} className="w-full justify-start">
          <BookOpen className="mr-2 h-4 w-4" />
          Courses
        </Button>
      </Link>
      <Link href="/admin/notifications">
        <Button variant={pathname === "/admin/notifications" ? "default" : "ghost"} className="w-full justify-start">
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </Button>
      </Link>
      <Link href="/admin/analytics">
        <Button variant={pathname === "/admin/analytics" ? "default" : "ghost"} className="w-full justify-start">
          <BarChart className="mr-2 h-4 w-4" />
          Analytics
        </Button>
      </Link>
      <Link href="/admin/settings">
        <Button variant={pathname === "/admin/settings" ? "default" : "ghost"} className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          System Settings
        </Button>
      </Link>
      <Link href="/dashboard">
        <Button variant="ghost" className="w-full justify-start">
          <Home className="mr-2 h-4 w-4" />
          User Dashboard
        </Button>
      </Link>
      <div className="mt-auto">
        <Button variant="ghost" className="w-full justify-start text-muted-foreground" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </nav>
  )
}

