import { getAuthToken } from "./api";
import type { SalesHistoryResponse } from "./schemas/sales";

export async function getSalesHistory(params?: {
  dateFrom?: string;
  dateTo?: string;
  period?: 'daily' | 'weekly' | 'monthly';
}): Promise<SalesHistoryResponse> {
    
  const token = await getAuthToken();

  if (!token) {
    throw new Error('No autorizado');
  }

  const queryParams = new URLSearchParams();
  if (params?.dateFrom) queryParams.append('dateFrom', params.dateFrom);
  if (params?.dateTo) queryParams.append('dateTo', params.dateTo);
  if (params?.period) queryParams.append('period', params.period);

  const url = `${process.env.API_URL}/sales/history${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Error al obtener el historial de ventas');
  }

  return response.json();
}
