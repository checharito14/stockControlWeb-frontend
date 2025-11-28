import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./schemas/products";
import { Client } from "./schemas/clients";
import { Coupon } from "./schemas/coupons";

export interface CartItem extends Product {
	quantity: number;
}

interface CartStore {
	cartContent: CartItem[];
	selectedClient: Client | null;
	appliedCoupon: Coupon | null;
	addToCart: (product: Product) => void;
	removeFromCart: (productId: number) => void;
	updateQuantity: (productId: number, quantity: number) => void;
	setClient: (client: Client | null) => void;
	applyCoupon: (coupon: Coupon | null) => void;
	clearCart: () => void;
	getTotal: () => number;
	getSubtotal: () => number;
	getDiscount: () => number;
}

export const useCartStore = create<CartStore>()(
	persist(
		(set, get) => ({
			cartContent: [],
			selectedClient: null,
			appliedCoupon: null,

			addToCart: (product) => {
				const currentCart = get().cartContent;
				const existingItemIndex = currentCart.findIndex((item) => item.id === product.id);

				if (existingItemIndex >= 0) {
					// Si ya existe, incrementar cantidad si hay stock disponible
					const existingItem = currentCart[existingItemIndex];
					if (existingItem.quantity >= existingItem.stock) return;

					const updatedCart = currentCart.map((item) =>
						item.id === product.id
							? { ...item, quantity: item.quantity + 1 }
							: item
					);
					set({ cartContent: updatedCart });
				} else {
					// Si no existe, agregarlo con cantidad 1
					set({
						cartContent: [
							...currentCart,
							{ ...product, quantity: 1 },
						],
					});
				}
			},

			removeFromCart: (productId) => {
				set({
					cartContent: get().cartContent.filter((item) => item.id !== productId),
				});
			},

			updateQuantity: (productId, quantity) => {
				if (quantity <= 0) {
					get().removeFromCart(productId);
					return;
				}

				const updatedCart = get().cartContent.map((item) => {
					if (item.id === productId) {
						// No permitir cantidad mayor al stock
						const newQuantity = Math.min(quantity, item.stock);
						return { ...item, quantity: newQuantity };
					}
					return item;
				});

				set({ cartContent: updatedCart });
			},

			setClient: (client) => {
				set({ selectedClient: client });
			},

			applyCoupon: (coupon) => {
				// Validar si el cupón está expirado
				if (coupon) {
					const expirationDate = new Date(coupon.expirationDate);
					const today = new Date();
					
					if (expirationDate < today) {
						// No aplicar cupón expirado
						return;
					}
				}
				set({ appliedCoupon: coupon });
			},

			clearCart: () => {
				set({ 
					cartContent: [],
					selectedClient: null,
					appliedCoupon: null
				});
			},

			getSubtotal: () => {
				return get().cartContent.reduce(
					(total, item) => total + item.price * item.quantity,
					0
				);
			},

			getDiscount: () => {
				const coupon = get().appliedCoupon;
				if (!coupon) return 0;

				const subtotal = get().getSubtotal();
				return (subtotal * coupon.discountPercentage) / 100;
			},

			getTotal: () => {
				const subtotal = get().getSubtotal();
				const discount = get().getDiscount();
				return subtotal - discount;
			},
		}),
		{
			name: "shopping-cart-storage",
		}
	)
);
