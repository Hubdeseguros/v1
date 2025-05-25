import { FiCheckCircle, FiClock, FiBarChart2, FiHeadphones } from 'react-icons/fi';

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Beneficios de usar Hubseguros
        </h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
          Nuestra plataforma está diseñada específicamente para facilitar el trabajo diario de agentes, 
          promotores y agencias de seguros.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="text-center p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-6">
              <FiCheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Organiza tu cartera</h3>
            <p className="text-gray-600">
              Gestiona de forma eficiente tus clientes, pólizas y siniestros en una sola plataforma integrada.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="text-center p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-6">
              <FiClock className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Ahorra tiempo</h3>
            <p className="text-gray-600">
              Automatiza tareas repetitivas y procesos administrativos para centrarte en lo que realmente importa.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="text-center p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-6">
              <FiBarChart2 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Impulsa tus ventas</h3>
            <p className="text-gray-600">
              Identifica oportunidades de venta cruzada y seguimiento de renovaciones para aumentar tu cartera.
            </p>
          </div>
          
          {/* Feature 4 */}
          <div className="text-center p-6 border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-6">
              <FiHeadphones className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Soporte humano</h3>
            <p className="text-gray-600">
              Contamos con un equipo de especialistas que te ayudarán en todo momento con cualquier consulta.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
