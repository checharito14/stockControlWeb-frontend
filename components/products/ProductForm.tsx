"use client";

import { FloatingLabelInput } from "@/components/ui/floating-label-input";
import { Product } from "@/lib/schemas/auth";

export default function ProductForm({product}: {product?: Product}) {
	return (
		<>
			<div>
				<FloatingLabelInput id="name" name="name" label="Nombre" defaultValue={product?.name} />
			</div>

			<div className="grid grid-cols-2 gap-3">
				<div className="relative">
					<span className="absolute left-0 top-0 bottom-0 flex items-center pl-3 text-text-secondary pointer-events-none">
						$
					</span>
					<input
						type="number"
						id="price"
						name="price"
						placeholder="0.00"
						className="w-full pl-8 pr-3	 py-2 border border-gray-300 rounded-md focus:outline-none"
						min={0}
						step={0.01}	
						defaultValue={product?.price}
					/>
				</div>
				<FloatingLabelInput
					id="stock"
					name="stock"
					label="Stock"
					type="number"	
					defaultValue={product?.stock}	
				/>
			</div>
		</>
	);
}
