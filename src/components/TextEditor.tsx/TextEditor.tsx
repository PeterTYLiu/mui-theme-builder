import {
  Box,
  NativeSelect,
  Slider,
  Typography,
  type TypographyVariants,
} from "@mui/material";
import { Fragment } from "react/jsx-runtime";
import { DEFAULT_THEME } from "../../constants";
import { useInnerTheme } from "../../hooks/useInnerTheme";
import { FieldGroupContainer } from "../FieldGroupContainer/FieldGroupContainer";
import { NumberSpecifier } from "../NumberSpecifier/NumberSpecifier";

const WEIGHTS = [
  { name: "Light", defaultWeight: 300 },
  { name: "Regular", defaultWeight: 400 },
  { name: "Medium", defaultWeight: 500 },
  { name: "Bold", defaultWeight: 700 },
];

const DEFAULT_FONT = `"Roboto", "Helvetica", "Arial", sans-serif`;

const WEB_SAFE_FONTS = [
  "Arial",
  "Brush Script MT",
  "Courier New",
  "Comic Sans MS",
  "Garamond",
  "Georgia",
  "Tahoma",
  "Times New Roman",
  "Trebuchet MS",
  "Verdana",
];

export const TextEditor = () => {
  const { theme, mergeThemeOptions, deleteThemeOptionKey } = useInnerTheme();

  console.log(theme.typography);

  return (
    <>
      <FieldGroupContainer title="Text Size">
        <NumberSpecifier
          unit="px"
          isDefault={
            theme.typography.fontSize === DEFAULT_THEME.typography.fontSize
          }
          min={8}
          max={24}
          step={0.5}
          value={theme.typography.fontSize}
          onChange={(num) =>
            mergeThemeOptions({ typography: { fontSize: num } })
          }
          onReset={() => deleteThemeOptionKey(["typography", "fontSize"])}
        />
      </FieldGroupContainer>
      <FieldGroupContainer title="Font Family">
        <NativeSelect
          fullWidth
          value={theme.typography.fontFamily}
          onChange={(e) =>
            mergeThemeOptions({ typography: { fontFamily: e.target.value } })
          }
        >
          <optgroup label="Default">
            <option value={DEFAULT_FONT}>{DEFAULT_FONT}</option>
          </optgroup>
          <optgroup label="Web-safe fonts">
            {WEB_SAFE_FONTS.map((font) => (
              <option value={font} key={font}>
                {font}
              </option>
            ))}
          </optgroup>
        </NativeSelect>
      </FieldGroupContainer>
      <FieldGroupContainer title="Font Weights">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "90px 1fr",
            placeItems: "center start",
            columnGap: 2,
            rowGap: 1,
          }}
        >
          {WEIGHTS.map(({ name, defaultWeight }) => {
            const value = theme.typography[
              `fontWeight${name}` as keyof TypographyVariants
            ] as number;
            return (
              <Fragment key={name}>
                <Typography fontWeight={value}>
                  {name}: {value}
                </Typography>
                <Slider
                  marks
                  valueLabelDisplay="auto"
                  value={value}
                  step={100}
                  min={100}
                  max={900}
                  onChange={(_, value) => {
                    value === defaultWeight
                      ? deleteThemeOptionKey([
                          "typography",
                          `fontWeight${name}`,
                        ])
                      : mergeThemeOptions({
                          typography: { [`fontWeight${name}`]: value },
                        });
                  }}
                />
              </Fragment>
            );
          })}
        </Box>
      </FieldGroupContainer>
    </>
  );
};
