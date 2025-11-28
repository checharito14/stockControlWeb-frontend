"use client";

import { Button } from "@/components/ui/button";
import {
	LayoutDashboard,
	Package,
	Users,
	ChevronDown,
	ChevronRight,
	ShoppingCart,
	Boxes,
	ChartLine,
	Tag,
} from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export function Sidebar() {
	const [inventoryOpen, setInventoryOpen] = useState(false);
	const pathname = usePathname();
	const router = useRouter();

	const menuItems = [
		{ icon: LayoutDashboard, label: "Tablero", href: "/dashboard" },
		{ icon: ShoppingCart, label: "Ventas", href: "/dashboard/sales" },
		{ icon: Boxes, label: "Productos", href: "/dashboard/products" },
	];

	const inventoryItems = [
		{
			icon: ChartLine,
			label: "Informes",
			href: "/dashboard/reports",
		},
		{
			icon: Tag,
			label: "Promociones",
			href: "/dashboard/coupons",
		},
		{
			icon: Users,
			label: "Clientes",
			href: "/dashboard/clients",
		},
	];

	// Función para verificar si una ruta está activa
	const isActive = (href: string) => {
		if (href === "/dashboard") {
			return pathname === "/dashboard";
		}
		return pathname.startsWith(href);
	};

	// Función para verificar si algún item del inventory está activo
	const isInventoryItemActive = () => {
		return inventoryItems.some((item) => isActive(item.href));
	};

	useEffect(() => {
		if (isInventoryItemActive()) {
			setInventoryOpen(true);
		}
	}, [pathname]);

	const handleNavigation = (href: string) => {
		router.push(href);
	};

	return (
		<div className="w-64 bg-white border-r border-gray-200 flex flex-col">
			{/* Logo */}
			<div className="p-4 border-b border-gray-200 flex items-center justify-center ">
				<Image
					src="/stockControlLogo.webp"
					alt="Logo"
					width={120}
					height={40}
					className="object-contain"
				/>
			</div>

			<nav className="flex-1 p-4 space-y-2">
				{menuItems.map((item, index) => (
					<Button
						key={index}
						variant={isActive(item.href) ? "secondary" : "ghost"}
						className="w-full justify-start"
						size={"lg"}
						onClick={() => handleNavigation(item.href)}
					>
						<item.icon className="w-4 h-4 mr-1" />
						{item.label}
					</Button>
				))}

				<div className="pt-5">
					<Button
						variant={
							isInventoryItemActive() ? "secondary" : "ghost"
						}
						className="w-full justify-start"
						onClick={() => {
							setInventoryOpen(!inventoryOpen);
						}}
					>
						<Package className="w-4 h-4 mr-3" />
						<span className="flex-1 text-left">Gestión</span>
						{inventoryOpen ? (
							<ChevronDown className="w-4 h-4" />
						) : (
							<ChevronRight className="w-4 h-4" />
						)}
					</Button>

					<div
						className={`ml-6 mt-2 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
							inventoryOpen
								? "max-h-40 opacity-100"
								: "max-h-0 opacity-0"
						}`}
					>
						{inventoryItems.map((item, index) => (
							<Button
								key={index}
								variant={
									isActive(item.href) ? "secondary" : "ghost"
								}
								size="sm"
								className="w-full justify-start mb-3"
								onClick={() => handleNavigation(item.href)}
							>
								<item.icon className="w-4 h-4 mr-3" />
								{item.label}
							</Button>
						))}
					</div>
				</div>
			</nav>
		</div>
	);
}
