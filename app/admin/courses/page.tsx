import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { CoursesList } from "@/components/admin/courses-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminCoursesPage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader heading="Course Management" text="Manage training courses for officers and staff">
        <Link href="/admin/courses/create">
          <Button>Create New Course</Button>
        </Link>
      </DashboardHeader>
      <CoursesList />
    </div>
  )
}

