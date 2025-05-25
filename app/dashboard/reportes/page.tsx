import React from 'react';
import ItemDashboard from '@/components/dashboard/ItemDashboard';
import { FiBarChart2 } from 'react-icons/fi';

const ReportesPage = () => {
  const reportesSubItems = [
    { 
      name: 'Reportes de Venta', 
      href: '/dashboard/reportes/ventas', 
      description: 'Análisis detallado de ventas' 
    },
    { 
      name: 'Reportes de Cobranza', 
      href: '/dashboard/reportes/cobranza', 
      description: 'Seguimiento de cobranza' 
    },
    { 
      name: 'Reportes de Cliente', 
      href: '/dashboard/reportes/clientes', 
      description: 'Estadísticas de clientes' 
    },
    { 
      name: 'Reportes de Producción', 
      href: '/dashboard/reportes/produccion', 
      description: 'Análisis de producción' 
    },
    { 
      name: 'Reportes de Siniestros', 
      href: '/dashboard/reportes/siniestros', 
      description: 'Estadísticas de siniestralidad' 
    },
    { 
      name: 'Reportes Personalizados', 
      href: '/dashboard/reportes/personalizados', 
      description: 'Creación de reportes a medida' 
    }
  ];

  return (
    <ItemDashboard 
      title="Reportes" 
      icon={<FiBarChart2 className="w-6 h-6" />} 
      subItems={reportesSubItems} 
    />
  );
};

export default ReportesPage;
