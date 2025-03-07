import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { CourseDetails } from "@/components/admin/course-details"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function CourseDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader heading="Course Details" text={`Manage course ID: ${params.id}`}>
        <div className="flex gap-2">
          <Link href="/admin/courses">
            <Button variant="outline">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Button>
          </Link>
          <Link href={`/admin/courses/${params.id}/edit`}>
            <Button>Edit Course</Button>
          </Link>
        </div>
      </DashboardHeader>
      <CourseDetails id={params.id} />
    </div>
  )
}

