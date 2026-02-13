import { type ThemeOptions, hslToRgb, lighten } from "@mui/material";
import { random, sample } from "lodash";
import {
  EXAMPLE_GOOGLE_FONTS,
  WEB_SAFE_FONTS,
} from "./components/TextEditor.tsx/TextEditor";
import { toStandardHex } from "./utils";

const POSSIBLE_FONTS = [...WEB_SAFE_FONTS, ...EXAMPLE_GOOGLE_FONTS];

const generateRandomPrimaryAndSecondaryColor = (): {
  primary: string;
  secondary: string;
} => {
  const diff = 50;

  const hue = random(0, 360, false);
  const saturation = random(40, 100, false);
  const lightness = random(35, 80, false);
  const primary = toStandardHex(
    hslToRgb(`hsl(${hue},${saturation},${lightness})`),
  );

  const secondaryHue = hue + diff > 360 ? hue - diff : hue + diff;
  const secondary = toStandardHex(
    hslToRgb(`hsl(${secondaryHue},${saturation},${lightness})`),
  );

  return { primary, secondary };
};

const generateRandomLightBgColor = (): string => {
  const hue = random(0, 360, false);
  const saturation = random(0, 100, false);
  const lightness = random(90, 100, false);
  return toStandardHex(hslToRgb(`hsl(${hue},${saturation},${lightness})`));
};

const generateRandomDarkBgColor = (): string => {
  const hue = random(0, 360, false);
  const saturation = random(0, 100, false);
  const lightness = random(0, 10, false);
  return toStandardHex(hslToRgb(`hsl(${hue},${saturation},${lightness})`));
};

export const generateTheme = (): ThemeOptions => {
  const { primary, secondary } = generateRandomPrimaryAndSecondaryColor();
  const baseFontWeight = random(2, 6) * 100;
  const baseFontSize = random(12, 15);

  const newThemeOptions: ThemeOptions = {
    palette: { primary: { main: primary }, secondary: { main: secondary } },
    typography: { fontFamily: sample(POSSIBLE_FONTS) },
    spacing: random(6, 12, false),
    shape: { borderRadius: random(0, 12, false) * 2 },
  };

  if (baseFontSize !== 14) newThemeOptions.typography!.fontSize = baseFontSize;

  if (baseFontWeight !== 400) {
    newThemeOptions.typography!.fontWeightLight = baseFontWeight - 100;
    newThemeOptions.typography!.fontWeightRegular = baseFontWeight;
    newThemeOptions.typography!.fontWeightMedium = baseFontWeight + 100;
    newThemeOptions.typography!.fontWeightBold = baseFontWeight + 300;
  }

  if (Math.random() > 0.5) {
    const bgcolor = generateRandomDarkBgColor();
    newThemeOptions.palette!.mode = "dark";
    newThemeOptions.palette!.background = {
      default: bgcolor,
      paper: bgcolor,
    };
  } else {
    const defaultBg = generateRandomLightBgColor();
    newThemeOptions.palette!.background = {
      default: defaultBg,
      paper: lighten(defaultBg, Math.random() + 0.1),
    };
  }

  return newThemeOptions;
};
