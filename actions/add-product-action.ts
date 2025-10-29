"use server"

import { getAuthToken } from "@/lib/api"
import { ErrorResponseSchema, ErrorSchema } from "@/lib/schemas/auth"
import { ProductFormSchema } from "@/lib/schemas/products"

type ActionStateType = {
    errors: string[]
    success: string
}

export async function addProduct(prevState: ActionStateType, formData: FormData) {


    const products = ProductFormSchema.safeParse({
        name: formData.get('name'),
        price: formData.get('price'),
        stock: formData.get('stock'),
    })
   
    if(!products.success) {
        return {
            errors: products.error.issues.map(error => error.message),
            success: ''
        }
    }

    const url = `${process.env.API_URL}/products`
    const token = await getAuthToken()


    const req = await fetch(url, {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
         },
         body: JSON.stringify({
            name: products.data.name,
            price: products.data.price,
            stock: products.data.stock,
         })
    })

    const json = await req.json()

    if(!req.ok) {
        const error = ErrorResponseSchema.parse(json)
        return {
            errors: error.message.map((error) => error),
            success: ''
        }

    }

    return {
        errors: [],
        success: 'Producto agregado correctamente'
    }
}