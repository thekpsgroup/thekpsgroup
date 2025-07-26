import type { APIRoute } from 'astro';
import { Database } from '../../../utils/database.ts';

// GET - List all users
export const GET: APIRoute = async ({ request, url }) => {
  try {
    const database = new Database();
    const searchParams = new URL(url).searchParams;
    const includeInactive = searchParams.get('include_inactive') === 'true';
    const role = searchParams.get('role');

    let result;
    if (role) {
      result = database.getUsersByRole(role);
    } else {
      result = database.getUsers(includeInactive);
    }

    if (result.success) {
      return new Response(JSON.stringify({
        success: true,
        users: result.data,
        count: result.count,
        message: `Found ${result.count} users`
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
    console.error('Users API GET error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch users',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// POST - Create new user
export const POST: APIRoute = async ({ request }) => {
  try {
    const database = new Database();
    const userData = await request.json();

    // Validate required fields
    const requiredFields = ['username', 'email', 'password', 'first_name', 'last_name'];
    const missingFields = requiredFields.filter(field => !userData[field]);
    
    if (missingFields.length > 0) {
      return new Response(JSON.stringify({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if username or email already exists
    const existingUser = database.getUserByIdentifier(userData.username);
    if (existingUser.success) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Username or email already exists'
      }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const existingEmail = database.getUserByIdentifier(userData.email);
    if (existingEmail.success) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Username or email already exists'
      }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create user
    const result = database.createUser({
      username: userData.username,
      email: userData.email,
      password: userData.password,
      first_name: userData.first_name,
      last_name: userData.last_name,
      role: userData.role || 'user',
      department: userData.department,
      phone: userData.phone,
      avatar_url: userData.avatar_url,
      created_by: userData.created_by
    });

    if (result.success) {
      // Get the created user (without password)
      const newUser = database.getUserById(result.id as number);
      
      return new Response(JSON.stringify({
        success: true,
        user: newUser.data,
        userId: result.id,
        message: 'User created successfully'
      }), {
        status: 201,
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
    console.error('Users API POST error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to create user',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
