import { NextResponse } from "next/server"
import { dataStore } from "@/lib/api/data-store"

export async function GET(request: Request) {
  try {
    // Get query parameters
    const url = new URL(request.url)
    const userId = url.searchParams.get("userId")

    let reports
    if (userId) {
      reports = dataStore.getReportsByUserId(userId)
    } else {
      reports = dataStore.getReports()
    }

    return NextResponse.json({ reports })
  } catch (error) {
    console.error("Error fetching reports:", error)
    return NextResponse.json({ error: "An error occurred while fetching reports" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const reportData = await request.json()

    // Validate required fields
    if (!reportData.type || !reportData.location || !reportData.submittedById) {
      return NextResponse.json({ error: "Type, location, and submittedById are required" }, { status: 400 })
    }

    // Get user info for the submitter
    const user = dataStore.getUserById(reportData.submittedById)
    if (!user) {
      return NextResponse.json({ error: "Invalid submittedById" }, { status: 400 })
    }

    // Create new report
    const newReport = dataStore.addReport({
      ...reportData,
      submittedBy: user.name,
      date: reportData.date || new Date().toISOString().split("T")[0],
      status: reportData.status || "Open",
      priority: reportData.priority || "Medium",
    })

    return NextResponse.json({ report: newReport }, { status: 201 })
  } catch (error) {
    console.error("Error creating report:", error)
    return NextResponse.json({ error: "An error occurred while creating the report" }, { status: 500 })
  }
}

