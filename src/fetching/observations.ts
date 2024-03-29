import {
  fetchJson,
  WeatherApiFetcher,
  ObservationJson,
  WeatherType,
  WeatherData,
  celsiusToFahrenheit,
} from "./utils";
import { DateTime } from "luxon";
import { Region } from "@/regions";

export interface ObservationsProps {
  /** URL to fetch data from */
  fetchUrl?: string;
  /** Furthest day in the past to fetch data for. Default 2.*/
  lookbackDays?: number;
}

export class Observations implements WeatherApiFetcher<WeatherData> {
  private readonly fetchUrl: string;
  private readonly lookbackDays: number;
  weatherType = WeatherType.OBSERVATION;
  dataCache: { [region: string]: WeatherData[] } = {};

  constructor(props?: ObservationsProps) {
    // Kinda hacky, but JS doesn't have template strings?
    this.fetchUrl = `https://api.weather.gov/stations/:station:/observations`;
    this.lookbackDays = props?.lookbackDays ?? 2;
  }

  async fetchWeatherData(region: Region): Promise<WeatherData[]> {
    if (this.dataCache[region.name]) {
      return this.dataCache[region.name];
    }

    const rawData = await fetchJson<ObservationJson>(
      this.fetchUrl.replace(":station:", region.observationStation)
    );
    const dataRows: WeatherData[] = [];
    const maxLookback = DateTime.now().minus({ days: this.lookbackDays });

    rawData["features"].forEach((feature: any) => {
      const date = DateTime.fromISO(
        feature["properties"]["timestamp"] as unknown as string
      );
      if (date > maxLookback && feature["properties"]["temperature"]["value"]) {
        dataRows.push({
          description: feature["properties"]["textDescription"],
          timestamp: date,
          temperature: celsiusToFahrenheit(
            feature["properties"]["temperature"]["value"]
          ),
          type: this.weatherType,
        });
      }
    });

    this.dataCache[region.name] = dataRows;
    return dataRows;
  }
}
