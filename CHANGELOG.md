# Sprint 1 – Routes, CTAs, Copy, SEO basics

## Route Map
```
/               
/about          
/contact        
/services/      
/services/bookkeeping
/services/consulting
/services/hr-services
/services/it-support
/services/payroll-services
/services/peo-payroll
/services/quickbooks-consulting
/services/quickbooks-consulting-premium
/services/technology-consulting
/leadership
/team
/privacy-policy
/terms-of-service
/thank-you
/login
/user-management
/crm
/admin/dashboard
/robots.txt
/404
/:city            (dynamic city pages)
/locations/       
/locations/:location (state placeholder)
/locations/alabama
/locations/alaska
/locations/arizona
/locations/arizona/phoenix
/locations/arkansas
/locations/austin
/locations/california
/locations/california/los-angeles
/locations/florida
/locations/georgia
/locations/illinois
/locations/illinois/chicago
/locations/michigan
/locations/new-york
/locations/north-carolina
/locations/ohio
/locations/oklahoma
/locations/oklahoma/oklahoma-city
/locations/pennsylvania
/locations/texas
/locations/texas/austin
/locations/texas/dallas
/locations/texas/houston
```

## Files Touched
- public/robots.txt
- public/sw-fallback.js
- src/components/Footer.astro
- src/components/HeroOptimized.astro
- src/components/Performance/CoreWebVitals.astro
- src/pages/about.astro
- src/pages/contact.astro
- src/pages/index.astro
- src/pages/locations/texas/austin.astro
- src/pages/sitemap.xml.ts
- Removed legacy pages: about-new.astro, about-us.astro, bookkeeping-services.astro, contact-* variants, electrical-consulting.astro, hvac-consulting.astro, index-new.astro, services-old.astro, simple-lead-test.astro, technology-consulting.astro

## Unresolved Questions
- Confirm if remaining location pages cover all required markets.
- Determine need for CRM, login, and admin routes for public site.
- Verify if additional service landing pages are planned.

## Sprint 2 Checklist
- Audit color contrast and keyboard navigation site-wide.
- Add structured data for Organization and LocalBusiness to remaining pages.
- Review performance of large images and implement lazy loading where missing.
- Create content for any planned but empty location or service pages.
- Expand form validation and add unit tests.

## 2025-08-12 – Routes, CTAs, SEO Baseline
- Streamlined sitemap and robots directives to match live routes
- Rewrote home hero with plain-language benefits and unified CTA
- Consolidated contact into a single page with server-side email handler to sales@thekpsgroup.com and response-time note
- Updated homepage metadata + footer CTA for clearer guidance
- Documented route structure, redirects, and test steps

