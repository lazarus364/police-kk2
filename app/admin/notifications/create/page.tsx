import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { NotificationForm } from "@/components/admin/notification-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function CreateNotificationPage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader heading="Create Notification" text="Send a new notification to users">
        <Link href="/admin/notifications">
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Notifications
          </Button>
        </Link>
      </DashboardHeader>
      <NotificationForm />
    </div>
  )
}

