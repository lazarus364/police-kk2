"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Users, FileVideo, Mail, User, ChevronRight, AlertTriangle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { getCourseById, sendCourseNotification } from "@/lib/actions/course-actions"
import { VideoUploader } from "@/components/admin/video-uploader"
import { EnrolledOfficers } from "@/components/admin/enrolled-officers"

interface CourseDetailsProps {
  id: string
}

export function CourseDetails({ id }: CourseDetailsProps) {
  const [course, setCourse] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSendingNotification, setIsSendingNotification] = useState(false)

  useEffect(() => {
    async function loadCourseData() {
      setIsLoading(true)
      try {
        const courseData = await getCourseById(id)
        setCourse(courseData)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load course data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadCourseData()
  }, [id])

  const handleSendNotification = async () => {
    setIsSendingNotification(true)
    try {
      await sendCourseNotification(id)
      toast({
        title: "Notification sent",
        description: "Course notification has been sent to all enrolled officers.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send notification. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSendingNotification(false)
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

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-sm text-muted-foreground">Loading course details...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!course) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <AlertTriangle className="h-8 w-8 text-destructive mx-auto" />
              <p className="mt-2 text-sm text-muted-foreground">Course not found</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Mock data for demonstration
  const mockCourse = {
    id: id,
    title: "Advanced Investigation Techniques",
    description:
      "This comprehensive course covers advanced methods for criminal investigations, including evidence collection, interview techniques, and case management. Officers will learn how to handle complex cases and improve their investigative skills.",
    duration: "4 weeks",
    enrolledOfficers: 16,
    status: "active",
    startDate: "2023-11-15",
    videoCount: 8,
    maxEnrollment: 30,
    instructorName: "Captain Sarah Johnson",
    instructorEmail: "sjohnson@police.gov",
    videos: [
      { id: "vid-001", title: "Introduction to Advanced Investigation", duration: "45:20", uploadDate: "2023-10-20" },
      { id: "vid-002", title: "Evidence Collection Techniques", duration: "52:15", uploadDate: "2023-10-22" },
      { id: "vid-003", title: "Interview Strategies", duration: "38:45", uploadDate: "2023-10-25" },
      { id: "vid-004", title: "Digital Evidence Handling", duration: "41:30", uploadDate: "2023-10-28" },
    ],
    enrolledUsers: [
      { id: "off-001", name: "Officer Michael Brown", email: "mbrown@police.gov", progress: 75 },
      { id: "off-002", name: "Officer Jessica Martinez", email: "jmartinez@police.gov", progress: 50 },
      { id: "off-003", name: "Officer David Wilson", email: "dwilson@police.gov", progress: 100 },
      { id: "off-004", name: "Officer Emily Taylor", email: "etaylor@police.gov", progress: 25 },
    ],
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{mockCourse.title}</CardTitle>
              <CardDescription className="mt-2">{getStatusBadge(mockCourse.status)}</CardDescription>
            </div>
            <Button onClick={handleSendNotification} disabled={isSendingNotification}>
              <Mail className="mr-2 h-4 w-4" />
              {isSendingNotification ? "Sending..." : "Send Notification"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Description</h3>
              <p className="mt-2 text-muted-foreground">{mockCourse.description}</p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Start Date</p>
                  <p className="text-sm text-muted-foreground">{mockCourse.startDate}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Duration</p>
                  <p className="text-sm text-muted-foreground">{mockCourse.duration}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Enrollment</p>
                  <p className="text-sm text-muted-foreground">
                    {mockCourse.enrolledOfficers} / {mockCourse.maxEnrollment}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <FileVideo className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Videos</p>
                  <p className="text-sm text-muted-foreground">{mockCourse.videoCount} total</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium">Instructor</h3>
              <div className="mt-2 flex items-center space-x-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{mockCourse.instructorName}</p>
                  <p className="text-sm text-muted-foreground">{mockCourse.instructorEmail}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href={`/admin/courses/${id}/edit`}>Edit Course Details</Link>
          </Button>
          <Button asChild>
            <Link href={`/admin/courses/${id}/videos`}>
              Manage Videos
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <Tabs defaultValue="videos">
        <TabsList>
          <TabsTrigger value="videos">Course Videos</TabsTrigger>
          <TabsTrigger value="officers">Enrolled Officers</TabsTrigger>
          <TabsTrigger value="upload">Upload Videos</TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Videos</CardTitle>
              <CardDescription>All videos available in this course</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCourse.videos.map((video) => (
                  <div key={video.id} className="flex items-center justify-between rounded-md border p-4">
                    <div className="flex items-center space-x-4">
                      <FileVideo className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{video.title}</p>
                        <p className="text-sm text-muted-foreground">
                          Duration: {video.duration} • Uploaded: {video.uploadDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Preview
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="officers" className="mt-6">
          <EnrolledOfficers courseId={id} />
        </TabsContent>

        <TabsContent value="upload" className="mt-6">
          <VideoUploader courseId={id} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

