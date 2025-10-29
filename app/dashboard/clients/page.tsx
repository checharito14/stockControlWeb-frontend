import ClientsTable from "@/components/clients/ClientsTable";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getClients } from "@/lib/clients";
import { CircleFadingPlus } from "lucide-react";
import Link from "next/link";

export default async function ClientsPage() {
	const clients = await getClients();

	return (
		<>
			<h1 className="text-3xl font-bold mb-4 md:mb-8">Clientes</h1>
			{!clients.length ? (
				<div className="col-span-full flex items-center justify-center min-h-[400px]">
					<Card className="w-full max-w-lg mx-auto">
						<CardHeader className="text-center pb-4">
							<CardTitle className="text-xl my-3">
								Aun no haz registrado ningun cliente
							</CardTitle>
							<CardDescription>
								Comienza a registrar tus clientes
							</CardDescription>
						</CardHeader>
						<CardContent className="text-center pt-0">
							<Link href="/dashboard/clients/new">
								<Button
									variant="base"
									size="lg"
									className="flex items-center space-x-2 mx-auto px-6 py-3"
								>
									<CircleFadingPlus className="w-5 h-5" />
									<span>Añadir cliente</span>
								</Button>
							</Link>
						</CardContent>
					</Card>
				</div>
			) : (
				<ClientsTable clients={clients} />
			)}
		</>
	);
}
