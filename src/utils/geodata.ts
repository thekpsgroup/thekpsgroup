// src/utils/geodata.ts

interface GeoData {
  latitude: string;
  longitude: string;
  zipCodes: number[];
  county: string;
}

const GEO_DATA: Record<string, GeoData> = {
  "Allen": {
    latitude: "33.1032",
    longitude: "-96.6706",
    zipCodes: [75002, 75013],
    county: "Collin",
  },
  "Arlington": {
    latitude: "32.7357",
    longitude: "-97.1081",
    zipCodes: [76001, 76002, 76010, 76011, 76012, 76013, 76014, 76015, 76016, 76017, 76018],
    county: "Tarrant",
  },
  "Bedford": {
    latitude: "32.8440",
    longitude: "-97.1431",
    zipCodes: [76021, 76022, 76095],
    county: "Tarrant",
  },
  "Carrollton": {
    latitude: "32.9756",
    longitude: "-96.8899",
    zipCodes: [75006, 75007, 75010],
    county: "Dallas",
  },
  "Cedar Hill": {
    latitude: "32.5885",
    longitude: "-96.9561",
    zipCodes: [75104, 75106],
    county: "Dallas",
  },
  "Dallas": {
    latitude: "32.7767",
    longitude: "-96.7970",
    zipCodes: [75201, 75202, 75203, 75204, 75205, 75206, 75207, 75208, 75209, 75210, 75211, 75212, 75214, 75215, 75216, 75217, 75218, 75219, 75220, 75223, 75224, 75225, 75226, 75227, 75228, 75229, 75230, 75231, 75232, 75233, 75234, 75235, 75236, 75237, 75238, 75240, 75241, 75243, 75244, 75246, 75247, 75248, 75249, 75251, 75252, 75253, 75254, 75287],
    county: "Dallas",
  },
  "Denton": {
    latitude: "33.2148",
    longitude: "-97.1331",
    zipCodes: [76201, 76205, 76207, 76208, 76209, 76210],
    county: "Denton",
  },
  "Euless": {
    latitude: "32.8371",
    longitude: "-97.0810",
    zipCodes: [76039, 76040],
    county: "Tarrant",
  },
  "Flower Mound": {
    latitude: "33.0146",
    longitude: "-97.0969",
    zipCodes: [75022, 75028],
    county: "Denton",
  },
  "Fort Worth": {
    latitude: "32.7555",
    longitude: "-97.3308",
    zipCodes: [76102, 76103, 76104, 76105, 76106, 76107, 76108, 76109, 76110, 76111, 76112, 76114, 76115, 76116, 76117, 76118, 76119, 76120, 76123, 76126, 76127, 76129, 76131, 76132, 76133, 76134, 76135, 76137, 76140, 76148, 76155, 76164, 76177, 76179, 76180, 76182],
    county: "Tarrant",
  },
  "Frisco": {
    latitude: "33.1507",
    longitude: "-96.8236",
    zipCodes: [75033, 75034, 75035, 75036],
    county: "Collin",
  },
  "Garland": {
    latitude: "32.9126",
    longitude: "-96.6389",
    zipCodes: [75040, 75041, 75042, 75043, 75044, 75045],
    county: "Dallas",
  },
  "Grand Prairie": {
    latitude: "32.7459",
    longitude: "-96.9978",
    zipCodes: [75050, 75051, 75052, 75053, 75054],
    county: "Dallas",
  },
  "Grapevine": {
    latitude: "32.9343",
    longitude: "-97.0781",
    zipCodes: [76051, 76092, 76099],
    county: "Tarrant",
  },
  "Irving": {
    latitude: "32.8140",
    longitude: "-96.9489",
    zipCodes: [75038, 75039, 75060, 75061, 75062, 75063],
    county: "Dallas",
  },
  "Lancaster": {
    latitude: "32.5921",
    longitude: "-96.7561",
    zipCodes: [75134, 75146],
    county: "Dallas",
  },
  "Lewisville": {
    latitude: "33.0462",
    longitude: "-96.9942",
    zipCodes: [75029, 75057, 75067, 75077],
    county: "Denton",
  },
  "Mansfield": {
    latitude: "32.5632",
    longitude: "-97.1417",
    zipCodes: [76063],
    county: "Tarrant",
  },
  "McKinney": {
    latitude: "33.1972",
    longitude: "-96.6398",
    zipCodes: [75069, 75070, 75071],
    county: "Collin",
  },
  "Mesquite": {
    latitude: "32.7668",
    longitude: "-96.5992",
    zipCodes: [75149, 75150, 75181, 75185, 75187],
    county: "Dallas",
  },
  "Plano": {
    latitude: "33.0198",
    longitude: "-96.6989",
    zipCodes: [75023, 75024, 75025, 75026, 75074, 75075, 75086, 75093, 75094],
    county: "Collin",
  },
  "Richardson": {
    latitude: "32.9482",
    longitude: "-96.7297",
    zipCodes: [75080, 75081, 75082, 75083],
    county: "Dallas",
  },
  "Royse City": {
    latitude: "32.9767",
    longitude: "-96.3339",
    zipCodes: [75189],
    county: "Rockwall",
  },
  "Southlake": {
    latitude: "32.9412",
    longitude: "-97.1342",
    zipCodes: [76092],
    county: "Tarrant",
  },
};

export function getLatLngForCity(city: string): { latitude: string; longitude: string } | null {
  const data = GEO_DATA[city];
  return data ? { latitude: data.latitude, longitude: data.longitude } : null;
}

export function getZipCodesForCity(city: string): number[] | null {
  return GEO_DATA[city]?.zipCodes ?? null;
}

export function getCountyForCity(city: string): string | null {
  return GEO_DATA[city]?.county ?? null;
}
