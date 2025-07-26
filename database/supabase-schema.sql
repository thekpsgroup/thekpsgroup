-- KPS Group CRM Database Schema for Supabase PostgreSQL

-- Enable UUID extension (required for uuid_generate_v4())
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===============================
-- TEAM MEMBERS TABLE
-- ===============================
CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50) NOT NULL,
    specialties TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===============================
-- LEADS TABLE
-- ===============================
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    company VARCHAR(255),
    service_type VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'closed')),
    assigned_to UUID REFERENCES team_members(id),
    lead_source VARCHAR(100) NOT NULL,
    estimated_value DECIMAL(10,2),
    follow_up_date TIMESTAMPTZ,
    location VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===============================
-- LEAD NOTES TABLE
-- ===============================
CREATE TABLE IF NOT EXISTS lead_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    note TEXT NOT NULL,
    created_by UUID REFERENCES team_members(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===============================
-- ANALYTICS TABLE
-- ===============================
CREATE TABLE IF NOT EXISTS analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(10,2) NOT NULL,
    date DATE NOT NULL,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===============================
-- INDEXES
-- ===============================
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_to ON leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_priority ON leads(priority);
CREATE INDEX IF NOT EXISTS idx_lead_notes_lead_id ON lead_notes(lead_id);
CREATE INDEX IF NOT EXISTS idx_analytics_date ON analytics(date);
CREATE INDEX IF NOT EXISTS idx_analytics_metric_name ON analytics(metric_name);

-- ===============================
-- INSERT DEFAULT TEAM MEMBERS
-- ===============================
INSERT INTO team_members (name, role, email, phone, specialties) VALUES
    ('Karson Lawrence', 'CEO', 'karson@kpsgroup.com', '+1-469-534-3392', ARRAY['Business Strategy', 'Technology Leadership', 'Client Relations']),
    ('Brandon Gibson', 'CRO', 'brandon@kpsgroup.com', '+1-469-534-3392', ARRAY['Revenue Operations', 'Sales Strategy', 'Business Development']),
    ('Jorge Quiros', 'BDR', 'jorge@kpsgroup.com', '+1-469-534-3392', ARRAY['Lead Generation', 'Business Development', 'Client Outreach']),
    ('Allie Banks', 'CAO', 'allie@kpsgroup.com', '+1-469-534-3392', ARRAY['Operations Management', 'Process Optimization', 'Administrative Leadership'])
ON CONFLICT (email) DO NOTHING;

-- ===============================
-- TIMESTAMP TRIGGER FUNCTION
-- ===============================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ===============================
-- TRIGGERS FOR updated_at
-- ===============================
CREATE TRIGGER update_team_members_updated_at
BEFORE UPDATE ON team_members
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON leads
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ===============================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ===============================
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- ===============================
-- BASIC DEVELOPMENT POLICIES (Adjust in production!)
-- ===============================

-- TEAM MEMBERS
CREATE POLICY "Public read access to team members" ON team_members
FOR SELECT USING (true);

-- LEADS (Full access)
CREATE POLICY "Public full access to leads" ON leads
FOR ALL USING (true);

-- LEAD NOTES
CREATE POLICY "Public full access to lead notes" ON lead_notes
FOR ALL USING (true);

-- ANALYTICS
CREATE POLICY "Public read access to analytics" ON analytics
FOR SELECT USING (true);

CREATE POLICY "Public insert access to analytics" ON analytics
FOR INSERT WITH CHECK (true);
