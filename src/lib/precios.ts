/**
 * Niveles de precio de un tour/experiencia. Transparencia total: cada
 * costo que pagará el viajero debe estar listado aquí.
 * - "estandar": precio base de la experiencia (entra al "Desde $X").
 * - "addon": extra opcional (no entra al "Desde $X").
 */
export type PrecioNivel = {
  etiqueta: string;
  precio: number;
  moneda: 'MXN' | 'USD';
  nota?: string;
  tipo: 'estandar' | 'addon';
};

/** Nivel estándar más barato, o null si no hay precios cargados. */
export function precioDesde(niveles: PrecioNivel[]): PrecioNivel | null {
  const estandar = niveles.filter((n) => n.tipo === 'estandar');
  if (estandar.length === 0) return null;
  return estandar.reduce((min, n) => (n.precio < min.precio ? n : min));
}

export function formatPrecio(nivel: Pick<PrecioNivel, 'precio' | 'moneda'>): string {
  const monto = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: nivel.moneda,
    maximumFractionDigits: 0,
  }).format(nivel.precio);
  return `${monto} ${nivel.moneda}`;
}
