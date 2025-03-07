"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Search, Mail, UserPlus } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { getEnrolledOfficers, sendReminderEmail } from "@/lib/actions/course-actions"

interface EnrolledOfficersProps {
  courseId: string
}

export function EnrolledOfficers({ courseId }: EnrolledOfficersProps) {
  const [officers, setOfficers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sendingEmail, setSendingEmail] = useState<string | null>(null)

  useEffect(() => {
    async function loadOfficers() {
      setIsLoading(true)
      try {
        const data = await getEnrolledOfficers(courseId)
        setOfficers(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load enrolled officers. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadOfficers()
  }, [courseId])

  const filteredOfficers = officers.filter(
    (officer) =>
      officer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      officer.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSendReminder = async (officerId: string) => {
    setSendingEmail(officerId)
    try {
      await sendReminderEmail(courseId, officerId)
      toast({
        title: "Reminder sent",
        description: "Course reminder email has been sent to the officer.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reminder email. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSendingEmail(null)
    }
  }

  // Mock data for demonstration
  const mockOfficers = [
    { id: "off-001", name: "Officer Michael Brown", email: "mbrown@police.gov", progress: 75 },
    { id: "off-002", name: "Officer Jessica Martinez", email: "jmartinez@police.gov", progress: 50 },
    { id: "off-003", name: "Officer David Wilson", email: "dwilson@police.gov", progress: 100 },
    { id: "off-004", name: "Officer Emily Taylor", email: "etaylor@police.gov", progress: 25 },
    { id: "off-005", name: "Officer Robert Johnson", email: "rjohnson@police.gov", progress: 60 },
    { id: "off-006", name: "Officer Sarah Adams", email: "sadams@police.gov", progress: 0 },
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Enrolled Officers</CardTitle>
            <CardDescription>{mockOfficers.length} officers enrolled in this course</CardDescription>
          </div>
          <Button className="mt-4 sm:mt-0">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Officer
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search officers..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Officer Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                        <span className="ml-2">Loading...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : mockOfficers.filter(
                    (officer) =>
                      officer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      officer.email.toLowerCase().includes(searchQuery.toLowerCase()),
                  ).length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No officers found.
                    </TableCell>
                  </TableRow>
                ) : (
                  mockOfficers
                    .filter(
                      (officer) =>
                        officer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        officer.email.toLowerCase().includes(searchQuery.toLowerCase()),
                    )
                    .map((officer) => (
                      <TableRow key={officer.id}>
                        <TableCell className="font-medium">{officer.name}</TableCell>
                        <TableCell>{officer.email}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{officer.progress}% complete</span>
                            </div>
                            <Progress value={officer.progress} />
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSendReminder(officer.id)}
                            disabled={sendingEmail === officer.id}
                          >
                            <Mail className="mr-2 h-4 w-4" />
                            {sendingEmail === officer.id ? "Sending..." : "Send Reminder"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

