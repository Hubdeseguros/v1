import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '+584248842500',
  message = 'Hola, necesito más información sobre sus servicios',
  className = ''
}) => {
  // Formatear el número de teléfono (eliminar todo excepto números)
  const formattedPhone = phoneNumber.replace(/\D/g, '');
  
  // Crear el enlace de WhatsApp
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 bg-accent hover:bg-secondary text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 z-50 ${className}`}
      aria-label="Chatear por WhatsApp"
    >
      <FaWhatsapp className="text-2xl" />
    </a>
  );
};

export default WhatsAppButton;