import React from "react";
import { Box, Stack } from "@mui/system";
import { Typography } from "@mui/material";
import { Weather } from "@/fetching";

export interface DeltaCardProps {
  data?: Weather;
}

export const DeltaCard = ({ data }: DeltaCardProps) => {
  const isWarmer = data?.delta && data.delta > 0;
  const isWarmerText = isWarmer ? "WARMER" : "COOLER";
  return (
    <Box
      sx={{
        maxWidth: 300,
        minHeight: 100,
        borderRadius: 4,
        border: `2.5px solid ${isWarmer ? "red" : "blue"}`,
      }}
    >
      <Stack p={3}>
        <Typography fontStyle={"italic"}>In Boston, MA it is</Typography>
        <Stack direction="row" spacing={0}>
          <Typography variant="h1" color={"#444"} fontWeight={"bold"}>
            {data?.delta?.toPrecision(2)}
          </Typography>
          <Typography variant="h3" color={"#444"}>
            ºF
          </Typography>
        </Stack>
        <Typography fontStyle={"italic"}>
          <Typography
            fontSize={18}
            color={isWarmer ? "red" : "blue"}
            fontWeight={"bold"}
          >
            {isWarmerText}
          </Typography>
          than it was yesterday
        </Typography>
      </Stack>
    </Box>
  );
};
