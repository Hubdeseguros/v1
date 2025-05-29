import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { getSupabaseAdmin } from '@/lib/supabase';

// Obtener cliente de Supabase para el manejador de rutas
const supabase = createRouteHandlerClient({ cookies });
// Obtener cliente de administración de Supabase
const supabaseAdmin = getSupabaseAdmin();

export async function POST(request: Request) {
  try {
    const { email, password, full_name } = await request.json();
    
    if (!email || !password || !full_name) {
      return NextResponse.json(
        { error: { message: 'Todos los campos son obligatorios' } },
        { status: 400 }
      );
    }

    // Verificar si el correo ya está en uso
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: { message: 'Error de configuración del servidor: Supabase Admin no inicializado' } },
        { status: 500 }
      );
    }
    const { data: existingUser, error: userCheckError } = await supabaseAdmin
      .from('profiles')
      .select('email')
      .eq('email', email.trim().toLowerCase())
      .maybeSingle();

    if (userCheckError) {
      console.error('Error al verificar usuarios existentes:', userCheckError);
      throw userCheckError;
    }
    
    if (existingUser) {
      return NextResponse.json(
        { error: { message: 'Este correo electrónico ya está registrado' } },
        { status: 400 }
      );
    }

    // Registrar al usuario usando el cliente de autenticación
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password: password.trim(),
      options: {
        data: {
          full_name: full_name.trim(),
          email_redirect_to: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`
      },
    });

    if (signUpError) {
      console.error('Error en signUp:', signUpError);
      throw signUpError;
    }

    // El trigger en la base de datos debería crear automáticamente el perfil
    // Verificamos después de un breve retraso para asegurar que el trigger se haya ejecutado
    if (authData.user) {
      try {
        // Esperar un momento para que se complete el trigger
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Verificar si el perfil se creó correctamente
        const { data: profile, error: profileError } = await supabaseAdmin
          .from('profiles')
          .select('*')
          .eq('id', authData.user.id)
          .single();
          
        if (profileError || !profile) {
          console.error('Error al verificar el perfil:', profileError);
          throw new Error('No se pudo crear el perfil del usuario');
        }
      } catch (error) {
        console.error('Error en la verificación del perfil:', error);
        // Si hay algún error, intentar eliminar el usuario de auth
        if (authData.user) {
          await supabaseAdmin.auth.admin.deleteUser(authData.user.id).catch(console.error);
        }
        throw error;
      }
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error('Error en registro:', error);
    return NextResponse.json(
      { 
        error: { 
          message: error.message || 'Error al procesar el registro. Por favor, inténtalo de nuevo.' 
        } 
      },
      { status: 500 }
    );
  }
}
