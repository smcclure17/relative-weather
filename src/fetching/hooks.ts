import { Region } from "@/regions";
import { Timeseries } from "@/timeseries";
import { DateTime } from "luxon";
import { useState, useEffect } from "react";
import { Forecasts, ForecastsProps } from "./forecasts";
import { Observations, ObservationsProps } from "./observations";
import { WeatherData } from "./utils";
import { DataOrError } from "./utils";

export interface Weather {
  /* Timeseries of temperature data */
  timeseries: Timeseries<number>;
  /* Today's weather data */
  currentData: WeatherData | undefined;
  /* Yesterday's weather data */
  previousData: WeatherData | undefined;
  /* Temperature change between today and yesterday */
  delta: number | undefined;
  /* Last hour of observations for today.
   * All points after this hour for the current day are forecasts.
   */
  lastObservationHour: number;
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
  region: Region,
  observationsProps?: ObservationsProps,
  forecastsProps?: ForecastsProps
): Promise<Weather> {
  const observations = new Observations(observationsProps);
  const forecasts = new Forecasts(forecastsProps);
  const [observationsData, forecastsData] = await Promise.all([
    observations.fetchWeatherData(region),
    forecasts.fetchWeatherData(region),
  ]);
  const data = [observationsData, forecastsData].flat();

  const lastObservationHour = Math.max(
    ...observationsData
      .filter((d) => d.timestamp.day === DateTime.now().day)
      .map((d) => d.timestamp.hour)
  );
  const today = DateTime.now();
  const yesterday = today.minus({ days: 1 });
  const currentData = findMatchingOrClosestDate(observationsData, today);
  const previousData = findMatchingOrClosestDate(observationsData, yesterday);
  const delta = currentData.temperature - previousData.temperature;

  const timeseries = new Timeseries<number>(
    data.map((d) => ({ time: d.timestamp.toJSDate(), value: d.temperature }))
  );

  return { timeseries, currentData, previousData, delta, lastObservationHour };
}

/**
 * Hook to fetch weather data.
 *
 * @param observationsProps Options to pass for Observations fetching
 * @param forecastsProps Options to pass for Forecasts fetching
 * @returns Weather data
 */
export function useWeather(
  region: Region,
  observationsProps?: ObservationsProps,
  forecastsProps?: ForecastsProps
): DataOrError<Weather> {
  const [weather, setWeather] = useState<DataOrError<Weather>>({});

  useEffect(() => {
    getWeatherData(region, observationsProps, forecastsProps)
      .then((data) => setWeather({ data }))
      .catch((error) => setWeather({ error }));
  }, [observationsProps, forecastsProps, region]);

  return weather;
}

export function useWeathers(regions: Region[]) {
  const [weathers, setWeathers] = useState<DataOrError<Weather[]>>({});

  useEffect(() => {
    Promise.all(regions.map((region) => getWeatherData(region)))
      .then((data) => setWeathers({ data }))
      .catch((e) => setWeathers({ error: e }));
  }, [regions]);

  return weathers;
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

export enum StorageType {
  LOCAL_STORAGE = "localStorage",
  SESSION_STORAGE = "sessionStorage",
}

// a single place to define all used localStorage keys, to avoid collisions or hardcoded strings
export enum StorageKeys {
  DEFAULT_CITY = "DEFAULT_CITY",
}

const storageMemo: { [index: string]: boolean } = {};

// From https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#testing_for_availability
export function storageAvailable(storageType: StorageType) {
  if (!(storageType in storageMemo)) {
    let storage;
    const testKey = "__storage_test__";
    try {
      // @ts-ignore
      storage = window[storageType];
      storage.setItem(testKey, testKey);
      storage.removeItem(testKey);
      storageMemo[storageType] = true;
    } catch (e) {
      storageMemo[storageType] = false;
    }
  }
  return storageMemo[storageType];
}

/*!
   License: https://github.com/uidotdev/usehooks/blob/master/LICENSE
   Hook from https://usehooks.com/useLocalStorage/
   but updated to fallback to setState if localstorage is not available.
  */
export function useLocalStorage<T>(
  key: StorageKeys,
  initialValue?: T
): [T, (value: T) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    let item;
    try {
      if (storageAvailable(StorageType.LOCAL_STORAGE)) {
        item = window.localStorage.getItem(key);
        item = item ? JSON.parse(item) : initialValue;
      } else {
        item = initialValue;
      }
    } catch (error) {
      item = initialValue;
    }
    return item;
  });
  // Return a wrapped version of useState's setter function that persists the new value to localStorage.
  const setValue = (value: T) => {
    // Allow value to be a function so we have same API as useState
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    try {
      window.localStorage.setItem(key as string, JSON.stringify(valueToStore));
    } finally {
      // A more advanced implementation would handle the error case
      setStoredValue(valueToStore);
    }
  };
  if (storageAvailable(StorageType.LOCAL_STORAGE)) {
    return [storedValue, setValue];
  } else {
    return [storedValue, setStoredValue];
  }
}
