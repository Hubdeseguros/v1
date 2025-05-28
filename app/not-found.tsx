import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Logo de Hubseguros */}
        <div className="mb-8">
          <Link href="/">
            <div className="text-3xl font-bold text-blue-600">HUBSEGUROS</div>
          </Link>
        </div>
        
        {/* Imagen */}
        <div className="relative w-full h-64 md:h-80 lg:h-96 mb-8 rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/bienvenida-404.png"
            alt="Bienvenido a Hubseguros"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Mensaje */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          ¡Bienvenido a Hubseguros!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          La página que buscas no existe, pero estamos aquí para ayudarte.
        </p>
        
        {/* Botón de volver al inicio */}
        <Link 
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
