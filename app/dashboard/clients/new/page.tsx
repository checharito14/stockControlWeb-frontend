import AddClientForm from "@/components/clients/AddClientForm";
import ClientForm from "@/components/clients/ClientForm";
import React from "react";

export default function AddClientPage() {
	return (
		<div className="max-w-3xl mx-auto">
			<h1 className="text-3xl font-bold mb-4 md:mb-8">
				Clientes
			</h1>

            <AddClientForm>
                <ClientForm />
            </AddClientForm>
		</div>
	);
}
