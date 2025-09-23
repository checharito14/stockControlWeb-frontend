"use client";

import { useState } from "react";

interface RegisterFormProps {
	onSwitchToLogin: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		confirmPassword: "",
		name: "",
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword) {
			alert("Las contraseñas no coinciden");
			return;
		}
		// Aquí iría la lógica de registro
		console.log("Register form submitted:", formData);
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="name">
						Nombre completo
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleInputChange}
						required
						placeholder="Ingresa tu nombre completo"
						className="block w-full p-3 bg-transparent border border-border rounded-md "
					/>
				</div>

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
						className="block w-full p-3 bg-transparent border border-border rounded-md "
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
						className="block w-full p-3 bg-transparent border border-border rounded-md "
					/>
				</div>

				<div>
					<label htmlFor="confirmPassword">
						Confirmar contraseña
					</label>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						value={formData.confirmPassword}
						onChange={handleInputChange}
						required
						placeholder="••••••••"
						className="block w-full p-3 bg-transparent border border-border rounded-md "
					/>
				</div>

				<button type="submit" className="w-full mt-4 px-4 py-2 bg-accent text-primary rounded-md">
					Crear Cuenta
				</button>
			</form>

			<div>
				<p>
					¿Ya tienes cuenta?{" "}
					<button
						type="button"
						onClick={onSwitchToLogin}
					>
						Inicia sesión aquí
					</button>
				</p>
			</div>
		</>
	);
}
