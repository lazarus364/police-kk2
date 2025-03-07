import { NextResponse } from "next/server"
import { dataStore } from "@/lib/api/data-store"

export async function POST(request: Request) {
  try {
    const { id } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "Notification ID is required" }, { status: 400 })
    }

    const notification = dataStore.markNotificationAsRead(id)

    if (!notification) {
      return NextResponse.json({ error: "Notification not found" }, { status: 404 })
    }

    return NextResponse.json({ notification })
  } catch (error) {
    console.error("Error marking notification as read:", error)
    return NextResponse.json({ error: "An error occurred while marking the notification as read" }, { status: 500 })
  }
}

