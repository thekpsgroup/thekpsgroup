# Email Configuration Setup Guide

## ✅ Contact Form Email Setup

Your contact forms are now properly configured and ready to send emails! Here's what you need to do to activate email functionality:

### 1. Get a Resend API Key

1. **Sign up for Resend**: Go to [https://resend.com](https://resend.com) and create a free account
2. **Verify your domain**: Add your domain `thekpsgroup.com` to Resend (or use their subdomain for testing)
3. **Get your API key**: Copy your API key from the Resend dashboard

### 2. Configure Environment Variables

Update your `.env` file with your actual values:

```bash
# Replace with your actual Resend API key
RESEND_API_KEY=re_your_actual_api_key_here

# Replace with the email where you want to receive form submissions
LEAD_TO_EMAIL=sales@thekpsgroup.com

# Optional: Google Tag Manager ID
GTM_ID=GTM-XXXXXXX
```

### 3. Test Your Forms

Your site has two contact form implementations:

1. **Simple Contact Form** (`/contact` page) - Uses `/api/contact` endpoint
2. **Enhanced Multi-Step Form** (`EnhancedContactForm.astro` component) - Uses `/api/contact` endpoint

Both forms now:
- ✅ Save leads to your CRM database
- ✅ Send formatted email notifications to you
- ✅ Send auto-reply confirmation emails to customers
- ✅ Include comprehensive lead information and next steps
- ✅ Handle errors gracefully

### 4. Email Features

**Admin Notification Email Includes:**
- Complete contact information
- Service interests and business details
- Priority flagging for high-value leads ($50,000+ budget)
- Actionable next steps
- Direct reply links and phone call buttons
- Lead metadata and tracking information

**Customer Auto-Reply Includes:**
- Professional thank you message
- Clear timeline expectations (response within 2-24 hours)
- Contact information for urgent needs
- Next steps explanation

### 5. Database Integration

Your forms automatically:
- Save all leads to `database/kps_crm.db`
- Track analytics events
- Estimate lead values based on services and budget
- Set priority levels for follow-up

### 6. Testing Checklist

Before going live:
- [ ] Add real Resend API key to `.env`
- [ ] Update `LEAD_TO_EMAIL` to your preferred email
- [ ] Test form submission on `/contact` page
- [ ] Test enhanced form in components using `EnhancedContactForm`
- [ ] Verify emails are received and formatted correctly
- [ ] Check database entries in CRM dashboard (`/admin` or `/crm`)

### 7. Domain Configuration (Important!)

For production use with your domain:
1. Add DNS records in Resend dashboard for `thekpsgroup.com`
2. Verify domain ownership
3. Update `from` addresses in the API to use your domain
4. Test email deliverability

### 8. Production Deployment

Your forms will work immediately on Vercel/Netlify with:
- Environment variables set in deployment dashboard
- Database files deployed (SQLite included)
- No additional configuration needed

## 🚀 Ready to Go!

Your contact forms are now enterprise-ready with:
- Professional email templates
- CRM integration
- Auto-replies
- Lead prioritization
- Error handling
- Mobile optimization

Just add your Resend API key and you're live!
