// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const SITE = 'https://visitaoaxaca.com.mx';

// Rutas con `noindex` — no deben aparecer en el sitemap.
const NOINDEX_PATHS = ['/buscar', '/aviso-de-privacidad', '/politicas-de-cancelacion'];

// https://astro.build/config
export default defineConfig({
  site: SITE,
  output: 'static',
  // URLs sin barra final (/destinos): `format: 'file'` genera destinos.html,
  // que Cloudflare Pages sirve en /destinos sin redirección. Así coinciden
  // enlaces internos, canonical y sitemap.
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !NOINDEX_PATHS.some((path) => page === `${SITE}${path}`),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
