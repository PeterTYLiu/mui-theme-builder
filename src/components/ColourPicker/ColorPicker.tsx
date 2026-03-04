import { Box } from "@mui/material";
import { Chrome } from "@uiw/react-color";
import { useRef, type FocusEvent, type KeyboardEvent } from "react";
import { decimalToHex, intToHex, toStandardHex } from "../../utils";
import { FieldContainer, type FieldContainerProps } from "../FieldContainer/FieldContainer";

interface ColorPickerProps extends FieldContainerProps {
  value: string;
  name: string;
  onChange: (hex: string) => void;
}

export const ColorPicker = ({ value, onChange, name, ...fieldContainerProps }: ColorPickerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
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
        aria-label={"Open color picker for " + name}
        popoverTarget={name}
        sx={{
          border: 1,
          borderInlineEnd: 0,
          borderRadius: 1,
          borderEndEndRadius: 0,
          borderStartEndRadius: 0,
          borderColor: "grey.600",
          width: "30px",
          position: "relative",
          // This is a checkerboard
          background: "conic-gradient(#fff 25%, #000 0 50%, #fff 0 75%, #000 0) 0 0/14px 14px",
          "::before": {
            zIndex: 1,
            position: "absolute",
            borderRadius: "calc(var(--mui-shape-borderRadius) - 1px)",
            borderEndEndRadius: 0,
            borderStartEndRadius: 0,
            content: '""',
            inset: 0,
            bgcolor: value,
            pointerEvents: "none",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            insetBlock: 0,
            insetInlineStart: 0,
            backgroundColor: value.substring(0, 7),
            width: "15px",
            borderRadius: "calc(var(--mui-shape-borderRadius) - 1px)",
            borderEndEndRadius: 0,
            borderStartEndRadius: 0,
          }}
        />
      </Box>
      <Box
        id={name}
        popover="auto"
        sx={{
          insetInlineEnd: "anchor(start)",
          top: "anchor(top)",
          bgcolor: "background.default",
          positionTryFallbacks: "flip-block",
          borderRadius: 1,
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
        name={name}
        ref={inputRef}
        key={value}
        autoCorrect="off"
        spellCheck="false"
        sx={{
          fontFamily: "monospace",
          borderRadius: 1,
          borderStartStartRadius: 0,
          borderEndStartRadius: 0,
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
    </FieldContainer>
  );
};
