import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardStats({ stats }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.status}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.status.charAt(0).toUpperCase() + stat.status.slice(1).toLowerCase()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat._count._all}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

