"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { toast } from "@/components/ui/use-toast"
import { FileText, Download, Printer, Mail } from "lucide-react"
import { reportsAPI } from "@/lib/api/api-client"

export default function GenerateReportPage() {
  const [reportType, setReportType] = useState("incident")
  const [dateRange, setDateRange] = useState("last-month")
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const [format, setFormat] = useState("pdf")
  const [isGenerating, setIsGenerating] = useState(false)
  const [reportGenerated, setReportGenerated] = useState(false)
  const [reportData, setReportData] = useState<any>(null)

  const [sections, setSections] = useState({
    summary: true,
    details: true,
    charts: true,
    userActivity: false,
    recommendations: false,
  })

  const handleSectionChange = (section: string, checked: boolean) => {
    setSections({
      ...sections,
      [section]: checked,
    })
  }

  const handleGenerateReport = async () => {
    setIsGenerating(true)

    try {
      const response = await reportsAPI.generateReport({
        reportType,
        dateRange,
        format,
        sections,
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
      })

      setReportData(response.report)
      setReportGenerated(true)

      toast({
        title: "Report generated",
        description: "Your system report has been generated successfully",
      })
    } catch (error) {
      toast({
        title: "Error generating report",
        description: "There was a problem generating your report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = async () => {
    try {
      const response = await reportsAPI.downloadReport(reportType, format)

      toast({
        title: "Report downloaded",
        description: `Report has been downloaded in ${format.toUpperCase()} format`,
      })
    } catch (error) {
      toast({
        title: "Download failed",
        description: "There was a problem downloading your report. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handlePrint = () => {
    // In a real app, this would trigger the print dialog
    toast({
      title: "Printing report",
      description: "Report has been sent to printer",
    })
  }

  const handleEmail = () => {
    toast({
      title: "Report emailed",
      description: "Report has been emailed to administrators",
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader heading="Generate System Report" text="Create comprehensive system reports" />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Report Configuration</CardTitle>
            <CardDescription>Configure the report parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="report-type">Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="incident">Incident Report</SelectItem>
                  <SelectItem value="user">User Activity Report</SelectItem>
                  <SelectItem value="performance">System Performance Report</SelectItem>
                  <SelectItem value="audit">Audit Log Report</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-range">Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger id="date-range">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="last-quarter">Last Quarter</SelectItem>
                  <SelectItem value="year-to-date">Year to Date</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {dateRange === "custom" && (
              <div className="grid gap-4 grid-cols-2">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <DatePicker date={startDate} setDate={setStartDate} />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <DatePicker date={endDate} setDate={setEndDate} />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="format">Output Format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger id="format">
                  <SelectValue placeholder="Select output format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                  <SelectItem value="csv">CSV File</SelectItem>
                  <SelectItem value="html">HTML Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Report Sections</CardTitle>
            <CardDescription>Select sections to include in the report</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="summary"
                  checked={sections.summary}
                  onCheckedChange={(checked) => handleSectionChange("summary", checked as boolean)}
                />
                <Label htmlFor="summary">Executive Summary</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="details"
                  checked={sections.details}
                  onCheckedChange={(checked) => handleSectionChange("details", checked as boolean)}
                />
                <Label htmlFor="details">Detailed Statistics</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="charts"
                  checked={sections.charts}
                  onCheckedChange={(checked) => handleSectionChange("charts", checked as boolean)}
                />
                <Label htmlFor="charts">Charts and Graphs</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="user-activity"
                  checked={sections.userActivity}
                  onCheckedChange={(checked) => handleSectionChange("userActivity", checked as boolean)}
                />
                <Label htmlFor="user-activity">User Activity Logs</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="recommendations"
                  checked={sections.recommendations}
                  onCheckedChange={(checked) => handleSectionChange("recommendations", checked as boolean)}
                />
                <Label htmlFor="recommendations">Recommendations</Label>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleGenerateReport} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                  Generating Report...
                </>
              ) : (
                <>
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {reportGenerated && reportData && (
        <Card>
          <CardHeader>
            <CardTitle>Report Ready</CardTitle>
            <CardDescription>Your report has been generated successfully</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-6 border rounded-md bg-muted/50">
              <div className="text-center">
                <FileText className="mx-auto h-16 w-16 text-primary mb-4" />
                <h3 className="text-lg font-medium">{reportData.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Generated on: {new Date(reportData.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Format: {format.toUpperCase()}</p>

                {reportData.summary && (
                  <div className="mt-4 text-left p-4 border rounded-md">
                    <h4 className="font-medium mb-2">Executive Summary</h4>
                    <ul className="text-sm space-y-1">
                      {Object.entries(reportData.summary).map(([key, value]: [string, any]) => (
                        <li key={key}>
                          <span className="font-medium">
                            {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}:{" "}
                          </span>
                          {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {reportData.recommendations && (
                  <div className="mt-4 text-left p-4 border rounded-md">
                    <h4 className="font-medium mb-2">Recommendations</h4>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      {reportData.recommendations.map((rec: string, index: number) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" onClick={handleEmail}>
              <Mail className="mr-2 h-4 w-4" />
              Email
            </Button>
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

