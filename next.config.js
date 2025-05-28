/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const repo = 'v1'

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  // Configuración para GitHub Pages
  output: 'export',
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
  // Configuración de imágenes optimizadas para exportación
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
  },
  trailingSlash: true,
  compress: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  swcMinify: true,
  compiler: {
    removeConsole: isProd,
  },
  experimental: {
    optimizeCss: true,
  },
}

module.exports = withBundleAnalyzer(nextConfig)
