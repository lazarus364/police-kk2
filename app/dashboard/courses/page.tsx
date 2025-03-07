import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, Calendar } from "lucide-react"
import Link from "next/link"

export default function CoursesPage() {
  // Mock courses data
  const courses = [
    {
      id: "course-001",
      title: "Basic Police Training",
      description: "Fundamental training for new police officers",
      progress: 75,
      status: "active",
      startDate: "Nov 1, 2023",
      duration: "8 weeks",
      enrolled: true,
    },
    {
      id: "course-002",
      title: "Advanced Investigation Techniques",
      description: "Advanced methods for criminal investigations",
      progress: 30,
      status: "active",
      startDate: "Nov 15, 2023",
      duration: "4 weeks",
      enrolled: true,
    },
    {
      id: "course-003",
      title: "Crisis Management",
      description: "Handling high-stress situations and crisis scenarios",
      progress: 0,
      status: "upcoming",
      startDate: "Dec 1, 2023",
      duration: "2 weeks",
      enrolled: false,
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Upcoming</Badge>
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Completed</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader heading="Training Courses" text="View and enroll in available training courses" />

      <div className="grid gap-6">
        {courses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{course.title}</CardTitle>
                {getStatusBadge(course.status)}
              </div>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Start: {course.startDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Duration: {course.duration}</span>
                  </div>
                </div>

                {course.enrolled && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} />
                  </div>
                )}

                <div className="flex justify-end">
                  {course.enrolled ? (
                    <Button asChild>
                      <Link href={`/dashboard/courses/${course.id}`}>Continue Course</Link>
                    </Button>
                  ) : (
                    <Button variant="outline">Enroll Now</Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

