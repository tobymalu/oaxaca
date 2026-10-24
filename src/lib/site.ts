/**
 * Datos de marca centralizados. Todo componente que necesite nombre,
 * contacto o links de Visita Oaxaca debe importar de aquí — nunca
 * hardcodear estos valores en un componente individual.
 *
 * ⚠️ PENDIENTE: todavía no hay método de contacto. Los campos vacíos
 * (email, teléfono, WhatsApp, redes, GTM) no se renderizan en ningún
 * componente hasta que se llenen aquí.
 */

export const SITE = {
  name: 'Visita Oaxaca',
  tagline: 'Tu guía para descubrir Oaxaca: cultura, gastronomía, mezcal y costa',
  // <title> y meta description por defecto (Layout.astro) cuando la página no pasa los suyos.
  defaultTitle: 'Visita Oaxaca | Experiencias, Tours y Cultura',
  defaultDescription:
    'Descubre la magia de Oaxaca. Reserva tours exclusivos, conoce nuestra gastronomía, historia y vive experiencias auténticas con expertos locales.',
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
    defaultMessage: 'Hola, me gustaría información para visitar Oaxaca.',
  },
  social: {
    // TODO: completar o quitar las redes que no apliquen
    instagram: '',
    facebook: '',
    tiktok: '',
  },
  // TODO: ID real de Google Tag Manager (o PUBLIC_GTM_ID en el entorno)
  gtmId: '',
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

export function whatsappUrl(message: string = SITE.whatsapp.defaultMessage): string {
  return `https://wa.me/${SITE.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export type NavLink = {
  href: string;
  label: string;
};

// Solo rutas que ya existen — agregar cada link cuando su página esté lista.
export const NAV_LINKS: NavLink[] = [{ href: '/', label: 'Inicio' }];

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
