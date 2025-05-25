import React from 'react';
import { FiUsers, FiFileText, FiBell, FiShield, FiPieChart, FiClock } from 'react-icons/fi';

const Modules = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          Módulos principales
        </h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
          Todo lo que necesitas para gestionar tu negocio de seguros en una sola plataforma.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Módulo 1 */}
          <div className="p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-lg mr-4">
                <FiUsers className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">CRM integrado</h3>
            </div>
            <p className="text-gray-600">
              Historial completo de clientes, seguimiento de interacciones y gestión de datos integrada en un solo lugar.
            </p>
          </div>
          
          {/* Módulo 2 */}
          <div className="p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-lg mr-4">
                <FiFileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Gestión de pólizas</h3>
            </div>
            <p className="text-gray-600">
              Emisión, renovación y seguimiento de vencimientos de todas tus pólizas de manera centralizada.
            </p>
          </div>
          
          {/* Módulo 3 */}
          <div className="p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-lg mr-4">
                <FiBell className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Automatización</h3>
            </div>
            <p className="text-gray-600">
              Configuración de tareas automáticas, alertas y recordatorios para no perder ninguna oportunidad.
            </p>
          </div>
          
          {/* Módulo 4 */}
          <div className="p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-lg mr-4">
                <FiShield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Control de siniestros</h3>
            </div>
            <p className="text-gray-600">
              Seguimiento del estado de los siniestros en tiempo real, documentación y comunicación con aseguradoras.
            </p>
          </div>
          
          {/* Módulo 5 */}
          <div className="p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-lg mr-4">
                <FiPieChart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Dashboard analítico</h3>
            </div>
            <p className="text-gray-600">
              Visualización de KPIs importantes: pólizas por renovar, tareas pendientes, siniestros y cumpleaños de clientes.
            </p>
          </div>
          
          {/* Módulo 6 */}
          <div className="p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-lg mr-4">
                <FiClock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Cobros y liquidaciones</h3>
            </div>
            <p className="text-gray-600">
              Gestión de recibos, pagos, cuadre de caja y liquidación de vendedores en un solo sistema.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Modules;
