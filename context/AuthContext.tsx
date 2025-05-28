'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';

type User = {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
  role?: 'ADMIN' | 'AGENCIA' | 'PROMOTOR' | 'CLIENTE';
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, userData: { full_name: string }) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Verificar sesión activa al cargar
    const checkUser = async () => {
      try {
        setLoading(true);
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (session?.user) {
          // Obtener datos adicionales del perfil del usuario
          const { data: userData, error: userError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (userError) throw userError;
          
          setUser({
            id: session.user.id,
            email: session.user.email,
            user_metadata: {
              full_name: userData?.full_name || session.user.email?.split('@')[0],
              avatar_url: userData?.avatar_url
            },
            role: userData?.role || 'CLIENTE'
          });
        } else {
          setUser(null);
          // Redirigir a login si no está autenticado y no está en la página de login
          if (!pathname.startsWith('/login') && !pathname.startsWith('/recuperar-password')) {
            router.push('/login');
          }
        }
      } catch (error) {
        console.error('Error al verificar sesión:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Escuchar cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: userData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        setUser({
          id: session.user.id,
          email: session.user.email,
          user_metadata: {
            full_name: userData?.full_name || session.user.email?.split('@')[0],
            avatar_url: userData?.avatar_url
          },
          role: userData?.role || 'CLIENTE'
        });
      } else {
        setUser(null);
        if (!pathname.startsWith('/login') && !pathname.startsWith('/recuperar-password')) {
          router.push('/login');
        }
      }
    });

    return () => {
      // Limpiar suscripción
      subscription?.unsubscribe();
    };
  }, [pathname, router]);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message || 'Error al iniciar sesión');
      }

      // Obtener el perfil del usuario después del inicio de sesión exitoso
      if (data?.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError) throw profileError;

        setUser({
          id: data.user.id,
          email: data.user.email || '',
          user_metadata: {
            full_name: profile?.full_name || '',
            avatar_url: profile?.avatar_url
          },
          role: profile?.role || 'CLIENTE'
        });
      }

      return { error: null };
    } catch (error: any) {
      const errorMessage = error.message || 'Error al iniciar sesión';
      setError(errorMessage);
      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: { full_name: string }) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Crear el usuario en Auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.full_name,
          },
        },
      });

      if (signUpError) throw signUpError;

      // 2. Crear el perfil del usuario en la base de datos
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              email,
              full_name: userData.full_name,
              role: 'CLIENTE', // Rol por defecto
            },
          ]);

        if (profileError) throw profileError;

        // Actualizar el estado del usuario
        setUser({
          id: authData.user.id,
          email: authData.user.email || '',
          user_metadata: {
            full_name: userData.full_name,
          },
          role: 'CLIENTE',
        });
      }

      return { error: null };
    } catch (error: any) {
      const errorMessage = error.message || 'Error al registrar el usuario';
      setError(errorMessage);
      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      const errorMessage = error.message || 'Error al enviar el correo de recuperación';
      setError(errorMessage);
      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      // 1. Limpiar el estado local primero para una respuesta más rápida
      setUser(null);
      
      // 2. Limpiar almacenamiento local antes de redirigir
      if (typeof window !== 'undefined') {
        // Limpiar localStorage y sessionStorage
        localStorage.clear();
        sessionStorage.clear();
        
        // Limpiar cookies
        document.cookie.split(';').forEach(cookie => {
          const [name] = cookie.trim().split('=');
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
        });
      }
      
      // 3. Intentar cerrar sesión en Supabase (sin esperar la respuesta)
      supabase.auth.signOut().catch(error => {
        console.error('Error al cerrar sesión en Supabase:', error);
      });
      
      // 4. Redirigir a la página de login en el dominio especificado
      if (typeof window !== 'undefined') {
        // Usar el router de Next.js para la navegación inicial
        router.push('https://hubdeseguros.github.io/v1/login/');
        // Forzar recarga para limpiar el estado de la aplicación y asegurar la redirección
        window.location.href = 'https://hubdeseguros.github.io/v1/login/';
      }
      
    } catch (error) {
      console.error('Error en el proceso de cierre de sesión:', error);
      // Asegurar la redirección incluso si hay un error
      if (typeof window !== 'undefined') {
        window.location.href = 'https://hubdeseguros.github.io/v1/login/';
      }
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        error,
        signIn, 
        signUp,
        signOut, 
        resetPassword 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}
