import { getCoupons } from "@/lib/coupons";
import CouponsTable from "@/components/coupons/CouponsTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { CircleFadingPlus } from "lucide-react";

export default async function CouponsPage() {
	const coupons = await getCoupons();

	return (
		<>
			<h1 className="text-3xl font-bold mb-4 md:mb-8">Cupones</h1>

			{!coupons.length ? (
				<div className="col-span-full flex items-center justify-center min-h-[400px]">
					<Card className="w-full max-w-lg mx-auto">
						<CardHeader className="text-center pb-4">
							<CardTitle className="text-xl my-3">
								Aun no tienes cupones
							</CardTitle>
							<CardDescription>
								Agrega tu primer cupón para comenzar a gestionar
								tu inventario
							</CardDescription>
						</CardHeader>
						<CardContent className="text-center pt-0">
							<Link href="/dashboard/coupons/new">
								<Button
									variant="base"
									size="lg"
									className="flex items-center space-x-2 mx-auto px-6 py-3"
								>
									<CircleFadingPlus className="w-5 h-5" />
									<span>Añadir Cupón</span>
								</Button>
							</Link>
						</CardContent>
					</Card>
				</div>
			) : (
				<CouponsTable coupons={coupons} />
			)}
		</>
	);
}
