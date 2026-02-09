import {
  Box,
  Button,
  Paper,
  Stack,
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
import { deleteKeys } from "./utils";

function App() {
  const [themeOptions, setThemeOptions] = useState<ThemeOptions>({});
  const innerTheme = createTheme(themeOptions);
  const mergeThemeOptions = (partialThemeOptions: ThemeOptions) =>
    setThemeOptions(merge(structuredClone(themeOptions), partialThemeOptions));

  const deleteThemeOptionKey = (keyPath: Array<string>) =>
    setThemeOptions(deleteKeys(themeOptions, keyPath));

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
        <Paper
          sx={{
            flex: "0 0 200px",
          }}
        >
          Hello
        </Paper>
        <Stack
          sx={{
            height: "100dvh",
            flexGrow: 1,
            alignContent: "stretch",
            background:
              "conic-gradient(#666 25%, #585858 0 50%, #666 0 75%, #585858 0) 0 0/25px 25px",
          }}
        >
          <Box
            sx={{
              display: "grid",
              placeItems: "center",
              minHeight: 0,
              flexGrow: 1,
              padding: 4,
              pb: 3,
            }}
          >
            <ThemeProvider theme={innerTheme}>
              <MockApp />
            </ThemeProvider>
          </Box>
          <Stack gap={2} p={4} pt={0} alignItems="center">
            <Stack gap={1} direction="row">
              <Button size="large">Randomize!</Button>
              <Button size="large">Save</Button>
            </Stack>
          </Stack>
        </Stack>
        <ToolsPanel />
      </Box>
    </InnerThemeContext>
  );
}

export default App;
