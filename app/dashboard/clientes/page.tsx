import React from 'react';
import ItemDashboard from '@/components/dashboard/ItemDashboard';
import { FiUsers } from 'react-icons/fi';

const ClientesPage = () => {
  const clientesSubItems = [
    { 
      name: 'Listado de Clientes', 
      href: '/dashboard/clientes/listado', 
      description: 'Gestiona tu cartera de clientes' 
    },
    { 
      name: 'Asistente Comercial/CRM', 
      href: '/dashboard/clientes/crm', 
      description: 'Seguimiento de oportunidades comerciales' 
    },
    { 
      name: 'Importar Clientes', 
      href: '/dashboard/clientes/importar', 
      description: 'Importar base de datos de clientes' 
    },
    { 
      name: 'Exportar Clientes', 
      href: '/dashboard/clientes/exportar', 
      description: 'Exportar información de clientes' 
    },
    { 
      name: 'Estadísticas', 
      href: '/dashboard/clientes/estadisticas', 
      description: 'Análisis y métricas de clientes' 
    },
    { 
      name: 'Segmentación', 
      href: '/dashboard/clientes/segmentacion', 
      description: 'Clasificación y segmentación de clientes' 
    }
  ];

  return (
    <ItemDashboard 
      title="Clientes" 
      icon={<FiUsers className="w-6 h-6" />} 
      subItems={clientesSubItems} 
    />
  );
};

export default ClientesPage;
