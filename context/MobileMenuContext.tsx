'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type MobileMenuContextType = {
  isOpen: boolean;
  toggleMenu: (isOpen: boolean) => void;
};

const MobileMenuContext = createContext<MobileMenuContextType | undefined>(undefined);

export function MobileMenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = (open: boolean) => {
    setIsOpen(open);
    document.body.classList.toggle('sidebar-mobile-active', open);
    
    // Bloquear el scroll cuando el menú está abierto
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  return (
    <MobileMenuContext.Provider value={{ isOpen, toggleMenu }}>
      {children}
    </MobileMenuContext.Provider>
  );
}

export function useMobileMenu() {
  const context = useContext(MobileMenuContext);
  if (context === undefined) {
    throw new Error('useMobileMenu debe usarse dentro de un MobileMenuProvider');
  }
  return context;
}
