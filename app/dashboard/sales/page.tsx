"use client";

import ProductsList from "@/components/sales/ProductsList";
import ShoppingCart from "@/components/sales/ShoppingCart";
import { Search } from "lucide-react";
import { useState } from "react";

export default function SalesPage() {
	const [searchTerm, setSearchTerm] = useState("");

	return (
		<div className="flex space-x-6 h-full">
			<div className="flex-grow bg-white rounded-lg shadow p-6">
				<h1 className="text-2xl font-bold text-gray-800 mb-6">
					Nueva Venta
				</h1>

				<div className="flex items-center space-x-2 mb-6">
					<div className="relative flex-grow">
						<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
							<Search size={20} />
						</span>
						<input
							type="text"
							placeholder="Buscar / Escanear Producto..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
				</div>
				<ProductsList />
			</div>

			<ShoppingCart />
		</div>
	);
}
