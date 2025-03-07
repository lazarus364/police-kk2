import { NextResponse } from "next/server"
import { dataStore } from "@/lib/api/data-store"

export async function GET(request: Request) {
  try {
    // Get query parameters
    const url = new URL(request.url)
    const category = url.searchParams.get("category")

    let settings
    if (category) {
      settings = dataStore.getSystemSettingsByCategory(category as any)
    } else {
      settings = dataStore.getSystemSettings()
    }

    return NextResponse.json({ settings })
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json({ error: "An error occurred while fetching settings" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { key, value } = await request.json()

    if (!key) {
      return NextResponse.json({ error: "Setting key is required" }, { status: 400 })
    }

    const setting = dataStore.updateSystemSetting(key, value)

    if (!setting) {
      return NextResponse.json({ error: "Setting not found" }, { status: 404 })
    }

    return NextResponse.json({ setting })
  } catch (error) {
    console.error("Error updating setting:", error)
    return NextResponse.json({ error: "An error occurred while updating the setting" }, { status: 500 })
  }
}

