"use client";

import type { SalesHistoryStats } from "@/lib/schemas/sales";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, ShoppingCart, DollarSign } from "lucide-react";

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

				{/* Top Productos Más Vendidos */}
				<div className="bg-white rounded-md shadow p-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium text-gray-600 mb-3">
                            Productos más vendidos
                        </h3>
                        <span className="text-xs text-gray-500">Cantidad</span>
                    </div>
					<div className="space-y-2 max-h-32 overflow-y-auto">
						{stats.topProducts.map((product, index) => (
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
									<span className="text-gray-600">
										{product.quantity}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
