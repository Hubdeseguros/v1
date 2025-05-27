import { createClient } from '@supabase/supabase-js'

// URLs de Supabase
const supabaseUrl = 'https://etmeatsghjqbjbunzbqw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0bWVhdHNnaGpxYmpidW56YnF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5Nzc3NzIsImV4cCI6MjA2MzU1Mzc3Mn0.5iRafkYja32Sfngq65W-3g_vM7ES1HdRtjqedDoTk4w'

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
