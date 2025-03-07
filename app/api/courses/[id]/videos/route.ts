import { NextResponse } from "next/server"

// GET /api/courses/[id]/videos - Get videos for a specific course
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const courseId = params.id

    // In a real application, this would fetch data from a database
    // For now, we'll return mock data
    const videos = [
      { id: "vid-001", title: "Introduction to Advanced Investigation", duration: "45:20", uploadDate: "2023-10-20" },
      { id: "vid-002", title: "Evidence Collection Techniques", duration: "52:15", uploadDate: "2023-10-22" },
      { id: "vid-003", title: "Interview Strategies", duration: "38:45", uploadDate: "2023-10-25" },
      { id: "vid-004", title: "Digital Evidence Handling", duration: "41:30", uploadDate: "2023-10-28" },
    ]

    return NextResponse.json({ videos })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 })
  }
}

// POST /api/courses/[id]/videos - Upload a new video to a course
export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const courseId = params.id

    // In a real application, this would handle file upload and database storage
    // For now, we'll just process the JSON data
    const formData = await request.json()

    if (!formData.title || !formData.description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Mock response with a new video ID
    const newVideo = {
      id: `vid-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      duration: "00:00", // Would be calculated from the actual video
      uploadDate: new Date().toISOString().split("T")[0],
    }

    return NextResponse.json({ video: newVideo }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to upload video" }, { status: 500 })
  }
}

