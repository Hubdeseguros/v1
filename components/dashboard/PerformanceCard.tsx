import React from 'react';
import { FiTrendingUp } from 'react-icons/fi';

interface PerformanceData {
  currentMonth: number;
  previousMonth: number;
  change: number;
}

const performanceData: PerformanceData = {
  currentMonth: 85,
  previousMonth: 78,
  change: 7
};

const PerformanceCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Rendimiento</h3>
          <a href="#" className="text-sm text-primary hover:text-secondary">
            Ver estadísticas
          </a>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-3xl font-bold text-gray-900">{performanceData.currentMonth}%</p>
            <p className="text-sm text-green-600 flex items-center">
              <FiTrendingUp className="mr-1" />
              +{performanceData.change}% vs. mes anterior
            </p>
          </div>
          <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center">
            <FiTrendingUp className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div 
            className="bg-primary h-2.5 rounded-full" 
            style={{ width: `${performanceData.currentMonth}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-xs text-gray-500">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
      <div className="px-6 py-3 bg-gray-50 text-center">
        <p className="text-sm text-gray-600">
          Basado en el cumplimiento de objetivos mensuales
        </p>
      </div>
    </div>
  );
};

export default PerformanceCard;
