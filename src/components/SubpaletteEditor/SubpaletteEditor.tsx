import {
  Box,
  Button,
  Typography,
  type PaletteOptions,
  type SimplePaletteColorOptions,
} from "@mui/material";
import { useState } from "react";
import {
  DEFAULT_DARK_THEME,
  DEFAULT_THEME,
  DIVIDER_COLOR,
  EDITOR_PANEL_PADDING,
} from "../../constants";
import { useInnerTheme } from "../../hooks/useInnerTheme";
import { toStandardHex } from "../../utils";
import { ColorPicker } from "../ColourPicker/ColorPicker";

const PALETTES = {
  light: DEFAULT_THEME.palette,
  dark: DEFAULT_DARK_THEME.palette,
};

interface SubpaletteEditorProps {
  name: keyof PaletteOptions;
  manual: Array<string>;
  derived: Array<keyof SimplePaletteColorOptions>;
}

export const SubpaletteEditor = ({
  name,
  manual,
  derived,
}: SubpaletteEditorProps) => {
  const { theme, themeOptions, mergeThemeOptions, setThemeOptions } =
    useInnerTheme();
  const mode = theme.palette.mode;
  const [showDerived, setShowDerived] = useState(false);

  return (
    <Box
      sx={{
        p: EDITOR_PANEL_PADDING,
        "&:not(:last-of-type)": {
          borderBottom: 1,
          borderColor: DIVIDER_COLOR,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography
          variant="subtitle1"
          component="h3"
          sx={{ lineHeight: "initial", textTransform: "uppercase" }}
        >
          {name}
        </Typography>
        {derived.length > 0 && (
          <Button
            size="small"
            color="secondary"
            sx={{ p: 0 }}
            onClick={() => setShowDerived((prev) => !prev)}
          >
            {showDerived ? "Hide derived" : "See derived"}
          </Button>
        )}
      </Box>

      {manual.map((key) => (
        <ColorPicker
          name={key}
          key={key}
          isDefault={theme.palette[name][key] === PALETTES[mode][name][key]}
          value={toStandardHex(theme.palette[name][key])}
          onChange={(hex) =>
            mergeThemeOptions({
              palette: { [name]: { [key]: hex } },
            })
          }
          onReset={() => {
            const customColorsObject = themeOptions?.palette?.[name] ?? {};
            // This might be a string, e.g. for "divider". Handle this later.
            if (typeof customColorsObject !== "object") return;
            // If there are any custom derived colours, the manual color cannot be deleted
            if (derived.some((key) => key in customColorsObject)) {
              mergeThemeOptions({
                palette: { [name]: { [key]: PALETTES[mode][name][key] } },
              });
            } else {
              const newThemeOptions = structuredClone(themeOptions);
              if (newThemeOptions.palette?.[name]) {
                delete newThemeOptions.palette[name][key];
              }
              setThemeOptions(newThemeOptions);
            }
          }}
        />
      ))}

      {derived.length > 0 && (
        <Box
          inert={!showDerived}
          sx={{
            transition: "height 0.3s",
            height: showDerived ? "calc-size(max-content, size)" : "0px",
            overflow: "hidden",
          }}
        >
          {derived.map((key) => (
            <ColorPicker
              name={key}
              key={key}
              isDefault={!Boolean(themeOptions?.palette?.[name]?.[key])}
              value={toStandardHex(theme.palette[name][key])}
              onChange={(hex) =>
                mergeThemeOptions({
                  palette: {
                    [name]: {
                      [key]: hex,
                      main: toStandardHex(theme.palette[name].main),
                    },
                  },
                })
              }
              onReset={() => {
                const newThemeOptions = structuredClone(themeOptions);
                delete newThemeOptions.palette[name][key];
                if (
                  Object.keys(newThemeOptions.palette?.[name] ?? {}).length ===
                  1
                ) {
                  delete newThemeOptions.palette[name];
                }
                setThemeOptions(newThemeOptions);
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};
