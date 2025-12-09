import { NextResponse } from "next/server";

import { getAuthToken } from "@/lib/api";

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	const token = await getAuthToken();

	if (!token) {
		return NextResponse.json({ message: "No autorizado" }, { status: 401 });
	}

	const { id } = await params;
	const url = `${process.env.API_URL}/sales/${id}`;

	try {
		const req = await fetch(url, {
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			cache: "no-store",
		});

		const json = await req.json();

		if (!req.ok) {
			return NextResponse.json(json.error, { status: req.status });
		}

		return NextResponse.json(json, { status: 200 });
	} catch (error) {
		console.error("Error inesperado al obtener la venta", error);

		return NextResponse.json(
			{ message: "Error interno al obtener la venta" },
			{ status: 500 }
		);
	}
}
