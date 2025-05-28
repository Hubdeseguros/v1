import { createClient } from '@supabase/supabase-js'

// Obtener variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vcoynbjctbfyavxnyhmp.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjb3luYmpjdGJmeWF2eG55aG1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNzY4ODUsImV4cCI6MjA2Mzg1Mjg4NX0.q_5pNpcOSBpqjTkgIWoplGDc6LZlZIvTD3zeuR3lN2Q'

// Verificar configuración
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Falta la configuración de Supabase')
  throw new Error('Falta la configuración de Supabase. Por favor, verifica las variables de entorno.')
}

// Opciones de configuración global
export const supabaseOptions = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
}

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, supabaseOptions)

// Función para obtener el cliente de Supabase en el cliente
export const getSupabaseClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey, supabaseOptions)
}

// Exportar configuración para pruebas
export const config = {
  url: supabaseUrl,
  anonKey: supabaseAnonKey,
  options: supabaseOptions
}
