import React from 'react';
import ItemDashboard from '@/components/dashboard/ItemDashboard';
import { FiSend } from 'react-icons/fi';

const RemisionesPage = () => {
  const remisionesSubItems = [
    { 
      name: 'Crear remisión', 
      href: '/dashboard/remisiones/crear', 
      description: 'Genera una nueva remisión' 
    },
    { 
      name: 'Listado de remisión', 
      href: '/dashboard/remisiones/listado', 
      description: 'Consulta todas las remisiones' 
    },
    { 
      name: 'Seguimiento', 
      href: '/dashboard/remisiones/seguimiento', 
      description: 'Control y seguimiento de remisiones' 
    },
    { 
      name: 'Reportes', 
      href: '/dashboard/remisiones/reportes', 
      description: 'Informes de remisiones' 
    },
    { 
      name: 'Histórico', 
      href: '/dashboard/remisiones/historico', 
      description: 'Historial de remisiones' 
    },
    { 
      name: 'Configuración', 
      href: '/dashboard/remisiones/configuracion', 
      description: 'Ajustes de remisiones' 
    }
  ];

  return (
    <ItemDashboard 
      title="Remisiones" 
      icon={<FiSend className="w-6 h-6" />} 
      subItems={remisionesSubItems} 
    />
  );
};

export default RemisionesPage;
