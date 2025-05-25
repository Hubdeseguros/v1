import React from 'react';
import { FiUsers, FiHome, FiUserCheck, FiFileText, FiAlertTriangle } from 'react-icons/fi';
import StatCard from './StatCard';
import ActivityFeed from './ActivityFeed';
import TasksList from './TasksList';
import SystemStatus from './SystemStatus';
import AlertsCard from './AlertsCard';
import PerformanceCard from './PerformanceCard';

const Dashboard = () => {
  return (
    <div className="p-6">
      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
        <StatCard 
          title="Total Clientes" 
          value="117" 
          change={{ value: "2.5%", positive: true }}
          icon={<FiUsers className="h-6 w-6 text-primary" />}
        />
        <StatCard 
          title="Agencias" 
          value="3" 
          icon={<FiHome className="h-6 w-6 text-primary" />}
        />
        <StatCard 
          title="Promotores" 
          value="17" 
          change={{ value: "15%", positive: true }}
          icon={<FiUserCheck className="h-6 w-6 text-primary" />}
        />
        <StatCard 
          title="Pólizas" 
          value="3,642" 
          change={{ value: "12%", positive: true }}
          icon={<FiFileText className="h-6 w-6 text-primary" />}
        />
        <StatCard 
          title="Siniestros" 
          value="7" 
          change={{ value: "5%", positive: true }}
          icon={<FiAlertTriangle className="h-6 w-6 text-primary" />}
        />
      </div>
      
      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna izquierda */}
        <div className="lg:col-span-2 space-y-6">
          <ActivityFeed />
          <TasksList />
        </div>
        
        {/* Columna derecha */}
        <div className="space-y-6">
          <SystemStatus />
          <AlertsCard />
          <PerformanceCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
