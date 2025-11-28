import { useActionState } from "react";
import { Button } from "../ui/button";
import { deleteProduct } from "@/actions/delete-product-action";

export default function DeleteProductForm({
	productId,
}: {
	productId: number;
}) {
	const [state, dispatch] = useActionState(deleteProduct, {
		error: "",
		success: false,
	});

	return (
		<form action={dispatch}>
			<input type="hidden" name="productId" value={productId} />
			<Button type="submit" variant="destructive">
				Eliminar Producto
			</Button>
		</form>
	);
}
