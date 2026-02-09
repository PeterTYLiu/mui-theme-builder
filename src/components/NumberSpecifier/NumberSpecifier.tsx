import { Box, Slider, Stack, Typography } from "@mui/material";
import {
  FieldContainer,
  type FieldContainerProps,
} from "../FieldContainer/FieldContainer";

interface NumberSpecifierProps extends FieldContainerProps {
  min: number;
  max: number;
  value: number;
  step: number;
  onChange: (num: number) => void;
  unit?: string;
}

export const NumberSpecifier = ({
  title,
  onReset,
  isDefault,
  onChange,
  unit,
  ...props
}: NumberSpecifierProps) => {
  return (
    <FieldContainer {...{ title, onReset, isDefault }}>
      <Stack direction="row" sx={{ marginInlineEnd: 2 }}>
        <Box
          component="input"
          type="number"
          onChange={(e) => onChange(e.target.valueAsNumber)}
          {...props}
          sx={{
            fontFamily: "monospace",
            width: "60px",
            borderRadius: 2,
            border: 1,
            textAlign: "center",
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
              px: 1,
              placeItems: "center",
              bgcolor: "grey.600",
            }}
          >
            <Typography variant="subtitle2" color="textSecondary">
              {unit}
            </Typography>
          </Box>
        )}
      </Stack>
      <Slider onChange={(_, value) => onChange(value)} {...props} />
    </FieldContainer>
  );
};
