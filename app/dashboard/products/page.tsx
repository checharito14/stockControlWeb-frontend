import ProductsTable from "@/components/products/ProductsTable";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getProducts } from "@/lib/products";
import { CircleFadingPlus } from "lucide-react";
import Link from "next/link";

export default async function ProductsPage() {
	const products = await getProducts();

	return (
		<>
			<h1 className="text-3xl font-bold mb-4 md:mb-8">Productos</h1>

			{!products.length ? (
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
							<Link href="/dashboard/products/new">
								<Button
									variant="base"
									size="lg"
									className="flex items-center space-x-2 mx-auto px-6 py-3"
								>
									<CircleFadingPlus className="w-5 h-5" />
									<span>Añadir Producto</span>
								</Button>
							</Link>
						</CardContent>
					</Card>
				</div>
			) : (
				<ProductsTable products={products} />
			)}
		</>
	);
}
