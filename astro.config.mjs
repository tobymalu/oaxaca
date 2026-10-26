// @ts-check
import { readdirSync, readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { DEFAULT_LANG, LANGS, PAGE_PATHS, SILO_PATHS } from './src/i18n/rutas.ts';

const SITE = 'https://visitaoaxaca.com.mx';
const CONTENT_DIR = './src/content';

// Páginas fijas con `noindex` (búsqueda y legales, en todos los idiomas).
const NOINDEX_PATHS = [PAGE_PATHS.buscar, PAGE_PATHS.privacidad, PAGE_PATHS.cancelaciones].flatMap((p) =>
  LANGS.map((lang) => p[lang]),
);

/**
 * Páginas de detalle que se generan con noindex: `seo.noindex: true` o sin
 * cuerpo todavía (solo el comentario [DATO FALTANTE]). Misma regla que
 * `tieneContenido()` en src/lib/colecciones.ts — si se cambia allá, cambiarla aquí.
 * Estructura: src/content/<silo>/<lang>/<slug>.mdx → SILO_PATHS[silo][lang]/<slug>.
 */
function rutasSinIndexar() {
  const rutas = [];
  for (const silo of /** @type {(keyof typeof SILO_PATHS)[]} */ (Object.keys(SILO_PATHS))) {
    for (const lang of LANGS) {
      const dir = `${CONTENT_DIR}/${silo}/${lang}`;
      let archivos = [];
      try {
        archivos = readdirSync(dir);
      } catch {
        continue; // silo sin carpeta de este idioma todavía
      }
      for (const archivo of archivos) {
        if (!archivo.endsWith('.mdx')) continue;
        const raw = readFileSync(`${dir}/${archivo}`, 'utf8');
        const [, frontmatter = '', cuerpo = ''] = raw.match(/^---\r?\n([\s\S]*?)\r?\n---([\s\S]*)$/) ?? [];
        const sinCuerpo = !cuerpo.replace(/\{\/\*[\s\S]*?\*\/\}/g, '').trim();
        const noindex = /^\s+noindex:\s*true/m.test(frontmatter);
        if (sinCuerpo || noindex) rutas.push(`${SILO_PATHS[silo][lang]}/${archivo.replace(/\.mdx$/, '')}`);
      }
    }
  }
  return rutas;
}

const EXCLUIR_SITEMAP = new Set([...NOINDEX_PATHS, ...rutasSinIndexar()].map((path) => `${SITE}${path}`));

// https://astro.build/config
export default defineConfig({
  site: SITE,
  output: 'static',
  // URLs sin barra final (/destinos): `format: 'file'` genera destinos.html,
  // que Cloudflare sirve en /destinos sin redirección. Así coinciden
  // enlaces internos, canonical y sitemap.
  trailingSlash: 'never',
  build: { format: 'file' },
  // Español en la raíz, inglés en /en (rutas traducidas en src/pages/en/).
  // Astro.currentLocale sale de aquí.
  i18n: {
    defaultLocale: DEFAULT_LANG,
    locales: [...LANGS],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !EXCLUIR_SITEMAP.has(page),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
