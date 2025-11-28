import { MetricsCards } from "@/components/dashboard/metrics-cards";
import { ActivityChart } from "@/components/activity-chart";
import { LowStockProducts } from "@/components/dashboard/LowStockProducts";
import { AIAnalyticsCard } from "@/components/dashboard/ai-analytics-card";
import { DollarSign, Package, ShoppingCart, AlertTriangle } from "lucide-react";
import { getDashboardMetrics, getLast30DaysActivity, getLowStockProducts, getTopProducts } from "@/lib/dashboard";
import { getProducts } from "@/lib/products";
import { formatCurrency } from "@/lib/utils";
import TopProductsCard from "@/components/dashboard/TopProductsCard";

export default async function Dashboard() {
  const [dashboardMetrics , activity, lowStockProducts, allProducts, topProducts] = await Promise.all([
    getDashboardMetrics(),
    getLast30DaysActivity(),
    getLowStockProducts(),
    getProducts(),
    getTopProducts('weekly'),
  ]);

  // Calcular total de productos en stock
  const totalStock = allProducts.reduce((sum, product) => sum + product.stock, 0);

  // Calcular porcentaje de cambio (simplificado - comparación con ayer sería ideal)
  const todaySales = parseFloat(dashboardMetrics.today.totalSales);
  const weekAverage = parseFloat(dashboardMetrics.week.totalSales) / 7;
  const salesTrend = weekAverage > 0 
    ? (((todaySales - weekAverage) / weekAverage) * 100).toFixed(1)
    : "0.0";

	return (
		<div className="flex-1 space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        <MetricsCards
          title="Ventas del Día"
          value={`${dashboardMetrics.today.transactionCount}`}
          trend={`${salesTrend}%`}
          trendUp={parseFloat(salesTrend) >= 0}
          icon={<DollarSign className="w-5 h-5" />}
          iconBgColor="bg-blue-500"
        />

        <MetricsCards
          title="Total Productos en Stock"
          value={totalStock.toLocaleString('es-MX')}
          trend={`${allProducts.length} productos`}
          trendUp={true}
          icon={<Package className="w-5 h-5" />}
          iconBgColor="bg-green-500"
        />

        <MetricsCards
          title="Ventas de la Semana"
          value={formatCurrency(+dashboardMetrics.week.totalSales)}
          trend={`${dashboardMetrics.week.transactionCount} transacciones`}
          trendUp={dashboardMetrics.week.transactionCount > 0}
          icon={<ShoppingCart className="w-5 h-5" />}
          iconBgColor="bg-orange-500"
        /> 
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
        <div className="flex flex-col gap-4">
          <ActivityChart data={activity} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LowStockProducts 
              lowStockProducts={lowStockProducts}
            />
            <TopProductsCard 
              products={topProducts}
              title="Productos más Vendidos de la Semana"
            />
          </div>
        </div>
        <AIAnalyticsCard />
      </div>
		</div>
	);
}
