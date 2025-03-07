"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FileText, Home, Info, LogOut, Settings, User, BookOpen, Bell } from "lucide-react"
import { useAuthContext } from "@/components/auth-provider"
import { useRouter } from "next/navigation"

export function DashboardNav() {
  const pathname = usePathname()
  const { logout, isAdmin } = useAuthContext()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <nav className="grid items-start gap-2 py-4">
      <Link href="/dashboard">
        <Button variant={pathname === "/dashboard" ? "default" : "ghost"} className="w-full justify-start">
          <Home className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
      </Link>
      <Link href="/dashboard/report-incident">
        <Button
          variant={pathname === "/dashboard/report-incident" ? "default" : "ghost"}
          className="w-full justify-start"
        >
          <FileText className="mr-2 h-4 w-4" />
          Report Incident
        </Button>
      </Link>
      <Link href="/dashboard/my-reports">
        <Button variant={pathname === "/dashboard/my-reports" ? "default" : "ghost"} className="w-full justify-start">
          <FileText className="mr-2 h-4 w-4" />
          My Reports
        </Button>
      </Link>
      <Link href="/dashboard/courses">
        <Button variant={pathname === "/dashboard/courses" ? "default" : "ghost"} className="w-full justify-start">
          <BookOpen className="mr-2 h-4 w-4" />
          Training Courses
        </Button>
      </Link>
      <Link href="/dashboard/notifications">
        <Button
          variant={pathname === "/dashboard/notifications" ? "default" : "ghost"}
          className="w-full justify-start"
        >
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </Button>
      </Link>
      <Link href="/dashboard/police-info">
        <Button variant={pathname === "/dashboard/police-info" ? "default" : "ghost"} className="w-full justify-start">
          <Info className="mr-2 h-4 w-4" />
          Police Information
        </Button>
      </Link>

      <div className="mt-6 pt-6 border-t">
        <Link href="/dashboard/profile">
          <Button variant={pathname === "/dashboard/profile" ? "default" : "ghost"} className="w-full justify-start">
            <User className="mr-2 h-4 w-4" />
            My Profile
          </Button>
        </Link>
        <Link href="/dashboard/settings">
          <Button variant={pathname === "/dashboard/settings" ? "default" : "ghost"} className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </Link>
      </div>

      {isAdmin && (
        <Link href="/admin">
          <Button variant="ghost" className="w-full justify-start">
            <Home className="mr-2 h-4 w-4" />
            Admin Dashboard
          </Button>
        </Link>
      )}

      <div className="mt-auto">
        <Button variant="ghost" className="w-full justify-start text-muted-foreground" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </nav>
  )
}

