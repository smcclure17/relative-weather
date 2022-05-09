import { Weather, WeatherDay } from "../../data/weather"
import { formatDate } from "../../data/utils"

interface WeatherProps {
  weather: Weather | undefined;
}

export const TemperatureChart = ({
  weather,
}: WeatherProps) => {
  // TODO create a line chart with timeseries data -- for now just lists all dates for QA.
  return (
    <ul>
        {weather?.timeseries.map((entry: WeatherDay, index) => (
          <li key={index}>
            {`${entry.temperature} ${formatDate(entry.timestamp)}`}
          </li>
        ))}
    </ul>
  );
};