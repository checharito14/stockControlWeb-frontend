"use server";

import { ErrorSchema, RegisterSchema, SuccessSchema } from "@/lib/validations/auth";

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
		const { message } = ErrorSchema.parse(json);
		return {
			errors: [message],
			success: "",
		};
	}

	const successMessage = SuccessSchema.parse(json);
	
	return {
		errors: [],
		success: successMessage.message
	};
}
