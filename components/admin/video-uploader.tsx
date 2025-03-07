"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FileVideo, Upload, X } from "lucide-react"
import { uploadCourseVideo } from "@/lib/actions/course-actions"

const MAX_FILE_SIZE = 500 * 1024 * 1024 // 500MB
const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg"]

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
  videoFile: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, "Video file must be less than 500MB.")
    .refine(
      (file) => ACCEPTED_VIDEO_TYPES.includes(file.type),
      "Only .mp4, .webm, and .ogg video formats are accepted.",
    ),
  notifyOfficers: z.boolean().default(false),
})

interface VideoUploaderProps {
  courseId: string
}

export function VideoUploader({ courseId }: VideoUploaderProps) {
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      notifyOfficers: false,
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      form.setValue("videoFile", file)

      // Create a preview URL for the video
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const clearSelectedFile = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    form.setValue("videoFile", undefined as any)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval)
            return 95
          }
          return prev + 5
        })
      }, 500)

      await uploadCourseVideo(courseId, values, (progress) => {
        setUploadProgress(progress)
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      toast({
        title: "Video uploaded",
        description: "The video has been successfully uploaded to the course.",
      })

      // Reset form and clear preview
      form.reset()
      clearSelectedFile()

      // Redirect to course details
      router.push(`/admin/courses/${courseId}`)
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your video. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Course Video</CardTitle>
        <CardDescription>Add a new video to this course. Supported formats: MP4, WebM, OGG.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter video title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                      <FormLabel>Notify Enrolled Officers</FormLabel>
                      <FormDescription>Send email notifications about this new video.</FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter video description" className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormDescription>Provide a detailed description of the video content.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="videoFile"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Video File</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {!selectedFile ? (
                        <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8">
                          <Upload className="h-8 w-8 text-muted-foreground mb-4" />
                          <div className="text-center">
                            <p className="text-sm font-medium">Drag and drop your video file here</p>
                            <p className="text-xs text-muted-foreground mt-1">MP4, WebM, or OGG (max 500MB)</p>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            className="mt-4"
                            onClick={() => document.getElementById("video-upload")?.click()}
                          >
                            Select File
                          </Button>
                          <Input
                            id="video-upload"
                            type="file"
                            accept="video/mp4,video/webm,video/ogg"
                            className="hidden"
                            onChange={handleFileChange}
                            {...fieldProps}
                          />
                        </div>
                      ) : (
                        <div className="rounded-md border p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <FileVideo className="h-8 w-8 text-primary" />
                              <div>
                                <p className="font-medium">{selectedFile.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type}
                                </p>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={clearSelectedFile}
                              disabled={isUploading}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          {previewUrl && (
                            <div className="mt-4">
                              <video
                                src={previewUrl}
                                controls
                                className="w-full rounded-md"
                                style={{ maxHeight: "200px" }}
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {isUploading && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">Uploading...</p>
                            <p className="text-sm font-medium">{uploadProgress}%</p>
                          </div>
                          <Progress value={uploadProgress} />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(`/admin/courses/${courseId}`)}
                disabled={isUploading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isUploading || !selectedFile}>
                {isUploading ? "Uploading..." : "Upload Video"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

