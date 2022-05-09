import { fetchJson } from "./utils"
import { rawObservation } from "./utils"

interface Observation {
    timestamp: number,
    description: string,
    temperature: number | null

}

// TODO implement WeatherForecast class to fetch forecast projections,
// then combine with WeatherObservations in Weather
interface Forecast {
    timestamp: number,
    description: string,
    temperature: number | null
}

export class WeatherObservations {
    
    readonly observations = WeatherObservations.parseRecentObservations(2)

    static async parseRecentObservations(days: number): Promise<Observation[]> {
        const rawData = await fetchJson<rawObservation>(`https://api.weather.gov/stations/KBOS/observations`);
        const dataRows: Observation[] = []
        const maxLookback = + new Date().setDate(new Date().getDate() - days)
        
        rawData["features"].forEach(feature=> {
            const date = Date.parse(feature["properties"]["timestamp"] as unknown as string)
            if (date > maxLookback) {
                dataRows.push({
                    description: feature["properties"]["textDescription"],
                    timestamp: date,
                    temperature: feature["properties"]["temperature"]["value"]
                })
            }
        });
        return dataRows
    }
} 