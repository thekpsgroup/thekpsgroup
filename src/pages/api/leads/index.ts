import type { APIRoute } from 'astro';
import { createServerSupabaseClient } from '../../../lib/supabase.js';

export const POST: APIRoute = async ({ request }) => {
  try {
    const supabase = createServerSupabaseClient();
    const formData = await request.json();
    const { name, email, phone, company, service_type, message, location } = formData;
    
    if (!name || !email || !phone || !service_type || !message) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    let priority = 'medium';
    const urgentKeywords = ['urgent', 'asap', 'emergency', 'immediately'];
    const highValueServices = ['technology-consulting', 'electrical-consulting', 'hvac-consulting'];
    
    if (urgentKeywords.some(keyword => message.toLowerCase().includes(keyword))) {
      priority = 'urgent';
    } else if (highValueServices.includes(service_type)) {
      priority = 'high';
    }

    const { data: karson } = await supabase
      .from('team_members')
      .select('id')
      .eq('email', 'karson@kpsgroup.com')
      .single();

    const { data: lead, error } = await supabase
      .from('leads')
      .insert({
        name,
        email,
        phone,
        company: company || null,
        service_type,
        message,
        priority,
        status: 'new',
        assigned_to: karson?.id || null,
        lead_source: 'website',
        location: location || null
      })
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to save lead'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      lead_id: lead.id,
      message: 'Lead submitted successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const GET: APIRoute = async ({ url }) => {
  try {
    const supabase = createServerSupabaseClient();
    const searchParams = new URL(url).searchParams;
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const { data: leads, error } = await supabase
      .from('leads')
      .select('*, assigned_to_member:team_members(name, role, email)')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to fetch leads'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      leads,
      count: leads.length
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
