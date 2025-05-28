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
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
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
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  };

  const signOut = async () => {
    try {
      // 1. Limpiar el estado local primero para una respuesta más rápida
      setUser(null);
      
      // 2. Intentar cerrar sesión en Supabase
      await supabase.auth.signOut();
      
      // 3. Limpiar almacenamiento local
      if (typeof window !== 'undefined') {
        // Limpiar localStorage y sessionStorage
        localStorage.clear();
        sessionStorage.clear();
        
        // Limpiar cookies
        document.cookie.split(';').forEach(cookie => {
          const [name] = cookie.trim().split('=');
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
        });
        
        // Redirigir a la página de login
        const basePath = process.env.NODE_ENV === 'production' ? '/v1' : '';
        const loginUrl = `${window.location.origin}${basePath}/login`;
        
        // Usar replace para evitar que el usuario pueda volver atrás
        window.location.replace(loginUrl);
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      // Asegurar la redirección incluso si hay un error
      if (typeof window !== 'undefined') {
        const basePath = process.env.NODE_ENV === 'production' ? '/v1' : '';
        window.location.replace(`${window.location.origin}${basePath}/login`);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
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
