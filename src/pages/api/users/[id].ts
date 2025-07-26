import type { APIRoute } from 'astro';
import { Database } from '../../../utils/database.ts';

// GET - Get user by ID
export const GET: APIRoute = async ({ params }) => {
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

    const result = database.getUserById(userId);

    if (result.success) {
      return new Response(JSON.stringify({
        success: true,
        user: result.data
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({
        success: false,
        error: result.error
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('User API GET error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch user',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// PUT - Update user
export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const database = new Database();
    const userId = parseInt(params.id as string);
    const updates = await request.json();

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

    // Handle password update separately
    if (updates.password) {
      const passwordResult = database.updateUserPassword(userId, updates.password);
      if (!passwordResult.success) {
        return new Response(JSON.stringify({
          success: false,
          error: passwordResult.error
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      delete updates.password; // Remove from regular updates
    }

    // Update other fields
    const result = database.updateUser(userId, updates);

    if (result.success) {
      // Get updated user data
      const updatedUser = database.getUserById(userId);
      
      return new Response(JSON.stringify({
        success: true,
        user: updatedUser.data,
        changes: result.changes,
        message: 'User updated successfully'
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
    console.error('User API PUT error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to update user',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// DELETE - Delete user
export const DELETE: APIRoute = async ({ params, request }) => {
  try {
    const database = new Database();
    const userId = parseInt(params.id as string);
    const { permanent } = await request.json().catch(() => ({ permanent: false }));

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

    let result;
    if (permanent) {
      // Permanent deletion
      result = database.deleteUser(userId);
    } else {
      // Soft delete (deactivate)
      result = database.deactivateUser(userId);
    }

    if (result.success) {
      return new Response(JSON.stringify({
        success: true,
        changes: result.changes,
        message: permanent ? 'User deleted permanently' : 'User deactivated'
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
    console.error('User API DELETE error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to delete user',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
