export const themeConfig = {
  colors: {
    // Brand colors
    "brand-primary": "hsl(var(--brand-primary))",
    "brand-secondary": "hsl(var(--brand-secondary))",
    "brand-accent": "hsl(var(--brand-accent))",
    "brand-warning": "hsl(var(--brand-warning))",
    "brand-danger": "hsl(var(--brand-danger))",

    // Dashboard specific colors
    "dashboard-sidebar": "hsl(var(--dashboard-sidebar))",
    "dashboard-sidebar-active": "hsl(var(--dashboard-sidebar-active))",
    "dashboard-header": "hsl(var(--dashboard-header))",
    "dashboard-metric-blue": "hsl(var(--dashboard-metric-blue))",
    "dashboard-metric-green": "hsl(var(--dashboard-metric-green))",
    "dashboard-metric-cyan": "hsl(var(--dashboard-metric-cyan))",
    "dashboard-metric-pink": "hsl(var(--dashboard-metric-pink))",
  },
  spacing: {
    "sidebar-width": "16rem",
    "header-height": "4rem",
    "metric-card-height": "8rem",
  },
  borderRadius: {
    card: "var(--radius-lg)",
    button: "var(--radius-md)",
    input: "var(--radius-sm)",
  },
} as const

export type ThemeConfig = typeof themeConfig
