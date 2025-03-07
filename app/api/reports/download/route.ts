import { NextResponse } from "next/server"
import { dataStore } from "@/lib/api/data-store"

export async function GET(request: Request) {
  try {
    // Get query parameters
    const url = new URL(request.url)
    const type = url.searchParams.get("type")
    const format = url.searchParams.get("format") || "pdf"

    if (!type) {
      return NextResponse.json({ error: "Report type is required" }, { status: 400 })
    }

    // Generate report data
    const reportData = dataStore.generateReportData(type, "all")

    // In a real application, we would generate the actual file here
    // For this demo, we'll just return a success message

    return NextResponse.json({
      success: true,
      message: `Report downloaded successfully in ${format.toUpperCase()} format`,
      reportName: `${type}_report_${new Date().toISOString().split("T")[0]}.${format}`,
    })
  } catch (error) {
    console.error("Error downloading report:", error)
    return NextResponse.json({ error: "An error occurred while downloading the report" }, { status: 500 })
  }
}

