import type { ImageMetadata } from 'astro';
import type { PrecioNivel } from '../lib/precios';
import mitla from '../assets/images/mitla-grecas-zapotecas.jpeg';
import costa from '../assets/images/costa-oaxaquena-atardecer.png';
import hierveElAgua from '../assets/images/hierve-el-agua-cascada-petrificada.jpg';
import tlayuda from '../assets/images/tlayuda-oaxaquena-brasas.jpg';

/**
 * Contenido de las secciones del Home. Cuando existan las colecciones
 * de tours y guías, estas listas se reemplazan por consultas a
 * `astro:content`. Sin `href` la tarjeta se muestra como "Próximamente"
 * (nunca enlaces rotos). Sin `imagen` se usa ImagePlaceholder.
 */

export type Foto = { src: ImageMetadata; alt: string };

export type Region = {
  name: string;
  descripcion: string;
  imagen?: Foto;
  href?: string;
};

export const REGIONES: Region[] = [
  {
    name: 'Valles Centrales',
    descripcion: 'Oaxaca de Juárez, Monte Albán, Mitla y Hierve el Agua.',
    imagen: {
      src: mitla,
      alt: 'Muros del sitio arqueológico de Mitla decorados con grecas zapotecas',
    },
  },
  {
    name: 'Costa Oaxaqueña',
    descripcion: 'Puerto Escondido, Mazunte, Zipolite y Huatulco.',
    imagen: {
      src: costa,
      alt: 'Atardecer anaranjado sobre acantilados y oleaje de la costa oaxaqueña',
    },
  },
  {
    name: 'Sierra Norte',
    descripcion: 'Pueblos Mancomunados, bosques de niebla y ecoturismo comunitario.',
    // [DATO FALTANTE]: foto de la Sierra Norte
  },
];

export type TourDestacado = {
  name: string;
  region: string;
  badge?: string;
  imagen?: Foto;
  /** [DATO FALTANTE] mientras sea null — nunca inventar calificaciones. */
  rating: { valor: number; resenas: number } | null;
  precios: PrecioNivel[];
  href?: string;
};

export const TOURS_DESTACADOS: TourDestacado[] = [
  {
    name: 'Hierve el Agua y Mitla',
    region: 'Valles Centrales',
    badge: 'Imperdible',
    imagen: {
      src: hierveElAgua,
      alt: 'Poza turquesa al borde de la cascada petrificada de Hierve el Agua con montañas al fondo',
    },
    rating: null,
    precios: [], // [DATO FALTANTE]
  },
  {
    name: 'Ruta del Mezcal Privada',
    region: 'Valles Centrales',
    badge: 'Privado',
    rating: null,
    precios: [], // [DATO FALTANTE]
  },
  {
    name: 'Tour gastronómico: mercados y tlayudas',
    region: 'Oaxaca de Juárez',
    imagen: {
      src: tlayuda,
      alt: 'Tlayuda con tasajo y col asándose sobre brasas',
    },
    rating: null,
    precios: [], // [DATO FALTANTE]
  },
  {
    name: 'Zona arqueológica de Monte Albán',
    region: 'Valles Centrales',
    rating: null,
    precios: [], // [DATO FALTANTE]
  },
];

export type ArticuloGuia = {
  titulo: string;
  categoria: string;
  extracto: string;
  imagen?: Foto;
  href?: string;
};

export const ARTICULOS_GUIA: ArticuloGuia[] = [
  {
    titulo: 'Mejores fechas para ir a la Guelaguetza',
    categoria: 'Cultura',
    extracto: 'Cuándo se celebra, cómo conseguir boletos y qué esperar de la fiesta más grande de Oaxaca.',
  },
  {
    titulo: 'Top 5 palenques de mezcal',
    categoria: 'Mezcal',
    extracto: 'Dónde ver el proceso artesanal completo, del horno de tierra al alambique.',
  },
  {
    titulo: 'Qué comer en el Mercado 20 de Noviembre',
    categoria: 'Gastronomía',
    extracto: 'El pasillo de humo, las tlayudas, el chocolate y los moles que no te puedes perder.',
    imagen: {
      src: tlayuda,
      alt: 'Tlayuda oaxaqueña asándose sobre brasas',
    },
  },
];
