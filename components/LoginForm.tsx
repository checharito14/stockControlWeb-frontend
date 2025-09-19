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
					<label htmlFor="email">
						Correo electrónico
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleInputChange}
						required
						placeholder="tu@email.com"
					/>
				</div>

				<div>
					<label htmlFor="password">
						Contraseña
					</label>
					<input
						type="password"
						id="password"
						name="password"
						value={formData.password}
						onChange={handleInputChange}
						required
						placeholder="••••••••"
					/>
				</div>

				<button type="submit">
					Iniciar Sesión
				</button>
			</form>

			<div>
				<p>
					¿No tienes cuenta?{" "}
					<button
						type="button"
						onClick={onSwitchToRegister}
					>
						Regístrate aquí
					</button>
				</p>
			</div>
		</>
	);
}
