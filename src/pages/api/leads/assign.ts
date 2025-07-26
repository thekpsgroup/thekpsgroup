import type { APIRoute } from 'astro';
import { createServerSupabaseClient } from '../../../lib/supabase.js';

export const POST: APIRoute = async ({ request }) => {
  try {
    const supabase = createServerSupabaseClient();
    const { lead_id, assigned_to, note } = await request.json();

    if (!lead_id || !assigned_to) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing lead_id or assigned_to'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { error: updateError } = await supabase
      .from('leads')
      .update({
        assigned_to,
        status: 'contacted',
        updated_at: new Date().toISOString()
      })
      .eq('id', lead_id);

    if (updateError) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to assign lead'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (note) {
      await supabase
        .from('lead_notes')
        .insert({
          lead_id,
          note,
          created_by: assigned_to
        });
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Lead assigned successfully'
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
