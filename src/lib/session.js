import { v4 as uuidv4 } from 'uuid';

// In-memory session store (in production, use Redis or database)
const sessions = new Map();

const SESSION_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export async function createSession(userId) {
  const sessionId = uuidv4();
  const expiresAt = new Date(Date.now() + SESSION_EXPIRY);
  
  sessions.set(sessionId, {
    userId,
    createdAt: new Date(),
    expiresAt
  });
  
  return sessionId;
}

export async function getSession(sessionId) {
  if (!sessionId) {
    return null;
  }
  
  const session = sessions.get(sessionId);
  
  if (!session) {
    return null;
  }
  
  // Check if session has expired
  if (session.expiresAt < new Date()) {
    sessions.delete(sessionId);
    return null;
  }
  
  return session;
}

export async function deleteSession(sessionId) {
  if (!sessionId) {
    return false;
  }
  
  return sessions.delete(sessionId);
}

export async function extendSession(sessionId) {
  const session = await getSession(sessionId);
  
  if (!session) {
    return false;
  }
  
  session.expiresAt = new Date(Date.now() + SESSION_EXPIRY);
  return true;
}

export function createSessionCookie(sessionId) {
  return `session=${sessionId}; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_EXPIRY / 1000}; Path=/`;
}

export function clearSessionCookie() {
  return 'session=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/';
}
