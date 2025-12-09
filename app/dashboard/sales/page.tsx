import ProductsList from "@/components/sales/ProductsList";
import ShoppingCart from "@/components/sales/ShoppingCart";
import { getProducts } from "@/lib/products";
import { getClients } from "@/lib/clients";
import { getCoupons } from "@/lib/coupons";

export default async function SalesPage() {
	const [products, clients, coupons] = await Promise.all([
		getProducts(),
		getClients(),
		getCoupons(),
	]);

	return (
		<div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-full">
			<div className="flex-grow bg-white rounded-lg shadow p-4 md:p-6">
				<h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
					Nueva Venta
				</h1>

				<ProductsList products={products} />
			</div>

			<ShoppingCart clients={clients} coupons={coupons} />
		</div>
	);
}
