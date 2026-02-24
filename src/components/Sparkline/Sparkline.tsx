import { Box, Stack, Typography, useTheme } from "@mui/material";
import { areaElementClasses, chartsAxisHighlightClasses, lineElementClasses } from "@mui/x-charts";
import { SparkLineChart, type SparkLineChartProps } from "@mui/x-charts/SparkLineChart";
import { useState, type ReactNode } from "react";
import type { DataPoint } from "../../types";

const settings: Partial<SparkLineChartProps> = {
  baseline: "min",
  margin: { bottom: 0, top: 5, left: 4, right: 0 },
  yAxis: {
    domainLimit: (_, maxValue: number) => ({
      min: -maxValue / 6, //  Hack to add 5px bellow 0 like npm.
      max: maxValue,
    }),
  },
  slotProps: {
    lineHighlight: { r: 4 }, // Reduce the radius of the axis highlight.
  },
  clipAreaOffset: { top: 2, bottom: 2 },
  axisHighlight: { x: "line" },
};

export const Sparkline = ({ title, data, icon }: { title: string; data: Array<DataPoint>; icon: ReactNode }) => {
  const [weekIndex, setWeekIndex] = useState<null | number>(null);
  const { palette } = useTheme();

  const downloads = data.map((item) => item.downloads);
  const weeks = data.map((item) => `${item.start} to ${item.end}`);
  const isIncreasing = downloads[0] <= downloads[downloads.length - 1];
  const color = isIncreasing ? "success" : "error";

  return (
    <Box width="100%" display="flex" justifyContent="center" alignItems="center">
      <Stack direction="column" width="100%">
        <Stack direction="row" alignItems="flex-start" gap={1} alignContent="center">
          {icon}
          <Typography variant="subtitle2" lineHeight={1.5}>
            {title}
          </Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" gap={2} sx={{ containerType: "inline-size" }}>
          <Typography variant="h6" color="textSecondary">
            {downloads[weekIndex ?? downloads.length - 1].toLocaleString()}
          </Typography>
          <Box
            // Might be able to replace this with a simple percentage or something
            sx={{
              width: {
                "@500": "410px",
                "@400": "310px",
                "@300": "210px",
                "@250": "160px",
                "@200": "110px",
              },
            }}
          >
            <SparkLineChart
              data={downloads}
              xAxis={{ id: "week-axis", data: weeks }}
              height={40}
              area
              showHighlight
              color={palette[color].main}
              onHighlightedAxisChange={(axisItems) => {
                setWeekIndex(axisItems[0]?.dataIndex ?? null);
              }}
              sx={{
                [`& .${areaElementClasses.root}`]: { opacity: 0.2 },
                [`& .${lineElementClasses.root}`]: { strokeWidth: 3 },
                [`& .${chartsAxisHighlightClasses.root}`]: {
                  stroke: palette[color].light,
                  strokeDasharray: "none",
                  strokeWidth: 2,
                },
              }}
              highlightedAxis={weekIndex === null ? [] : [{ axisId: "week-axis", dataIndex: weekIndex }]}
              {...settings}
            />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};
