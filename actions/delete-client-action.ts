"use server";

import { getAuthToken } from "@/lib/api";
import { revalidatePath } from "next/cache";

type ActionStateType = {
	error: string;
	success: boolean;
};


export async function deleteClient(prevState: ActionStateType, formData: FormData) {

	const clientId = formData.get("clientId") as string;
	const url = `${process.env.API_URL}/clients/${clientId}`;

	const token = await getAuthToken();

	const res = await fetch(url, {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!res.ok) {
		return {
			success: false,
			error: "Error al eliminar el cliente",
		};
	}

	revalidatePath("/dashboard/clients");

    return {
        success: true,
        error: ""
    };
}
