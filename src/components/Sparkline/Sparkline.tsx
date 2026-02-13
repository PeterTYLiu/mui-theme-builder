import { Box, Stack, Typography, useTheme } from "@mui/material";
import {
  areaElementClasses,
  chartsAxisHighlightClasses,
  lineElementClasses,
} from "@mui/x-charts";
import {
  SparkLineChart,
  type SparkLineChartProps,
} from "@mui/x-charts/SparkLineChart";
import { useState, type ReactNode } from "react";

interface datum {
  downloads: number;
  weekId: string;
  start: string;
  end: string;
}

export const FAKE_DATA_1: Array<datum> = [
  {
    downloads: 182767,
    weekId: "2024-38",
    start: "2024-09-16",
    end: "2024-09-22",
  },
  {
    downloads: 197921,
    weekId: "2024-39",
    start: "2024-09-23",
    end: "2024-09-29",
  },
  {
    downloads: 204966,
    weekId: "2024-40",
    start: "2024-09-30",
    end: "2024-10-06",
  },
  {
    downloads: 209437,
    weekId: "2024-41",
    start: "2024-10-07",
    end: "2024-10-13",
  },
  {
    downloads: 207660,
    weekId: "2024-42",
    start: "2024-10-14",
    end: "2024-10-20",
  },
  {
    downloads: 224221,
    weekId: "2024-43",
    start: "2024-10-21",
    end: "2024-10-27",
  },
  {
    downloads: 218456,
    weekId: "2024-44",
    start: "2024-10-28",
    end: "2024-11-03",
  },
  {
    downloads: 220470,
    weekId: "2024-45",
    start: "2024-11-04",
    end: "2024-11-10",
  },
  {
    downloads: 222240,
    weekId: "2024-46",
    start: "2024-11-11",
    end: "2024-11-17",
  },
  {
    downloads: 243266,
    weekId: "2024-47",
    start: "2024-11-18",
    end: "2024-11-24",
  },
  {
    downloads: 217809,
    weekId: "2024-48",
    start: "2024-11-25",
    end: "2024-12-01",
  },
  {
    downloads: 239869,
    weekId: "2024-49",
    start: "2024-12-02",
    end: "2024-12-08",
  },
  {
    downloads: 254907,
    weekId: "2024-50",
    start: "2024-12-09",
    end: "2024-12-15",
  },
  {
    downloads: 256494,
    weekId: "2024-51",
    start: "2024-12-16",
    end: "2024-12-22",
  },
  {
    downloads: 126407,
    weekId: "2024-52",
    start: "2024-12-23",
    end: "2024-12-29",
  },
  {
    downloads: 48203,
    weekId: "2024-1",
    start: "2024-12-30",
    end: "2024-12-31",
  },
  {
    downloads: 91666,
    weekId: "2025-1",
    start: "2025-01-01",
    end: "2025-01-05",
  },
  {
    downloads: 256972,
    weekId: "2025-2",
    start: "2025-01-06",
    end: "2025-01-12",
  },
  {
    downloads: 261140,
    weekId: "2025-3",
    start: "2025-01-13",
    end: "2025-01-19",
  },
  {
    downloads: 279179,
    weekId: "2025-4",
    start: "2025-01-20",
    end: "2025-01-26",
  },
  {
    downloads: 288048,
    weekId: "2025-5",
    start: "2025-01-27",
    end: "2025-02-02",
  },
  {
    downloads: 311378,
    weekId: "2025-6",
    start: "2025-02-03",
    end: "2025-02-09",
  },
  {
    downloads: 285621,
    weekId: "2025-7",
    start: "2025-02-10",
    end: "2025-02-16",
  },
  {
    downloads: 305811,
    weekId: "2025-8",
    start: "2025-02-17",
    end: "2025-02-23",
  },
  {
    downloads: 326075,
    weekId: "2025-9",
    start: "2025-02-24",
    end: "2025-03-02",
  },
  {
    downloads: 331595,
    weekId: "2025-10",
    start: "2025-03-03",
    end: "2025-03-09",
  },
  {
    downloads: 341198,
    weekId: "2025-11",
    start: "2025-03-10",
    end: "2025-03-16",
  },
  {
    downloads: 349635,
    weekId: "2025-12",
    start: "2025-03-17",
    end: "2025-03-23",
  },
  {
    downloads: 346696,
    weekId: "2025-13",
    start: "2025-03-24",
    end: "2025-03-30",
  },
  {
    downloads: 345318,
    weekId: "2025-14",
    start: "2025-03-31",
    end: "2025-04-06",
  },
  {
    downloads: 345071,
    weekId: "2025-15",
    start: "2025-04-07",
    end: "2025-04-13",
  },
  {
    downloads: 321835,
    weekId: "2025-16",
    start: "2025-04-14",
    end: "2025-04-20",
  },
];

export const FAKE_DATA_2: Array<datum> = [
  {
    downloads: 398,
    weekId: "2024-38",
    start: "2024-09-16",
    end: "2024-09-22",
  },
  {
    downloads: 362,
    weekId: "2024-39",
    start: "2024-09-23",
    end: "2024-09-29",
  },
  {
    downloads: 371,
    weekId: "2024-40",
    start: "2024-09-30",
    end: "2024-10-06",
  },
  {
    downloads: 423,
    weekId: "2024-41",
    start: "2024-10-07",
    end: "2024-10-13",
  },
  {
    downloads: 356,
    weekId: "2024-42",
    start: "2024-10-14",
    end: "2024-10-20",
  },
  {
    downloads: 348,
    weekId: "2024-43",
    start: "2024-10-21",
    end: "2024-10-27",
  },
  {
    downloads: 382,
    weekId: "2024-44",
    start: "2024-10-28",
    end: "2024-11-03",
  },
  {
    downloads: 337,
    weekId: "2024-45",
    start: "2024-11-04",
    end: "2024-11-10",
  },
  {
    downloads: 411,
    weekId: "2024-46",
    start: "2024-11-11",
    end: "2024-11-17",
  },
  {
    downloads: 389,
    weekId: "2024-47",
    start: "2024-11-18",
    end: "2024-11-24",
  },
  {
    downloads: 367,
    weekId: "2024-48",
    start: "2024-11-25",
    end: "2024-12-01",
  },
  {
    downloads: 324,
    weekId: "2024-49",
    start: "2024-12-02",
    end: "2024-12-08",
  },
  {
    downloads: 379,
    weekId: "2024-50",
    start: "2024-12-09",
    end: "2024-12-15",
  },
  {
    downloads: 353,
    weekId: "2024-51",
    start: "2024-12-16",
    end: "2024-12-22",
  },
  {
    downloads: 341,
    weekId: "2024-52",
    start: "2024-12-23",
    end: "2024-12-29",
  },
  {
    downloads: 298,
    weekId: "2024-1",
    start: "2024-12-30",
    end: "2024-12-31",
  },
  {
    downloads: 364,
    weekId: "2025-1",
    start: "2025-01-01",
    end: "2025-01-05",
  },
  {
    downloads: 405,
    weekId: "2025-2",
    start: "2025-01-06",
    end: "2025-01-12",
  },
  {
    downloads: 372,
    weekId: "2025-3",
    start: "2025-01-13",
    end: "2025-01-19",
  },
  {
    downloads: 331,
    weekId: "2025-4",
    start: "2025-01-20",
    end: "2025-01-26",
  },
  {
    downloads: 358,
    weekId: "2025-5",
    start: "2025-01-27",
    end: "2025-02-02",
  },
  {
    downloads: 316,
    weekId: "2025-6",
    start: "2025-02-03",
    end: "2025-02-09",
  },
  {
    downloads: 343,
    weekId: "2025-7",
    start: "2025-02-10",
    end: "2025-02-16",
  },
  {
    downloads: 388,
    weekId: "2025-8",
    start: "2025-02-17",
    end: "2025-02-23",
  },
  {
    downloads: 309,
    weekId: "2025-9",
    start: "2025-02-24",
    end: "2025-03-02",
  },
  {
    downloads: 327,
    weekId: "2025-10",
    start: "2025-03-03",
    end: "2025-03-09",
  },
  {
    downloads: 351,
    weekId: "2025-11",
    start: "2025-03-10",
    end: "2025-03-16",
  },
  {
    downloads: 305,
    weekId: "2025-12",
    start: "2025-03-17",
    end: "2025-03-23",
  },
  {
    downloads: 336,
    weekId: "2025-13",
    start: "2025-03-24",
    end: "2025-03-30",
  },
  {
    downloads: 319,
    weekId: "2025-14",
    start: "2025-03-31",
    end: "2025-04-06",
  },
  {
    downloads: 292,
    weekId: "2025-15",
    start: "2025-04-07",
    end: "2025-04-13",
  },
  {
    downloads: 311,
    weekId: "2025-16",
    start: "2025-04-14",
    end: "2025-04-20",
  },
];

export const FAKE_DATA_3: Array<datum> = [
  {
    downloads: 82,
    weekId: "2024-38",
    start: "2024-09-16",
    end: "2024-09-22",
  },
  {
    downloads: 65,
    weekId: "2024-39",
    start: "2024-09-23",
    end: "2024-09-29",
  },
  {
    downloads: 71,
    weekId: "2024-40",
    start: "2024-09-30",
    end: "2024-10-06",
  },
  {
    downloads: 88,
    weekId: "2024-41",
    start: "2024-10-07",
    end: "2024-10-13",
  },
  {
    downloads: 106,
    weekId: "2024-42",
    start: "2024-10-14",
    end: "2024-10-20",
  },
  {
    downloads: 92,
    weekId: "2024-43",
    start: "2024-10-21",
    end: "2024-10-27",
  },
  {
    downloads: 79,
    weekId: "2024-44",
    start: "2024-10-28",
    end: "2024-11-03",
  },
  {
    downloads: 101,
    weekId: "2024-45",
    start: "2024-11-04",
    end: "2024-11-10",
  },
  {
    downloads: 84,
    weekId: "2024-46",
    start: "2024-11-11",
    end: "2024-11-17",
  },
  {
    downloads: 118,
    weekId: "2024-47",
    start: "2024-11-18",
    end: "2024-11-24",
  },
  {
    downloads: 97,
    weekId: "2024-48",
    start: "2024-11-25",
    end: "2024-12-01",
  },
  {
    downloads: 89,
    weekId: "2024-49",
    start: "2024-12-02",
    end: "2024-12-08",
  },
  {
    downloads: 77,
    weekId: "2024-50",
    start: "2024-12-09",
    end: "2024-12-15",
  },
  {
    downloads: 76,
    weekId: "2024-51",
    start: "2024-12-16",
    end: "2024-12-22",
  },
  {
    downloads: 139,
    weekId: "2024-52",
    start: "2024-12-23",
    end: "2024-12-29",
  },
  {
    downloads: 138,
    weekId: "2024-1",
    start: "2024-12-30",
    end: "2024-12-31",
  },
  {
    downloads: 135,
    weekId: "2025-1",
    start: "2025-01-01",
    end: "2025-01-05",
  },
  {
    downloads: 127,
    weekId: "2025-2",
    start: "2025-01-06",
    end: "2025-01-12",
  },
  {
    downloads: 115,
    weekId: "2025-3",
    start: "2025-01-13",
    end: "2025-01-19",
  },
  {
    downloads: 87,
    weekId: "2025-4",
    start: "2025-01-20",
    end: "2025-01-26",
  },
  {
    downloads: 109,
    weekId: "2025-5",
    start: "2025-01-27",
    end: "2025-02-02",
  },
  {
    downloads: 91,
    weekId: "2025-6",
    start: "2025-02-03",
    end: "2025-02-09",
  },
  {
    downloads: 122,
    weekId: "2025-7",
    start: "2025-02-10",
    end: "2025-02-16",
  },
  {
    downloads: 102,
    weekId: "2025-8",
    start: "2025-02-17",
    end: "2025-02-23",
  },
  {
    downloads: 106,
    weekId: "2025-9",
    start: "2025-02-24",
    end: "2025-03-02",
  },
  {
    downloads: 107,
    weekId: "2025-10",
    start: "2025-03-03",
    end: "2025-03-09",
  },
  {
    downloads: 100,
    weekId: "2025-11",
    start: "2025-03-10",
    end: "2025-03-16",
  },
  {
    downloads: 132,
    weekId: "2025-12",
    start: "2025-03-17",
    end: "2025-03-23",
  },
  {
    downloads: 134,
    weekId: "2025-13",
    start: "2025-03-24",
    end: "2025-03-30",
  },
  {
    downloads: 125,
    weekId: "2025-14",
    start: "2025-03-31",
    end: "2025-04-06",
  },
  {
    downloads: 183,
    weekId: "2025-15",
    start: "2025-04-07",
    end: "2025-04-13",
  },
  {
    downloads: 179,
    weekId: "2025-16",
    start: "2025-04-14",
    end: "2025-04-20",
  },
];

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

export const Sparkline = ({
  title,
  data,
  icon,
}: {
  title: string;
  data: Array<datum>;
  icon: ReactNode;
}) => {
  const [weekIndex, setWeekIndex] = useState<null | number>(null);
  const { palette } = useTheme();

  const downloads = data.map((item) => item.downloads);
  const weeks = data.map((item) => `${item.start} to ${item.end}`);
  const isIncreasing = downloads[0] <= downloads[downloads.length - 1];
  const color = isIncreasing ? "success" : "error";

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Stack direction="column" width="100%">
        <Stack
          direction="row"
          alignItems="flex-start"
          gap={1}
          alignContent="center"
        >
          {icon}
          <Typography variant="subtitle2" lineHeight={1.5}>
            {title}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
          gap={2}
          sx={{ containerType: "inline-size" }}
        >
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
              highlightedAxis={
                weekIndex === null
                  ? []
                  : [{ axisId: "week-axis", dataIndex: weekIndex }]
              }
              {...settings}
            />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};
