/**
 * Configuración de optimización de imágenes
 * 
 * Este archivo contiene configuraciones para optimizar las imágenes
 * de manera consistente en toda la aplicación.
 */

import { ImageLoader } from 'next/image';

// Configuración de tamaños de imagen comunes
export const IMAGE_SIZES = {
  thumbnail: '100',
  small: '300',
  medium: '600',
  large: '900',
  xlarge: '1200',
  full: '1920',
} as const;

// Tipos para tamaños de imagen
export type ImageSize = keyof typeof IMAGE_SIZES;

/**
 * Cargador de imágenes optimizado
 * 
 * @param src - Ruta de la imagen
 * @param width - Ancho deseado
 * @param quality - Calidad de la imagen (1-100)
 * @returns URL de la imagen optimizada
 */
export const imageLoader: ImageLoader = ({ src, width, quality = 75 }) => {
  // Si es una URL absoluta, devolverla sin cambios
  if (src.startsWith('http') || src.startsWith('//')) {
    return src;
  }
  
  // Para imágenes locales, asegurarse de que tengan el prefijo correcto
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const prefix = src.startsWith('/') ? '' : '/';
  
  // Si no se especifica ancho, devolver la imagen original
  if (!width) {
    return `${basePath}${prefix}${src}`;
  }
  
  // Para imágenes estáticas, usar el optimizador de Next.js
  return `${basePath}/_next/image?url=${encodeURIComponent(
    prefix + src
  )}&w=${width}&q=${quality}`;
};

/**
 * Obtener el tamaño de imagen más adecuado
 */
export const getOptimalImageSize = (desiredWidth: number): number => {
  const sizes = Object.values(IMAGE_SIZES).map(Number);
  
  // Encontrar el tamaño más pequeño que sea mayor o igual al ancho deseado
  const optimalSize = sizes.find(size => size >= desiredWidth) || sizes[sizes.length - 1];
  
  return optimalSize;
};
