import React from 'react';
import Link from 'next/link';
import { 
  FiUpload, FiFileText, FiUsers, FiDollarSign, 
  FiAlertTriangle, FiFile, FiDatabase, FiPieChart,
  FiUserCheck, FiClipboard, FiShield
} from 'react-icons/fi';

const ImportarPlantillasPage = () => {
  const importItems = [
    {
      name: 'Aseguradoras',
      icon: <FiDatabase className="w-8 h-8 text-primary" />,
      description: 'Importar datos de aseguradoras.',
      href: '/dashboard/importar/aseguradoras'
    },
    {
      name: 'Ramos',
      icon: <FiFileText className="w-8 h-8 text-primary" />,
      description: 'Importar catálogo de ramos.',
      href: '/dashboard/importar/ramos'
    },
    {
      name: 'Campos adicionales por ramo',
      icon: <FiFile className="w-8 h-8 text-primary" />,
      description: 'Configuración de campos específicos.',
      href: '/dashboard/importar/campos-ramo'
    },
    {
      name: 'Vendedores',
      icon: <FiUserCheck className="w-8 h-8 text-primary" />,
      description: 'Importar datos de agentes.',
      href: '/dashboard/importar/vendedores'
    },
    {
      name: 'Clientes',
      icon: <FiUsers className="w-8 h-8 text-primary" />,
      description: 'Importar cartera de clientes.',
      href: '/dashboard/importar/clientes'
    },
    {
      name: 'Datos adicionales de clientes',
      icon: <FiUsers className="w-8 h-8 text-primary" />,
      description: 'Información complementaria.',
      href: '/dashboard/importar/datos-clientes'
    },
    {
      name: 'Pólizas',
      icon: <FiFileText className="w-8 h-8 text-primary" />,
      description: 'Importar pólizas existentes.',
      href: '/dashboard/importar/polizas'
    },
    {
      name: 'Pólizas de cumplimiento y judicial',
      icon: <FiShield className="w-8 h-8 text-primary" />,
      description: 'Pólizas con características especiales.',
      href: '/dashboard/importar/polizas-especiales'
    },
    {
      name: 'Vinculados a pólizas colectivas',
      icon: <FiUsers className="w-8 h-8 text-primary" />,
      description: 'Beneficiarios de pólizas colectivas.',
      href: '/dashboard/importar/vinculados'
    },
    {
      name: 'Coberturas',
      icon: <FiShield className="w-8 h-8 text-primary" />,
      description: 'Catálogo de coberturas.',
      href: '/dashboard/importar/coberturas'
    },
    {
      name: 'Beneficiarios',
      icon: <FiUsers className="w-8 h-8 text-primary" />,
      description: 'Datos de beneficiarios.',
      href: '/dashboard/importar/beneficiarios'
    },
    {
      name: 'Anexos',
      icon: <FiFile className="w-8 h-8 text-primary" />,
      description: 'Documentos complementarios.',
      href: '/dashboard/importar/anexos'
    },
    {
      name: 'Cobros',
      icon: <FiDollarSign className="w-8 h-8 text-primary" />,
      description: 'Historial de pagos.',
      href: '/dashboard/importar/cobros'
    },
    {
      name: 'Siniestros',
      icon: <FiAlertTriangle className="w-8 h-8 text-primary" />,
      description: 'Historial de siniestros.',
      href: '/dashboard/importar/siniestros'
    },
    {
      name: 'Amparos Siniestros',
      icon: <FiShield className="w-8 h-8 text-primary" />,
      description: 'Coberturas de siniestros.',
      href: '/dashboard/importar/amparos'
    },
    {
      name: 'Asistente Comercial / CRM',
      icon: <FiClipboard className="w-8 h-8 text-primary" />,
      description: 'Datos de oportunidades comerciales.',
      href: '/dashboard/importar/crm'
    },
    {
      name: 'Tareas',
      icon: <FiClipboard className="w-8 h-8 text-primary" />,
      description: 'Actividades pendientes.',
      href: '/dashboard/importar/tareas'
    }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <div className="bg-primary p-2 rounded-lg text-white mr-3">
          <FiUpload className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold">Importar Plantillas</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {importItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-50 p-4 rounded-full mb-4">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ImportarPlantillasPage;
