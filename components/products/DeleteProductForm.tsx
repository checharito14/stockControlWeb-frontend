import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { deleteProduct } from "@/actions/delete-product-action";

export default function DeleteProductForm({
	productId,
}: {
	productId: number;
}) 


{
	return (
		<form action={deleteProduct}>
			<input type="hidden" name="productId" value={productId} />
			<Button
				type="submit"
				variant="destructive">
				Eliminar Producto
			</Button>
		</form>
	);
}
