"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useActionState, useEffect } from "react";
import { addCoupon } from "@/actions/add-coupon-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import CouponForm from "./CouponForm";

export default function AddCouponForm() {
	const router = useRouter();

	const [state, dispatch] = useActionState(addCoupon, {
		success: "",
		errors: [],
	});

	useEffect(() => {
		if (state.errors) {
			state.errors.forEach((error) => toast.error(error));
		}
		if (state.success) {
			toast.success(state.success);
			router.push("/dashboard/coupon");
		}
	}, [state]);

	return (
		<div className="bg-surface p-6 rounded-md shadow-md">
			<div className="flex items-center justify-between mb-6">
				<div>
					<h2 className="text-2xl font-bold mb-4">Añadir Cupón</h2>
					<p className="text-text-secondary">
						Introduce los detalles del nuevo cupón de descuento.
					</p>
				</div>

				<Link href="/dashboard/coupons">
					<Button variant="base" className="text-sm">
						Volver
					</Button>
				</Link>
			</div>
			<form className="space-y-4 p-2" action={dispatch}>
				<CouponForm />
				<div className="flex justify-end">
					<Button variant={"base"} type="submit">
						Guardar Cupón
					</Button>
				</div>
			</form>
		</div>
	);
}
