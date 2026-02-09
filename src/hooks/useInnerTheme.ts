import { type Theme, type ThemeOptions } from "@mui/material";
import { createContext, use, type Dispatch, type SetStateAction } from "react";
import { DEFAULT_THEME } from "../constants";

type InnerThemeContextValue = {
  theme: Theme;
  themeOptions: ThemeOptions;
  mergeThemeOptions: (themeOptions: ThemeOptions) => void;
  setThemeOptions: Dispatch<SetStateAction<ThemeOptions>>;
  deleteThemeOptionKey: (keyPath: Array<string>) => void;
};

export const InnerThemeContext = createContext<InnerThemeContextValue>({
  theme: DEFAULT_THEME,
  themeOptions: {},
  mergeThemeOptions: () => {},
  setThemeOptions: () => {},
  deleteThemeOptionKey: () => {},
});

export const useInnerTheme = () => use(InnerThemeContext);
