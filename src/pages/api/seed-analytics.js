// API endpoint to seed analytics data with sample data
// This would be removed in production and replaced with real data

export const POST = async () => {
  try {
    // Sample leads data
    const sampleLeads = [
      {
        type: 'lead',
        name: 'Sarah Johnson',
        email: 'sarah@techstartup.com',
        phone: '512-555-0123',
        service: 'QuickBooks Consulting',
        timeline: 'Next 30 days',
        budget: '$5,000 - $15,000',
        source: 'contact_form',
        status: 'new',
        city: 'Austin',
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        type: 'lead',
        name: 'Mike Chen',
        email: 'mike@restaurantchain.com',
        phone: '214-555-0456',
        service: 'Payroll Services',
        timeline: 'Next 60 days',
        budget: '$15,000 - $50,000',
        source: 'google_ads',
        status: 'converted',
        city: 'Dallas',
        timestamp: new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        type: 'lead',
        name: 'Jennifer Martinez',
        email: 'jen@lawfirm.com',
        phone: '713-555-0789',
        service: 'The Modern Suite',
        timeline: 'Next 90 days',
        budget: '$50,000+',
        source: 'referral',
        status: 'qualified',
        city: 'Houston',
        timestamp: new Date(Date.now() - Math.random() * 21 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        type: 'lead',
        name: 'David Wilson',
        email: 'david@constructionfirm.com',
        phone: '210-555-0321',
        service: 'HR Services',
        timeline: 'Next 30 days',
        budget: '$5,000 - $15,000',
        source: 'organic_search',
        status: 'new',
        city: 'San Antonio',
        timestamp: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        type: 'lead',
        name: 'Lisa Thompson',
        email: 'lisa@healthcareclinic.com',
        phone: '817-555-0654',
        service: 'Technology Consulting',
        timeline: 'Next 60 days',
        budget: '$15,000 - $50,000',
        source: 'social_media',
        status: 'converted',
        city: 'Fort Worth',
        timestamp: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    // Sample page views
    const samplePageViews = [
      {
        type: 'pageview',
        page: '/',
        referrer: 'https://google.com',
        city: 'Austin',
        timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        type: 'pageview',
        page: '/contact',
        referrer: 'https://google.com',
        city: 'Dallas',
        timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        type: 'pageview',
        page: '/services',
        referrer: 'https://google.com',
        city: 'Houston',
        timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    // Sample interactions
    const sampleInteractions = [
      {
        type: 'interaction',
        action: 'click',
        element: 'Contact Sales',
        page: '/',
        timestamp: new Date(Date.now() - Math.random() * 12 * 60 * 60 * 1000).toISOString()
      },
      {
        type: 'interaction',
        action: 'contact_click',
        element: 'mailto:sales@thekpsgroup.com',
        page: '/contact',
        timestamp: new Date(Date.now() - Math.random() * 6 * 60 * 60 * 1000).toISOString()
      }
    ];

    // Send all sample data to analytics API
    const allSampleData = [...sampleLeads, ...samplePageViews, ...sampleInteractions];
    
    for (const data of allSampleData) {
      await fetch(new URL('/api/analytics', 'http://localhost:4321'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Seeded ${allSampleData.length} sample analytics records`
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Failed to seed analytics data' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
