import { useActionState, useEffect } from "react";
import { Button } from "../ui/button";
import { deleteProduct } from "@/actions/delete-product-action";

export default function DeleteProductForm({
	productId,
	onSuccess,
}: {
	productId: number;
	onSuccess?: () => void;
}) {
	const [state, dispatch] = useActionState(deleteProduct, {
		error: "",
		success: false,
	});

	useEffect(() => {
		if (state.success && onSuccess) {
			onSuccess();
		}
	}, [state.success, onSuccess]);

	return (
		<form action={dispatch}>
			<input type="hidden" name="productId" value={productId} />
			<Button type="submit" variant="destructive">
				Eliminar Producto
			</Button>
		</form>
	);
}
