"use client";

import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage() {
	const [authType, setAuthType] = useState<"login" | "register">("login");
	return (
		<div
			className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
			style={{ backgroundImage: "url('10631434.jpg')" }}
		>
			<div className="relative w-full max-w-md p-8 bg-white/80 dark:bg-black/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-white/10">
				<div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl pointer-events-none" />
				<div className="relative z-10">
					{/* Logo y título */}
					<div className="flex w-full items-center gap-2 mb-8">
						<Image
							src="/logo.png"
							alt="StockControl"
							width={60}
							height={60}
						/>
						<h3 className="text-black dark:text-white font-semibold text-xl">
							StockControl
						</h3>
					</div>

					{/* Tabs para elegir tipo de autenticación */}
					<div className="flex mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
						<button
							type="button"
							onClick={() => setAuthType("login")}
							className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
								authType === "login"
									? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
									: "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
							}`}
						>
							Iniciar Sesión
						</button>
						<button
							type="button"
							onClick={() => setAuthType("register")}
							className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
								authType === "register"
									? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
									: "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
							}`}
						>
							Registrarse
						</button>
					</div>

					{/* Formulario dinámico */}
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
