import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Sale } from '@/lib/schemas/sales';
import { formatCurrency } from '@/lib/utils';

// Estilos para el PDF - Replicando exactamente el diseño del TicketBody
const styles = StyleSheet.create({
  page: {
    padding: 24, // px-6 py-4
    fontSize: 14, // text-md base
    fontFamily: 'Courier', // font-mono
    backgroundColor: '#ffffff',
  },
  container: {
    border: '2 dashed #d1d5db', // border-2 border-dashed border-gray-300
    borderRadius: 6, // rounded-md
    padding: 24, // p-6
  },
  // Header con título
  titleSection: {
    textAlign: 'center',
    borderBottom: '2 dashed #d1d5db', // border-b-2 border-dashed border-gray-300
    paddingBottom: 16, // pb-4
    marginBottom: 16, // Espacio después
  },
  title: {
    fontSize: 20, // text-xl
    fontWeight: 'bold',
  },
  // Sección de info (Ticket #, Fecha, Cliente)
  infoSection: {
    borderBottom: '1 dashed #d1d5db', // border-b border-dashed border-gray-300
    paddingBottom: 12, // pb-3
    marginBottom: 16, // space-y-4
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4, // space-y-1
  },
  label: {
    color: '#4b5563', // text-gray-600
  },
  value: {
    fontWeight: 'semibold',
  },
  // Sección de tabla de productos
  tableSection: {
    borderBottom: '2 dashed #d1d5db', // border-b-2 border-dashed border-gray-300
    paddingBottom: 12, // pb-3
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '1 solid #d1d5db', // border-b border-gray-300
    paddingBottom: 8, // pb-2
    marginBottom: 8,
    fontSize: 12, // text-sm (más pequeño para headers)
  },
  tableHeaderText: {
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8, // py-2
    borderBottom: '1 solid #e5e7eb', // divide-y divide-gray-200
    fontSize: 12, // text-sm
  },
  col1: { width: '15%' }, // CANT
  col2: { width: '40%' }, // PRODUCTO
  col3: { width: '22%', textAlign: 'right' }, // PRECIO
  col4: { width: '23%', textAlign: 'right', fontWeight: 'semibold' }, // TOTAL
  // Sección de totales
  totalsSection: {
    fontSize: 10, // text-xs
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4, // space-y-1
  },
  finalTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 14, // text-base
    fontWeight: 'bold',
    paddingTop: 8, // pt-2
    borderTop: '2 solid #d1d5db', // border-t-2 border-gray-300
    marginTop: 4,
  },
});

type TicketPDFProps = {
  sale: Sale;
};

export function TicketPDF({ sale }: TicketPDFProps) {
  const formattedDate = format(
    new Date(sale.createdAt),
    "dd/MM/yyyy HH:mm",
    { locale: es }
  );

  return (
    <Document>
      <Page size="A5" style={styles.page}>
        <View style={styles.container}>
          {/* Header con título */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>StockControl</Text>
          </View>

          {/* Sección de info (Ticket #, Fecha, Cliente) */}
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Ticket #:</Text>
              <Text style={styles.value}>{sale.id}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Fecha:</Text>
              <Text>{formattedDate}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Cliente:</Text>
              <Text>{sale.clientId ? `#${sale.clientId}` : '-'}</Text>
            </View>
          </View>

          {/* Tabla de productos */}
          <View style={styles.tableSection}>
            <View style={styles.tableHeader}>
              <Text style={[styles.col1, styles.tableHeaderText]}>CANT</Text>
              <Text style={[styles.col2, styles.tableHeaderText]}>PRODUCTO</Text>
              <Text style={[styles.col3, styles.tableHeaderText]}>PRECIO</Text>
              <Text style={[styles.col4, styles.tableHeaderText]}>TOTAL</Text>
            </View>

            {sale.details.map((detail) => (
              <View key={detail.id} style={styles.tableRow}>
                <Text style={styles.col1}>{detail.quantity}</Text>
                <Text style={styles.col2}>{detail.productName}</Text>
                <Text style={styles.col3}>{formatCurrency(detail.price)}</Text>
                <Text style={styles.col4}>{formatCurrency(detail.subtotal)}</Text>
              </View>
            ))}
          </View>

          {/* Totales */}
          <View style={styles.totalsSection}>
            <View style={styles.totalRow}>
              <Text style={styles.label}>SUBTOTAL:</Text>
              <Text>{formatCurrency(sale.subtotal)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.label}>DESCUENTO:</Text>
              <Text>{formatCurrency(sale.discount)}</Text>
            </View>
            <View style={styles.finalTotal}>
              <Text>TOTAL:</Text>
              <Text>{formatCurrency(sale.total)}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
