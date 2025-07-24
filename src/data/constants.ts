export const BUSINESS = {
  name:       'The KPS Group LLC',
  brand:      'The KPS Group',
  phone:      '469-534-3392',
  email:      'sales@thekpsgroup.com',
  street:     '5900 Balcones Drive, Suite 15292',
  cityState:  'Austin, TX 78731',
  hours:      '8 AM – 8 PM CST',
  legalAddr:  '5900 Balcones Drive, Suite 15292, Austin, TX 78731',
  blurb:      'The KPS Group is a professional holding company that empowers small businesses through The Modern Suite - six specialized companies providing integrated solutions for operations, technology, finance, and growth.',
  mission:    'We exist to empower small business owners with enterprise-level capabilities through The Modern Suite. Our integrated approach ensures every aspect of your business works together seamlessly for maximum efficiency and profitability.',
  philosophy: 'Small businesses deserve the same sophisticated tools and support as large enterprises. Through The Modern Suite, we make enterprise-level solutions accessible, affordable, and effective for growing businesses.',
  founder:    'Karson Lawrence, Founder & CEO',
  tagline:    'Empowering small business success through The Modern Suite of integrated solutions.',
  foundingYear: '2020',
  employees:  '10-50',
  latitude:   30.3916,
  longitude:  -97.7416
};
// Core service categories for SEO targeting
export const SERVICES = {
  quickbooks: {
    name: 'QuickBooks Consulting',
    slug: 'quickbooks-consulting',
    keywords: ['QuickBooks consulting', 'QuickBooks cleanup', 'QuickBooks migration', 'job costing', 'multi-entity consolidation'],
    description: 'Expert QuickBooks consulting, cleanup, migration, and optimization services nationwide'
  },
  payroll: {
    name: 'PEO Payroll Services', 
    slug: 'peo-payroll',
    keywords: ['PEO services', 'payroll processing', 'HR compliance', 'employee benefits', 'workers compensation'],
    description: 'Complete PEO services including payroll, HR compliance, and benefits administration'
  },
  branding: {
    name: 'Website Design & Branding',
    slug: 'branding', 
    keywords: ['website design', 'logo design', 'branding', 'contractor websites', 'professional websites'],
    description: 'Professional website design, branding, and digital marketing for service businesses'
  },
  consulting: {
    name: 'Business Consulting',
    slug: 'operations-consulting',
    keywords: ['business consulting', 'operations consulting', 'SOP development', 'process optimization', 'business automation'],
    description: 'Strategic business consulting and operational optimization'
  }
};

// Target industries for specialized SEO
export const INDUSTRIES = {
  hvac: {
    name: 'HVAC Contractors',
    slug: 'hvac-contractors',
    keywords: ['HVAC QuickBooks', 'HVAC payroll', 'HVAC websites', 'HVAC business consulting'],
    clientCount: '500+'
  },
  plumbing: {
    name: 'Plumbing Companies',
    slug: 'plumbing-companies', 
    keywords: ['plumbing QuickBooks', 'plumbing payroll', 'plumbing websites', 'plumbing business consulting'],
    clientCount: '300+'
  },
  electrical: {
    name: 'Electrical Contractors',
    slug: 'electrical-contractors',
    keywords: ['electrical QuickBooks', 'electrical payroll', 'electrical websites', 'electrical business consulting'], 
    clientCount: '250+'
  },
  construction: {
    name: 'General Contractors',
    slug: 'general-contractors',
    keywords: ['construction QuickBooks', 'construction payroll', 'contractor websites', 'construction business consulting'],
    clientCount: '400+'
  }
};

// Texas cities for local SEO domination
export const CITIES = [
  'Allen', 'Arlington', 'Bedford', 'Carrollton', 'Cedar Hill', 'Dallas',
  'Denton', 'Euless', 'Flower Mound', 'Fort Worth', 'Frisco', 'Garland',
  'Grand Prairie', 'Grapevine', 'Irving', 'Lancaster', 'Lewisville', 'Mansfield',
  'McKinney', 'Mesquite', 'Plano', 'Richardson', 'Royse City', 'Southlake'
];

// Major Texas metropolitan areas
export const MAJOR_CITIES = [
  {
    name: 'Austin',
    slug: 'austin',
    priority: 1.0,
    description: 'Our headquarters city - serving Austin businesses with on-site and remote support'
  },
  {
    name: 'Dallas', 
    slug: 'dallas',
    priority: 0.9,
    description: 'Comprehensive business services for Dallas metroplex companies'
  },
  {
    name: 'Houston',
    slug: 'houston', 
    priority: 0.9,
    description: 'Houston business infrastructure services and QuickBooks consulting'
  },
  {
    name: 'San Antonio',
    slug: 'san-antonio',
    priority: 0.8,
    description: 'San Antonio business consulting and operational support services'
  },
  {
    name: 'Fort Worth',
    slug: 'fort-worth',
    priority: 0.8, 
    description: 'Fort Worth business services and contractor support'
  }
];

export const COUNTIES = [
  'Collin', 'Dallas', 'Denton', 'Ellis', 'Erath', 'Hood', 'Johnson',
  'Kaufman', 'Parker', 'Rockwall', 'Somervell', 'Tarrant', 'Wise'
];

export const ZIP_CODES = [
  75002, 75006, 75009, 75013, 75019, 75022, 75023, 75024, 75025, 75028, 75032,
  75033, 75034, 75035, 75038, 75039, 75041, 75042, 75043, 75044, 75050, 75051,
  75052, 75061, 75065, 75067, 75068, 75069, 75070, 75071, 75074, 75075, 75077,
  75078, 75080, 75081, 75082, 75086, 75087, 75088, 75089, 75093, 75098, 75114,
  75115, 75116, 75118, 75126, 75132, 75134, 75135, 75137, 75141, 75142, 75143,
  75146, 75147, 75149, 75150, 75156, 75157, 75158, 75159, 75161, 75166, 75172,
  75173, 75182, 75201, 75202, 75203, 75204, 75205, 75206, 75207, 75208, 75209,
  75210, 75211, 75212, 75214, 75215, 75216, 75217, 75218, 75219, 75220, 75223,
  75224, 75225, 75226, 75227, 75228, 75229, 75230, 75231, 75232, 75233, 75234,
  75235, 75236, 75237, 75238, 75240, 75241, 75243, 75244, 75246, 75247, 75248,
  75249, 75251, 75252, 75253, 75254, 75287, 75401, 75402, 75403, 75404, 75407,
  75409, 75422, 75423, 75424, 75428, 75429, 75433, 75442, 75449, 75452, 75453,
  75454, 75458, 75469, 75474, 75485, 75496, 76001, 76002, 76006, 76010, 76011,
  76012, 76013, 76014, 76015, 76016, 76017, 76018, 76020, 76021, 76022, 76028,
  76034, 76036, 76039, 76040, 76048, 76051, 76052, 76053, 76054, 76058, 76060,
  76063, 76065, 76092, 76093, 76102, 76103, 76104, 76105, 76106, 76107, 76108,
  76109, 76110, 76111, 76112, 76114, 76115, 76116, 76117, 76118, 76119, 76120,
  76123, 76126, 76127, 76129, 76131, 76132, 76133, 76134, 76135, 76137, 76140,
  76148, 76155, 76164, 76177, 76179, 76180, 76182, 76201, 76202, 76205, 76207,
  76208, 76209, 76210, 76226, 76227, 76247, 76249, 76258, 76259, 76262, 76266
];

// Competitive keywords to dominate (Beat Birmingham KPS Group)
export const COMPETITIVE_KEYWORDS = [
  'The KPS Group LLC',
  'The KPS Group Austin Texas', 
  'The KPS Group business infrastructure',
  'KPS Group back office solutions',
  'KPS Group QuickBooks experts',
  'KPS Group payroll services',
  'Karson Lawrence KPS Group',
  'Modern business infrastructure KPS'
];

// High-value search terms for nationwide targeting
export const TARGET_KEYWORDS = [
  'QuickBooks consulting nationwide',
  'PEO services small business',
  'business consulting Austin',
  'payroll services contractors',
  'website design HVAC companies',
  'branding for contractors',
  'QuickBooks cleanup services',
  'business operations consulting',
  'contractor back office solutions',
  'Modern Pay payroll services'
];

export const STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware',
  'Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky',
  'Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi',
  'Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico',
  'New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania',
  'Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont',
  'Virginia','Washington','West Virginia','Wisconsin','Wyoming'
];

// Portfolio companies for service ecosystem
export const PORTFOLIO_COMPANIES = {
  modernLedger: {
    name: 'Modern Ledger',
    tagline: 'Financial Infrastructure',
    description: 'QuickBooks consulting, cleanup, and financial reporting for growing businesses.',
    url: '/services/quickbooks-consulting',
    color: 'emerald',
    icon: 'calculator',
    services: ['QuickBooks Cleanup', 'Job Costing', 'Financial Reporting', 'Multi-Entity Setup']
  },
  modernPay: {
    name: 'Modern Pay',
    tagline: 'Workforce Solutions',
    description: 'Complete PEO services including payroll, benefits, and HR compliance.',
    url: '/services/peo-payroll',
    color: 'blue',
    icon: 'users',
    services: ['Payroll Processing', 'Benefits Administration', 'HR Compliance', 'Workers Comp']
  },
  modernBrands: {
    name: 'Modern Brands',
    tagline: 'Digital Presence',
    description: 'Professional websites, branding, and digital marketing for service businesses.',
    url: '/services/branding',
    color: 'purple',
    icon: 'palette',
    services: ['Website Design', 'Logo Design', 'Brand Strategy', 'Digital Marketing']
  },
  modernConsulting: {
    name: 'Modern Consulting',
    tagline: 'Operations Excellence',
    description: 'Strategic business consulting and operational optimization.',
    url: '/services/consulting',
    color: 'orange',
    icon: 'chart',
    services: ['SOP Development', 'Process Optimization', 'Business Strategy', 'Growth Planning']
  },
  modernTech: {
    name: 'Modern Tech',
    tagline: 'IT Infrastructure',
    description: 'Technology solutions and IT support for small businesses.',
    url: '/services/it-support',
    color: 'cyan',
    icon: 'monitor',
    services: ['IT Support', 'Software Integration', 'System Setup', 'Tech Consulting']
  },
  modernBooks: {
    name: 'Modern Books',
    tagline: 'Bookkeeping Services',
    description: 'Professional bookkeeping and accounting services.',
    url: '/services/bookkeeping',
    color: 'green',
    icon: 'book',
    services: ['Monthly Bookkeeping', 'Tax Preparation', 'Account Reconciliation', 'Financial Statements']
  }
};

// Client journey types for service ecosystem
export const CLIENT_JOURNEYS = {
  startup: {
    name: 'New Business',
    description: 'Just getting started',
    sequence: ['modernBrands', 'modernLedger', 'modernPay', 'modernConsulting']
  },
  growth: {
    name: 'Growing Company',
    description: 'Ready to scale',
    sequence: ['modernConsulting', 'modernTech', 'modernPay', 'modernLedger']
  },
  established: {
    name: 'Established Business',
    description: 'Optimizing operations',
    sequence: ['modernConsulting', 'modernLedger', 'modernTech', 'modernBooks']
  }
};
