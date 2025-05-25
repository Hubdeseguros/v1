import React from 'react';
import Link from 'next/link';

interface SubMenuItem {
  name: string;
  href: string;
  description: string;
}

interface ItemDashboardProps {
  title: string;
  icon: React.ReactNode;
  subItems: SubMenuItem[];
}

const ItemDashboard: React.FC<ItemDashboardProps> = ({ title, icon, subItems }) => {
  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <div className="bg-primary p-2 rounded-lg text-white mr-3">
          {icon}
        </div>
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="p-6 flex flex-col items-center text-center">
              <div className="bg-blue-50 p-4 rounded-full mb-4">
                {icon}
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ItemDashboard;
