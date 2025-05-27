import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import MobileMenuController from '@/components/dashboard/MobileMenuController';
import { MobileMenuProvider } from '@/context/MobileMenuContext';
import '../responsive.css';

export default function ClienteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MobileMenuProvider>
      <div className="flex flex-col md:flex-row h-screen bg-gray-100 overflow-hidden">
        {/* Controlador del menú móvil */}
        <MobileMenuController />
        
        {/* Sidebar */}
        <div className="md:block">
          <Sidebar role="CLIENTE" className="w-64" />
        </div>
        
        {/* Contenido principal */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header role="CLIENTE" />
          
          {/* Contenido */}
          <main className="flex-1 overflow-y-auto p-2 md:p-4">
            {children}
          </main>
        </div>
      </div>
    </MobileMenuProvider>
  );
}
