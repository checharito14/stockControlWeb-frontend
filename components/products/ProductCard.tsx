import { Product } from "@/lib/validations/auth";
import { Card } from "../ui/card";
import { formatCurrency, isAvailable } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { revalidatePath } from "next/cache";

export default function ProductCard({ product }: { product: Product }) {

    const handleDelete = async (productId: number) => {
        "use server"
		const url = `${process.env.API_URL}/products/${productId}`;
        const req = await fetch(url, {
            method: "DELETE",
        });
        await req.json();
        revalidatePath(`/admin/products`);
    }


	return (
		<Card className="p-6">
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-lg font-semibold text-gray-800">
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
					<span className="font-bold text-lg">{formatCurrency(product.price)}</span>
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
                <button className="text-blue-500 hover:text-blue-700 cursor-pointer">
                    Editar
                </button>
                <button className="text-red-500 cursor-pointer" onClick={() => handleDelete(product.id)}>
                    <Trash2 size={18} />
                </button>
            </div>
		</Card>
	);
}
