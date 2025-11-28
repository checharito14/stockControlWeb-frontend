import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import type { DailyActivity } from "@/lib/dashboard"

interface ActivityChartProps {
  data: DailyActivity[];
}

export function ActivityChart({ data }: ActivityChartProps) {
  // Encontrar el valor máximo para normalizar las alturas
  const maxTotal = Math.max(...data.map(d => parseFloat(d.total)), 1);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-lg font-semibold">Actividad de Ventas - Últimos 30 Días</h3>
        <Button variant="ghost" size="sm">
          <ChevronDown className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-64 bg-gray-50 rounded-lg flex items-end justify-center p-4">
          <div className="flex items-end space-x-1 h-full w-full">
            {data.map((day, index) => {
              const height = (parseFloat(day.total) / maxTotal) * 100;
              return (
                <div
                  key={day.date}
                  className="bg-blue-500 rounded-t flex-1 hover:bg-blue-600 transition-colors cursor-pointer"
                  style={{
                    height: `${Math.max(height, 2)}%`,
                    minHeight: "8px",
                  }}
                  title={`${day.date}: $${day.total} (${day.count} ventas)`}
                ></div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
