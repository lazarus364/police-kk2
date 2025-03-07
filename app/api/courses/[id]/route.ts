import { NextResponse } from "next/server"
import { dataStore } from "@/lib/api/data-store"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const course = dataStore.getCourseById(params.id)

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    return NextResponse.json({ course })
  } catch (error) {
    console.error("Error fetching course:", error)
    return NextResponse.json({ error: "An error occurred while fetching the course" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const courseData = await request.json()
    const updatedCourse = dataStore.updateCourse(params.id, courseData)

    if (!updatedCourse) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    return NextResponse.json({ course: updatedCourse })
  } catch (error) {
    console.error("Error updating course:", error)
    return NextResponse.json({ error: "An error occurred while updating the course" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const success = dataStore.deleteCourse(params.id)

    if (!success) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Course deleted successfully" })
  } catch (error) {
    console.error("Error deleting course:", error)
    return NextResponse.json({ error: "An error occurred while deleting the course" }, { status: 500 })
  }
}

