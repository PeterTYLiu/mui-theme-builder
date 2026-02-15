import { ThemeProvider, createTheme } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider
      theme={createTheme({
        cssVariables: true,
        palette: {
          mode: "dark",
          primary: { main: "#34c2ff", contrastText: "#00344a" },
          secondary: { main: "#BBB" },
        },
        shape: { borderRadius: 0 },
        typography: { fontSize: 12, fontFamily: "Lexend" },
        components: {
          MuiButtonBase: {
            defaultProps: { disableRipple: true, disableTouchRipple: true },
            styleOverrides: { root: { ":focus-visible": { outline: "2px solid var(--mui-palette-primary-dark)" } } },
          },
          MuiButtonGroup: { defaultProps: { disableRipple: true } },
          MuiToggleButtonGroup: { defaultProps: { size: "small" } },
          MuiTooltip: { defaultProps: { placement: "top" }, styleOverrides: { tooltip: { fontSize: "13px" } } },
        },
      })}
    >
      <App />
    </ThemeProvider>
  </StrictMode>,
);
