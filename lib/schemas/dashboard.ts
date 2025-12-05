import { z } from "zod";

export const DashboardMetricsSchema = z.object({
    today: z.object({
        totalSales: z.string(),
        transactionCount: z.number(),
    }),
    yesterday: z.object({
        totalSales: z.string(),
        transactionCount: z.number(),
    }),
    week: z.object({
        totalSales: z.string(),
        transactionCount: z.number(),
    }),
    topProductsWeek: z.array(z.object({
        name: z.string(),
        quantity: z.number(),
        total: z.string(),
    })),
})

export const DailyActivitySchema = z.array(z.object({
    date: z.string(),
    total: z.string(),
    count: z.number(),
}));

export const AIInsightsSchema = z.object({
    insights: z.array(z.object({
        description: z.string(),
    })),
})

export type DashboardMetrics = z.infer<typeof DashboardMetricsSchema>;
export type DailyActivity = z.infer<typeof DailyActivitySchema>;
export type AIInsights = z.infer<typeof AIInsightsSchema>;