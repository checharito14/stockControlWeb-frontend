"use client";

import { FloatingLabelInput } from "@/components/ui/floating-label-input";

export default function CouponForm() {
	return (
		<>
			<div>
				<FloatingLabelInput 
					id="name" 
					name="name" 
					label="Nombre del cupón" 
				/>
			</div>

			<div className="grid grid-cols-2 gap-3">
				<FloatingLabelInput
					id="expirationDate"
					name="expirationDate"
					label="Fecha de expiración"
					type="date"
				/>
				
				<div className="relative">
					<input
						type="number"
						id="discountPercentage"
						name="discountPercentage"
						placeholder="0"
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
						min={0}
						max={100}
						step={0.01}	
					
					/>
					<span className="absolute right-0 top-0 bottom-0 flex items-center pr-3 text-text-secondary pointer-events-none">
						%
					</span>
				</div>
			</div>
		</>
	);
}
