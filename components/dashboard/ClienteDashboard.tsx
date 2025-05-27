import React from 'react';
import { 
  FiFileText, 
  FiCreditCard, 
  FiShield, 
  FiAlertTriangle,
  FiClock,
  FiCheckCircle,
  FiDollarSign
} from 'react-icons/fi';
import StatCard from './StatCard';

// Componentes que necesitaremos crear
const SolicitudesPendientes = () => (
  <div className="bg-white rounded-lg shadow p-4">
    <h3 className="font-medium text-gray-900 mb-3">Solicitudes Pendientes</h3>
    <div className="space-y-2">
      {[1, 2].map((item) => (
        <div key={item} className="flex items-center p-2 hover:bg-gray-50 rounded">
          <FiClock className="text-yellow-500 mr-3" />
          <div className="flex-1">
            <p className="text-sm font-medium">Solicitud de cotización #{1000 + item}</p>
            <p className="text-xs text-gray-500">En revisión</p>
          </div>
          <span className="text-xs text-gray-500">Hace 2 días</span>
        </div>
      ))}
    </div>
  </div>
);

const PagosPendientes = () => (
  <div className="bg-white rounded-lg shadow p-4">
    <h3 className="font-medium text-gray-900 mb-3">Pagos Pendientes</h3>
    <div className="space-y-2">
      {[1].map((item) => (
        <div key={item} className="flex items-center p-2 hover:bg-gray-50 rounded">
          <FiDollarSign className="text-blue-500 mr-3" />
          <div className="flex-1">
            <p className="text-sm font-medium">Póliza #A{2000 + item}</p>
            <p className="text-xs text-gray-500">Vence en 5 días</p>
          </div>
          <span className="text-sm font-medium">$1,250.00</span>
        </div>
      ))}
    </div>
  </div>
);

const PolizasActivas = () => (
  <div className="bg-white rounded-lg shadow p-4">
    <h3 className="font-medium text-gray-900 mb-3">Mis Pólizas Activas</h3>
    <div className="space-y-2">
      {[1, 2, 3].map((item) => (
        <div key={item} className="flex items-center p-2 hover:bg-gray-50 rounded">
          <FiShield className={`${item % 2 === 0 ? 'text-green-500' : 'text-blue-500'} mr-3`} />
          <div className="flex-1">
            <p className="text-sm font-medium">Seguro de {item % 2 === 0 ? 'Vida' : 'Automóvil'}</p>
            <p className="text-xs text-gray-500">Vence el 15/{String(6 + item).padStart(2, '0')}/2025</p>
          </div>
          <FiCheckCircle className="text-green-500" />
        </div>
      ))}
    </div>
  </div>
);

const ClienteDashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Mi Espacio de Cliente</h2>
      
      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Pólizas Activas" 
          value="3" 
          icon={<FiShield className="h-6 w-6 text-blue-500" />}
          description="Tus pólizas vigentes"
        />
        <StatCard 
          title="Pagos Pendientes" 
          value="1" 
          change={{ value: "1 pendiente", positive: false }}
          icon={<FiCreditCard className="h-6 w-6 text-yellow-500" />}
          description="Por vencer en 5 días"
        />
        <StatCard 
          title="Solicitudes" 
          value="2" 
          change={{ value: "En revisión", positive: false }}
          icon={<FiFileText className="h-6 w-6 text-green-500" />}
          description="Cotizaciones pendientes"
        />
        <StatCard 
          title="Vencimientos" 
          value="Próximos 30 días" 
          change={{ value: "1 póliza", positive: false }}
          icon={<FiAlertTriangle className="h-6 w-6 text-red-500" />}
          description="Revisa las fechas de vencimiento"
        />
      </div>

      {/* Sección principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Columna izquierda */}
        <div className="lg:col-span-2 space-y-6">
          <SolicitudesPendientes />
          <PolizasActivas />
        </div>
        
        {/* Columna derecha */}
        <div className="space-y-6">
          <PagosPendientes />
          
          {/* Sección de acciones rápidas */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-medium text-gray-900 mb-3">Acciones Rápidas</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <FiFileText className="h-6 w-6 text-blue-500 mb-1" />
                <span className="text-sm">Nueva Cotización</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <FiCreditCard className="h-6 w-6 text-green-500 mb-1" />
                <span className="text-sm">Realizar Pago</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <FiShield className="h-6 w-6 text-purple-500 mb-1" />
                <span className="text-sm">Mis Pólizas</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <FiAlertTriangle className="h-6 w-6 text-red-500 mb-1" />
                <span className="text-sm">Reportar Siniestro</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClienteDashboard;
