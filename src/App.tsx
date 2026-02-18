import { Box, createTheme, Stack, ThemeProvider, type ThemeOptions } from "@mui/material";
import { merge } from "lodash";
import { useEffect, useState } from "react";
import { BottomControls } from "./components/BottomControls/BottomControls";
import { InfoPanel } from "./components/InfoPanel/InfoPanel";
import { MockApp } from "./components/MockApp/MockApp";
import { ToolsPanel } from "./components/ToolsPanel/ToolsPanel";
import { InnerThemeContext } from "./hooks/useInnerTheme";
import { deleteKeys } from "./utils";

const LOCAL_STORAGE_KEY = "themeOptions";

function App() {
  const [themeOptions, setThemeOptions] = useState<ThemeOptions>(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "{}"));
  const innerTheme = createTheme(themeOptions);
  const mergeThemeOptions = (partialThemeOptions: ThemeOptions) =>
    setThemeOptions(merge(structuredClone(themeOptions), partialThemeOptions));
  const deleteThemeOptionKey = (keyPath: Array<string>) => setThemeOptions(deleteKeys(themeOptions, keyPath));

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(themeOptions));
  }, [themeOptions]);

  return (
    <InnerThemeContext
      value={{
        theme: innerTheme,
        mergeThemeOptions,
        themeOptions,
        setThemeOptions,
        deleteThemeOptionKey,
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
        <InfoPanel />
        <Stack
          sx={{
            height: "100dvh",
            flex: "1 1 1px",
            alignContent: "stretch",
            background: "conic-gradient(#666 25%, #585858 0 50%, #666 0 75%, #585858 0) 0 0/25px 25px",
          }}
        >
          <Box
            sx={{
              display: "grid",
              placeItems: "center",
              minHeight: 0,
              flexGrow: 1,
              padding: { xs: 2, sm: 3, md: 4 },
              pb: 3,
            }}
          >
            <ThemeProvider theme={innerTheme}>
              <MockApp />
            </ThemeProvider>
          </Box>
          <BottomControls />
        </Stack>
        <ToolsPanel />
      </Box>
    </InnerThemeContext>
  );
}

export default App;
