import React, { useMemo, useCallback, useRef } from "react";
import { LinePath } from "@visx/shape";
import { withTooltip, Tooltip, TooltipWithBounds } from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { voronoi } from "@visx/voronoi";
import { localPoint } from "@visx/event";
import { curveLinear } from "@visx/curve";
import { Threshold } from "@visx/threshold";
import { Typography } from "@mui/material";
import { ScaleLinear } from "d3-scale";
import { Group } from "@visx/group";
import { PatternLines } from "@visx/pattern";

export type LineChartProps = {
  data: HourlyDatapoint[];
  width: number;
  height: number;
  xScale: ScaleLinear<number, number, never>;
  yScale: ScaleLinear<number, number, never>;
  minValue: number;
  maxValue: number;
  lastObservation: number;
};

interface HourlyDatapoint {
  hour: number;
  today: number;
  yesterday: number;
}

let tooltipTimeout: number;

export const LineChart = withTooltip<LineChartProps, HourlyDatapoint>(
  ({
    data,
    width,
    height,
    xScale,
    yScale,
    hideTooltip,
    showTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft,
    tooltipTop,
    maxValue,
    lastObservation,
  }: LineChartProps & WithTooltipProvidedProps<HourlyDatapoint>) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const LineChart = useMemo(
      () =>
        voronoi<HourlyDatapoint>({
          x: (d) => xScale(d.hour) ?? null,
          y: (d) => yScale(d.today) ?? null,
          width,
          height,
        })(data),
      [width, height, xScale, yScale, data]
    );

    // event handlers
    const handleMouseMove = useCallback(
      (event: React.MouseEvent | React.TouchEvent) => {
        if (tooltipTimeout) clearTimeout(tooltipTimeout);
        if (!svgRef.current) return;

        // find the nearest polygon to the current mouse position
        const point = localPoint(svgRef.current, event);
        if (!point) return;
        const neighborRadius = 500;
        const closest = LineChart.find(point.x, point.y, neighborRadius);
        if (closest) {
          showTooltip({
            tooltipLeft: xScale(closest.data.hour),
            tooltipTop: yScale(closest.data.today),
            tooltipData: closest.data,
          });
        }
      },
      [xScale, yScale, showTooltip, LineChart]
    );

    const handleMouseLeave = useCallback(() => {
      tooltipTimeout = window.setTimeout(() => {
        hideTooltip();
      }, 300);
    }, [hideTooltip]);

    return (
      <>
        <svg
          width={width}
          height={height}
          ref={svgRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseLeave}
        >
          <PatternLines
            id="blue-lines"
            height={10}
            width={10}
            stroke={"blue"}
            strokeWidth={2}
            orientation={["diagonal"]}
          />
          <PatternLines
            id="red-lines"
            height={10}
            width={10}
            stroke={"red"}
            strokeWidth={2}
            orientation={["diagonal"]}
          />
          <Threshold<HourlyDatapoint>
            id={`${Math.random()}`}
            data={data}
            x={(d) => xScale(d.hour)}
            y0={(d) => yScale(d.today)}
            y1={(d) => yScale(d.yesterday)}
            clipAboveTo={15000}
            clipBelowTo={0}
            curve={curveLinear}
            belowAreaProps={{
              fill: "url('#red-lines')",
              fillOpacity: 0.3,
            }}
            aboveAreaProps={{
              fill: "url('#blue-lines')", // blue
              fillOpacity: 0.3,
            }}
          />
          <LinePath
            data={data}
            x={(d) => xScale(d.hour)}
            y={(d) => yScale(d.yesterday)}
            curve={curveLinear}
            shapeRendering={"geometricPrecision"}
            strokeLinejoin={"round"}
            strokeWidth={3}
            stroke={"#ababab"}
          />
          <LinePath
            data={data.filter((d) => d.hour <= lastObservation)}
            x={(d) => xScale(d.hour)}
            y={(d) => yScale(d.today)}
            curve={curveLinear}
            shapeRendering={"geometricPrecision"}
            strokeLinejoin={"bevel"}
            stroke={"#444"}
            strokeWidth={3}
          />
          <LinePath
            data={data}
            x={(d) => xScale(d.hour)}
            y={(d) => yScale(d.today)}
            curve={curveLinear}
            shapeRendering={"geometricPrecision"}
            strokeLinejoin={"bevel"}
            stroke={"#444"}
            strokeWidth={3}
            strokeDasharray={"3 6"}
          />
          <Group>
            <line
              x1={xScale(1)}
              x2={xScale(2)}
              y1={yScale(maxValue - 1)}
              y2={yScale(maxValue - 1)}
              stroke={"#444"}
              strokeWidth={3}
            />
            <text
              fontFamily="Arial"
              fontSize={12}
              x={xScale(2.2)}
              y={yScale(maxValue - 1.2)}
            >
              today
            </text>
            <line
              x1={xScale(4.5)}
              x2={xScale(5.5)}
              y1={yScale(maxValue - 1)}
              y2={yScale(maxValue - 1)}
              stroke={"#ababab"}
              strokeWidth={3}
            />
            <text
              fontFamily="Arial"
              fontSize={12}
              x={xScale(5.7)}
              y={yScale(maxValue - 1.2)}
            >
              yesterday
            </text>
          </Group>
        </svg>
        {tooltipOpen &&
          tooltipData &&
          tooltipLeft != null &&
          tooltipTop != null && (
            <TooltipWithBounds left={tooltipLeft} top={tooltipTop}>
              <Typography color={"#ababab"} style={{ fontSize: "12px" }}>
                {hourNumberToHourString(tooltipData.hour)}
              </Typography>
              {tooltipData.hour > lastObservation && (
                <Typography fontStyle={"italic"}>Estimate</Typography>
              )}
              <Typography
                color={"#444"}
                style={{ fontSize: "24px", fontStyle: "bold" }}
              >
                {diffAndFormat(tooltipData.today, tooltipData.yesterday)} ºF
              </Typography>
              <Typography
                color={"#44"}
                style={{ fontSize: "12px", fontStyle: "italic" }}
              >
                today{" "}
                {tooltipData.hour <= lastObservation ? "was" : "will be"}{" "}
                {tooltipData.today.toPrecision(2)} ºF
              </Typography>
              <Typography
                color={"#444"}
                style={{ fontSize: "12px", fontStyle: "italic" }}
              >
                yesterday was {tooltipData.yesterday.toPrecision(2)} ºF
              </Typography>
            </TooltipWithBounds>
          )}
      </>
    );
  }
);

/**
 * convert hour to day time (e.g. 0 -> 12:00 AM or 12 -> 12:00 PM)
 * @param hour number between 0 and 23
 */
const hourNumberToHourString = (hour: number) => {
  const ampm = hour >= 12 ? "PM" : "AM";
  const hourString = hour % 12 || 12;
  return `${hourString}:00 ${ampm}`;
};

const diffAndFormat = (today: number, yesterday: number) => {
  const res = today - yesterday;
  return `${res > 0 ? "+" : ""}${res.toPrecision(2)}`;
};
