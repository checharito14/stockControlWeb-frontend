"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { CircleFadingPlus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Client } from "@/lib/schemas/clients";
import { formatDate } from "@/lib/utils";
import ConfirmDialog from "../ui/ConfirmDialog";
import DeleteClientForm from "./DeleteClientForm";

export default function ClientsTable({ clients }: { clients: Client[] }) {
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedClientId, setSelectedClientId] = useState<number | null>(
		null
	);

	const itemsPerPage = 10;

	const [isOpen, setIsOpen] = useState(false);

	// --- Lógica de Búsqueda ---
	const filteredClients = clients.filter(
		(client) =>
			`${client.name} ${client.lastName}`
				.toLowerCase()
				.includes(searchTerm.toLowerCase()) ||
			client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
			client.phone.includes(searchTerm)
	);

	// --- Lógica de Paginación ---
	const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentClients = filteredClients.slice(
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
						placeholder="Buscar clientes..."
						value={searchTerm}
						onChange={(e) => {
							setSearchTerm(e.target.value);
							setCurrentPage(1);
						}}
						className="w-full pl-10 pr-4 py-2 border border-border-light rounded-md focus:outline-none"
					/>
				</div>

				<Link href="/dashboard/clients/new">
					<Button variant="base">
						<CircleFadingPlus />
						<span className="hidden md:inline-block">
							Añadir cliente
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
								Apellido
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Teléfono
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Email
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Fecha de Registro
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
						{currentClients.length === 0 ? (
							<tr>
								<td
									colSpan={6}
									className="px-6 py-4 text-center text-gray-500"
								>
									No se encontraron clientes.
								</td>
							</tr>
						) : (
							currentClients.map((client) => (
								<tr key={client.id}>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
										{client.name}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{client.lastName}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{client.phone}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{client.email}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{formatDate(client.createdAt)}
									</td>
									<td className="px-6 py-4 flex items-center justify-center text-sm font-medium space-x-2">
										<Link
											href={`/dashboard/clients/${client.id}/edit`}
										>
											<button className="text-blue-500 hover:text-blue-700 cursor-pointer">
												Editar
											</button>
										</Link>
										<button
											className="text-red-500 cursor-pointer"
											onClick={() =>
												setSelectedClientId(client.id)
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

			{selectedClientId && (
				<ConfirmDialog
					isOpen={!!selectedClientId}
					onClose={() => setSelectedClientId(null)}
					title="Confirmar eliminación"
					description="¿Estás seguro de que deseas eliminar este cliente? Esta acción no se puede deshacer."
				>
					<DeleteClientForm clientId={selectedClientId} onSuccess={() => setSelectedClientId(null)} />
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
