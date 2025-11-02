"use server"

import { CouponInput } from "@/lib/schemas/coupons"
import { ErrorResponseSchema } from "@/lib/schemas/auth"
import { getAuthToken } from "@/lib/api"

type ActionStateType = {
    success: string,
    errors: string[],
}

export async function addCoupon(prevState: ActionStateType, formData: FormData) {
    
    const couponData = {
        name: formData.get("name"),
        expirationDate: formData.get("expirationDate"),
        discountPercentage: formData.get("discountPercentage") 
    }

    const validateCoupon = CouponInput.safeParse(couponData)

    if(!validateCoupon.success) {
        return {
            success: '',
            errors: validateCoupon.error.errors.map(error => error.message)
        }
    } 

    const token = await getAuthToken()
    const url = `${process.env.API_URL}/coupons`;

	const req = await fetch(url, {
		method: "POST",
		body: JSON.stringify(validateCoupon.data),
		headers: {
			"Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
		},
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
        success: 'Cupón agregado correctamente'
    }
}
