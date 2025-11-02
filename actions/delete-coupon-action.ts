"use server";

import { getAuthToken } from "@/lib/api";
import { revalidatePath } from "next/cache";

type ActionStateType = {
	error: string;
	success: boolean;
};

export async function deleteCoupon(prevState: ActionStateType, formData: FormData) {

	const couponId = formData.get("couponId") as string;
	const url = `${process.env.API_URL}/coupons/${couponId}`;

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
			error: "Error al eliminar el cupón",
		};
	}

	revalidatePath("/dashboard/coupons");

	return {
		success: true,
		error: "",
	};
}
