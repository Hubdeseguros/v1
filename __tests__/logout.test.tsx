// Importar el mock de localStorage
import { createLocalStorageMock } from './__mocks__/localStorageMock';

// Configurar el mock de localStorage
const localStorageMock = createLocalStorageMock();

describe('Logout functionality', () => {
  beforeEach(() => {
    // Limpiar localStorage antes de cada prueba
    localStorage.clear();
    // Configurar algunos datos de prueba
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test User' }));
    localStorage.setItem('role', 'admin');
    localStorage.setItem('permissions', 'read,write');
  });

  it('debe limpiar el localStorage correctamente', () => {
    // Simular la función de logout
    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      localStorage.removeItem('permissions');
    };

    // Ejecutar la función de logout
    logout();

    // Verificar que los datos se hayan eliminado
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
    expect(localStorage.getItem('role')).toBeNull();
    expect(localStorage.getItem('permissions')).toBeNull();
  });

  it('no debe tener datos sensibles después del logout', () => {
    // Simular la función de logout
    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      localStorage.removeItem('permissions');
    };

    // Verificar que los datos existen antes del logout
    expect(localStorage.getItem('token')).not.toBeNull();
    expect(localStorage.getItem('user')).not.toBeNull();
    expect(localStorage.getItem('role')).not.toBeNull();
    expect(localStorage.getItem('permissions')).not.toBeNull();

    // Ejecutar la función de logout
    logout();

    // Verificar que los datos ya no existen
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
    expect(localStorage.getItem('role')).toBeNull();
    expect(localStorage.getItem('permissions')).toBeNull();
  });
});
