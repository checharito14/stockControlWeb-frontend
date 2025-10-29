"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useActionState, useEffect } from "react";
import { addClient } from "@/actions/add-client-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AddClientForm({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();

	const [state, dispatch] = useActionState(addClient, {
		errors: [],
		success: "",
	});

	useEffect(() => {
		if (state.errors) {
			state.errors.forEach((error) => toast.error(error));
		}
		if (state.success) {
			toast.success(state.success);
			router.push("/dashboard/clients");
		}
	}, [state]);

	return (
		<div className="bg-surface p-6 rounded-md shadow-md">
			<div className="flex items-center justify-between mb-6">
				<div>
					<h2 className="text-2xl font-bold mb-4">Añadir Cliente</h2>
					<p className="text-text-secondary">
						Introduce los detalles del nuevo cliente.
					</p>
				</div>

				<Link href="/dashboard/clients">
					<Button variant="base" className="text-sm">
						Volver
					</Button>
				</Link>
			</div>
			<form className="space-y-4 p-2" action={dispatch}>
				{children}
				<div className="flex justify-end">
					<Button variant={"base"} type="submit">
						Guardar Cliente
					</Button>
				</div>
			</form>
		</div>
	);
}
