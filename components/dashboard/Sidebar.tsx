"use client";

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
declare global {
  namespace NodeJS {
    interface Global {
      localStorage: Storage;
      setTimeout: typeof setTimeout;
    }
  }
}
import { useRouter } from 'next/navigation';
import { useMobileMenu } from '@/context/MobileMenuContext';
import { useAuth } from '@/context/AuthContext';
import { 
  FiHome, FiUsers, FiFileText, FiAlertTriangle, FiDollarSign, 
  FiPieChart, FiFolder, FiSend, FiSettings, FiBarChart2,
  FiUpload, FiSliders, FiLogOut
} from 'react-icons/fi';

interface SubMenuItem {
  name: string;
  href: string;
  description: string;
}

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  href: string;
  subItems?: SubMenuItem[];
}

const clienteMenuItems: MenuItem[] = [
  {
    name: 'Inicio',
    icon: <FiHome className="w-5 h-5" />,
    href: '/cliente',
  },
  {
    name: 'Mis Pólizas',
    icon: <FiFileText className="w-5 h-5" />,
    href: '/cliente/polizas',
    subItems: [
      { name: 'Todas mis pólizas', href: '/cliente/polizas', description: 'Consulta tus pólizas activas' },
      { name: 'Vencimientos', href: '/cliente/polizas/vencimientos', description: 'Próximos vencimientos' },
      { name: 'Historial', href: '/cliente/polizas/historial', description: 'Historial de pólizas' },
    ]
  },
  {
    name: 'Cotizaciones',
    icon: <FiBarChart2 className="w-5 h-5" />,
    href: '/cliente/cotizaciones',
    subItems: [
      { name: 'Nueva cotización', href: '/cliente/cotizaciones/nueva', description: 'Solicitar nueva cotización' },
      { name: 'Mis solicitudes', href: '/cliente/cotizaciones', description: 'Estado de mis cotizaciones' },
    ]
  },
  {
    name: 'Pagos',
    icon: <FiDollarSign className="w-5 h-5" />,
    href: '/cliente/pagos',
    subItems: [
      { name: 'Realizar pago', href: '/cliente/pagos/realizar', description: 'Pagar póliza' },
      { name: 'Historial de pagos', href: '/cliente/pagos', description: 'Mis transacciones' },
      { name: 'Métodos de pago', href: '/cliente/pagos/metodos', description: 'Gestionar formas de pago' },
    ]
  },
  {
    name: 'Siniestros',
    icon: <FiAlertTriangle className="w-5 h-5" />,
    href: '/cliente/siniestros',
    subItems: [
      { name: 'Reportar siniestro', href: '/cliente/siniestros/reportar', description: 'Nuevo reporte' },
      { name: 'Mis reportes', href: '/cliente/siniestros', description: 'Seguimiento de siniestros' },
    ]
  },
  {
    name: 'Documentos',
    icon: <FiFolder className="w-5 h-5" />,
    href: '/cliente/documentos',
    subItems: [
      { name: 'Mis pólizas', href: '/cliente/documentos/polizas', description: 'Descargar pólizas' },
      { name: 'Facturas', href: '/cliente/documentos/facturas', description: 'Facturas y recibos' },
      { name: 'Contratos', href: '/cliente/documentos/contratos', description: 'Documentos legales' },
    ]
  }
];

const adminMenuItems: MenuItem[] = [
  {
    name: 'Inicio',
    icon: <FiHome className="w-5 h-5" />,
    href: '/dashboard',
  },
  {
    name: 'Clientes',
    icon: <FiUsers className="w-5 h-5" />,
    href: '/dashboard/clientes',
    subItems: [
      { name: 'Listado de Clientes', href: '/dashboard/clientes', description: 'Gestiona tu cartera de clientes' },
      { name: 'Asistente Comercial/CRM', href: '/dashboard/clientes/crm', description: 'Seguimiento de oportunidades comerciales' },
    ]
  },
  {
    name: 'Pólizas',
    icon: <FiFileText className="w-5 h-5" />,
    href: '/dashboard/polizas',
    subItems: [
      { name: 'Listado de Pólizas', href: '/dashboard/polizas', description: 'Gestiona todas tus pólizas' },
      { name: 'Cotizaciones', href: '/dashboard/polizas/cotizaciones', description: 'Gestiona tus cotizaciones' },
      { name: 'Cumplimiento', href: '/dashboard/polizas/cumplimiento', description: 'Pólizas de cumplimiento' },
      { name: 'Judicial', href: '/dashboard/polizas/judicial', description: 'Pólizas judiciales' },
    ]
  },
  {
    name: 'Siniestros',
    icon: <FiAlertTriangle className="w-5 h-5" />,
    href: '/dashboard/siniestros',
    subItems: [
      { name: 'Gestión de Siniestros', href: '/dashboard/siniestros', description: 'Administra casos de siniestros' },
      { name: 'Reportar Siniestro', href: '/dashboard/siniestros/reportar', description: 'Crea un nuevo reporte de siniestro' },
      { name: 'Historial de Siniestros', href: '/dashboard/siniestros/historial', description: 'Consulta el historial completo' },
    ]
  },
  {
    name: 'Cobros',
    icon: <FiDollarSign className="w-5 h-5" />,
    href: '/dashboard/cobros',
    subItems: [
      { name: 'Listado de pagos', href: '/dashboard/cobros', description: 'Visualiza todos los pagos' },
      { name: 'Pagos Pendientes', href: '/dashboard/cobros/pendientes', description: 'Gestiona pagos por cobrar' },
      { name: 'Recibos y Cuadre de caja', href: '/dashboard/cobros/recibos', description: 'Administra recibos y cuadre diario' },
      { name: 'Liquidar vendedores', href: '/dashboard/cobros/liquidaciones', description: 'Gestiona comisiones y liquidaciones' },
    ]
  },
  {
    name: 'Informes',
    icon: <FiPieChart className="w-5 h-5" />,
    href: '/dashboard/informes',
    subItems: [
      { name: 'Informes Financieros', href: '/dashboard/informes/financieros', description: 'Reportes financieros detallados' },
      { name: 'Informes de Producción', href: '/dashboard/informes/produccion', description: 'Análisis de producción y ventas' },
      { name: 'Informes de Siniestralidad', href: '/dashboard/informes/siniestralidad', description: 'Estadísticas de siniestros' },
    ]
  },
  {
    name: 'Gestión',
    icon: <FiFolder className="w-5 h-5" />,
    href: '/dashboard/gestion',
    subItems: [
      { name: 'Archivos', href: '/dashboard/gestion/archivos', description: 'Gestión documental' },
      { name: 'Facturas', href: '/dashboard/gestion/facturas', description: 'Administración de facturas' },
      { name: 'Diligencias', href: '/dashboard/gestion/diligencias', description: 'Seguimiento de trámites' },
    ]
  },
  {
    name: 'Remisiones',
    icon: <FiSend className="w-5 h-5" />,
    href: '/dashboard/remisiones',
    subItems: [
      { name: 'Crear remisión', href: '/dashboard/remisiones/crear', description: 'Genera una nueva remisión' },
      { name: 'Listado de remisión', href: '/dashboard/remisiones', description: 'Consulta todas las remisiones' },
    ]
  },
  {
    name: 'Reportes',
    icon: <FiBarChart2 className="w-5 h-5" />,
    href: '/dashboard/reportes',
    subItems: [
      { name: 'Reportes de Venta', href: '/dashboard/reportes/ventas', description: 'Análisis detallado de ventas' },
      { name: 'Reportes de Cobranza', href: '/dashboard/reportes/cobranza', description: 'Seguimiento de cobranza' },
      { name: 'Reportes de Cliente', href: '/dashboard/reportes/clientes', description: 'Estadísticas de clientes' },
    ]
  },
  {
    name: 'Administración',
    icon: <FiSettings className="w-5 h-5" />,
    href: '/dashboard/administracion',
    subItems: [
      { name: 'Usuarios', href: '/dashboard/administracion/usuarios', description: 'Gestión de usuarios del sistema' },
      { name: 'Roles', href: '/dashboard/administracion/roles', description: 'Configuración de roles y permisos' },
      { name: 'Permisos', href: '/dashboard/administracion/permisos', description: 'Asignación de permisos específicos' },
      { name: 'Copias de Seguridad', href: '/dashboard/administracion/backups', description: 'Gestión de respaldos' },
      { name: 'Logs del Sistema', href: '/dashboard/administracion/logs', description: 'Registro de actividades' },
      { name: 'Sucursales', href: '/dashboard/administracion/sucursales', description: 'Administración de sedes' },
      { name: 'Productos', href: '/dashboard/administracion/productos', description: 'Catálogo de productos' },
    ]
  },
];

const specialMenuItems: MenuItem[] = [
  {
    name: 'Importar Plantillas',
    icon: <FiUpload className="w-5 h-5" />,
    href: '/dashboard/importar',
    subItems: [
      { name: 'Aseguradoras', href: '/dashboard/importar/aseguradoras', description: 'Importar datos de aseguradoras' },
      { name: 'Ramos', href: '/dashboard/importar/ramos', description: 'Importar catálogo de ramos' },
      { name: 'Campos adicionales por ramo', href: '/dashboard/importar/campos-ramo', description: 'Configuración de campos específicos' },
      { name: 'Vendedores', href: '/dashboard/importar/vendedores', description: 'Importar datos de agentes' },
      { name: 'Clientes', href: '/dashboard/importar/clientes', description: 'Importar cartera de clientes' },
      { name: 'Datos adicionales de clientes', href: '/dashboard/importar/datos-clientes', description: 'Información complementaria' },
      { name: 'Pólizas', href: '/dashboard/importar/polizas', description: 'Importar pólizas existentes' },
      { name: 'Pólizas de cumplimiento y judicial', href: '/dashboard/importar/polizas-especiales', description: 'Pólizas con características especiales' },
      { name: 'Vinculados a pólizas colectivas', href: '/dashboard/importar/vinculados', description: 'Beneficiarios de pólizas colectivas' },
      { name: 'Coberturas', href: '/dashboard/importar/coberturas', description: 'Catálogo de coberturas' },
      { name: 'Beneficiarios', href: '/dashboard/importar/beneficiarios', description: 'Datos de beneficiarios' },
      { name: 'Anexos', href: '/dashboard/importar/anexos', description: 'Documentos complementarios' },
      { name: 'Cobros', href: '/dashboard/importar/cobros', description: 'Historial de pagos' },
      { name: 'Siniestros', href: '/dashboard/importar/siniestros', description: 'Historial de siniestros' },
      { name: 'Amparos Siniestros', href: '/dashboard/importar/amparos', description: 'Coberturas de siniestros' },
      { name: 'Asistente Comercial / CRM', href: '/dashboard/importar/crm', description: 'Datos de oportunidades comerciales' },
      { name: 'Tareas', href: '/dashboard/importar/tareas', description: 'Actividades pendientes' },
    ]
  },
  {
    name: 'Configuración Promotor',
    icon: <FiSliders className="w-5 h-5" />,
    href: '/dashboard/configuracion',
    subItems: [
      { name: 'Perfil', href: '/dashboard/configuracion/perfil', description: 'Mi perfil de promotor' },
      { name: 'Preferencias', href: '/dashboard/configuracion/preferencias', description: 'Configuración personal' },
      { name: 'Clientes', href: '/dashboard/configuracion/clientes', description: 'Gestión de clientes' },
      { name: 'Plantillas', href: '/dashboard/configuracion/plantillas', description: 'Plantillas de documentos' },
      { name: 'Notificaciones', href: '/dashboard/configuracion/notificaciones', description: 'Preferencias de notificaciones' },
    ]
  },
];

export interface SidebarProps {
  role?: 'ADMIN' | 'AGENCIA' | 'PROMOTOR' | 'CLIENTE';
  className?: string;
}

export default function Sidebar({ role = 'AGENCIA', className = '' }: SidebarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const router = useRouter();
  const { toggleMenu: toggleMobileMenu } = useMobileMenu();
  const { signOut } = useAuth();
  const clickTimers = useRef<{[key: string]: NodeJS.Timeout | null}>({});
  const clickCounts = useRef<{[key: string]: number}>({});
  
  // Función para manejar los clics en los elementos del menú
  const handleMenuItemClick = (item: MenuItem) => {
    const itemName = item.name;
    
    // Incrementar el contador de clics para este elemento
    clickCounts.current[itemName] = (clickCounts.current[itemName] || 0) + 1;
    
    // Si ya hay un temporizador activo para este elemento, lo limpiamos
    if (clickTimers.current[itemName]) {
      clearTimeout(clickTimers.current[itemName]!);
    }
    
    // Configurar un nuevo temporizador
    clickTimers.current[itemName] = setTimeout(() => {
      // Si hubo un solo clic, navegar al dashboard del ítem
      if (clickCounts.current[itemName] === 1) {
        if (item.subItems && item.subItems.length > 0) {
          router.push(item.href);
        } else {
          router.push(item.href);
        }
        
        // Cerrar el menú en dispositivos móviles
        if (window.innerWidth < 768) {
          toggleMobileMenu(false);
        }
      } 
      // Si hubo doble clic, expandir/contraer el submenú
      else if (clickCounts.current[itemName] >= 2) {
        toggleMenu(itemName);
      }
      
      // Reiniciar el contador de clics
      clickCounts.current[itemName] = 0;
      clickTimers.current[itemName] = null;
    }, 250); // 250ms es un tiempo razonable para detectar doble clic
  };
  
  // Limpiar los temporizadores al desmontar el componente
  useEffect(() => {
    return () => {
      Object.keys(clickTimers.current).forEach(key => {
        if (clickTimers.current[key]) {
          clearTimeout(clickTimers.current[key]!);
        }
      });
    };
  }, []);
  
  const toggleMenu = (menuName: string) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
    
    // Si estamos en móvil y el menú está abierto, no permitir cerrar el submenú al hacer clic en el mismo ítem
    if (window.innerWidth < 768 && activeMenu === menuName) {
      toggleMobileMenu(false);
    }
  };
  
  // Filtrar menús según el rol
  const filteredMainMenu = role === 'CLIENTE' 
    ? clienteMenuItems 
    : adminMenuItems.filter((item: MenuItem) => {
        if (role === 'ADMIN') return true;
        if (role === 'AGENCIA') return !['Administración'].includes(item.name);
        if (role === 'PROMOTOR') {
          return ['Inicio', 'Clientes', 'Pólizas', 'Siniestros', 'Cobros'].includes(item.name);
        }
        return false;
      });

  const filteredSpecialMenuItems = specialMenuItems.filter(item => {
    if (role === 'ADMIN' || role === 'AGENCIA') return true;
    return false;
  });

  return (
    <div className="bg-primary text-white h-screen w-64 flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-700">
        <Link href="/dashboard" className="flex items-center">
          <span className="text-xl font-bold">
            <span className="text-white">Hub</span>
            <span className="text-blue-300">seguros</span>
          </span>
        </Link>
      </div>

      {/* Menú principal */}
      <div className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {filteredMainMenu.map((item: MenuItem) => (
            <li key={item.name}>
              <button
                onClick={() => handleMenuItemClick(item)}
                className={`flex items-center justify-between w-full p-2 rounded-md transition-colors ${
                  activeMenu === item.name ? 'bg-secondary text-white' : 'text-gray-300 hover:bg-secondary/50'
                }`}
              >
                <div className="flex items-center">
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </div>
              </button>
              
              {/* Submenús */}
              {activeMenu === item.name && item.subItems && item.subItems.length > 0 && (
                <ul className="mt-1 ml-6 space-y-1">
                  {item.subItems.map((subItem: SubMenuItem) => (
                    <li key={subItem.name}>
                      <Link
                        href={subItem.href}
                        onClick={() => {
                          if (window.innerWidth < 768) {
                            toggleMobileMenu(false);
                          }
                        }}
                        className="block p-2 text-sm text-gray-300 hover:text-white hover:bg-secondary/30 rounded-md transition-colors"
                      >
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Menú especial (solo para ADMIN y AGENCIA) */}
        {filteredSpecialMenuItems.length > 0 && (
          <>
            <div className="border-t border-gray-700 my-4 mx-2"></div>
            <ul className="space-y-1 px-2">
              {filteredSpecialMenuItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleMenuItemClick(item)}
                    className={`flex items-center justify-between w-full p-2 rounded-md transition-colors ${
                      activeMenu === item.name ? 'bg-secondary text-white' : 'text-gray-300 hover:bg-secondary/50'
                    }`}
                  >
                    <div className="flex items-center">
                      {item.icon}
                      <span className="ml-3">{item.name}</span>
                    </div>
                  </button>
                  
                  {/* Submenús */}
                  {activeMenu === item.name && item.subItems && item.subItems.length > 0 && (
                    <ul className="mt-1 ml-6 space-y-1">
                      {item.subItems.map((subItem: SubMenuItem) => (
                        <li key={subItem.name}>
                          <Link
                            href={subItem.href}
                            onClick={() => {
                              if (window.innerWidth < 768) {
                                toggleMobileMenu(false);
                              }
                            }}
                            className="block p-2 text-sm text-gray-300 hover:text-white hover:bg-secondary/30 rounded-md transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Pie de página */}
      <div className="p-4 border-t border-gray-700">
        <button 
          onClick={async (e) => {
            e.preventDefault();
            try {
              await signOut();
              // La redirección se maneja en la función signOut
            } catch (error) {
              console.error('Error al cerrar sesión:', error);
              // Forzar la redirección en caso de error
              window.location.href = 'https://hubdeseguros.github.io/v1/login/';
            }
          }}
          className="flex items-center p-2 text-gray-300 hover:text-white hover:bg-secondary/50 rounded-md transition-colors w-full"
        >
          <FiLogOut className="w-5 h-5" />
          <span className="ml-3">Cerrar sesión</span>
        </button>
      </div>
    </div>
  );
}
