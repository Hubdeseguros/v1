'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
// No se usa AuthContext en este momento

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simular autenticación
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Panel izquierdo */}
      <div className="w-full md:w-1/2 bg-primary flex flex-col justify-center p-8 md:p-16">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-white mb-4">Bienvenido a Hubseguros</h1>
          <p className="text-white/80 mb-8">
            La plataforma digital para gestionar y hacer crecer tu negocio de seguros.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center text-white/90">
              <svg className="w-5 h-5 mr-3 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Organiza tu cartera de clientes y pólizas</span>
            </li>
            <li className="flex items-center text-white/90">
              <svg className="w-5 h-5 mr-3 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Ahorra tiempo en tareas administrativas</span>
            </li>
            <li className="flex items-center text-white/90">
              <svg className="w-5 h-5 mr-3 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Impulsa tus ventas con herramientas inteligentes</span>
            </li>
            <li className="flex items-center text-white/90">
              <svg className="w-5 h-5 mr-3 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Soporte humano cuando lo necesites</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Panel derecho */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Hubseguros</h2>
            <h3 className="text-xl font-medium">Iniciar sesión</h3>
            <p className="text-gray-500 text-sm mt-2">Ingresa tus credenciales para acceder a la plataforma</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                defaultValue="admin@admin.com"
                disabled={loading}
                autoComplete="email" 
                required 
                className="input-field"
                placeholder="ejemplo@correo.com"
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
                <Link href="/recuperar-password" className="text-sm text-primary hover:text-secondary">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <input 
                id="password" 
                name="password" 
                type="password" 
                defaultValue="admin123"
                disabled={loading}
                autoComplete="current-password" 
                required 
                className="input-field"
                placeholder="••••••••"
              />
            </div>
            
            {error && (
              <div className="text-red-500 text-sm mb-4">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta? <Link href="/registro" className="font-medium text-primary hover:text-secondary">Regístrate</Link>
            </p>
            <p className="text-xs text-gray-500 mt-4">
              Acceso demo: <span className="font-medium">admin@admin.com / admin123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
