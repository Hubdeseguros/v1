'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getSupabaseClient } from '@/lib/supabase';

const supabase = getSupabaseClient();

export default function RecuperarPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      // Validar formato de correo
      if (!email.trim()) {
        setMessage('Por favor ingresa tu correo electrónico');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setMessage('Por favor ingresa un correo electrónico válido');
        return;
      }

      // Verificar que supabase esté inicializado
      if (!supabase) {
        setMessage('Error de configuración del servidor: Supabase no inicializado');
        setLoading(false);
        return;
      }
      // Implementar la lógica real de recuperación
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback`
      });

      if (error) {
        if (error.message.includes('Email not found')) {
          setMessage('No existe una cuenta con este correo electrónico.');
        } else {
          setMessage('Ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo.');
          console.error('Error al recuperar contraseña:', error);
        }
        return;
      }

      setMessage('Si existe una cuenta con este correo, recibirás un enlace para restablecer tu contraseña.');
    } catch (error) {
      console.error('Error inesperado:', error);
      setMessage('Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Panel izquierdo */}
      <div className="w-full md:w-1/2 bg-primary flex flex-col justify-center p-8 md:p-16">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-white mb-4">Recupera tu acceso</h1>
          <p className="text-white/80 mb-8">
            Te enviaremos un enlace a tu correo electrónico para que puedas restablecer tu contraseña.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center text-white/90">
              <svg className="w-5 h-5 mr-3 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Proceso rápido y seguro</span>
            </li>
            <li className="flex items-center text-white/90">
              <svg className="w-5 h-5 mr-3 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Recupera el acceso en minutos</span>
            </li>
            <li className="flex items-center text-white/90">
              <svg className="w-5 h-5 mr-3 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Soporte disponible si necesitas ayuda</span>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Panel derecho */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Hubseguros</h2>
            <h3 className="text-xl font-medium">Recuperar contraseña</h3>
            <p className="text-gray-500 text-sm mt-2">Ingresa tu correo electrónico para recibir instrucciones</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  autoComplete="email" 
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="ejemplo@correo.com"
                />
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Enviando...' : 'Enviar instrucciones'}
              </button>
              
              {message && (
                <div className="mt-4 p-3 bg-blue-50 text-blue-700 text-sm rounded-md">
                  {message}
                </div>
              )}
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Recordaste tu contraseña?{' '}
              <Link 
                href="/login" 
                className="font-medium text-primary hover:text-secondary"
              >
                Volver al inicio de sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
