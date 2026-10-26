import { PAGE_PATHS, type Lang } from '../i18n/rutas';

/**
 * Datos de marca centralizados (independientes del idioma). Los textos de
 * interfaz viven en src/i18n/ui.ts. Ningún componente debe hardcodear
 * contacto ni links de la marca.
 *
 * ⚠️ PENDIENTE: todavía no hay método de contacto. Los campos vacíos
 * (email, teléfono, WhatsApp, redes, GTM, newsletter) no se renderizan
 * en ningún componente hasta que se llenen aquí.
 */

export const SITE = {
  // Marca: no se traduce (es el dominio).
  name: 'Visita Oaxaca',
  // Dominio real de producción — debe coincidir con `site` en astro.config.mjs
  url: 'https://visitaoaxaca.com.mx',
  // TODO: email de contacto
  email: '',
  phone: {
    // TODO: teléfono, formato de despliegue
    display: '',
    // TODO: mismo teléfono en formato E.164 para el atributo href="tel:"
    e164: '',
  },
  whatsapp: {
    // TODO: número de WhatsApp, sin "+" ni espacios (formato wa.me)
    number: '',
  },
  social: {
    // TODO: completar o quitar las redes que no apliquen
    instagram: '',
    facebook: '',
    tiktok: '',
  },
  // TODO: ID real de Google Tag Manager (o PUBLIC_GTM_ID en el entorno)
  gtmId: '',
  // TODO: endpoint del proveedor de newsletter (Formspree, Brevo, etc.).
  // Mientras esté vacío el formulario del footer se muestra deshabilitado.
  newsletterEndpoint: '',
} as const;

/**
 * Paleta de marca para usos fuera de CSS (meta theme-color, OG, etc.).
 * Para estilos usar las clases de Tailwind — los tokens viven en
 * src/styles/global.css y deben coincidir con estos valores.
 */
export const BRAND_COLORS = {
  cempasuchil: '#F59E0B',
  cochinilla: '#BE123C',
  agave: '#4D7C5F',
  barroNegro: '#1F2937',
  cantera: '#F9FAFB',
} as const;

export const hasContact = Boolean(SITE.email || SITE.phone.e164 || SITE.whatsapp.number);

export function whatsappUrl(message: string): string {
  return `https://wa.me/${SITE.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/**
 * Destino de los CTA "Planear viaje" / "Cotizar": WhatsApp cuando exista
 * el número; mientras tanto, el widget de búsqueda del Home del idioma.
 */
export function planTripHref(lang: Lang, message: string): string {
  if (SITE.whatsapp.number) return whatsappUrl(message);
  return `${PAGE_PATHS.home[lang]}#planear`;
}

export type PartnerLink = {
  href: string;
  label: string;
};

/** Socios comerciales — se muestran en el footer. */
export const PARTNER_LINKS: PartnerLink[] = [
  { href: 'https://www.vallartamagico.com', label: 'Vallarta Mágico' },
  { href: 'https://www.praben.com', label: 'Praben' },
  { href: 'https://www.islamarietas.com', label: 'Islas Marietas' },
];
