import { ProductsResponseSchema } from "@/lib/validations/auth";
import { CirclePlus, Search } from "lucide-react";

async function getProducts() {
	const url = `${process.env.API_URL}/products`;
	const req = await fetch(url);
	const json = await req.json();

	const products = ProductsResponseSchema.parse(json);

	return products;
}

export default async function ProductsList() {
	const products = await getProducts();

	return (
		<>
			{/* Listado de Productos Disponibles */}
			<div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
				{" "}
				{/* Altura ajustada */}
				<h2 className="text-lg font-semibold text-gray-700">
					Buscador de Productos
				</h2>
				{products.length === 0 ? (
					<p className="text-gray-500">
						No se encontraron productos.
					</p>
				) : (
					products.map((product) => (
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
								// onClick={() => addToCart(product)}
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
