import React from 'react';
import { FiUser, FiFileText, FiAlertTriangle, FiDollarSign, FiClock } from 'react-icons/fi';

interface ActivityItem {
  id: string;
  type: 'cliente' | 'poliza' | 'siniestro' | 'pago' | 'tarea';
  title: string;
  description: string;
  time: string;
}

const activities: ActivityItem[] = [
  {
    id: '1',
    type: 'cliente',
    title: 'Nuevo cliente registrado',
    description: 'María García ha sido registrada en el sistema',
    time: 'Hace 2 horas'
  },
  {
    id: '2',
    type: 'poliza',
    title: 'Póliza renovada',
    description: 'La póliza #12345 de Juan Pérez ha sido renovada',
    time: 'Hace 3 horas'
  },
  {
    id: '3',
    type: 'siniestro',
    title: 'Siniestro reportado',
    description: 'Nuevo siniestro reportado para la póliza #45623',
    time: 'Hace 5 horas'
  },
  {
    id: '4',
    type: 'pago',
    title: 'Pago recibido',
    description: 'Se ha registrado un pago de $1,500 para la póliza #78901',
    time: 'Ayer'
  },
  {
    id: '5',
    type: 'tarea',
    title: 'Tarea completada',
    description: 'Llamar a cliente para renovación de póliza',
    time: 'Ayer'
  }
];

const getIcon = (type: string) => {
  switch (type) {
    case 'cliente':
      return <FiUser className="h-5 w-5 text-blue-500" />;
    case 'poliza':
      return <FiFileText className="h-5 w-5 text-green-500" />;
    case 'siniestro':
      return <FiAlertTriangle className="h-5 w-5 text-red-500" />;
    case 'pago':
      return <FiDollarSign className="h-5 w-5 text-purple-500" />;
    case 'tarea':
      return <FiClock className="h-5 w-5 text-orange-500" />;
    default:
      return <FiUser className="h-5 w-5 text-gray-500" />;
  }
};

const ActivityFeed = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Actividad Reciente</h3>
          <a href="#" className="text-sm text-primary hover:text-secondary">
            Ver todo
          </a>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {activities.map((activity) => (
          <div key={activity.id} className="px-6 py-4 hover:bg-gray-50">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-gray-100 rounded-full p-2">
                {getIcon(activity.type)}
              </div>
              <div className="ml-4 flex-1">
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <p className="text-sm text-gray-500">{activity.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-6 py-3 bg-gray-50 text-center">
        <a href="#" className="text-sm text-primary hover:text-secondary">
          Cargar más actividades
        </a>
      </div>
    </div>
  );
};

export default ActivityFeed;
