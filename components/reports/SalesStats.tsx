"use client";

import type { SalesHistoryStats } from "@/lib/schemas/sales";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, ShoppingCart, DollarSign } from "lucide-react";
import TopProductsCard from "@/components/dashboard/TopProductsCard";

interface SalesStatsProps {
	stats: SalesHistoryStats;
	periodType: "daily" | "weekly" | "monthly";
}

export default function SalesStats({ stats, periodType }: SalesStatsProps) {
	const periodLabel = {
		daily: "del Día",
		weekly: "de la Semana",
		monthly: "del Mes",
	}[periodType];

	return (
		<div className="space-y-6">
			{/* Cards de resumen */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="bg-white rounded-md shadow p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">
								Ventas {periodLabel}
							</p>
							<p className="text-2xl font-bold text-gray-900 mt-2">
								{formatCurrency(+stats.totalSales)}
							</p>
						</div>
						<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
							<DollarSign className="w-6 h-6 text-green-600" />
						</div>
					</div>
					<div className="mt-2 flex items-center text-green-600">
						<TrendingUp className="w-4 h-4 mr-1" />
						<span className="text-sm">Total vendido</span>
					</div>
				</div>

				<div className="bg-white rounded-md shadow p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600">
								Transacciones {periodLabel}
							</p>
							<p className="text-2xl font-bold text-gray-900 mt-2">
								{stats.transactionCount}
							</p>
						</div>
						<div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
							<ShoppingCart className="w-6 h-6 text-purple-600" />
						</div>
					</div>
					<div className="mt-2 text-sm text-gray-500">
						Total de ventas
					</div>
				</div>

				
				<TopProductsCard products={stats.topProducts} />
			</div>
		</div>
	);
}
