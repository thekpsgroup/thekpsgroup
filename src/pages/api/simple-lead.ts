import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, phone } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      return new Response(
        JSON.stringify({ error: 'Name, email, and phone are required' }), 
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create email content
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>New Lead from KPS Group Website</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #D4AF37; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">
              New Lead from KPS Group Website
            </h2>

            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">Lead Information:</h3>
              
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
              
              <p><strong>Source:</strong> KPS Group Website - Simple Lead Form</p>
              <p><strong>Date:</strong> ${new Date().toLocaleString('en-US', { 
                timeZone: 'America/Chicago',
                year: 'numeric',
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
              })}</p>
            </div>

            <div style="background: #e7f3ff; padding: 15px; border-radius: 8px; border-left: 4px solid #007bff;">
              <h4 style="margin-top: 0; color: #007bff;">Next Steps:</h4>
              <ul style="margin-bottom: 0;">
                <li>Call within 24 hours for best conversion</li>
                <li>Send follow-up email with consultation booking link</li>
                <li>Add to CRM system</li>
              </ul>
            </div>

            <p style="margin-top: 20px; font-size: 12px; color: #666;">
              This lead was generated from the KPS Group website contact form.
            </p>
          </div>
        </body>
      </html>
    `;

    // Send notification email to you
    const { data, error } = await resend.emails.send({
      from: 'KPS Group Leads <onboarding@resend.dev>',
      to: ['karson@thekpsgroup.com'],
      replyTo: email,
      subject: `New Lead from ${name} - ${phone}`,
      html: emailHtml,
      text: `New Lead from KPS Group Website:

Name: ${name}
Email: ${email}
Phone: ${phone}

Date: ${new Date().toLocaleString()}

Call within 24 hours for best conversion!`,
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to send notification email' }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Lead submitted successfully',
        emailId: data?.id 
      }), 
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Simple lead API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
