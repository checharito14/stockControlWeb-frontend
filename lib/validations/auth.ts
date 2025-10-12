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


export const ProductSchema = z.object({
		id: z.number(),
		name: z.string(),
		price: z.coerce.number(),
		stock: z.number(),
})

export const ProductFormSchema = z.object({
		name: z.string().min(1, { message: "Ingresa un nombre válido" }),
		price: z.coerce.number().min(1, { message: "El precio debe ser mayor a 0" }),
		stock: z.coerce.number().min(1, { message: "El stock debe ser mayor a 0" }),
})

export const ProductsResponseSchema = z.array(ProductSchema)

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type Product = z.infer<typeof ProductSchema>;
