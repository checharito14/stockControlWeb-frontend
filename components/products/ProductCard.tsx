"use client"

import { Card } from "../ui/card";
import { formatCurrency, isAvailable } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/schemas/products";
import ConfirmDialog from "../ui/ConfirmDialog";
import DeleteProductForm from "./DeleteProductForm";

export default function ProductCard({ product }: { product: Product }) {
	
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Card className="p-6">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-lg font-semibold text-gray-800 capitalize">
						{product.name}
					</h3>
					{isAvailable(product.stock) ? (
						<span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
							Disponible
						</span>
					) : (
						<span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
							Agotado
						</span>
					)}
				</div>

				<div className="space-y-2 text-text-secondary text-sm">
					<div className="flex justify-between">
						<span className="font-medium">Precio:</span>
						<span className="font-bold text-lg">
							{formatCurrency(product.price)}
						</span>
					</div>
					<div className="flex justify-between">
						<span className="font-medium">Stock:</span>
						<span
							className={`font-bold text-lg ${
								product.stock < 5
									? "text-red-500"
									: "text-green-600"
							}`}
						>
							{product.stock}
						</span>
					</div>
				</div>
				<div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500 flex items-center justify-end gap-3">
					<Link href={`/dashboard/products/${product.id}/edit`}>
						<button className="text-blue-500 hover:text-blue-700 cursor-pointer">
							Editar
						</button>
					</Link>
					<button
						className="text-red-500 cursor-pointer"
						onClick={() => setIsOpen(true)}
					>
						<Trash2 size={18} />
					</button>
				</div>
			</Card>

			{isOpen && (
				<ConfirmDialog
					isOpen={isOpen}
					onClose={() => setIsOpen(false)}
					title="Confirmar eliminación"
					description="¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer."
				>
					<DeleteProductForm productId={product.id} />
				</ConfirmDialog>
			)}
		</>
	);
}
