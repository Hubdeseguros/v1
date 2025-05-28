import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { act } from 'react-dom/test-utils';
import { supabase } from '@/lib/supabase';

// Mock de Supabase
const mockUser = {
  id: 'test-user-id',
  email: 'test@example.com',
  user_metadata: { full_name: 'Test User' },
  role: 'ADMIN'
};

const mockSession = {
  user: {
    id: 'test-user-id',
    email: 'test@example.com',
    user_metadata: { full_name: 'Test User' }
  },
  access_token: 'test-access-token',
  refresh_token: 'test-refresh-token'
};

// Mock de las funciones de Supabase
jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn().mockResolvedValue({
        data: { user: mockUser, session: mockSession },
        error: null
      }),
      signOut: jest.fn().mockResolvedValue({ error: null }),
      onAuthStateChange: jest.fn().mockImplementation((callback) => {
        // Simular cambio de estado de autenticación
        callback('SIGNED_IN', mockSession);
        return { data: { subscription: { unsubscribe: jest.fn() } } };
      }),
      getSession: jest.fn().mockResolvedValue({
        data: { session: mockSession },
        error: null
      })
    },
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({
      data: { role: 'ADMIN' },
      error: null
    })
  }
}));

// Componente de prueba para el flujo de autenticación
const AuthTestComponent = () => {
  const { user, signIn, signOut } = useAuth();
  const [authState, setAuthState] = React.useState('idle');

  const handleSignIn = async () => {
    setAuthState('signingIn');
    try {
      await signIn('test@example.com', 'password');
      setAuthState('signedIn');
    } catch (error) {
      setAuthState('error');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setAuthState('signedOut');
  };

  return (
    <div>
      <div data-testid="auth-state">{authState}</div>
      {user ? (
        <>
          <div data-testid="user-email">{user.email}</div>
          <button onClick={handleSignOut} data-testid="signout-button">
            Cerrar sesión
          </button>
        </>
      ) : (
        <button onClick={handleSignIn} data-testid="signin-button">
          Iniciar sesión
        </button>
      )}
    </div>
  );
};

describe('Flujo de Autenticación', () => {
  beforeEach(() => {
    // Limpiar mocks antes de cada prueba
    jest.clearAllMocks();
    // Limpiar almacenamiento
    localStorage.clear();
    sessionStorage.clear();
  });

  it('debe permitir el inicio de sesión exitoso', async () => {
    render(
      <AuthProvider>
        <AuthTestComponent />
      </AuthProvider>
    );

    // Simular clic en el botón de inicio de sesión
    const signInButton = screen.getByTestId('signin-button');
    fireEvent.click(signInButton);

    // Verificar que se muestra el estado de carga
    expect(screen.getByTestId('auth-state').textContent).toBe('signingIn');

    // Esperar a que se complete el inicio de sesión
    await screen.findByText('test@example.com');

    // Verificar que se actualizó el estado
    expect(screen.getByTestId('auth-state').textContent).toBe('signedIn');
  });

  it('debe manejar errores de inicio de sesión', async () => {
    // Mock de error de autenticación
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValueOnce({
      data: { user: null, session: null },
      error: { message: 'Credenciales inválidas' }
    });

    render(
      <AuthProvider>
        <AuthTestComponent />
      </AuthProvider>
    );

    // Simular clic en el botón de inicio de sesión
    const signInButton = screen.getByTestId('signin-button');
    await act(async () => {
      fireEvent.click(signInButton);
    });

    // Verificar que se muestra el estado de error
    expect(screen.getByTestId('auth-state').textContent).toBe('error');
  });

  it('debe permitir el cierre de sesión', async () => {
    // Configurar sesión activa
    (supabase.auth.getSession as jest.Mock).mockResolvedValueOnce({
      data: { session: mockSession },
      error: null
    });

    render(
      <AuthProvider>
        <AuthTestComponent />
      </AuthProvider>
    );

    // Verificar que el usuario está autenticado
    await screen.findByText('test@example.com');

    // Simular clic en el botón de cierre de sesión
    const signOutButton = screen.getByTestId('signout-button');
    await act(async () => {
      fireEvent.click(signOutButton);
    });

    // Verificar que se cerró la sesión
    expect(supabase.auth.signOut).toHaveBeenCalled();
    expect(localStorage.length).toBe(0);
  });
});
