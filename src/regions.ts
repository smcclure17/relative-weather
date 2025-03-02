export enum RegionId {
  BOSTON = "boston",
  SEATTLE = "seattle",
  NEW_YORK = "new-york",
  AUSTIN = "austin",
  SAN_DIEGO = "san-diego",
}

export interface Region {
  name: string;
  shortName: string;
  observationStation: string;
  forecastLocation: string;
}

// To add a region:
// 1. Go to https://forecast.weather.gov/ and search the city
// 2. The observation station is under "Current conditions at <location name> (STATION)"
// 3. Click the "local forecast office" link to get the forecastLocation
// 4. Go to https://api.weather.gov/points/32.8571,-117.2733 with the lat lon to get the points
// 5. Forecast is {forecast station}/{gridX},{gridY}
export const regions = {
  [RegionId.BOSTON]: {
    shortName: "Boston",
    name: "Boston, MA",
    observationStation: "KBOS",
    forecastLocation: "BOX/71,90",
  },
  [RegionId.SEATTLE]: {
    shortName: "Seattle",
    name: "Seattle, WA",
    observationStation: "KSEA",
    forecastLocation: "SEW/124,67",
  },
  [RegionId.NEW_YORK]: {
    shortName: "New York",
    name: "New York, NY",
    observationStation: "KNYC",
    forecastLocation: "OKX/32,34",
  },
  [RegionId.AUSTIN]: {
    shortName: "Austin",
    name: "Austin, TX",
    observationStation: "KAUS",
    forecastLocation: "EWX/155,90",
  },
  [RegionId.SAN_DIEGO]: {
    shortName: "San Diego",
    name: "San Diego, CA",
    observationStation: "KSAN",
    forecastLocation: "SGX/54,21",
  },
};

export function getRegionById(id: RegionId): Region {
  const region = regions[id];
  if (!region) throw new Error(`Region ${id} not found.`);
  return region;
}

export const allRegions = Object.values(regions);
