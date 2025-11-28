import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, AlertCircle, Lightbulb } from "lucide-react"

type AIInsight = {
  type: 'success' | 'warning' | 'info';
  title: string;
  description: string;
  metric?: string;
}

type AIAnalyticsCardProps = {
  insights?: AIInsight[];
}

export function AIAnalyticsCard({ insights }: AIAnalyticsCardProps) {
  // Datos hardcodeados por ahora - serán reemplazados con IA real
  const defaultInsights: AIInsight[] = [
    {
      type: 'success',
      title: 'Tendencia Positiva',
      description: 'Tus ventas han aumentado un 23% en comparación con el mes anterior.',
      metric: '+23%'
    },
    {
      type: 'warning',
      title: 'Stock Bajo Detectado',
      description: '5 productos están por debajo del nivel óptimo de inventario.',
      metric: '5 productos'
    },
    {
      type: 'info',
      title: 'Recomendación de Restock',
      description: 'Considera reabastecer productos populares antes de que se agoten.',
      metric: '3x velocidad'
    },
    {
      type: 'success',
      title: 'Mejor Día de Ventas',
      description: 'Los viernes generan 40% más ingresos.',
      metric: '+40%'
    }
  ];

  const displayInsights = insights || defaultInsights;

  const getInsightIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'success':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'info':
        return <Lightbulb className="w-4 h-4 text-blue-500" />;
    }
  };

  const getBadgeVariant = (type: AIInsight['type']) => {
    switch (type) {
      case 'success':
        return 'default';
      case 'warning':
        return 'destructive';
      case 'info':
        return 'secondary';
    }
  };

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
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            Automático
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-3">
          {displayInsights.map((insight, index) => (
            <div
              key={index}
              className="p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-sm transition-all duration-200 bg-white"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getInsightIcon(insight.type)}
                  <Badge variant={getBadgeVariant(insight.type)} className="text-xs">
                    {insight.type === 'success' && 'Positivo'}
                    {insight.type === 'warning' && 'Alerta'}
                    {insight.type === 'info' && 'Sugerencia'}
                  </Badge>
                </div>
                {insight.metric && (
                  <span className="text-xs font-bold text-purple-600">
                    {insight.metric}
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                {insight.title}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {insight.description}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
