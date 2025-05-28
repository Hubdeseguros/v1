"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();
  
  useEffect(() => {
    const logout = () => {
      try {
        // 1. Limpiar todos los datos de sesión
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('role');
          localStorage.removeItem('permissions');
          
          // 2. Forzar una recarga completa para limpiar el estado de la aplicación
          // Usando replace para evitar que el usuario pueda volver atrás a la sesión
          window.location.replace('/');
        }
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
        // Si hay un error, redirigir de todos modos
        window.location.replace('/');
      }
    };
    
    // Pequeño retraso para asegurar que la UI se actualice
    const timer = setTimeout(logout, 100);
    
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
