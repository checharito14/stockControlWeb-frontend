"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	ChevronDown,
	User as UserIcon,
	UserCircle,
	LogOut,
} from "lucide-react";
import { redirect } from "next/navigation";
import { logout } from "@/actions/logout-action";
import Link from "next/link";
import { User } from "@/lib/schemas/auth";

export function Header({ user }: { user: User }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node)
			) {
				setIsMenuOpen(false);
			}
		};

		if (isMenuOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isMenuOpen]);

	return (
		<header className="bg-white border-b border-gray-200 px-6 py-4">
			<div className="flex items-center justify-end">
				<div className="flex items-center space-x-4">
					{/* User Menu */}
					<div className="relative" ref={menuRef}>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							<ChevronDown className="w-4 h-4" />
						</Button>

						{isMenuOpen && (
							<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
								<div className="py-1">
									<button
										onClick={async () => {
											await logout();
										}}
										className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
									>
										<LogOut className="w-4 h-4 mr-3" />
										Cerrar sesión
									</button>
								</div>
							</div>
						)}
					</div>

					<div className="flex items-center space-x-2">
						<Avatar className="w-8 h-8">
							<AvatarFallback className="bg-green-500 text-white">
								<UserIcon className="w-4 h-4" />
							</AvatarFallback>
						</Avatar>
						<div className="text-sm">
							<div className="font-medium capitalize">
								{user.storeName}
							</div>
							<div className="text-gray-500 text-xs">
								{user.email}
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
