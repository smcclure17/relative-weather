import { DeltaCard, Search } from "@/components";
import { useWeathers } from "@/fetching";
import {
  Box,
  Paper,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { NextPage } from "next";
import { allRegions, getRegionById, RegionId } from "@/regions";

const Desktop = () => {
  const regions = [
    getRegionById(RegionId.BOSTON),
    getRegionById(RegionId.SAN_DIEGO),
    getRegionById(RegionId.NEW_YORK),
  ];
  const { data, error } = useWeathers(regions);

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!data) return null;

  return (
    <Paper
      sx={{
        marginTop: "48px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        p={5}
        spacing={4}
        alignContent="center"
        flexWrap={"wrap"}
        justifyContent="center"
        textAlign={"center"}
      >
        <Stack>
          <Typography variant="h3">Choose your city</Typography>
          <Typography variant="body1" color={"GrayText"}>
            In the future, this city will be selected automatically{" "}
          </Typography>
        </Stack>

        <Box paddingTop={2} px={16}>
          <Search options={allRegions} />
        </Box>
        <Stack
          direction="column"
          spacing={4}
          py={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" color={"GrayText"}>
            Cities at a glance
          </Typography>
          <Stack direction={"row"} spacing={4}>
            <DeltaCard data={data[0]} regionName={regions[0].name} />
            <DeltaCard data={data[1]} regionName={regions[1].name} />
            <DeltaCard data={data[2]} regionName={regions[2].name} />
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

const Mobile = () => {
  const regions = [
    getRegionById(RegionId.BOSTON),
    getRegionById(RegionId.SAN_DIEGO),
    getRegionById(RegionId.NEW_YORK),
  ];
  const { data, error } = useWeathers(regions);

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (!data) return null;

  return (
    <Paper
      sx={{
        paddingTop: "72px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack p={3}>
        <Stack
          direction={"row"}
          spacing={4}
          margin="auto"
          alignContent="center"
          justifyContent={"center"}
          flexWrap={"wrap"}
          rowGap={2}
        >
          <Stack spacing={2} textAlign={"center"}>
            <Typography variant="h3">Choose your city</Typography>
            <Typography px={2} variant="body1" color={"GrayText"}>
              In the future, this city will be selected automatically{" "}
            </Typography>
          </Stack>
        </Stack>

        <Box paddingTop={4} px={6}>
          <Search options={allRegions} />
        </Box>

        <Stack
          direction="column"
          spacing={4}
          py={8}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" color={"GrayText"}>
            Cities at a glance
          </Typography>
          <Stack direction={"column"} spacing={4}>
            <DeltaCard data={data[0]} regionName={regions[0].name} />
            <DeltaCard data={data[1]} regionName={regions[1].name} />
            <DeltaCard data={data[2]} regionName={regions[2].name} />
          </Stack>
        </Stack>
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
