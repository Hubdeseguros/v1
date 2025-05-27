import { NextResponse } from 'next/server'
import { supabase, config } from '@/lib/supabase'

export async function GET() {
  try {
    // Intentar obtener información básica
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      return NextResponse.json({ 
        status: 'error',
        message: 'Error al obtener información de usuario',
        error: error.message
      }, { status: 500 })
    }

    // Intentar hacer una consulta simple
    const { data: testTableData, error: testError } = await supabase
      .from('auth.users')
      .select('id, email')
      .limit(1)

    if (testError) {
      return NextResponse.json({ 
        status: 'error',
        message: 'Error al consultar tabla',
        error: testError.message
      }, { status: 500 })
    }

    return NextResponse.json({
      status: 'success',
      message: 'Conexión exitosa a Supabase',
      data: {
        user: user,
        testQuery: testTableData,
        authenticated: !!user,
        config: {
          url: config.url,
          hasAuth: !!user
        }
      }
    })
  } catch (error: any) {
    return NextResponse.json({ 
      status: 'error',
      message: 'Error general al conectar con Supabase',
      error: error.message || 'Error desconocido'
    }, { status: 500 })
  }
}
