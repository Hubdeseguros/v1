/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const isGHPages = process.env.GITHUB_ACTIONS === 'true'
const repo = 'v1'

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  // Configuración para GitHub Pages
  basePath: isGHPages || isProd ? `/${repo}` : '',
  assetPrefix: isGHPages || isProd ? `/${repo}/` : '',
  output: 'export',
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    disableStaticImages: true
  },
  trailingSlash: true,
  compress: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: isProd
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isGHPages || isProd ? `/${repo}` : ''
  },
  webpack: (config, { isServer }) => {
    // Configuración de webpack para ignorar módulos problemáticos
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
  experimental: {
    optimizeCss: true,
  },
  // Configuración adicional para GitHub Pages
  publicRuntimeConfig: {
    basePath: isProd ? `/${repo}` : '',
  },
}

module.exports = withBundleAnalyzer(nextConfig)
