"use client";

import { Coupon } from "@/lib/schemas/coupons";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { CircleFadingPlus, Trash2 } from "lucide-react";
import { useState } from "react";
import ConfirmDialog from "../ui/ConfirmDialog";
import DeleteCouponForm from "./DeleteCouponForm";
import Link from "next/link";

export default function CouponsTable({ coupons }: { coupons: Coupon[] }) {
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedCouponId, setSelectedCouponId] = useState<number | null>(null);

	const itemsPerPage = 10;

	const isExpired = (dateString: string) => {
		return new Date(dateString) < new Date();
	};

	// --- Lógica de Búsqueda ---
	const filteredCoupons = coupons.filter(
		(coupon) =>
			coupon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			coupon.discountPercentage.toString().includes(searchTerm)
	);

	// --- Lógica de Paginación ---
	const totalPages = Math.ceil(filteredCoupons.length / itemsPerPage);
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentCoupons = filteredCoupons.slice(
		indexOfFirstItem,
		indexOfLastItem
	);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	return (
		<>
			<div className="flex items-center space-x-4 w-full md:w-auto mb-8">
				<div className="relative flex-1">
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400"></div>
					<input
						type="text"
						placeholder="Buscar cupones..."
						value={searchTerm}
						onChange={(e) => {
							setSearchTerm(e.target.value);
							setCurrentPage(1);
						}}
						className="w-full pl-10 pr-4 py-2 border border-border-light rounded-md focus:outline-none"
					/>
				</div>

				<Link href="/dashboard/coupons/new">
					<Button variant="base">
						<CircleFadingPlus />
						<span className="hidden md:inline-block">
							Añadir cupón
						</span>
					</Button>
				</Link>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Nombre
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Descuento
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Fecha de Expiración
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Estado
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Acciones
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{currentCoupons.length === 0 ? (
							<tr>
								<td
									colSpan={5}
									className="px-6 py-4 text-center text-gray-500"
								>
									No se encontraron cupones.
								</td>
							</tr>
						) : (
							currentCoupons.map((coupon) => (
								<tr key={coupon.id}>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{coupon.name}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{coupon.discountPercentage}%
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{formatDate(coupon.expirationDate)}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										{isExpired(coupon.expirationDate) ? (
											<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
												Expirado
											</span>
										) : (
											<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
												Activo
											</span>
										)}
									</td>
									<td className="px-6 py-4 flex items-center justify-center text-sm font-medium space-x-2">
										<button
											className="text-red-500 cursor-pointer"
											onClick={() =>
												setSelectedCouponId(coupon.id)
											}
										>
											<Trash2 size={18} />
										</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			{selectedCouponId && (
				<ConfirmDialog
					isOpen={!!selectedCouponId}
					onClose={() => setSelectedCouponId(null)}
					title="Confirmar eliminación"
					description="¿Estás seguro de que deseas eliminar este cupón? Esta acción no se puede deshacer."
				>
					<DeleteCouponForm couponId={selectedCouponId} onSuccess={() => setSelectedCouponId(null)} />
				</ConfirmDialog>
			)}

			{totalPages > 1 && (
				<nav
					className="flex items-center justify-between px-4 py-3 sm:px-6 mt-4"
					aria-label="Pagination"
				>
					<div className="flex-1 flex justify-between sm:justify-start">
						<button
							onClick={() => paginate(currentPage - 1)}
							disabled={currentPage === 1}
							className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							&laquo; Anterior
						</button>
						<div className="ml-3 flex space-x-1">
							{Array.from(
								{ length: totalPages },
								(_, i) => i + 1
							).map((page) => (
								<button
									key={page}
									onClick={() => paginate(page)}
									className={`px-4 py-2 border text-sm font-medium rounded-md ${
										currentPage === page
											? "bg-blue-600 border-blue-600 text-white"
											: "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
									}`}
								>
									{page}
								</button>
							))}
						</div>
						<button
							onClick={() => paginate(currentPage + 1)}
							disabled={currentPage === totalPages}
							className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Siguiente &raquo;
						</button>
					</div>
				</nav>
			)}
		</>
	);
}
