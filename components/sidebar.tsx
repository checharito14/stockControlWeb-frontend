"use client";

import { Button } from "@/components/ui/button";
import {
	LayoutDashboard,
	Package,
	Users,
	ChevronDown,
	ChevronRight,
	ShoppingCart,
	Boxes,
	ChartLine,
	Tag,
} from "lucide-react";
import { useState } from "react";

export function Sidebar() {
	const [inventoryOpen, setInventoryOpen] = useState(false);

	const menuItems = [
		{ icon: LayoutDashboard, label: "Tablero", active: true },
		{ icon: ShoppingCart, label: "Ventas", active: false },
		{ icon: Boxes, label: "Productos", active: false },
	];

	const inventoryItems = [
		{ icon: ChartLine, label: "Informes", active: false },
		{ icon: Tag, label: "Promociones", active: false },
		{ icon: Users, label: "Clientes", active: false },
	];

	return (
		<div className="w-64 bg-white border-r border-gray-200 flex flex-col">
			{/* Logo */}
			<div className="p-4 border-b border-gray-200">
				<div className="flex items-center space-x-2">
					<div className="w-8 h-8 bg-purple-600 rounded"></div>

					<p className="font-bold text-sm">StockControl</p>
				</div>
			</div>

			<nav className="flex-1 p-4 space-y-2">
				{menuItems.map((item, index) => (
					<Button
						key={index}
						variant={item.active ? "secondary" : "ghost"}
						className="w-full justify-start"
						size={"lg"}
					>
						<item.icon className="w-4 h-4 mr-3" />
						{item.label}
					</Button>
				))}

				<div className="pt-4">
					<Button
						variant="ghost"
						className="w-full justify-start text-gray-500"
						onClick={() => {
							setInventoryOpen(!inventoryOpen);
						}}
					>
						<Package className="w-4 h-4 mr-3" />
						<span className="flex-1 text-left">Gestión</span>
						{inventoryOpen ? (
							<ChevronDown className="w-4 h-4" />
						) : (
							<ChevronRight className="w-4 h-4" />
						)}
					</Button>

					<div
						className={`ml-6 mt-2 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
							inventoryOpen
								? "max-h-40 opacity-100"
								: "max-h-0 opacity-0"
						}`}
					>
						{inventoryItems.map((item, index) => (
							<Button
								key={index}
								variant="ghost"
								size="sm"
								className="w-full justify-start text-gray-600"
							>
								<item.icon className="w-4 h-4 mr-3" />
								{item.label}
							</Button>
						))}
					</div>
				</div>
			</nav>
		</div>
	);
}
