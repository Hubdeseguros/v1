'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Función para limpiar la sesión
    const clearSession = () => {
      try {
        // Limpiar todos los datos de sesión
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        localStorage.removeItem('permissions');
        
        // Redirigir al inicio usando el enrutador de Next.js
        router.push('/');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
        // En caso de error, intentar redirigir de todos modos
        router.push('/');
      }
    };
    
    // Pequeño retraso para asegurar que la UI se actualice
    const timer = setTimeout(clearSession, 100);
    
    // Limpiar el temporizador si el componente se desmonta
    return () => clearTimeout(timer);
  }, [router]);

  // Mostrar un mensaje de cierre de sesión mientras se redirige
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-700">Cerrando sesión...</p>
      </div>
    </div>
  );
}
