import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import type { 
  Lead, Client, Deal, AnalyticsEvent, SecurityLog, 
  LeadFilters, ClientFilters, DealFilters, AnalyticsData,
  DatabaseResult 
} from '../types/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database configuration
const DB_PATH = path.join(process.cwd(), 'database', 'kps_crm.db');
const SCHEMA_PATH = path.join(process.cwd(), 'database', 'schema.sql');

// Ensure database directory exists
const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Initialize database connection
const db = new Database(DB_PATH);

// Enable foreign key constraints
db.pragma('foreign_keys = ON');

// Initialize database with schema if needed
export function initializeDatabase() {
  try {
    // Check if database is initialized
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
    
    if (tables.length === 0) {
      console.log('Initializing database with schema...');
      
      // Read and execute schema
      const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
      db.exec(schema);
      
      console.log('Database initialized successfully');
    }
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

// Database helper functions
export class CRMDatabase {
  
  // ================================
  // LEADS MANAGEMENT
  // ================================
  
  static createLead(leadData: Partial<Lead>): Lead {
    const {
      name, email, phone, company, service, timeline, budget,
      status = 'new', priority = 'medium', source = 'website',
      value = 0, city, state, country = 'US', notes
    } = leadData;

    const stmt = db.prepare(`
      INSERT INTO leads (
        name, email, phone, company, service, timeline, budget,
        status, priority, source, value, city, state, country, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      name, email, phone, company, service, timeline, budget,
      status, priority, source, value, city, state, country, notes
    );

    return { id: Number(result.lastInsertRowid), ...leadData } as Lead;
  }

  static getLeads(filters: LeadFilters = {}): Lead[] {
    let query = 'SELECT * FROM leads WHERE 1=1';
    const params = [];

    if (filters.status) {
      query += ' AND status = ?';
      params.push(filters.status);
    }

    if (filters.priority) {
      query += ' AND priority = ?';
      params.push(filters.priority);
    }

    if (filters.service) {
      query += ' AND service = ?';
      params.push(filters.service);
    }

    if (filters.search) {
      query += ' AND (name LIKE ? OR email LIKE ? OR company LIKE ?)';
      const searchTerm = `%${filters.search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    query += ' ORDER BY created_at DESC';

    if (filters.limit) {
      query += ' LIMIT ?';
      params.push(filters.limit);
    }

    const stmt = db.prepare(query);
    return stmt.all(...params);
  }

  static updateLead(id: number, updateData: Partial<Lead>): DatabaseResult {
    const fields = Object.keys(updateData);
    const values = Object.values(updateData);
    
    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const query = `UPDATE leads SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    
    const stmt = db.prepare(query);
    return stmt.run(...values, id);
  }

  static deleteLead(id: number): DatabaseResult {
    const stmt = db.prepare('DELETE FROM leads WHERE id = ?');
    return stmt.run(id);
  }

  static getLeadById(id: number): Lead | null {
    const stmt = db.prepare('SELECT * FROM leads WHERE id = ?');
    return stmt.get(id);
  }

  // ================================
  // CLIENTS MANAGEMENT
  // ================================
  
  static createClient(clientData: Partial<Client>): Client {
    const {
      lead_id, name, email, phone, company, total_value = 0,
      status = 'active', notes
    } = clientData;

    const stmt = db.prepare(`
      INSERT INTO clients (lead_id, name, email, phone, company, total_value, status, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(lead_id, name, email, phone, company, total_value, status, notes);
    return { id: Number(result.lastInsertRowid), ...clientData } as Client;
  }

  static getClients(filters: ClientFilters = {}): Client[] {
    let query = `
      SELECT c.*, l.service as original_service 
      FROM clients c 
      LEFT JOIN leads l ON c.lead_id = l.id 
      WHERE 1=1
    `;
    const params = [];

    if (filters.status) {
      query += ' AND c.status = ?';
      params.push(filters.status);
    }

    query += ' ORDER BY c.joined_at DESC';

    const stmt = db.prepare(query);
    return stmt.all(...params);
  }

  // ================================
  // DEALS MANAGEMENT
  // ================================
  
  static createDeal(dealData: Partial<Deal>): Deal {
    const {
      client_id, lead_id, title, description, amount,
      status = 'proposal', probability = 50, expected_close_date
    } = dealData;

    const stmt = db.prepare(`
      INSERT INTO deals (client_id, lead_id, title, description, amount, status, probability, expected_close_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(client_id, lead_id, title, description, amount, status, probability, expected_close_date);
    return { id: Number(result.lastInsertRowid), ...dealData } as Deal;
  }

  static getDeals(filters: DealFilters = {}): Deal[] {
    let query = `
      SELECT d.*, c.name as client_name, l.name as lead_name
      FROM deals d
      LEFT JOIN clients c ON d.client_id = c.id
      LEFT JOIN leads l ON d.lead_id = l.id
      WHERE 1=1
    `;
    const params = [];

    if (filters.status) {
      query += ' AND d.status = ?';
      params.push(filters.status);
    }

    query += ' ORDER BY d.created_at DESC';

    const stmt = db.prepare(query);
    return stmt.all(...params);
  }

  // ================================
  // ANALYTICS & REPORTING
  // ================================
  
  static getAnalytics(): AnalyticsData {
    // Get key metrics
    const totalLeads = db.prepare('SELECT COUNT(*) as count FROM leads').get();
    const totalClients = db.prepare('SELECT COUNT(*) as count FROM clients WHERE status = ?').get('active');
    const totalRevenue = db.prepare('SELECT COALESCE(SUM(amount), 0) as total FROM deals WHERE status = ?').get('closed_won');
    const monthlyLeads = db.prepare(`
      SELECT COUNT(*) as count 
      FROM leads 
      WHERE created_at >= date('now', '-30 days')
    `).get();

    // Lead conversion rate
    const convertedLeads = db.prepare('SELECT COUNT(*) as count FROM clients').get();
    const conversionRate = totalLeads.count > 0 ? (convertedLeads.count / totalLeads.count * 100).toFixed(1) : 0;

    // Recent activity
    const recentLeads = this.getLeads({ limit: 5 });
    const recentClients = this.getClients({ limit: 5 });

    // Pipeline metrics
    const pipelineValue = db.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total 
      FROM deals 
      WHERE status IN (?, ?, ?)
    `).get('proposal', 'negotiation', 'review');

    // Lead sources
    const leadSources = db.prepare(`
      SELECT source, COUNT(*) as count 
      FROM leads 
      GROUP BY source 
      ORDER BY count DESC
    `).all();

    // Monthly trends
    const monthlyTrends = db.prepare(`
      SELECT 
        strftime('%Y-%m', created_at) as month,
        COUNT(*) as leads,
        COALESCE(AVG(value), 0) as avg_value
      FROM leads 
      WHERE created_at >= date('now', '-12 months')
      GROUP BY strftime('%Y-%m', created_at)
      ORDER BY month DESC
    `).all();

    return {
      kpis: {
        totalLeads: totalLeads.count,
        totalClients: totalClients.count,
        totalRevenue: totalRevenue.total,
        monthlyLeads: monthlyLeads.count,
        conversionRate: parseFloat(conversionRate),
        pipelineValue: pipelineValue.total
      },
      recentActivity: {
        leads: recentLeads,
        clients: recentClients
      },
      charts: {
        leadSources,
        monthlyTrends: monthlyTrends.slice(0, 6).reverse()
      }
    };
  }

  // ================================
  // SECURITY & AUDIT
  // ================================
  
  static logSecurityEvent(eventData: Partial<SecurityLog>): DatabaseResult {
    const {
      event_type, user_id, ip_address, user_agent,
      details = {}, severity = 'info'
    } = eventData;

    const stmt = db.prepare(`
      INSERT INTO security_logs (event_type, user_id, ip_address, user_agent, details, severity)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    return stmt.run(event_type, user_id, ip_address, user_agent, JSON.stringify(details), severity);
  }

  static trackAnalyticsEvent(eventData: Partial<AnalyticsEvent>): DatabaseResult {
    const {
      event_type, page, action, element, value,
      user_agent, ip_address, city, referrer, session_id
    } = eventData;

    const stmt = db.prepare(`
      INSERT INTO analytics_events (
        event_type, page, action, element, value,
        user_agent, ip_address, city, referrer, session_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    return stmt.run(event_type, page, action, element, value, user_agent, ip_address, city, referrer, session_id);
  }

  // ================================
  // UTILITIES
  // ================================
  
  static backup(): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(process.cwd(), 'database', `backup_${timestamp}.db`);
    
    return new Promise((resolve, reject) => {
      db.backup(backupPath)
        .then(() => {
          console.log(`Database backed up to ${backupPath}`);
          resolve(backupPath);
        })
        .catch(reject);
    });
  }

  static close(): void {
    db.close();
  }
}

// Initialize database on module load
initializeDatabase();

export { db };
export default CRMDatabase;
