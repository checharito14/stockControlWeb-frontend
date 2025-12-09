"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store";
import { Client } from "@/lib/schemas/clients";
import { Coupon } from "@/lib/schemas/coupons";
import { CartItem } from "./CartItem";
import { ClientSelector } from "./ClientSelector";
import { CouponSelector } from "./CouponSelector";
import { CartSummary } from "./CartSummary";
import { ConfirmSaleModal } from "./ConfirmSaleModal";

interface ShoppingCartProps {
	clients: Client[];
	coupons: Coupon[];
}

export default function ShoppingCart({ clients, coupons }: ShoppingCartProps) {
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	
	const cartContent = useCartStore((state) => state.cartContent);
	const appliedCoupon = useCartStore((state) => state.appliedCoupon);
	const getSubtotal = useCartStore((state) => state.getSubtotal);
	const getDiscount = useCartStore((state) => state.getDiscount);
	const getTotal = useCartStore((state) => state.getTotal);

	const subtotal = getSubtotal();
	const discount = getDiscount();
	const total = getTotal();
	const itemCount = cartContent.reduce((acc, item) => acc + item.quantity, 0);
	const isEmpty = cartContent.length === 0;

	return (
		<div className="w-full lg:w-96 lg:max-w-md bg-white rounded-lg shadow p-4 md:p-6 flex flex-col lg:sticky lg:top-4 lg:self-start">
			<h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
				CARRITO DE COMPRAS
			</h2>

			{/* Lista de artículos */}
			<div className="flex-grow space-y-3 md:space-y-4 overflow-y-auto pr-2 mb-4 max-h-[300px] lg:max-h-[400px]">
				{isEmpty ? (
					<p className="text-gray-500 text-center py-4 text-sm md:text-base">
						El carrito está vacío.
					</p>
				) : (
					cartContent.map((item) => (
						<CartItem key={item.id} item={item} />
					))
				)}
			</div>

			{/* Cliente y Cupón */}
			<div className="mb-2 pt-3 md:pt-4 border-gray-200 space-y-2 md:space-y-3">
				<ClientSelector clients={clients} />
				<CouponSelector coupons={coupons} disabled={isEmpty} />
			</div>

			{/* Resumen y Total */}
			<div className="mt-auto pt-3 md:pt-4">
				<CartSummary
					subtotal={subtotal}
					discount={discount}
					total={total}
					itemCount={itemCount}
					discountPercentage={appliedCoupon?.discountPercentage}
				/>
				
				<button
					onClick={() => setShowConfirmModal(true)}
					disabled={isEmpty}
					className="w-full mt-3 bg-green-600 text-white p-2.5 md:p-3 rounded-lg shadow-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm md:text-base"
				>
					PROCESAR VENTA
				</button>
			</div>

			{/* Modal de Confirmación */}
			<ConfirmSaleModal
				open={showConfirmModal}
				onOpenChange={setShowConfirmModal}
				total={total}
				itemCount={itemCount}
			/>
		</div>
	);
}
