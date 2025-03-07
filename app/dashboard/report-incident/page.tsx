import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { IncidentReportForm } from "@/components/dashboard/incident-report-form"

export default function ReportIncidentPage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader
        heading="Report an Incident"
        text="Fill out the form below to report an incident to the police department"
      />
      <IncidentReportForm />
    </div>
  )
}

