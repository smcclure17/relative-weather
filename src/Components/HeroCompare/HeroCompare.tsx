import { Grid, Skeleton, TextField, Typography } from "@mui/material";

interface WeatherProps {
  delta: number | undefined;
}

export const HeroCompare = ({ delta }: WeatherProps) => {
  if (delta === undefined) {
    return <Skeleton height={500}></Skeleton>
  }
  const bgColor = delta < 0 ? "#008DB9" : "#E6534E"
  return (
    <Grid container style={{backgroundColor: bgColor, paddingBottom: 20}}>
      <Grid item xs={12}>
      <Typography variant="h1" align="center" color={"white"} paddingTop={5}>
          {`${(delta ? formatDelta(delta) : "-")}`}&deg;F
      </Typography>
      <Typography align="center" color="white" fontStyle="italic" fontWeight={100}>Compared to this time yesterday.</Typography>
      </Grid>
      </Grid>
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
      return "+ 0"
  }
}