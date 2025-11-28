import { getAuthToken } from "./api";
import { CouponSchema } from "./schemas/coupons";
import { z } from "zod";

export async function getCoupons() {
    const token = await getAuthToken();

    try {
        const req = await fetch(`${process.env.API_URL}/coupons`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!req.ok) {
            throw new Error('Error al obtener los cupones');
        }

        const json = await req.json();

        const result = z.array(CouponSchema).safeParse(json);

        if (!result.success) {
            console.error('Error validating coupons:', result.error);
            return [];
        }
        
        return result.data;
    } catch (error) {
        console.error('Error fetching coupons:', error);
        return [];
    }
}

export async function getCouponById(id: number) {
    const token = await getAuthToken();

    if (!token) {
        return null;
    }

    try {
        const req = await fetch(`${process.env.API_URL}/coupons/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!req.ok) {
            throw new Error('Error al obtener el cupón');
        }

        const json = await req.json();

        const result = CouponSchema.safeParse(json);

        if (!result.success) {
            console.error('Error validating coupon:', result.error);
            return null;
        }
        
        return result.data;
    } catch (error) {
        console.error('Error fetching coupon:', error);
        return null;
    }
}
