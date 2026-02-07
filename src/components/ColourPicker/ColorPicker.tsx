import { Refresh } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Chrome } from "@uiw/react-color";
import { useRef, type FocusEvent, type KeyboardEvent } from "react";
import { decimalToHex, intToHex, toStandardHex } from "../../utils";
import { FieldContainer } from "../FieldContainer/FieldContainer";

interface ColorPickerProps {
  name: string;
  value: string;
  isDefault: boolean;
  onChange: (hex: string) => void;
  onReset: () => void;
}

export const ColorPicker = ({
  name,
  value,
  isDefault,
  onChange,
  onReset,
}: ColorPickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const popverId = Math.random().toString();

  const handleNewInputValue = (inputValue: string) => {
    const newValue = toStandardHex(inputValue, value);
    if (newValue === value) return;
    onChange(newValue);
    inputRef.current!.value = newValue;
  };

  const onInputBlur = (e: FocusEvent<HTMLInputElement>) => {
    handleNewInputValue(e.target.value);
  };

  const onInputEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    handleNewInputValue((e.target as HTMLInputElement).value);
  };

  return (
    <FieldContainer title={name}>
      <Box
        component="button"
        popoverTarget={popverId}
        sx={{
          border: 1,
          borderInlineEnd: 0,
          borderColor: "grey.600",
          width: "30px",
          position: "relative",
          // This is a checkerboard
          background:
            "conic-gradient(#fff 25%, #000 0 50%, #fff 0 75%, #000 0) 0 0/14px 14px",
          "::before": {
            zIndex: 1,
            position: "absolute",
            content: '""',
            inset: 0,
            bgcolor: value,
            pointerEvents: "none",
          },
        }}
      />
      <Box
        id={popverId}
        popover="auto"
        sx={{
          insetInlineStart: "calc(anchor(start) - 245px)",
          top: "anchor(top)",
          margin: 0,
          bgcolor: "background.default",
        }}
      >
        <Chrome
          showTriangle={false}
          color={value}
          showAlpha
          onChange={({ rgba }) => {
            const { r, g, b, a } = rgba;
            onChange(
              toStandardHex(
                `#${intToHex(r)}${intToHex(g)}${intToHex(b)}${decimalToHex(a)}`,
              ),
            );
          }}
        />
      </Box>
      <Box
        component="input"
        ref={inputRef}
        key={value}
        sx={{
          fontFamily: "monospace",
          borderRadius: 2,
          width: "80px",
          border: 1,
          borderColor: "grey.600",
          fontSize: "12px",
          background: "transparent",
          color: "text.primary",
          textAlign: "center",
        }}
        defaultValue={value}
        onBlur={onInputBlur}
        onKeyDown={onInputEnter}
      />
      {/* <Box
        component="input"
        type="number"
        max="100"
        min="0"
        sx={{
          "::-webkit-inner-spin-button": {
            "-webkit-appearance": "none",
            margin: 0,
          },
          fontFamily: "monospace",
          borderRadius: 2,
          width: "45px",
          border: 1,
          borderColor: "grey.600",
          fontSize: "12px",
          background: "transparent",
          color: "text.primary",
          textAlign: "center",
        }}
      /> */}
      <Box
        sx={{
          width: "50px",
          textAlign: "center",
          flexShrink: 0,
          display: "grid",
          placeItems: "center",
        }}
      >
        {isDefault ? (
          <Typography
            variant="subtitle2"
            color="text.secondary"
            sx={{ fontSize: 11 }}
          >
            default
          </Typography>
        ) : (
          <Tooltip title="Reset">
            <IconButton onClick={onReset} size="small" sx={{ p: 0.5 }}>
              <Refresh />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </FieldContainer>
  );
};
