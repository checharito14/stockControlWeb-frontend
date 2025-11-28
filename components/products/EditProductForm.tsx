"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { editProduct } from "@/actions/edit-product-action";

export default function EditProductForm({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();

	const { id } = useParams<{ id: string }>();

	const editProductWithId = editProduct.bind(null, +id);
	const [state, dispatch] = useActionState(editProductWithId, {
		errors: [],
		success: "",
	});

	useEffect(() => {
		if (state.errors) {
			state.errors.forEach((error) => toast.error(error));
		}
		if (state.success) {
			toast.success(state.success);
			router.push("/dashboard/products");
		}
	}, [state]);

	return (
		<div className="bg-surface p-6 rounded-md shadow-md">
			<div className="flex items-center justify-between mb-6">
				<div>
					<h2 className="text-2xl font-bold mb-4">Editar Producto</h2>
					<p className="text-text-secondary">
						Introduce los detalles del producto.
					</p>
				</div>

				<Link href="/dashboard/products">
					<Button variant="base" className="text-sm">
						Volver
					</Button>
				</Link>
			</div>
			<form className="space-y-4 p-2" action={dispatch}>
				{children}
				<div className="flex justify-end">
					<Button variant={"base"} type="submit">
						Guardar Producto
					</Button>
				</div>
			</form>
		</div>
	);
}
