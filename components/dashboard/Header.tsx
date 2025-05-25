"use client";

import { useState } from 'react';
import { FiBell, FiSearch, FiUser, FiSettings, FiHelpCircle, FiLogOut } from 'react-icons/fi';

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };
  
  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };
  
  return (
    <header className="bg-white shadow-sm h-16 flex items-center px-6">
      <div className="flex-1">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      </div>
      
      {/* Barra de búsqueda */}
      <div className="mx-4 relative w-64">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
          placeholder="Buscar..."
        />
      </div>
      
      {/* Notificaciones */}
      <div className="relative ml-3">
        <button
          onClick={toggleNotifications}
          className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <span className="sr-only">Ver notificaciones</span>
          <div className="relative">
            <FiBell className="h-6 w-6" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </div>
        </button>
        
        {/* Panel de notificaciones */}
        {isNotificationsOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
            <div className="py-2 px-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-900">Notificaciones</h3>
                <button className="text-xs text-primary hover:text-secondary">
                  Marcar todo como leído
                </button>
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
              <div className="py-2 px-4 border-b border-gray-100 hover:bg-gray-50">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-blue-100 rounded-full p-1">
                    <FiBell className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="ml-3 w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">Renovación próxima</p>
                    <p className="text-xs text-gray-500">La póliza de Juan Pérez vence en 3 días</p>
                    <p className="text-xs text-gray-400 mt-1">Hace 2 horas</p>
                  </div>
                </div>
              </div>
              <div className="py-2 px-4 border-b border-gray-100 hover:bg-gray-50">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-green-100 rounded-full p-1">
                    <FiUser className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="ml-3 w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">Nuevo cliente registrado</p>
                    <p className="text-xs text-gray-500">María García ha sido registrada en el sistema</p>
                    <p className="text-xs text-gray-400 mt-1">Hace 5 horas</p>
                  </div>
                </div>
              </div>
              <div className="py-2 px-4 hover:bg-gray-50">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-red-100 rounded-full p-1">
                    <FiBell className="h-4 w-4 text-red-600" />
                  </div>
                  <div className="ml-3 w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">Siniestro reportado</p>
                    <p className="text-xs text-gray-500">Nuevo siniestro reportado para la póliza #45623</p>
                    <p className="text-xs text-gray-400 mt-1">Ayer</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-2 px-4 border-t border-gray-200 text-center">
              <a href="#" className="text-xs text-primary hover:text-secondary">
                Ver todas las notificaciones
              </a>
            </div>
          </div>
        )}
      </div>
      
      {/* Perfil de usuario */}
      <div className="relative ml-3">
        <button
          onClick={toggleProfile}
          className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <span className="sr-only">Abrir menú de usuario</span>
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
            <FiUser className="h-5 w-5" />
          </div>
          <span className="ml-2 text-gray-700">Admin</span>
          <svg
            className={`ml-1 h-5 w-5 text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        
        {/* Menú desplegable del perfil */}
        {isProfileOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
            <div className="py-1">
              <a
                href="/dashboard/perfil"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FiUser className="mr-3 h-4 w-4 text-gray-500" />
                Mi Perfil
              </a>
              <a
                href="/dashboard/configuracion"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FiSettings className="mr-3 h-4 w-4 text-gray-500" />
                Configuración
              </a>
              <a
                href="/dashboard/ayuda"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FiHelpCircle className="mr-3 h-4 w-4 text-gray-500" />
                Ayuda
              </a>
              <div className="border-t border-gray-100"></div>
              <a
                href="/login"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FiLogOut className="mr-3 h-4 w-4 text-gray-500" />
                Cerrar sesión
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
