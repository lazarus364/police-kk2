import { NextResponse } from "next/server"
import { dataStore } from "@/lib/api/data-store"

export async function POST(request: Request) {
  try {
    const { reportType, dateRange, format, sections } = await request.json()

    if (!reportType) {
      return NextResponse.json({ error: "Report type is required" }, { status: 400 })
    }

    // Generate report data
    const reportData = dataStore.generateReportData(reportType, dateRange)

    // Filter sections based on user selection
    if (sections) {
      const filteredData: any = {
        title: reportData.title,
        date: reportData.date,
      }

      if (sections.summary && reportData.summary) {
        filteredData.summary = reportData.summary
      }

      if (sections.details) {
        // Include detailed data based on report type
        switch (reportType) {
          case "incident":
            filteredData.incidentsByType = reportData.incidentsByType
            filteredData.incidentsByPriority = reportData.incidentsByPriority
            break
          case "user":
            filteredData.usersByRole = reportData.usersByRole
            break
          case "performance":
            filteredData.resourceUsage = reportData.resourceUsage
            break
          case "audit":
            filteredData.totalEvents = reportData.totalEvents
            break
        }
      }

      if (sections.charts) {
        // Include chart data
        filteredData.chartData = true
      }

      if (sections.userActivity && reportData.recentUsers) {
        filteredData.recentUsers = reportData.recentUsers
      }

      if (sections.recommendations) {
        // Add mock recommendations
        filteredData.recommendations = [
          "Increase security training for all staff",
          "Implement two-factor authentication for sensitive areas",
          "Review incident response procedures quarterly",
          "Upgrade system hardware to improve performance",
        ]
      }

      return NextResponse.json({
        report: filteredData,
        format: format || "pdf",
        downloadUrl: `/api/reports/download?type=${reportType}&format=${format || "pdf"}`,
      })
    }

    // Return full report if no sections specified
    return NextResponse.json({
      report: reportData,
      format: format || "pdf",
      downloadUrl: `/api/reports/download?type=${reportType}&format=${format || "pdf"}`,
    })
  } catch (error) {
    console.error("Error generating report:", error)
    return NextResponse.json({ error: "An error occurred while generating the report" }, { status: 500 })
  }
}

