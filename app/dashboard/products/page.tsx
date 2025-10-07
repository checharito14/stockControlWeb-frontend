import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ProductsResponseSchema } from "@/lib/validations/auth";
import { CircleFadingPlus } from "lucide-react";

async function getProducts() {
	const url = `${process.env.API_URL}/products`;
	const req = await fetch(url);
	const json = await req.json();

	const products = ProductsResponseSchema.parse(json);

	return products;
}

export default async function ProductsPage() {
	const products = await getProducts();

	return (
		<>
			<h1 className="text-3xl font-bold mb-4 md:mb-8">
				Gestión de Productos
			</h1>
			{products.length ? (
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
						<Button
							variant="base"
							className="flex items-center space-x-1"
						>
							<CircleFadingPlus />
							<span className="hidden md:inline-block">
								Añadir Producto
							</span>
						</Button>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				</>
			) : (
				<div className="col-span-full flex items-center justify-center min-h-[400px]">
					<Card className="w-full max-w-lg mx-auto">
						<CardHeader className="text-center pb-4">
							<CardTitle className="text-xl my-3">
								Aun no tienes productos
							</CardTitle>
							<CardDescription>
								Agrega tu primer producto para comenzar a
								gestionar tu inventario
							</CardDescription>
						</CardHeader>
						<CardContent className="text-center pt-0">
							<Button
								variant="base"
								size="lg"
								className="flex items-center space-x-2 mx-auto px-6 py-3"
							>
								<CircleFadingPlus className="w-5 h-5" />
								<span>Añadir Producto</span>
							</Button>
						</CardContent>
					</Card>
				</div>
			)}
		</>
	);
}
