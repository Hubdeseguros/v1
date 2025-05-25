import React from 'react';
import ItemDashboard from '@/components/dashboard/ItemDashboard';
import { FiFileText } from 'react-icons/fi';

const PolizasPage = () => {
  const polizasSubItems = [
    { 
      name: 'Listado de Pólizas', 
      href: '/dashboard/polizas/listado', 
      description: 'Gestiona todas tus pólizas' 
    },
    { 
      name: 'Cumplimiento', 
      href: '/dashboard/polizas/cumplimiento', 
      description: 'Pólizas de cumplimiento' 
    },
    { 
      name: 'Judicial', 
      href: '/dashboard/polizas/judicial', 
      description: 'Pólizas judiciales' 
    },
    { 
      name: 'Renovaciones', 
      href: '/dashboard/polizas/renovaciones', 
      description: 'Gestión de renovaciones' 
    },
    { 
      name: 'Vencimientos', 
      href: '/dashboard/polizas/vencimientos', 
      description: 'Control de vencimientos' 
    },
    { 
      name: 'Importar Pólizas', 
      href: '/dashboard/polizas/importar', 
      description: 'Importar datos de pólizas' 
    }
  ];

  return (
    <ItemDashboard 
      title="Pólizas" 
      icon={<FiFileText className="w-6 h-6" />} 
      subItems={polizasSubItems} 
    />
  );
};

export default PolizasPage;
