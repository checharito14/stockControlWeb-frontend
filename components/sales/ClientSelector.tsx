"use client";

import { User, X } from "lucide-react";
import { Client } from "@/lib/schemas/clients";
import { useCartStore } from "@/lib/store";

interface ClientSelectorProps {
	clients: Client[];
}

export function ClientSelector({ clients }: ClientSelectorProps) {
	const selectedClient = useCartStore((state) => state.selectedClient);
	const setClient = useCartStore((state) => state.setClient);

	const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const client = clients.find((c) => c.id === Number(e.target.value));
		setClient(client || null);
	};

	if (selectedClient) {
		return (
			<div className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded">
				<div className="flex items-center gap-2">
					<User size={14} />
					<span className="font-medium text-gray-700">
						{selectedClient.name} {selectedClient.lastName}
					</span>
				</div>
				<button
					onClick={() => setClient(null)}
					className="text-red-500 hover:text-red-700"
					title="Quitar cliente"
					aria-label="Quitar cliente"
				>
					<X size={14} />
				</button>
			</div>
		);
	}

	return (
		<div className="relative">
			<div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
				<User size={14} />
			</div>
            

			<select
				onChange={handleClientChange}
				className="w-full pl-7 pr-2 py-1.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
				value=""
				aria-label="Seleccionar cliente"
			>
				<option value="">Seleccionar cliente</option>
				{clients.map((client) => (
					<option key={client.id} value={client.id}>
						{client.name} {client.lastName}
					</option>
				))}
			</select>
		</div>
	);
}
