import {
  Box,
  Paper,
  ThemeProvider,
  createTheme,
  type ThemeOptions,
} from "@mui/material";
import { merge } from "lodash";
import { useState } from "react";
import "./App.css";
import { MockApp } from "./components/MockApp/MockApp";
import { ToolsPanel } from "./components/ToolsPanel/ToolsPanel";
import { InnerThemeContext } from "./hooks/useInnerTheme";

function App() {
  const [themeOptions, setThemeOptions] = useState<ThemeOptions>({});
  const innerTheme = createTheme(themeOptions);
  const mergeThemeOptions = (partialThemeOptions: ThemeOptions) => {
    setThemeOptions(merge(structuredClone(themeOptions), partialThemeOptions));
  };

  return (
    <InnerThemeContext
      value={{
        theme: innerTheme,
        mergeThemeOptions,
        themeOptions,
        setThemeOptions,
      }}
    >
      <Box
        component="main"
        sx={{
          width: "100%",
          display: "flex",
          alignContent: "stretch",
          height: "100dvh",
        }}
      >
        <Paper
          sx={{
            width: "200px",
          }}
        >
          Hello
        </Paper>
        <Box
          sx={{
            flexGrow: 1,
            display: "grid",
            placeItems: "center",
            background:
              "conic-gradient(#666 25%, #585858 0 50%, #666 0 75%, #585858 0) 0 0/25px 25px",
          }}
        >
          <ThemeProvider theme={innerTheme}>
            <MockApp />
          </ThemeProvider>
        </Box>
        <ToolsPanel />
      </Box>
    </InnerThemeContext>
  );
}

export default App;
