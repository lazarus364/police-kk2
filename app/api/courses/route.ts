import { NextResponse } from "next/server"
import { dataStore } from "@/lib/api/data-store"

export async function GET(request: Request) {
  try {
    const courses = dataStore.getCourses()
    return NextResponse.json({ courses })
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json({ error: "An error occurred while fetching courses" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const courseData = await request.json()

    // Validate required fields
    if (!courseData.title || !courseData.description || !courseData.duration) {
      return NextResponse.json({ error: "Title, description, and duration are required" }, { status: 400 })
    }

    // Create new course
    const newCourse = dataStore.addCourse({
      ...courseData,
      enrolledOfficers: courseData.enrolledOfficers || 0,
      status: courseData.status || "upcoming",
      startDate: courseData.startDate || new Date().toISOString().split("T")[0],
      videoCount: courseData.videoCount || 0,
    })

    return NextResponse.json({ course: newCourse }, { status: 201 })
  } catch (error) {
    console.error("Error creating course:", error)
    return NextResponse.json({ error: "An error occurred while creating the course" }, { status: 500 })
  }
}

