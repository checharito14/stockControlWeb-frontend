import { getSalesHistory } from "@/lib/sales";
import SalesStats from "@/components/reports/SalesStats";
import SalesHistoryTable from "@/components/reports/SalesHistoryTable";
import SalesHistoryFilters from "@/components/reports/SalesHistoryFilters";

interface PageProps {
  searchParams: Promise<{
    period?: 'daily' | 'weekly' | 'monthly';
    dateFrom?: string;
    dateTo?: string;
  }>;
}

export default async function SalesHistoryPage({ searchParams }: PageProps) {
  const params = await searchParams;
  
  const data = await getSalesHistory({
    period: params.period || 'daily',
    dateFrom: params.dateFrom,
    dateTo: params.dateTo,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Historial de Ventas</h1>
      </div>

      {/* Filtros */}
      <SalesHistoryFilters 
        currentPeriod={params.period || 'daily'} 
        dateRange={{ from: data.period.from, to: data.period.to }}
      />

      {/* Estadísticas */}
      <SalesStats stats={data.stats} periodType={data.period.type} />

      {/* Tabla de ventas */}
      <SalesHistoryTable sales={data.sales} />
    </div>
  );
}
