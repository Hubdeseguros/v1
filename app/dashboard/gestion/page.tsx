import React from 'react';
import ItemDashboard from '@/components/dashboard/ItemDashboard';
import { FiFolder } from 'react-icons/fi';

const GestionPage = () => {
  const gestionSubItems = [
    { 
      name: 'Archivos', 
      href: '/dashboard/gestion/archivos', 
      description: 'Gestión documental' 
    },
    { 
      name: 'Facturas', 
      href: '/dashboard/gestion/facturas', 
      description: 'Administración de facturas' 
    },
    { 
      name: 'Diligencias', 
      href: '/dashboard/gestion/diligencias', 
      description: 'Seguimiento de trámites' 
    },
    { 
      name: 'Documentos', 
      href: '/dashboard/gestion/documentos', 
      description: 'Gestión de documentos importantes' 
    },
    { 
      name: 'Plantillas', 
      href: '/dashboard/gestion/plantillas', 
      description: 'Administración de plantillas' 
    },
    { 
      name: 'Correspondencia', 
      href: '/dashboard/gestion/correspondencia', 
      description: 'Control de correspondencia' 
    }
  ];

  return (
    <ItemDashboard 
      title="Gestión" 
      icon={<FiFolder className="w-6 h-6" />} 
      subItems={gestionSubItems} 
    />
  );
};

export default GestionPage;
