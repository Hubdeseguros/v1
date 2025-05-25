"use client";

import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export default function MobileMenuController() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    
    // Añadir o quitar la clase del body para controlar el sidebar
    if (!isSidebarOpen) {
      document.body.classList.add('sidebar-mobile-active');
    } else {
      document.body.classList.remove('sidebar-mobile-active');
    }
  };
  
  // Cerrar el sidebar cuando se hace clic en un enlace
  useEffect(() => {
    const handleLinkClick = () => {
      if (isSidebarOpen && window.innerWidth < 768) {
        setIsSidebarOpen(false);
        document.body.classList.remove('sidebar-mobile-active');
      }
    };
    
    // Añadir listener a todos los enlaces dentro del sidebar
    const sidebarLinks = document.querySelectorAll('.bg-primary.text-white.h-screen.w-64 a');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', handleLinkClick);
    });
    
    return () => {
      sidebarLinks.forEach(link => {
        link.removeEventListener('click', handleLinkClick);
      });
    };
  }, [isSidebarOpen]);
  
  // Cerrar el sidebar cuando se redimensiona la ventana a un tamaño de escritorio
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isSidebarOpen) {
        setIsSidebarOpen(false);
        document.body.classList.remove('sidebar-mobile-active');
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isSidebarOpen]);
  
  return (
    <>
      {/* Botón de hamburguesa para móvil */}
      <button 
        onClick={toggleSidebar}
        className="mobile-menu-button md:hidden"
        aria-label="Abrir menú"
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
      
      {/* Overlay para cerrar el sidebar al hacer clic fuera */}
      <div 
        className="sidebar-overlay" 
        onClick={toggleSidebar}
        aria-hidden="true"
      ></div>
    </>
  );
}
