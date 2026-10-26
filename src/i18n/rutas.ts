/**
 * Rutas públicas por idioma. Español en la raíz (idioma por defecto) e
 * inglés bajo /en con rutas traducidas para SEO.
 *
 * Sin imports de `astro:*`: este módulo también lo usa astro.config.mjs.
 */

export const LANGS = ['es', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'es';

/** Valor para <html lang>, hreflang y og:locale. */
export const LOCALE_TAGS: Record<Lang, { html: string; og: string }> = {
  es: { html: 'es-MX', og: 'es_MX' },
  en: { html: 'en', og: 'en_US' },
};

export type Silo = 'destinos' | 'experiencias' | 'gastronomia' | 'servicios';

/** Hub de cada silo (= colección de contenido) por idioma. */
export const SILO_PATHS: Record<Silo, Record<Lang, string>> = {
  destinos: { es: '/destinos', en: '/en/destinations' },
  experiencias: { es: '/experiencias', en: '/en/experiences' },
  gastronomia: { es: '/gastronomia', en: '/en/food' },
  servicios: { es: '/servicios', en: '/en/services' },
};

/** Páginas fijas (no vienen de colecciones). */
export const PAGE_PATHS = {
  home: { es: '/', en: '/en' },
  buscar: { es: '/buscar', en: '/en/search' },
  privacidad: { es: '/aviso-de-privacidad', en: '/en/privacy-notice' },
  cancelaciones: { es: '/politicas-de-cancelacion', en: '/en/cancellation-policy' },
} as const satisfies Record<string, Record<Lang, string>>;

export type PageKey = keyof typeof PAGE_PATHS;

/** Alternativas de idioma de una página: { es: '/ruta', en: '/en/route' }. */
export type Alternates = Partial<Record<Lang, string>>;

/** Las entradas de contenido viven en src/content/<silo>/<lang>/<slug>.mdx. */
export function splitEntryId(id: string): { lang: Lang; slug: string } {
  const [lang, ...resto] = id.split('/');
  if (!LANGS.includes(lang as Lang)) {
    throw new Error(`Entrada "${id}" fuera de una carpeta de idioma (${LANGS.join(', ')}).`);
  }
  return { lang: lang as Lang, slug: resto.join('/') };
}

export function entryPath(silo: Silo, id: string): string {
  const { lang, slug } = splitEntryId(id);
  return `${SILO_PATHS[silo][lang]}/${slug}`;
}
