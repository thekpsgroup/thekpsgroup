import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { STATES, MAJOR_CITIES } from '../src/data/cities';

// Template for state pages
const statePageTemplate = (state: any, cities: any[]) => `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import AdvancedSEOHead from '../../components/SEO/AdvancedSEOHead.astro';
import { BUSINESS } from '../../data/constants';

const title = "Business Services ${state.name} | QuickBooks Consulting & Payroll | The KPS Group";
const description = "Professional business consulting services across ${state.name}. QuickBooks setup, payroll management, HR solutions, and technology consulting. Serving ${cities.slice(0, 3).map(c => c.name).join(', ')} and beyond.";

const ${state.name.toLowerCase().replace(/\s+/g, '')}Cities = [
${cities.map(city => `  { name: '${city.name}', path: '/locations/${state.code.toLowerCase()}/${city.name.toLowerCase().replace(/\s+/g, '-')}', description: '${city.industries.slice(0, 2).join(' and ')} hub' }`).join(',\n')}
];

const ${state.name.toLowerCase().replace(/\s+/g, '')}Industries = [
${cities.flatMap(city => city.industries).filter((industry, index, arr) => arr.indexOf(industry) === index).slice(0, 10).map(industry => `  '${industry}'`).join(',\n')}
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Business Consulting Services ${state.name}",
  "description": "Professional QuickBooks consulting, payroll services, and business solutions across ${state.name}",
  "provider": {
    "@type": "Organization",
    "name": "The KPS Group",
    "url": "https://thekpsgroup.com",
    "telephone": "(469) 534-3392",
    "email": "info@thekpsgroup.com"
  },
  "areaServed": {
    "@type": "State",
    "name": "${state.name}",
    "sameAs": "https://en.wikipedia.org/wiki/${state.name.replace(/\s+/g, '_')}"
  },
  "serviceType": [
    "QuickBooks Consulting",
    "Payroll Services", 
    "HR Solutions",
    "Technology Consulting",
    "Business Process Automation"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "${state.name} Business Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "QuickBooks Consulting ${state.name}",
          "description": "Expert QuickBooks setup, training, and ongoing support for ${state.name} businesses"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "Payroll Services ${state.name}",
          "description": "Complete payroll processing and compliance for ${state.name} companies"
        }
      }
    ]
  }
};
---

<BaseLayout>
  <AdvancedSEOHead 
    title={title}
    description={description}
    keywords="business services ${state.name.toLowerCase()}, quickbooks consulting ${state.name.toLowerCase()}, payroll services ${state.name.toLowerCase()}, hr solutions ${state.name.toLowerCase()}, technology consulting ${state.name.toLowerCase()}, business consulting ${cities.slice(0, 4).map(c => c.name.toLowerCase()).join(' ')}"
    structuredData={structuredData}
    canonical="https://thekpsgroup.com/locations/${state.name.toLowerCase().replace(/\s+/g, '-')}"
  />

  <main class="pt-24">
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center">
          <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Business Services Across <span class="text-yellow-400">${state.name}</span>
          </h1>
          
          <p class="text-xl md:text-2xl mb-8 text-blue-100 max-w-4xl mx-auto">
            Expert QuickBooks consulting, payroll management, and comprehensive business solutions 
            for ${state.name} companies across all major metropolitan areas
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" class="btn-primary bg-yellow-500 hover:bg-yellow-600 text-blue-900">
              Get ${state.name} Consultation
            </a>
            <a href="/services" class="btn-secondary border-white text-white hover:bg-white hover:text-blue-900">
              View Services
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Key Statistics -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid md:grid-cols-4 gap-8 text-center">
          <div class="bg-white rounded-lg p-6 shadow-lg">
            <div class="text-3xl font-bold text-blue-600 mb-2">${cities.length}+</div>
            <div class="text-gray-600">Major Cities Served</div>
          </div>
          <div class="bg-white rounded-lg p-6 shadow-lg">
            <div class="text-3xl font-bold text-green-600 mb-2">${cities.reduce((sum, city) => sum + city.population, 0).toLocaleString()}+</div>
            <div class="text-gray-600">Population Reached</div>
          </div>
          <div class="bg-white rounded-lg p-6 shadow-lg">
            <div class="text-3xl font-bold text-purple-600 mb-2">${cities.flatMap(city => city.industries).filter((industry, index, arr) => arr.indexOf(industry) === index).length}+</div>
            <div class="text-gray-600">Industries Served</div>
          </div>
          <div class="bg-white rounded-lg p-6 shadow-lg">
            <div class="text-3xl font-bold text-orange-600 mb-2">100%</div>
            <div class="text-gray-600">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Major Cities -->
    <section class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4">Major ${state.name} Cities We Serve</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Local expertise combined with enterprise-level solutions across ${state.name}'s 
            most dynamic business markets
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {${state.name.toLowerCase().replace(/\s+/g, '')}Cities.map(city => (
            <a href={city.path} class="group bg-gray-50 hover:bg-blue-50 rounded-lg p-6 transition-all duration-300 hover:shadow-lg border hover:border-blue-200">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center transition-colors">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0h2M7 8h10M7 12h4m1 8l-1-1v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2l-1 1"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {city.name}
                  </h3>
                  <p class="text-sm text-gray-600">{city.description}</p>
                </div>
              </div>
              
              <div class="text-sm text-gray-500 flex items-center justify-between">
                <span>Business Hub</span>
                <svg class="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>

    <!-- Industries We Serve -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4">${state.name} Industries We Serve</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Specialized business solutions tailored to ${state.name}'s diverse economic landscape
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {${state.name.toLowerCase().replace(/\s+/g, '')}Industries.map(industry => (
            <div class="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow">
              <div class="text-sm font-medium text-gray-900">{industry}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <!-- Services Overview -->
    <section class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4">Our ${state.name} Business Services</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive business solutions designed to help ${state.name} companies thrive
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-blue-50 rounded-lg p-6">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3">QuickBooks Consulting</h3>
            <p class="text-gray-600">Expert setup, training, and ongoing support for QuickBooks across ${state.name}.</p>
          </div>
          
          <div class="bg-green-50 rounded-lg p-6">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3">Payroll Services</h3>
            <p class="text-gray-600">Complete payroll processing and compliance management for ${state.name} businesses.</p>
          </div>
          
          <div class="bg-purple-50 rounded-lg p-6">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3">HR Solutions</h3>
            <p class="text-gray-600">Comprehensive human resources support and compliance for ${state.name} companies.</p>
          </div>
          
          <div class="bg-yellow-50 rounded-lg p-6">
            <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3">Technology Consulting</h3>
            <p class="text-gray-600">Strategic technology guidance and implementation for ${state.name} businesses.</p>
          </div>
          
          <div class="bg-red-50 rounded-lg p-6">
            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3">Process Automation</h3>
            <p class="text-gray-600">Streamline operations and boost efficiency for ${state.name} organizations.</p>
          </div>
          
          <div class="bg-indigo-50 rounded-lg p-6">
            <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-3">Compliance Support</h3>
            <p class="text-gray-600">Ensure regulatory compliance and risk management for ${state.name} enterprises.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-blue-900 text-white">
      <div class="max-w-6xl mx-auto px-6 text-center">
        <h2 class="text-4xl font-bold mb-4">Ready to Transform Your ${state.name} Business?</h2>
        <p class="text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
          Get expert business consulting services tailored to your ${state.name} company's unique needs. 
          Contact us today for a free consultation.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/contact" class="btn-primary bg-yellow-500 hover:bg-yellow-600 text-blue-900">
            Get Free Consultation
          </a>
          <a href="tel:(469) 534-3392" class="btn-secondary border-white text-white hover:bg-white hover:text-blue-900">
            Call (469) 534-3392
          </a>
        </div>
      </div>
    </section>
  </main>
</BaseLayout>
`;

// Generate all state pages
console.log('Generating state pages...');

for (const state of STATES) {
  const cities = MAJOR_CITIES.filter(city => city.stateCode === state.code);
  
  if (cities.length === 0) {
    console.log(`No cities found for ${state.name}, skipping...`);
    continue;
  }
  
  const stateDir = join(process.cwd(), 'src', 'pages', 'locations');
  if (!existsSync(stateDir)) {
    mkdirSync(stateDir, { recursive: true });
  }
  
  const filename = `${state.name.toLowerCase().replace(/\s+/g, '-')}.astro`;
  const filepath = join(stateDir, filename);
  
  const content = statePageTemplate(state, cities);
  
  try {
    writeFileSync(filepath, content, 'utf-8');
    console.log(`✅ Created ${filename} with ${cities.length} cities`);
  } catch (error) {
    console.error(`❌ Failed to create ${filename}:`, error);
  }
}

console.log('State page generation complete!');
