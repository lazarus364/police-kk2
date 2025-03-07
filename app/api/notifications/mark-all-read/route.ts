import { NextResponse } from "next/server"
import { dataStore } from "@/lib/api/data-store"

export async function POST(request: Request) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const notifications = dataStore.markAllNotificationsAsRead(userId)

    return NextResponse.json({ notifications })
  } catch (error) {
    console.error("Error marking all notifications as read:", error)
    return NextResponse.json({ error: "An error occurred while marking all notifications as read" }, { status: 500 })
  }
}

