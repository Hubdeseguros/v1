import React from 'react';
import ItemDashboard from '@/components/dashboard/ItemDashboard';
import { FiDollarSign } from 'react-icons/fi';

const CobrosPage = () => {
  const cobrosSubItems = [
    { 
      name: 'Listado de pagos', 
      href: '/dashboard/cobros/listado', 
      description: 'Visualiza todos los pagos' 
    },
    { 
      name: 'Pagos Pendientes', 
      href: '/dashboard/cobros/pendientes', 
      description: 'Gestiona pagos por cobrar' 
    },
    { 
      name: 'Recibos y Cuadre de caja', 
      href: '/dashboard/cobros/recibos', 
      description: 'Administra recibos y cuadre diario' 
    },
    { 
      name: 'Liquidar vendedores', 
      href: '/dashboard/cobros/liquidaciones', 
      description: 'Gestiona comisiones y liquidaciones' 
    },
    { 
      name: 'Reportes de Cobranza', 
      href: '/dashboard/cobros/reportes', 
      description: 'Informes y estadísticas de cobros' 
    },
    { 
      name: 'Importar Cobros', 
      href: '/dashboard/cobros/importar', 
      description: 'Importar registros de cobros' 
    }
  ];

  return (
    <ItemDashboard 
      title="Cobros" 
      icon={<FiDollarSign className="w-6 h-6" />} 
      subItems={cobrosSubItems} 
    />
  );
};

export default CobrosPage;
