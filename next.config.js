/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isGHPages = process.env.GITHUB_ACTIONS === 'true';
const repo = 'v1';
const basePath = isGHPages || isProd ? `/${repo}` : '';

// Validar variables de entorno de Supabase
if (isProd && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.warn('ADVERTENCIA: NEXT_PUBLIC_SUPABASE_URL no está definido');
}

if (isProd && !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn('ADVERTENCIA: NEXT_PUBLIC_SUPABASE_ANON_KEY no está definido');
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para GitHub Pages
  output: 'export',
  basePath: basePath,
  assetPrefix: basePath ? `${basePath}/` : '',
  trailingSlash: true,
  
  // Configuración de imágenes
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  
  // Configuración general
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  
  // Variables de entorno
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  
  // Configuración de webpack
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      dns: false,
      child_process: false,
      canvas: false,
    };
    return config;
  },
};

module.exports = nextConfig;
