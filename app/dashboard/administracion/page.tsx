import React from 'react';
import ItemDashboard from '@/components/dashboard/ItemDashboard';
import { FiSettings } from 'react-icons/fi';

const AdministracionPage = () => {
  const administracionSubItems = [
    { 
      name: 'Usuarios', 
      href: '/dashboard/administracion/usuarios', 
      description: 'Gestión de usuarios del sistema' 
    },
    { 
      name: 'Roles', 
      href: '/dashboard/administracion/roles', 
      description: 'Configuración de roles y permisos' 
    },
    { 
      name: 'Permisos', 
      href: '/dashboard/administracion/permisos', 
      description: 'Asignación de permisos específicos' 
    },
    { 
      name: 'Copias de Seguridad', 
      href: '/dashboard/administracion/backups', 
      description: 'Gestión de respaldos' 
    },
    { 
      name: 'Logs del Sistema', 
      href: '/dashboard/administracion/logs', 
      description: 'Registro de actividades' 
    },
    { 
      name: 'Sucursales', 
      href: '/dashboard/administracion/sucursales', 
      description: 'Administración de sedes' 
    },
    { 
      name: 'Productos', 
      href: '/dashboard/administracion/productos', 
      description: 'Catálogo de productos' 
    }
  ];

  return (
    <ItemDashboard 
      title="Administración" 
      icon={<FiSettings className="w-6 h-6" />} 
      subItems={administracionSubItems} 
    />
  );
};

export default AdministracionPage;
