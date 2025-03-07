import { NextResponse } from "next/server"
import { dataStore } from "@/lib/api/data-store"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const user = dataStore.getUserByEmail(email)

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    if (user.status === "inactive") {
      return NextResponse.json({ error: "Account is inactive. Please contact an administrator." }, { status: 403 })
    }

    // Update last login time
    dataStore.updateUser(user.id, {
      lastLogin: new Date().toLocaleString(),
    })

    // Don't return the password
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      user: userWithoutPassword,
      message: "Login successful",
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "An error occurred during login" }, { status: 500 })
  }
}

