import { rgbToHex } from "@mui/material";

export const toStandardHex = (
  input: string,
  fallback: string = "#000000",
): string => {
  if (input.startsWith("rgb")) return toStandardHex(rgbToHex(input));

  if (input.match(/^#?([a-f0-9]{3}|[a-f0-9]{4}|[a-f0-9]{6}|[a-f0-9]{8})$/)) {
    // Normalize
    input = input.toLowerCase();
    if (input.startsWith("#")) input = input.substring(1);
    // Double if shorthand
    if (input.length === 3 || input.length === 4) {
      input = input
        .split("")
        .reduce((prev, curr) => `${prev}${curr}${curr}`, "");
    }
    // Return
    if (input.length === 6) return `#${input}`;
    // Account for unnecessary #eeeaaaff
    return input.endsWith("ff") ? `#${input.substring(0, 6)}` : `#${input}`;
  }

  return fallback;
};

export const intToHex = (number: number): string => {
  const hexString = number.toString(16);
  return hexString.padStart(2, "0");
};

export const decimalToHex = (number: number): string => {
  const int = Math.round(number * 255);
  return intToHex(int);
};
