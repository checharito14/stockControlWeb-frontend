export const stockControlColors = {
  brand: {
    primary: "hsl(var(--brand-primary))",
    secondary: "hsl(var(--brand-secondary))",
    accent: "hsl(var(--brand-accent))",
    warning: "hsl(var(--brand-warning))",
    danger: "hsl(var(--brand-danger))",
  },
  dashboard: {
    sidebar: "hsl(var(--dashboard-sidebar))",
    sidebarActive: "hsl(var(--dashboard-sidebar-active))",
    header: "hsl(var(--dashboard-header))",
    metrics: {
      blue: "hsl(var(--dashboard-metric-blue))",
      green: "hsl(var(--dashboard-metric-green))",
      cyan: "hsl(var(--dashboard-metric-cyan))",
      pink: "hsl(var(--dashboard-metric-pink))",
    },
  },
  chart: {
    primary: "hsl(var(--chart-1))",
    secondary: "hsl(var(--chart-2))",
    tertiary: "hsl(var(--chart-3))",
    quaternary: "hsl(var(--chart-4))",
    quinary: "hsl(var(--chart-5))",
  },
} as const

export type StockControlColors = typeof stockControlColors
