import React from 'react';
import ItemDashboard from '@/components/dashboard/ItemDashboard';
import { FiSliders } from 'react-icons/fi';

const ConfiguracionPage = () => {
  const configuracionSubItems = [
    { 
      name: 'Usuarios', 
      href: '/dashboard/configuracion/usuarios', 
      description: 'Gestión de usuarios' 
    },
    { 
      name: 'Información de agencia', 
      href: '/dashboard/configuracion/agencia', 
      description: 'Datos generales' 
    },
    { 
      name: 'Sedes', 
      href: '/dashboard/configuracion/sedes', 
      description: 'Administración de sucursales' 
    },
    { 
      name: 'Aseguradoras', 
      href: '/dashboard/configuracion/aseguradoras', 
      description: 'Catálogo de compañías' 
    },
    { 
      name: 'Ramos', 
      href: '/dashboard/configuracion/ramos', 
      description: 'Tipos de seguros' 
    },
    { 
      name: 'Vendedores', 
      href: '/dashboard/configuracion/vendedores', 
      description: 'Equipo comercial' 
    },
    { 
      name: 'Estados Siniestros', 
      href: '/dashboard/configuracion/estados-siniestros', 
      description: 'Configuración de estados' 
    },
    { 
      name: 'Estados ARL', 
      href: '/dashboard/configuracion/estados-arl', 
      description: 'Estados específicos ARL' 
    },
    { 
      name: 'Motivos estados póliza', 
      href: '/dashboard/configuracion/motivos-poliza', 
      description: 'Razones de cambio de estado' 
    },
    { 
      name: 'Tipo afiliación', 
      href: '/dashboard/configuracion/tipos-afiliacion', 
      description: 'Categorías de afiliación' 
    },
    { 
      name: 'Mensajeros', 
      href: '/dashboard/configuracion/mensajeros', 
      description: 'Equipo de mensajería' 
    },
    { 
      name: 'Coberturas', 
      href: '/dashboard/configuracion/coberturas', 
      description: 'Catálogo de protecciones' 
    }
  ];

  return (
    <ItemDashboard 
      title="Configuración Agencia" 
      icon={<FiSliders className="w-6 h-6" />} 
      subItems={configuracionSubItems} 
    />
  );
};

export default ConfiguracionPage;
