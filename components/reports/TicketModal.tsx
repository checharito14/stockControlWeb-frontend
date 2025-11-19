"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import { SaleSchema, type Sale } from "@/lib/schemas/sales";
import { Button } from "../ui/button";
import { TicketBody } from "./TicketBody";

type TicketModalProps = {
	isOpen: boolean;
	onClose: () => void;
	saleId: number;
};

export default function TicketModal({
	isOpen,
	onClose,
	saleId,
}: TicketModalProps) {

	const [sale, setSale] = useState<Sale | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!isOpen) {
			setSale(null);
			setError(null);
			setLoading(false);
			return;
		}
		
		const controller = new AbortController();


		async function fetchSale() {
			try {
				setLoading(true);
				const req = await fetch(`/api/sales/${saleId}`, {
					signal: controller.signal,
					cache: "no-store",
				});

				if (!req.ok) {
					throw new Error('Error al cargar la venta');
				}

				const json = await req.json();

				const saleParsed = SaleSchema.parse(json);

				setSale(saleParsed);
				setLoading(false);
				
			} catch (err: any) {
				if (err.name !== "AbortError") {
					setError('Hubo un error al cargar la venta.');
					console.error("Error al cargar la venta", err);
				}
			}
		}

		fetchSale();

		return () => controller.abort();
	}, [isOpen, saleId]);

	if (!isOpen) {
		return null;
	}

	return (
		<>
			<div
				className="fixed inset-0 z-50 flex items-center justify-center p-4"
				tabIndex={-1}
			>
				<div
					className="absolute inset-0 bg-black/50 backdrop-blur-sm"
					onClick={onClose}
					aria-hidden="true"
				/>

				<div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
					<div className="flex items-center justify-center p-6 pb-4 relative">
						<h3 className="text-xl font-semibold text-gray-900 uppercase">
							Ticket de Venta
						</h3>
						<button
							onClick={onClose}
							className="absolute right-6 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md p-1 transition-colors"
							aria-label="Cerrar ticket"
						>
							<X size={20} />
						</button>
					</div>

				{/* Content */}
				<div className="px-6 pb-4">
					{loading && (
						<div className="flex justify-center items-center py-12">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
						</div>
					)}
					{error && (
						<p className="text-red-500 text-center py-6">{error}</p>
					)}
					{sale && <TicketBody sale={sale} />}
				</div>			
					<div className="flex items-center justify-end space-x-3 p-6 pt-4 bg-gray-50 rounded-b-lg">
						<Button
							variant="outline"
							onClick={onClose}
							className="min-w-[80px]"
						>
							Cerrar
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}
