import { DeltaCard, DeltaChart } from "@/components";
import { DayCard } from "@/components/DayCard";
import { DeltaChartMobile } from "@/components/DeltaChartMobile";
import { useWeather } from "@/fetching";
import { Paper, Stack, Theme, useMediaQuery } from "@mui/material";
import { NextPage } from "next";

const Desktop = () => {
  const { data, error } = useWeather();
  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!data) return null;
  const timeseries = data?.timeseries.removeNulls();
  if (!timeseries?.hasData()) return null;

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack p={5} alignContent="center">
        <Stack
          direction="row"
          spacing={4}
          my={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DeltaCard data={data} />
          <DayCard weatherDay={data.currentData} />
          <DayCard weatherDay={data.previousData} />
        </Stack>
        <DeltaChart data={timeseries} />
      </Stack>
    </Paper>
  );
};

const Mobile = () => {
  const { data, error } = useWeather();
  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!data) return null;
  const timeseries = data?.timeseries.removeNulls();
  if (!timeseries?.hasData()) return null;

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack p={5} alignContent="center">
        <Stack
          direction="column"
          spacing={4}
          my={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DeltaCard data={data} />
          <Stack direction={"row"} spacing={2} maxWidth="90%" alignItems={"center"}>
            <DayCard weatherDay={data.currentData}/>
            <DayCard weatherDay={data.previousData}/>
          </Stack>
        </Stack>
        <DeltaChartMobile data={timeseries} />
      </Stack>
    </Paper>
  );
};

export const HomePage: NextPage = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  return isMobile ? <Mobile /> : <Desktop />;
};
