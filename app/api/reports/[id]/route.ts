import { NextResponse } from "next/server"
import { dataStore } from "@/lib/api/data-store"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const report = dataStore.getReportById(params.id)

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 })
    }

    return NextResponse.json({ report })
  } catch (error) {
    console.error("Error fetching report:", error)
    return NextResponse.json({ error: "An error occurred while fetching the report" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const reportData = await request.json()
    const updatedReport = dataStore.updateReport(params.id, reportData)

    if (!updatedReport) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 })
    }

    return NextResponse.json({ report: updatedReport })
  } catch (error) {
    console.error("Error updating report:", error)
    return NextResponse.json({ error: "An error occurred while updating the report" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const success = dataStore.deleteReport(params.id)

    if (!success) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Report deleted successfully" })
  } catch (error) {
    console.error("Error deleting report:", error)
    return NextResponse.json({ error: "An error occurred while deleting the report" }, { status: 500 })
  }
}

