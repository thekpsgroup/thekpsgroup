export interface Database {
  public: {
    Tables: {
      team_members: {
        Row: {
          id: string;
          name: string;
          role: string;
          email: string;
          phone: string;
          specialties: string[];
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          role: string;
          email: string;
          phone: string;
          specialties: string[];
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          role?: string;
          email?: string;
          phone?: string;
          specialties?: string[];
          is_active?: boolean;
          updated_at?: string;
        };
      };
      leads: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          company: string | null;
          service_type: string;
          message: string;
          priority: 'low' | 'medium' | 'high' | 'urgent';
          status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
          assigned_to: string | null;
          lead_source: string;
          estimated_value: number | null;
          follow_up_date: string | null;
          location: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          company?: string | null;
          service_type: string;
          message: string;
          priority?: 'low' | 'medium' | 'high' | 'urgent';
          status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
          assigned_to?: string | null;
          lead_source: string;
          estimated_value?: number | null;
          follow_up_date?: string | null;
          location?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          company?: string | null;
          service_type?: string;
          message?: string;
          priority?: 'low' | 'medium' | 'high' | 'urgent';
          status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
          assigned_to?: string | null;
          lead_source?: string;
          estimated_value?: number | null;
          follow_up_date?: string | null;
          location?: string | null;
          updated_at?: string;
        };
      };
      lead_notes: {
        Row: {
          id: string;
          lead_id: string;
          note: string;
          created_by: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          lead_id: string;
          note: string;
          created_by: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          lead_id?: string;
          note?: string;
          created_by?: string;
        };
      };
      analytics: {
        Row: {
          id: string;
          metric_name: string;
          metric_value: number;
          date: string;
          metadata: Record<string, any> | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          metric_name: string;
          metric_value: number;
          date: string;
          metadata?: Record<string, any> | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          metric_name?: string;
          metric_value?: number;
          date?: string;
          metadata?: Record<string, any> | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      lead_priority: 'low' | 'medium' | 'high' | 'urgent';
      lead_status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
    };
  };
}
