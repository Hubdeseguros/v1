import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HubSeguros - La plataforma que simplifica tu trabajo como agente de seguros',
  description: 'Gestiona clientes, pólizas y siniestros en un solo lugar. Ahorra tiempo y aumenta tu productividad.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
