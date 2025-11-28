"use server"

import { ProductsResponseSchema } from "./schemas/products";
import { getAuthToken } from "./api";
import { cache } from "react";

export const getProducts = cache(async () =>  {
	const token = await getAuthToken();
	const url = `${process.env.API_URL}/products`;
	
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
})
