import type { APIRoute } from 'astro';
import { Database } from '../../../utils/database.ts';

const database = new Database();

export const GET: APIRoute = async ({ request, url }) => {
  try {
    // Get analytics data from the database using proper method
    const result = database.getDashboardAnalytics();
    
    if (!result.success) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    let analytics = result.data;

    // TODO: The overview is already populated by getDashboardAnalytics()
    // Adding additional mock data to prevent type errors for arrays

    analytics.leadSources = analytics.leadSources || [];

    analytics.cityPerformance = analytics.cityPerformance || [];

    analytics.servicePerformance = analytics.servicePerformance || [];

    // Temporary mock data until we implement proper database methods
    analytics.recentActivity = analytics.recentActivity || [];

    // Monthly trends (simplified - would need date range calculations)
    analytics.monthlyTrends = [
      { month: 'Jan', leads: 45, conversions: 12, revenue: 75000 },
      { month: 'Feb', leads: 52, conversions: 14, revenue: 89000 },
      { month: 'Mar', leads: 48, conversions: 13, revenue: 82000 },
      { month: 'Apr', leads: 61, conversions: 16, revenue: 105000 },
      { month: 'May', leads: 58, conversions: 15, revenue: 98000 },
      { month: 'Jun', leads: analytics.overview.totalLeads || 65, conversions: analytics.overview.totalConversions || 18, revenue: analytics.overview.totalRevenue || 115000 }
    ];

    analytics.conversionFunnel = analytics.conversionFunnel || [];

    return new Response(JSON.stringify({
      success: true,
      data: analytics
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error fetching analytics:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch analytics data',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
