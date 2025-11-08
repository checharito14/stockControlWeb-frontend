"use server"

import { getAuthToken } from "@/lib/api"
import { ErrorResponseSchema } from "@/lib/schemas/auth"
import { CreateSaleSchema, SaleSchema } from "@/lib/schemas/sales"
import { revalidatePath } from "next/cache"
import { ZodError } from "zod"

type ActionStateType = {
    errors: string[]
    success: string
    saleId?: number
}

export async function processSale(
    payload: unknown
): Promise<ActionStateType> {
    
    try {
        // Validar directamente con Zod
        const validatedPayload = CreateSaleSchema.parse(payload)

        const url = `${process.env.API_URL}/sales`
        const token = await getAuthToken()

        const req = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(validatedPayload)
        })

        const json = await req.json()

        if (!req.ok) {
            const error = ErrorResponseSchema.parse(json)
            const errorMessages = Array.isArray(error.message) 
                ? error.message 
                : [error.message]
            
            return {
                errors: errorMessages,
                success: ''
            }
        }

        // Validar la respuesta del backend
        const sale = SaleSchema.parse(json)

        // Revalidar páginas relacionadas
        revalidatePath('/dashboard/sales')
        revalidatePath('/dashboard/products')

        return {
            errors: [],
            success: 'Venta procesada exitosamente',
            saleId: sale.id
        }
    } catch (error) {
        // Manejar errores de validación de Zod
        if (error instanceof ZodError) {
            return {
                errors: error.errors.map(err => `${err.path.join('.')}: ${err.message}`),
                success: ''
            }
        }

        // Otros errores
        return {
            errors: ['Error al procesar la venta. Por favor, intenta nuevamente.'],
            success: ''
        }
    }
}
