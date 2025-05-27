import React from 'react';
import { 
  FiUsers, 
  FiFileText, 
  FiAlertTriangle, 
  FiDollarSign, 
  FiTrendingUp,
  FiCalendar,
  FiClock,
  FiCheckCircle
} from 'react-icons/fi';
import StatCard from './StatCard';
import ActivityFeed from './ActivityFeed';
import TasksList from './TasksList';
import PerformanceCard from './PerformanceCard';
import UpcomingRenewals from './upcoming-renewals';
import RecentClients from './recent-clients';

const PromotorDashboard = () => {
  return (
    <div className="p-6">
      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Clientes Activos" 
          value="24" 
          change={{ value: "5.2%", positive: true }}
          icon={<FiUsers className="h-6 w-6 text-blue-500" />}
          description="Clientes en tu cartera"
        />
        <StatCard 
          title="Pólizas Activas" 
          value="143" 
          change={{ value: "8%", positive: true }}
          icon={<FiFileText className="h-6 w-6 text-green-500" />}
          description="Pólizas vigentes"
        />
        <StatCard 
          title="Siniestros" 
          value="3" 
          change={{ value: "1%", positive: false }}
          icon={<FiAlertTriangle className="h-6 w-6 text-yellow-500" />}
          description="En seguimiento"
        />
        <StatCard 
          title="Renovaciones" 
          value="12" 
          change={{ value: "3%", positive: true }}
          icon={<FiTrendingUp className="h-6 w-6 text-purple-500" />}
          description="Próximos 30 días"
        />
      </div>
      
      {/* Segunda fila de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Comisiones" 
          value="$4,250" 
          change={{ value: "12%", positive: true }}
          icon={<FiDollarSign className="h-6 w-6 text-green-500" />}
          description="Este mes"
        />
        <StatCard 
          title="Tareas Pendientes" 
          value="8" 
          change={{ value: "2 nuevas", positive: false }}
          icon={<FiClock className="h-6 w-6 text-orange-500" />}
          description="Por completar"
        />
        <StatCard 
          title="Cumpleaños" 
          value="3" 
          change={{ value: "esta semana", positive: true }}
          icon={<FiCalendar className="h-6 w-6 text-pink-500" />}
          description="Clientes"
        />
        <StatCard 
          title="Metas" 
          value="78%" 
          change={{ value: "12% restante", positive: true }}
          icon={<FiCheckCircle className="h-6 w-6 text-teal-500" />}
          description="Cumplimiento mensual"
        />
      </div>
      
      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Actividad Reciente</h2>
            <ActivityFeed />
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Tareas Pendientes</h2>
            <TasksList />
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Clientes Recientes</h2>
            <RecentClients />
          </div>
        </div>
        
        {/* Columna derecha */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Rendimiento</h2>
            <PerformanceCard />
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Próximas Renovaciones</h2>
            <UpcomingRenewals />
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recordatorios</h2>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm text-blue-800">Revisar documentación pendiente de 2 clientes</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <p className="text-sm text-yellow-800">3 clientes requieren seguimiento</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                <p className="text-sm text-green-800">5 renovaciones programadas para la próxima semana</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotorDashboard;
