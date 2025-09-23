"use client";

import { useState } from "react";

interface LoginFormProps {
	onSwitchToRegister: () => void;
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Aquí iría la lógica de login
		console.log("Login form submitted:", formData);
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Correo electrónico</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleInputChange}
						required
						placeholder="tu@email.com"
						className="block w-full p-3 bg-transparent border border-border rounded-md"
					/>
				</div>

				<div>
					<label htmlFor="password">Contraseña</label>
					<input
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleInputChange}
						required
						placeholder="••••••••"
						className="block w-full p-3 bg-transparent border border-border rounded-md "
					/>
				</div>

				<button
					type="submit"
					className="w-full mt-4 px-4 py-2 bg-accent text-primary rounded-md"
				>
					Iniciar Sesión
				</button>
			</form>

			<div>
				<button
					className="mt-4 text-sm text-center text-text-secondary cursor-pointer"
					onClick={onSwitchToRegister}
				>
					¿No tienes cuenta? Regístrate aquí
				</button>
			</div>
		</>
	);
}
