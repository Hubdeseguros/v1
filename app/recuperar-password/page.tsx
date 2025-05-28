import Link from 'next/link';

export default function RecuperarPassword() {
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
          
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                autoComplete="email" 
                required 
                className="input-field"
                placeholder="ejemplo@correo.com"
              />
            </div>
            
            <div>
              <button 
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Enviar instrucciones
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Recordaste tu contraseña?{' '}
              <a 
                href="https://hubdeseguros.github.io/v1/login" 
                className="font-medium text-primary hover:text-secondary cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = 'https://hubdeseguros.github.io/v1/login';
                }}
              >
                Volver al inicio de sesión
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
