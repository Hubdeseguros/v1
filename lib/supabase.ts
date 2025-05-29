import { createClient } from '@supabase/supabase-js';

// Obtener variables de entorno - No incluir valores por defecto en producción
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

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

// Inicialización segura de clientes
const createSupabaseClient = () => {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Faltan las credenciales de Supabase');
      return null;
    }
    return createClient(supabaseUrl, supabaseAnonKey, supabaseOptions);
  } catch (error) {
    console.error('Error al crear cliente Supabase:', error);
    return null;
  }
};

const createSupabaseAdmin = () => {
  try {
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Falta la clave de servicio de Supabase');
      return null;
    }
    return createClient(supabaseUrl, supabaseServiceKey, {
      ...supabaseOptions,
      auth: {
        ...supabaseOptions.auth,
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  } catch (error) {
    console.error('Error al crear cliente de administración Supabase:', error);
    return null;
  }
};

// Exportar funciones de creación
export const getSupabaseClient = createSupabaseClient;
export const getSupabaseAdmin = createSupabaseAdmin;

// Exportar instancias para compatibilidad
export const supabase = createSupabaseClient();
export const supabaseAdmin = createSupabaseAdmin();

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
    const adminClient = getSupabaseAdmin();
    if (!adminClient) {
      console.error('No se pudo inicializar el cliente de administración');
      return;
    }

    // Verificar si el usuario admin@admin.com existe
    const { data: users, error } = await adminClient
      .from('users')
      .select('*')
      .eq('email', 'admin@admin.com');

    if (error) {
      console.error('Error al verificar usuario admin:', error);
      return;
    }

    // Si no existe el usuario admin, crearlo
    if (!users || users.length === 0) {
      const { data, error: createError } = await adminClient.auth.admin.createUser({
        email: 'admin@admin.com',
        password: 'admin123',
        email_confirm: true,
        user_metadata: { name: 'Admin' }
      });

      if (createError) {
        console.error('Error al crear usuario admin:', createError);
        return;
      }
      
      console.log('Usuario admin creado exitosamente');
    }
  } catch (error) {
    console.error('Error en initializeDatabase:', error);
  }
};

// Inicializar la base de datos cuando se importe el módulo
if (typeof window === 'undefined') {
  initializeDatabase().catch(console.error);
}
