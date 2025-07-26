// Simple Node.js script to create admin user
const path = require('path');
const SQLite = require('better-sqlite3');
const crypto = require('crypto');

// Hash password function
function hashPassword(password) {
  return crypto.createHash('sha256').update(password + 'kps_salt').digest('hex');
}

try {
  console.log('🚀 Initializing KPS CRM Database...');
  
  // Connect to database
  const dbPath = path.join(__dirname, '..', 'database', 'kps_crm.db');
  const db = new SQLite(dbPath);
  
  // Create users table if it doesn't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      department TEXT,
      phone TEXT,
      avatar_url TEXT,
      is_active BOOLEAN DEFAULT 1,
      last_login TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT,
      created_by INTEGER
    )
  `);
  
  // Check if admin user exists
  const checkStmt = db.prepare('SELECT COUNT(*) as count FROM users WHERE username = ? OR email = ?');
  const exists = checkStmt.get('admin', 'admin@kpsgroup.com');
  
  if (exists.count === 0) {
    // Create admin user
    const insertStmt = db.prepare(`
      INSERT INTO users (
        username, email, password_hash, first_name, last_name, 
        role, department, is_active, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `);
    
    const passwordHash = hashPassword('kpsadmin');
    
    const result = insertStmt.run(
      'admin',
      'admin@kpsgroup.com', 
      passwordHash,
      'KPS',
      'Administrator',
      'admin',
      'Management',
      1
    );
    
    console.log('✅ Admin user created successfully (ID: ' + result.lastInsertRowid + ')');
    console.log('📝 Username: admin');
    console.log('📧 Email: admin@kpsgroup.com');
    console.log('🔑 Password: kpsadmin');
    console.log('');
    console.log('🎯 You can now login at: https://thekpsgroup.com/login');
    console.log('🎯 Or directly access CRM at: https://thekpsgroup.com/crm');
  } else {
    console.log('ℹ️ Admin user already exists');
    console.log('📝 Username: admin');
    console.log('📧 Email: admin@kpsgroup.com');
    console.log('🔑 Password: kpsadmin');
    console.log('');
    console.log('🎯 You can now login at: https://thekpsgroup.com/login');
    console.log('🎯 Or directly access CRM at: https://thekpsgroup.com/crm');
  }
  
  db.close();
  console.log('✅ Database setup complete!');
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
