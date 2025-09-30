"use server"

import { ErrorSchema, LoginSchema } from "@/lib/validations/auth"
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

 
    if(!req.ok) {
        const {message} = ErrorSchema.parse(json)
        return {
            errors: [message]
        }
    }
    

    redirect("/dashboard")
}