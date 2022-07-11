import { Weather, WeatherDay } from "../../data/weather"
import { formatDate } from "../../data/utils"
import * as d3 from 'd3'

interface WeatherProps {
  weather: Weather | undefined;
}

export const TemperatureChart = ({
  weather,
}: WeatherProps) => {
  // TODO create a line chart with timeseries data -- for now just lists all dates for QA.
};