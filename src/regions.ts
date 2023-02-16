export enum RegionId {
  BOSTON = "boston",
  SEATTLE = "seattle",
  NEW_YORK = "new-york",
  AUSTIN = "austin",
}

export interface Region {
  name: string;
  shortName: string;
  observationStation: string;
  forecastLocation: string;
}

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
};

export function getRegionById(id: RegionId): Region {
  const region = regions[id];
    if (!region) throw new Error(`Region ${id} not found.`);
    return region;
}

export const allRegions = Object.values(regions);