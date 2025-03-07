"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createCourse, updateCourse, getCourseById } from "@/lib/actions/course-actions"

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(500, {
      message: "Description must not exceed 500 characters.",
    }),
  duration: z.string().min(1, {
    message: "Duration is required.",
  }),
  startDate: z.string().min(1, {
    message: "Start date is required.",
  }),
  status: z.string({
    required_error: "Please select a status.",
  }),
  maxEnrollment: z
    .string()
    .transform((val) => Number.parseInt(val, 10))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Maximum enrollment must be a positive number.",
    }),
  instructorName: z.string().min(1, {
    message: "Instructor name is required.",
  }),
  instructorEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  notifyOfficers: z.boolean().default(false),
})

interface CourseFormProps {
  courseId?: string
}

export function CourseForm({ courseId }: CourseFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("details")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: "",
      startDate: "",
      status: "upcoming",
      maxEnrollment: "30",
      instructorName: "",
      instructorEmail: "",
      notifyOfficers: false,
    },
  })

  useEffect(() => {
    async function loadCourseData() {
      if (courseId) {
        setIsLoading(true)
        try {
          const courseData = await getCourseById(courseId)
          if (courseData) {
            form.reset({
              title: courseData.title,
              description: courseData.description,
              duration: courseData.duration,
              startDate: courseData.startDate,
              status: courseData.status,
              maxEnrollment: String(courseData.maxEnrollment),
              instructorName: courseData.instructorName,
              instructorEmail: courseData.instructorEmail,
              notifyOfficers: courseData.notifyOfficers,
            })
          }
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
    }

    loadCourseData()
  }, [courseId, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      if (courseId) {
        await updateCourse(courseId, values)
        toast({
          title: "Course updated",
          description: "The course has been successfully updated.",
        })
      } else {
        await createCourse(values)
        toast({
          title: "Course created",
          description: "The new course has been successfully created.",
        })
      }

      router.push("/admin/courses")
    } catch (error) {
      toast({
        title: "Error",
        description: courseId
          ? "Failed to update the course. Please try again."
          : "Failed to create the course. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="details">Course Details</TabsTrigger>
            <TabsTrigger value="instructor">Instructor</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <TabsContent value="details" className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter course title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter course description" className="min-h-[120px]" {...field} />
                      </FormControl>
                      <FormDescription>
                        Provide a detailed description of the course content and objectives.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 4 weeks" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="upcoming">Upcoming</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maxEnrollment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Enrollment</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormDescription>Maximum number of officers who can enroll.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="instructor" className="space-y-6">
                <FormField
                  control={form.control}
                  name="instructorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instructor Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter instructor name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="instructorEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instructor Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="instructor@example.com" {...field} />
                      </FormControl>
                      <FormDescription>The instructor will receive notifications about the course.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <FormField
                  control={form.control}
                  name="notifyOfficers"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Notify Officers</FormLabel>
                        <FormDescription>
                          Send email notifications to all eligible officers about this course.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </TabsContent>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/courses")}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : courseId ? "Update Course" : "Create Course"}
                </Button>
              </div>
            </form>
          </Form>
        </Tabs>
      </CardContent>
    </Card>
  )
}

