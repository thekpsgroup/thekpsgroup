import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Mock database for build environments where better-sqlite3 is not available
class MockDatabase {
  prepare() {
    return {
      get: () => null,
      all: () => [],
      run: () => ({ changes: 0, lastInsertRowid: 0 })
    };
  }
  close() {}
}

export class Database {
  private db: any = null;

  constructor() {
    try {
      // Try to import better-sqlite3, fall back to mock if not available
      let SQLite: any = null;
      try {
        SQLite = require('better-sqlite3');
      } catch (error) {
        console.warn('SQLite3 not available, using mock database');
        this.db = new MockDatabase();
        return;
      }
      
      // Initialize database connection
      const dbPath = join(__dirname, '../../database/kps_crm.db');
      this.db = new SQLite(dbPath);
      this.initializeTables();
    } catch (error) {
      console.error('Database initialization failed:', error);
      this.db = new MockDatabase();
    }
  }

  /**
   * Initialize all required database tables
   */
  initializeTables() {
    if (!this.db || this.db instanceof MockDatabase) {
      console.log('Mock database - skipping table initialization');
      return;
    }

    const tables = [
      // Analytics events table
      `CREATE TABLE IF NOT EXISTS analytics_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_type TEXT NOT NULL,
        page TEXT NOT NULL,
        action TEXT NOT NULL,
        element TEXT,
        value TEXT,
        user_agent TEXT,
        ip_address TEXT,
        city TEXT,
        referrer TEXT,
        session_id TEXT,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )`,

      // Leads table
      `CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        company TEXT,
        service TEXT,
        timeline TEXT,
        budget REAL DEFAULT 0,
        status TEXT DEFAULT 'new',
        priority TEXT DEFAULT 'medium',
        source TEXT DEFAULT 'website',
        value REAL DEFAULT 0,
        notes TEXT,
        assigned_to TEXT,
        city TEXT,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT
      )`,

      // Clients table
      `CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        company TEXT,
        address TEXT,
        status TEXT DEFAULT 'active',
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT
      )`,

      // Users table for CRM access
      `CREATE TABLE IF NOT EXISTS users (
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
        created_by INTEGER,
        FOREIGN KEY (created_by) REFERENCES users(id)
      )`,

      // User sessions table
      `CREATE TABLE IF NOT EXISTS user_sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        session_token TEXT UNIQUE NOT NULL,
        expires_at TEXT NOT NULL,
        ip_address TEXT,
        user_agent TEXT,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )`
    ];

    const indexes = [
      'CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type)',
      'CREATE INDEX IF NOT EXISTS idx_analytics_events_page ON analytics_events(page)',
      'CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at)',
      'CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email)',
      'CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status)',
      'CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email)',
      'CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)',
      'CREATE INDEX IF NOT EXISTS idx_users_username ON users(username)',
      'CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)',
      'CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token)',
      'CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id)'
    ];

    try {
      tables.forEach(tableSQL => this.db!.exec(tableSQL));
      indexes.forEach(indexSQL => this.db!.exec(indexSQL));
      console.log('All database tables initialized successfully');
    } catch (error) {
      console.error('Error initializing database tables:', error);
      throw error;
    }
  }

  /**
   * Tracks an analytics event in the database.
   * @param eventData - The analytics event data
   * @returns Database operation result
   */
  trackAnalyticsEvent(eventData: {
    event_type: string;
    page: string;
    action: string;
    element?: string;
    value?: string;
    user_agent?: string;
    ip_address?: string;
    city?: string;
    referrer?: string;
    session_id?: string;
  }) {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      // Validate required fields
      if (!eventData.event_type || !eventData.page || !eventData.action) {
        throw new Error('Missing required fields: event_type, page, and action are required');
      }

      const stmt = this.db.prepare(`
        INSERT INTO analytics_events (
          event_type, 
          page, 
          action, 
          element, 
          value, 
          user_agent, 
          ip_address, 
          city, 
          referrer, 
          session_id, 
          created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const result = stmt.run(
        eventData.event_type,
        eventData.page,
        eventData.action,
        eventData.element || null,
        eventData.value || null,
        eventData.user_agent || '',
        eventData.ip_address || '',
        eventData.city || null,
        eventData.referrer || null,
        eventData.session_id || '',
        new Date().toISOString()
      );

      return {
        success: true,
        id: result.lastInsertRowid,
        changes: result.changes
      };

    } catch (error) {
      console.error('Error tracking analytics event:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get analytics data from the database
   * @param filters - Filter criteria
   * @returns Analytics data
   */
  getAnalyticsData(filters: {
    startDate?: string;
    endDate?: string;
    eventType?: string;
    page?: string;
  } = {}) {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const { startDate, endDate, eventType, page } = filters;
      let query = 'SELECT * FROM analytics_events WHERE 1=1';
      const params: any[] = [];

      if (startDate) {
        query += ' AND created_at >= ?';
        params.push(startDate);
      }
      if (endDate) {
        query += ' AND created_at <= ?';
        params.push(endDate);
      }
      if (eventType) {
        query += ' AND event_type = ?';
        params.push(eventType);
      }
      if (page) {
        query += ' AND page = ?';
        params.push(page);
      }

      query += ' ORDER BY created_at DESC';
      
      const stmt = this.db.prepare(query);
      const results = stmt.all(...params);

      return {
        success: true,
        data: results,
        count: results.length
      };
    } catch (error) {
      console.error('Error getting analytics data:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Create a new lead in the database
   * @param leadData - Lead information
   * @returns Result
   */
  createLead(leadData: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    service?: string;
    timeline?: string;
    budget?: number;
    status?: string;
    priority?: string;
    source?: string;
    value?: number;
    notes?: string;
  }) {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const stmt = this.db.prepare(`
        INSERT INTO leads (
          name, email, phone, company, service, timeline, budget, 
          status, priority, source, value, notes, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const result = stmt.run(
        leadData.name,
        leadData.email,
        leadData.phone || null,
        leadData.company || null,
        leadData.service || null,
        leadData.timeline || null,
        leadData.budget || 0,
        leadData.status || 'new',
        leadData.priority || 'medium',
        leadData.source || 'website',
        leadData.value || 0,
        leadData.notes || null,
        new Date().toISOString()
      );

      return {
        success: true,
        id: result.lastInsertRowid,
        changes: result.changes
      };
    } catch (error) {
      console.error('Error creating lead:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Create a new client in the database
   * @param clientData - Client information
   * @returns Result
   */
  createClient(clientData: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    address?: string;
  }) {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const stmt = this.db.prepare(`
        INSERT INTO clients (
          name, email, phone, company, address, status, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `);

      const result = stmt.run(
        clientData.name,
        clientData.email,
        clientData.phone || null,
        clientData.company || null,
        clientData.address || null,
        'active',
        new Date().toISOString()
      );

      return {
        success: true,
        id: result.lastInsertRowid,
        changes: result.changes
      };
    } catch (error) {
      console.error('Error creating client:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Assign a lead to a team member
   * @param leadId - Lead ID
   * @param assignedTo - Team member
   * @returns Result
   */
  assignLead(leadId: number, assignedTo: string) {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const stmt = this.db.prepare(`
        UPDATE leads 
        SET assigned_to = ?, status = 'assigned', updated_at = ?
        WHERE id = ?
      `);

      const result = stmt.run(assignedTo, new Date().toISOString(), leadId);

      return {
        success: true,
        changes: result.changes
      };
    } catch (error) {
      console.error('Error assigning lead:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Get a single lead by ID
   * @param leadId - Lead ID
   * @returns Lead data or error
   */
  getLead(leadId: number) {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const stmt = this.db.prepare(`
        SELECT l.*, u.username as assigned_to_name 
        FROM leads l 
        LEFT JOIN users u ON l.assigned_to = u.id 
        WHERE l.id = ?
      `);

      const lead = stmt.get(leadId);

      return {
        success: true,
        data: lead
      };
    } catch (error) {
      console.error('Error getting lead:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Get all leads with filtering and pagination
   * @param filters - Filter options
   * @returns Leads data with pagination
   */
  getLeads(filters: {
    page?: number;
    limit?: number;
    status?: string;
    priority?: string;
    source?: string;
    search?: string;
  } = {}) {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const { page = 1, limit = 25, status, priority, source, search } = filters;
      const offset = (page - 1) * limit;

      // Build dynamic query
      let query = `
        SELECT l.*, u.username as assigned_to_name 
        FROM leads l 
        LEFT JOIN users u ON l.assigned_to = u.id 
        WHERE 1=1
      `;
      const params: any[] = [];

      if (status) {
        query += ' AND l.status = ?';
        params.push(status);
      }
      
      if (priority) {
        query += ' AND l.priority = ?';
        params.push(priority);
      }
      
      if (source) {
        query += ' AND l.source = ?';
        params.push(source);
      }
      
      if (search) {
        query += ' AND (l.name LIKE ? OR l.email LIKE ? OR l.company LIKE ?)';
        params.push(`%${search}%`, `%${search}%`, `%${search}%`);
      }

      // Get total count
      const countQuery = query.replace('SELECT l.*, u.username as assigned_to_name', 'SELECT COUNT(*) as total');
      const totalResult = this.db.prepare(countQuery).get(...params) as any;
      const total = totalResult?.total || 0;

      // Add ordering and pagination
      query += ' ORDER BY l.created_at DESC LIMIT ? OFFSET ?';
      params.push(limit, offset);

      const leads = this.db.prepare(query).all(...params);

      return {
        success: true,
        data: leads,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      console.error('Error getting leads:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Update a lead
   * @param leadId - Lead ID
   * @param leadData - Lead data to update
   * @returns Result
   */
  updateLead(leadId: number, leadData: {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    service?: string;
    timeline?: string;
    budget?: number;
    status?: string;
    priority?: string;
    source?: string;
    value?: number;
    notes?: string;
  }) {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const stmt = this.db.prepare(`
        UPDATE leads SET 
          name = ?, email = ?, phone = ?, company = ?, service = ?, 
          timeline = ?, budget = ?, status = ?, priority = ?, source = ?, 
          value = ?, notes = ?, updated_at = ?
        WHERE id = ?
      `);

      const result = stmt.run(
        leadData.name,
        leadData.email,
        leadData.phone || null,
        leadData.company || null,
        leadData.service || null,
        leadData.timeline || null,
        leadData.budget || 0,
        leadData.status || 'new',
        leadData.priority || 'medium',
        leadData.source || 'website',
        leadData.value || 0,
        leadData.notes || null,
        new Date().toISOString(),
        leadId
      );

      return {
        success: true,
        changes: result.changes
      };
    } catch (error) {
      console.error('Error updating lead:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Delete a lead
   * @param leadId - Lead ID
   * @returns Result
   */
  deleteLead(leadId: number) {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const stmt = this.db.prepare('DELETE FROM leads WHERE id = ?');
      const result = stmt.run(leadId);

      return {
        success: true,
        changes: result.changes
      };
    } catch (error) {
      console.error('Error deleting lead:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Update lead status
   * @param leadId - Lead ID
   * @param status - New status
   * @returns Result
   */
  updateLeadStatus(leadId: number, status: string) {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const stmt = this.db.prepare(`
        UPDATE leads 
        SET status = ?, updated_at = ?
        WHERE id = ?
      `);

      const result = stmt.run(status, new Date().toISOString(), leadId);

      return {
        success: true,
        changes: result.changes
      };
    } catch (error) {
      console.error('Error updating lead status:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Convert lead to client
   * @param leadId - Lead ID
   * @returns Result
   */
  convertLeadToClient(leadId: number) {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      // Get lead data
      const leadStmt = this.db.prepare('SELECT * FROM leads WHERE id = ?');
      const lead = leadStmt.get(leadId) as any;

      if (!lead) {
        throw new Error('Lead not found');
      }

      // Create client
      const clientResult = this.createClient({
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company
      });

      if (!clientResult.success) {
        throw new Error(clientResult.error);
      }

      // Update lead status
      const updateResult = this.updateLeadStatus(leadId, 'converted');

      return {
        success: true,
        clientId: clientResult.id,
        leadUpdated: updateResult.success
      };
    } catch (error) {
      console.error('Error converting lead to client:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Get dashboard analytics data
   * @returns Comprehensive analytics data for admin dashboard
   */
  getDashboardAnalytics() {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const analytics: any = {
        overview: {},
        leadSources: [],
        cityPerformance: [],
        servicePerformance: [],
        monthlyTrends: [],
        conversionFunnel: [],
        recentActivity: []
      };

      // Overview metrics
      const overviewQuery = this.db.prepare(`
        SELECT 
          COUNT(*) as totalLeads,
          COUNT(CASE WHEN status = 'converted' OR status = 'won' THEN 1 END) as totalConversions,
          COALESCE(SUM(value), 0) as totalRevenue,
          COALESCE(AVG(value), 0) as avgDealSize,
          COUNT(DISTINCT CASE WHEN status = 'converted' OR status = 'won' THEN email END) as activeClients
        FROM leads
        WHERE created_at >= date('now', '-30 days')
      `);
      
      const overviewData = overviewQuery.get() as any;
      analytics.overview = {
        totalLeads: overviewData.totalLeads || 0,
        totalConversions: overviewData.totalConversions || 0,
        totalRevenue: overviewData.totalRevenue || 0,
        conversionRate: overviewData.totalLeads > 0 ? 
          Math.round((overviewData.totalConversions / overviewData.totalLeads) * 100) : 0,
        avgDealSize: Math.round(overviewData.avgDealSize || 0),
        activeClients: overviewData.activeClients || 0
      };

      return {
        success: true,
        data: analytics
      };
    } catch (error) {
      console.error('Error getting dashboard analytics:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Close database connection
   */
  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }

  // ==================== USER MANAGEMENT METHODS ====================

  /**
   * Create a new user
   * @param userData - User data
   * @returns Result with user ID
   */
  createUser(userData: {
    username: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role?: string;
    department?: string;
    phone?: string;
    avatar_url?: string;
    created_by?: number;
  }) {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      // Hash password (in production, use bcrypt or similar)
      const passwordHash = this.hashPassword(userData.password);

      const stmt = this.db.prepare(`
        INSERT INTO users (
          username, email, password_hash, first_name, last_name, 
          role, department, phone, avatar_url, created_by, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `);

      const result = stmt.run(
        userData.username,
        userData.email,
        passwordHash,
        userData.first_name,
        userData.last_name,
        userData.role || 'user',
        userData.department,
        userData.phone,
        userData.avatar_url,
        userData.created_by
      );

      return {
        success: true,
        id: result.lastInsertRowid,
        changes: result.changes
      };
    } catch (error) {
      console.error('Error creating user:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Get all users
   * @param includeInactive - Include inactive users
   * @returns List of users
   */
  getUsers(includeInactive: boolean = false) {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const query = includeInactive 
        ? 'SELECT id, username, email, first_name, last_name, role, department, phone, avatar_url, is_active, last_login, created_at FROM users ORDER BY created_at DESC'
        : 'SELECT id, username, email, first_name, last_name, role, department, phone, avatar_url, is_active, last_login, created_at FROM users WHERE is_active = 1 ORDER BY created_at DESC';

      const stmt = this.db.prepare(query);
      const users = stmt.all();

      return {
        success: true,
        data: users,
        count: users.length
      };
    } catch (error) {
      console.error('Error fetching users:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Get user by ID
   * @param userId - User ID
   * @returns User data
   */
  getUserById(userId: number) {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const stmt = this.db.prepare(`
        SELECT id, username, email, first_name, last_name, role, department, 
               phone, avatar_url, is_active, last_login, created_at 
        FROM users WHERE id = ?
      `);
      
      const user = stmt.get(userId);

      if (user) {
        return { success: true, data: user };
      } else {
        return { success: false, error: 'User not found' };
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Get user by username or email
   * @param identifier - Username or email
   * @returns User data
   */
  getUserByIdentifier(identifier: string) {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const stmt = this.db.prepare(`
        SELECT id, username, email, password_hash, first_name, last_name, role, 
               department, phone, avatar_url, is_active, last_login, created_at 
        FROM users WHERE username = ? OR email = ?
      `);
      
      const user = stmt.get(identifier, identifier);

      if (user) {
        return { success: true, data: user };
      } else {
        return { success: false, error: 'User not found' };
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Update user information
   * @param userId - User ID
   * @param updates - Fields to update
   * @returns Result
   */
  updateUser(userId: number, updates: {
    username?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    role?: string;
    department?: string;
    phone?: string;
    avatar_url?: string;
    is_active?: boolean;
  }) {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const fields = Object.keys(updates).filter(key => updates[key as keyof typeof updates] !== undefined);
      const values = fields.map(key => updates[key as keyof typeof updates]);
      
      if (fields.length === 0) {
        return { success: false, error: 'No fields to update' };
      }

      const setClause = fields.map(field => `${field} = ?`).join(', ');
      const query = `UPDATE users SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
      
      const stmt = this.db.prepare(query);
      const result = stmt.run(...values, userId);

      return {
        success: true,
        changes: result.changes
      };
    } catch (error) {
      console.error('Error updating user:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Update user password
   * @param userId - User ID
   * @param newPassword - New password
   * @returns Result
   */
  updateUserPassword(userId: number, newPassword: string) {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const passwordHash = this.hashPassword(newPassword);
      
      const stmt = this.db.prepare(`
        UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
      `);
      
      const result = stmt.run(passwordHash, userId);

      return {
        success: true,
        changes: result.changes
      };
    } catch (error) {
      console.error('Error updating password:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Deactivate user (soft delete)
   * @param userId - User ID
   * @returns Result
   */
  deactivateUser(userId: number) {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const stmt = this.db.prepare(`
        UPDATE users SET is_active = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?
      `);
      
      const result = stmt.run(userId);

      return {
        success: true,
        changes: result.changes
      };
    } catch (error) {
      console.error('Error deactivating user:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Activate user
   * @param userId - User ID
   * @returns Result
   */
  activateUser(userId: number) {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const stmt = this.db.prepare(`
        UPDATE users SET is_active = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?
      `);
      
      const result = stmt.run(userId);

      return {
        success: true,
        changes: result.changes
      };
    } catch (error) {
      console.error('Error activating user:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Delete user permanently
   * @param userId - User ID
   * @returns Result
   */
  deleteUser(userId: number) {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const stmt = this.db.prepare('DELETE FROM users WHERE id = ?');
      const result = stmt.run(userId);

      return {
        success: true,
        changes: result.changes
      };
    } catch (error) {
      console.error('Error deleting user:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Authenticate user
   * @param identifier - Username or email
   * @param password - Password
   * @returns Authentication result
   */
  authenticateUser(identifier: string, password: string) {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const userResult = this.getUserByIdentifier(identifier);
      if (!userResult.success || !userResult.data) {
        return { success: false, error: 'Invalid credentials' };
      }

      const user = userResult.data as any;
      
      if (!user.is_active) {
        return { success: false, error: 'Account is deactivated' };
      }

      if (this.verifyPassword(password, user.password_hash)) {
        // Update last login
        const updateStmt = this.db.prepare(`
          UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?
        `);
        updateStmt.run(user.id);

        // Return user data without password hash
        const { password_hash, ...userWithoutPassword } = user;
        return { 
          success: true, 
          user: userWithoutPassword
        };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Error authenticating user:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Get users by role
   * @param role - User role
   * @returns List of users
   */
  getUsersByRole(role: string) {
    try {
      if (!this.db) {
        throw new Error('Database not initialized');
      }

      const stmt = this.db.prepare(`
        SELECT id, username, email, first_name, last_name, role, department, 
               phone, avatar_url, is_active, last_login, created_at 
        FROM users WHERE role = ? AND is_active = 1
        ORDER BY first_name, last_name
      `);
      
      const users = stmt.all(role);

      return {
        success: true,
        data: users,
        count: users.length
      };
    } catch (error) {
      console.error('Error fetching users by role:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  /**
   * Simple password hashing (use bcrypt in production)
   * @param password - Plain text password
   * @returns Hashed password
   */
  private hashPassword(password: string): string {
    // This is a simple hash for demo purposes
    // In production, use bcrypt or similar
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(password + 'kps_salt').digest('hex');
  }

  /**
   * Verify password against hash
   * @param password - Plain text password
   * @param hash - Stored hash
   * @returns Boolean
   */
  private verifyPassword(password: string, hash: string): boolean {
    return this.hashPassword(password) === hash;
  }
}

// Export singleton instance
export const database = new Database();
