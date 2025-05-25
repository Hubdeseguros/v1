/**
 * Utilidades para optimización de rendimiento en dispositivos móviles y PC
 */

// Detectar si el dispositivo es móvil
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

// Optimizar carga de imágenes
export const getOptimizedImageUrl = (url: string, width: number): string => {
  // Si ya es una URL optimizada o es un SVG, devolverla tal cual
  if (url.includes('?w=') || url.endsWith('.svg')) {
    return url;
  }
  
  // Añadir parámetro de ancho para optimizar la imagen
  return `${url}?w=${width}&q=${width > 768 ? 75 : 60}`;
};

// Debounce para eventos de scroll y resize
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
): ((...args: Parameters<F>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<F>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
};

// Optimizar renderizado de listas largas
export const optimizeListRendering = <T>(
  items: T[],
  currentPage: number,
  itemsPerPage: number
): T[] => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return items.slice(startIndex, startIndex + itemsPerPage);
};

// Cachear resultados de funciones costosas
const memoizationCache = new Map<string, any>();

export const memoize = <T>(fn: (...args: any[]) => T): ((...args: any[]) => T) => {
  return (...args: any[]): T => {
    const key = JSON.stringify(args);
    if (memoizationCache.has(key)) {
      return memoizationCache.get(key);
    }
    
    const result = fn(...args);
    memoizationCache.set(key, result);
    return result;
  };
};

// Limpiar caché de memoización
export const clearMemoizationCache = (): void => {
  memoizationCache.clear();
};

// Optimizar detección de cambios de tamaño de pantalla
export const createResizeObserver = (
  element: HTMLElement,
  callback: (entry: ResizeObserverEntry) => void
): ResizeObserver => {
  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      callback(entry);
    }
  });
  
  observer.observe(element);
  return observer;
};

// Optimizar manejo de eventos táctiles
export const optimizeTouchEvents = (element: HTMLElement): void => {
  element.style.touchAction = 'manipulation';
  element.addEventListener('touchstart', () => {}, { passive: true });
};

// Optimizar carga de fuentes
export const optimizeFontLoading = (): void => {
  if (typeof document === 'undefined') return;
  
  // Añadir atributo font-display=swap a todas las fuentes
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-display: swap;
    }
  `;
  document.head.appendChild(style);
};

// Optimizar renderizado de componentes
export const shouldComponentUpdate = (
  prevProps: Record<string, any>,
  nextProps: Record<string, any>
): boolean => {
  return Object.keys(nextProps).some(key => prevProps[key] !== nextProps[key]);
};
