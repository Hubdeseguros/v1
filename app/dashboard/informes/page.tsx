import React from 'react';
import ItemDashboard from '@/components/dashboard/ItemDashboard';
import { FiPieChart } from 'react-icons/fi';

const InformesPage = () => {
  const informesSubItems = [
    { 
      name: 'Informes Financieros', 
      href: '/dashboard/informes/financieros', 
      description: 'Reportes financieros detallados' 
    },
    { 
      name: 'Informes de Producción', 
      href: '/dashboard/informes/produccion', 
      description: 'Análisis de producción y ventas' 
    },
    { 
      name: 'Informes de Siniestralidad', 
      href: '/dashboard/informes/siniestralidad', 
      description: 'Estadísticas de siniestros' 
    },
    { 
      name: 'Informes de Clientes', 
      href: '/dashboard/informes/clientes', 
      description: 'Análisis de cartera de clientes' 
    },
    { 
      name: 'Informes de Comisiones', 
      href: '/dashboard/informes/comisiones', 
      description: 'Reportes de comisiones y pagos' 
    },
    { 
      name: 'Exportar Informes', 
      href: '/dashboard/informes/exportar', 
      description: 'Exportar informes en diferentes formatos' 
    }
  ];

  return (
    <ItemDashboard 
      title="Informes" 
      icon={<FiPieChart className="w-6 h-6" />} 
      subItems={informesSubItems} 
    />
  );
};

export default InformesPage;
