import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  type PaletteOptions,
} from "@mui/material";
import { DIVIDER_COLOR, EDITOR_PANEL_PADDING } from "../../constants";
import { useInnerTheme } from "../../hooks/useInnerTheme";
import { SubpaletteEditor } from "../SubpaletteEditor/SubpaletteEditor";

const COLORS_BOTTOM: Array<keyof PaletteOptions> = [
  "secondary",
  "error",
  "warning",
  "info",
  "success",
];

export const PaletteEditor = () => {
  const { theme, mergeThemeOptions } = useInnerTheme();
  return (
    <>
      <Box
        sx={{
          p: EDITOR_PANEL_PADDING,
          borderBottom: 1,
          borderColor: DIVIDER_COLOR,
        }}
      >
        <ToggleButtonGroup
          fullWidth
          value={theme.palette.mode}
          exclusive
          onChange={(_, value: "light" | "dark" | null) => {
            if (!value) return;
            mergeThemeOptions({ palette: { mode: value } });
          }}
        >
          <ToggleButton value="light">Light</ToggleButton>
          <ToggleButton value="dark">Dark</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <SubpaletteEditor
        name="primary"
        manual={["main"]}
        derived={["light", "dark", "contrastText"]}
      />
      <SubpaletteEditor
        name={"background"}
        manual={["default", "paper"]}
        derived={[]}
      />
      <SubpaletteEditor
        name="text"
        manual={["primary", "secondary", "disabled"]}
        derived={[]}
      />
      {COLORS_BOTTOM.map((color) => (
        <SubpaletteEditor
          key={color}
          name={color}
          manual={["main"]}
          derived={["light", "dark", "contrastText"]}
        />
      ))}
    </>
  );
};
