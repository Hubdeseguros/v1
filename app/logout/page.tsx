"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();
  
  useEffect(() => {
    const logout = async () => {
      // Limpiar tokens y datos de sesión
      if (typeof window !== "undefined") {
        try {
          // Limpiar todos los datos de sesión
          localStorage.clear();
          
          // Forzar una recarga completa para limpiar el estado de la aplicación
          window.location.href = '/';
          
        } catch (error) {
          console.error("Error al limpiar sesión:", error);
          window.location.href = '/';
        }
      } else {
        // En caso de que window no esté disponible, redirigir de todos modos
        router.push("/");
      }
    };
    
    logout();
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
