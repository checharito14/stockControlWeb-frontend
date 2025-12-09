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
	X,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useUiStore } from "@/lib/ui-store";

export function Sidebar() {
	const [inventoryOpen, setInventoryOpen] = useState(false);
	const pathname = usePathname();
	const router = useRouter();
	const sidebarRef = useRef<HTMLDivElement>(null);
	
	const { isExpanded, isMobileOpen, closeMobileMenu } = useUiStore();

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

	const isActive = (href: string) => {
		if (href === "/dashboard") {
			return pathname === "/dashboard";
		}
		return pathname.startsWith(href);
	};

	const isInventoryItemActive = () => {
		return inventoryItems.some((item) => isActive(item.href));
	};

	useEffect(() => {
		if (isInventoryItemActive()) {
			setInventoryOpen(true);
		}
	}, [pathname]);

	// Cerrar sidebar en móvil al hacer clic fuera
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isMobileOpen &&
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				closeMobileMenu();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isMobileOpen, closeMobileMenu]);

	const handleNavigation = (href: string) => {
		router.push(href);
		// Cerrar sidebar en móvil después de navegar
		if (isMobileOpen) {
			closeMobileMenu();
		}
	};

	return (
		<>
			{/* Overlay para móvil */}
			{isMobileOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-40 md:hidden"
					onClick={closeMobileMenu}
				/>
			)}

			{/* Sidebar */}
			<div
				ref={sidebarRef}
				className={`
					fixed md:relative h-screen bg-white border-r border-gray-200 flex flex-col z-50
					transition-all duration-300 ease-in-out
					${isExpanded ? 'w-64' : 'w-20'}
					${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
				`}
			>
				{/* Header con logo y botón cerrar (móvil) */}
				<div className="p-4 border-b border-gray-200 flex items-center justify-between md:justify-center">
					{isExpanded && ( 
						<Image
							src="/stockControlLogo.webp"
							alt="Logo"
							width={120}
							height={40}
							className="object-contain"
						/>
					)}
					{!isExpanded && (
						<Image
							src="/logo.png"
							alt="Logo"
							width={180}
							height={40}
							className="object-contain"
						/>
					)}
					
					{/* Botón cerrar para móvil */}
					<Button
						variant="ghost"
						size="icon"
						className="md:hidden"
						onClick={closeMobileMenu}
					>
						<X className="w-5 h-5" />
					</Button>
				</div>

				<nav className="flex-1 p-4 space-y-2 overflow-y-auto flex flex-col">
					{menuItems.map((item, index) => (
						<Button
							key={index}
							variant={isActive(item.href) ? "secondary" : "ghost"}
							className={`w-full ${isExpanded ? 'justify-start' : 'justify-center'}`}
							size={isExpanded ? "lg" : "icon"}
							onClick={() => handleNavigation(item.href)}
							title={!isExpanded ? item.label : undefined}
						>
							<item.icon className={`w-5 h-5 ${isExpanded ? 'mr-3' : ''}`} />
							{isExpanded && <span>{item.label}</span>}
						</Button>
					))}
					<div className={`pt-5 ${!isExpanded ? 'flex flex-col space-y-2' : ''}`}>
						{isExpanded ? (
							<>
								<Button
									variant={isInventoryItemActive() ? "secondary" : "ghost"}
									className="w-full justify-start"
									onClick={() => setInventoryOpen(!inventoryOpen)}
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
										inventoryOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
									}`}
								>
									{inventoryItems.map((item, index) => (
										<Button
											key={index}
											variant={isActive(item.href) ? "secondary" : "ghost"}
											size="sm"
											className="w-full justify-start mb-3"
											onClick={() => handleNavigation(item.href)}
										>
											<item.icon className="w-4 h-4 mr-3" />
											{item.label}
										</Button>
									))}
								</div>
							</>
						) : (
							<>
								{inventoryItems.map((item, index) => (
									<Button
										key={index}
										variant={isActive(item.href) ? "secondary" : "ghost"}
										size="icon"
										className="w-full justify-center"
										onClick={() => handleNavigation(item.href)}
										title={item.label}
									>
										<item.icon className="w-5 h-5" />
									</Button>
								))}
							</>
						)}
					</div>
				</nav>
			</div>
		</>
	);
}
