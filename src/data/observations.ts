import { fetchJson } from "./utils"
import { rawObservation } from "./utils"
import { DateTime } from "luxon"

interface Observation {
    timestamp: DateTime,
    description: string,
    temperature: number | null

}

// TODO implement WeatherForecast class to fetch forecast projections,
// then combine with WeatherObservations in Weather
interface Forecast {
    timestamp: DateTime,
    description: string,
    temperature: number | null
}

export class WeatherObservations {
    
    readonly observations = WeatherObservations.parseRecentObservations(2)

    static async parseRecentObservations(days: number): Promise<Observation[]> {
        const rawData = await fetchJson<rawObservation>(`https://api.weather.gov/stations/KBOS/observations`);
        const dataRows: Observation[] = []
        const maxLookback = DateTime.now().minus({days: days})
        
        rawData["features"].forEach(feature=> {
            const date = DateTime.fromISO(feature["properties"]["timestamp"] as unknown as string)
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