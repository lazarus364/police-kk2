import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { CourseForm } from "@/components/admin/course-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function CreateCoursePage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader heading="Create New Course" text="Add a new training course to the system">
        <Link href="/admin/courses">
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
        </Link>
      </DashboardHeader>
      <CourseForm />
    </div>
  )
}

