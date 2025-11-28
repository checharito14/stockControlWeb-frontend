"use client";

import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
	const [authType, setAuthType] = useState<"login" | "register">("login");
	return (
		<div
			className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
			style={{ backgroundImage: "url('backk.jpg')" }}
		>
			<div className="relative w-full max-w-md p-8 bg-dashboard backdrop-blur-xl rounded-3xl shadow-2xl border border-dashboard">
				<div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl pointer-events-none" />
				<div className="relative z-10">
					<div className="flex w-full items-center gap-2 mb-8">
						<Image
							src="/logo.png"
							alt="StockControl"
							width={60}
							height={60}
						/>
						<h3 className="text-black font-semibold text-xl">
							StockControl
						</h3>
					</div>

					{/* Tabs para elegir tipo de autenticación */}
					<div className="flex mb-6 bg-gray-100 rounded-lg p-1">
						<button
							type="button"
							onClick={() => setAuthType("login")}
							className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors cursor-pointer ${
								authType === "login"
									? "bg-white  text-gray-900 shadow-sm"
									: "text-gray-500  hover:text-gray-700"
							}`}
						>
							Iniciar Sesión
						</button>
						<button
							type="button"
							onClick={() => setAuthType("register")}
							className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors cursor-pointer ${
								authType === "register"
									? "bg-white  text-gray-900 shadow-sm"
									: "text-gray-500  hover:text-gray-700"
							}`}
						>
							Registrarse
						</button>
					</div>

					{authType === "login" ? (
						<LoginForm
							onSwitchToRegister={() => setAuthType("register")}
						/>
					) : (
						<RegisterForm
							onSwitchToLogin={() => setAuthType("login")}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
