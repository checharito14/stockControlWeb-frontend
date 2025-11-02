import { z } from "zod";

export const CouponSchema = z.object({
	id: z.number(),
	name: z.string().min(1, "El nombre es obligatorio"),
	expirationDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
		message: "Fecha de expiración no válida",
	}),
	discountPercentage: z
		.coerce
		.number({message: "Cantidad no válida"})
		.int({ message: "El descuento debe ser un número entero" })
		.min(0, "El descuento debe ser mayor o igual a 0")
		.max(100, "El descuento no puede ser mayor a 100")
});

export const CouponInput = CouponSchema.omit({ id: true });



export type Coupon = z.infer<typeof CouponSchema>;
export type CouponInput = z.infer<typeof CouponInput>;