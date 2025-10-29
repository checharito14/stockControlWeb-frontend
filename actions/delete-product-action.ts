"use server";

import { getAuthToken } from "@/lib/api";
import { revalidatePath } from "next/cache";


type ActionStateType = {
	error: string;
	success: boolean;
};

export async function deleteProduct(prevState: ActionStateType, formData: FormData) {
  const productId = formData.get("productId") as string;
  const url = `${process.env.API_URL}/products/${productId}`;

  const token = await getAuthToken();

  const res = await fetch(url, {
     method: "DELETE",
     headers: {
      "Authorization": `Bearer ${token}`
     }

  });

 	if (!res.ok) {
		return {
			success: false,
			error: "Error al eliminar el producto",
		};
	}

  revalidatePath("/dashboard/products");

    return {
        success: true,
        error: ""
    };
}