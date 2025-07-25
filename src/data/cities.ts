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
  },

  // ADDITIONAL NATIONAL MAJOR CITIES - ALL STATES COVERAGE

  // ALABAMA
  {
    name: 'Birmingham',
    state: 'Alabama',
    stateCode: 'AL',
    county: 'Jefferson',
    population: 200733,
    latitude: 33.5186,
    longitude: -86.8104,
    zipCodes: ['35201', '35202', '35203', '35204', '35205', '35206', '35207', '35208', '35209', '35210', '35211', '35212', '35213', '35214', '35215', '35216', '35217', '35218', '35219', '35220', '35221', '35222', '35223', '35224', '35226', '35228', '35229', '35233', '35234', '35235', '35236', '35237', '35238', '35242', '35243', '35244', '35246', '35249', '35253', '35254', '35255', '35259', '35260', '35266', '35282', '35283', '35285', '35290', '35291', '35292', '35293', '35294', '35295', '35296', '35297', '35298'],
    metro: 'Birmingham-Hoover',
    region: 'Southeast',
    timezone: 'America/Chicago',
    industries: ['Healthcare', 'Banking', 'Steel', 'Technology', 'Education', 'Manufacturing'],
    keywords: ['Birmingham business consulting', 'Birmingham QuickBooks', 'Alabama business services', 'Birmingham payroll'],
    competitorCount: 12,
    opportunity: 'medium'
  },

  // ALASKA
  {
    name: 'Anchorage',
    state: 'Alaska',
    stateCode: 'AK',
    county: 'Anchorage',
    population: 291247,
    latitude: 61.2181,
    longitude: -149.9003,
    zipCodes: ['99501', '99502', '99503', '99504', '99507', '99508', '99515', '99516', '99517', '99518', '99519', '99520', '99521', '99522', '99523', '99524', '99577', '99587', '99599'],
    metro: 'Anchorage',
    region: 'West',
    timezone: 'America/Anchorage',
    industries: ['Oil & Gas', 'Military', 'Tourism', 'Fishing', 'Aviation', 'Government'],
    keywords: ['Anchorage business consulting', 'Anchorage QuickBooks', 'Alaska business services', 'Anchorage payroll'],
    competitorCount: 5,
    opportunity: 'low'
  },

  // ARKANSAS
  {
    name: 'Little Rock',
    state: 'Arkansas',
    stateCode: 'AR',
    county: 'Pulaski',
    population: 198541,
    latitude: 34.7465,
    longitude: -92.2896,
    zipCodes: ['72201', '72202', '72204', '72205', '72206', '72207', '72209', '72210', '72211', '72212', '72219', '72223', '72227', '72260', '72295'],
    metro: 'Little Rock-North Little Rock-Conway',
    region: 'South',
    timezone: 'America/Chicago',
    industries: ['Government', 'Healthcare', 'Banking', 'Transportation', 'Agriculture', 'Technology'],
    keywords: ['Little Rock business consulting', 'Little Rock QuickBooks', 'Arkansas business services', 'Little Rock payroll'],
    competitorCount: 8,
    opportunity: 'medium'
  },

  // CALIFORNIA - Additional Cities
  {
    name: 'San Francisco',
    state: 'California',
    stateCode: 'CA',
    county: 'San Francisco',
    population: 873965,
    latitude: 37.7749,
    longitude: -122.4194,
    zipCodes: ['94102', '94103', '94104', '94105', '94107', '94108', '94109', '94110', '94111', '94112', '94114', '94115', '94116', '94117', '94118', '94121', '94122', '94123', '94124', '94127', '94129', '94130', '94131', '94132', '94133', '94134', '94158'],
    metro: 'San Francisco-Oakland-Berkeley',
    region: 'Northern California',
    timezone: 'America/Los_Angeles',
    industries: ['Technology', 'Finance', 'Tourism', 'Biotechnology', 'Real Estate', 'Healthcare'],
    keywords: ['San Francisco business consulting', 'SF QuickBooks', 'Silicon Valley business', 'Bay Area consulting'],
    competitorCount: 45,
    opportunity: 'high'
  },
  {
    name: 'Sacramento',
    state: 'California',
    stateCode: 'CA',
    county: 'Sacramento',
    population: 524943,
    latitude: 38.5816,
    longitude: -121.4944,
    zipCodes: ['95814', '95815', '95816', '95817', '95818', '95819', '95820', '95821', '95822', '95823', '95824', '95825', '95826', '95827', '95828', '95829', '95831', '95832', '95833', '95834', '95835', '95837', '95838', '95841', '95842', '95864'],
    metro: 'Sacramento-Roseville-Folsom',
    region: 'Northern California',
    timezone: 'America/Los_Angeles',
    industries: ['Government', 'Healthcare', 'Agriculture', 'Technology', 'Education', 'Manufacturing'],
    keywords: ['Sacramento business consulting', 'Sacramento QuickBooks', 'California capital business', 'Sacramento payroll'],
    competitorCount: 15,
    opportunity: 'medium'
  },

  // CONNECTICUT
  {
    name: 'Hartford',
    state: 'Connecticut',
    stateCode: 'CT',
    county: 'Hartford',
    population: 121054,
    latitude: 41.7658,
    longitude: -72.6734,
    zipCodes: ['06101', '06102', '06103', '06104', '06105', '06106', '06112', '06114', '06120', '06160'],
    metro: 'Hartford-East Hartford-Middletown',
    region: 'Northeast',
    timezone: 'America/New_York',
    industries: ['Insurance', 'Finance', 'Healthcare', 'Aerospace', 'Technology', 'Manufacturing'],
    keywords: ['Hartford business consulting', 'Hartford QuickBooks', 'Connecticut business services', 'Hartford payroll'],
    competitorCount: 10,
    opportunity: 'medium'
  },

  // DELAWARE
  {
    name: 'Wilmington',
    state: 'Delaware',
    stateCode: 'DE',
    county: 'New Castle',
    population: 70655,
    latitude: 39.7391,
    longitude: -75.5398,
    zipCodes: ['19801', '19802', '19803', '19804', '19805', '19806', '19807', '19808', '19809', '19810'],
    metro: 'Philadelphia-Camden-Wilmington',
    region: 'Northeast',
    timezone: 'America/New_York',
    industries: ['Banking', 'Chemical', 'Healthcare', 'Manufacturing', 'Agriculture', 'Tourism'],
    keywords: ['Wilmington business consulting', 'Wilmington QuickBooks', 'Delaware business services', 'Wilmington payroll'],
    competitorCount: 8,
    opportunity: 'medium'
  },

  // FLORIDA - Additional Cities
  {
    name: 'Jacksonville',
    state: 'Florida',
    stateCode: 'FL',
    county: 'Duval',
    population: 949611,
    latitude: 32.0835,
    longitude: -81.6557,
    zipCodes: ['32099', '32202', '32204', '32205', '32206', '32207', '32208', '32209', '32210', '32211', '32212', '32216', '32217', '32218', '32219', '32220', '32221', '32222', '32223', '32224', '32225', '32226', '32227', '32233', '32234', '32244', '32246', '32250', '32254', '32256', '32257', '32258', '32259', '32266', '32277'],
    metro: 'Jacksonville',
    region: 'Southeast',
    timezone: 'America/New_York',
    industries: ['Banking', 'Insurance', 'Healthcare', 'Transportation', 'Military', 'Technology'],
    keywords: ['Jacksonville business consulting', 'Jacksonville QuickBooks', 'North Florida business', 'Jacksonville payroll'],
    competitorCount: 18,
    opportunity: 'medium'
  },
  {
    name: 'Tampa',
    state: 'Florida',
    stateCode: 'FL',
    county: 'Hillsborough',
    population: 384959,
    latitude: 27.9506,
    longitude: -82.4572,
    zipCodes: ['33601', '33602', '33603', '33604', '33605', '33606', '33607', '33608', '33609', '33610', '33611', '33612', '33613', '33614', '33615', '33616', '33617', '33618', '33619', '33620', '33621', '33622', '33623', '33624', '33625', '33626', '33629', '33634', '33635', '33637', '33647', '33650', '33655', '33660', '33661', '33662', '33663', '33664', '33672', '33673', '33674', '33675', '33677', '33679', '33680', '33681', '33682', '33684', '33685', '33686', '33687', '33688', '33689', '33694'],
    metro: 'Tampa-St. Petersburg-Clearwater',
    region: 'Southeast',
    timezone: 'America/New_York',
    industries: ['Healthcare', 'Finance', 'Technology', 'Tourism', 'Transportation', 'Manufacturing'],
    keywords: ['Tampa business consulting', 'Tampa QuickBooks', 'Tampa Bay business', 'Tampa payroll services'],
    competitorCount: 20,
    opportunity: 'high'
  },
  {
    name: 'Orlando',
    state: 'Florida',
    stateCode: 'FL',
    county: 'Orange',
    population: 307573,
    latitude: 28.5383,
    longitude: -81.3792,
    zipCodes: ['32801', '32803', '32804', '32805', '32806', '32807', '32808', '32809', '32810', '32811', '32812', '32814', '32817', '32818', '32819', '32820', '32821', '32822', '32824', '32825', '32826', '32827', '32828', '32829', '32831', '32832', '32833', '32835', '32836', '32837', '32839'],
    metro: 'Orlando-Kissimmee-Sanford',
    region: 'Southeast',
    timezone: 'America/New_York',
    industries: ['Tourism', 'Technology', 'Healthcare', 'Aerospace', 'Agriculture', 'Entertainment'],
    keywords: ['Orlando business consulting', 'Orlando QuickBooks', 'Central Florida business', 'Orlando payroll'],
    competitorCount: 16,
    opportunity: 'medium'
  },

  // GEORGIA
  {
    name: 'Atlanta',
    state: 'Georgia',
    stateCode: 'GA',
    county: 'Fulton',
    population: 498715,
    latitude: 33.7490,
    longitude: -84.3880,
    zipCodes: ['30301', '30302', '30303', '30304', '30305', '30306', '30307', '30308', '30309', '30310', '30311', '30312', '30313', '30314', '30315', '30316', '30317', '30318', '30319', '30320', '30321', '30322', '30324', '30325', '30326', '30327', '30328', '30329', '30331', '30332', '30334', '30336', '30337', '30338', '30339', '30340', '30341', '30342', '30343', '30344', '30345', '30346', '30348', '30349', '30350', '30353', '30354', '30355', '30356', '30357', '30358', '30359', '30360', '30361', '30362', '30363', '30364', '30368', '30369', '30370', '30371', '30374', '30375', '30377', '30378', '30380', '30384', '30385', '30388', '30392', '30394', '30396', '30398'],
    metro: 'Atlanta-Sandy Springs-Alpharetta',
    region: 'Southeast',
    timezone: 'America/New_York',
    industries: ['Technology', 'Finance', 'Transportation', 'Healthcare', 'Telecommunications', 'Entertainment'],
    keywords: ['Atlanta business consulting', 'Atlanta QuickBooks', 'Georgia business services', 'Atlanta payroll'],
    competitorCount: 35,
    opportunity: 'high'
  },

  // HAWAII
  {
    name: 'Honolulu',
    state: 'Hawaii',
    stateCode: 'HI',
    county: 'Honolulu',
    population: 350964,
    latitude: 21.3099,
    longitude: -157.8581,
    zipCodes: ['96801', '96802', '96803', '96804', '96805', '96806', '96807', '96808', '96809', '96810', '96811', '96812', '96813', '96814', '96815', '96816', '96817', '96818', '96819', '96820', '96821', '96822', '96823', '96824', '96825', '96826', '96828', '96830', '96836', '96837', '96838', '96839', '96840', '96841', '96843', '96844', '96846', '96847', '96848', '96849', '96850', '96853', '96854', '96857', '96858', '96859', '96860', '96861', '96863', '96898'],
    metro: 'Urban Honolulu',
    region: 'West',
    timezone: 'Pacific/Honolulu',
    industries: ['Tourism', 'Military', 'Agriculture', 'Real Estate', 'Healthcare', 'Education'],
    keywords: ['Honolulu business consulting', 'Honolulu QuickBooks', 'Hawaii business services', 'Honolulu payroll'],
    competitorCount: 8,
    opportunity: 'low'
  },

  // IDAHO
  {
    name: 'Boise',
    state: 'Idaho',
    stateCode: 'ID',
    county: 'Ada',
    population: 235684,
    latitude: 43.6150,
    longitude: -116.2023,
    zipCodes: ['83701', '83702', '83703', '83704', '83705', '83706', '83707', '83708', '83709', '83712', '83713', '83714', '83715', '83716', '83717', '83719', '83720', '83724', '83725', '83726', '83728', '83729', '83732', '83735', '83756'],
    metro: 'Boise City',
    region: 'Mountain West',
    timezone: 'America/Boise',
    industries: ['Technology', 'Manufacturing', 'Healthcare', 'Government', 'Agriculture', 'Energy'],
    keywords: ['Boise business consulting', 'Boise QuickBooks', 'Idaho business services', 'Boise payroll'],
    competitorCount: 8,
    opportunity: 'low'
  },

  // INDIANA
  {
    name: 'Indianapolis',
    state: 'Indiana',
    stateCode: 'IN',
    county: 'Marion',
    population: 887642,
    latitude: 39.7684,
    longitude: -86.1581,
    zipCodes: ['46201', '46202', '46203', '46204', '46205', '46208', '46214', '46216', '46217', '46218', '46219', '46220', '46221', '46222', '46224', '46225', '46226', '46227', '46228', '46229', '46230', '46231', '46234', '46235', '46236', '46237', '46239', '46240', '46241', '46250', '46254', '46256', '46259', '46260', '46268', '46274', '46275', '46277', '46278', '46280', '46282', '46283', '46285', '46290', '46291', '46295', '46296', '46298'],
    metro: 'Indianapolis-Carmel-Anderson',
    region: 'Midwest',
    timezone: 'America/Indiana/Indianapolis',
    industries: ['Manufacturing', 'Healthcare', 'Finance', 'Technology', 'Sports', 'Logistics'],
    keywords: ['Indianapolis business consulting', 'Indianapolis QuickBooks', 'Indiana business services', 'Indianapolis payroll'],
    competitorCount: 15,
    opportunity: 'medium'
  },

  // IOWA
  {
    name: 'Des Moines',
    state: 'Iowa',
    stateCode: 'IA',
    county: 'Polk',
    population: 214133,
    latitude: 39.6112,
    longitude: -93.6091,
    zipCodes: ['50301', '50302', '50303', '50304', '50305', '50306', '50307', '50308', '50309', '50310', '50311', '50312', '50313', '50314', '50315', '50316', '50317', '50318', '50319', '50320', '50321', '50322', '50323', '50324', '50325', '50327', '50328', '50329', '50330', '50331', '50332', '50333', '50334', '50335', '50336', '50339', '50340', '50359', '50360', '50361', '50362', '50363', '50364', '50365', '50367', '50368', '50369', '50380', '50381', '50391', '50392', '50393', '50394', '50395', '50396', '50936', '50940', '50947', '50950', '50980', '50981', '50982', '50983'],
    metro: 'Des Moines-West Des Moines',
    region: 'Midwest',
    timezone: 'America/Chicago',
    industries: ['Insurance', 'Agriculture', 'Finance', 'Manufacturing', 'Government', 'Healthcare'],
    keywords: ['Des Moines business consulting', 'Des Moines QuickBooks', 'Iowa business services', 'Des Moines payroll'],
    competitorCount: 10,
    opportunity: 'medium'
  },

  // KANSAS
  {
    name: 'Wichita',
    state: 'Kansas',
    stateCode: 'KS',
    county: 'Sedgwick',
    population: 397532,
    latitude: 37.6872,
    longitude: -97.3301,
    zipCodes: ['67201', '67202', '67203', '67204', '67205', '67206', '67207', '67208', '67209', '67210', '67211', '67212', '67213', '67214', '67215', '67216', '67217', '67218', '67219', '67220', '67223', '67226', '67227', '67228', '67230', '67235', '67260', '67275', '67276', '67277', '67278'],
    metro: 'Wichita',
    region: 'Midwest',
    timezone: 'America/Chicago',
    industries: ['Aerospace', 'Manufacturing', 'Agriculture', 'Energy', 'Healthcare', 'Technology'],
    keywords: ['Wichita business consulting', 'Wichita QuickBooks', 'Kansas business services', 'Wichita payroll'],
    competitorCount: 8,
    opportunity: 'medium'
  },

  // KENTUCKY
  {
    name: 'Louisville',
    state: 'Kentucky',
    stateCode: 'KY',
    county: 'Jefferson',
    population: 633045,
    latitude: 38.2527,
    longitude: -85.7585,
    zipCodes: ['40201', '40202', '40203', '40204', '40205', '40206', '40207', '40208', '40209', '40210', '40211', '40212', '40213', '40214', '40215', '40216', '40217', '40218', '40219', '40220', '40221', '40222', '40223', '40224', '40225', '40228', '40229', '40231', '40232', '40233', '40241', '40242', '40243', '40245', '40250', '40251', '40252', '40253', '40255', '40256', '40257', '40258', '40259', '40261', '40266', '40268', '40269', '40270', '40272', '40280', '40281', '40282', '40283', '40291', '40292', '40293', '40294', '40295', '40296', '40297', '40298', '40299'],
    metro: 'Louisville/Jefferson County',
    region: 'Southeast',
    timezone: 'America/New_York',
    industries: ['Manufacturing', 'Healthcare', 'Logistics', 'Food & Beverage', 'Automotive', 'Technology'],
    keywords: ['Louisville business consulting', 'Louisville QuickBooks', 'Kentucky business services', 'Louisville payroll'],
    competitorCount: 12,
    opportunity: 'medium'
  },

  // LOUISIANA
  {
    name: 'New Orleans',
    state: 'Louisiana',
    stateCode: 'LA',
    county: 'Orleans',
    population: 383997,
    latitude: 29.9511,
    longitude: -90.0715,
    zipCodes: ['70112', '70113', '70114', '70115', '70116', '70117', '70118', '70119', '70121', '70122', '70124', '70125', '70126', '70127', '70128', '70129', '70130', '70131', '70139', '70141', '70142', '70143', '70145', '70146', '70148', '70150', '70151', '70152', '70153', '70154', '70156', '70157', '70158', '70159', '70160', '70161', '70162', '70163', '70164', '70165', '70166', '70167', '70170', '70172', '70174', '70175', '70176', '70177', '70178', '70179', '70181', '70182', '70183', '70184', '70185', '70186', '70187', '70189', '70190', '70195'],
    metro: 'New Orleans-Metairie',
    region: 'South',
    timezone: 'America/Chicago',
    industries: ['Tourism', 'Port Operations', 'Oil & Gas', 'Manufacturing', 'Healthcare', 'Technology'],
    keywords: ['New Orleans business consulting', 'New Orleans QuickBooks', 'Louisiana business services', 'New Orleans payroll'],
    competitorCount: 12,
    opportunity: 'medium'
  },

  // MAINE
  {
    name: 'Portland',
    state: 'Maine',
    stateCode: 'ME',
    county: 'Cumberland',
    population: 68408,
    latitude: 43.6591,
    longitude: -70.2568,
    zipCodes: ['04101', '04102', '04103', '04104', '04105', '04106', '04107', '04108', '04109', '04110', '04112', '04116', '04122', '04123', '04124'],
    metro: 'Portland-South Portland',
    region: 'Northeast',
    timezone: 'America/New_York',
    industries: ['Healthcare', 'Technology', 'Tourism', 'Manufacturing', 'Fishing', 'Agriculture'],
    keywords: ['Portland business consulting', 'Portland QuickBooks', 'Maine business services', 'Portland payroll'],
    competitorCount: 6,
    opportunity: 'low'
  },

  // MARYLAND
  {
    name: 'Baltimore',
    state: 'Maryland',
    stateCode: 'MD',
    county: 'Baltimore',
    population: 585708,
    latitude: 39.2904,
    longitude: -76.6122,
    zipCodes: ['21201', '21202', '21205', '21206', '21207', '21208', '21209', '21210', '21211', '21212', '21213', '21214', '21215', '21216', '21217', '21218', '21223', '21224', '21225', '21226', '21229', '21230', '21231', '21234', '21235', '21236', '21237', '21239', '21240', '21241', '21244', '21250', '21251', '21252', '21263', '21264', '21270', '21273', '21275', '21278', '21279', '21280', '21281', '21282', '21283', '21284', '21285', '21287', '21289', '21290', '21297', '21298'],
    metro: 'Baltimore-Columbia-Towson',
    region: 'Northeast',
    timezone: 'America/New_York',
    industries: ['Healthcare', 'Biotechnology', 'Government', 'Port Operations', 'Education', 'Technology'],
    keywords: ['Baltimore business consulting', 'Baltimore QuickBooks', 'Maryland business services', 'Baltimore payroll'],
    competitorCount: 18,
    opportunity: 'medium'
  },

  // MASSACHUSETTS
  {
    name: 'Boston',
    state: 'Massachusetts',
    stateCode: 'MA',
    county: 'Suffolk',
    population: 685094,
    latitude: 42.3601,
    longitude: -71.0589,
    zipCodes: ['02108', '02109', '02110', '02111', '02113', '02114', '02115', '02116', '02118', '02119', '02120', '02121', '02122', '02124', '02125', '02126', '02127', '02128', '02129', '02130', '02131', '02132', '02134', '02135', '02136', '02215', '02163', '02199', '02201', '02203', '02204', '02205', '02206', '02210', '02211', '02212', '02215', '02217', '02222', '02228', '02266', '02283', '02284', '02293', '02295', '02297', '02298'],
    metro: 'Boston-Cambridge-Newton',
    region: 'Northeast',
    timezone: 'America/New_York',
    industries: ['Biotechnology', 'Healthcare', 'Education', 'Finance', 'Technology', 'Manufacturing'],
    keywords: ['Boston business consulting', 'Boston QuickBooks', 'Massachusetts business services', 'Boston payroll'],
    competitorCount: 30,
    opportunity: 'high'
  },

  // MICHIGAN
  {
    name: 'Detroit',
    state: 'Michigan',
    stateCode: 'MI',
    county: 'Wayne',
    population: 639111,
    latitude: 42.3314,
    longitude: -83.0458,
    zipCodes: ['48201', '48202', '48204', '48205', '48206', '48207', '48208', '48209', '48210', '48211', '48212', '48213', '48214', '48215', '48216', '48217', '48219', '48221', '48223', '48224', '48226', '48227', '48228', '48233', '48234', '48235', '48238', '48239', '48240', '48243', '48255', '48260', '48264', '48266', '48267', '48268', '48269', '48272', '48275', '48277', '48278', '48279', '48288'],
    metro: 'Detroit-Warren-Dearborn',
    region: 'Midwest',
    timezone: 'America/Detroit',
    industries: ['Automotive', 'Manufacturing', 'Technology', 'Healthcare', 'Finance', 'Transportation'],
    keywords: ['Detroit business consulting', 'Detroit QuickBooks', 'Michigan business services', 'Detroit payroll'],
    competitorCount: 20,
    opportunity: 'medium'
  },

  // MINNESOTA
  {
    name: 'Minneapolis',
    state: 'Minnesota',
    stateCode: 'MN',
    county: 'Hennepin',
    population: 429954,
    latitude: 44.9778,
    longitude: -93.2650,
    zipCodes: ['55401', '55402', '55403', '55404', '55405', '55406', '55407', '55408', '55409', '55410', '55411', '55412', '55413', '55414', '55415', '55416', '55417', '55418', '55419', '55420', '55421', '55422', '55423', '55424', '55425', '55426', '55427', '55428', '55429', '55430', '55431', '55432', '55433', '55434', '55435', '55436', '55437', '55438', '55439', '55440', '55441', '55442', '55443', '55444', '55445', '55446', '55447', '55448', '55449', '55450', '55454', '55455', '55459', '55467', '55470', '55472', '55473', '55474', '55478', '55479', '55480', '55483', '55484', '55485', '55486', '55487', '55488'],
    metro: 'Minneapolis-St. Paul-Bloomington',
    region: 'Midwest',
    timezone: 'America/Chicago',
    industries: ['Healthcare', 'Finance', 'Technology', 'Manufacturing', 'Agriculture', 'Transportation'],
    keywords: ['Minneapolis business consulting', 'Minneapolis QuickBooks', 'Minnesota business services', 'Twin Cities payroll'],
    competitorCount: 18,
    opportunity: 'medium'
  },

  // MISSISSIPPI
  {
    name: 'Jackson',
    state: 'Mississippi',
    stateCode: 'MS',
    county: 'Hinds',
    population: 153701,
    latitude: 32.2988,
    longitude: -90.1848,
    zipCodes: ['39201', '39202', '39203', '39204', '39206', '39209', '39210', '39211', '39212', '39213', '39215', '39216', '39217', '39218', '39225', '39236', '39250', '39269', '39271', '39282', '39283', '39284', '39286', '39289', '39296', '39298'],
    metro: 'Jackson',
    region: 'South',
    timezone: 'America/Chicago',
    industries: ['Government', 'Healthcare', 'Manufacturing', 'Agriculture', 'Education', 'Energy'],
    keywords: ['Jackson business consulting', 'Jackson QuickBooks', 'Mississippi business services', 'Jackson payroll'],
    competitorCount: 6,
    opportunity: 'low'
  },

  // MISSOURI
  {
    name: 'Kansas City',
    state: 'Missouri',
    stateCode: 'MO',
    county: 'Jackson',
    population: 508090,
    latitude: 39.0997,
    longitude: -94.5786,
    zipCodes: ['64108', '64109', '64110', '64111', '64112', '64113', '64114', '64116', '64117', '64118', '64119', '64120', '64123', '64124', '64125', '64126', '64127', '64128', '64129', '64130', '64131', '64132', '64133', '64134', '64136', '64137', '64138', '64139', '64141', '64145', '64146', '64147', '64148', '64149', '64151', '64152', '64153', '64154', '64155', '64156', '64157', '64158', '64161', '64163', '64164', '64165', '64166', '64167', '64168', '64170', '64171', '64179', '64180', '64184', '64187', '64188', '64191', '64196', '64197', '64198', '64199'],
    metro: 'Kansas City',
    region: 'Midwest',
    timezone: 'America/Chicago',
    industries: ['Agriculture', 'Manufacturing', 'Transportation', 'Healthcare', 'Technology', 'Finance'],
    keywords: ['Kansas City business consulting', 'Kansas City QuickBooks', 'Missouri business services', 'Kansas City payroll'],
    competitorCount: 15,
    opportunity: 'medium'
  },

  // MONTANA
  {
    name: 'Billings',
    state: 'Montana',
    stateCode: 'MT',
    county: 'Yellowstone',
    population: 117116,
    latitude: 45.7833,
    longitude: -108.5007,
    zipCodes: ['59101', '59102', '59105', '59106', '59107', '59108', '59111', '59114', '59115', '59116', '59117'],
    metro: 'Billings',
    region: 'Mountain West',
    timezone: 'America/Denver',
    industries: ['Energy', 'Agriculture', 'Healthcare', 'Transportation', 'Manufacturing', 'Tourism'],
    keywords: ['Billings business consulting', 'Billings QuickBooks', 'Montana business services', 'Billings payroll'],
    competitorCount: 4,
    opportunity: 'low'
  },

  // NEBRASKA
  {
    name: 'Omaha',
    state: 'Nebraska',
    stateCode: 'NE',
    county: 'Douglas',
    population: 486051,
    latitude: 41.2565,
    longitude: -95.9345,
    zipCodes: ['68022', '68101', '68102', '68104', '68105', '68106', '68107', '68108', '68109', '68110', '68111', '68112', '68114', '68116', '68117', '68118', '68119', '68122', '68124', '68127', '68130', '68131', '68132', '68134', '68135', '68137', '68142', '68144', '68152', '68154', '68157', '68164', '68172', '68175', '68178', '68179', '68180', '68182', '68183', '68198'],
    metro: 'Omaha-Council Bluffs',
    region: 'Midwest',
    timezone: 'America/Chicago',
    industries: ['Agriculture', 'Transportation', 'Insurance', 'Manufacturing', 'Healthcare', 'Technology'],
    keywords: ['Omaha business consulting', 'Omaha QuickBooks', 'Nebraska business services', 'Omaha payroll'],
    competitorCount: 10,
    opportunity: 'low'
  },

  // NEVADA
  {
    name: 'Las Vegas',
    state: 'Nevada',
    stateCode: 'NV',
    county: 'Clark',
    population: 641903,
    latitude: 36.1699,
    longitude: -115.1398,
    zipCodes: ['89101', '89102', '89104', '89106', '89107', '89108', '89109', '89110', '89113', '89115', '89117', '89118', '89119', '89120', '89121', '89122', '89123', '89124', '89128', '89129', '89130', '89131', '89134', '89135', '89138', '89139', '89141', '89142', '89143', '89144', '89145', '89146', '89147', '89148', '89149', '89166', '89169', '89178', '89179', '89183'],
    metro: 'Las Vegas-Henderson-Paradise',
    region: 'West',
    timezone: 'America/Los_Angeles',
    industries: ['Tourism', 'Entertainment', 'Real Estate', 'Construction', 'Technology', 'Healthcare'],
    keywords: ['Las Vegas business consulting', 'Las Vegas QuickBooks', 'Nevada business services', 'Las Vegas payroll'],
    competitorCount: 18,
    opportunity: 'medium'
  },

  // NEW HAMPSHIRE
  {
    name: 'Manchester',
    state: 'New Hampshire',
    stateCode: 'NH',
    county: 'Hillsborough',
    population: 115644,
    latitude: 42.9956,
    longitude: -71.4548,
    zipCodes: ['03101', '03102', '03103', '03104', '03105', '03109', '03110'],
    metro: 'Manchester-Nashua',
    region: 'Northeast',
    timezone: 'America/New_York',
    industries: ['Manufacturing', 'Technology', 'Healthcare', 'Finance', 'Education', 'Tourism'],
    keywords: ['Manchester business consulting', 'Manchester QuickBooks', 'New Hampshire business services', 'Manchester payroll'],
    competitorCount: 8,
    opportunity: 'medium'
  },

  // NEW JERSEY
  {
    name: 'Newark',
    state: 'New Jersey',
    stateCode: 'NJ',
    county: 'Essex',
    population: 311549,
    latitude: 40.7357,
    longitude: -74.1724,
    zipCodes: ['07101', '07102', '07103', '07104', '07105', '07106', '07107', '07108', '07112', '07114'],
    metro: 'New York-Newark-Jersey City',
    region: 'Northeast',
    timezone: 'America/New_York',
    industries: ['Finance', 'Transportation', 'Manufacturing', 'Healthcare', 'Technology', 'Port Operations'],
    keywords: ['Newark business consulting', 'Newark QuickBooks', 'New Jersey business services', 'Newark payroll'],
    competitorCount: 25,
    opportunity: 'high'
  },

  // NEW MEXICO
  {
    name: 'Albuquerque',
    state: 'New Mexico',
    stateCode: 'NM',
    county: 'Bernalillo',
    population: 564559,
    latitude: 35.0844,
    longitude: -106.6504,
    zipCodes: ['87101', '87102', '87104', '87105', '87106', '87107', '87108', '87109', '87110', '87111', '87112', '87113', '87114', '87116', '87120', '87121', '87122', '87123', '87124', '87131', '87144', '87158', '87176', '87181', '87187', '87190', '87191', '87192', '87193', '87194', '87196', '87197', '87198', '87199'],
    metro: 'Albuquerque',
    region: 'Southwest',
    timezone: 'America/Denver',
    industries: ['Technology', 'Government', 'Healthcare', 'Education', 'Manufacturing', 'Tourism'],
    keywords: ['Albuquerque business consulting', 'Albuquerque QuickBooks', 'New Mexico business services', 'Albuquerque payroll'],
    competitorCount: 8,
    opportunity: 'low'
  },

  // NEW YORK
  {
    name: 'New York',
    state: 'New York',
    stateCode: 'NY',
    county: 'New York',
    population: 8336817,
    latitude: 40.7128,
    longitude: -74.0060,
    zipCodes: ['10001', '10002', '10003', '10004', '10005', '10006', '10007', '10009', '10010', '10011', '10012', '10013', '10014', '10016', '10017', '10018', '10019', '10020', '10021', '10022', '10023', '10024', '10025', '10026', '10027', '10028', '10029', '10030', '10031', '10032', '10033', '10034', '10035', '10036', '10037', '10038', '10039', '10040', '10044', '10065', '10069', '10075', '10128', '10280', '10282'],
    metro: 'New York-Newark-Jersey City',
    region: 'Northeast',
    timezone: 'America/New_York',
    industries: ['Finance', 'Real Estate', 'Technology', 'Media', 'Fashion', 'Tourism'],
    keywords: ['New York business consulting', 'NYC QuickBooks', 'Manhattan business services', 'New York payroll'],
    competitorCount: 60,
    opportunity: 'high'
  },

  // NORTH CAROLINA
  {
    name: 'Charlotte',
    state: 'North Carolina',
    stateCode: 'NC',
    county: 'Mecklenburg',
    population: 874579,
    latitude: 35.2271,
    longitude: -80.8431,
    zipCodes: ['28201', '28202', '28203', '28204', '28205', '28206', '28207', '28208', '28209', '28210', '28211', '28212', '28213', '28214', '28215', '28216', '28217', '28226', '28227', '28262', '28269', '28270', '28273', '28274', '28277', '28278', '28280', '28282', '28284', '28285', '28287', '28288', '28296', '28299'],
    metro: 'Charlotte-Concord-Gastonia',
    region: 'Southeast',
    timezone: 'America/New_York',
    industries: ['Banking', 'Technology', 'Healthcare', 'Manufacturing', 'Energy', 'Transportation'],
    keywords: ['Charlotte business consulting', 'Charlotte QuickBooks', 'North Carolina business services', 'Charlotte payroll'],
    competitorCount: 22,
    opportunity: 'high'
  },

  // NORTH DAKOTA
  {
    name: 'Fargo',
    state: 'North Dakota',
    stateCode: 'ND',
    county: 'Cass',
    population: 125990,
    latitude: 46.8772,
    longitude: -96.7898,
    zipCodes: ['58102', '58103', '58104', '58105', '58106', '58107', '58108', '58109', '58121', '58122', '58124', '58125', '58126'],
    metro: 'Fargo',
    region: 'Midwest',
    timezone: 'America/Chicago',
    industries: ['Agriculture', 'Technology', 'Healthcare', 'Manufacturing', 'Energy', 'Education'],
    keywords: ['Fargo business consulting', 'Fargo QuickBooks', 'North Dakota business services', 'Fargo payroll'],
    competitorCount: 4,
    opportunity: 'low'
  },

  // OHIO
  {
    name: 'Columbus',
    state: 'Ohio',
    stateCode: 'OH',
    county: 'Franklin',
    population: 905748,
    latitude: 39.9612,
    longitude: -82.9988,
    zipCodes: ['43085', '43201', '43202', '43203', '43204', '43205', '43206', '43207', '43209', '43210', '43211', '43212', '43213', '43214', '43215', '43216', '43217', '43218', '43219', '43220', '43221', '43222', '43223', '43224', '43226', '43227', '43228', '43229', '43230', '43231', '43232', '43235', '43240', '43251', '43260', '43266', '43268', '43270', '43271', '43272', '43279', '43287', '43291'],
    metro: 'Columbus',
    region: 'Midwest',
    timezone: 'America/New_York',
    industries: ['Government', 'Education', 'Healthcare', 'Technology', 'Finance', 'Manufacturing'],
    keywords: ['Columbus business consulting', 'Columbus QuickBooks', 'Ohio business services', 'Columbus payroll'],
    competitorCount: 18,
    opportunity: 'medium'
  },

  // OREGON
  {
    name: 'Portland',
    state: 'Oregon',
    stateCode: 'OR',
    county: 'Multnomah',
    population: 650380,
    latitude: 45.5152,
    longitude: -122.6784,
    zipCodes: ['97201', '97202', '97203', '97204', '97205', '97206', '97209', '97210', '97211', '97212', '97213', '97214', '97215', '97216', '97217', '97218', '97219', '97220', '97221', '97222', '97227', '97230', '97232', '97236', '97238', '97239', '97266', '97267', '97268', '97269', '97280', '97282', '97283', '97286', '97290', '97291', '97292', '97293', '97294', '97296', '97298'],
    metro: 'Portland-Vancouver-Hillsboro',
    region: 'West',
    timezone: 'America/Los_Angeles',
    industries: ['Technology', 'Manufacturing', 'Healthcare', 'Agriculture', 'Tourism', 'Green Energy'],
    keywords: ['Portland business consulting', 'Portland QuickBooks', 'Oregon business services', 'Portland payroll'],
    competitorCount: 15,
    opportunity: 'medium'
  },

  // RHODE ISLAND
  {
    name: 'Providence',
    state: 'Rhode Island',
    stateCode: 'RI',
    county: 'Providence',
    population: 190934,
    latitude: 41.8240,
    longitude: -71.4128,
    zipCodes: ['02901', '02902', '02903', '02904', '02905', '02906', '02907', '02908', '02909', '02940'],
    metro: 'Providence-Warwick',
    region: 'Northeast',
    timezone: 'America/New_York',
    industries: ['Healthcare', 'Education', 'Manufacturing', 'Tourism', 'Finance', 'Technology'],
    keywords: ['Providence business consulting', 'Providence QuickBooks', 'Rhode Island business services', 'Providence payroll'],
    competitorCount: 8,
    opportunity: 'low'
  },

  // SOUTH CAROLINA
  {
    name: 'Charleston',
    state: 'South Carolina',
    stateCode: 'SC',
    county: 'Charleston',
    population: 150227,
    latitude: 32.7765,
    longitude: -79.9311,
    zipCodes: ['29401', '29403', '29405', '29407', '29409', '29412', '29414', '29492'],
    metro: 'Charleston-North Charleston',
    region: 'Southeast',
    timezone: 'America/New_York',
    industries: ['Tourism', 'Port Operations', 'Manufacturing', 'Technology', 'Healthcare', 'Military'],
    keywords: ['Charleston business consulting', 'Charleston QuickBooks', 'South Carolina business services', 'Charleston payroll'],
    competitorCount: 10,
    opportunity: 'medium'
  },

  // SOUTH DAKOTA
  {
    name: 'Sioux Falls',
    state: 'South Dakota',
    stateCode: 'SD',
    county: 'Minnehaha',
    population: 192517,
    latitude: 43.5446,
    longitude: -96.7311,
    zipCodes: ['57101', '57103', '57104', '57105', '57106', '57107', '57108', '57110', '57117', '57186', '57197', '57198'],
    metro: 'Sioux Falls',
    region: 'Midwest',
    timezone: 'America/Chicago',
    industries: ['Banking', 'Healthcare', 'Manufacturing', 'Agriculture', 'Retail', 'Technology'],
    keywords: ['Sioux Falls business consulting', 'Sioux Falls QuickBooks', 'South Dakota business services', 'Sioux Falls payroll'],
    competitorCount: 6,
    opportunity: 'low'
  },

  // UTAH
  {
    name: 'Salt Lake City',
    state: 'Utah',
    stateCode: 'UT',
    county: 'Salt Lake',
    population: 199723,
    latitude: 40.7608,
    longitude: -111.8910,
    zipCodes: ['84101', '84102', '84103', '84104', '84105', '84106', '84107', '84108', '84109', '84110', '84111', '84112', '84113', '84114', '84115', '84116', '84117', '84118', '84119', '84120', '84121', '84123', '84124', '84128', '84130', '84131', '84132', '84133', '84134', '84138', '84139', '84141', '84143', '84145', '84147', '84148', '84150', '84151', '84152', '84157', '84158', '84165', '84170', '84171', '84180', '84184', '84189', '84190', '84199'],
    metro: 'Salt Lake City',
    region: 'Mountain West',
    timezone: 'America/Denver',
    industries: ['Technology', 'Healthcare', 'Finance', 'Manufacturing', 'Mining', 'Tourism'],
    keywords: ['Salt Lake City business consulting', 'Salt Lake City QuickBooks', 'Utah business services', 'Salt Lake City payroll'],
    competitorCount: 12,
    opportunity: 'medium'
  },

  // VERMONT
  {
    name: 'Burlington',
    state: 'Vermont',
    stateCode: 'VT',
    county: 'Chittenden',
    population: 44743,
    latitude: 44.4759,
    longitude: -73.2121,
    zipCodes: ['05401', '05402', '05403', '05404', '05405', '05408'],
    metro: 'Burlington-South Burlington',
    region: 'Northeast',
    timezone: 'America/New_York',
    industries: ['Healthcare', 'Education', 'Manufacturing', 'Technology', 'Tourism', 'Agriculture'],
    keywords: ['Burlington business consulting', 'Burlington QuickBooks', 'Vermont business services', 'Burlington payroll'],
    competitorCount: 4,
    opportunity: 'low'
  },

  // VIRGINIA
  {
    name: 'Virginia Beach',
    state: 'Virginia',
    stateCode: 'VA',
    county: 'Virginia Beach',
    population: 459470,
    latitude: 36.8529,
    longitude: -75.9780,
    zipCodes: ['23450', '23451', '23452', '23453', '23454', '23455', '23456', '23457', '23459', '23460', '23461', '23462', '23464', '23466', '23467', '23471', '23479'],
    metro: 'Virginia Beach-Norfolk-Newport News',
    region: 'Southeast',
    timezone: 'America/New_York',
    industries: ['Military', 'Tourism', 'Agriculture', 'Technology', 'Healthcare', 'Port Operations'],
    keywords: ['Virginia Beach business consulting', 'Virginia Beach QuickBooks', 'Virginia business services', 'Hampton Roads payroll'],
    competitorCount: 12,
    opportunity: 'high'
  },

  // WEST VIRGINIA
  {
    name: 'Charleston',
    state: 'West Virginia',
    stateCode: 'WV',
    county: 'Kanawha',
    population: 46536,
    latitude: 38.3498,
    longitude: -81.6326,
    zipCodes: ['25301', '25302', '25304', '25311', '25312', '25313', '25314', '25315', '25317', '25320', '25321', '25322', '25324', '25325', '25326', '25327', '25328', '25329', '25330', '25331', '25332', '25333', '25334', '25335', '25336', '25337', '25338', '25339', '25389', '25392', '25396'],
    metro: 'Charleston',
    region: 'Southeast',
    timezone: 'America/New_York',
    industries: ['Energy', 'Chemical', 'Government', 'Healthcare', 'Manufacturing', 'Tourism'],
    keywords: ['Charleston business consulting', 'Charleston QuickBooks', 'West Virginia business services', 'Charleston payroll'],
    competitorCount: 4,
    opportunity: 'low'
  },

  // WISCONSIN
  {
    name: 'Milwaukee',
    state: 'Wisconsin',
    stateCode: 'WI',
    county: 'Milwaukee',
    population: 577222,
    latitude: 43.0389,
    longitude: -87.9065,
    zipCodes: ['53201', '53202', '53203', '53204', '53205', '53206', '53207', '53208', '53209', '53210', '53211', '53212', '53213', '53214', '53215', '53216', '53217', '53218', '53219', '53220', '53221', '53222', '53223', '53224', '53225', '53226', '53227', '53228', '53233', '53234', '53235', '53237', '53244', '53259', '53263', '53267', '53268', '53274', '53278', '53288', '53290', '53293', '53295'],
    metro: 'Milwaukee-Waukesha',
    region: 'Midwest',
    timezone: 'America/Chicago',
    industries: ['Manufacturing', 'Healthcare', 'Finance', 'Technology', 'Food & Beverage', 'Transportation'],
    keywords: ['Milwaukee business consulting', 'Milwaukee QuickBooks', 'Wisconsin business services', 'Milwaukee payroll'],
    competitorCount: 15,
    opportunity: 'medium'
  },

  // WYOMING
  {
    name: 'Cheyenne',
    state: 'Wyoming',
    stateCode: 'WY',
    county: 'Laramie',
    population: 65132,
    latitude: 41.1400,
    longitude: -104.8197,
    zipCodes: ['82001', '82002', '82003', '82006', '82007', '82009', '82010'],
    metro: 'Cheyenne',
    region: 'Mountain West',
    timezone: 'America/Denver',
    industries: ['Government', 'Energy', 'Agriculture', 'Transportation', 'Military', 'Tourism'],
    keywords: ['Cheyenne business consulting', 'Cheyenne QuickBooks', 'Wyoming business services', 'Cheyenne payroll'],
    competitorCount: 3,
    opportunity: 'low'
  }
];

export const STATES = [
  { name: 'Alaska', code: 'AK', region: 'West', opportunities: 'low' },
  { name: 'Arizona', code: 'AZ', region: 'Southwest', opportunities: 'medium' },
  { name: 'Arkansas', code: 'AR', region: 'South', opportunities: 'medium' },
  { name: 'California', code: 'CA', region: 'West', opportunities: 'high' },
  { name: 'Colorado', code: 'CO', region: 'Mountain West', opportunities: 'medium' },
  { name: 'Connecticut', code: 'CT', region: 'Northeast', opportunities: 'medium' },
  { name: 'Delaware', code: 'DE', region: 'Northeast', opportunities: 'medium' },
  { name: 'Florida', code: 'FL', region: 'Southeast', opportunities: 'high' },
  { name: 'Georgia', code: 'GA', region: 'Southeast', opportunities: 'high' },
  { name: 'Hawaii', code: 'HI', region: 'West', opportunities: 'low' },
  { name: 'Idaho', code: 'ID', region: 'Mountain West', opportunities: 'low' },
  { name: 'Illinois', code: 'IL', region: 'Midwest', opportunities: 'high' },
  { name: 'Indiana', code: 'IN', region: 'Midwest', opportunities: 'medium' },
  { name: 'Iowa', code: 'IA', region: 'Midwest', opportunities: 'medium' },
  { name: 'Kansas', code: 'KS', region: 'Midwest', opportunities: 'medium' },
  { name: 'Kentucky', code: 'KY', region: 'Southeast', opportunities: 'medium' },
  { name: 'Louisiana', code: 'LA', region: 'South', opportunities: 'medium' },
  { name: 'Maine', code: 'ME', region: 'Northeast', opportunities: 'low' },
  { name: 'Maryland', code: 'MD', region: 'Northeast', opportunities: 'medium' },
  { name: 'Massachusetts', code: 'MA', region: 'Northeast', opportunities: 'high' },
  { name: 'Michigan', code: 'MI', region: 'Midwest', opportunities: 'medium' },
  { name: 'Minnesota', code: 'MN', region: 'Midwest', opportunities: 'medium' },
  { name: 'Mississippi', code: 'MS', region: 'South', opportunities: 'low' },
  { name: 'Missouri', code: 'MO', region: 'Midwest', opportunities: 'medium' },
  { name: 'Montana', code: 'MT', region: 'Mountain West', opportunities: 'low' },
  { name: 'Nebraska', code: 'NE', region: 'Midwest', opportunities: 'low' },
  { name: 'Nevada', code: 'NV', region: 'West', opportunities: 'medium' },
  { name: 'New Hampshire', code: 'NH', region: 'Northeast', opportunities: 'medium' },
  { name: 'New Jersey', code: 'NJ', region: 'Northeast', opportunities: 'high' },
  { name: 'New Mexico', code: 'NM', region: 'Southwest', opportunities: 'low' },
  { name: 'New York', code: 'NY', region: 'Northeast', opportunities: 'high' },
  { name: 'North Carolina', code: 'NC', region: 'Southeast', opportunities: 'high' },
  { name: 'North Dakota', code: 'ND', region: 'Midwest', opportunities: 'low' },
  { name: 'Ohio', code: 'OH', region: 'Midwest', opportunities: 'medium' },
  { name: 'Oklahoma', code: 'OK', region: 'South', opportunities: 'medium' },
  { name: 'Oregon', code: 'OR', region: 'West', opportunities: 'medium' },
  { name: 'Pennsylvania', code: 'PA', region: 'Northeast', opportunities: 'medium' },
  { name: 'Rhode Island', code: 'RI', region: 'Northeast', opportunities: 'low' },
  { name: 'South Carolina', code: 'SC', region: 'Southeast', opportunities: 'medium' },
  { name: 'South Dakota', code: 'SD', region: 'Midwest', opportunities: 'low' },
  { name: 'Tennessee', code: 'TN', region: 'Southeast', opportunities: 'medium' },
  { name: 'Texas', code: 'TX', region: 'South', opportunities: 'high' },
  { name: 'Utah', code: 'UT', region: 'Mountain West', opportunities: 'medium' },
  { name: 'Vermont', code: 'VT', region: 'Northeast', opportunities: 'low' },
  { name: 'Virginia', code: 'VA', region: 'Southeast', opportunities: 'high' },
  { name: 'Washington', code: 'WA', region: 'Pacific Northwest', opportunities: 'medium' },
  { name: 'West Virginia', code: 'WV', region: 'Southeast', opportunities: 'low' },
  { name: 'Wisconsin', code: 'WI', region: 'Midwest', opportunities: 'medium' },
  { name: 'Wyoming', code: 'WY', region: 'Mountain West', opportunities: 'low' }
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
