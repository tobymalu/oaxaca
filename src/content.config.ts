import { defineCollection, reference } from 'astro:content';
import type { SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Silos de contenido (Hub & Spoke): cada colección es un silo con su
 * página índice (/destinos, /experiencias, /gastronomia, /servicios).
 *
 * Bilingüe: src/content/<silo>/es/*.mdx y src/content/<silo>/en/*.mdx.
 * El nombre del archivo es el slug traducido de la URL; `clave` une las
 * dos versiones (hreflang y selector de idioma). Ver src/i18n/rutas.ts.
 *
 * Separación de títulos — nunca reutilizar el mismo string:
 * - `titulo`          → H1 editorial/persuasivo de la página del artículo.
 * - `nombre_corto`    → UI: tarjetas, breadcrumbs, menús.
 * - `seo.meta_title`  → <title> optimizado para búsqueda.
 */

const seoSchema = z.object({
  meta_title: z.string().max(70),
  meta_description: z.string().max(160),
  noindex: z.boolean().default(false),
});

/** Niveles de precio — debe coincidir con `PrecioNivel` en src/lib/precios.ts. */
const precioNivelSchema = z.object({
  etiqueta: z.string(),
  precio: z.number().nonnegative(),
  moneda: z.enum(['MXN', 'USD']),
  tipo: z.enum(['estandar', 'addon']),
  nota: z.string().optional(),
});

const baseSchema = ({ image }: SchemaContext) =>
  z.object({
    // Une las traducciones de una misma página (mismo valor en es/ y en/).
    // Convención: el nombre del archivo en español.
    clave: z.string(),
    titulo: z.string(),
    nombre_corto: z.string().max(40),
    descripcion: z.string(),
    // Opcional para no bloquear contenido sin foto: las tarjetas muestran
    // ImagePlaceholder ([DATO FALTANTE]). Ruta relativa al .mdx; pasa por <Image/>.
    imagen_portada: z
      .object({
        src: image(),
        alt: z.string(),
      })
      .optional(),
    fecha_publicacion: z.coerce.date(),
    destacado: z.boolean().default(false),
    // Desempate entre entradas con la misma fecha (menor = primero).
    orden: z.number().int().optional(),
    seo: seoSchema,
  });

const destinos = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/destinos' }),
  schema: (ctx) => baseSchema(ctx),
});

const experiencias = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/experiencias' }),
  schema: (ctx) =>
    baseSchema(ctx).extend({
      // Enlace al hub geográfico (silo destinos).
      destino: reference('destinos'),
      badge: z.string().max(20).optional(),
      // Sin calificación → la UI muestra [DATO FALTANTE]. Nunca inventar reseñas.
      calificacion: z
        .object({
          valor: z.number().min(0).max(5),
          resenas: z.number().int().nonnegative(),
        })
        .optional(),
      precios: z.array(precioNivelSchema).default([]),
    }),
});

const gastronomia = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/gastronomia' }),
  schema: (ctx) =>
    baseSchema(ctx).extend({
      // Llave; la etiqueta visible sale de `categorias` en src/i18n/ui.ts.
      categoria: z.enum(['mercados', 'mezcal', 'platillos', 'restaurantes']),
    }),
});

const servicios = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/servicios' }),
  schema: (ctx) =>
    baseSchema(ctx).extend({
      precios: z.array(precioNivelSchema).default([]),
    }),
});

export const collections = { destinos, experiencias, gastronomia, servicios };
