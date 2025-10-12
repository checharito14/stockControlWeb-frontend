import { Product } from "@/lib/validations/auth";
import { Delete } from "lucide-react";
import { useState } from "react";

export default function ShoppingCart() {

    const [cart, setCart] = useState<Product[]>([]);
	return (
		<div className="w-96 bg-white rounded-lg shadow p-6 flex flex-col">
			<h2 className="text-2xl font-bold text-gray-800 mb-6">
				CARRITO DE COMPRAS
			</h2>

			{/* Artículos en el Carrito */}
			<div className="flex-grow space-y-4 max-h-[calc(100vh-450px)] overflow-y-auto pr-2 mb-6">
				{" "}
				{/* Altura ajustada */}
				{cart.length === 0 ? (
					<p className="text-gray-500 text-center py-4">
						El carrito está vacío.
					</p>
				) : (
					cart.map((item) => (
						<div
							key={item.id}
							className="flex items-center justify-between border-b border-gray-200 pb-3"
						>
							<div className="flex items-center flex-grow">
								<div>
									<h3 className="font-medium text-gray-800">
										{item.name}
									</h3>
									<p className="text-xs text-gray-500">
										SKU: {item.id}
									</p>
								</div>
							</div>
							<div className="flex items-center space-x-2">
								<button
									// onClick={() =>
									// 	updateCartItemQuantity(
									// 		item.id,
									// 		item.quantity - 1
									// 	)
									// }
									className="px-2 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
								>
									-
								</button>
								<span className="font-medium text-gray-700">
									{item.name}
								</span>
								<button
									// onClick={() =>
									// 	updateCartItemQuantity(
									// 		item.id,
									// 		item.quantity + 1
									// 	)
									// }
									className="px-2 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300"
								>
									+
								</button>
								<span className="font-semibold text-gray-800 w-16 text-right">
									{/* ${(item.price * item.name).toFixed(2)} */}
								</span>
								<button
									// onClick={() => removeFromCart(item.id)}
									className="text-red-500 hover:text-red-700 p-1"
								>
									<Delete size={18} />
								</button>
							</div>
						</div>
					))
				)}
			</div>

			{/* Información del Cliente y Descuento */}
			{/* <div className="space-y-3 mb-6 pt-4 border-t border-gray-200">
				<div>
					<label
						htmlFor="customer"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Información del Cliente
					</label>
					<input
						type="text"
						id="customer"
						value={customerInfo}
						onChange={(e) => setCustomerInfo(e.target.value)}
						placeholder="Añadir Cliente"
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
				<div>
					<label
						htmlFor="discount"
						className="block text-sm font-medium text-gray-700 mb-1"
					>
						Código de Descuento
					</label>
					<input
						type="text"
						id="discount"
						value={discountCode}
						onChange={(e) => setDiscountCode(e.target.value)}
						placeholder="Aplicar código"
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
			</div> */}

			{/* Total a Pagar y Botones de Pago */}
			{/* <div className="mt-auto pt-6 border-t border-gray-200">
				<div className="flex justify-between items-end mb-4">
					<div>
						<p className="text-sm text-gray-600">
							Subtotal: ${subtotal.toFixed(2)}
						</p>
						<p className="text-sm text-red-500">
							Descuento: -${discountAmount.toFixed(2)}
						</p>
					</div>
					<div className="text-right">
						<p className="text-xs text-gray-500 uppercase">
							Total a pagar
						</p>
						<p className="text-4xl font-extrabold text-gray-900">
							${totalToPay.toFixed(2)}
						</p>
					</div>
				</div>
				<div className="grid grid-cols-3 gap-2">
					<button
						onClick={() => handlePayment("Card")}
						className="col-span-2 bg-blue-600 text-white p-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
					>
						<Search size={20} />
						<span>PAGAR CON TARJETA</span>
					</button>
				</div> */}
			{/* </div> */}
		</div>
	);
}
