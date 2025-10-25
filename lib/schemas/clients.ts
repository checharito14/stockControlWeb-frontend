import { z } from "zod";

export const ClientSchema = z.object({
    id: z.number(),
    name: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    userId: z.number(),
    createdAt: z.string().datetime(),
})

export const ClientFormSchema = z.object({
    name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
    lastName: z.string().min(2, { message: "El apellido debe tener al menos 2 caracteres" }),
    phone: z.string().regex(/^[0-9]{10}$/, { message: "El teléfono debe tener exactamente 10 dígitos" }),
    email: z.string().email({ message: "Email inválido" }),
})

export const ClientsResponseSchema = z.array(ClientSchema);

export type Client = z.infer<typeof ClientSchema>;
export type ClientForm = z.infer<typeof ClientFormSchema>;