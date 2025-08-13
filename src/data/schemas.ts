// Comprehensive structured data for The KPS Group
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "The KPS Group",
  "description": "Professional business consulting services including QuickBooks consulting, payroll services, HR solutions, and technology consulting for small and medium businesses.",
  "url": "https://thekpsgroup.com",
  "logo": "https://thekpsgroup.com/logos/the-kps-group.png",
  "image": "https://thekpsgroup.com/logos/the-kps-group.png",
  "telephone": "+1-469-458-6966",
  "email": "sales@thekpsgroup.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "",
    "addressLocality": "Austin",
    "addressRegion": "TX",
    "postalCode": "",
    "addressCountry": "US"
  },
  "foundingDate": "2020",
  "founder": {
    "@type": "Person",
    "name": "Karson Lawrence",
    "jobTitle": "Founder & CEO"
  },
  "employee": [
    {
      "@type": "Person",
      "name": "Karson Lawrence",
      "jobTitle": "Founder & CEO",
      "telephone": "+1-469-458-6966",
      "email": "karson@thekpsgroup.com"
    },
    {
      "@type": "Person",
      "name": "Brandon Gibson",
      "jobTitle": "Chief Revenue Officer",
      "telephone": "+1-469-458-6966",
      "email": "brandon@thekpsgroup.com"
    },
    {
      "@type": "Person",
      "name": "Allie Banks",
      "jobTitle": "Chief Administrative Officer",
      "telephone": "+1-469-458-6966",
      "email": "allie@thekpsgroup.com"
    }
  ],
  "areaServed": [
    {
      "@type": "Country",
      "name": "United States"
    },
    {
      "@type": "State",
      "name": "Texas"
    },
    {
      "@type": "City",
      "name": "Austin"
    }
  ],
  "serviceType": [
    "Business Consulting",
    "QuickBooks Consulting",
    "Payroll Services",
    "HR Services",
    "Technology Consulting",
    "Digital Transformation",
    "Business Operations Consulting"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Business Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "QuickBooks Consulting",
          "description": "Professional QuickBooks setup, cleanup, training, and ongoing support from certified ProAdvisors"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Payroll Services",
          "description": "Complete payroll processing, tax compliance, and HR support with direct deposit and benefits administration"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "HR Services",
          "description": "Comprehensive HR consulting including employee handbooks, compliance management, and performance systems"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Technology Consulting",
          "description": "Strategic technology consulting for digital transformation, cloud migration, and IT infrastructure modernization"
        }
      }
    ]
  },
  "sameAs": [
    "https://www.linkedin.com/company/thekpsgroup",
    "https://twitter.com/thekpsgroup",
    "https://facebook.com/thekpsgroup"
  ]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "The KPS Group",
  "description": "Professional business consulting services for small and medium businesses",
  "url": "https://thekpsgroup.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://thekpsgroup.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "The KPS Group",
    "url": "https://thekpsgroup.com"
  }
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "The KPS Group",
  "description": "Professional business consulting services including QuickBooks consulting, payroll management, HR solutions, and technology consulting",
  "url": "https://thekpsgroup.com",
  "telephone": "+1-469-458-6966",
  "email": "sales@thekpsgroup.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Austin",
    "addressRegion": "TX",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "30.2672",
    "longitude": "-97.7431"
  },
  "openingHours": [
    "Mo-Fr 08:00-18:00"
  ],
  "priceRange": "$$",
  "hasMap": "https://maps.google.com/?q=Austin,TX",
  "paymentAccepted": [
    "Cash",
    "Credit Card",
    "Check",
    "Invoice",
    "PayPal"
  ],
  "currenciesAccepted": "USD"
};

export const breadcrumbListSchema = (breadcrumbs: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": breadcrumb.name,
    "item": `https://thekpsgroup.com${breadcrumb.url}`
  }))
});

export const faqPageSchema = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

export const serviceSchema = (service: {
  name: string,
  description: string,
  provider: string,
  areaServed: string[],
  serviceType: string,
  priceRange: string
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": service.name,
  "description": service.description,
  "provider": {
    "@type": "Organization",
    "name": service.provider,
    "url": "https://thekpsgroup.com"
  },
  "areaServed": service.areaServed.map(area => ({
    "@type": "Place",
    "name": area
  })),
  "serviceType": service.serviceType,
  "offers": {
    "@type": "Offer",
    "priceRange": service.priceRange,
    "priceCurrency": "USD"
  }
});

export const businessSchema = (business: {
  name: string,
  description: string,
  url: string,
  telephone: string,
  email: string,
  address: {
    streetAddress: string,
    addressLocality: string,
    addressRegion: string,
    postalCode: string,
    addressCountry: string
  },
  services: string[],
  priceRange: string,
  openingHours: string[]
}) => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": business.name,
  "description": business.description,
  "url": business.url,
  "telephone": business.telephone,
  "email": business.email,
  "address": {
    "@type": "PostalAddress",
    ...business.address
  },
  "serviceType": business.services,
  "priceRange": business.priceRange,
  "openingHours": business.openingHours,
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Professional Services",
    "itemListElement": business.services.map(service => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": service,
        "provider": {
          "@type": "Organization",
          "name": business.name
        }
      }
    }))
  }
});
