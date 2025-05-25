import React from 'react';
import ItemDashboard from '@/components/dashboard/ItemDashboard';
import { FiAlertTriangle } from 'react-icons/fi';

const SiniestrosPage = () => {
  const siniestrosSubItems = [
    { 
      name: 'Gestión de Siniestros', 
      href: '/dashboard/siniestros/gestion', 
      description: 'Administra casos de siniestros' 
    },
    { 
      name: 'Reportar Siniestro', 
      href: '/dashboard/siniestros/reportar', 
      description: 'Crea un nuevo reporte de siniestro' 
    },
    { 
      name: 'Historial de Siniestros', 
      href: '/dashboard/siniestros/historial', 
      description: 'Consulta el historial completo' 
    },
    { 
      name: 'Seguimiento', 
      href: '/dashboard/siniestros/seguimiento', 
      description: 'Seguimiento de casos en proceso' 
    },
    { 
      name: 'Estadísticas', 
      href: '/dashboard/siniestros/estadisticas', 
      description: 'Análisis y métricas de siniestralidad' 
    },
    { 
      name: 'Importar Siniestros', 
      href: '/dashboard/siniestros/importar', 
      description: 'Importar datos de siniestros' 
    }
  ];

  return (
    <ItemDashboard 
      title="Siniestros" 
      icon={<FiAlertTriangle className="w-6 h-6" />} 
      subItems={siniestrosSubItems} 
    />
  );
};

export default SiniestrosPage;
