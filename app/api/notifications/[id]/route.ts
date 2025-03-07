import { NextResponse } from "next/server"
import { dataStore } from "@/lib/api/data-store"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid notification ID" }, { status: 400 })
    }

    const notification = dataStore.getNotificationById(id)

    if (!notification) {
      return NextResponse.json({ error: "Notification not found" }, { status: 404 })
    }

    return NextResponse.json({ notification })
  } catch (error) {
    console.error("Error fetching notification:", error)
    return NextResponse.json({ error: "An error occurred while fetching the notification" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid notification ID" }, { status: 400 })
    }

    const notificationData = await request.json()
    const updatedNotification = dataStore.updateNotification(id, notificationData)

    if (!updatedNotification) {
      return NextResponse.json({ error: "Notification not found" }, { status: 404 })
    }

    return NextResponse.json({ notification: updatedNotification })
  } catch (error) {
    console.error("Error updating notification:", error)
    return NextResponse.json({ error: "An error occurred while updating the notification" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid notification ID" }, { status: 400 })
    }

    const success = dataStore.deleteNotification(id)

    if (!success) {
      return NextResponse.json({ error: "Notification not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Notification deleted successfully" })
  } catch (error) {
    console.error("Error deleting notification:", error)
    return NextResponse.json({ error: "An error occurred while deleting the notification" }, { status: 500 })
  }
}

