"use server";

import { getAuthToken } from "@/lib/api";
import { ErrorResponseSchema } from "@/lib/schemas/auth";
import { Client, ClientFormSchema } from "@/lib/schemas/clients";

type ActionStateType = {
	errors: string[];
	success: string;
};

export async function editClient(
	clientId: Client["id"],
	prevState: ActionStateType,
	formData: FormData
) {
	const clients = ClientFormSchema.safeParse({
		name: formData.get("name"),
		lastName: formData.get("lastName"),
		phone: formData.get("phone"),
		email: formData.get("email"),
	});
	
	if (!clients.success) {
		return {
			errors: clients.error.issues.map((error) => error.message),
			success: "",
		};
	}

    const token = await getAuthToken()
	const url = `${process.env.API_URL}/clients/${clientId}`;
    
	const req = await fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		},
		body: JSON.stringify(clients.data),
	});

	const json = await req.json();
	
	if (!req.ok) {
		   const error = ErrorResponseSchema.parse(json)
        const errorMessages = Array.isArray(error.message) ? error.message : [error.message];
        return {
            errors: errorMessages,
            success: ''
        }
	}

	return {
		errors: [],
		success: "Cliente actualizado correctamente",
	};
}