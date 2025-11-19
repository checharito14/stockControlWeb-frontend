// src/components/ticket/TicketBody.tsx
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { formatCurrency } from "@/lib/utils";
import type { Sale } from "@/lib/schemas/sales";

type Props = {
  sale: Sale;
};

export function TicketBody({ sale }: Props) {
  const formattedDate = format(
    new Date(sale.createdAt),
    "dd/MM/yyyy HH:mm",
    { locale: es }
  );

  return (
    <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
      <div className="border-2 border-dashed border-gray-300 rounded-md p-6 font-mono text-md space-y-4">
        
        <div className="text-center border-b-2 border-dashed border-gray-300 pb-4">
          <h4 className="text-xl font-bold">StockControl</h4>
        </div>

        {/* Header */}
        <div className="border-b border-dashed border-gray-300 pb-3 space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-600">Ticket #:</span>
            <span className="font-semibold">{sale.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Fecha:</span>
            <span>{formattedDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Cliente:</span>
            <span>{sale.clientId ? `#${sale.clientId}` : "-"}</span>
          </div>
        </div>

        {/* Details */}
        <div className="border-b-2 border-dashed border-gray-300 pb-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left pb-2">CANT</th>
                <th className="text-left pb-2">PRODUCTO</th>
                <th className="text-right pb-2">PRECIO</th>
                <th className="text-right pb-2">TOTAL</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {sale.details.map((d) => (
                <tr key={d.id}>
                  <td className="py-2">{d.quantity}</td>
                  <td className="py-2">{d.productName}</td>
                  <td className="text-right py-2">{formatCurrency(d.price)}</td>
                  <td className="text-right py-2 font-semibold">
                    {formatCurrency(d.subtotal)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-600">SUBTOTAL:</span>
            <span>{formatCurrency(sale.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">DESCUENTO:</span>
            <span>{formatCurrency(sale.discount)}</span>
          </div>
          <div className="flex justify-between text-base font-bold pt-2 border-t-2 border-gray-300">
            <span>TOTAL:</span>
            <span>{formatCurrency(sale.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
