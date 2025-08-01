// Authentication utilities and session management
import { z } from 'zod';

// User type definitions
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: 'admin' | 'user' | 'client';
  company?: string;
  avatar: string;
  createdAt: Date;
  lastLogin: Date | null;
}

// Validation schemas
export const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const RegisterSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  company: z.string().optional(),
  role: z.enum(['admin', 'user', 'client']).default('user'),
});

export type LoginCredentials = z.infer<typeof LoginSchema>;
export type RegisterData = z.infer<typeof RegisterSchema>;

// Simple in-memory user store (replace with database in production)
const userDatabase: Record<string, User> = {
  'admin@thekpsgroup.com': {
    id: 'admin-1',
    email: 'admin@thekpsgroup.com',
    firstName: 'Admin',
    lastName: 'User',
    password: '$2a$10$rOKjz4zJ5M2vQ8H9OGK1z.4xOl7xKj9VzH3xO9G1z4H9OGK1z4H9O', // "adminpass123"
    role: 'admin',
    company: 'The KPS Group',
    avatar: '/avatars/default.jpg',
    createdAt: new Date('2024-01-01'),
    lastLogin: null
  },
  'demo@thekpsgroup.com': {
    id: 'user-1',
    email: 'demo@thekpsgroup.com',
    firstName: 'Demo',
    lastName: 'User',
    password: '$2a$10$demo4zJ5M2vQ8H9OGK1z.4xOl7xKj9VzH3xO9G1z4H9OGK1z4H9O', // "demopass123"
    role: 'user',
    company: 'Demo Company',
    avatar: '/avatars/default.jpg',
    createdAt: new Date('2024-01-01'),
    lastLogin: null
  }
};

// Session interface
interface Session {
  userId: string;
  createdAt: Date;
  expiresAt: Date;
}

// Simple session store (replace with Redis/database in production)
const sessionDatabase: Record<string, Session> = {};

// Generate session token
export function generateSessionToken(): string {
  return crypto.randomUUID();
}

// Create session
export function createSession(userId: string): string {
  const token = generateSessionToken();
  const session: Session = {
    userId,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
  };
  sessionDatabase[token] = session;
  return token;
}

// Validate session
export function validateSession(token: string): Session | null {
  const session = sessionDatabase[token];
  if (!session) return null;
  
  if (new Date() > session.expiresAt) {
    delete sessionDatabase[token];
    return null;
  }
  
  return session;
}

// Get user by session
export function getUserBySession(token: string): User | null {
  const session = validateSession(token);
  if (!session) return null;
  
  const user = getUserById(session.userId);
  return user;
}

// Destroy session
export function destroySession(token: string): void {
  delete sessionDatabase[token];
}

// User management functions
export function getUserById(id: string): User | null {
  const userEmails = Object.keys(userDatabase);
  for (const email of userEmails) {
    const user = userDatabase[email];
    if (user.id === id) return user;
  }
  return null;
}

export function getUserByEmail(email: string): User | null {
  return userDatabase[email] || null;
}

// Simple password hashing (use bcrypt in production)
export async function hashPassword(password: string): Promise<string> {
  // This is a placeholder - use bcrypt in production
  return `$2a$10$${Buffer.from(password).toString('base64')}`;
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  // This is a placeholder - use bcrypt in production
  const expectedHash = await hashPassword(password);
  return hash.includes(Buffer.from(password).toString('base64'));
}

// Authentication functions
export async function authenticateUser(email: string, password: string) {
  const user = getUserByEmail(email);
  if (!user) {
    return { success: false, error: 'Invalid email or password' };
  }
  
  const isValidPassword = await verifyPassword(password, user.password);
  if (!isValidPassword) {
    return { success: false, error: 'Invalid email or password' };
  }
  
  // Update last login
  user.lastLogin = new Date();
  
  const sessionToken = createSession(user.id);
  
  return {
    success: true,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      company: user.company,
      avatar: user.avatar
    },
    sessionToken
  };
}

export async function registerUser(data: RegisterData) {
  const existingUser = getUserByEmail(data.email);
  if (existingUser) {
    return { success: false, error: 'User already exists with this email' };
  }
  
  const hashedPassword = await hashPassword(data.password);
  const userId = `user-${Date.now()}`;
  
  const newUser: User = {
    id: userId,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    password: hashedPassword,
    role: data.role,
    company: data.company || '',
    avatar: '/avatars/default.jpg',
    createdAt: new Date(),
    lastLogin: null
  };
  
  userDatabase[data.email] = newUser;
  
  const sessionToken = createSession(userId);
  
  return {
    success: true,
    user: {
      id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      role: newUser.role,
      company: newUser.company,
      avatar: newUser.avatar
    },
    sessionToken
  };
}

// Middleware helper for protected routes
export function requireAuth(sessionToken: string | null) {
  if (!sessionToken) {
    return { authenticated: false, user: null };
  }
  
  const user = getUserBySession(sessionToken);
  if (!user) {
    return { authenticated: false, user: null };
  }
  
  return { authenticated: true, user };
}

// Demo data for testing
export const DEMO_CREDENTIALS = {
  admin: { email: 'admin@thekpsgroup.com', password: 'adminpass123' },
  user: { email: 'demo@thekpsgroup.com', password: 'demopass123' }
};
