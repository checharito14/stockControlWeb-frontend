"use server"

import { getAuthToken } from "@/lib/api"
import { ErrorResponseSchema, ErrorSchema } from "@/lib/schemas/auth"
import { ClientFormSchema } from "@/lib/schemas/clients"

type ActionStateType = {
    errors: string[]
    success: string
}

export async function addClient(prevState: ActionStateType, formData: FormData) {
    const rawPhone = formData.get('phone') as string
    const cleanPhone = rawPhone ? rawPhone.replace(/\D/g, '') : ''

    const clientData = ClientFormSchema.safeParse({
        name: formData.get('name'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: cleanPhone,
    })

   
    if(!clientData.success) {
        return {
            errors: clientData.error.issues.map(error => error.message),
            success: ''
        }
    }

    const url = `${process.env.API_URL}/clients`
    const token = await getAuthToken()

    const req = await fetch(url, {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
         },
         body: JSON.stringify({
            name: clientData.data.name,
            lastName: clientData.data.lastName,
            email: clientData.data.email,
            phone: clientData.data.phone,
         })
    })

    const json = await req.json()

    if(!req.ok) {
        const error = ErrorResponseSchema.parse(json)
        const errorMessages = Array.isArray(error.message) ? error.message : [error.message];
        return {
            errors: errorMessages,
            success: ''
        }
    }

    
    return {
        errors: [],
        success: 'Cliente agregado correctamente'
    }
}
