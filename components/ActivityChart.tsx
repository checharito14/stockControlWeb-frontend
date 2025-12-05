"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DailyActivity } from "@/lib/schemas/dashboard";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";

export function ActivityChart({ data }: { data: DailyActivity }) {
	const chartData = data.map((day) => ({
		date: new Date(day.date).toLocaleDateString("es-MX", {
			day: "2-digit",
			month: "short",
		}),
		ventas: parseFloat(day.total),
		cantidad: day.count,
	}));

	return (
		<Card>
			<CardHeader>
				<h3 className="text-lg font-semibold">
					Actividad de Ventas - Últimos 30 Días
				</h3>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={300}>
					<AreaChart data={chartData}>
						<defs>
							<linearGradient
								id="colorVentas"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="5%"
									stopColor="#3b82f6"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="#3b82f6"
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
						<XAxis
							dataKey="date"
							tick={{ fontSize: 12 }}
							stroke="#6b7280"
						/>
						<YAxis
							tick={{ fontSize: 12 }}
							stroke="#6b7280"
							tickFormatter={(value) =>
								`$${value.toLocaleString("es-MX")}`
							}
						/>
						<Tooltip
							contentStyle={{
								backgroundColor: "white",
								border: "1px solid #e5e7eb",
								borderRadius: "8px",
								padding: "8px 12px",
							}}
							formatter={(value: number, name: string) => [
								name === "ventas"
									? `$${value.toLocaleString("es-MX", {
											minimumFractionDigits: 2,
									  })}`
									: `${value} transacciones`,
								name === "ventas" ? "Total" : "Ventas",
							]}
							labelStyle={{
								fontWeight: "600",
								marginBottom: "4px",
							}}
						/>
						<Area
							type="monotone"
							dataKey="ventas"
							stroke="#3b82f6"
							strokeWidth={2}
							fillOpacity={1}
							fill="url(#colorVentas)"
						/>
					</AreaChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
