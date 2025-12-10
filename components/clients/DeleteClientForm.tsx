import { deleteClient } from "@/actions/delete-client-action";
import { Button } from "../ui/button";
import { useActionState, useEffect } from "react";

export default function DeleteClientForm({ clientId, onSuccess }: { clientId: number; onSuccess?: () => void }) {
	const [state, dispatch] = useActionState(deleteClient, {
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
			<input type="hidden" name="clientId" value={clientId} />
			<Button type="submit" variant="destructive">
				Eliminar Cliente
			</Button>
		</form>
	);
}
