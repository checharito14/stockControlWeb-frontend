import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

type MetricCardsProps = {
  title: string;
  value: string | number;
  trend: string;
  trendUp?: boolean;
  icon: React.ReactNode;
  iconBgColor?: string;
}

export function MetricsCards({
  title, 
  value, 
  trend, 
  trendUp = true, 
  icon, 
  iconBgColor = "bg-blue-500"
}: MetricCardsProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-gray-600 font-medium">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <div className="flex items-center space-x-1 text-sm">
              {trendUp ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={trendUp ? "text-green-500 font-medium" : "text-red-500 font-medium"}>
                {trend}
              </span>
              <span className="text-gray-500">desde ayer</span>
            </div>
          </div>
          <div className={`w-12 h-12 rounded-full ${iconBgColor} flex items-center justify-center text-white`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
