"use client";

import { Ticket, X } from "lucide-react";
import { Coupon } from "@/lib/schemas/coupons";
import { useCartStore } from "@/lib/store";

interface CouponSelectorProps {
	coupons: Coupon[];
	disabled?: boolean;
}

export function CouponSelector({
	coupons,
	disabled = false,
}: CouponSelectorProps) {
	const appliedCoupon = useCartStore((state) => state.appliedCoupon);
	const applyCoupon = useCartStore((state) => state.applyCoupon);

	const handleCouponChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const coupon = coupons.find((c) => c.id === Number(e.target.value));
		applyCoupon(coupon || null);
	};

	// Filtrar cupones válidos (no expirados)
	const validCoupons = coupons.filter((coupon) => {
		const expirationDate = new Date(coupon.expirationDate);
		const today = new Date();
		return expirationDate >= today;
	});

	if (appliedCoupon) {
		return (
			<div className="flex items-center justify-between text-xs bg-green-50 p-2 rounded border border-green-200">
				<div className="flex items-center gap-2">
					<Ticket size={14} />
					<span className="font-medium text-green-700">
						{appliedCoupon.name} ({appliedCoupon.discountPercentage}
						%)
					</span>
				</div>
				<button
					onClick={() => applyCoupon(null)}
					className="text-red-500 hover:text-red-700"
					title="Quitar cupón"
					aria-label="Quitar cupón"
				>
					<X size={14} />
				</button>
			</div>
		);
	}

	return (
		<div className="relative">
			<div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
				<Ticket size={14} className="text-gray-400" />
			</div>
			<select
				onChange={handleCouponChange}
				className="w-full pl-7 pr-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
				value=""
				disabled={disabled}
				aria-label="Aplicar cupón de descuento"
			>
				<option value="">Aplicar cupón de descuento</option>
				{validCoupons.map((coupon) => (
					<option key={coupon.id} value={coupon.id}>
						{coupon.name} - {coupon.discountPercentage}%
					</option>
				))}
			</select>
		</div>
	);
}
