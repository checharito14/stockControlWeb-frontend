import { z } from "zod";

export const ErrorSchema = z.object({
	message: z.string()
})

export const ErrorResponseSchema = z.object({
	message: z.array(z.string()),
	error: z.string(),
	statusCode: z.number(),
});

export const SuccessSchema = z.object({
	  message: z.string()
})

export const RegisterSchema = z
	.object({
		name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),

		email: z.string().email("Ingresa un email válido"),

		password: z
			.string()
			.min(6, "La contraseña debe tener al menos 6 caracteres")
	})


export const LoginSchema = z.object({
	email: z.string().email("Ingresa un email válido"),
	password: z.string().min(1, "La contraseña es requerida"),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
