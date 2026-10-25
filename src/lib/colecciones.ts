import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';

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
