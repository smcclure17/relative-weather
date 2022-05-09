
/** Fetches data from a URL, parses it as JSON, and casts it to type T. */
export async function fetchJson<T>(url: string): Promise<T> {
    const response = await fetch(url);
    return (await response.json()) as T;
}

export function formatTimeOfDay(stamp: number) {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const dtFormat = new Intl.DateTimeFormat('en', {
      timeStyle: 'short',
      timeZone: timezone,
    });
    
    return dtFormat.format(new Date(stamp));
}

  export const formatDate = (c: Date | undefined) => {
    if (c === undefined) {return "undefined"}
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        timeZone: timezone
    }
    const dtFormat = new Intl.DateTimeFormat('en', options)
    
    return dtFormat.format(c)
}

// Interfaces interpolated from API responses. I've removed some layers that are 
// unused and replaced them with generic Objects instead.
export interface rawObservation {
    "@context": Array<string>;
    type:       string;
    features:   Feature[];
}

interface Feature {
    id:         string;
    type:       string;
    geometry:   Object;
    properties: Properties;
}

interface Properties {
    "@id":                     string;
    "@type":                   string;
    elevation:                 Object;
    station:                   string;
    timestamp:                 Date;
    rawMessage:                string;
    textDescription:           string;
    icon:                      null | string;
    presentWeather:            PresentWeather[];
    temperature:               numericValue;
    dewpoint:                  numericValue;
    windDirection:             numericValue;
    windSpeed:                 numericValue;
    windGust:                  numericValue;
    numericValue:              numericValue;
    seaLevelPressure:          numericValue;
    visibility:                numericValue;
    maxTemperatureLast24Hours: Object;
    minTemperatureLast24Hours: Object;
    precipitationLastHour:     numericValue;
    precipitationLast3Hours:   numericValue;
    precipitationLast6Hours:   numericValue;
    relativeHumidity:          numericValue;
    windChill:                 numericValue;
    heatIndex:                 numericValue;
    cloudLayers:               Object[];
}

interface numericValue {
    unitCode:       string;
    value:          number | null;
    qualityControl: string;
}

interface PresentWeather {
    intensity: string | null;
    modifier:  null;
    weather:   string;
    rawString: string;
}


export interface rawForecastObservation {
    "@context": Array<string>;
    type:       string;
    properties:   ForecastProperties;
    geometry:   Object[]
}

interface Period {
    number: number;
    name: string;
    startTime: number;
    endTime: Date;
    isDaytime: boolean;
    temperature: number;
    temperatureUnit: string;
    temperatureTrend?: any;
    windSpeed: string;
    windDirection: string;
    icon: string;
    shortForecast: string;
    detailedForecast: string;
}

interface ForecastProperties {
    updated: Date;
    units: string;
    forecastGenerator: string;
    generatedAt: Date;
    updateTime: Date;
    validTimes: string;
    elevation: Object;
    periods: Period[];
}