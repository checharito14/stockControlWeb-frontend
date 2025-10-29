import { deleteClient } from "@/actions/delete-client-action";
import { Button } from "../ui/button";
import { deleteProduct } from "@/actions/delete-product-action";
import { useActionState } from "react";

export default function DeleteClientForm({ clientId }: { clientId: number }) {
	const [state, dispatch] = useActionState(deleteClient, {
		error: "",
		success: false,
	});

    

	return (
		<form action={dispatch}>
			<input type="hidden" name="clientId" value={clientId} />
			<Button type="submit" variant="destructive">
				Eliminar Cliente
			</Button>
		</form>
	);
}
