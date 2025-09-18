import { DashboardLayout } from "@/components/dashboard-layout"
import { MetricsCards } from "@/components/metrics-cards"
import { ActivityChart } from "@/components/activity-chart"
import { DataTables } from "@/components/data-tables"

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-6">
        <MetricsCards />
        <ActivityChart />
        <DataTables />
      </div>
    </DashboardLayout>
  )
}
