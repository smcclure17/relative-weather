import { DeltaCard, DeltaChart, Search } from "@/components";
import { DayCard } from "@/components/DayCard";
import { DeltaChartMobile } from "@/components/DeltaChartMobile";
import { useWeather } from "@/fetching";
import { Box, Paper, Stack, Theme, useMediaQuery } from "@mui/material";
import { allRegions, getRegionById, RegionId } from "@/regions";
import { Footer } from "@/components/Footer";

interface RegionScreenProps {
  regionId: string;
}

const Desktop = ({ regionId }: RegionScreenProps) => {
  const region = getRegionById(regionId as RegionId);
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
      <Stack>
        <Stack
          p={5}
          alignContent="center"
          flexWrap={"wrap"}
          justifyContent="center"
        >
          <Box paddingY={1} px={16}>
            <Search options={allRegions} value={region} />
          </Box>
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
        <Footer></Footer>
      </Stack>
    </Paper>
  );
};

const Mobile = ({ regionId }: RegionScreenProps) => {
  const region = getRegionById(regionId as RegionId);
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
      <Stack>
        <Stack p={3}>
          <Box paddingY={2} px={8}>
            <Search options={allRegions} value={region} />
          </Box>
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
        <Footer></Footer>
      </Stack>
    </Paper>
  );
};

export const HomePage = ({ regionId }: RegionScreenProps) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );
  return isMobile ? (
    <Mobile regionId={regionId} />
  ) : (
    <Desktop regionId={regionId} />
  );
};
