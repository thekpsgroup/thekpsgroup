import type { APIRoute } from 'astro';
import CRMDatabase from '../../utils/database.js';

export const GET: APIRoute = async ({ request, url }) => {
  try {
    const searchParams = new URL(url).searchParams;
    const type = searchParams.get('type');
    
    if (type === 'dashboard') {
      // Get comprehensive analytics data from database
      const analytics = CRMDatabase.getAnalytics();
      
      // Track the analytics page view
      const userAgent = request.headers.get('user-agent') || '';
      const ip = request.headers.get('x-forwarded-for') || 
                 request.headers.get('x-real-ip') || 
                 'unknown';

      CRMDatabase.trackAnalyticsEvent({
        event_type: 'page_view',
        page: '/api/analytics',
        action: 'fetch_dashboard',
        user_agent: userAgent,
        ip_address: ip,
        session_id: Math.random().toString(36).substring(7)
      });

      return new Response(JSON.stringify({
        success: true,
        data: analytics,
        lastUpdated: new Date().toISOString()
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      });
    }

    // For backward compatibility, return basic analytics
    const analytics = CRMDatabase.getAnalytics();
    
    return new Response(JSON.stringify(analytics), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  } catch (error) {
    console.error('Analytics API error:', error);
    
    return new Response(JSON.stringify({ 
      success: false,
      error: 'Failed to fetch analytics data',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const timestamp = new Date().toISOString();
    
    // Handle different types of analytics events
    switch (data.type) {
      case 'lead':
        // Create new lead in database
        const leadData = {
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          service: data.service,
          timeline: data.timeline,
          budget: parseFloat(data.budget) || 0,
          source: data.source || 'website',
          status: 'new' as const,
          value: estimateLeadValue(data.service, data.budget),
          city: data.city || 'Unknown',
          state: data.state,
          country: data.country || 'US',
          notes: data.notes
        };

        const newLead = CRMDatabase.createLead(leadData);
        
        // Also track as analytics event
        CRMDatabase.trackAnalyticsEvent({
          event_type: 'lead_created',
          page: data.page || '/contact',
          action: 'form_submit',
          value: newLead.id?.toString(),
          user_agent: request.headers.get('user-agent') || '',
          ip_address: request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown',
          city: data.city,
          session_id: data.session_id || Math.random().toString(36).substring(7)
        });

        return new Response(JSON.stringify({ 
          success: true, 
          leadId: newLead.id 
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      case 'pageview':
        // Track page view
        const result = CRMDatabase.trackAnalyticsEvent({
          event_type: 'page_view',
          page: data.page,
          action: 'view',
          user_agent: request.headers.get('user-agent') || '',
          ip_address: request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown',
          city: data.city,
          referrer: data.referrer,
          session_id: data.session_id || Math.random().toString(36).substring(7)
        });

        return new Response(JSON.stringify({ 
          success: true, 
          id: result.lastInsertRowid 
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      case 'interaction':
        // Track user interaction
        const interactionResult = CRMDatabase.trackAnalyticsEvent({
          event_type: 'interaction',
          page: data.page,
          action: data.action,
          element: data.element,
          value: data.value,
          user_agent: request.headers.get('user-agent') || '',
          ip_address: request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown',
          session_id: data.session_id || Math.random().toString(36).substring(7)
        });

        return new Response(JSON.stringify({ 
          success: true, 
          id: interactionResult.lastInsertRowid 
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      default:
        // Generic analytics event
        const genericResult = CRMDatabase.trackAnalyticsEvent({
          event_type: data.event_type || 'custom',
          page: data.page,
          action: data.action,
          element: data.element,
          value: data.value,
          user_agent: request.headers.get('user-agent') || '',
          ip_address: request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown',
          city: data.city,
          referrer: data.referrer,
          session_id: data.session_id || Math.random().toString(36).substring(7)
        });

        return new Response(JSON.stringify({ 
          success: true, 
          id: genericResult.lastInsertRowid 
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
    }
  } catch (error) {
    console.error('Analytics POST error:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Failed to save analytics data',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Helper function to estimate lead value based on service and budget
function estimateLeadValue(service: string, budget: string): number {
  const serviceMultipliers = {
    'QuickBooks Consulting': 2500,
    'QuickBooks Setup': 2500,
    'Monthly Bookkeeping': 5000,
    'Payroll Services': 5000,
    'Tax Preparation': 3000,
    'HR Services': 7500,
    'Technology Consulting': 15000,
    'Business Operations': 10000,
    'Business Consulting': 8000,
    'The Modern Suite': 25000,
    'HVAC Consulting': 12000,
    'Electrical Consulting': 12000
  };

  const budgetMultipliers = {
    'Under $5,000': 0.5,
    '$5,000 - $15,000': 1.0,
    '$15,000 - $50,000': 1.5,
    '$50,000+': 2.0
  };

  const baseValue = (serviceMultipliers as any)[service] || 5000;
  const budgetModifier = (budgetMultipliers as any)[budget] || 1.0;
  
  return Math.round(baseValue * budgetModifier);
}
