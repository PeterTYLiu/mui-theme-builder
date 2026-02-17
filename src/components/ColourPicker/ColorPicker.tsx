import { Box } from "@mui/material";
import { Chrome } from "@uiw/react-color";
import { useRef, type FocusEvent, type KeyboardEvent } from "react";
import { decimalToHex, intToHex, toStandardHex } from "../../utils";
import { FieldContainer, type FieldContainerProps } from "../FieldContainer/FieldContainer";

interface ColorPickerProps extends FieldContainerProps {
  value: string;
  onChange: (hex: string) => void;
}

export const ColorPicker = ({ value, onChange, ...fieldContainerProps }: ColorPickerProps) => {
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
    <FieldContainer {...fieldContainerProps}>
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
          background: "conic-gradient(#fff 25%, #000 0 50%, #fff 0 75%, #000 0) 0 0/14px 14px",
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
          insetInlineEnd: "anchor(start)",
          top: "anchor(top)",
          bgcolor: "background.default",
        }}
      >
        <Chrome
          showTriangle={false}
          color={value}
          showAlpha
          onChange={({ rgba }) => {
            const { r, g, b, a } = rgba;
            onChange(toStandardHex(`#${intToHex(r)}${intToHex(g)}${intToHex(b)}${decimalToHex(a)}`));
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
    </FieldContainer>
  );
};
