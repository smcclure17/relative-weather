import { WeatherObservations } from "./observations"
import { DateTime } from "luxon"

enum WeatherType {
    OBSERVATION,
    FORECAST
}

export interface WeatherDay {
    temperature: number,
    description: string,
    tag: WeatherType,
    timestamp: DateTime
}

export class Weather {

    static async create(): Promise<Weather> {
        const observations = new WeatherObservations().observations        
        const weatherDays: WeatherDay[] = []
        ;(await observations).forEach(observation => {
            if (observation.temperature != null) {
                // NOTE: in the future we'll have both observations (measured temps)
                // and forecasts (predicted temps) and we'll want to differentiate them.
                // For now, we only have observations, so just hard code them.
                weatherDays.push({
                    tag: WeatherType.OBSERVATION,
                    temperature: toFahrenheit(observation["temperature"]),
                    description: observation["description"],
                    timestamp: observation["timestamp"],
                })
            }
        })
        const today = DateTime.now()
        const nowWeather = findMatchingOrClosestDate(weatherDays, today)
        const prevDate = nowWeather.timestamp.minus({days: 1})
        const yesterdayWeather = findMatchingOrClosestDate(weatherDays, prevDate)
        // TODO: handle null/missing temperatures not like this lmao.
        const deltaWeather = (nowWeather?.temperature ?? 0) - (yesterdayWeather?.temperature ?? 0)
        return new Weather(weatherDays, nowWeather, yesterdayWeather, deltaWeather)
    }
    constructor (
        readonly timeseries: WeatherDay[], 
        readonly now: WeatherDay | undefined, 
        readonly yesterday: WeatherDay | undefined,
        readonly delta: number,
    ) {}
}

function findMatchingOrClosestDate(records: WeatherDay[], date: DateTime): WeatherDay {
    const matches = records.filter(day => day.timestamp === date)
    if (matches.length !== 0){
        return matches[0]
    }
    const end = records.sort((a, b) => {
        return Math.abs(date.valueOf() - a.timestamp.valueOf()) - Math.abs(date.valueOf() - b.timestamp.valueOf());
    })
    console.log(date, end[0].timestamp)
    return end[0]
}

// quick and dirty conversion to Fahrenheit
const toFahrenheit = (C: number) => {return ((C * 1.8) + 32).toFixed(1) as unknown as number}