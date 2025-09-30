"use client";

import { login } from "@/actions/login-action";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { FloatingInput, FloatingLabel } from "../ui/floating-label-input";

interface LoginFormProps {
	onSwitchToRegister: () => void;
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
	const [state, dispatch, isPending] = useActionState(login, {
		errors: [],
	});

	useEffect(() => {
		if (state.errors) {
			state.errors.forEach((error) =>
				toast.error(error, {
					icon: null,
				})
			);
		}
	}, [state]);
	return (
		<>
			<form className="space-y-5" noValidate action={dispatch}>
				<div className="relative">
					<FloatingInput
						id="email"
						name="email"
						type="email"
						disabled={isPending}
						className="block w-full p-6 bg-transparent border border-border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
					/>
					<FloatingLabel htmlFor="email" className="font-medium">
						Correo electrónico
					</FloatingLabel>
				</div>

				<div className="relative">
					<FloatingInput
						id="password"
						name="password"
						type="password"
						disabled={isPending}
						className="block w-full p-6 bg-transparent border border-border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
					/>
					<FloatingLabel htmlFor="password" className="font-medium">
						Contraseña
					</FloatingLabel>
				</div>

				<button
					type="submit"
					disabled={isPending}
					className="w-full mt-4 px-4 py-2 bg-accent text-white rounded-md cursor-pointer hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-accent flex items-center justify-center gap-2"
				>
					{isPending ? (
						<svg
							className="animate-spin h-4 w-4"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							></circle>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
					) : (
						"Iniciar Sesión"
					)}
				</button>
			</form>

			<div>
				<button
					className="mt-8 text-sm text-center text-text-secondary cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
					onClick={onSwitchToRegister}
					disabled={isPending}
				>
					¿No tienes cuenta?{" "}
					<span className="text-accent hover:text-accent/75 transition-colors">
						Regístrate aquí
					</span>
				</button>
			</div>
		</>
	);
}
