import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database connection
const db = new Database(path.join(process.cwd(), 'database', 'kps_crm.db'));

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize database schema
export function initializeDatabase() {
  // Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('admin', 'manager', 'sales_rep')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      is_active BOOLEAN DEFAULT 1
    )
  `);

  // Leads table
  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      company TEXT,
      status TEXT NOT NULL CHECK(status IN ('new', 'contacted', 'qualified', 'proposal', 'won', 'lost')) DEFAULT 'new',
      priority TEXT NOT NULL CHECK(priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
      source TEXT,
      assigned_to TEXT,
      value DECIMAL(10,2),
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      created_by TEXT,
      FOREIGN KEY (assigned_to) REFERENCES users (id),
      FOREIGN KEY (created_by) REFERENCES users (id)
    )
  `);

  // Activities table
  db.exec(`
    CREATE TABLE IF NOT EXISTS activities (
      id TEXT PRIMARY KEY,
      lead_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('call', 'email', 'meeting', 'note', 'task')),
      subject TEXT NOT NULL,
      description TEXT,
      scheduled_at DATETIME,
      completed_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (lead_id) REFERENCES leads (id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  // Create indexes for better performance
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
    CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON leads (assigned_to);
    CREATE INDEX IF NOT EXISTS idx_activities_lead_id ON activities (lead_id);
    CREATE INDEX IF NOT EXISTS idx_activities_user_id ON activities (user_id);
  `);

  console.log('Database initialized successfully');
}

// User operations
export const userQueries = {
  create: db.prepare(`
    INSERT INTO users (id, email, password_hash, name, role)
    VALUES (?, ?, ?, ?, ?)
  `),
  
  findByEmail: db.prepare(`
    SELECT * FROM users WHERE email = ? AND is_active = 1
  `),
  
  findById: db.prepare(`
    SELECT * FROM users WHERE id = ? AND is_active = 1
  `),
  
  getAll: db.prepare(`
    SELECT id, email, name, role, created_at, is_active 
    FROM users 
    ORDER BY name
  `),
  
  update: db.prepare(`
    UPDATE users 
    SET name = ?, role = ?, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `),
  
  deactivate: db.prepare(`
    UPDATE users 
    SET is_active = 0, updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `)
};

// Lead operations
export const leadQueries = {
  create: db.prepare(`
    INSERT INTO leads (id, name, email, phone, company, status, priority, source, assigned_to, value, notes, created_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `),
  
  findById: db.prepare(`
    SELECT l.*, 
           u1.name as assigned_to_name,
           u2.name as created_by_name
    FROM leads l
    LEFT JOIN users u1 ON l.assigned_to = u1.id
    LEFT JOIN users u2 ON l.created_by = u2.id
    WHERE l.id = ?
  `),
  
  getAll: db.prepare(`
    SELECT l.*, 
           u1.name as assigned_to_name,
           u2.name as created_by_name
    FROM leads l
    LEFT JOIN users u1 ON l.assigned_to = u1.id
    LEFT JOIN users u2 ON l.created_by = u2.id
    ORDER BY l.created_at DESC
  `),
  
  getByStatus: db.prepare(`
    SELECT l.*, 
           u1.name as assigned_to_name,
           u2.name as created_by_name
    FROM leads l
    LEFT JOIN users u1 ON l.assigned_to = u1.id
    LEFT JOIN users u2 ON l.created_by = u2.id
    WHERE l.status = ?
    ORDER BY l.created_at DESC
  `),
  
  getByAssignee: db.prepare(`
    SELECT l.*, 
           u1.name as assigned_to_name,
           u2.name as created_by_name
    FROM leads l
    LEFT JOIN users u1 ON l.assigned_to = u1.id
    LEFT JOIN users u2 ON l.created_by = u2.id
    WHERE l.assigned_to = ?
    ORDER BY l.created_at DESC
  `),
  
  update: db.prepare(`
    UPDATE leads 
    SET name = ?, email = ?, phone = ?, company = ?, status = ?, 
        priority = ?, source = ?, assigned_to = ?, value = ?, notes = ?,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `),
  
  updateStatus: db.prepare(`
    UPDATE leads 
    SET status = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `),
  
  delete: db.prepare(`
    DELETE FROM leads WHERE id = ?
  `),
  
  getStats: db.prepare(`
    SELECT 
      status,
      COUNT(*) as count,
      COALESCE(SUM(value), 0) as total_value
    FROM leads 
    GROUP BY status
  `)
};

// Activity operations
export const activityQueries = {
  create: db.prepare(`
    INSERT INTO activities (id, lead_id, user_id, type, subject, description, scheduled_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `),
  
  getByLeadId: db.prepare(`
    SELECT a.*, u.name as user_name
    FROM activities a
    JOIN users u ON a.user_id = u.id
    WHERE a.lead_id = ?
    ORDER BY a.created_at DESC
  `),
  
  getByUserId: db.prepare(`
    SELECT a.*, l.name as lead_name
    FROM activities a
    JOIN leads l ON a.lead_id = l.id
    WHERE a.user_id = ?
    ORDER BY a.created_at DESC
  `),
  
  getUpcoming: db.prepare(`
    SELECT a.*, l.name as lead_name, u.name as user_name
    FROM activities a
    JOIN leads l ON a.lead_id = l.id
    JOIN users u ON a.user_id = u.id
    WHERE a.scheduled_at > datetime('now') 
    AND a.completed_at IS NULL
    ORDER BY a.scheduled_at ASC
  `),
  
  markComplete: db.prepare(`
    UPDATE activities 
    SET completed_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `),
  
  update: db.prepare(`
    UPDATE activities 
    SET type = ?, subject = ?, description = ?, scheduled_at = ?
    WHERE id = ?
  `),
  
  delete: db.prepare(`
    DELETE FROM activities WHERE id = ?
  `)
};

export default db;
