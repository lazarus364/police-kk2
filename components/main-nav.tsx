import Link from "next/link"
import { Shield } from "lucide-react"

export function MainNav() {
  return (
    <div className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="flex items-center space-x-2">
        <Shield className="h-6 w-6" />
        <span className="font-bold inline-block">PMS</span>
      </Link>
      <nav className="flex items-center space-x-4 lg:space-x-6">
        <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
          Dashboard
        </Link>
        <Link
          href="/officers"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Officers
        </Link>
        <Link href="/cases" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
          Cases
        </Link>
        <Link
          href="/dispatch"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Dispatch
        </Link>
        <Link
          href="/reports"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Reports
        </Link>
      </nav>
    </div>
  )
}

