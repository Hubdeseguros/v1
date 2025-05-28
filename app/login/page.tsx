'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

// Client-side form component
function LoginForm() {
  const router = useRouter();
  const { signIn, error: authError, loading } = useAuth();
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    try {
      const { error } = await signIn(formData.email, formData.password);
      
      if (error) {
        throw new Error(error);
      }
      
      // Redirect to dashboard after successful login
      window.location.href = 'https://hubdeseguros.github.io/v1/dashboard';
    } catch (error: any) {
      console.error('Error en el inicio de sesión:', error);
      setFormError(error.message || 'Error al iniciar sesión. Por favor, verifica tus credenciales.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Hubseguros</h2>
        <h3 className="text-xl font-medium">Iniciar sesión</h3>
        <p className="text-gray-500 text-sm mt-2">Ingresa tus credenciales para acceder a la plataforma</p>
      </div>
      
      {/* Error messages */}
      {(formError || authError) && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md">
          {formError || authError}
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="ejemplo@correo.com"
          />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <a 
              href="https://hubdeseguros.github.io/v1/recuperar-password" 
              className="text-sm text-primary hover:text-secondary cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = 'https://hubdeseguros.github.io/v1/recuperar-password';
              }}
            >
              ¿Olvidaste tu contraseña?
            </a>
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
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="••••••••"
          />
        </div>
        
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
          ¿No tienes una cuenta?{' '}
          <Link 
            href="https://hubdeseguros.github.io/v1/registro" 
            className="font-medium text-primary hover:text-secondary"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = 'https://hubdeseguros.github.io/v1/registro';
            }}
          >
            Regístrate
          </Link>
        </p>
        <p className="text-xs text-gray-500 mt-4">
          Acceso demo: <span className="font-medium">admin@admin.com / admin123</span>
        </p>
      </div>
    </div>
  );
}

// This is the main page component
export default function Login() {
  const [isClient, setIsClient] = useState(false);

  // This effect runs only on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render anything during SSR or before component mounts
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-gray-500">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Panel */}
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
      
      {/* Right Panel - Render the client-side form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 bg-white">
        <LoginForm />
      </div>
    </div>
  );
}
