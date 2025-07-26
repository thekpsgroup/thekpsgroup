import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { userQueries } from './database.js';
import { createSession, getSession, deleteSession } from './session.js';

const SALT_ROUNDS = 12;

export async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

export async function createUser(email, password, name, role = 'sales_rep') {
  try {
    const id = uuidv4();
    const passwordHash = await hashPassword(password);
    
    userQueries.create.run(id, email, passwordHash, name, role);
    
    return { success: true, userId: id };
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return { success: false, error: 'Email already exists' };
    }
    throw error;
  }
}

export async function authenticateUser(email, password) {
  try {
    const user = userQueries.findByEmail.get(email);
    
    if (!user) {
      return { success: false, error: 'Invalid credentials' };
    }
    
    const isValid = await verifyPassword(password, user.password_hash);
    
    if (!isValid) {
      return { success: false, error: 'Invalid credentials' };
    }
    
    // Remove password hash from returned user object
    const { password_hash, ...userWithoutPassword } = user;
    
    return { success: true, user: userWithoutPassword };
  } catch (error) {
    console.error('Authentication error:', error);
    return { success: false, error: 'Authentication failed' };
  }
}

export async function loginUser(email, password) {
  const authResult = await authenticateUser(email, password);
  
  if (!authResult.success) {
    return authResult;
  }
  
  const sessionId = await createSession(authResult.user.id);
  
  return {
    success: true,
    user: authResult.user,
    sessionId
  };
}

export async function logoutUser(sessionId) {
  return await deleteSession(sessionId);
}

export async function getCurrentUser(sessionId) {
  if (!sessionId) {
    return null;
  }
  
  const session = await getSession(sessionId);
  
  if (!session) {
    return null;
  }
  
  const user = userQueries.findById.get(session.userId);
  
  if (!user) {
    await deleteSession(sessionId);
    return null;
  }
  
  const { password_hash, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export function requireAuth(user) {
  if (!user) {
    throw new Error('Authentication required');
  }
  return user;
}

export function requireRole(user, requiredRole) {
  requireAuth(user);
  
  const roleHierarchy = {
    'sales_rep': 1,
    'manager': 2,
    'admin': 3
  };
  
  const userLevel = roleHierarchy[user.role] || 0;
  const requiredLevel = roleHierarchy[requiredRole] || 0;
  
  if (userLevel < requiredLevel) {
    throw new Error('Insufficient permissions');
  }
  
  return user;
}

export function canAccessLead(user, lead) {
  requireAuth(user);
  
  // Admin and managers can access all leads
  if (user.role === 'admin' || user.role === 'manager') {
    return true;
  }
  
  // Sales reps can only access their assigned leads
  return lead.assigned_to === user.id;
}

export function canModifyLead(user, lead) {
  requireAuth(user);
  
  // Admin can modify any lead
  if (user.role === 'admin') {
    return true;
  }
  
  // Managers can modify leads in their team
  if (user.role === 'manager') {
    return true;
  }
  
  // Sales reps can modify their assigned leads
  return lead.assigned_to === user.id || lead.created_by === user.id;
}
