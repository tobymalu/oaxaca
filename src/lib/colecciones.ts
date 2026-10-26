import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';

/** Etiqueta de UI y ruta del hub de cada silo. */
export const SILOS = {
  destinos: { label: 'Destinos', path: '/destinos' },
  experiencias: { label: 'Experiencias', path: '/experiencias' },
  gastronomia: { label: 'Gastronomía', path: '/gastronomia' },
  servicios: { label: 'Servicios', path: '/servicios' },
} as const satisfies Record<CollectionKey, { label: string; path: string }>;

/** URL pública de una entrada: /<silo>/<id>. */
export function entradaHref(coleccion: CollectionKey, id: string): string {
  return `${SILOS[coleccion].path}/${id}`;
}

/**
 * true si el .mdx tiene cuerpo real (ignora comentarios MDX como el
 * placeholder [DATO FALTANTE]). Misma regla que `rutasSinContenido()` en
 * astro.config.mjs — si se cambia aquí, cambiarla allá.
 */
export function tieneContenido(entry: { body?: string }): boolean {
  return Boolean(entry.body?.replace(/\{\/\*[\s\S]*?\*\/\}/g, '').trim());
}

/**
 * Entradas publicables de un silo (sin noindex), de la más reciente a la
 * más antigua. Con la misma fecha desempata `orden` (sin orden van al final).
 */
export async function getSilo<C extends CollectionKey>(coleccion: C): Promise<CollectionEntry<C>[]> {
  const entradas = (await getCollection(coleccion)) as CollectionEntry<C>[];
  return entradas
    .filter((e) => !e.data.seo.noindex)
    .sort(
      (a, b) =>
        b.data.fecha_publicacion.getTime() - a.data.fecha_publicacion.getTime() ||
        (a.data.orden ?? Infinity) - (b.data.orden ?? Infinity),
    );
}

/**
 * Selección para el Home: primero las `destacado: true` (más recientes
 * primero) y, si no alcanzan el límite, se completa con las más recientes.
 * Espera la lista ya ordenada por fecha (como la devuelve getSilo).
 */
export function destacadosORecientes<T extends { data: { destacado: boolean } }>(
  ordenadas: T[],
  limite: number,
): T[] {
  const destacados = ordenadas.filter((e) => e.data.destacado);
  const resto = ordenadas.filter((e) => !e.data.destacado);
  return [...destacados, ...resto].slice(0, limite);
}
