interface CartSummaryProps {
	subtotal: number;
	discount: number;
	total: number;
	itemCount: number;
	discountPercentage?: number;
}

export function CartSummary({
	subtotal,
	discount,
	total,
	itemCount,
	discountPercentage,
}: CartSummaryProps) {
	return (
		<div className="space-y-2">
			<div className="flex justify-between text-sm text-gray-600">
				<span>Subtotal:</span>
				<span>${subtotal.toFixed(2)}</span>
			</div>
			
			{discount > 0 && (
				<div className="flex justify-between text-sm text-green-600">
					<span>Descuento ({discountPercentage}%):</span>
					<span>-${discount.toFixed(2)}</span>
				</div>
			)}
			
			<div className="flex justify-between items-center pt-2 border-t border-gray-200">
				<span className="text-xs text-gray-500 uppercase">
					Total a pagar
				</span>
				<span className="text-3xl font-extrabold text-gray-900">
					${total.toFixed(2)}
				</span>
			</div>
			
			<p className="text-xs text-gray-500 text-center">
				{itemCount} artículo(s)
			</p>
		</div>
	);
}
