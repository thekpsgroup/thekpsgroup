import type { APIRoute } from 'astro';
import { authenticateUser, LoginSchema } from '../../../lib/auth';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Validate input
    const validation = LoginSchema.safeParse({ email, password });
    if (!validation.success) {
      return new Response(JSON.stringify({
        success: false,
        error: validation.error.errors[0].message
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Authenticate user
    const result = await authenticateUser(email, password);
    
    if (!result.success) {
      return new Response(JSON.stringify({
        success: false,
        error: result.error
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Set session cookie
    const response = new Response(JSON.stringify({
      success: true,
      user: result.user,
      redirect: result.user?.role === 'admin' ? '/admin' : '/dashboard'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

    // Set secure session cookie
    response.headers.set('Set-Cookie', 
      `session=${result.sessionToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400`
    );

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'An unexpected error occurred'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
