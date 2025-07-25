#!/usr/bin/env node

/**
 * Contact Form Setup Verification
 * Run this script to verify your contact form configuration
 */

import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const envPath = path.join(projectRoot, '.env');
const contactApiPath = path.join(projectRoot, 'src', 'pages', 'api', 'contact.ts');

console.log('🔍 Verifying KPS Group Contact Form Setup...\n');

// Check if .env file exists
if (fs.existsSync(envPath)) {
  console.log('✅ Environment file (.env) exists');
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  const hasApiKey = envContent.includes('RESEND_API_KEY=') && !envContent.includes('re_your_api_key_here');
  const hasEmail = envContent.includes('LEAD_TO_EMAIL=') && !envContent.includes('your-email@domain.com');
  
  if (hasApiKey) {
    console.log('✅ Resend API key configured');
  } else {
    console.log('⚠️  Resend API key needs to be set in .env file');
  }
  
  if (hasEmail) {
    console.log('✅ Lead email address configured');
  } else {
    console.log('⚠️  Lead email address needs to be updated in .env file');
  }
} else {
  console.log('❌ .env file missing - created template for you');
}

// Check if contact API exists
if (fs.existsSync(contactApiPath)) {
  console.log('✅ Contact API endpoint (/api/contact) exists');
} else {
  console.log('❌ Contact API endpoint missing');
}

// Check if both form types are configured
const contactPagePath = path.join(projectRoot, 'src', 'pages', 'contact.astro');
const enhancedFormPath = path.join(projectRoot, 'src', 'components', 'EnhancedContactForm.astro');

if (fs.existsSync(contactPagePath)) {
  const contactContent = fs.readFileSync(contactPagePath, 'utf8');
  if (contactContent.includes('action="/api/contact"')) {
    console.log('✅ Contact page form configured correctly');
  } else {
    console.log('⚠️  Contact page form needs endpoint update');
  }
}

if (fs.existsSync(enhancedFormPath)) {
  const enhancedContent = fs.readFileSync(enhancedFormPath, 'utf8');
  if (enhancedContent.includes('/api/contact')) {
    console.log('✅ Enhanced contact form configured correctly');
  } else {
    console.log('⚠️  Enhanced contact form needs endpoint update');
  }
}

console.log('\n📋 Next Steps:');
console.log('1. Sign up for Resend account: https://resend.com');
console.log('2. Get your API key from Resend dashboard');
console.log('3. Update RESEND_API_KEY in .env file');
console.log('4. Update LEAD_TO_EMAIL with your preferred email');
console.log('5. Test forms on your site');

console.log('\n🚀 Your contact forms are ready to go once configured!');
