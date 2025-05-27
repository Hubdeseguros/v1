import { createClient } from '@supabase/supabase-js'

// URLs de Supabase
const supabaseUrl = 'https://vcoynbjctbfyavxnyhmp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjb3luYmpjdGJmeWF2eG55aG1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNzY4ODUsImV4cCI6MjA2Mzg1Mjg4NX0.q_5pNpcOSBpqjTkgIWoplGDc6LZlZIvTD3zeuR3lN2Q'

// Verificar configuración
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase configuration')
}

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Exportar configuración para pruebas
export const config = {
  url: supabaseUrl,
  anonKey: supabaseAnonKey
}
