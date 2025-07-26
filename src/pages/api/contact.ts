import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { Database } from '../../utils/database.ts';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

// Helper function to estimate lead value
function estimateLeadValue(service: string, budget: string): number {
  const serviceMultipliers: Record<string, number> = {
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

  const budgetMultipliers: Record<string, number> = {
    'Under $5,000': 0.5,
    '$5,000 - $15,000': 1.0,
    '$15,000 - $50,000': 1.5,
    '$50,000+': 2.0
  };

  const baseValue = serviceMultipliers[service] || 5000;
  const budgetModifier = budgetMultipliers[budget] || 1.0;
  
  return Math.round(baseValue * budgetModifier);
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    
    // Extract form fields with better handling
    const name = formData.get('name') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const company = formData.get('company') as string;
    const service = formData.get('service') as string;
    const services = formData.getAll('services') as string[];
    const timeline = formData.get('timeline') as string;
    const budget = formData.get('budget') as string;
    const industry = formData.get('industry') as string;
    const employees = formData.get('employees') as string;
    const message = formData.get('message') as string;
    const formType = formData.get('formType') as string || 'contact';
    const location = formData.get('location') as string;
    const preferredContact = formData.get('preferredContact') as string;
    const bestTime = formData.get('bestTime') as string;

    // Combine name fields if using multi-step form
    const fullName = name || (firstName && lastName ? `${firstName} ${lastName}` : firstName || lastName);

    // Validate required fields
    if (!fullName || !email) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Name and email are required' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Please enter a valid email address' 
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Save to database (if available)
    try {
      const leadValue = estimateLeadValue(service || services.join(', '), budget || '');
      
      const leadData = {
        name: fullName,
        email,
        phone: phone || '',
        company: company || '',
        service: service || services.join(', '),
        timeline: timeline || '',
        budget: parseFloat(budget?.replace(/[^0-9.]/g, '') || '0') || 0,
        status: 'new' as const,
        priority: (budget && budget.indexOf('$50,000+') !== -1) || services.indexOf('The Modern Suite') !== -1 ? 'high' as const : 'medium' as const,
        source: 'website_form',
        value: leadValue,
        notes: message || ''
      };

      const database = new Database();
      const newLead = database.createLead(leadData);

      // Track analytics event
      database.trackAnalyticsEvent({
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

      console.log('Lead saved to database:', newLead.id);
    } catch (databaseError) {
      console.error('Failed to save lead to database:', databaseError);
      // Continue with email sending even if database fails
    }

    // Enhanced email template
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Lead - The KPS Group</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              margin: 0; 
              padding: 0; 
              background-color: #f8f9fa;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              background: white; 
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header { 
              background: linear-gradient(135deg, #D4AF37, #FFD700); 
              padding: 30px 20px; 
              text-align: center; 
              color: white;
            }
            .header h1 { 
              margin: 0; 
              font-size: 28px; 
              font-weight: 600;
            }
            .priority-alert {
              background: #ff4444;
              color: white;
              padding: 15px;
              text-align: center;
              font-weight: bold;
              margin: 0;
            }
            .content { 
              padding: 30px 20px; 
              background: white;
            }
            .lead-summary {
              background: #f8f9fa;
              border-left: 4px solid #D4AF37;
              padding: 20px;
              margin: 20px 0;
              border-radius: 0 8px 8px 0;
            }
            .field-group { 
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin-bottom: 20px;
            }
            .field { 
              background: #f8f9fa;
              padding: 15px;
              border-radius: 8px;
              border-left: 3px solid #D4AF37;
            }
            .field-label { 
              font-weight: 600; 
              color: #D4AF37; 
              font-size: 14px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 5px;
            }
            .field-value { 
              font-size: 16px;
              color: #2c3e50;
              word-wrap: break-word;
            }
            .field-value.empty {
              color: #6c757d;
              font-style: italic;
            }
            .services-list {
              background: #e3f2fd;
              border: 1px solid #2196f3;
              border-radius: 8px;
              padding: 15px;
              margin: 10px 0;
            }
            .service-tag {
              display: inline-block;
              background: #2196f3;
              color: white;
              padding: 4px 12px;
              border-radius: 20px;
              font-size: 12px;
              margin: 2px;
            }
            .message-section {
              background: #fff3cd;
              border: 1px solid #ffc107;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
            }
            .action-items {
              background: #d1ecf1;
              border: 1px solid #bee5eb;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
            }
            .action-items h3 {
              color: #0c5460;
              margin-top: 0;
            }
            .action-items ul {
              margin: 10px 0;
              padding-left: 20px;
            }
            .action-items li {
              margin: 8px 0;
            }
            .cta-buttons {
              text-align: center;
              margin: 30px 0;
            }
            .cta-button {
              display: inline-block;
              padding: 12px 24px;
              margin: 0 10px;
              background: #D4AF37;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 600;
              transition: background 0.3s ease;
            }
            .cta-button:hover {
              background: #B8941F;
            }
            .cta-button.secondary {
              background: #6c757d;
            }
            .cta-button.secondary:hover {
              background: #5a6268;
            }
            .footer { 
              background: #2c3e50; 
              color: white; 
              padding: 20px; 
              text-align: center; 
              font-size: 14px;
            }
            .metadata {
              font-size: 12px;
              color: #6c757d;
              border-top: 1px solid #e9ecef;
              padding-top: 15px;
              margin-top: 20px;
            }
            @media (max-width: 600px) {
              .field-group {
                grid-template-columns: 1fr;
                gap: 10px;
              }
              .cta-button {
                display: block;
                margin: 10px 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚀 New Lead Alert</h1>
              <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
                Fresh inquiry from The KPS Group website
              </p>
            </div>
            
            ${((budget && budget.indexOf('$50,000+') !== -1) || services.indexOf('The Modern Suite') !== -1) ? 
              '<div class="priority-alert">⚡ HIGH PRIORITY LEAD - LARGE BUDGET/ENTERPRISE SERVICE ⚡</div>' : 
              ''
            }

            <div class="content">
              <div class="lead-summary">
                <h2 style="margin: 0 0 10px 0; color: #2c3e50;">Lead Summary</h2>
                <p style="margin: 0; font-size: 16px; color: #6c757d;">
                  <strong>${fullName}</strong> from ${company || 'N/A'} is interested in 
                  <strong>${service || services.join(', ') || 'general services'}</strong>
                  ${timeline ? ` with a ${timeline} timeline` : ''}
                </p>
              </div>

              <div class="field-group">
                <div class="field">
                  <div class="field-label">👤 Contact Name</div>
                  <div class="field-value">${fullName}</div>
                </div>
                <div class="field">
                  <div class="field-label">📧 Email Address</div>
                  <div class="field-value">
                    <a href="mailto:${email}" style="color: #D4AF37;">${email}</a>
                  </div>
                </div>
              </div>

              <div class="field-group">
                <div class="field">
                  <div class="field-label">📞 Phone Number</div>
                  <div class="field-value ${!phone ? 'empty' : ''}">
                    ${phone ? `<a href="tel:${phone}" style="color: #D4AF37;">${phone}</a>` : 'Not provided'}
                  </div>
                </div>
                <div class="field">
                  <div class="field-label">🏢 Company Name</div>
                  <div class="field-value ${!company ? 'empty' : ''}">${company || 'Not provided'}</div>
                </div>
              </div>

              <div class="field-group">
                <div class="field">
                  <div class="field-label">🏭 Industry</div>
                  <div class="field-value ${!industry ? 'empty' : ''}">${industry || 'Not specified'}</div>
                </div>
                <div class="field">
                  <div class="field-label">👥 Company Size</div>
                  <div class="field-value ${!employees ? 'empty' : ''}">${employees || 'Not specified'}</div>
                </div>
              </div>

              ${services.length > 0 ? `
                <div class="services-list">
                  <div class="field-label" style="margin-bottom: 10px;">🛠️ Services of Interest</div>
                  ${services.map(s => `<span class="service-tag">${s}</span>`).join('')}
                </div>
              ` : service ? `
                <div class="field">
                  <div class="field-label">🛠️ Primary Service Interest</div>
                  <div class="field-value">${service}</div>
                </div>
              ` : ''}

              <div class="field-group">
                <div class="field">
                  <div class="field-label">⏰ Timeline</div>
                  <div class="field-value ${!timeline ? 'empty' : ''}">${timeline || 'Not specified'}</div>
                </div>
                <div class="field">
                  <div class="field-label">💰 Budget Range</div>
                  <div class="field-value ${!budget ? 'empty' : ''}">${budget || 'Not specified'}</div>
                </div>
              </div>

              <div class="field-group">
                <div class="field">
                  <div class="field-label">📞 Preferred Contact</div>
                  <div class="field-value ${!preferredContact ? 'empty' : ''}">${preferredContact || 'Any method'}</div>
                </div>
                <div class="field">
                  <div class="field-label">🕒 Best Time to Contact</div>
                  <div class="field-value ${!bestTime ? 'empty' : ''}">${bestTime || 'Anytime'}</div>
                </div>
              </div>

              ${location ? `
                <div class="field">
                  <div class="field-label">📍 Location</div>
                  <div class="field-value">${location}</div>
                </div>
              ` : ''}

              ${message ? `
                <div class="message-section">
                  <div class="field-label" style="margin-bottom: 10px;">💬 Customer Message</div>
                  <div class="field-value" style="line-height: 1.6; white-space: pre-wrap;">${message}</div>
                </div>
              ` : ''}

              <div class="action-items">
                <h3>📋 Recommended Next Steps</h3>
                <ul>
                  <li><strong>Respond within 2 hours</strong> for optimal conversion rates</li>
                  <li>Send personalized follow-up email addressing specific service interests</li>
                  <li>Schedule discovery call to understand detailed requirements</li>
                  <li>Prepare relevant case studies and testimonials</li>
                  ${(budget && budget.indexOf('$50,000+') !== -1) ? '<li><strong>Escalate to senior team member</strong> - High-value prospect</li>' : ''}
                </ul>
              </div>

              <div class="cta-buttons">
                <a href="mailto:${email}?subject=Re: Your inquiry about ${service || services.join(', ')}&body=Hi ${fullName},%0D%0A%0D%0AThank you for your interest in ${service || services.join(', ')}. I'd love to schedule a brief call to discuss your specific needs.%0D%0A%0D%0ABest regards,%0D%0AThe KPS Group Team" 
                   class="cta-button">📧 Reply to Lead</a>
                ${phone ? `<a href="tel:${phone}" class="cta-button secondary">📞 Call Now</a>` : ''}
              </div>

              <div class="metadata">
                <strong>📊 Lead Metadata:</strong><br>
                Form Type: ${formType}<br>
                Submitted: ${new Date().toLocaleString('en-US', { 
                  timeZone: 'America/Chicago'
                })}<br>
                ${location ? `Location: ${location}<br>` : ''}
                Source: Website Contact Form
              </div>
            </div>

            <div class="footer">
              <strong>The KPS Group Lead Management System</strong><br>
              🎯 Response Time Goal: &lt; 2 hours | 📈 Conversion Rate Target: 85%+
            </div>
          </div>
        </body>
      </html>
    `;

    // Plain text version for better deliverability
    const textContent = `
NEW LEAD ALERT - The KPS Group

Contact Information:
- Name: ${fullName}
- Email: ${email}
- Phone: ${phone || 'Not provided'}
- Company: ${company || 'Not provided'}

Business Details:
- Industry: ${industry || 'Not specified'}
- Company Size: ${employees || 'Not specified'}
- Service Interest: ${service || services.join(', ') || 'General inquiry'}
- Budget Range: ${budget || 'Not specified'}
- Timeline: ${timeline || 'Not specified'}

Contact Preferences:
- Preferred Method: ${preferredContact || 'Any'}
- Best Time: ${bestTime || 'Anytime'}

${message ? `Customer Message:\n${message}\n` : ''}

Next Steps:
1. Respond within 2 hours for optimal conversion
2. Send personalized follow-up email
3. Schedule discovery call
4. Prepare relevant materials

Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })}
Form Type: ${formType}
${location ? `Location: ${location}` : ''}
    `.trim();

    // Send email notification
    const { data, error } = await resend.emails.send({
      from: 'The KPS Group Website <noreply@thekpsgroup.com>',
      to: [import.meta.env.LEAD_TO_EMAIL || 'info@thekpsgroup.com'],
      replyTo: email,
      subject: `🚀 ${(budget && budget.indexOf('$50,000+') !== -1) ? 'HIGH PRIORITY ' : ''}New Lead: ${fullName} - ${service || services.join(', ') || 'General Inquiry'}`,
      html: htmlContent,
      text: textContent,
      tags: [
        { name: 'source', value: 'website_form' },
        { name: 'form_type', value: formType },
        { name: 'service', value: service || services.join(',') || 'general' },
        { name: 'priority', value: (budget && budget.indexOf('$50,000+') !== -1) ? 'high' : 'normal' }
      ]
    });

    if (error) {
      console.error('Resend API Error:', error);
      
      // Return success to user but log the error - don't let email issues break UX
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Your message has been received! We\'ll contact you within 24 hours.',
        debug: `Email service temporarily unavailable (logged for admin review)`
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('Email sent successfully:', data);

    // Send auto-reply to customer
    try {
      const autoReplyHtml = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank You - The KPS Group</title>
            <style>
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                line-height: 1.6; 
                color: #333; 
                margin: 0; 
                padding: 0; 
                background-color: #f8f9fa;
              }
              .container { 
                max-width: 600px; 
                margin: 0 auto; 
                background: white; 
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .header { 
                background: linear-gradient(135deg, #D4AF37, #FFD700); 
                padding: 30px 20px; 
                text-align: center; 
                color: white;
              }
              .content { 
                padding: 30px 20px; 
              }
              .next-steps {
                background: #f8f9fa;
                border-left: 4px solid #D4AF37;
                padding: 20px;
                margin: 20px 0;
                border-radius: 0 8px 8px 0;
              }
              .contact-info {
                background: #e3f2fd;
                border-radius: 8px;
                padding: 20px;
                text-align: center;
                margin: 20px 0;
              }
              .footer { 
                background: #2c3e50; 
                color: white; 
                padding: 20px; 
                text-align: center; 
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Thank You, ${fullName}!</h1>
                <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
                  We've received your inquiry and will be in touch soon
                </p>
              </div>
              
              <div class="content">
                <p>Hi ${fullName},</p>
                
                <p>Thank you for reaching out to The KPS Group regarding <strong>${service || services.join(', ') || 'our business services'}</strong>. We appreciate your interest and are excited to learn more about your business needs.</p>

                <div class="next-steps">
                  <h3>What happens next?</h3>
                  <ul>
                    <li><strong>Within 2 hours:</strong> One of our specialists will personally review your inquiry</li>
                    <li><strong>Within 24 hours:</strong> We'll contact you via ${preferredContact || 'your preferred method'} to schedule a consultation</li>
                    <li><strong>Discovery call:</strong> We'll discuss your specific needs and how we can help</li>
                    <li><strong>Custom proposal:</strong> You'll receive a tailored solution for your business</li>
                  </ul>
                </div>

                <div class="contact-info">
                  <h3>Need immediate assistance?</h3>
                  <p><strong>📞 Phone:</strong> <a href="tel:+14695343392" style="color: #D4AF37;">(469) 534-3392</a></p>
                  <p><strong>📧 Email:</strong> <a href="mailto:info@thekpsgroup.com" style="color: #D4AF37;">info@thekpsgroup.com</a></p>
                  <p><strong>🕒 Hours:</strong> Monday-Friday, 8 AM - 6 PM CST</p>
                </div>

                <p>We've helped over 250+ businesses streamline their operations and achieve sustainable growth. We're looking forward to doing the same for you!</p>

                <p>Best regards,<br>
                <strong>The KPS Group Team</strong></p>
              </div>

              <div class="footer">
                <strong>The KPS Group</strong><br>
                Modern Business Infrastructure Engine<br>
                <a href="https://thekpsgroup.com" style="color: #D4AF37;">www.thekpsgroup.com</a>
              </div>
            </div>
          </body>
        </html>
      `;

      await resend.emails.send({
        from: 'The KPS Group <info@thekpsgroup.com>',
        to: [email],
        subject: `Thank you for contacting The KPS Group, ${fullName}!`,
        html: autoReplyHtml,
        text: `Hi ${fullName},

Thank you for reaching out to The KPS Group regarding ${service || services.join(', ') || 'our business services'}. 

What happens next:
- Within 2 hours: Personal review of your inquiry
- Within 24 hours: We'll contact you to schedule a consultation  
- Discovery call: Discuss your specific needs
- Custom proposal: Tailored solution for your business

Need immediate assistance?
Phone: (469) 534-3392
Email: info@thekpsgroup.com
Hours: Monday-Friday, 8 AM - 6 PM CST

Best regards,
The KPS Group Team
www.thekpsgroup.com`,
        tags: [
          { name: 'type', value: 'auto_reply' },
          { name: 'form_type', value: formType }
        ]
      });
    } catch (autoReplyError) {
      console.error('Auto-reply failed:', autoReplyError);
      // Don't fail the main request if auto-reply fails
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Thank you for your interest! We\'ll contact you within 24 hours to discuss your needs.',
      data: {
        leadId: data?.id,
        timestamp: new Date().toISOString()
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('API Error:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'There was an error processing your request. Please try again or contact us directly at info@thekpsgroup.com.' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
