import { DEFAULT_LANG, LANGS, PAGE_PATHS, SILO_PATHS, type Lang } from './rutas';

/**
 * Textos de interfaz por idioma. El contenido editorial vive en los .mdx;
 * aquí solo va lo que pintan los componentes. `en` debe tener exactamente
 * las mismas llaves que `es` (lo verifica el tipo `Diccionario`).
 */
const es = {
  meta: {
    defaultTitle: 'Visita Oaxaca | Experiencias, Tours y Cultura',
    defaultDescription:
      'Descubre la magia de Oaxaca. Reserva tours exclusivos, conoce nuestra gastronomía, historia y vive experiencias auténticas con expertos locales.',
    tagline: 'Tu guía para descubrir Oaxaca: cultura, gastronomía, mezcal y costa',
  },
  a11y: {
    skipToContent: 'Saltar al contenido',
    mainNav: 'Principal',
    mobileNav: 'Principal móvil',
    openMenu: 'Abrir menú',
    breadcrumbs: 'Migas de pan',
    photoPending: 'Foto pendiente',
    whatsapp: 'Escríbenos por WhatsApp',
  },
  nav: {
    destinos: 'Destinos',
    experiencias: 'Experiencias',
    gastronomia: 'Gastronomía',
    servicios: 'Servicios',
    planTrip: 'Planear viaje',
    home: 'Inicio',
  },
  langSwitch: { label: 'English', short: 'EN', aria: 'Ver esta página en inglés' },
  whatsappMessages: {
    default: 'Hola, me gustaría información para visitar Oaxaca.',
    quote: 'Hola, me gustaría cotizar un servicio con Visita Oaxaca.',
    interest: (nombre: string) => `Hola, me interesa "${nombre}". ¿Me pueden dar disponibilidad?`,
  },
  hero: {
    eyebrow: 'Oaxaca, México',
    h1: 'Descubre el Alma de México: Experiencias Auténticas en Oaxaca',
    subtitle: 'Tours, hospedaje y traslados en los Valles Centrales, la Costa y la Sierra Norte, con expertos locales.',
    imageAlt: 'Templo de Santo Domingo de Guzmán al atardecer, con un framboyán en flor en primer plano',
  },
  search: {
    legend: '¿Qué estás buscando?',
    tabs: { tours: 'Tours', hospedaje: 'Hospedaje', traslados: 'Traslados' },
    query: 'Destino o actividad',
    placeholder: 'Ej. Hierve el Agua',
    arrival: 'Llegada',
    departure: 'Salida',
    submit: 'Buscar',
  },
  home: {
    regiones: { eyebrow: 'Destinos', title: 'Explora las Regiones de Oaxaca', hub: 'Ver todos los destinos' },
    experiencias: {
      eyebrow: 'Tours',
      title: 'Experiencias Inolvidables',
      intro: 'Precios finales y transparentes: lo que ves es lo que pagas, sin costos ocultos.',
      hub: 'Ver todas las experiencias',
      listLabel: 'Experiencias destacadas',
    },
    servicios: {
      eyebrow: 'Servicios premium',
      title: 'Tu viaje resuelto, de principio a fin',
      intro: 'Para viajeros que quieren vivir Oaxaca sin preocuparse por la logística.',
      imageAlt: 'Fachada del templo de Santo Domingo en Oaxaca, sede tradicional de bodas',
      cta: 'Solicitar cotización',
      hub: 'Ver todos los servicios',
    },
    guia: { eyebrow: 'Gastronomía', title: 'Guía Local: Lo que debes saber', hub: 'Ver la guía gastronómica' },
  },
  cards: {
    guideSoon: 'Guía próximamente',
    soon: 'Próximamente',
    ratingMissing: 'Calificación: [DATO FALTANTE]',
    reviews: (n: number) => `(${n} reseñas)`,
    from: 'Desde',
    details: 'Ver detalles',
    detailsOf: (nombre: string) => ` de ${nombre}`,
    readArticle: 'Leer artículo →',
  },
  categorias: { mercados: 'Mercados', mezcal: 'Mezcal', platillos: 'Platillos', restaurantes: 'Restaurantes' },
  silos: {
    destinos: {
      title: 'Destinos en Oaxaca: regiones y lugares que visitar',
      description:
        'Descubre los destinos de Oaxaca: Valles Centrales, Costa Oaxaqueña y Sierra Norte. Qué ver, qué hacer y cómo planear tu viaje por cada región.',
      eyebrow: 'Destinos',
      h1: 'Destinos de Oaxaca: Valles Centrales, Costa y Sierra Norte',
      intro:
        'De las zonas arqueológicas de los Valles Centrales a las playas del Pacífico y los bosques de niebla de la Sierra Norte. Elige la región que quieres explorar.',
      listLabel: 'Listado de destinos',
    },
    experiencias: {
      title: 'Tours y experiencias en Oaxaca: precios sin costos ocultos',
      description:
        'Tours y experiencias en Oaxaca: Hierve el Agua, Monte Albán, Ruta del Mezcal, tours gastronómicos y más. Precios claros y guías locales.',
      eyebrow: 'Tours y experiencias',
      h1: 'Experiencias y Tours en Oaxaca',
      intro:
        'Zonas arqueológicas, palenques de mezcal, mercados y maravillas naturales. Cada experiencia muestra su precio final: lo que ves es lo que pagas.',
      listLabel: 'Listado de experiencias',
    },
    gastronomia: {
      title: 'Guía gastronómica de Oaxaca: mercados, mezcal y platillos',
      description:
        'Qué comer y beber en Oaxaca: mercados tradicionales, tlayudas, moles, chocolate y los mejores palenques de mezcal. Guía gastronómica local.',
      eyebrow: 'Gastronomía',
      h1: 'Guía Gastronómica de Oaxaca',
      intro:
        'Mercados llenos de humo y color, moles de siglos de tradición y mezcal artesanal. Todo lo que tienes que probar en Oaxaca y dónde encontrarlo.',
      listLabel: 'Artículos de gastronomía',
    },
    servicios: {
      title: 'Servicios para viajeros en Oaxaca: traslados, bodas y viajes',
      description:
        'Traslados privados aeropuerto–hotel, bodas de destino y viajes a la medida en Oaxaca. Servicios premium con expertos locales y precios claros.',
      eyebrow: 'Servicios premium',
      h1: 'Servicios para Viajeros en Oaxaca: Traslados, Bodas y Viajes a la Medida',
      intro:
        'Resolvemos la logística de tu viaje para que solo te ocupes de disfrutar Oaxaca: transporte privado, planeación de bodas de destino e itinerarios diseñados para ti.',
      listLabel: 'Listado de servicios',
    },
    empty: 'Estamos preparando este contenido. Vuelve pronto.',
  },
  detalle: {
    experiencia: 'Experiencia',
    servicio: 'Servicio premium',
    gastronomia: 'Gastronomía',
    destino: 'Destino',
    contentMissing: '[DATO FALTANTE]: contenido de este artículo.',
    moreAbout: (nombre: string) => `Más sobre ${nombre}`,
    experiencesIn: (nombre: string) => `Experiencias en ${nombre}`,
  },
  precios: {
    title: 'Precio',
    from: 'Desde',
    addons: 'Extras opcionales',
    guarantee: 'Precio final, sin costos ocultos.',
    bookWhatsapp: 'Reservar por WhatsApp',
    requestQuote: 'Solicitar cotización',
  },
  footer: {
    popular: 'Categorías populares',
    popularLinks: {
      destinos: 'Regiones de Oaxaca',
      experiencias: 'Tours y experiencias',
      gastronomia: 'Guía gastronómica',
      servicios: 'Traslados y bodas de destino',
    },
    legal: 'Legal',
    privacy: 'Aviso de privacidad',
    cancellations: 'Políticas de cancelación',
    partners: 'Socios comerciales',
    newsletter: 'Newsletter',
    newsletterText: 'Fechas de festividades, nuevas experiencias y guías locales, directo a tu correo.',
    emailLabel: 'Correo electrónico',
    emailPlaceholder: 'tu@correo.com',
    subscribe: 'Suscribirme',
    newsletterMissing: '[DATO FALTANTE]: proveedor de newsletter.',
    rights: 'Todos los derechos reservados.',
  },
  cookies: {
    aria: 'Preferencias de cookies',
    text: 'Usamos cookies para medir el rendimiento del sitio y mejorar tu experiencia. Puedes aceptarlas o rechazarlas — no afecta tu acceso al contenido.',
    accept: 'Aceptar',
    reject: 'Rechazar',
  },
  placeholder: { backHome: 'Volver al inicio' },
  pages: {
    buscar: {
      title: 'Buscar tours, hospedaje y traslados',
      description: 'Busca experiencias, hospedaje y traslados en Oaxaca.',
      eyebrow: 'Planea tu viaje',
      heading: 'Estamos preparando el catálogo',
      body: 'Muy pronto podrás reservar tours, hospedaje y traslados en Oaxaca desde aquí.',
      missing: 'catálogo de tours/hospedaje/traslados y método de contacto.',
    },
    privacidad: {
      title: 'Aviso de privacidad',
      description: 'Aviso de privacidad de Visita Oaxaca.',
      eyebrow: 'Legal',
      heading: 'Aviso de privacidad',
      body: 'Este documento se publicará antes de empezar a recabar datos personales.',
      missing: 'texto legal del aviso de privacidad (responsable, datos recabados, finalidades, derechos ARCO).',
    },
    cancelaciones: {
      title: 'Políticas de cancelación',
      description: 'Políticas de cancelación y reembolso de Visita Oaxaca.',
      eyebrow: 'Legal',
      heading: 'Políticas de cancelación',
      body: 'Las condiciones de cancelación se publicarán junto con las primeras experiencias reservables.',
      missing: 'plazos de cancelación, porcentajes de reembolso y excepciones por proveedor.',
    },
  },
};

type Diccionario = typeof es;

const en: Diccionario = {
  meta: {
    defaultTitle: 'Visita Oaxaca | Oaxaca Tours, Experiences and Culture',
    defaultDescription:
      'Discover the magic of Oaxaca. Book unique tours, explore its food and history, and enjoy authentic experiences with local experts.',
    tagline: 'Your guide to discovering Oaxaca: culture, food, mezcal and coast',
  },
  a11y: {
    skipToContent: 'Skip to content',
    mainNav: 'Main',
    mobileNav: 'Main mobile',
    openMenu: 'Open menu',
    breadcrumbs: 'Breadcrumb',
    photoPending: 'Photo pending',
    whatsapp: 'Message us on WhatsApp',
  },
  nav: {
    destinos: 'Destinations',
    experiencias: 'Experiences',
    gastronomia: 'Food',
    servicios: 'Services',
    planTrip: 'Plan your trip',
    home: 'Home',
  },
  langSwitch: { label: 'Español', short: 'ES', aria: 'Ver esta página en español' },
  whatsappMessages: {
    default: "Hi, I'd like information about visiting Oaxaca.",
    quote: "Hi, I'd like a quote for a service with Visita Oaxaca.",
    interest: (nombre: string) => `Hi, I'm interested in "${nombre}". Could you share availability?`,
  },
  hero: {
    eyebrow: 'Oaxaca, Mexico',
    h1: 'Discover the Soul of Mexico: Authentic Experiences in Oaxaca',
    subtitle: 'Tours, lodging and transfers in the Central Valleys, the Coast and the Sierra Norte, with local experts.',
    imageAlt: 'Santo Domingo de Guzmán church at sunset, with a flowering flame tree in the foreground',
  },
  search: {
    legend: 'What are you looking for?',
    tabs: { tours: 'Tours', hospedaje: 'Lodging', traslados: 'Transfers' },
    query: 'Destination or activity',
    placeholder: 'e.g. Hierve el Agua',
    arrival: 'Arrival',
    departure: 'Departure',
    submit: 'Search',
  },
  home: {
    regiones: { eyebrow: 'Destinations', title: 'Explore the Regions of Oaxaca', hub: 'See all destinations' },
    experiencias: {
      eyebrow: 'Tours',
      title: 'Unforgettable Experiences',
      intro: 'Final, transparent prices: what you see is what you pay, no hidden fees.',
      hub: 'See all experiences',
      listLabel: 'Featured experiences',
    },
    servicios: {
      eyebrow: 'Premium services',
      title: 'Your trip, handled from start to finish',
      intro: 'For travelers who want to enjoy Oaxaca without worrying about logistics.',
      imageAlt: 'Façade of Santo Domingo church in Oaxaca, a traditional wedding venue',
      cta: 'Request a quote',
      hub: 'See all services',
    },
    guia: { eyebrow: 'Food & drink', title: 'Local Guide: What You Need to Know', hub: 'See the food guide' },
  },
  cards: {
    guideSoon: 'Guide coming soon',
    soon: 'Coming soon',
    ratingMissing: 'Rating: [DATO FALTANTE]',
    reviews: (n: number) => `(${n} reviews)`,
    from: 'From',
    details: 'View details',
    detailsOf: (nombre: string) => ` of ${nombre}`,
    readArticle: 'Read article →',
  },
  categorias: { mercados: 'Markets', mezcal: 'Mezcal', platillos: 'Dishes', restaurantes: 'Restaurants' },
  silos: {
    destinos: {
      title: 'Oaxaca Destinations: Regions and Places to Visit',
      description:
        "Discover Oaxaca's destinations: the Central Valleys, the Oaxacan Coast and the Sierra Norte. What to see, what to do and how to plan your trip to each region.",
      eyebrow: 'Destinations',
      h1: 'Oaxaca Destinations: Central Valleys, Coast and Sierra Norte',
      intro:
        'From the archaeological sites of the Central Valleys to the Pacific beaches and the cloud forests of the Sierra Norte. Choose the region you want to explore.',
      listLabel: 'Destinations list',
    },
    experiencias: {
      title: 'Oaxaca Tours and Experiences: No Hidden Fees',
      description:
        'Tours and experiences in Oaxaca: Hierve el Agua, Monte Albán, the Mezcal Route, food tours and more. Clear prices and local guides.',
      eyebrow: 'Tours & experiences',
      h1: 'Oaxaca Tours and Experiences',
      intro:
        'Archaeological sites, mezcal distilleries, markets and natural wonders. Every experience shows its final price: what you see is what you pay.',
      listLabel: 'Experiences list',
    },
    gastronomia: {
      title: 'Oaxaca Food Guide: Markets, Mezcal and Local Dishes',
      description:
        'What to eat and drink in Oaxaca: traditional markets, tlayudas, moles, chocolate and the best mezcal palenques. A local food guide.',
      eyebrow: 'Food & drink',
      h1: 'Oaxaca Food Guide',
      intro:
        'Smoky, colorful markets, centuries-old moles and handcrafted mezcal. Everything you have to try in Oaxaca and where to find it.',
      listLabel: 'Food articles',
    },
    servicios: {
      title: 'Oaxaca Travel Services: Transfers, Weddings and Custom Trips',
      description:
        'Private airport–hotel transfers, destination weddings and custom trips in Oaxaca. Premium services with local experts and clear prices.',
      eyebrow: 'Premium services',
      h1: 'Travel Services in Oaxaca: Transfers, Weddings and Custom Trips',
      intro:
        'We take care of your trip logistics so you can simply enjoy Oaxaca: private transportation, destination wedding planning and itineraries designed for you.',
      listLabel: 'Services list',
    },
    empty: "We're preparing this content. Check back soon.",
  },
  detalle: {
    experiencia: 'Experience',
    servicio: 'Premium service',
    gastronomia: 'Food & drink',
    destino: 'Destination',
    contentMissing: '[DATO FALTANTE]: article content.',
    moreAbout: (nombre: string) => `More about ${nombre}`,
    experiencesIn: (nombre: string) => `Experiences in ${nombre}`,
  },
  precios: {
    title: 'Price',
    from: 'From',
    addons: 'Optional extras',
    guarantee: 'Final price, no hidden fees.',
    bookWhatsapp: 'Book on WhatsApp',
    requestQuote: 'Request a quote',
  },
  footer: {
    popular: 'Popular categories',
    popularLinks: {
      destinos: 'Oaxaca regions',
      experiencias: 'Tours and experiences',
      gastronomia: 'Food guide',
      servicios: 'Transfers and destination weddings',
    },
    legal: 'Legal',
    privacy: 'Privacy notice',
    cancellations: 'Cancellation policy',
    partners: 'Partners',
    newsletter: 'Newsletter',
    newsletterText: 'Festival dates, new experiences and local guides, straight to your inbox.',
    emailLabel: 'Email address',
    emailPlaceholder: 'you@email.com',
    subscribe: 'Subscribe',
    newsletterMissing: '[DATO FALTANTE]: newsletter provider.',
    rights: 'All rights reserved.',
  },
  cookies: {
    aria: 'Cookie preferences',
    text: 'We use cookies to measure site performance and improve your experience. You can accept or reject them — it does not affect your access to the content.',
    accept: 'Accept',
    reject: 'Reject',
  },
  placeholder: { backHome: 'Back to home' },
  pages: {
    buscar: {
      title: 'Search tours, lodging and transfers',
      description: 'Search experiences, lodging and transfers in Oaxaca.',
      eyebrow: 'Plan your trip',
      heading: "We're building the catalog",
      body: 'Soon you will be able to book tours, lodging and transfers in Oaxaca right here.',
      missing: 'tours/lodging/transfers catalog and contact method.',
    },
    privacidad: {
      title: 'Privacy notice',
      description: 'Visita Oaxaca privacy notice.',
      eyebrow: 'Legal',
      heading: 'Privacy notice',
      body: 'This document will be published before we start collecting personal data.',
      missing: 'legal text of the privacy notice (data controller, data collected, purposes, ARCO rights).',
    },
    cancelaciones: {
      title: 'Cancellation policy',
      description: 'Visita Oaxaca cancellation and refund policy.',
      eyebrow: 'Legal',
      heading: 'Cancellation policy',
      body: 'Cancellation terms will be published along with the first bookable experiences.',
      missing: 'cancellation deadlines, refund percentages and provider exceptions.',
    },
  },
};

const UI: Record<Lang, Diccionario> = { es, en };

/** Idioma de la página actual (Astro.currentLocale), con fallback al español. */
export function getLang(locale: string | undefined): Lang {
  return LANGS.includes(locale as Lang) ? (locale as Lang) : DEFAULT_LANG;
}

export function useT(lang: Lang): Diccionario {
  return UI[lang];
}

export type NavLink = { href: string; label: string };

/** Links del navbar (hubs de cada silo) en el idioma dado. */
export function navLinks(lang: Lang): NavLink[] {
  const t = UI[lang];
  return (['destinos', 'experiencias', 'gastronomia', 'servicios'] as const).map((silo) => ({
    href: SILO_PATHS[silo][lang],
    label: t.nav[silo],
  }));
}

export function popularLinks(lang: Lang): NavLink[] {
  const t = UI[lang];
  return (['destinos', 'experiencias', 'gastronomia', 'servicios'] as const).map((silo) => ({
    href: SILO_PATHS[silo][lang],
    label: t.footer.popularLinks[silo],
  }));
}

export function legalLinks(lang: Lang): NavLink[] {
  const t = UI[lang];
  return [
    { href: PAGE_PATHS.privacidad[lang], label: t.footer.privacy },
    { href: PAGE_PATHS.cancelaciones[lang], label: t.footer.cancellations },
  ];
}
