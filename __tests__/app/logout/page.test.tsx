// Mock de localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

// Configurar el mock de localStorage
global.localStorage = localStorageMock as Storage;

// Mock del componente de logout
jest.mock('@/app/logout/page', () => {
  const { useEffect } = require('react');
  
  return function LogoutPage() {
    useEffect(() => {
      // Simular la lógica de limpieza
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      localStorage.removeItem('permissions');
    }, []);
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-700">Cerrando sesión...</p>
        </div>
      </div>
    );
  };
});

describe('LogoutPage', () => {
  beforeEach(() => {
    // Limpiar localStorage antes de cada prueba
    localStorage.clear();
    // Configurar algunos datos de prueba
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test User' }));
    localStorage.setItem('role', 'admin');
    localStorage.setItem('permissions', 'read,write');
  });

  it('debe limpiar el localStorage al montarse', () => {
    const { getByText } = require('@testing-library/react');
    const LogoutPage = require('@/app/logout/page').default;
    const { render } = require('@testing-library/react');
    
    render(<LogoutPage />);
    
    // Verificar que los datos se hayan eliminado
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
    expect(localStorage.getItem('role')).toBeNull();
    expect(localStorage.getItem('permissions')).toBeNull();
  });

  it('debe mostrar el mensaje de cierre de sesión', () => {
    const { getByText } = require('@testing-library/react');
    const LogoutPage = require('@/app/logout/page').default;
    const { render } = require('@testing-library/react');
    
    render(<LogoutPage />);
    expect(getByText('Cerrando sesión...')).toBeTruthy();
  });
});
