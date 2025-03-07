import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ReportsList } from "@/components/dashboard/reports-list"

export default function MyReportsPage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader heading="My Reports" text="View and track the status of all your incident reports" />
      <ReportsList />
    </div>
  )
}

