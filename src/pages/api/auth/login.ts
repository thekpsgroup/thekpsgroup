import type { APIRoute } from 'astro';
import { Database } from '../../../utils/database.ts';

// POST - Authenticate user
export const POST: APIRoute = async ({ request }) => {
  try {
    const database = new Database();
    const { identifier, password } = await request.json();

    // Validate required fields
    if (!identifier || !password) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Username/email and password are required'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = database.authenticateUser(identifier, password);

    if (result.success) {
      return new Response(JSON.stringify({
        success: true,
        user: result.user,
        message: 'Authentication successful'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({
        success: false,
        error: result.error
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('Auth API error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Authentication failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
