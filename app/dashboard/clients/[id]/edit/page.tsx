import ClientForm from "@/components/clients/ClientForm";
import EditClientForm from "@/components/clients/EditClientForm";
import { getAuthToken } from "@/lib/api";
import { ClientSchema } from "@/lib/schemas/clients";
import { notFound } from "next/navigation";

async function getClientById(id: string) {

    const token = await getAuthToken();
    const url = `${process.env.API_URL}/clients/${id}`;
    const req = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    const json = await req.json();

    if (!req.ok) {
        notFound();
    }

    const client = ClientSchema.parse(json);

    return client;
}

export default async function EditClientPage({ params }: { params: { id: string } }) {

    const {id} = await params;
    const client = await getClientById(id);

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 md:mb-8">Clientes</h1>

            <EditClientForm>
                <ClientForm client={client}/>
            </EditClientForm>
        </div>
    );
}