import { Region } from "@/regions";
import { DateTime } from "luxon";

export interface WeatherApiFetcher<T> {
  weatherType: WeatherType;
  dataCache: { [region: string]: T[] };
  fetchWeatherData(region: Region): Promise<T[]>;
}

/**
 * Data or error type. Used to represent the result of an asynchronous operation.
 *
 * Can have three states:
 * - data: The operation was successful and the data is available
 * - error: The operation failed and the error is available
 * - !data && !error: The operation is still in progress / loading.
 */
export interface DataOrError<T> {
  data?: T;
  error?: Error;
}

export interface WeatherData {
  temperature: number;
  timestamp: DateTime;
  description: string;
  type: WeatherType;
}

export enum WeatherType {
  OBSERVATION = "observation",
  FORECAST = "forecast",
}

/**
 * Fetches data from a URL, parses it as JSON, and casts it to type T.
 *
 * @param url URL to fetch data from
 * @returns JSON data from the URL
 */
export async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return (await response.json()) as T;
}

export interface ObservationJson {
  "@context": Array<string>;
  type: string;
  features: FeatureJson[];
}

interface FeatureJson {
  id: string;
  type: string;
  geometry: Object;
  properties: Record<string, unknown>;
}

export function celsiusToFahrenheit(celsius: number): number {
  return celsius * (9 / 5) + 32;
}
