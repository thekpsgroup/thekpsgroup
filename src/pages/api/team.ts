import type { APIRoute } from 'astro';
import { createServerSupabaseClient } from '../../lib/supabase.js';

export const GET: APIRoute = async () => {
  try {
    const supabase = createServerSupabaseClient();
    const { data: teamMembers, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to fetch team members'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      team_members: teamMembers
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
