"use client";

import { Trash2 } from "lucide-react";
import { CartItem as CartItemType, useCartStore } from "@/lib/store";

interface CartItemProps {
	item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
	const updateQuantity = useCartStore((state) => state.updateQuantity);
	const removeFromCart = useCartStore((state) => state.removeFromCart);
	
	const canDecrease = item.quantity > 1;
	const canIncrease = item.quantity < item.stock;

	return (
		<div className="flex items-center justify-between border-b border-gray-200 pb-3">
			<div className="flex-grow">
				<h3 className="font-medium text-gray-800">{item.name}</h3>
				<p className="text-xs text-gray-500">SKU: {item.id}</p>
				<p className="text-xs text-gray-500">
					Precio: ${item.price.toFixed(2)}
				</p>
			</div>
			
			<div className="flex items-center space-x-2">
				<button
					onClick={() => updateQuantity(item.id, item.quantity - 1)}
					disabled={!canDecrease}
					className="px-2 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
					aria-label="Disminuir cantidad"
				>
					-
				</button>
				
				<span className="font-medium text-gray-700 min-w-[2rem] text-center">
					{item.quantity}
				</span>
				
				<button
					onClick={() => updateQuantity(item.id, item.quantity + 1)}
					disabled={!canIncrease}
					className="px-2 py-1 bg-gray-200 rounded-md text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
					aria-label="Aumentar cantidad"
				>
					+
				</button>
				
				<span className="font-semibold text-gray-800 w-20 text-right">
					${(item.price * item.quantity).toFixed(2)}
				</span>
				
				<button
					onClick={() => removeFromCart(item.id)}
					className="text-red-500 hover:text-red-700 p-1"
					title="Eliminar del carrito"
					aria-label="Eliminar del carrito"
				>
					<Trash2 size={18} />
				</button>
			</div>
		</div>
	);
}
