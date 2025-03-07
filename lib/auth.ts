// This file handles authentication and authorization

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type UserRole = "user" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  checkIsAdmin: () => boolean
}

// In a real app, this would be fetched from a database
const MOCK_USERS = [
  {
    id: "1",
    name: "John Doe",
    email: "user@example.com",
    password: "password123", // In a real app, this would be hashed
    role: "user" as UserRole,
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123", // In a real app, this would be hashed
    role: "admin" as UserRole,
  },
]

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const user = MOCK_USERS.find((u) => u.email === email && u.password === password)

        if (user) {
          const { password, ...userWithoutPassword } = user
          set({
            user: userWithoutPassword,
            isAuthenticated: true,
          })
        } else {
          throw new Error("Invalid email or password")
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false })
      },

      checkIsAdmin: () => {
        const { user } = get()
        return user?.role === "admin"
      },
    }),
    {
      name: "auth-storage",
    },
  ),
)

