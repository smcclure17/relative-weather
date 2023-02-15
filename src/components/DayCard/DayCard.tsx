import * as React from "react";
import { WeatherData } from "@/fetching/utils";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface DayCardProps {
  weatherDay: WeatherData | undefined;
  maxWidth?: number | string;
}

export const DayCard = ({ weatherDay, maxWidth }: DayCardProps) => {
  if (weatherDay === undefined) {
    return <></>;
  }
  return (
    <Card sx={{ width: 175, maxWidth }} elevation={0} variant="outlined">
      <CardContent>
        <Typography
          sx={{ fontSize: 14, fontStyle: "italic" }}
          color="text.secondary"
          gutterBottom
        >
          {weatherDay.timestamp.toRelativeCalendar()},{" "}
          {formatTimeOfDay(weatherDay.timestamp.toMillis())}
        </Typography>
        <Typography variant="h3" component="div" color={"#444"}>
          {weatherDay.temperature.toPrecision(2)}&deg;F
        </Typography>
      </CardContent>
    </Card>
  );
};

function formatTimeOfDay(stamp: number) {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dtFormat = new Intl.DateTimeFormat("en", {
    timeStyle: "short",
    timeZone: timezone,
  });

  return dtFormat.format(new Date(stamp));
}
