import { z } from "zod";

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


export type Product = z.infer<typeof ProductSchema>;
