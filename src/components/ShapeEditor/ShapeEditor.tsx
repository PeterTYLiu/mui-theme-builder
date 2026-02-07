import { Box } from "@mui/material";
import { DIVIDER_COLOR, EDITOR_PANEL_PADDING } from "../../constants";
import { useInnerTheme } from "../../hooks/useInnerTheme";
import { NumberSpecifier } from "../NumberSpecifier/NumberSpecifier";

export const ShapeEditor = () => {
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
        <NumberSpecifier
          title="BorderRadius"
          min={0}
          max={20}
          step={0.5}
          value={Number(theme.shape.borderRadius)}
          onChange={(num) =>
            mergeThemeOptions({ shape: { borderRadius: num } })
          }
        />
      </Box>
      <Box
        sx={{
          p: EDITOR_PANEL_PADDING,
          borderBottom: 1,
          borderColor: DIVIDER_COLOR,
        }}
      >
        <NumberSpecifier
          title="Spacing"
          min={6}
          max={14}
          step={0.5}
          value={Number(theme.spacing(1).slice(0, -2))}
          onChange={(num) => {
            console.log(theme.spacing(1));
            mergeThemeOptions({ spacing: num });
          }}
        />
      </Box>
    </>
  );
};
