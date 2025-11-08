import { z } from "zod";

// ========== SCHEMAS PARA ENVIAR (Request) ==========

// Detalle individual de venta (lo que va en el carrito)
export const SaleDetailSchema = z.object({
	productId: z
		.number()
		.int()
		.positive("El ID del producto debe ser positivo"),
	quantity: z.number().int().min(1, "La cantidad debe ser al menos 1"),
});

// Payload para crear una venta
export const CreateSaleSchema = z.object({
	clientId: z.number().int().positive().nullable().optional(),
	couponId: z.number().int().positive().nullable().optional(),
	details: z
		.array(SaleDetailSchema)
		.min(1, "Debe incluir al menos un producto"),
});

// ========== SCHEMAS PARA RECIBIR (Response) ==========

// Detalle de venta en la respuesta del backend
export const SaleDetailResponseSchema = z.object({
	id: z.number(),
	saleId: z.number(),
	productId: z.number(),
	productName: z.string(),
	price: z.number(),
	quantity: z.number(),
	subtotal: z.number(),
});

// Venta completa (respuesta del backend)
export const SaleSchema = z.object({
	id: z.number(),
	userId: z.number(),
	clientId: z.number().nullable(),
	couponId: z.number().nullable(),
	subtotal: z.number(),
	discount: z.number(),
	total: z.number(),
	createdAt: z.string().or(z.date()),
	details: z.array(SaleDetailResponseSchema).optional(),
});

// Array de ventas (para listados)
export const SalesResponseSchema = z.array(SaleSchema);

// ========== SCHEMAS PARA HISTORIAL DE VENTAS ==========

export const SalesHistoryStatsSchema = z.object({
	totalSales: z.string(),
	transactionCount: z.number(),
	averageTicket: z.string(),
	topProducts: z.array(
		z.object({
			name: z.string(),
			quantity: z.number(),
			total: z.string(),
		})
	),
});

export const SaleHistoryItemSchema = z.object({
	id: z.number(),
	date: z.string(),
	client: z.string(),
	total: z.string(),
	products: z.number(),
	discount: z.string(),
});

export const SalesHistoryResponseSchema = z.object({
	period: z.object({
		from: z.string(),
		to: z.string(),
		type: z.enum(['daily', 'weekly', 'monthly']),
	}),
	stats: SalesHistoryStatsSchema,
	sales: z.array(SaleHistoryItemSchema),
});

// ========== TIPOS ==========

export type SaleDetail = z.infer<typeof SaleDetailSchema>;
export type CreateSale = z.infer<typeof CreateSaleSchema>;
export type Sale = z.infer<typeof SaleSchema>;
export type SaleDetailResponse = z.infer<typeof SaleDetailResponseSchema>;
export type SalesHistoryStats = z.infer<typeof SalesHistoryStatsSchema>;
export type SaleHistoryItem = z.infer<typeof SaleHistoryItemSchema>;
export type SalesHistoryResponse = z.infer<typeof SalesHistoryResponseSchema>;
