// Database type definitions for KPS CRM

export interface Lead {
  id?: number;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  service?: string;
  timeline?: string;
  budget?: number;
  status?: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  source?: string;
  value?: number;
  city?: string;
  state?: string;
  country?: string;
  notes?: string;
  assigned_to?: number;
  created_at?: string;
  updated_at?: string;
  next_followup?: string;
  converted_at?: string;
}

export interface Client {
  id?: number;
  lead_id?: number;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  total_value?: number;
  status?: 'active' | 'inactive' | 'suspended';
  joined_at?: string;
  last_interaction?: string;
  notes?: string;
}

export interface Deal {
  id?: number;
  client_id?: number;
  lead_id?: number;
  title: string;
  description?: string;
  amount: number;
  status?: 'proposal' | 'negotiation' | 'review' | 'closed_won' | 'closed_lost';
  probability?: number;
  expected_close_date?: string;
  actual_close_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id?: number;
  username: string;
  email: string;
  password_hash: string;
  role?: string;
  created_at?: string;
  last_login?: string;
  is_active?: boolean;
}

export interface AnalyticsEvent {
  id?: number;
  event_type: string;
  page?: string;
  action?: string;
  element?: string;
  value?: string;
  user_agent?: string;
  ip_address?: string;
  city?: string;
  referrer?: string;
  session_id?: string;
  created_at?: string;
}

export interface SecurityLog {
  id?: number;
  event_type: string;
  user_id?: number;
  ip_address?: string;
  user_agent?: string;
  details?: Record<string, any>;
  severity?: 'info' | 'warning' | 'error' | 'critical';
  created_at?: string;
}

export interface LeadFilters {
  status?: string;
  priority?: string;
  service?: string;
  search?: string;
  limit?: number;
}

export interface ClientFilters {
  status?: string;
  search?: string;
  limit?: number;
}

export interface DealFilters {
  status?: string;
  client_id?: number;
  limit?: number;
}

export interface AnalyticsData {
  kpis: {
    totalLeads: number;
    totalClients: number;
    totalRevenue: number;
    monthlyLeads: number;
    conversionRate: number;
    pipelineValue: number;
  };
  recentActivity: {
    leads: Lead[];
    clients: Client[];
  };
  charts: {
    leadSources: Array<{ source: string; count: number }>;
    monthlyTrends: Array<{ month: string; leads: number; avg_value: number }>;
  };
}

export interface DatabaseResult {
  changes: number;
  lastInsertRowid: number;
}
