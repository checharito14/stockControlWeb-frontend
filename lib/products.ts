"use server"

import { ProductsResponseSchema } from "./schemas/products";
import { getAuthToken } from "./api";

export async function getProducts() {
	const token = await getAuthToken();
	const url = `${process.env.API_URL || 'http://localhost:3001'}/products`;
	
	const req = await fetch(url, {
		headers: {
			'Authorization': `Bearer ${token}`
		},
	});
	
	const json = await req.json();

	if (!req.ok) {
		console.error('API Error:', json);
		return [];
	}

	const products = ProductsResponseSchema.parse(json);
	return products;
}
