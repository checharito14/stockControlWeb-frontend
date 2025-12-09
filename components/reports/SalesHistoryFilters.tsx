'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Calendar } from "lucide-react";
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import { es } from "date-fns/locale";

interface SalesHistoryFiltersProps {
  currentPeriod: 'daily' | 'weekly' | 'monthly';
  dateRange?: { from: string; to: string };
}

export default function SalesHistoryFilters({ currentPeriod, dateRange }: SalesHistoryFiltersProps) {
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const [dateFrom, setDateFrom] = useState(searchParams.get('dateFrom') || '');
  const [dateTo, setDateTo] = useState(searchParams.get('dateTo') || '');

  const handlePeriodChange = (period: 'daily' | 'weekly' | 'monthly') => {
    const params = new URLSearchParams();
    params.set('period', period);
    router.push(`/dashboard/reports?${params.toString()}`);
  };

  const handleApplyFilter = () => {
    const params = new URLSearchParams();
    if (dateFrom) params.set('dateFrom', dateFrom);
    if (dateTo) params.set('dateTo', dateTo);
    router.push(`/dashboard/reports?${params.toString()}`);
  };

  const handleClearFilter = () => {
    setDateFrom('');
    setDateTo('');
    router.push('/dashboard/reports?period=daily');
  };

  // Generar el texto del rango de fechas actual
  const getDateRangeText = () => {
    if (!dateRange) return null;

    const from = new Date(dateRange.from);
    const to = new Date(dateRange.to);

    return `${format(from, "dd 'de' MMMM", { locale: es })} - ${format(to, "dd 'de' MMMM 'de' yyyy", { locale: es })}`;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-end">
        {/* Botones de periodo */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Periodo
            
          </label>
          {/* Mostrar rango de fechas actual */}
          {dateRange && (
            <p className="mt-2 text-xs text-gray-600 flex items-center my-3">
              <Calendar className="w-4 h-4 mr-1" />
              {getDateRangeText()}
            </p>
          )}
          <div className="flex space-x-2">
            <button
              onClick={() => handlePeriodChange('daily')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPeriod === 'daily'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Diario
            </button>
            <button
              onClick={() => handlePeriodChange('weekly')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPeriod === 'weekly'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Semanal
            </button>
            <button
              onClick={() => handlePeriodChange('monthly')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPeriod === 'monthly'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Mensual
            </button>
          </div>
          
        </div>

        {/* Selector de fechas */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Desde
          </label>
          <div className="relative">
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hasta
          </label>
          <div className="relative">
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex space-x-2">
          <button
            onClick={handleApplyFilter}
            disabled={!dateFrom || !dateTo}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Aplicar Filtro
          </button>
          <button
            onClick={handleClearFilter}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
}
