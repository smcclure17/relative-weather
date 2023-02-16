import { DateTime } from "luxon";
import { WeatherApiFetcher, WeatherType, WeatherData, fetchJson } from "./utils";

export interface ForecastsProps {
  /** URL to fetch data from */
  fetchUrl?: string;
  /** Furthest day in the past to fetch data for. Default 2.*/
  lookForwardDays?: number;
}

export class Forecasts implements WeatherApiFetcher<WeatherData> {
  private readonly fetchUrl: string;
  private readonly lookForwardDays: number;
  weatherType = WeatherType.FORECAST;
  dataCache: WeatherData[] = [];

  constructor(props?: ForecastsProps) {
    this.fetchUrl =
      props?.fetchUrl || `https://api.weather.gov/gridpoints/BOX/71,90/forecast/hourly`
    this.lookForwardDays = props?.lookForwardDays || 1;
  }

  async fetchWeatherData(): Promise<WeatherData[]> {
    const rawData = await fetchJson<any>(this.fetchUrl);
    const lookForward = DateTime.now().plus({ days: this.lookForwardDays });
    const dataRows: WeatherData[] = [];

    for (const feature of rawData.properties.periods) {
      const date = DateTime.fromISO(feature.startTime);
      if (date < lookForward) {
        dataRows.push({
          description: feature.shortForecast,
          timestamp: date,
          temperature: feature.temperature,
          type: this.weatherType,
        });
      }
    }
    return dataRows;
  }
}
