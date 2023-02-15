import { WeatherApiFetcher, WeatherType, WeatherData } from "./utils";

export interface ForecastsProps {
  /** URL to fetch data from */
  fetchUrl?: string;
  /** Furthest day in the past to fetch data for. Default 2.*/
  lookbackDays?: number;
}

export class Forecasts implements WeatherApiFetcher<WeatherData> {
  private readonly fetchUrl: string;
  private readonly lookbackDays: number;
  weatherType = WeatherType.FORECAST;
  dataCache: WeatherData[] = [];

  constructor(props?: ForecastsProps) {
    this.fetchUrl =
      props?.fetchUrl || "https://api.weather.gov/stations/KBOS/observations";
    this.lookbackDays = props?.lookbackDays || 2;
  }

  async fetchWeatherData(): Promise<WeatherData[]> {
    console.warn("Not Implemented");
    return [];
  }
}
