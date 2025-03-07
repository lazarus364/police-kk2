"use client"

import Link from "next/link"
import { Shield, AlertTriangle, FileText, Phone, MapPin, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAuthContext } from "@/components/auth-provider"

export default function HomePage() {
  const { isAuthenticated, isAdmin } = useAuthContext()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="border-b">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            <span className="text-xl font-semibold">Police Portal</span>
          </div>
          <nav className="flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link href={isAdmin ? "/admin" : "/dashboard"} className="text-sm font-medium hover:text-primary">
                  {isAdmin ? "Admin Dashboard" : "Dashboard"}
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // The logout functionality is handled in the dashboard
                    window.location.href = isAdmin ? "/admin" : "/dashboard"
                  }}
                >
                  My Account
                </Button>
              </>
            ) : (
              <>
                <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
                  Dashboard
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container py-20">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Welcome to the Police Incident Reporting System
            </h1>
            <p className="text-xl text-muted-foreground">Report incidents, track cases, and stay informed</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Report Incidents Card */}
            <Card className="relative overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-red-100">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold">Report Incidents</h2>
                <p className="text-muted-foreground">Submit reports for crimes, accidents, or lost property</p>
                <Button className="w-full mt-4" asChild>
                  <Link href={isAuthenticated ? "/dashboard/report-incident" : "/login"}>Get Started</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Track Status Card */}
            <Card className="relative overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-blue-100">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold">Track Status</h2>
                <p className="text-muted-foreground">Monitor the progress of your submitted reports</p>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link href={isAuthenticated ? "/dashboard/my-reports" : "/login"}>View Reports</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Police Information Card */}
            <Card className="relative overflow-hidden">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 rounded-full bg-green-100">
                  <Info className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold">Police Information</h2>
                <p className="text-muted-foreground">Access important police department information</p>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link href="#police-info">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Police Information Section */}
        <section id="police-info" className="bg-muted py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Police Department Information</h2>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Emergency Contacts */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 rounded-full bg-red-100">
                      <Phone className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Emergency Contacts</h3>
                    <div className="space-y-2 w-full">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Emergency:</span>
                        <span className="text-lg">911</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Non-Emergency:</span>
                        <span>(555) 123-4567</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Anonymous Tip Line:</span>
                        <span>(555) 765-4321</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Victim Support:</span>
                        <span>(555) 987-6543</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Police Stations */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 rounded-full bg-blue-100">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Police Stations</h3>
                    <div className="space-y-4 w-full text-left">
                      <div>
                        <p className="font-medium">Main Headquarters</p>
                        <p className="text-sm text-muted-foreground">123 Main Street, Cityville</p>
                        <p className="text-sm text-muted-foreground">Open 24/7</p>
                      </div>
                      <div>
                        <p className="font-medium">North District Station</p>
                        <p className="text-sm text-muted-foreground">456 Oak Avenue, Cityville</p>
                        <p className="text-sm text-muted-foreground">Open 24/7</p>
                      </div>
                      <div>
                        <p className="font-medium">South District Station</p>
                        <p className="text-sm text-muted-foreground">789 Pine Road, Cityville</p>
                        <p className="text-sm text-muted-foreground">Open 24/7</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Services */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 rounded-full bg-green-100">
                      <Info className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Services</h3>
                    <div className="space-y-2 w-full text-left">
                      <div>
                        <p className="font-medium">Background Checks</p>
                        <p className="text-sm text-muted-foreground">Available Mon-Fri, 9am-5pm</p>
                      </div>
                      <div>
                        <p className="font-medium">Fingerprinting</p>
                        <p className="text-sm text-muted-foreground">Available Mon-Fri, 9am-5pm</p>
                      </div>
                      <div>
                        <p className="font-medium">Property & Evidence</p>
                        <p className="text-sm text-muted-foreground">Available Mon-Fri, 9am-5pm</p>
                      </div>
                      <div>
                        <p className="font-medium">Records Requests</p>
                        <p className="text-sm text-muted-foreground">Available Mon-Fri, 9am-5pm</p>
                      </div>
                      <div>
                        <p className="font-medium">Community Outreach</p>
                        <p className="text-sm text-muted-foreground">See calendar for events</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <p className="text-sm text-muted-foreground">© 2025 Police Portal. All rights reserved.</p>
          </div>
          <nav className="flex gap-4">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

