"use client";

import { useTransition } from "react";
import { useCartStore } from "@/lib/store";
import { processSale } from "@/actions/process-sale-action";
import { toast } from "sonner";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { Button } from "@/components/ui/button";

interface ConfirmSaleModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	total: number;
	itemCount: number;
}

export function ConfirmSaleModal({
	open,
	onOpenChange,
	total,
	itemCount,
}: ConfirmSaleModalProps) {
	const [isPending, startTransition] = useTransition();
	const cartContent = useCartStore((state) => state.cartContent);
	const selectedClient = useCartStore((state) => state.selectedClient);
	const appliedCoupon = useCartStore((state) => state.appliedCoupon);
	const clearCart = useCartStore((state) => state.clearCart);

	const handleConfirm = () => {
		startTransition(async () => {
			const payload = {
				clientId: selectedClient?.id || null,
				couponId: appliedCoupon?.id || null,
				details: cartContent.map((item) => ({
					productId: item.id,
					quantity: item.quantity,
				})),
			};

			const result = await processSale(payload);

			if (result.errors.length > 0) {
				// Mostrar errores
				result.errors.forEach((error) => {
					toast.error(error);
				});
			} else {
				// Éxito
				toast.success(result.success);
				clearCart();
				onOpenChange(false);
			}
		});
	};


	if (!open) return null;

	return (
		<ConfirmDialog
			isOpen={open}
			onClose={() => onOpenChange(false)}
			title="Confirmar Venta"
			description="Estas a punto de procesar una venta. Por favor, confirma que deseas continuar."
			isPending={isPending}
		>
			<Button
				onClick={handleConfirm}
				disabled={isPending}
				className="bg-green-600 hover:bg-green-700 min-w-[120px]"
			>
				{isPending ? "Cargando..." : "Confirmar Venta"}
			</Button>
		</ConfirmDialog>
	);
}
