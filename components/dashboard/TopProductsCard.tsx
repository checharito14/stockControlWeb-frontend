import { Card, CardContent, CardHeader } from "../ui/card";

interface TopProduct {
  name: string;
  quantity: number;
  total: string;
}

interface TopProductsCardProps {
  products: TopProduct[];
  title?: string;
}

export default function TopProductsCard({ 
  products, 
  title = "Productos más Vendidos" 
}: TopProductsCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <span className="text-xs text-gray-500">Cantidad</span>
        </div>
      </CardHeader>
      
      <CardContent>
        {products.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No hay productos vendidos</p>
          </div>
        ) : (
          <div className="space-y-3">
            {products.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-white text-xs flex-shrink-0 ${
                      index === 0
                        ? "bg-yellow-500"
                        : index === 1
                        ? "bg-gray-400"
                        : index === 2
                        ? "bg-orange-600"
                        : "bg-blue-500"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="font-medium text-gray-800 truncate">
                    {product.name}
                  </span>
                </div>
                <div className="flex items-center space-x-3 flex-shrink-0 ml-2">
                  <span className="text-gray-600">{product.quantity}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
