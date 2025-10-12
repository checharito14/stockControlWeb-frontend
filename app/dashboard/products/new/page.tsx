import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import React from "react";

export default function AddProductPage() {
	return (
		<div className="max-w-3xl mx-auto">
			<h1 className="text-3xl font-bold mb-4 md:mb-8">
				Productos
			</h1>

            <AddProductForm>
                <ProductForm />
            </AddProductForm>
		</div>
	);
}
