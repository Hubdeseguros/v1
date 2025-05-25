import Link from 'next/link';

const Hero = () => {
  return (
    <section className="bg-primary text-white py-20 md:py-32">
      <div className="container mx-auto px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            La plataforma que simplifica tu trabajo como agente de seguros
          </h1>
          <p className="text-lg md:text-xl mb-10">
            Gestiona clientes, pólizas y siniestros en un solo lugar. Ahorra tiempo y aumenta tu productividad.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/registro" className="bg-white text-primary font-medium py-3 px-8 rounded-md hover:bg-gray-100 transition-all duration-300">
              Comenzar ahora
            </Link>
            <Link href="/demo" className="bg-transparent text-white font-medium py-3 px-8 rounded-md border border-white hover:bg-white/10 transition-all duration-300">
              Solicitar una demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
