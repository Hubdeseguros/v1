'use client';

import { useState, FormEvent, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getSupabaseClient } from '@/lib/supabase';

export default function Registro() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const supabase = getSupabaseClient();

  const validateForm = useCallback(() => {
    if (!formData.nombre.trim()) {
      setError('El nombre es obligatorio');
      return false;
    }
    if (!/^[A-Za-z\sñÑáéíóúÁÉÍÓÚ]+$/i.test(formData.nombre)) {
      setError('El nombre debe contener solo letras y espacios');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Por favor ingresa un correo electrónico válido');
      return false;
    }
    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }
    return true;
  }, [formData]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar el error cuando el usuario comienza a escribir
    if (error) setError('');
  }, [error]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      
      // Validar términos y condiciones
      if (!formData.terms) {
        setError('Debes aceptar los términos y condiciones');
        setIsSubmitting(false);
        return;
      }

      // Registrar el usuario
      const { error } = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          full_name: formData.nombre.trim()
        }),
      }).then(res => res.json());

      if (error) {
        setError(error.message || 'Error al registrar. Intenta de nuevo.');
        setIsSubmitting(false);
        return;
      }
      
      // Redirigir a la página de verificación
      router.push('/verificar-email');
      
    } catch (error) {
      console.error('Error en el registro:', error);
      setError('Error inesperado. Por favor, inténtalo de nuevo.');
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Panel izquierdo */}
      <div className="w-full md:w-1/2 bg-primary flex flex-col justify-center p-8 md:p-16">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-white mb-4">Únete a HubSeguros</h1>
          <p className="text-white/80 mb-8">
            Crea tu cuenta y comienza a potenciar tu negocio de seguros con nuestra plataforma.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center text-white/90">
              <svg className="w-5 h-5 mr-3 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Acceso a herramientas especializadas</span>
            </li>
            <li className="flex items-center text-white/90">
              <svg className="w-5 h-5 mr-3 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Gestión centralizada de todas tus pólizas</span>
            </li>
            <li className="flex items-center text-white/90">
              <svg className="w-5 h-5 mr-3 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Reportes y análisis de rendimiento</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Panel derecho */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Hubseguros</h2>
            <h3 className="text-xl font-medium">Crear cuenta</h3>
            <p className="text-gray-500 text-sm mt-2">Completa tus datos para registrarte</p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-md">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
              <input 
                id="nombre" 
                name="nombre" 
                type="text" 
                value={formData.nombre}
                onChange={handleChange}
                autoComplete="name" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Juan Pérez"
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email}
                onChange={handleChange}
                autoComplete="email" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="ejemplo@correo.com"
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="••••••••"
                disabled={isSubmitting}
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
              <input 
                id="confirmPassword" 
                name="confirmPassword" 
                type="password" 
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="••••••••"
                disabled={isSubmitting}
              />
            </div>
            
            <div className="flex items-center">
              <input 
                id="terms" 
                name="terms" 
                type="checkbox" 
                required
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" 
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                Acepto los{' '}
                <Link 
                  href="https://hubdeseguros.github.io/v1/terminos" 
                  className="text-primary hover:text-secondary cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'https://hubdeseguros.github.io/v1/terminos';
                  }}
                >
                  términos y condiciones
                </Link>
              </label>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <Link 
                href="/login" 
                className="font-medium text-primary hover:text-secondary cursor-pointer"
              >
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
