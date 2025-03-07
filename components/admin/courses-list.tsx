"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Search, FileVideo, Users } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { deleteCourse } from "@/lib/actions/course-actions"

// Mock data for demonstration
const courses = [
  {
    id: "course-001",
    title: "Basic Police Training",
    description: "Fundamental training for new police officers",
    duration: "8 weeks",
    enrolledOfficers: 24,
    status: "active",
    startDate: "2023-11-01",
    videoCount: 12,
  },
  {
    id: "course-002",
    title: "Advanced Investigation Techniques",
    description: "Advanced methods for criminal investigations",
    duration: "4 weeks",
    enrolledOfficers: 16,
    status: "active",
    startDate: "2023-11-15",
    videoCount: 8,
  },
  {
    id: "course-003",
    title: "Crisis Management",
    description: "Handling high-stress situations and crisis scenarios",
    duration: "2 weeks",
    enrolledOfficers: 32,
    status: "upcoming",
    startDate: "2023-12-01",
    videoCount: 6,
  },
  {
    id: "course-004",
    title: "Cybercrime Investigation",
    description: "Digital forensics and online crime investigation",
    duration: "6 weeks",
    enrolledOfficers: 18,
    status: "completed",
    startDate: "2023-09-15",
    videoCount: 15,
  },
  {
    id: "course-005",
    title: "Community Policing",
    description: "Building relationships with the community",
    duration: "3 weeks",
    enrolledOfficers: 28,
    status: "active",
    startDate: "2023-10-20",
    videoCount: 9,
  },
]

export function CoursesList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())

    if (filter === "all") return matchesSearch
    return matchesSearch && course.status === filter
  })

  const handleDeleteCourse = async (courseId: string) => {
    try {
      await deleteCourse(courseId)
      toast({
        title: "Course deleted",
        description: "The course has been successfully deleted.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the course. Please try again.",
        variant: "destructive",
      })
    }
  }

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
    <Card>
      <CardHeader>
        <CardTitle>Training Courses</CardTitle>
        <CardDescription>Manage all training courses in the system</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search courses..."
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
                variant={filter === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("active")}
              >
                Active
              </Button>
              <Button
                variant={filter === "upcoming" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("upcoming")}
              >
                Upcoming
              </Button>
              <Button
                variant={filter === "completed" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("completed")}
              >
                Completed
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Start Date</TableHead>
                  <TableHead className="hidden md:table-cell">Duration</TableHead>
                  <TableHead className="hidden md:table-cell">Enrolled</TableHead>
                  <TableHead className="hidden md:table-cell">Videos</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div>{course.title}</div>
                        <div className="text-sm text-muted-foreground md:hidden">{getStatusBadge(course.status)}</div>
                        <div className="text-xs text-muted-foreground md:hidden mt-1">
                          Start: {course.startDate} • {course.duration}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{getStatusBadge(course.status)}</TableCell>
                    <TableCell className="hidden md:table-cell">{course.startDate}</TableCell>
                    <TableCell className="hidden md:table-cell">{course.duration}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                        {course.enrolledOfficers}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex items-center">
                        <FileVideo className="mr-2 h-4 w-4 text-muted-foreground" />
                        {course.videoCount}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/courses/${course.id}`}>View details</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/courses/${course.id}/edit`}>Edit course</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/courses/${course.id}/videos`}>Manage videos</Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDeleteCourse(course.id)}
                          >
                            Delete course
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredCourses.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No courses found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

