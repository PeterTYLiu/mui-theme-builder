import { ThemeProvider, createTheme } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode: "dark",
          primary: { main: "#17bfac" },
          secondary: { main: "#BBB" },
        },
        shape: { borderRadius: 0 },
        typography: { fontSize: 12 },
        components: {
          MuiButtonBase: { defaultProps: { disableRipple: true } },
          MuiToggleButtonGroup: { defaultProps: { size: "small" } },
        },
      })}
    >
      <App />
    </ThemeProvider>
  </StrictMode>,
);
