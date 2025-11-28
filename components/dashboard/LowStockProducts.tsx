import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { LowStockProduct } from "@/lib/dashboard"

interface DataTablesProps {
  lowStockProducts: LowStockProduct[];
}

export function LowStockProducts({ lowStockProducts }: DataTablesProps) {

  return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Productos con Bajo Stock</h3>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium text-gray-600">Producto</th>
                  <th className="text-left py-2 font-medium text-gray-600">Stock</th>
                  <th className="text-left py-2 font-medium text-gray-600">Estado</th>
                </tr>
              </thead>
              <tbody>
                {lowStockProducts.length > 0 ? (
                  lowStockProducts.slice(0, 5).map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="py-3 text-gray-900">{product.name}</td>
                      <td className="py-3 text-gray-900">{product.stock}</td>
                      <td className="py-3">
                        <Badge
                          variant="outline"
                          className={product.stock === 0 
                            ? "border-red-500 text-red-700" 
                            : "border-yellow-500 text-yellow-700"
                          }
                        >
                          {product.stock === 0 ? "Sin stock" : "Bajo"}
                        </Badge>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-gray-500">
                      No hay productos con stock bajo
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
  )
}
