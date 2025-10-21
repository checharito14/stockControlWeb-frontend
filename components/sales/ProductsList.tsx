"use client";

import { useCartStore } from "@/lib/store";
import { Product } from "@/lib/schemas/products";
import { CirclePlus, Search } from "lucide-react";
import { useState } from "react";

interface ProductsListProps {
	products: Product[];
}

export default function ProductsList({ products }: ProductsListProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const addToCart = useCartStore((state) => state.addToCart);

	const filteredProducts = products.filter(product =>
		product.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<>
			{/* Barra de búsqueda */}
			<div className="flex items-center space-x-2 mb-6">
				<div className="relative flex-grow">
					<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
						<Search size={20} />
					</span>
					<input
						type="text"
						placeholder="Buscar Producto..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
			</div>

			{/* Listado de Productos Disponibles */}
			<div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
				<h2 className="text-lg font-semibold text-gray-700">
					Buscador de Productos
				</h2>
				{filteredProducts.length === 0 ? (
					<p className="text-gray-500">
						{searchTerm ? "No se encontraron productos que coincidan con la búsqueda." : "No se encontraron productos."}
					</p>
				) : (
					filteredProducts.map((product) => (
						<div
							key={product.id}
							className="flex items-center bg-gray-50 p-3 rounded-lg border border-gray-200"
						>
							<div className="flex-grow">
								<h3 className="font-medium text-gray-800">
									{product.name}
								</h3>
							</div>
							<span className="font-semibold text-gray-700 mr-4">
								${product.price.toFixed(2)}
							</span>
							<button
								onClick={() => addToCart(product)}
								className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm flex items-center hover:bg-blue-700 transition-colors"
							>
								<CirclePlus className="mr-2" /> Agregar
							</button>
						</div>
					))
				)}
			</div>
		</>
	);
}
