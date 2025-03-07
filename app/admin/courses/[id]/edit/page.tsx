import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { CourseForm } from "@/components/admin/course-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function EditCoursePage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader heading="Edit Course" text={`Edit course ID: ${params.id}`}>
        <Link href={`/admin/courses/${params.id}`}>
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Course Details
          </Button>
        </Link>
      </DashboardHeader>
      <CourseForm courseId={params.id} />
    </div>
  )
}

