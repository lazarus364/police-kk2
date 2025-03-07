import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { NotificationsList } from "@/components/admin/notifications-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AdminNotificationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader heading="Notification Management" text="Send and manage system notifications">
        <Link href="/admin/notifications/create">
          <Button>Create Notification</Button>
        </Link>
      </DashboardHeader>
      <NotificationsList />
    </div>
  )
}

