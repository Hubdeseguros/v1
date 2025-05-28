'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Opcional: Registrar el error en un servicio de monitoreo
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-2xl w-full text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">¡Algo salió mal!</h2>
        <p className="text-lg text-gray-600 mb-8">
          Lo sentimos, ha ocurrido un error inesperado.
        </p>
        <button
          onClick={() => reset()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200 mr-4"
        >
          Reintentar
        </button>
        <a 
          href="/" 
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-lg transition duration-200"
        >
          Volver al Inicio
        </a>
      </div>
    </div>
  );
}
