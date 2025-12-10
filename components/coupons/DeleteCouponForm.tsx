import { useActionState, useEffect } from "react";
import { Button } from "../ui/button";
import { deleteCoupon } from "@/actions/delete-coupon-action";

export default function DeleteCouponForm({ couponId, onSuccess }: { couponId: number; onSuccess?: () => void }) {
	const [state, dispatch] = useActionState(deleteCoupon, {
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
			<input type="hidden" name="couponId" value={couponId} />
			<Button type="submit" variant="destructive">
				Eliminar Cupón
			</Button>
		</form>
	);
}
