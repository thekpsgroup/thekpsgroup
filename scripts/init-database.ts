#!/usr/bin/env node
/**
 * Database Initialization Script for KPS CRM
 * Run this to set up the SQLite database with sample data
 */

import { Database } from '../src/utils/database.ts';

console.log('🚀 Initializing KPS CRM Database...');

try {
  // Database should auto-initialize with schema
  console.log('✅ Database schema created');

  // Add some sample data for testing
  console.log('📝 Adding sample data...');

  const database = new Database();

  // Sample leads
  const sampleLeads = [
    {
      name: 'Acme Corporation',
      email: 'contact@acme.com',
      phone: '(555) 123-4567',
      company: 'Acme Corp',
      service: 'QuickBooks Setup',
      timeline: 'Within 1 month',
      budget: 2500,
      status: 'new' as const,
      priority: 'high' as const,
      source: 'website',
      value: 3500,
      city: 'Dallas',
      state: 'TX',
      country: 'US',
      notes: 'Looking to modernize their accounting system'
    },
    {
      name: 'Tech Solutions Inc',
      email: 'info@techsolutions.com',
      phone: '(555) 987-6543',
      company: 'Tech Solutions Inc',
      service: 'Monthly Bookkeeping',
      timeline: 'Immediately',
      budget: 5000,
      status: 'qualified' as const,
      priority: 'medium' as const,
      source: 'referral',
      value: 7500,
      city: 'Austin',
      state: 'TX',
      country: 'US',
      notes: 'Growing startup needs ongoing bookkeeping support'
    },
    {
      name: 'Local Restaurant Group',
      email: 'owner@restaurant.com',
      phone: '(555) 456-7890',
      company: 'Restaurant Group LLC',
      service: 'Payroll Services',
      timeline: 'Within 2 weeks',
      budget: 1500,
      status: 'contacted' as const,
      priority: 'urgent' as const,
      source: 'social_media',
      value: 2200,
      city: 'Houston',
      state: 'TX',
      country: 'US',
      notes: 'Multiple locations need payroll consolidation'
    }
  ];

  sampleLeads.forEach((lead, index) => {
    const result = database.createLead(lead);
    if (result.success) {
      console.log(`  ✓ Lead ${index + 1}: ${lead.name} (ID: ${result.id})`);
    } else {
      console.log(`  ❌ Failed to create lead ${index + 1}: ${result.error}`);
    }
  });

  // Sample clients (converted leads)
  const sampleClients = [
    {
      name: 'Manufacturing Plus',
      email: 'cfo@manufacturingplus.com',
      phone: '(555) 111-2222',
      company: 'Manufacturing Plus LLC',
      total_value: 15600,
      status: 'active' as const,
      notes: 'Long-term client, very satisfied with our services'
    },
    {
      name: 'Service Provider Co',
      email: 'owner@serviceprovider.com',
      phone: '(555) 333-4444',
      company: 'Service Provider Co',
      total_value: 9800,
      status: 'active' as const,
      notes: 'Consistent monthly bookkeeping client'
    }
  ];

  sampleClients.forEach((client, index) => {
    const result = database.createClient(client);
    if (result.success) {
      console.log(`  ✓ Client ${index + 1}: ${client.name} (ID: ${result.id})`);
    } else {
      console.log(`  ❌ Failed to create client ${index + 1}: ${result.error}`);
    }
  });

  // Create default admin user
  console.log('🔐 Creating default admin user...');
  const adminResult = database.createUser({
    username: 'admin',
    email: 'admin@kpsgroup.com',
    password: 'kpsadmin', // Should be changed in production
    first_name: 'System',
    last_name: 'Administrator',
    role: 'admin',
    department: 'IT'
  });

  if (adminResult.success) {
    console.log('  ✓ Admin user created successfully (ID: ' + adminResult.id + ')');
    console.log('  📝 Username: admin');
    console.log('  📧 Email: admin@kpsgroup.com');
    console.log('  🔑 Password: kpsadmin (change this in production!)');
  } else {
    console.log('  ❌ Failed to create admin user: ' + adminResult.error);
  }

  // Get analytics to verify everything works
  const analytics = database.getAnalyticsData();
  if (analytics.success) {
    console.log('\n📊 Database Summary:');
    console.log(`  • Database initialized successfully`);
    console.log(`  • Sample data created`);
    console.log(`  • Analytics tracking enabled`);
  }

  console.log('\n✅ Database initialization complete!');
  console.log('🎯 You can now start the CRM and see real data in the dashboard.');
  
} catch (error) {
  console.error('❌ Database initialization failed:', error);
  process.exit(1);
}
