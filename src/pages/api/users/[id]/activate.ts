import type { APIRoute } from 'astro';
import { Database } from '../../../../utils/database.ts';

// POST - Activate user
export const POST: APIRoute = async ({ params }) => {
  try {
    const database = new Database();
    const userId = parseInt(params.id as string);

    if (isNaN(userId)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid user ID'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if user exists
    const existingUser = database.getUserById(userId);
    if (!existingUser.success) {
      return new Response(JSON.stringify({
        success: false,
        error: 'User not found'
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const result = database.activateUser(userId);

    if (result.success) {
      // Get updated user data
      const updatedUser = database.getUserById(userId);
      
      return new Response(JSON.stringify({
        success: true,
        user: updatedUser.data,
        changes: result.changes,
        message: 'User activated successfully'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({
        success: false,
        error: result.error
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('User activation API error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to activate user',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
