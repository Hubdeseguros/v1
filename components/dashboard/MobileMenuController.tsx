"use client";

import { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { useMobileMenu } from '@/context/MobileMenuContext';

export default function MobileMenuController() {
  const { isOpen: isSidebarOpen, toggleMenu: toggleSidebar } = useMobileMenu();
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const touchStartTime = useRef(0);
  
  // Manejar gestos táctiles
  const handleTouchStart = (e: TouchEvent) => {
    if (!isSidebarOpen) return;
    touchStartTime.current = e.timeStamp;
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isSidebarOpen) return;
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isSidebarOpen) return;
    
    const touchDuration = Date.now() - touchStartTime.current;
    const swipeDistance = touchStart - touchEnd;
    const isSwipe = touchDuration < 300 && Math.abs(swipeDistance) > 50;
    
    if (isSwipe && swipeDistance > 0) {
      toggleSidebar(false);
    }
  };
  
  // Cerrar el sidebar cuando se hace clic en un enlace o fuera
  useEffect(() => {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      return;
    }
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isSidebar = target.closest('.bg-primary.text-white.h-screen.w-64');
      const isMenuButton = target.closest('.mobile-menu-button');
      
      if (isSidebarOpen && !isSidebar && !isMenuButton) {
        toggleSidebar(false);
      }
    };
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        toggleSidebar(false);
      }
    };
    
    // Añadir event listeners para gestos táctiles
    const sidebar = document.querySelector('.bg-primary.text-white.h-screen.w-64');
    if (sidebar) {
      sidebar.addEventListener('touchstart', handleTouchStart as EventListener);
      sidebar.addEventListener('touchmove', handleTouchMove as EventListener);
      sidebar.addEventListener('touchend', handleTouchEnd);
    }
    
    // Cerrar el menú al hacer clic en cualquier enlace
    const closeOnLinkClick = () => {
      if (window.innerWidth < 768) { // Solo en móviles
        toggleSidebar(false);
      }
    };
    
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', closeOnLinkClick);
    });
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      if (sidebar) {
        sidebar.removeEventListener('touchstart', handleTouchStart as EventListener);
        sidebar.removeEventListener('touchmove', handleTouchMove as EventListener);
        sidebar.removeEventListener('touchend', handleTouchEnd);
      }
      
      links.forEach(link => {
        link.removeEventListener('click', closeOnLinkClick);
      });
      
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = ''; // Asegurarse de restaurar el scroll
    };
  }, [isSidebarOpen, toggleSidebar]);
  
  // Cerrar el sidebar en cambio de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isSidebarOpen) {
        toggleSidebar(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarOpen]);
  
  return (
    <>
      <button 
        onClick={() => toggleSidebar(!isSidebarOpen)}
        className="mobile-menu-button md:hidden"
        aria-label={isSidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isSidebarOpen}
        aria-controls="sidebar-navigation"
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>
      
      <div 
        className="sidebar-overlay" 
        onClick={() => toggleSidebar(false)}
        aria-hidden={!isSidebarOpen}
        style={{
          opacity: isSidebarOpen ? 1 : 0,
          pointerEvents: isSidebarOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease-in-out'
        }}
      />
    </>
  );
}
