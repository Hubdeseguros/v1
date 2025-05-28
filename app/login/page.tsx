'use client';

import { useState, FormEvent, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  // Evitar hidratación no coincidente
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const validateForm = useCallback(() => {
    if (!formData.email.trim()) {
      setFormError('El correo electrónico es obligatorio');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormError('Por favor ingresa un correo electrónico válido');
      return false;
    }
    if (!formData.password) {
      setFormError('La contraseña es obligatoria');
      return false;
    }
    return true;
  }, [formData]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email.trim(),
        password: formData.password,
      });

      if (error) throw error;
      
      // Redirigir al dashboard después del inicio de sesión exitoso
      router.push('/dashboard');
      
    } catch (error: any) {
      console.error('Error en el inicio de sesión:', error);
      
      // Manejar errores específicos
      if (error.message.includes('Invalid login credentials')) {
        setFormError('Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.');
      } else if (error.message.includes('Email not confirmed')) {
        setFormError('Por favor verifica tu correo electrónico antes de iniciar sesión.');
      } else {
        setFormError('Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
      }
    } finally {
      if (isMounted) {
        setIsSubmitting(false);
      }
    }
  }, [formData, validateForm, router, isMounted]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar el error cuando el usuario comienza a escribir
    if (formError) setFormError('');
  }, [formError]);

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Hubseguros</h2>
        <h3 className="text-xl font-medium">Iniciar sesión</h3>
        <p className="text-gray-500 text-sm mt-2">Ingresa tus credenciales para acceder a la plataforma</p>
      </div>
      
      {/* Error message */}
      {formError && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md">
          {formError}
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
            disabled={isSubmitting}
            autoComplete="email" 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="ejemplo@correo.com"
          />
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <Link 
              href="/recuperar-password" 
              className="text-sm text-primary hover:text-secondary"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <input 
            id="password" 
            name="password" 
            type="password" 
            value={formData.password}
            onChange={handleChange}
            disabled={isSubmitting}
            autoComplete="current-password" 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="••••••••"
          />
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link 
            href="/registro" 
            className="font-medium text-primary hover:text-secondary"
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

export default function Login() {
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
