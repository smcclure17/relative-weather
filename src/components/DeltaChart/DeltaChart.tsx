import React from "react";
import { Box } from "@mui/material";
import { scaleLinear, scaleTime, scaleUtc } from "@visx/scale";
import { NotEmptyTimeseries, Timeseries } from "@/timeseries";
import { VoronoiLayout } from "../VoroinoiLayout";

export interface DeltaChartProps {
  data: NotEmptyTimeseries<number>;
  minWidth?: number;
  minHeight?: number;
  stroke?: string;
  strokeWidth?: number;
  shapeRendering?: string;
  strokeLinejoin?: string;
  margins?: { top: number; right: number; bottom: number; left: number };
}

export const DeltaChart = ({
  data,
  margins = { top: 20, right: 20, bottom: 20, left: 20 },
  minHeight = 400,
  minWidth = 700,
}: DeltaChartProps) => {
  const today = reIndexToHours(data.getDataForDate(new Date()));
  const yesterday = reIndexToHours(
    data.getDataForDate(new Date(Date.now() - 86400000))
  );
  const { min, max } = data;

  const xScale = scaleLinear({
    domain: [0, 24],
    range: [0, minWidth - margins.right],
  });

  const yScale = scaleLinear({
    domain: [min.value, max.value + (max.value - min.value) * 0.01],
    range: [minHeight - (margins.bottom + margins.top) , 0],
  });

  const days = [];
  for (let i = 0; i < 24; i++) {
    days.push({
      hour: i,
      today: today.find((d) => d.hour === i)?.value ?? 40,
      yesterday: yesterday.find((d) => d.hour === i)?.value ?? 40,
    });
  }

  return (
    <Box
      sx={{
        width: minWidth,
        height: minHeight,
        boxShadow: 0.8,
        borderRadius: 4,
        border: "1px solid #efefef",
        px: 2,
        py: 2,
        backgroundColor: "transparent",
      }}
    >
      <VoronoiLayout
        data={days}
        height={minHeight}
        width={minWidth}
        xScale={xScale}
        yScale={yScale}
        minValue={min.value}
        maxValue={max.value}
      />
    </Box>
  );
};

// TODO: rework timeseries to allow for more time structures?
const reIndexToHours = (timeseries: Timeseries<number>) => {
  const points = timeseries.points;
  return points
    .map((point) => {
      return { hour: point.time.getHours(), value: point.value };
    })
    .sort((a, b) => a.hour - b.hour);
};
