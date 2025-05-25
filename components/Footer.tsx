import Link from 'next/link';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Columna 1 - Acerca de */}
          <div>
            <h3 className="text-xl font-semibold mb-6">HubSeguros</h3>
            <p className="text-gray-300 mb-6">
              La plataforma digital que simplifica la gestión de seguros para agentes, promotores y agencias.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FiLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Columna 2 - Enlaces rápidos */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Enlaces rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/caracteristicas" className="text-gray-300 hover:text-white transition-colors">
                  Características
                </Link>
              </li>
              <li>
                <Link href="/precios" className="text-gray-300 hover:text-white transition-colors">
                  Precios
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-300 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Columna 3 - Soporte */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Soporte</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/ayuda" className="text-gray-300 hover:text-white transition-colors">
                  Centro de ayuda
                </Link>
              </li>
              <li>
                <Link href="/tutoriales" className="text-gray-300 hover:text-white transition-colors">
                  Tutoriales
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
                  Preguntas frecuentes
                </Link>
              </li>
              <li>
                <Link href="/documentacion" className="text-gray-300 hover:text-white transition-colors">
                  Documentación
                </Link>
              </li>
              <li>
                <Link href="/soporte" className="text-gray-300 hover:text-white transition-colors">
                  Soporte técnico
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Columna 4 - Contacto */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FiMapPin className="w-5 h-5 mr-3 mt-1 text-gray-300" />
                <span className="text-gray-300">
                  Calle Principal 123, Oficina 456<br />
                  Ciudad, País
                </span>
              </li>
              <li className="flex items-center">
                <FiPhone className="w-5 h-5 mr-3 text-gray-300" />
                <span className="text-gray-300">+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center">
                <FiMail className="w-5 h-5 mr-3 text-gray-300" />
                <span className="text-gray-300">info@hubseguros.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-700 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} HubSeguros. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6">
            <Link href="/terminos" className="text-gray-400 text-sm hover:text-white transition-colors">
              Términos y condiciones
            </Link>
            <Link href="/privacidad" className="text-gray-400 text-sm hover:text-white transition-colors">
              Política de privacidad
            </Link>
            <Link href="/cookies" className="text-gray-400 text-sm hover:text-white transition-colors">
              Política de cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
