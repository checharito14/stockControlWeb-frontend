import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

export function MetricsCards() {
  const metrics = [
    {
      color: "bg-blue-100",
      iconColor: "text-blue-600",
      trend: "up",
    },
    {
      color: "bg-green-100",
      iconColor: "text-green-600",
      trend: "up",
    },
    {
      color: "bg-cyan-100",
      iconColor: "text-cyan-600",
      trend: "up",
    },
    {
      color: "bg-pink-100",
      iconColor: "text-pink-600",
      trend: "down",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-gray-600"></p>
                <p className="text-2xl font-bold"></p>
                <div className="flex items-center space-x-1 text-sm">
                  {metric.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={metric.trend === "up" ? "text-green-500" : "text-red-500"}></span>
                  <span className="text-gray-500"></span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-lg ${metric.color} flex items-center justify-center`}>
                <div className={`w-6 h-6 ${metric.iconColor}`}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
