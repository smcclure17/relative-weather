import { Timeseries } from "@/timeseries";
import { DateTime } from "luxon";
import { useState, useEffect } from "react";
import { Forecasts, ForecastsProps } from "./forecasts";
import { Observations, ObservationsProps } from "./observations";
import { WeatherData } from "./utils";
import { DataOrError } from "./utils";

export interface Weather {
  timeseries: Timeseries<number>;
  currentData: WeatherData | undefined;
  previousData: WeatherData | undefined;
  delta: number | undefined;
}

/**
 * Fetches weather data from the API for both historical
 * (observations) and forecasted data.
 *
 * @param observationsProps Options to pass for Observations fetching
 * @param forecastsProps Options to pass for Forecasts fetching
 * @returns Weather data
 */
async function getWeatherData(
  observationsProps?: ObservationsProps,
  forecastsProps?: ForecastsProps
): Promise<Weather> {
  const observations = new Observations(observationsProps);
  const forecasts = new Forecasts(forecastsProps);
  const [observationsData, forecastsData] = await Promise.all([
    observations.fetchWeatherData(),
    forecasts.fetchWeatherData(),
  ]);
  const data = [...observationsData, ...forecastsData];

  const today = DateTime.now();
  const yesterday = today.minus({ days: 1 });
  const currentData = findMatchingOrClosestDate(data, today);
  const previousData = findMatchingOrClosestDate(data, yesterday);
  const delta = currentData.temperature - previousData.temperature;

  const timeseries = new Timeseries<number>(
    data.map((d) => ({ time: d.timestamp.toJSDate(), value: d.temperature }))
  )

  return { timeseries, currentData, previousData, delta };
}

/**
 * Hook to fetch weather data.
 *
 * @param observationsProps Options to pass for Observations fetching
 * @param forecastsProps Options to pass for Forecasts fetching
 * @returns Weather data
 */
export function useWeather(
  observationsProps?: ObservationsProps,
  forecastsProps?: ForecastsProps
): DataOrError<Weather> {
  const [weather, setWeather] = useState<DataOrError<Weather>>({});

  useEffect(() => {
    getWeatherData(observationsProps, forecastsProps)
      .then((data) => setWeather({ data }))
      .catch((error) => setWeather({ error }));
  }, [observationsProps, forecastsProps]);

  return weather;
}

/**
 * Finds the closest matching date in a list of WeatherData.
 *
 * @param records Data to find the closest match in.
 * @param date Date to find the closest match for.
 * @returns Record with the closest matching date.
 */
function findMatchingOrClosestDate(
  records: WeatherData[],
  date: DateTime
): WeatherData {
  const matches = records.filter((day) => day.timestamp === date);
  if (matches.length !== 0) {
    return matches[0];
  }
  const end = records.sort((a, b) => {
    return (
      Math.abs(date.valueOf() - a.timestamp.valueOf()) -
      Math.abs(date.valueOf() - b.timestamp.valueOf())
    );
  });
  return end[0];
}
