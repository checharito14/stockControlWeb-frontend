"use server";

import { cache } from "react";
import { getAuthToken } from "./api";
import { ClientsResponseSchema } from "./schemas/clients";

export const getClients = cache(async () => {
	const token = await getAuthToken();

	try {
		const response = await fetch(`${process.env.API_URL}/clients`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error(`Error fetching clients: ${response.statusText}`);
		}

		const data = await response.json();

		const result = ClientsResponseSchema.safeParse(data);

		if (!result.success) {
			console.error("Schema validation error:", result.error);
			throw new Error("Invalid client data format");
		}

		return result.data;
	} catch (error) {
		console.error("Error fetching clients:", error);
		throw error;
	}
});
