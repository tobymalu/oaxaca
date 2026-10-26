// @ts-check
import { readdirSync, readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const SITE = 'https://visitaoaxaca.com.mx';
const CONTENT_DIR = './src/content';

// Rutas con `noindex` — no deben aparecer en el sitemap.
const NOINDEX_PATHS = ['/buscar', '/aviso-de-privacidad', '/politicas-de-cancelacion'];

/**
 * Páginas de detalle que se generan con noindex: `seo.noindex: true` o sin
 * cuerpo todavía (solo el comentario [DATO FALTANTE]). Misma regla que
 * `tieneContenido()` en src/lib/colecciones.ts — si se cambia allá, cambiarla aquí.
 */
function rutasSinIndexar() {
  const rutas = [];
  for (const silo of readdirSync(CONTENT_DIR, { withFileTypes: true })) {
    if (!silo.isDirectory()) continue;
    for (const archivo of readdirSync(`${CONTENT_DIR}/${silo.name}`)) {
      if (!archivo.endsWith('.mdx')) continue;
      const raw = readFileSync(`${CONTENT_DIR}/${silo.name}/${archivo}`, 'utf8');
      const [, frontmatter = '', cuerpo = ''] = raw.match(/^---\r?\n([\s\S]*?)\r?\n---([\s\S]*)$/) ?? [];
      const sinCuerpo = !cuerpo.replace(/\{\/\*[\s\S]*?\*\/\}/g, '').trim();
      const noindex = /^\s+noindex:\s*true/m.test(frontmatter);
      if (sinCuerpo || noindex) rutas.push(`/${silo.name}/${archivo.replace(/\.mdx$/, '')}`);
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
