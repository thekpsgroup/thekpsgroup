#!/usr/bin/env node
/**
 * Database Initialization Script for KPS CRM
 * Run this to set up the SQLite database with sample data
 */

import CRMDatabase from '../src/utils/database.js';

console.log('🚀 Initializing KPS CRM Database...');

try {
  // Database should auto-initialize with schema
  console.log('✅ Database schema created');

  // Add some sample data for testing
  console.log('📝 Adding sample data...');

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
    const createdLead = CRMDatabase.createLead(lead);
    console.log(`  ✓ Lead ${index + 1}: ${createdLead.name} (ID: ${createdLead.id})`);
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
    const createdClient = CRMDatabase.createClient(client);
    console.log(`  ✓ Client ${index + 1}: ${createdClient.name} (ID: ${createdClient.id})`);
  });

  // Sample deals
  const sampleDeals = [
    {
      client_id: 1,
      title: 'QuickBooks Enterprise Setup',
      description: 'Complete setup and migration to QuickBooks Enterprise',
      amount: 8500,
      status: 'proposal' as const,
      probability: 80,
      expected_close_date: '2024-02-15'
    },
    {
      client_id: 2,
      title: 'Annual Tax Preparation',
      description: 'Complete business tax preparation and filing',
      amount: 3200,
      status: 'negotiation' as const,
      probability: 90,
      expected_close_date: '2024-03-01'
    }
  ];

  sampleDeals.forEach((deal, index) => {
    const createdDeal = CRMDatabase.createDeal(deal);
    console.log(`  ✓ Deal ${index + 1}: ${createdDeal.title} (ID: ${createdDeal.id})`);
  });

  // Get analytics to verify everything works
  const analytics = CRMDatabase.getAnalytics();
  console.log('\n📊 Database Summary:');
  console.log(`  • Total Leads: ${analytics.kpis.totalLeads}`);
  console.log(`  • Total Clients: ${analytics.kpis.totalClients}`);
  console.log(`  • Pipeline Value: $${analytics.kpis.pipelineValue.toLocaleString()}`);
  console.log(`  • Conversion Rate: ${analytics.kpis.conversionRate}%`);

  console.log('\n✅ Database initialization complete!');
  console.log('🎯 You can now start the CRM and see real data in the dashboard.');
  
} catch (error) {
  console.error('❌ Database initialization failed:', error);
  process.exit(1);
} finally {
  // Close database connection
  CRMDatabase.close();
}
