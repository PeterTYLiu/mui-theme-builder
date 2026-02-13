import { Add, Remove } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  FormHelperText,
  Link,
  Slider,
  TextField,
  Tooltip,
  Typography,
  type TypographyVariants,
} from "@mui/material";
import { DEFAULT_THEME } from "../../constants";
import { useInnerTheme } from "../../hooks/useInnerTheme";
import { FieldContainer } from "../FieldContainer/FieldContainer";
import { FieldGroupContainer } from "../FieldGroupContainer/FieldGroupContainer";
import { NumberSpecifier } from "../NumberSpecifier/NumberSpecifier";

const WEIGHTS: Array<{
  name: keyof TypographyVariants;
  defaultWeight: number;
}> = [
  { name: "fontWeightLight", defaultWeight: 300 },
  { name: "fontWeightRegular", defaultWeight: 400 },
  { name: "fontWeightMedium", defaultWeight: 500 },
  { name: "fontWeightBold", defaultWeight: 700 },
];

export const DEFAULT_FONT = '"Roboto", "Helvetica", "Arial", sans-serif';

export const WEB_SAFE_FONTS = [
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

export const EXAMPLE_GOOGLE_FONTS = [
  "Merriweather",
  "Open Sans",
  "Inter",
  "Montserrat",
  "Lato",
  "Noto Sans",
  "Raleway",
  "Noto Serif",
  "Saira",
  "Source Code Pro",
  "Space Grotesk",
  "ABeeZee",
  "Sanchez",
  "Libre Baskerville",
  "Federant",
  "Bitter",
  "Lexend",
  "Marcellus",
  "Tenor Sans",
];

const LOWER_CASE_FONTS = [DEFAULT_FONT, "", ...WEB_SAFE_FONTS].map((font) => font.toLowerCase());

export const TextEditor = () => {
  const { theme, mergeThemeOptions, deleteThemeOptionKey } = useInnerTheme();
  const currentFont = theme.typography.fontFamily;
  const isGoogleFont = !LOWER_CASE_FONTS.includes(currentFont?.toLowerCase() ?? "");
  // Need to deduplicate weights otherwise the Google Fonts <link> will not work
  const currentWeights = Array.from(new Set(WEIGHTS.map((weight) => theme.typography[weight.name] as number)));
  const isLowestWeight = currentWeights.length === 1 && currentWeights[0] === 100;
  const isHighestWeight = currentWeights.length === 1 && currentWeights[0] === 900;

  return (
    <>
      <FieldGroupContainer title="Text Size">
        <NumberSpecifier
          unit="px"
          isDefault={theme.typography.fontSize === DEFAULT_THEME.typography.fontSize}
          min={8}
          max={24}
          step={0.5}
          value={theme.typography.fontSize}
          onChange={(num) => mergeThemeOptions({ typography: { fontSize: num } })}
          onReset={() => deleteThemeOptionKey(["typography", "fontSize"])}
        />
      </FieldGroupContainer>
      <FieldGroupContainer title="Font Family">
        <Autocomplete
          onChange={(_, value) => {
            if (!value || value === DEFAULT_FONT) {
              deleteThemeOptionKey(["typography", "fontFamily"]);
            } else mergeThemeOptions({ typography: { fontFamily: value } });
          }}
          onInputChange={(_, value) => {
            if (!value || value === DEFAULT_FONT) {
              deleteThemeOptionKey(["typography", "fontFamily"]);
            } else mergeThemeOptions({ typography: { fontFamily: value } });
          }}
          value={currentFont}
          inputValue={currentFont}
          freeSolo
          disableClearable={currentFont === DEFAULT_FONT}
          options={[DEFAULT_FONT, ...WEB_SAFE_FONTS, ...EXAMPLE_GOOGLE_FONTS]}
          groupBy={(option) => {
            if (WEB_SAFE_FONTS.some((font) => font.toLowerCase() === option.toLowerCase())) return "Web-safe fonts";
            else if (option === DEFAULT_FONT) {
              return "Default";
            } else {
              return "Google fonts (examples)";
            }
          }}
          fullWidth
          renderInput={(params) => <TextField {...params} />}
          renderGroup={(params) => (
            <li key={params.key}>
              <Box sx={{ bgcolor: "primary.dark", p: 0.5 }}>{params.group}</Box>
              <div>{params.children}</div>
            </li>
          )}
        />
        {isGoogleFont && (
          <link
            rel="stylesheet"
            href={`https://fonts.googleapis.com/css2?family=${currentFont}:wght@${currentWeights.join(";")}&display=swap`}
          />
        )}
        <FormHelperText>
          Enter a web-safe font or{" "}
          <Link href="https://fonts.google.com/" target="_blank">
            Google Font
          </Link>
        </FormHelperText>
        {isGoogleFont && (
          <Box
            component="pre"
            sx={{
              m: 0,
              mt: 2,
              border: 1,
              p: 1,
              overflow: "auto",
              borderColor: "grey.700",
              bgcolor: "background.default",
            }}
          >
            {`// Copy into <head> to use this Google Font`}
            <br />
            {`<link rel="preconnect" href="https://fonts.googleapis.com" />`}
            <br />
            {`<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />`}
            <br />
            {`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${currentFont}:wght@${currentWeights.join(";")}&display=swap" />`}
          </Box>
        )}
      </FieldGroupContainer>
      <FieldGroupContainer
        title="Font Weights"
        actions={
          <ButtonGroup size="small" color="secondary">
            <Tooltip title="Decrease size">
              <Button
                disabled={isLowestWeight}
                onClick={() => {
                  const newWeightMap: Partial<Record<string, number>> = {};
                  WEIGHTS.forEach(({ name }) => {
                    const currentWeight = theme.typography[name] as number;
                    const newWeight = Math.max(currentWeight - 100, 100);
                    newWeightMap[name] = newWeight;
                  });
                  mergeThemeOptions({ typography: newWeightMap });
                }}
              >
                <Remove />
              </Button>
            </Tooltip>
            <Tooltip title="Increase size">
              <Button
                disabled={isHighestWeight}
                onClick={() => {
                  const newWeightMap: Partial<Record<string, number>> = {};
                  WEIGHTS.forEach(({ name }) => {
                    const currentWeight = theme.typography[name] as number;
                    const newWeight = Math.min(currentWeight + 100, 900);
                    newWeightMap[name] = newWeight;
                  });
                  mergeThemeOptions({ typography: newWeightMap });
                }}
              >
                <Add />
              </Button>
            </Tooltip>
          </ButtonGroup>
        }
      >
        {WEIGHTS.map(({ name, defaultWeight }) => {
          const currentWeight = theme.typography[name] as number;
          return (
            <FieldContainer
              key={name}
              title={`${name.substring(10)}: ${currentWeight}`}
              isDefault={currentWeight === defaultWeight}
              titleSx={{ fontWeight: currentWeight, width: "78px" }}
              onReset={() => deleteThemeOptionKey(["typography", name])}
            >
              <Slider
                marks
                valueLabelDisplay="auto"
                value={currentWeight}
                step={100}
                min={100}
                max={900}
                onChange={(_, value) => {
                  value === defaultWeight
                    ? deleteThemeOptionKey(["typography", name])
                    : mergeThemeOptions({
                        typography: { [name]: value },
                      });
                }}
              />
            </FieldContainer>
          );
        })}
      </FieldGroupContainer>
      <FieldGroupContainer>
        <Typography variant="subtitle2" sx={{ textAlign: "center", color: "text.secondary" }}>
          Individual variant editing coming soon
        </Typography>
      </FieldGroupContainer>
    </>
  );
};
