import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0B2447',
};

export const metadata: Metadata = {
  title: 'HubSeguros - La plataforma que simplifica tu trabajo como agente de seguros',
  description: 'Gestiona clientes, pólizas y siniestros en un solo lugar. Ahorra tiempo y aumenta tu productividad.',
  metadataBase: new URL('https://hubdeseguros.github.io/v1/'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'HubSeguros - Plataforma para agentes de seguros',
    description: 'Gestiona clientes, pólizas y siniestros en un solo lugar.',
    type: 'website',
    locale: 'es_ES',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} font-sans`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
