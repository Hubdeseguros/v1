// Importaciones de testing-library
import { render, screen, act } from '@testing-library/react';
import { createLocalStorageMock } from '../../__mocks__/localStorageMock';
import LogoutPage from '@/app/logout/page';

// Configurar el mock de localStorage
const localStorageMock = createLocalStorageMock();

// Mock de next/navigation
const mockPush = jest.fn();
const mockReplace = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
  }),
}));

// Mock de timers para manejar setTimeout
jest.useFakeTimers();

describe('LogoutPage', () => {
  // Datos de prueba
  const testUser = { id: 1, name: 'Test User' };
  const testToken = 'test-token';
  const testRole = 'admin';
  const testPermissions = 'read,write';

  beforeEach(() => {
    // Limpiar localStorage antes de cada prueba
    localStorage.clear();
    
    // Configurar algunos datos de prueba
    localStorage.setItem('token', testToken);
    localStorage.setItem('user', JSON.stringify(testUser));
    localStorage.setItem('role', testRole);
    localStorage.setItem('permissions', testPermissions);
    
    // Limpiar todos los mocks antes de cada prueba
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Limpiar localStorage después de cada prueba
    localStorage.clear();
    // Limpiar todos los timers pendientes
    jest.clearAllTimers();
  });

  afterAll(() => {
    // Restaurar los timers originales después de todas las pruebas
    jest.useRealTimers();
  });

  it('debe limpiar el localStorage al montarse', async () => {
    // Act
    render(<LogoutPage />);
    
    // Avanzar el tiempo para que se ejecute el efecto
    act(() => {
      jest.advanceTimersByTime(150);
    });
    
    // Assert
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
    expect(localStorage.getItem('role')).toBeNull();
    expect(localStorage.getItem('permissions')).toBeNull();
  });

  it('debe mostrar el mensaje de cierre de sesión', () => {
    // Act
    render(<LogoutPage />);
    
    // Assert
    const loadingText = screen.getByText(/cerrando sesión/i);
    expect(loadingText).toBeInTheDocument();
  });

  it('debe redirigir al inicio después de cerrar sesión', () => {
    // Act
    render(<LogoutPage />);
    
    // Avanzar el tiempo para que se ejecute el efecto
    act(() => {
      jest.advanceTimersByTime(150);
    });
    
    // Assert
    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
