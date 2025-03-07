import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const cases = [
  {
    id: "PD-2023-1234",
    type: "Theft",
    location: "123 Main St",
    date: "2023-10-15",
    status: "Open",
    officer: "Officer Smith",
  },
  {
    id: "PD-2023-1235",
    type: "Assault",
    location: "456 Oak Ave",
    date: "2023-10-14",
    status: "In Progress",
    officer: "Officer Johnson",
  },
  {
    id: "PD-2023-1236",
    type: "Vandalism",
    location: "789 Pine Rd",
    date: "2023-10-13",
    status: "Closed",
    officer: "Officer Davis",
  },
  {
    id: "PD-2023-1237",
    type: "Burglary",
    location: "101 Elm St",
    date: "2023-10-12",
    status: "Open",
    officer: "Officer Wilson",
  },
  {
    id: "PD-2023-1238",
    type: "Domestic Dispute",
    location: "202 Maple Dr",
    date: "2023-10-11",
    status: "In Progress",
    officer: "Officer Brown",
  },
]

export function RecentCases() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Cases</CardTitle>
        <CardDescription>Overview of the most recent cases in the system.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Case ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned Officer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cases.map((caseItem) => (
              <TableRow key={caseItem.id}>
                <TableCell className="font-medium">{caseItem.id}</TableCell>
                <TableCell>{caseItem.type}</TableCell>
                <TableCell>{caseItem.location}</TableCell>
                <TableCell>{caseItem.date}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      caseItem.status === "Open"
                        ? "default"
                        : caseItem.status === "In Progress"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {caseItem.status}
                  </Badge>
                </TableCell>
                <TableCell>{caseItem.officer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

