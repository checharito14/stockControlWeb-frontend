import { Product } from "@/lib/schemas/auth";
import ProductCard from "./ProductCard";
import { Button } from "../ui/button";
import { CircleFadingPlus } from "lucide-react";
import Link from "next/link";

export default function ProductsTable({ products }: { products: Product[] }) {
    
	return (
		<>
			<div className="flex items-center space-x-4 w-full md:w-auto mb-8">
				{/* Barra de búsqueda */}
				<div className="relative flex-1">
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400"></div>
					<input
						type="text"
						placeholder="Buscar productos..."
						className="w-full pl-10 pr-4 py-2 border border-border-light rounded-md focus:outline-none"
					/>
				</div>
				{/* Botón "Añadir Producto" */}
                <Link href="/dashboard/products/new">
					<Button variant="base" >
						<CircleFadingPlus />
						<span className="hidden md:inline-block">
							Añadir Producto
						</span>
					</Button>
				</Link>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</>
	);
}
