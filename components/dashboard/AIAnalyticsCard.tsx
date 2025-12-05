import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, AlertCircle, Lightbulb } from "lucide-react"
import { AIInsights } from "@/lib/schemas/dashboard";


export function AIAnalyticsCard({ insights }: AIInsights) {

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white">
              <Brain className="w-5 h-5" />
            </div>
            <CardTitle className="text-xl font-bold">Análisis IA</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        {insights.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <AlertCircle className="w-12 h-12 text-gray-400 mb-3" />
            <p className="text-sm text-gray-500 font-medium">No hay insights disponibles</p>
            <p className="text-xs text-gray-400 mt-1">Los insights se generan diariamente</p>
          </div>
        ) : (
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="p-3 rounded-md border border-gray-200 bg-white shadow-sm"
              > 
                <p className="text-sm text-gray-600 leading-relaxed font-semibold">
                  {insight.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
