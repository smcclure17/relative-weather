import { WeatherObservations } from "./observations"

export interface WeatherDay {
    temperature: number,
    description: string,
    tag: string, // should be an enum: Forecast or Observation,
    timestamp: Date
}

export class Weather {

    static async create(): Promise<Weather> {
        const observations = new WeatherObservations().observations        
        const weatherDays: WeatherDay[] = []
        ;(await observations).forEach(observation => {
            // remove instances with no temperature, because what's the point of that :(
            if (observation.temperature != null) {
                weatherDays.push({
                    tag: "observation",
                    temperature: toFahrenheit(observation["temperature"]),
                    description: observation["description"],
                    timestamp: new Date(observation["timestamp"]),
                })
            }
        })
        const date = new Date()
        const nowWeather = findClosestDate(weatherDays, date)
        console.log("nowWeather", nowWeather.timestamp)
        // TODO: create yesterday date from nowWeather.timestamp
        // this below line isnt working as expected. its not using nowWeather.timestamp
        // const prevDate = date.setUTCDate(date.getUTCDate() -1);
        const yesterdayWeather = findClosestDate(weatherDays, nowWeather.timestamp)
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

function findClosestDate(records: WeatherDay[], date: Date): WeatherDay {
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