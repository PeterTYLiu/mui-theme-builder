import { getLuminance, lighten, ToggleButton, ToggleButtonGroup, type PaletteOptions } from "@mui/material";
import type { ThemeOptions } from "@mui/material/styles";
import { DEFAULT_DARK_THEME, DEFAULT_THEME } from "../../constants";
import { useInnerTheme } from "../../hooks/useInnerTheme";
import { invertLightness } from "../../utils";
import { FieldGroupContainer } from "../FieldGroupContainer/FieldGroupContainer";
import { SubpaletteEditor } from "../SubpaletteEditor/SubpaletteEditor";

const COLORS_BOTTOM: Array<keyof PaletteOptions> = ["secondary", "error", "warning", "info", "success"];
const defaultDarkBackground = DEFAULT_DARK_THEME.palette.background.default;
const defaultLightBackground = DEFAULT_THEME.palette.background.default;

export const PaletteEditor = () => {
  const { theme, mergeThemeOptions } = useInnerTheme();
  const currentMode = theme.palette.mode;
  const isLight = currentMode === "light";
  const { default: defaultBg } = theme.palette.background;
  return (
    <>
      <FieldGroupContainer>
        <ToggleButtonGroup
          fullWidth
          value={currentMode}
          exclusive
          onChange={(_, value: "light" | "dark" | null) => {
            if (!value) return;
            const newTheme: ThemeOptions = { palette: { mode: value } };
            const isNotDefaultBg = defaultBg !== (isLight ? defaultLightBackground : defaultDarkBackground);
            const isColorDarkThreshold = 0.25;
            const isDarkAndUsingDarkBg = !isLight && getLuminance(defaultBg) < isColorDarkThreshold;
            const isLightAndUsingLightBg = isLight && getLuminance(defaultBg) > isColorDarkThreshold;

            // Automatically adjust the background if switching modes
            if (isNotDefaultBg && (isLightAndUsingLightBg || isDarkAndUsingDarkBg)) {
              const newBackground = invertLightness(defaultBg);
              newTheme!.palette!.background = {
                paper: isLight ? newBackground : lighten(newBackground, Math.min(1, 1.3 - getLuminance(newBackground))),
                default: newBackground,
              };
            }

            mergeThemeOptions(newTheme);
          }}
        >
          <ToggleButton value="light">Light</ToggleButton>
          <ToggleButton value="dark">Dark</ToggleButton>
        </ToggleButtonGroup>
      </FieldGroupContainer>
      <SubpaletteEditor name="primary" manual={["main"]} derived={["light", "dark", "contrastText"]} />
      <SubpaletteEditor name={"background"} manual={["default", "paper"]} />
      <SubpaletteEditor name="text" manual={["primary", "secondary", "disabled"]} />
      {COLORS_BOTTOM.map((color) => (
        <SubpaletteEditor key={color} name={color} manual={["main"]} derived={["light", "dark", "contrastText"]} />
      ))}
      <SubpaletteEditor name="divider" />
    </>
  );
};
