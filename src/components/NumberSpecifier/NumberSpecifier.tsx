import { Box, Slider, Stack, Typography } from "@mui/material";
import { FieldContainer, type FieldContainerProps } from "../FieldContainer/FieldContainer";

interface NumberSpecifierProps extends FieldContainerProps {
  min: number;
  max: number;
  value: number;
  step: number;
  onChange: (num: number) => void;
  unit?: string;
}

export const NumberSpecifier = ({ title, onReset, isDefault, onChange, unit, ...props }: NumberSpecifierProps) => {
  const hasUnits = Boolean(unit);
  return (
    <FieldContainer {...{ title, onReset, isDefault }}>
      <Stack
        sx={{
          flexDirection: "row",
          alignContent: "stretch",
          marginInlineEnd: 2,
          position: "relative",
        }}
      >
        <Box
          component="input"
          type="number"
          onChange={(e) => onChange(e.target.valueAsNumber)}
          {...props}
          sx={{
            width: hasUnits ? "100px" : "60px",
            paddingInlineStart: 1.5,
            paddingInlineEnd: hasUnits ? "40px" : 1.5,
            borderRadius: 1,
            border: 1,
            textAlign: "start",
            borderColor: "grey.600",
            fontSize: "12px",
            background: "transparent",
            color: "text.primary",
            "::-webkit-inner-spin-button": {
              "-webkit-appearance": "none",
              margin: 0,
            },
          }}
        />
        {Boolean(unit) && (
          <Box
            sx={{
              display: "grid",
              position: "absolute",
              insetBlock: 0,
              insetInlineEnd: "calc(1.5 * var(--mui-spacing))",
              placeItems: "center",
              pointerEvents: "none",
            }}
          >
            <Typography variant="subtitle2" color="textSecondary">
              {unit}
            </Typography>
          </Box>
        )}
      </Stack>
      <Slider onChange={(_, value) => onChange(value)} {...props} valueLabelDisplay="off" />
    </FieldContainer>
  );
};
