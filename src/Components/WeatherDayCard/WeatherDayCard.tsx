import { WeatherDay, WeatherType } from "../../data/weather";
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { formatTimeOfDay } from "../../data/utils";

interface weatherDayCardProps {
	weatherDay: WeatherDay | undefined
}

export const WeatherDayCard = ({ weatherDay }: weatherDayCardProps) => {
	if (weatherDay === undefined) {
		return <></>
	}
  return (
    <Card sx={{maxWidth: 200}} elevation={0} variant="outlined">
      <CardContent>
        <Typography sx={{ fontSize: 14, fontStyle: "italic"}} color="text.secondary" gutterBottom>
          {weatherDay.timestamp.toRelativeCalendar()}, {formatTimeOfDay(weatherDay.timestamp.toMillis())}
        </Typography>
        <Typography variant="h3" component="div" color={"#444"}>
          {weatherDay.temperature}&deg;F
        </Typography>
      </CardContent>
    </Card>
  );
}
