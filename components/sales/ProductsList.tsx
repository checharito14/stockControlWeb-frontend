"use client";

import { useCartStore } from "@/lib/store";
import { Product } from "@/lib/schemas/products";
import { CirclePlus, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

interface ProductsListProps {
	products: Product[];
}

export default function ProductsList({ products }: ProductsListProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const addToCart = useCartStore((state) => state.addToCart);

	const filteredProducts = products.filter((product) =>
		product.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<>
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
			
			<div className="max-h-[calc(100vh-250px)] lg:max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
				<h2 className="text-base md:text-lg font-semibold text-gray-700 mb-4">
					Buscador de Productos
				</h2>
				{filteredProducts.length === 0 ? (
					<p className="text-gray-500 text-sm md:text-base">
						{searchTerm
							? "No se encontraron productos que coincidan con la búsqueda."
							: "No se encontraron productos."}
					</p>
				) : (
					<div className="grid grid-cols-1 xl:grid-cols-3 gap-3 md:gap-4">
						{filteredProducts.map((product) => (
							<div
							key={product.id} 
							className="flex items-center bg-gray-50 p-3 rounded-md border border-gray-200 hover:border-gray-300 transition-colors"
						>
							<div className="flex-grow space-y-1 min-w-0">
								<h3 className="font-medium text-gray-800 text-sm md:text-base truncate">
									{product.name}
								</h3>

								<p className="text-gray-500 text-xs md:text-sm">
									Stock: {product.stock}
								</p>
							</div>
							<span className="font-semibold text-gray-700 mr-2 md:mr-4 text-sm md:text-base whitespace-nowrap">
								${product.price.toFixed(2)}
							</span>
							<Button
								variant="base"
								size="icon"
								onClick={() => addToCart(product)}
								className="flex items-center shrink-0"
							>
								<CirclePlus className="h-4 w-4 md:h-5 md:w-5" /> 
							</Button>
						</div>
						))}
					</div>
				)}
			</div>
		</>
	);
}
