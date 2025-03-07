"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useAuth, type User } from "@/lib/auth"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated, login, logout, checkIsAdmin } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const isAdmin = checkIsAdmin()

  // Protect admin routes
  useEffect(() => {
    if (isAuthenticated) {
      // If trying to access admin routes without admin role
      if (pathname.startsWith("/admin") && !isAdmin) {
        router.push("/dashboard")
      }
    } else {
      // If not authenticated and trying to access protected routes
      if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) {
        router.push("/login")
      }
    }
  }, [isAuthenticated, isAdmin, pathname, router])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, logout }}>{children}</AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}

