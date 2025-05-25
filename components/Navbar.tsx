import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm py-4 px-6 md:px-10 fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold">
            <span className="text-primary">Hub</span>
            <span className="text-secondary">seguros</span>
          </span>
        </Link>
        
        <div className="hidden md:flex space-x-8">
          {/* Elementos de navegación eliminados según solicitud */}
        </div>
        
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-sm text-primary hover:text-secondary transition-colors">
            Iniciar sesión
          </Link>
          <Link href="/demo" className="bg-primary text-white text-sm py-2 px-4 rounded-md hover:bg-secondary transition-colors">
            Solicitar demo
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
