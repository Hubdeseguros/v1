import React from 'react';
import { FiDatabase, FiLock, FiHardDrive, FiServer } from 'react-icons/fi';

interface StatusItem {
  id: string;
  name: string;
  status: 'online' | 'warning' | 'offline';
  icon: React.ReactNode;
}

const statusItems: StatusItem[] = [
  {
    id: '1',
    name: 'Base de datos',
    status: 'online',
    icon: <FiDatabase className="h-5 w-5" />
  },
  {
    id: '2',
    name: 'Autenticación',
    status: 'online',
    icon: <FiLock className="h-5 w-5" />
  },
  {
    id: '3',
    name: 'Almacenamiento',
    status: 'online',
    icon: <FiHardDrive className="h-5 w-5" />
  },
  {
    id: '4',
    name: 'API',
    status: 'online',
    icon: <FiServer className="h-5 w-5" />
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'online':
      return 'text-green-500';
    case 'warning':
      return 'text-yellow-500';
    case 'offline':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'online':
      return 'Operativo';
    case 'warning':
      return 'Advertencia';
    case 'offline':
      return 'Inactivo';
    default:
      return 'Desconocido';
  }
};

const SystemStatus = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Estado del Sistema</h3>
          <a href="#" className="text-sm text-primary hover:text-secondary">
            Ver detalles
          </a>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {statusItems.map((item) => (
          <div key={item.id} className="px-6 py-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 text-gray-500">
                  {item.icon}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className={`h-3 w-3 rounded-full ${item.status === 'online' ? 'bg-green-500' : item.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                <span className={`ml-2 text-sm ${getStatusColor(item.status)}`}>
                  {getStatusText(item.status)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-6 py-3 bg-gray-50 text-center">
        <p className="text-sm text-gray-600">
          Última actualización: <span className="font-medium">Hace 5 minutos</span>
        </p>
      </div>
    </div>
  );
};

export default SystemStatus;
