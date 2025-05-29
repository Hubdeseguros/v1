import { createClient } from '@supabase/supabase-js';

// Obtener variables de entorno - No incluir valores por defecto en producción
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

// Verificar configuración en tiempo de ejecución
const checkConfig = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    const errorMsg = 'Error: Falta la configuración de Supabase';
    if (typeof window !== 'undefined') {
      console.error(errorMsg);
    }
    return false;
  }
  return true;
};

// Inicializar solo si estamos en el cliente y la configuración es válida
const isClient = typeof window !== 'undefined';
const isConfigValid = checkConfig();

// Opciones de configuración global
const supabaseOptions = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce' as const,
    debug: process.env.NODE_ENV === 'development',
  },
  global: {
    headers: {
      'X-Client-Info': 'hubseguros/1.0.0',
    },
  },
};

// Inicialización condicional de clientes
let supabase: ReturnType<typeof createClient>;
let supabaseAdmin: ReturnType<typeof createClient>;

if (isClient && isConfigValid) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey, supabaseOptions);
    
    // Solo inicializar el cliente de administración si tenemos la clave de servicio
    if (supabaseServiceKey) {
      supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
        ...supabaseOptions,
        auth: {
          ...supabaseOptions.auth,
          autoRefreshToken: false,
          persistSession: false,
        },
      });
    }
  } catch (error) {
    console.error('Error al inicializar Supabase:', error);
  }
}

export { supabase, supabaseAdmin };

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
