import { createClient } from '@supabase/supabase-js';

// Configuración directa para la prueba
const supabaseUrl = 'https://vcoynbjctbfyavxnyhmp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjb3luYmpjdGJmeWF2eG55aG1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNzY4ODUsImV4cCI6MjA2Mzg1Mjg4NX0.q_5pNpcOSBpqjTkgIWoplGDc6LZlZIvTD3zeuR3lN2Q';

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  }
});

async function testConnection() {
  try {
    console.log('🔍 Probando conexión con Supabase...');
    
    // 1. Probar conexión básica
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Error en la consulta:', error.message);
      return;
    }
    
    console.log('✅ Conexión exitosa!');
    console.log('📊 Datos de prueba:', data);
    
    // 2. Obtener información de la sesión actual
    const { data: { session } } = await supabase.auth.getSession();
    console.log('🔐 Sesión actual:', session ? 'Autenticado' : 'No autenticado');
    
  } catch (error) {
    console.error('❌ Error inesperado:', error);
  } finally {
    console.log('🏁 Prueba finalizada');
    process.exit(0);
  }
}

testConnection();
