import { DeltaCard, DeltaChart } from "@/components";
import { DayCard } from "@/components/DayCard";
import { DeltaChartMobile } from "@/components/DeltaChartMobile";
import { useWeather } from "@/fetching";
import {
  Button,
  Divider,
  Paper,
  Stack,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";
import {
  allRegions,
  getRegionById,
  Region,
  RegionId,
  regions,
} from "@/regions";

const Desktop = () => {
  const boston = getRegionById(RegionId.BOSTON);
  // TODO: use local storage to persist region across sessions.
  const [region, setRegion] = useState<Region>(boston);
  const { data, error } = useWeather(region);

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
        <Stack direction={"row"} spacing={2} margin="auto">
          {allRegions.map((region) => {
            return (
              <Button
                key={region.shortName}
                color="secondary"
                variant="outlined"
                onClick={() => setRegion(region)}
              >
                {region.name}
              </Button>
            );
          })}
        </Stack>
        <Divider sx={{ marginTop: 4 }} />
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
          <DeltaCard data={data} regionName={region.name} />
          <DayCard weatherDay={data.currentData} />
          <DayCard weatherDay={data.previousData} />
        </Stack>
        <DeltaChart
          data={timeseries}
          lastObservation={data.lastObservationHour}
        />
      </Stack>
    </Paper>
  );
};

const Mobile = () => {
  const boston = getRegionById(RegionId.BOSTON);
  const [region, setRegion] = useState<Region>(boston);
  const { data, error } = useWeather(region);
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
        <Stack direction={"row"} spacing={2} alignItems="center" margin="auto">
          {allRegions.map((region) => {
            return (
              <Button
                key={region.shortName}
                color="secondary"
                variant="outlined"
                size="small"
                onClick={() => setRegion(region)}
              >
                {region.shortName}
              </Button>
            );
          })}
        </Stack>
        <Divider sx={{ marginTop: 4 }} />
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
          <DeltaCard data={data} regionName={region.name} />
          <Stack
            direction={"row"}
            spacing={2}
            maxWidth="90%"
            alignItems={"center"}
          >
            <DayCard weatherDay={data.currentData} />
            <DayCard weatherDay={data.previousData} />
          </Stack>
        </Stack>
        <DeltaChartMobile
          data={timeseries}
          lastObservation={data.lastObservationHour}
        />
      </Stack>
    </Paper>
  );
};

export const HomePage: NextPage = () => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  return isMobile ? <Mobile /> : <Desktop />;
};
