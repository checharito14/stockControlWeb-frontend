import "server-only";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { UserSchema } from './schemas/auth';

export async function getAuthToken(): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get('AUTH_TOKEN')?.value || null;
}
 
export async function getUserProfile() {
    const token = await getAuthToken();

    if (!token) {
        redirect('/');
    }

    try {
        const req = await fetch(`${process.env.API_URL}/auth/profile`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!req.ok) {
            throw new Error('Error al obtener el perfil del usuario');
        }

        const json = await req.json();

        const result = UserSchema.safeParse(json);

        if(!result.success) {
            redirect("/");
        }
        
        return result.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        redirect('/');
    }
}