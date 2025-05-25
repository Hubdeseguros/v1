import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

interface Alert {
  id: string;
  title: string;
  description: string;
  type: 'warning' | 'danger' | 'info';
}

const alerts: Alert[] = [
  {
    id: '1',
    title: 'Pólizas por vencer',
    description: '3 pólizas vencen en los próximos 7 días',
    type: 'warning'
  },
  {
    id: '2',
    title: 'Pagos pendientes',
    description: '5 clientes tienen pagos pendientes',
    type: 'danger'
  },
  {
    id: '3',
    title: 'Siniestros sin actualizar',
    description: '2 siniestros requieren seguimiento',
    type: 'info'
  }
];

const getAlertColor = (type: string) => {
  switch (type) {
    case 'warning':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'danger':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'info':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const AlertsCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Alertas Activas</h3>
          <div className="flex items-center">
            <div className="bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-medium">
              {alerts.length}
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-4">
        {alerts.map((alert) => (
          <div 
            key={alert.id} 
            className={`p-4 rounded-md border ${getAlertColor(alert.type)}`}
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <FiAlertCircle className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium">{alert.title}</h3>
                <div className="mt-1 text-sm">
                  <p>{alert.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-6 py-3 bg-gray-50 text-center">
        <a href="#" className="text-sm text-primary hover:text-secondary">
          Ver todas las alertas
        </a>
      </div>
    </div>
  );
};

export default AlertsCard;
