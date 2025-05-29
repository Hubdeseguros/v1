import { createClient } from '@supabase/supabase-js';

// Obtener variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vcoynbjctbfyavxnyhmp.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjb3luYmpjdGJmeWF2eG55aG1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNzY4ODUsImV4cCI6MjA2Mzg1Mjg4NX0.q_5pNpcOSBpqjTkgIWoplGDc6LZlZIvTD3zeuR3lN2Q';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

// Verificar configuración
if (!supabaseUrl || !supabaseAnonKey) {
  const errorMsg = 'Error: Falta la configuración de Supabase';
  console.error(errorMsg);
  throw new Error('Falta la configuración de Supabase. Por favor, verifica las variables de entorno.');
}

// Opciones de configuración global
const supabaseOptions = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce' as const, // Usar 'as const' para el tipo literal
  },
  global: {
    headers: {
      'X-Client-Info': 'hubseguros/1.0.0',
    },
  },
};

// Crear cliente de Supabase para el lado del cliente
export const supabase = createClient(supabaseUrl, supabaseAnonKey, supabaseOptions);

// Crear cliente de administración para operaciones del lado del servidor
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  ...supabaseOptions,
  auth: {
    ...supabaseOptions.auth,
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Función para obtener el cliente de Supabase en el cliente
export const getSupabaseClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey, supabaseOptions);
};

// Función para obtener el cliente de administración
export const getSupabaseAdmin = () => {
  return createClient(supabaseUrl, supabaseServiceKey, {
    ...supabaseOptions,
    auth: {
      ...supabaseOptions.auth,
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

// Exportar configuración para pruebas
export const config = {
  url: supabaseUrl,
  anonKey: supabaseAnonKey,
  serviceKey: supabaseServiceKey,
  options: supabaseOptions,
};

// Función para inicializar la base de datos
const initializeDatabase = async () => {
  try {
    // Verificar si la tabla de perfiles existe
    const { error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .limit(1);
      
    if (error) {
      console.warn('La tabla de perfiles no existe. Creando...');
      // Aquí podrías ejecutar la migración SQL para crear la tabla
    }
  } catch (err) {
    console.error('Error al inicializar la base de datos:', err);
  }
};

// Inicializar la base de datos cuando se importe el módulo
if (typeof window === 'undefined') {
  initializeDatabase().catch(console.error);
}
