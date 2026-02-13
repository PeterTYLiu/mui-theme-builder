import { ToggleButton, ToggleButtonGroup, type PaletteOptions } from "@mui/material";
import { useInnerTheme } from "../../hooks/useInnerTheme";
import { FieldGroupContainer } from "../FieldGroupContainer/FieldGroupContainer";
import { SubpaletteEditor } from "../SubpaletteEditor/SubpaletteEditor";

const COLORS_BOTTOM: Array<keyof PaletteOptions> = ["secondary", "error", "warning", "info", "success"];

export const PaletteEditor = () => {
  const { theme, mergeThemeOptions } = useInnerTheme();
  return (
    <>
      <FieldGroupContainer>
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
      </FieldGroupContainer>
      <SubpaletteEditor name="primary" manual={["main"]} derived={["light", "dark", "contrastText"]} />
      <SubpaletteEditor name={"background"} manual={["default", "paper"]} derived={[]} />
      <SubpaletteEditor name="text" manual={["primary", "secondary", "disabled"]} derived={[]} />
      {COLORS_BOTTOM.map((color) => (
        <SubpaletteEditor key={color} name={color} manual={["main"]} derived={["light", "dark", "contrastText"]} />
      ))}
    </>
  );
};
