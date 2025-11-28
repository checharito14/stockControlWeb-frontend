import { getAuthToken } from "./api";
import { DailyActivitySchema, DashboardMetricsSchema } from "./schemas/dashboard";


export interface LowStockProduct {
  id: number;
  name: string;
  price: number;
  stock: number;
  userId: number;
}

export async function getDashboardMetrics() {
  const token = await getAuthToken();

  if (!token) {
    throw new Error('No autorizado');
  }

  const url = `${process.env.API_URL}/sales/dashboard/metrics`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Error al obtener las métricas del dashboard');
  }

  const data = await response.json();

  return DashboardMetricsSchema.parse(data)
}


export async function getLast30DaysActivity(){
  const token = await getAuthToken();

  if (!token) {
    throw new Error('No autorizado');
  }

  const url = `${process.env.API_URL}/sales/dashboard/activity`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Error al obtener la actividad de ventas');
  }

  const data = await response.json();

  return DailyActivitySchema.parse(data);
}


export async function getLowStockProducts(): Promise<LowStockProduct[]> {
  const token = await getAuthToken();

  if (!token) {
    throw new Error('No autorizado');
  }

  const url = `${process.env.API_URL}/products/low-stock`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Error al obtener productos con stock bajo');
  }

  return response.json();
}

export async function getTopProducts(period: 'daily' | 'weekly' | 'monthly' = 'weekly') {
  const token = await getAuthToken();

  if (!token) {
    throw new Error('No autorizado');
  }

  const url = `${process.env.API_URL}/sales/top-products?period=${period}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Error al obtener productos más vendidos:', error);
    throw new Error(error.message || 'Error al obtener productos más vendidos');
  }

  return response.json();
}
