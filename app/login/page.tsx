"use client"

import { LoginForm } from "@/components/auth/login-form"
import { Shield } from "lucide-react"
import Link from "next/link"
import { useAuthContext } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function LoginPage() {
  const { isAuthenticated, isAdmin } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        router.push("/admin")
      } else {
        router.push("/dashboard")
      }
    }
  }, [isAuthenticated, isAdmin, router])

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center gap-2">
        <Shield className="h-6 w-6" />
        <span className="font-bold">Home</span>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Shield className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">Sign in to your account</h1>
          <p className="text-sm text-muted-foreground">Enter your credentials below to access your account</p>
        </div>
        <LoginForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/register" className="underline underline-offset-4 hover:text-primary">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}

