"use server";

import { ErrorResponseSchema, Product, ProductFormSchema } from "@/lib/schemas/auth";

type ActionStateType = {
	errors: string[];
	success: string;
};

export async function editProduct(
	productId: Product["id"],
	prevState: ActionStateType,
	formData: FormData
) {
	const products = ProductFormSchema.safeParse({
		name: formData.get("name"),
		price: formData.get("price"),
		stock: formData.get("stock"),
	});
	if (!products.success) {
		return {
			errors: products.error.issues.map((error) => error.message),
			success: "",
		};
	}

	const url = `${process.env.API_URL}/products/${productId}`;
	const req = await fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(products.data),
	});

	const json = await req.json();
	
	if (!req.ok) {
		const errors = ErrorResponseSchema.parse(json);
		return {
			errors: errors.message.map((error) => error),
			success: "",
		};
	}

	return {
		errors: [],
		success: "Producto actualizado correctamente",
	};
}
