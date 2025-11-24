import { DashboardHeader } from "@/components/dashboard-header"
import { SubmissionsTable } from "@/components/submissions-table"
import { StatsCards } from "@/components/stats-cards"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="p-6 space-y-6">
        <StatsCards />
        <SubmissionsTable />
      </div>
    </main>
  )
}
