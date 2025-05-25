/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Configuración para GitHub Pages
  basePath: '/v1',
  assetPrefix: '/v1/',
  trailingSlash: true,
}

module.exports = nextConfig
