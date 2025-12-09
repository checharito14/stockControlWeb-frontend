"use server";

import { ErrorResponseSchema, ErrorSchema, RegisterSchema, SuccessSchema } from "@/lib/schemas/auth";

type ActionStateType = {
	errors: string[];
	success: string;
};
export async function register(prevState: ActionStateType, formData: FormData) {
	const registerFormData = {
		email: formData.get("email"),
		password: formData.get("password"),
		name: formData.get("name"),
	};

	const validateRegisterData = RegisterSchema.safeParse(registerFormData);

	if (!validateRegisterData.success) {
		const errors = validateRegisterData.error.errors.map(
			(err) => err.message
		);
		return {
			errors,
			success: "",
		};
	}

	const url = `${process.env.API_URL}/auth/register`;

	const req = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			storeName: validateRegisterData.data.name,
			email: validateRegisterData.data.email,
			password: validateRegisterData.data.password,
		}),
	});

	const json = await req.json();

	if (!req.ok) {
	   const error = ErrorResponseSchema.parse(json)
        const errorMessages = Array.isArray(error.message) ? error.message : [error.message];
        return {
            errors: errorMessages,
            success: ''
        }
	}

	const successMessage = SuccessSchema.parse(json);
	
	return {
		errors: [],
		success: successMessage.message
	};
}
