'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const router = useRouter();
  const { signIn, error: authError, loading } = useAuth();
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    email: 'admin@admin.com',
    password: 'admin123'
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    const { error } = await signIn(formData.email, formData.password);
    
    if (error) {
      setFormError(error);
      return;
    }
    
    // Redirigir al dashboard después de un inicio de sesión exitoso
    router.push('/dashboard');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
          
          {formError && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md">
              {formError}
            </div>
          )}
          {authError && !formError && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md">
              {authError}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                autoComplete="email" 
                required 
                className="input-field w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
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
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                autoComplete="current-password" 
                required 
                className="input-field w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </button>
              {(formError || authError) && (
                <p className="mt-2 text-sm text-red-600">
                  {formError || authError}
                </p>
              )}
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
