"use server"

import { ErrorSchema, LoginSchema } from "@/lib/schemas/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type ActionStateType = {
    errors: string[],
}

export async function login(prevState: ActionStateType, formData: FormData) {
    
    const loginCredentials = {
        email: formData.get("email"),
        password: formData.get("password"),
    }

    const validateLoginCredentials = LoginSchema.safeParse(loginCredentials)

    if(!validateLoginCredentials.success) {
        return {
            errors: validateLoginCredentials.error.errors.map(error => error.message)
        }
    } 

    const url = `${process.env.API_URL}/auth/login`;

	const req = await fetch(url, {
		method: "POST",
		body: JSON.stringify({
			email: validateLoginCredentials.data.email,
			password: validateLoginCredentials.data.password
		}),
		headers: {
			"Content-Type": "application/json",
		},
	})

    const json = await req.json()
    console.log("json", json)

 
    if(!req.ok) {
        const {message} = ErrorSchema.parse(json)
        return {
            errors: [message]
        }
    }
    
    (await cookies()).set({
        name: "AUTH_TOKEN",
        value: json.access_token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: "/",
        maxAge: 60 * 60 * 24 * 7
    })

    redirect("/dashboard")
}