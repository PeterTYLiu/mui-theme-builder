import { Check } from "@mui/icons-material";
import { ThemeProvider, createTheme, type ThemeOptions } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import App from "./App.tsx";
import "./index.css";

const appThemeOptions: ThemeOptions = {
  cssVariables: { nativeColor: true },
  palette: {
    mode: "dark",
    primary: { main: "#34c2ff", contrastText: "#00344a" },
    secondary: { main: "#BBB" },
  },
  shape: { borderRadius: 0 },
  typography: {
    fontSize: 12,
    fontFamily: "Lexend",
    fontWeightLight: 100,
    fontWeightRegular: 200,
    fontWeightMedium: 300,
    fontWeightBold: 500,
  },
  components: {
    MuiButtonBase: {
      defaultProps: { disableRipple: true, disableTouchRipple: true },
      styleOverrides: { root: { ":focus-visible": { outline: "2px solid var(--mui-palette-primary-dark)" } } },
    },
    MuiTab: { styleOverrides: { root: { outlineOffset: "-2px" } } },
    MuiIconButton: { styleOverrides: { root: { borderRadius: 0 } } },
    MuiButtonGroup: { defaultProps: { disableRipple: true } },
    MuiToggleButtonGroup: { defaultProps: { size: "small" } },
    MuiTooltip: { defaultProps: { placement: "top" }, styleOverrides: { tooltip: { fontSize: "13px" } } },
  },
};

const appTheme = createTheme(appThemeOptions);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={appTheme}>
      <App />
      <Toaster
        position="top-center"
        duration={2100}
        icons={{ success: <Check color="success" /> }}
        toastOptions={{
          style: {
            backgroundColor: "var(--mui-palette-background-paper)",
            color: "var(--mui-palette-text-primary)",
            backgroundImage: "var(--mui-overlays-24)",
            border: 0,
            borderRadius: 0,
          },
        }}
      />
    </ThemeProvider>
  </StrictMode>,
);
