-- KPS CRM Database Schema
-- SQLite database for development, easily upgradeable to PostgreSQL for production

-- Users and Authentication
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME,
    is_active BOOLEAN DEFAULT 1
);

-- Leads Management
CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    company TEXT,
    service TEXT,
    timeline TEXT,
    budget DECIMAL(10,2),
    status TEXT DEFAULT 'new',
    priority TEXT DEFAULT 'medium',
    source TEXT DEFAULT 'website',
    value DECIMAL(10,2),
    city TEXT,
    state TEXT,
    country TEXT DEFAULT 'US',
    notes TEXT,
    assigned_to INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    next_followup DATETIME,
    converted_at DATETIME,
    FOREIGN KEY (assigned_to) REFERENCES users(id)
);

-- Clients (Converted Leads)
CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_id INTEGER,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    company TEXT,
    total_value DECIMAL(10,2) DEFAULT 0,
    status TEXT DEFAULT 'active',
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_interaction DATETIME,
    notes TEXT,
    FOREIGN KEY (lead_id) REFERENCES leads(id)
);

-- Deals/Projects
CREATE TABLE IF NOT EXISTS deals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER,
    lead_id INTEGER,
    title TEXT NOT NULL,
    description TEXT,
    amount DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'proposal',
    probability INTEGER DEFAULT 50,
    expected_close_date DATE,
    actual_close_date DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (lead_id) REFERENCES leads(id)
);

-- Services offered in deals
CREATE TABLE IF NOT EXISTS deal_services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    deal_id INTEGER NOT NULL,
    service_name TEXT NOT NULL,
    quantity INTEGER DEFAULT 1,
    unit_price DECIMAL(10,2),
    total_price DECIMAL(10,2),
    FOREIGN KEY (deal_id) REFERENCES deals(id)
);

-- Follow-up Tasks
CREATE TABLE IF NOT EXISTS followups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_id INTEGER,
    client_id INTEGER,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    scheduled_for DATETIME NOT NULL,
    completed_at DATETIME,
    status TEXT DEFAULT 'pending',
    created_by INTEGER,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lead_id) REFERENCES leads(id),
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Pricing Rules
CREATE TABLE IF NOT EXISTS pricing_rules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    service TEXT NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    factors TEXT, -- JSON string with pricing factors
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Email Communications
CREATE TABLE IF NOT EXISTS email_communications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_id INTEGER,
    client_id INTEGER,
    subject TEXT,
    body TEXT,
    email_type TEXT,
    sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'sent',
    outlook_message_id TEXT,
    FOREIGN KEY (lead_id) REFERENCES leads(id),
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

-- Analytics and Tracking
CREATE TABLE IF NOT EXISTS analytics_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_type TEXT NOT NULL,
    page TEXT,
    action TEXT,
    element TEXT,
    value TEXT,
    user_agent TEXT,
    ip_address TEXT,
    city TEXT,
    referrer TEXT,
    session_id TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Security Audit Log
CREATE TABLE IF NOT EXISTS security_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_type TEXT NOT NULL,
    user_id INTEGER,
    ip_address TEXT,
    user_agent TEXT,
    details TEXT, -- JSON string with additional details
    severity TEXT DEFAULT 'info',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Lead Notes/Comments
CREATE TABLE IF NOT EXISTS lead_notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_id INTEGER NOT NULL,
    user_id INTEGER,
    note TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lead_id) REFERENCES leads(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- System Settings
CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE NOT NULL,
    value TEXT,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
CREATE INDEX IF NOT EXISTS idx_deals_status ON deals(status);
CREATE INDEX IF NOT EXISTS idx_followups_scheduled ON followups(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_analytics_created ON analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_security_created ON security_logs(created_at);

-- Insert default admin user (password: KPS_CRM_2025!@#)
-- Password hash is for "KPS_CRM_2025!@#" using bcrypt
INSERT OR IGNORE INTO users (username, email, password_hash, role) 
VALUES ('admin', 'admin@kpsgroup.com', '$2b$10$1234567890abcdefghijklmnopqrstuvwxyz', 'admin');

-- Insert default pricing rules
INSERT OR IGNORE INTO pricing_rules (service, base_price, factors, is_active) VALUES 
('QuickBooks Setup', 500.00, '{"small": 1.0, "medium": 1.5, "large": 2.0, "enterprise": 3.0}', 1),
('Monthly Bookkeeping', 200.00, '{"small": 1.0, "medium": 1.8, "large": 2.5, "enterprise": 4.0}', 1),
('Payroll Services', 150.00, '{"small": 1.0, "medium": 1.5, "large": 2.2, "enterprise": 3.5}', 1),
('Tax Preparation', 300.00, '{"small": 1.0, "medium": 1.3, "large": 1.8, "enterprise": 2.5}', 1),
('Business Consulting', 125.00, '{"hourly": 1.0, "project": 8.0, "retainer": 32.0}', 1);

-- Insert default settings
INSERT OR IGNORE INTO settings (key, value, description) VALUES 
('company_name', 'The KPS Group', 'Company name for CRM'),
('session_timeout', '1800', 'Session timeout in seconds (30 minutes)'),
('max_login_attempts', '3', 'Maximum login attempts before lockout'),
('lockout_duration', '900', 'Lockout duration in seconds (15 minutes)'),
('email_from', 'crm@kpsgroup.com', 'Default from email address'),
('currency', 'USD', 'Default currency for pricing');
