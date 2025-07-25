// Comprehensive city database for local SEO targeting
export interface CityData {
  name: string;
  state: string;
  stateCode: string;
  county: string;
  population: number;
  latitude: number;
  longitude: number;
  zipCodes: string[];
  metro?: string;
  region: string;
  timezone: string;
  industries: string[];
  keywords: string[];
  competitorCount: number;
  opportunity: 'high' | 'medium' | 'low';
}

export const MAJOR_CITIES: CityData[] = [
  // TEXAS - PRIMARY MARKET
  {
    name: 'Austin',
    state: 'Texas',
    stateCode: 'TX',
    county: 'Travis',
    population: 978908,
    latitude: 30.2672,
    longitude: -97.7431,
    zipCodes: ['78701', '78702', '78703', '78704', '78705', '78712', '78717', '78731', '78741', '78745', '78746', '78748', '78749', '78750', '78751', '78752', '78753', '78754', '78756', '78757', '78758', '78759'],
    metro: 'Austin-Round Rock-Georgetown',
    region: 'Central Texas',
    timezone: 'America/Chicago',
    industries: ['Technology', 'Music', 'Healthcare', 'Education', 'Government', 'Real Estate', 'Hospitality'],
    keywords: ['Austin business services', 'Austin QuickBooks', 'Austin payroll', 'Austin technology consulting', 'Central Texas business'],
    competitorCount: 15,
    opportunity: 'high'
  },
  {
    name: 'Dallas',
    state: 'Texas',
    stateCode: 'TX',
    county: 'Dallas',
    population: 1304379,
    latitude: 32.7767,
    longitude: -96.7970,
    zipCodes: ['75201', '75202', '75203', '75204', '75205', '75206', '75207', '75208', '75209', '75210', '75211', '75212', '75214', '75215', '75216', '75217', '75218', '75219', '75220', '75221', '75222', '75223', '75224', '75225', '75226', '75227', '75228', '75229', '75230', '75231', '75232', '75233', '75234', '75235', '75236', '75237', '75238', '75240', '75241', '75242', '75243', '75244', '75246', '75247', '75248', '75249', '75250', '75251', '75252', '75253', '75254', '75270', '75275', '75390'],
    metro: 'Dallas-Fort Worth-Arlington',
    region: 'North Texas',
    timezone: 'America/Chicago',
    industries: ['Finance', 'Technology', 'Energy', 'Transportation', 'Healthcare', 'Telecommunications', 'Manufacturing'],
    keywords: ['Dallas business consulting', 'Dallas QuickBooks consulting', 'DFW payroll services', 'Dallas technology consulting', 'North Texas business'],
    competitorCount: 25,
    opportunity: 'high'
  },
  {
    name: 'Houston',
    state: 'Texas',
    stateCode: 'TX',
    county: 'Harris',
    population: 2304580,
    latitude: 29.7604,
    longitude: -95.3698,
    zipCodes: ['77001', '77002', '77003', '77004', '77005', '77006', '77007', '77008', '77009', '77010', '77011', '77012', '77013', '77014', '77015', '77016', '77017', '77018', '77019', '77020', '77021', '77022', '77023', '77024', '77025', '77026', '77027', '77028', '77029', '77030', '77031', '77032', '77033', '77034', '77035', '77036', '77037', '77038', '77039', '77040', '77041', '77042', '77043', '77044', '77045', '77046', '77047', '77048', '77049', '77050', '77051', '77052', '77053', '77054', '77055', '77056', '77057', '77058', '77059', '77060', '77061', '77062', '77063', '77064', '77065', '77066', '77067', '77068', '77069', '77070', '77071', '77072', '77073', '77074', '77075', '77076', '77077', '77078', '77079', '77080', '77081', '77082', '77083', '77084', '77085', '77086', '77087', '77088', '77089', '77090', '77091', '77092', '77093', '77094', '77095', '77096', '77098', '77099'],
    metro: 'Houston-The Woodlands-Sugar Land',
    region: 'Southeast Texas',
    timezone: 'America/Chicago',
    industries: ['Energy', 'Petrochemicals', 'Aerospace', 'Healthcare', 'Technology', 'Manufacturing', 'Transportation'],
    keywords: ['Houston business services', 'Houston QuickBooks consulting', 'Houston payroll services', 'Houston HVAC consulting', 'Southeast Texas business'],
    competitorCount: 30,
    opportunity: 'high'
  },
  {
    name: 'San Antonio',
    state: 'Texas',
    stateCode: 'TX',
    county: 'Bexar',
    population: 1547253,
    latitude: 29.4241,
    longitude: -98.4936,
    zipCodes: ['78201', '78202', '78203', '78204', '78205', '78207', '78208', '78209', '78210', '78211', '78212', '78213', '78214', '78215', '78216', '78217', '78218', '78219', '78220', '78221', '78222', '78223', '78224', '78225', '78226', '78227', '78228', '78229', '78230', '78231', '78232', '78233', '78234', '78235', '78236', '78237', '78238', '78239', '78240', '78242', '78244', '78245', '78247', '78248', '78249', '78250', '78251', '78252', '78253', '78254', '78255', '78256', '78257', '78258', '78259', '78260', '78261', '78263', '78264', '78265', '78266', '78268', '78269', '78270', '78278', '78279', '78280', '78283', '78284', '78285', '78286', '78287', '78288', '78289', '78291', '78292', '78293', '78294', '78295', '78296', '78297', '78298', '78299'],
    metro: 'San Antonio-New Braunfels',
    region: 'South Texas',
    timezone: 'America/Chicago',
    industries: ['Military', 'Healthcare', 'Tourism', 'Manufacturing', 'Technology', 'Energy', 'Education'],
    keywords: ['San Antonio business consulting', 'San Antonio QuickBooks', 'South Texas payroll', 'San Antonio technology consulting'],
    competitorCount: 20,
    opportunity: 'high'
  },
  {
    name: 'Fort Worth',
    state: 'Texas',
    stateCode: 'TX',
    county: 'Tarrant',
    population: 918915,
    latitude: 32.7555,
    longitude: -97.3308,
    zipCodes: ['76101', '76102', '76103', '76104', '76105', '76106', '76107', '76108', '76109', '76110', '76111', '76112', '76114', '76115', '76116', '76117', '76118', '76119', '76120', '76121', '76122', '76123', '76124', '76126', '76127', '76129', '76130', '76131', '76132', '76133', '76134', '76135', '76136', '76137', '76140', '76147', '76148', '76150', '76155', '76161', '76162', '76163', '76164', '76166', '76177', '76179', '76180', '76181', '76182', '76185', '76191', '76192', '76193', '76196', '76197', '76198', '76199'],
    metro: 'Dallas-Fort Worth-Arlington',
    region: 'North Texas',
    timezone: 'America/Chicago',
    industries: ['Aerospace', 'Defense', 'Energy', 'Transportation', 'Healthcare', 'Manufacturing', 'Technology'],
    keywords: ['Fort Worth business consulting', 'Fort Worth QuickBooks', 'DFW payroll services', 'Tarrant County business'],
    competitorCount: 18,
    opportunity: 'high'
  },
  {
    name: 'El Paso',
    state: 'Texas',
    stateCode: 'TX',
    county: 'El Paso',
    population: 695044,
    latitude: 31.7619,
    longitude: -106.4850,
    zipCodes: ['79901', '79902', '79903', '79904', '79905', '79906', '79907', '79908', '79910', '79911', '79912', '79913', '79914', '79915', '79916', '79917', '79918', '79920', '79922', '79924', '79925', '79926', '79927', '79928', '79929', '79930', '79932', '79934', '79935', '79936', '79937', '79938', '79968'],
    metro: 'El Paso',
    region: 'West Texas',
    timezone: 'America/Denver',
    industries: ['Manufacturing', 'International Trade', 'Military', 'Healthcare', 'Transportation', 'Retail'],
    keywords: ['El Paso business consulting', 'El Paso QuickBooks', 'West Texas business services', 'El Paso payroll'],
    competitorCount: 8,
    opportunity: 'medium'
  },
  {
    name: 'Plano',
    state: 'Texas',
    stateCode: 'TX',
    county: 'Collin',
    population: 285494,
    latitude: 32.1340,
    longitude: -96.6614,
    zipCodes: ['75023', '75024', '75025', '75026', '75074', '75075', '75086', '75093', '75094'],
    metro: 'Dallas-Fort Worth-Arlington',
    region: 'North Texas',
    timezone: 'America/Chicago',
    industries: ['Technology', 'Telecommunications', 'Financial Services', 'Healthcare', 'Corporate Headquarters'],
    keywords: ['Plano business consulting', 'Plano QuickBooks', 'Collin County business', 'Plano technology consulting'],
    competitorCount: 12,
    opportunity: 'high'
  },
  {
    name: 'Arlington',
    state: 'Texas',
    stateCode: 'TX',
    county: 'Tarrant',
    population: 394266,
    latitude: 32.7357,
    longitude: -97.1081,
    zipCodes: ['76001', '76002', '76003', '76004', '76005', '76006', '76010', '76011', '76012', '76013', '76014', '76015', '76016', '76017', '76018', '76019'],
    metro: 'Dallas-Fort Worth-Arlington',
    region: 'North Texas',
    timezone: 'America/Chicago',
    industries: ['Entertainment', 'Sports', 'Manufacturing', 'Aerospace', 'Automotive', 'Healthcare'],
    keywords: ['Arlington business consulting', 'Arlington QuickBooks', 'Arlington payroll services', 'Tarrant County business'],
    competitorCount: 10,
    opportunity: 'medium'
  },

  // OKLAHOMA - SECONDARY MARKET
  {
    name: 'Oklahoma City',
    state: 'Oklahoma',
    stateCode: 'OK',
    county: 'Oklahoma',
    population: 695077,
    latitude: 35.4676,
    longitude: -97.5164,
    zipCodes: ['73101', '73102', '73103', '73104', '73105', '73106', '73107', '73108', '73109', '73110', '73111', '73112', '73113', '73114', '73115', '73116', '73117', '73118', '73119', '73120', '73121', '73122', '73127', '73128', '73129', '73130', '73131', '73132', '73134', '73135', '73139', '73141', '73142', '73149', '73159', '73160', '73162', '73165', '73169', '73170', '73173', '73179', '73184'],
    metro: 'Oklahoma City',
    region: 'Central Oklahoma',
    timezone: 'America/Chicago',
    industries: ['Energy', 'Agriculture', 'Government', 'Healthcare', 'Aerospace', 'Biotechnology'],
    keywords: ['Oklahoma City business consulting', 'OKC QuickBooks', 'Oklahoma business services', 'Central Oklahoma payroll'],
    competitorCount: 12,
    opportunity: 'medium'
  },
  {
    name: 'Tulsa',
    state: 'Oklahoma',
    stateCode: 'OK',
    county: 'Tulsa',
    population: 413066,
    latitude: 35.3949,
    longitude: -95.9928,
    zipCodes: ['74101', '74102', '74103', '74104', '74105', '74106', '74107', '74108', '74110', '74112', '74114', '74115', '74116', '74117', '74119', '74120', '74121', '74126', '74127', '74128', '74129', '74130', '74131', '74132', '74133', '74134', '74135', '74136', '74137', '74145', '74146', '74169', '74170', '74171', '74172', '74182', '74184', '74186', '74187', '74192', '74193'],
    metro: 'Tulsa',
    region: 'Northeast Oklahoma',
    timezone: 'America/Chicago',
    industries: ['Energy', 'Aerospace', 'Technology', 'Healthcare', 'Manufacturing', 'Transportation'],
    keywords: ['Tulsa business consulting', 'Tulsa QuickBooks', 'Northeast Oklahoma business', 'Tulsa payroll services'],
    competitorCount: 8,
    opportunity: 'medium'
  },

  // MAJOR NATIONAL MARKETS
  {
    name: 'Los Angeles',
    state: 'California',
    stateCode: 'CA',
    county: 'Los Angeles',
    population: 3898747,
    latitude: 34.0522,
    longitude: -118.2437,
    zipCodes: ['90001', '90002', '90003', '90004', '90005', '90006', '90007', '90008', '90009', '90010', '90011', '90012', '90013', '90014', '90015', '90016', '90017', '90018', '90019', '90020', '90021', '90024', '90025', '90026', '90027', '90028', '90029', '90031', '90032', '90033', '90034', '90035', '90036', '90037', '90038', '90039', '90041', '90042', '90043', '90044', '90045', '90046', '90047', '90048', '90049', '90056', '90057', '90058', '90059', '90061', '90062', '90063', '90064', '90065', '90066', '90067', '90068', '90069', '90071', '90077', '90089', '90210', '90211', '90212'],
    metro: 'Los Angeles-Long Beach-Anaheim',
    region: 'Southern California',
    timezone: 'America/Los_Angeles',
    industries: ['Entertainment', 'Technology', 'Aerospace', 'Fashion', 'Tourism', 'International Trade'],
    keywords: ['Los Angeles business consulting', 'LA QuickBooks consulting', 'Southern California business', 'LA payroll services'],
    competitorCount: 50,
    opportunity: 'high'
  },
  {
    name: 'Chicago',
    state: 'Illinois',
    stateCode: 'IL',
    county: 'Cook',
    population: 2746388,
    latitude: 41.8781,
    longitude: -87.6298,
    zipCodes: ['60601', '60602', '60603', '60604', '60605', '60606', '60607', '60608', '60609', '60610', '60611', '60612', '60613', '60614', '60615', '60616', '60617', '60618', '60619', '60620', '60621', '60622', '60623', '60624', '60625', '60626', '60628', '60629', '60630', '60631', '60632', '60633', '60634', '60636', '60637', '60639', '60640', '60641', '60642', '60643', '60644', '60645', '60646', '60647', '60649', '60651', '60652', '60653', '60654', '60655', '60656', '60657', '60659', '60660', '60661', '60664', '60666', '60668', '60669', '60670', '60673', '60674', '60675', '60677', '60678', '60680', '60681', '60682', '60684', '60685', '60686', '60687', '60688', '60689', '60690', '60691', '60693', '60694', '60695', '60696', '60697', '60699'],
    metro: 'Chicago-Naperville-Elgin',
    region: 'Midwest',
    timezone: 'America/Chicago',
    industries: ['Finance', 'Technology', 'Manufacturing', 'Transportation', 'Healthcare', 'Professional Services'],
    keywords: ['Chicago business consulting', 'Chicago QuickBooks consulting', 'Midwest business services', 'Chicago payroll'],
    competitorCount: 40,
    opportunity: 'high'
  },
  {
    name: 'Phoenix',
    state: 'Arizona',
    stateCode: 'AZ',
    county: 'Maricopa',
    population: 1608139,
    latitude: 33.4484,
    longitude: -112.0740,
    zipCodes: ['85001', '85002', '85003', '85004', '85005', '85006', '85007', '85008', '85009', '85010', '85011', '85012', '85013', '85014', '85015', '85016', '85017', '85018', '85019', '85020', '85021', '85022', '85023', '85024', '85026', '85027', '85028', '85029', '85031', '85032', '85033', '85034', '85035', '85037', '85040', '85041', '85042', '85043', '85044', '85045', '85048', '85050', '85051', '85053', '85054', '85085'],
    metro: 'Phoenix-Mesa-Chandler',
    region: 'Southwest',
    timezone: 'America/Phoenix',
    industries: ['Technology', 'Healthcare', 'Aerospace', 'Tourism', 'Real Estate', 'Manufacturing'],
    keywords: ['Phoenix business consulting', 'Phoenix QuickBooks', 'Arizona business services', 'Southwest payroll'],
    competitorCount: 25,
    opportunity: 'high'
  },
  {
    name: 'Philadelphia',
    state: 'Pennsylvania',
    stateCode: 'PA',
    county: 'Philadelphia',
    population: 1603797,
    latitude: 39.9526,
    longitude: -75.1652,
    zipCodes: ['19101', '19102', '19103', '19104', '19105', '19106', '19107', '19108', '19109', '19110', '19111', '19112', '19113', '19114', '19115', '19116', '19118', '19119', '19120', '19121', '19122', '19123', '19124', '19125', '19126', '19127', '19128', '19129', '19130', '19131', '19132', '19133', '19134', '19135', '19136', '19137', '19138', '19139', '19140', '19141', '19142', '19143', '19144', '19145', '19146', '19147', '19148', '19149', '19150', '19151', '19152', '19153', '19154'],
    metro: 'Philadelphia-Camden-Wilmington',
    region: 'Northeast',
    timezone: 'America/New_York',
    industries: ['Healthcare', 'Education', 'Financial Services', 'Technology', 'Manufacturing', 'Tourism'],
    keywords: ['Philadelphia business consulting', 'Philly QuickBooks', 'Pennsylvania business services', 'Philadelphia payroll'],
    competitorCount: 35,
    opportunity: 'medium'
  },
  {
    name: 'San Diego',
    state: 'California',
    stateCode: 'CA',
    county: 'San Diego',
    population: 1386932,
    latitude: 32.7157,
    longitude: -117.1611,
    zipCodes: ['92101', '92102', '92103', '92104', '92105', '92106', '92107', '92108', '92109', '92110', '92111', '92112', '92113', '92114', '92115', '92116', '92117', '92119', '92120', '92121', '92122', '92123', '92124', '92126', '92127', '92128', '92129', '92130', '92131', '92132', '92134', '92135', '92136', '92139', '92140', '92154', '92158', '92161', '92162', '92163', '92165', '92166', '92167', '92168', '92169', '92170', '92171', '92172', '92173', '92174', '92175', '92176', '92177', '92179', '92182', '92186', '92187', '92191', '92192', '92193', '92194', '92195', '92196', '92197', '92198', '92199'],
    metro: 'San Diego-Chula Vista-Carlsbad',
    region: 'Southern California',
    timezone: 'America/Los_Angeles',
    industries: ['Biotechnology', 'Defense', 'Tourism', 'Technology', 'Healthcare', 'International Trade'],
    keywords: ['San Diego business consulting', 'San Diego QuickBooks', 'Southern California business', 'San Diego payroll'],
    competitorCount: 20,
    opportunity: 'medium'
  },
  {
    name: 'Denver',
    state: 'Colorado',
    stateCode: 'CO',
    county: 'Denver',
    population: 715522,
    latitude: 39.7392,
    longitude: -104.9903,
    zipCodes: ['80201', '80202', '80203', '80204', '80205', '80206', '80207', '80208', '80209', '80210', '80211', '80212', '80214', '80215', '80216', '80218', '80219', '80220', '80221', '80222', '80223', '80224', '80225', '80226', '80227', '80230', '80231', '80232', '80235', '80236', '80237', '80238', '80239', '80246', '80247', '80249', '80264', '80290', '80291', '80293', '80294', '80295', '80299'],
    metro: 'Denver-Aurora-Lakewood',
    region: 'Mountain West',
    timezone: 'America/Denver',
    industries: ['Technology', 'Aerospace', 'Energy', 'Healthcare', 'Financial Services', 'Tourism'],
    keywords: ['Denver business consulting', 'Denver QuickBooks', 'Colorado business services', 'Rocky Mountain business'],
    competitorCount: 18,
    opportunity: 'medium'
  },
  {
    name: 'Nashville',
    state: 'Tennessee',
    stateCode: 'TN',
    county: 'Davidson',
    population: 689447,
    latitude: 36.1627,
    longitude: -86.7816,
    zipCodes: ['37201', '37202', '37203', '37204', '37205', '37206', '37207', '37208', '37209', '37210', '37211', '37212', '37213', '37214', '37215', '37216', '37217', '37218', '37219', '37220', '37221', '37228', '37235', '37240', '37243', '37244', '37246', '37250'],
    metro: 'Nashville-Davidson-Murfreesboro-Franklin',
    region: 'Southeast',
    timezone: 'America/Chicago',
    industries: ['Music', 'Healthcare', 'Technology', 'Manufacturing', 'Tourism', 'Financial Services'],
    keywords: ['Nashville business consulting', 'Nashville QuickBooks', 'Tennessee business services', 'Music City business'],
    competitorCount: 15,
    opportunity: 'medium'
  },
  {
    name: 'Miami',
    state: 'Florida',
    stateCode: 'FL',
    county: 'Miami-Dade',
    population: 442241,
    latitude: 25.7617,
    longitude: -80.1918,
    zipCodes: ['33101', '33102', '33109', '33111', '33112', '33114', '33116', '33119', '33122', '33124', '33125', '33126', '33127', '33128', '33129', '33130', '33131', '33132', '33133', '33134', '33135', '33136', '33137', '33138', '33139', '33140', '33141', '33142', '33143', '33144', '33145', '33146', '33147', '33150', '33154', '33155', '33156', '33157', '33158', '33161', '33162', '33163', '33164', '33165', '33166', '33167', '33168', '33169', '33170', '33172', '33173', '33174', '33175', '33176', '33177', '33178', '33179', '33180', '33181', '33182', '33183', '33184', '33185', '33186', '33187', '33189', '33190', '33193', '33194', '33196', '33197', '33199'],
    metro: 'Miami-Fort Lauderdale-Pompano Beach',
    region: 'Southeast',
    timezone: 'America/New_York',
    industries: ['International Trade', 'Tourism', 'Finance', 'Real Estate', 'Technology', 'Healthcare'],
    keywords: ['Miami business consulting', 'Miami QuickBooks', 'South Florida business', 'International business Miami'],
    competitorCount: 30,
    opportunity: 'high'
  },
  {
    name: 'Seattle',
    state: 'Washington',
    stateCode: 'WA',
    county: 'King',
    population: 737015,
    latitude: 47.6062,
    longitude: -122.3321,
    zipCodes: ['98101', '98102', '98103', '98104', '98105', '98106', '98107', '98108', '98109', '98112', '98115', '98116', '98117', '98118', '98119', '98121', '98122', '98125', '98126', '98133', '98134', '98136', '98144', '98146', '98148', '98154', '98158', '98160', '98161', '98164', '98165', '98166', '98168', '98174', '98177', '98178', '98188', '98195', '98199'],
    metro: 'Seattle-Tacoma-Bellevue',
    region: 'Pacific Northwest',
    timezone: 'America/Los_Angeles',
    industries: ['Technology', 'Aerospace', 'Healthcare', 'Biotechnology', 'Maritime', 'Coffee'],
    keywords: ['Seattle business consulting', 'Seattle QuickBooks', 'Pacific Northwest business', 'Seattle technology consulting'],
    competitorCount: 25,
    opportunity: 'medium'
  }
];

export const STATES = [
  { name: 'Texas', code: 'TX', region: 'South', opportunities: 'high' },
  { name: 'Oklahoma', code: 'OK', region: 'South', opportunities: 'medium' },
  { name: 'California', code: 'CA', region: 'West', opportunities: 'high' },
  { name: 'Illinois', code: 'IL', region: 'Midwest', opportunities: 'high' },
  { name: 'Arizona', code: 'AZ', region: 'Southwest', opportunities: 'medium' },
  { name: 'Pennsylvania', code: 'PA', region: 'Northeast', opportunities: 'medium' },
  { name: 'Colorado', code: 'CO', region: 'Mountain West', opportunities: 'medium' },
  { name: 'Tennessee', code: 'TN', region: 'Southeast', opportunities: 'medium' },
  { name: 'Florida', code: 'FL', region: 'Southeast', opportunities: 'high' },
  { name: 'Washington', code: 'WA', region: 'Pacific Northwest', opportunities: 'medium' }
];

// Helper functions for location data
export function getCityByName(cityName: string, stateCode?: string): CityData | undefined {
  return MAJOR_CITIES.find(city => 
    city.name.toLowerCase() === cityName.toLowerCase() && 
    (!stateCode || city.stateCode === stateCode)
  );
}

export function getCitiesByState(stateCode: string): CityData[] {
  return MAJOR_CITIES.filter(city => city.stateCode === stateCode);
}

export function getCitiesByRegion(region: string): CityData[] {
  return MAJOR_CITIES.filter(city => city.region === region);
}

export function getCitiesByOpportunity(opportunity: 'high' | 'medium' | 'low'): CityData[] {
  return MAJOR_CITIES.filter(city => city.opportunity === opportunity);
}

export function formatCityUrl(city: CityData): string {
  return `/locations/${city.stateCode.toLowerCase()}/${city.name.toLowerCase().replace(/\s+/g, '-')}`;
}

export function generateCityKeywords(city: CityData): string[] {
  const baseKeywords = [
    `${city.name} business consulting`,
    `${city.name} QuickBooks consulting`,
    `${city.name} payroll services`,
    `${city.name} technology consulting`,
    `${city.name} business services`,
    `${city.name} bookkeeping services`,
    `${city.name} HR services`,
    `business consulting ${city.name} ${city.stateCode}`,
    `QuickBooks help ${city.name}`,
    `small business support ${city.name}`,
    `${city.metro} business consulting`,
    `${city.region} business services`
  ];
  
  // Add industry-specific keywords
  const industryKeywords = city.industries.flatMap(industry => [
    `${city.name} ${industry.toLowerCase()} consulting`,
    `${industry.toLowerCase()} business services ${city.name}`
  ]);

  return [...baseKeywords, ...industryKeywords, ...city.keywords];
}
