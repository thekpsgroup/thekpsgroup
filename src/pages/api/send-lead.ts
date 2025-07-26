import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import CRMDatabase from '../../utils/database.js';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

// Helper function to estimate lead value
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

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const service = formData.get('service') as string;
    const timeline = formData.get('timeline') as string;
    const budget = formData.get('budget') as string;
    const message = formData.get('message') as string;

    // Validate required fields
    if (!name || !email) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Name and email are required' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Enhanced email template for better presentation
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: linear-gradient(135deg, #D4AF37, #FFD700); padding: 20px; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 24px; }
            .content { padding: 20px; background: #f9f9f9; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #D4AF37; }
            .value { background: white; padding: 10px; border-left: 4px solid #D4AF37; margin-top: 5px; }
            .priority { background: #ffebee; border: 2px solid #f44336; padding: 15px; margin: 20px 0; border-radius: 5px; }
            .footer { background: #333; color: white; padding: 15px; text-align: center; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>🚀 New Lead from The KPS Group Website</h1>
          </div>
          
          <div class="content">
            <div class="priority">
              <strong>⚡ PRIORITY LEAD ALERT</strong><br>
              New consultation request received via the website contact form.
            </div>

            <div class="field">
              <div class="label">👤 Name:</div>
              <div class="value">${name}</div>
            </div>

            <div class="field">
              <div class="label">📧 Email:</div>
              <div class="value">${email}</div>
            </div>

            ${phone ? `
            <div class="field">
              <div class="label">📞 Phone:</div>
              <div class="value">${phone}</div>
            </div>
            ` : ''}

            ${service ? `
            <div class="field">
              <div class="label">🎯 Service Interest:</div>
              <div class="value">${service}</div>
            </div>
            ` : ''}

            ${timeline ? `
            <div class="field">
              <div class="label">⏰ Timeline:</div>
              <div class="value">${timeline}</div>
            </div>
            ` : ''}

            ${budget ? `
            <div class="field">
              <div class="label">💰 Budget Range:</div>
              <div class="value">${budget}</div>
            </div>
            ` : ''}

            ${message ? `
            <div class="field">
              <div class="label">💭 Message:</div>
              <div class="value">${message}</div>
            </div>
            ` : ''}

            <div class="field">
              <div class="label">📅 Timestamp:</div>
              <div class="value">${new Date().toLocaleString()}</div>
            </div>
          </div>

          <div class="footer">
            The KPS Group - Lead Management System<br>
            <small>This lead has been automatically added to your analytics dashboard</small>
          </div>
        </body>
      </html>
    `;

    // Save lead directly to database
    try {
      const leadData = {
        name,
        email,
        phone,
        service,
        timeline,
        budget: parseFloat(budget?.replace(/[^0-9.]/g, '') || '0') || 0,
        source: 'contact_form',
        status: 'new' as const,
        notes: message,
        value: estimateLeadValue(service || '', budget || ''),
        created_at: new Date().toISOString()
      };

      const newLead = CRMDatabase.createLead(leadData);

      // Also track as analytics event
      CRMDatabase.trackAnalyticsEvent({
        event_type: 'lead_created',
        page: '/contact',
        action: 'form_submit',
        value: newLead.id?.toString(),
        user_agent: request.headers.get('user-agent') || '',
        ip_address: request.headers.get('x-forwarded-for') || 
                    request.headers.get('x-real-ip') || 
                    'unknown',
        session_id: Math.random().toString(36).substring(7)
      });

      // Zapier integration removed as requested

      console.log('Lead saved to database:', newLead.id);
    } catch (databaseError) {
      console.error('Failed to save lead to database:', databaseError);
      // Continue with email sending even if database fails
    }
            ` : ''}

            <div class="field">
              <div class="label">📅 Submitted:</div>
              <div class="value">${new Date().toLocaleString('en-US', { 
                timeZone: 'America/Chicago',
                dateStyle: 'full',
                timeStyle: 'short'
              })}</div>
            </div>
          </div>

          <div class="footer">
                        The KPS Group Lead Management System<br>
            Respond within 2 hours for optimal conversion rates
          </div>
        </body>
      </html>
    `;

    // Send email notification
    const { data, error } = await resend.emails.send({
      from: 'The KPS Group <noreply@thekpsgroup.com>',
      to: [import.meta.env.LEAD_TO_EMAIL || 'sales@thekpsgroup.com'],
      subject: `🚀 New Lead: ${name} - ${service || 'General Inquiry'}`,
      html: htmlContent,
      text: `
New lead from The KPS Group website:

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Service Interest: ${service || 'Not specified'}
Timeline: ${timeline || 'Not specified'}
Budget: ${budget || 'Not specified'}
Message: ${message || 'No message provided'}

Submitted: ${new Date().toLocaleString()}
      `.trim()
    });

    if (error) {
      console.error('Resend API Error:', error);
      
      // Fallback: Return success to user but log the error
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Thank you! Your message has been received and we\'ll get back to you soon.' 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Thank you! Your consultation request has been received. We\'ll contact you within 2 hours to schedule your FREE strategy session.',
      messageId: data?.id
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('API Error:', error);
    
    // Return a generic success message to prevent user-facing errors
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Thank you! Your message has been received and we\'ll get back to you soon.' 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
