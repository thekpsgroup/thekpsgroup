// Authentication utilities for the KPS Group CRM system

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'user';
  avatar?: string;
  lastLogin?: Date;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: Date;
}

/**
 * Check if user is authenticated by validating session token
 */
export function isAuthenticated(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  const sessionCookie = getCookie(request, 'kps_session');
  
  // Check for authorization header or session cookie
  if (!authHeader && !sessionCookie) {
    return false;
  }

  // For demo purposes, return true if any auth token exists
  // In production, this would validate against a secure session store
  return true;
}

/**
 * Get current user from session
 */
export function getCurrentUser(request: Request): User | null {
  if (!isAuthenticated(request)) {
    return null;
  }

  // For demo purposes, return a mock admin user
  // In production, this would fetch from database based on session
  return {
    id: 'admin-1',
    email: 'admin@kpsgroup.com',
    name: 'KPS Admin',
    role: 'admin',
    avatar: '/team/default-avatar.jpg',
    lastLogin: new Date()
  };
}

/**
 * Check if user has required role
 */
export function hasRole(user: User | null, requiredRole: string): boolean {
  if (!user) return false;
  
  const roleHierarchy = {
    'admin': 3,
    'manager': 2,
    'user': 1
  };
  
  const userLevel = roleHierarchy[user.role] || 0;
  const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;
  
  return userLevel >= requiredLevel;
}

/**
 * Require authentication - redirect to login if not authenticated
 */
export function requireAuth(request: Request): Response | null {
  if (!isAuthenticated(request)) {
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/crm?error=auth_required'
      }
    });
  }
  return null;
}

/**
 * Require specific role - return 403 if insufficient permissions
 */
export function requireRole(request: Request, role: string): Response | null {
  const user = getCurrentUser(request);
  
  if (!user) {
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/crm?error=auth_required'
      }
    });
  }
  
  if (!hasRole(user, role)) {
    return new Response('Insufficient permissions', {
      status: 403,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }
  
  return null;
}

/**
 * Get cookie value from request
 */
function getCookie(request: Request, name: string): string | null {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;
  
  const cookies = cookieHeader.split(';').map(c => c.trim());
  const cookie = cookies.find(c => c.startsWith(`${name}=`));
  
  return cookie ? cookie.split('=')[1] : null;
}

/**
 * Create session cookie
 */
export function createSessionCookie(token: string, expiresAt: Date): string {
  return `kps_session=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=${expiresAt.toUTCString()}`;
}

/**
 * Clear session cookie
 */
export function clearSessionCookie(): string {
  return 'kps_session=; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT';
}

/**
 * Generate mock session for demo purposes
 */
export function createMockSession(): AuthSession {
  return {
    user: {
      id: 'admin-1',
      email: 'admin@kpsgroup.com',
      name: 'KPS Admin',
      role: 'admin',
      avatar: '/team/default-avatar.jpg',
      lastLogin: new Date()
    },
    token: 'mock-session-token-' + Date.now(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
  };
}
