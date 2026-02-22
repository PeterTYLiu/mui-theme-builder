// @ts-nocheck
// Fix these TS things later

import { Box, Button, type PaletteOptions, type SimplePaletteColorOptions } from "@mui/material";
import { useState } from "react";
import { DEFAULT_DARK_THEME, DEFAULT_THEME } from "../../constants";
import { useInnerTheme } from "../../hooks/useInnerTheme";
import { toStandardHex } from "../../utils";
import { ColorPicker } from "../ColourPicker/ColorPicker";
import { FieldGroupContainer } from "../FieldGroupContainer/FieldGroupContainer";

const PALETTES = {
  light: DEFAULT_THEME.palette,
  dark: DEFAULT_DARK_THEME.palette,
};

interface SubpaletteEditorProps {
  name: keyof PaletteOptions;
  manual?: Array<string>;
  derived?: Array<keyof SimplePaletteColorOptions>;
}

export const SubpaletteEditor = ({ name, manual = [], derived = [] }: SubpaletteEditorProps) => {
  const { theme, themeOptions, mergeThemeOptions, deleteThemeOptionKey } = useInnerTheme();
  const mode = theme.palette.mode;
  const [showDerived, setShowDerived] = useState(false);

  const derivedToggleButton = (
    <Button size="small" color="secondary" sx={{ p: 0 }} onClick={() => setShowDerived((prev) => !prev)}>
      {showDerived ? "Hide derived" : "See derived"}
    </Button>
  );

  // Removing this teranry would result in us calling `toStandardHex` on an object
  const keylessColorPicker = !manual.length ? (
    <ColorPicker
      isDefault={theme.palette[name] === PALETTES[mode][name]}
      value={toStandardHex(theme.palette[name])}
      onChange={(hex) =>
        mergeThemeOptions({
          palette: { [name]: hex },
        })
      }
      onReset={() => {
        deleteThemeOptionKey(["palette", name]);
      }}
    />
  ) : undefined;

  return (
    <FieldGroupContainer title={name} actions={derived.length > 0 ? derivedToggleButton : keylessColorPicker}>
      {manual.map((key) => (
        <ColorPicker
          title={key}
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
            if (typeof customColorsObject !== "object") return;

            // If there are any custom derived colours, the manual color cannot be deleted
            if (derived.some((key) => key in customColorsObject)) {
              mergeThemeOptions({
                palette: { [name]: { [key]: PALETTES[mode][name][key] } },
              });
            } else deleteThemeOptionKey(["palette", name, key]);
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
              title={key}
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
              onReset={() => deleteThemeOptionKey(["palette", name, key])}
            />
          ))}
        </Box>
      )}
    </FieldGroupContainer>
  );
};
