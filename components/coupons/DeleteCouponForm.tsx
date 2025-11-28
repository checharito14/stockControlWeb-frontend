import { useActionState } from "react";
import { Button } from "../ui/button";
import { deleteCoupon } from "@/actions/delete-coupon-action";

export default function DeleteCouponForm({ couponId }: { couponId: number }) {
	const [state, dispatch] = useActionState(deleteCoupon, {
		error: "",
		success: false,
	});

	return (
		<form action={dispatch}>
			<input type="hidden" name="couponId" value={couponId} />
			<Button type="submit" variant="destructive">
				Eliminar Cupón
			</Button>
		</form>
	);
}
