import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';
import { LANGS, entryPath, splitEntryId, type Alternates, type Lang } from '../i18n/rutas';

/** URL pública de una entrada: /<silo>/<slug> (es) o /en/<silo-en>/<slug> (en). */
export function entradaHref(coleccion: CollectionKey, id: string): string {
  return entryPath(coleccion, id);
}

/** Idioma y slug de una entrada a partir de su carpeta (es/ o en/). */
export function idiomaDe(entry: { id: string }): Lang {
  return splitEntryId(entry.id).lang;
}

export function slugDe(entry: { id: string }): string {
  return splitEntryId(entry.id).slug;
}

/**
 * true si el .mdx tiene cuerpo real (ignora comentarios MDX como el
 * placeholder [DATO FALTANTE]). Misma regla que `rutasSinIndexar()` en
 * astro.config.mjs — si se cambia aquí, cambiarla allá.
 */
export function tieneContenido(entry: { body?: string }): boolean {
  return Boolean(entry.body?.replace(/\{\/\*[\s\S]*?\*\/\}/g, '').trim());
}

/**
 * Entradas publicables de un silo en un idioma (sin noindex), de la más
 * reciente a la más antigua. Con la misma fecha desempata `orden`.
 */
export async function getSilo<C extends CollectionKey>(coleccion: C, lang: Lang): Promise<CollectionEntry<C>[]> {
  const entradas = (await getCollection(coleccion)) as CollectionEntry<C>[];
  return entradas
    .filter((e) => idiomaDe(e) === lang && !e.data.seo.noindex)
    .sort(
      (a, b) =>
        b.data.fecha_publicacion.getTime() - a.data.fecha_publicacion.getTime() ||
        (a.data.orden ?? Infinity) - (b.data.orden ?? Infinity),
    );
}

/** Todas las entradas de un silo en un idioma (para getStaticPaths). */
export async function getEntradas<C extends CollectionKey>(coleccion: C, lang: Lang): Promise<CollectionEntry<C>[]> {
  const entradas = (await getCollection(coleccion)) as CollectionEntry<C>[];
  return entradas.filter((e) => idiomaDe(e) === lang);
}

/** Una entrada es indexable si no tiene noindex y ya tiene cuerpo. */
export function esIndexable(entry: CollectionEntry<CollectionKey>): boolean {
  return !entry.data.seo.noindex && tieneContenido(entry);
}

/**
 * Versiones de idioma de una entrada (incluida ella misma), emparejadas
 * por `clave`:
 * - `traducciones`: todas las que existen → selector de idioma del navbar.
 * - `hreflang`: solo las indexables → <link rel="alternate" hreflang>
 *   (hreflang nunca debe apuntar a una página noindex).
 */
export async function alternatesDe(
  coleccion: CollectionKey,
  entry: CollectionEntry<CollectionKey>,
): Promise<{ traducciones: Alternates; hreflang: Alternates }> {
  const todas = (await getCollection(coleccion)) as CollectionEntry<CollectionKey>[];
  const traducciones: Alternates = {};
  const hreflang: Alternates = {};
  for (const lang of LANGS) {
    const par = todas.find((e) => idiomaDe(e) === lang && e.data.clave === entry.data.clave);
    if (!par) continue;
    traducciones[lang] = entradaHref(coleccion, par.id);
    if (esIndexable(par)) hreflang[lang] = traducciones[lang];
  }
  return { traducciones, hreflang };
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
