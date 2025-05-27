import React from 'react';
import { FiClock, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

interface RenewalItem {
  id: string;
  client: string;
  policy: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
}

const UpcomingRenewals = () => {
  // Datos de ejemplo para las próximas renovaciones
  const renewals: RenewalItem[] = [
    {
      id: '1',
      client: 'Juan Pérez',
      policy: 'Auto - Todo Riesgo',
      dueDate: '2023-06-15',
      status: 'pending'
    },
    {
      id: '2',
      client: 'María González',
      policy: 'Hogar - Contenido',
      dueDate: '2023-06-18',
      status: 'pending'
    },
    {
      id: '3',
      client: 'Empresa XYZ',
      policy: 'Responsabilidad Civil',
      dueDate: '2023-06-20',
      status: 'pending'
    },
    {
      id: '4',
      client: 'Roberto Sánchez',
      policy: 'Vida - Ahorro',
      dueDate: '2023-06-22',
      status: 'pending'
    },
    {
      id: '5',
      client: 'Ana Torres',
      policy: 'Salud - Familiar',
      dueDate: '2023-06-25',
      status: 'pending'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <FiCheckCircle className="w-4 h-4 text-green-500" />;
      case 'overdue':
        return <FiAlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <FiClock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'overdue':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-yellow-600 bg-yellow-50';
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="space-y-4">
      {renewals.map((renewal) => (
        <div 
          key={renewal.id} 
          className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-gray-900">{renewal.client}</h4>
              <p className="text-sm text-gray-500">{renewal.policy}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusClass(renewal.status)}`}>
                {renewal.status === 'pending' ? 'Pendiente' : renewal.status === 'completed' ? 'Completado' : 'Vencido'}
              </span>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
            <span>Vence: {formatDate(renewal.dueDate)}</span>
            <div className="flex items-center space-x-1">
              {getStatusIcon(renewal.status)}
              <span>Renovar</span>
            </div>
          </div>
        </div>
      ))}
      <div className="mt-4 text-center">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          Ver todas las renovaciones
        </button>
      </div>
    </div>
  );
};

export default UpcomingRenewals;
