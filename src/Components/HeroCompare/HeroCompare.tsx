import { Weather } from "../../data/weather"
import { Box, Typography } from "@mui/material";
import { formatDate } from "../../data/utils"

interface WeatherProps {
  weather: Weather | undefined;
}

export const HeroCompare = ({
  weather,
}: WeatherProps) => {
  return (
    <Box>
      <Typography variant="h1" align="center">
          {`${(weather?.delta ? formatDelta(weather?.delta) : "undefined")}`}&deg;F
      </Typography>
      <Typography align="center">
          {`Current Temperature ${(weather?.now?.temperature ?? "undefined")}`}&deg;F
      </Typography>
      <Typography align="center">
          {`Yesterday's Temperature ${weather?.yesterday?.temperature ?? "undefined"}`}&deg;F
      </Typography>
      <div>
        <Typography align="center">Time of observations:</Typography>
        <Typography>{`Today: ${formatDate(weather?.now?.timestamp)} Yesterday: ${formatDate(weather?.yesterday?.timestamp)}`}</Typography>
      </div>
    </Box>
  );
};



function formatDelta(delta: number): string {
  if (delta < 0) {
      return delta.toFixed()
  }
  else if (delta > 0) {
      return "+" + delta.toFixed()
  }
  else {
      return "+0"
  }
}