import { getImage } from 'astro:assets';

/**
 * Genera la imagen Open Graph (1200px, JPG — algunas redes no aceptan WebP)
 * a partir de la portada de una entrada. Sin portada → undefined (Layout usa su default).
 */
export async function ogImageDe(imagen?: { src: ImageMetadata }): Promise<string | undefined> {
  if (!imagen) return undefined;
  const og = await getImage({ src: imagen.src, width: 1200, format: 'jpg', quality: 80 });
  return og.src;
}
