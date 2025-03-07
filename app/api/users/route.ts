import { NextResponse } from "next/server"
import { dataStore } from "@/lib/api/data-store"

export async function GET(request: Request) {
  try {
    const users = dataStore.getUsers()
    return NextResponse.json({ users })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "An error occurred while fetching users" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const userData = await request.json()

    // Validate required fields
    if (!userData.name || !userData.email || !userData.role) {
      return NextResponse.json({ error: "Name, email, and role are required" }, { status: 400 })
    }

    // Check if email already exists
    const existingUser = dataStore.getUserByEmail(userData.email)
    if (existingUser) {
      return NextResponse.json({ error: "A user with this email already exists" }, { status: 409 })
    }

    // Create new user
    const newUser = dataStore.addUser({
      ...userData,
      status: userData.status || "active",
      lastLogin: userData.lastLogin || "Never",
    })

    return NextResponse.json({ user: newUser }, { status: 201 })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "An error occurred while creating the user" }, { status: 500 })
  }
}

