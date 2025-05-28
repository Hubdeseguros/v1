import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { act } from 'react-dom/test-utils';

// Mock de las funciones necesarias
const mockSignOut = jest.fn().mockResolvedValue({ error: null });

// Mock de Supabase
jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      signOut: () => mockSignOut(),
      onAuthStateChange: jest.fn(),
      getSession: jest.fn().mockResolvedValue({ data: { session: null }, error: null })
    },
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({ data: null, error: null })
  }
}));

// Componente de prueba simple
const TestComponent = () => {
  const { signOut } = useAuth();
  return (
    <button onClick={signOut} data-testid="signout-button">
      Cerrar sesión
    </button>
  );
};

describe('AuthContext', () => {
  let originalLocation: Location;
  let originalHref: string;

  beforeEach(() => {
    // Guardar implementación original
    originalLocation = window.location;
    originalHref = window.location.href;
    
    // Limpiar mocks antes de cada prueba
    jest.clearAllMocks();
    
    // Limpiar almacenamiento
    localStorage.clear();
    sessionStorage.clear();
    
    // Configurar cookie de prueba
    document.cookie = 'test-cookie=value';
    
    // Mock de window.location.href
    Object.defineProperty(window, 'location', {
      value: { ...window.location, href: '' },
      writable: true,
    });
  });

  afterEach(() => {
    // Restaurar implementación original
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
    });
    window.location.href = originalHref;
  });

  it('debe limpiar el almacenamiento al cerrar sesión', async () => {
    // Configurar datos de prueba
    localStorage.setItem('test', 'test-value');
    sessionStorage.setItem('session-test', 'session-value');
    
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Simular clic en el botón de cierre de sesión
    const signOutButton = screen.getByTestId('signout-button');
    
    await act(async () => {
      fireEvent.click(signOutButton);
    });

    // Verificar que se llamó a signOut de Supabase
    expect(mockSignOut).toHaveBeenCalled();
    
    // Verificar que se limpió el almacenamiento
    expect(localStorage.length).toBe(0);
    expect(sessionStorage.length).toBe(0);
    
    // Verificar que se intentó redirigir
    expect(window.location.href).toBe('/login');
  });
});
