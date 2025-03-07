import { NextResponse } from "next/server"
import { dataStore } from "@/lib/api/data-store"

export async function GET(request: Request) {
  try {
    // Get query parameters
    const url = new URL(request.url)
    const userId = url.searchParams.get("userId")

    let notifications
    if (userId) {
      notifications = dataStore.getNotificationsByUserId(userId)
    } else {
      notifications = dataStore.getNotifications()
    }

    return NextResponse.json({ notifications })
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return NextResponse.json({ error: "An error occurred while fetching notifications" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const notificationData = await request.json()

    // Validate required fields
    if (!notificationData.title || !notificationData.message || !notificationData.userId) {
      return NextResponse.json({ error: "Title, message, and userId are required" }, { status: 400 })
    }

    // Create new notification
    const newNotification = dataStore.addNotification({
      ...notificationData,
      date: notificationData.date || new Date().toLocaleString(),
      type: notificationData.type || "announcement",
      read: false,
    })

    return NextResponse.json({ notification: newNotification }, { status: 201 })
  } catch (error) {
    console.error("Error creating notification:", error)
    return NextResponse.json({ error: "An error occurred while creating the notification" }, { status: 500 })
  }
}

