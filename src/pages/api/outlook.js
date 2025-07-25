// Outlook email integration API
export const POST = async ({ request }) => {
  try {
    const { leadId, emailType, customMessage } = await request.json();
    
    // Get lead data from analytics
    const analyticsResponse = await fetch('/api/analytics?type=leads');
    const analyticsData = await analyticsResponse.json();
    const lead = analyticsData.data.find(l => l.id === parseInt(leadId));
    
    if (!lead) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Lead not found' 
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Generate email content
    const emailContent = generateEmailContent(lead, emailType, customMessage);
    
    // Create mailto URL for Outlook
    const outlookUrl = createOutlookMailtoUrl(lead.email, emailContent.subject, emailContent.body);
    
    // Log the follow-up action
    await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'schedule_followup',
        leadId: lead.id,
        type: emailType,
        hoursFromNow: getFollowUpInterval(emailType),
        notes: `${emailType} email sent via Outlook`
      })
    });
    
    return new Response(JSON.stringify({
      success: true,
      data: {
        outlookUrl,
        emailContent,
        lead: {
          id: lead.id,
          name: lead.name,
          email: lead.email,
          service: lead.service
        }
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Outlook integration error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Failed to create Outlook email' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

function generateEmailContent(lead, emailType, customMessage = '') {
  const templates = {
    initial_contact: {
      subject: `Thank you for your interest in ${lead.service} - KPS Group`,
      body: `Dear ${lead.name},

Thank you for reaching out to KPS Group regarding ${lead.service}. We appreciate your interest in our services.

Based on your inquiry, I'd like to schedule a brief consultation to better understand your needs and discuss how we can help your business.

Our ${lead.service} service typically includes:
• Initial assessment and setup
• Ongoing support and maintenance  
• Training for your team
• Regular check-ins and optimization

${customMessage ? `\n${customMessage}\n` : ''}

Would you be available for a 15-minute call this week to discuss your specific requirements?

You can reach me directly at:
📞 Phone: (555) 123-4567
📧 Email: contact@kpsgroup.com
🌐 Website: www.kpsgroup.com

Best regards,
The KPS Group Team

P.S. We've helped over 500+ businesses streamline their operations. Let us show you how we can help yours too!`
    },
    
    follow_up: {
      subject: `Following up on your ${lead.service} inquiry - KPS Group`,
      body: `Dear ${lead.name},

I wanted to follow up on your recent inquiry about ${lead.service}. 

We understand that choosing the right business services partner is an important decision, and we're here to answer any questions you might have.

${customMessage ? `\n${customMessage}\n` : ''}

If you're ready to move forward, we can schedule a consultation at your convenience. If you need more time to consider, that's perfectly fine too - just let us know when you'd like to reconnect.

Some next steps we can discuss:
• Free consultation to assess your needs
• Custom pricing based on your business size
• Implementation timeline that works for you
• Ongoing support options

Best regards,
The KPS Group Team

📞 (555) 123-4567 | 📧 contact@kpsgroup.com`
    },
    
    pricing_update: {
      subject: `Custom pricing proposal for ${lead.service} - KPS Group`,
      body: `Dear ${lead.name},

Thank you for your continued interest in our ${lead.service}.

Based on our discussion, I've prepared a customized quote for your business needs:

${customMessage ? `\n${customMessage}\n` : ''}

📋 PROPOSAL HIGHLIGHTS:
• Service: ${lead.service}
• Estimated Timeline: ${lead.timeline || 'To be discussed'}
• Custom pricing based on your requirements

I'm available to discuss any aspects of the proposal and how we can best serve your business.

Would you like to schedule a call to review the details?

Best regards,
The KPS Group Team

📞 (555) 123-4567 | 📧 contact@kpsgroup.com`
    },
    
    check_in: {
      subject: `Checking in - ${lead.name} | KPS Group`,
      body: `Hi ${lead.name},

I hope this email finds you well! I wanted to check in regarding your ${lead.service} inquiry.

${customMessage ? `\n${customMessage}\n` : ''}

Is there anything specific you'd like to know about our services? I'm here to help answer any questions and make sure you have all the information you need.

No pressure at all - just want to make sure you're taken care of!

Best,
The KPS Group Team

📞 (555) 123-4567 | 📧 contact@kpsgroup.com`
    }
  };
  
  return templates[emailType] || templates.initial_contact;
}

function createOutlookMailtoUrl(email, subject, body) {
  const params = new URLSearchParams({
    to: email,
    subject: subject,
    body: body
  });
  
  return `mailto:${email}?${params.toString()}`;
}

function getFollowUpInterval(emailType) {
  const intervals = {
    initial_contact: 24, // 1 day
    follow_up: 72,      // 3 days  
    pricing_update: 48, // 2 days
    check_in: 168       // 1 week
  };
  
  return intervals[emailType] || 72;
}
