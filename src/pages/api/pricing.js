// Pricing management API
export const GET = async ({ url }) => {
  try {
    // Get current pricing rules from analytics
    const analyticsResponse = await fetch('/api/analytics?type=pricing');
    const analyticsData = await analyticsResponse.json();
    
    return new Response(JSON.stringify({
      success: true,
      data: analyticsData.data
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Failed to retrieve pricing data' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST = async ({ request }) => {
  try {
    const { action, ...data } = await request.json();
    
    switch (action) {
      case 'update_service_pricing':
        return updateServicePricing(data);
      case 'calculate_quote':
        return calculateQuote(data);
      case 'create_pricing_rule':
        return createPricingRule(data);
      default:
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'Invalid action' 
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
    }
    
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Failed to process pricing request' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

async function updateServicePricing(data) {
  const { serviceId, pricing } = data;
  
  // Update pricing in analytics
  const response = await fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'update_pricing',
      serviceId: parseInt(serviceId),
      pricing
    })
  });
  
  const result = await response.json();
  
  return new Response(JSON.stringify({
    success: result.success,
    message: 'Pricing updated successfully',
    data: pricing
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

async function calculateQuote(data) {
  const { service, businessSize, additionalServices = [], customRequirements = '' } = data;
  
  // Get current pricing rules
  const pricingResponse = await fetch('/api/analytics?type=pricing');
  const pricingData = await pricingResponse.json();
  const pricingRules = pricingData.data;
  
  // Find the service pricing rule
  const serviceRule = pricingRules.find(rule => rule.service === service);
  
  if (!serviceRule) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Service not found'
    }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // Calculate base price
  const sizeFactor = serviceRule.factors[businessSize] || 1.0;
  let basePrice = serviceRule.basePrice * sizeFactor;
  
  // Add additional services
  let additionalCost = 0;
  const additionalServicePricing = {
    'setup_training': 150,
    'data_migration': 300,
    'custom_reports': 200,
    'priority_support': 100,
    'monthly_checkins': 75
  };
  
  additionalServices.forEach(service => {
    additionalCost += additionalServicePricing[service] || 0;
  });
  
  // Custom requirements adjustment
  let customAdjustment = 0;
  if (customRequirements.length > 100) {
    customAdjustment = Math.min(basePrice * 0.2, 500); // Max 20% or $500
  }
  
  const totalPrice = basePrice + additionalCost + customAdjustment;
  
  const quote = {
    id: Date.now(),
    service,
    businessSize,
    basePrice,
    sizeFactor,
    additionalServices: additionalServices.map(service => ({
      name: service,
      cost: additionalServicePricing[service] || 0
    })),
    additionalCost,
    customAdjustment,
    totalPrice,
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
    createdAt: new Date().toISOString()
  };
  
  return new Response(JSON.stringify({
    success: true,
    data: quote
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

async function createPricingRule(data) {
  const { service, basePrice, factors, active = true } = data;
  
  const newRule = {
    id: Date.now(),
    service,
    basePrice: parseFloat(basePrice),
    factors: factors || {
      'small': 1.0,
      'medium': 1.3,
      'large': 1.8,
      'enterprise': 2.5
    },
    active,
    createdAt: new Date().toISOString()
  };
  
  // This would normally be saved to database
  // For now, we'll return the rule
  
  return new Response(JSON.stringify({
    success: true,
    message: 'Pricing rule created successfully',
    data: newRule
  }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  });
}
