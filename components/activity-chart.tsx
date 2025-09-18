import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function ActivityChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-lg font-semibold"></h3>
        <Button variant="ghost" size="sm">
          <ChevronDown className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-64 bg-gray-50 rounded-lg flex items-end justify-center p-4">
          {/* Chart placeholder */}
          <div className="flex items-end space-x-2 h-full w-full">
            {Array.from({ length: 20 }).map((_, index) => (
              <div
                key={index}
                className="bg-blue-500 rounded-t flex-1"
                style={{
                  height: `${Math.random() * 80 + 20}%`,
                  minHeight: "8px",
                }}
              ></div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
