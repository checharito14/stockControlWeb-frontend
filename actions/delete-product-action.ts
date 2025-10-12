"use server";

import { revalidatePath } from "next/cache";

export async function deleteProduct(formData: FormData) {
  const productId = formData.get("productId") as string;
  const url = `${process.env.API_URL}/products/${productId}`;

  const res = await fetch(url, { method: "DELETE" });

  if (!res.ok) {
    throw new Error("Error al eliminar el producto");
  }

  revalidatePath("/dashboard/products");
}