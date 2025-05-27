import React from 'react';
import { FiUser, FiPhone, FiMail, FiCalendar } from 'react-icons/fi';
import { FiArrowRight } from 'react-icons/fi';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  lastContact: string;
  status: 'active' | 'inactive' | 'prospect';
  policies: number;
}

const RecentClients = () => {
  // Datos de ejemplo para clientes recientes
  const clients: Client[] = [
    {
      id: '1',
      name: 'Juan Pérez',
      email: 'juan.perez@example.com',
      phone: '+1 234 567 8901',
      joinDate: '2023-01-15',
      lastContact: '2023-05-28',
      status: 'active',
      policies: 3
    },
    {
      id: '2',
      name: 'María González',
      email: 'maria.gonzalez@example.com',
      phone: '+1 234 567 8902',
      joinDate: '2023-02-20',
      lastContact: '2023-05-25',
      status: 'active',
      policies: 2
    },
    {
      id: '3',
      name: 'Empresa XYZ S.A.',
      email: 'contacto@empresaxyz.com',
      phone: '+1 234 567 8903',
      joinDate: '2023-03-10',
      lastContact: '2023-05-20',
      status: 'active',
      policies: 5
    },
    {
      id: '4',
      name: 'Roberto Sánchez',
      email: 'roberto.sanchez@example.com',
      phone: '+1 234 567 8904',
      joinDate: '2023-04-05',
      lastContact: '2023-05-15',
      status: 'prospect',
      policies: 0
    },
    {
      id: '5',
      name: 'Ana Torres',
      email: 'ana.torres@example.com',
      phone: '+1 234 567 8905',
      joinDate: '2023-05-01',
      lastContact: '2023-05-10',
      status: 'prospect',
      policies: 0
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'prospect':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'inactive':
        return 'Inactivo';
      case 'prospect':
        return 'Prospecto';
      default:
        return '';
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
      {clients.map((client) => (
        <div 
          key={client.id} 
          className="p-4 border rounded-lg hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <FiUser className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 flex items-center">
                  {client.name}
                  <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getStatusBadge(client.status)}`}>
                    {getStatusText(client.status)}
                  </span>
                </h4>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <FiMail className="mr-1.5 h-4 w-4 flex-shrink-0" />
                  <span className="truncate">{client.email}</span>
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <FiPhone className="mr-1.5 h-4 w-4 flex-shrink-0" />
                  <span>{client.phone}</span>
                </div>
              </div>
            </div>
            <button className="text-gray-400 hover:text-blue-600">
              <FiArrowRight className="h-5 w-5" />
            </button>
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-500">
              <FiCalendar className="mr-1.5 h-4 w-4 flex-shrink-0" />
              <span>Último contacto: {formatDate(client.lastContact)}</span>
            </div>
            <span className="font-medium">
              {client.policies} {client.policies === 1 ? 'póliza' : 'pólizas'}
            </span>
          </div>
        </div>
      ))}
      
      <div className="mt-4 text-center">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          Ver todos los clientes
        </button>
      </div>
    </div>
  );
};

export default RecentClients;
