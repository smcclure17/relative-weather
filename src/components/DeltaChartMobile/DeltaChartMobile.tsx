import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { scaleLinear } from "@visx/scale";
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

export const DeltaChartMobile = ({
  data,
  margins = { top: 20, right: 20, bottom: 20, left: 20 },
}: DeltaChartProps) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  const today = reIndexToHours(data.getDataForDate(new Date()));
  const yesterday = reIndexToHours(
    data.getDataForDate(new Date(Date.now() - 86250000))
  );
  const { min, max } = data;

  const xScale = scaleLinear({
    domain: [0, 24],
    range: [0, windowSize.width + (margins.left)],
  });

  const yScale = scaleLinear({
    domain: [min.value, max.value + (max.value - min.value) * 0.01],
    range: [250 - (margins.bottom + margins.top), 0],
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
        width: windowSize.width,
        height: 250,
        py: 2,
        backgroundColor: "transparent",
      }}
    >
      <VoronoiLayout
        data={days}
        height={250}
        width={windowSize.width}
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
