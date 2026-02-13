import { Refresh, Save } from "@mui/icons-material";

import {
  Box,
  Button,
  createTheme,
  IconButton,
  Paper,
  Stack,
  ThemeProvider,
  Tooltip,
  type ThemeOptions,
} from "@mui/material";
import { merge } from "lodash";
import { useState } from "react";
import "./App.css";
import { MockApp } from "./components/MockApp/MockApp";
import { ToolsPanel } from "./components/ToolsPanel/ToolsPanel";
import { generateTheme } from "./generateTheme";
import { InnerThemeContext } from "./hooks/useInnerTheme";
import { deleteKeys, saveObjectToClipboard } from "./utils";

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
            display: { xs: "none", sm: "flex" },
            flex: "0 0 200px",
          }}
        >
          Hello
        </Paper>
        <Stack
          sx={{
            height: "100dvh",
            flex: "1 1 1px",
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
            <Stack gap={1.5} direction="row">
              <Tooltip title="Reset">
                <IconButton
                  disabled={Object.keys(themeOptions).length === 0}
                  onClick={() => setThemeOptions({})}
                  size="large"
                  sx={{
                    borderRadius: 1,
                    bgcolor: "primary.main",
                    "&:hover": { bgcolor: "primary.dark" },
                    "&:disabled": { bgcolor: "primary.main", opacity: 0.5 },
                    color: "primary.contrastText",
                  }}
                >
                  <Refresh />
                </IconButton>
              </Tooltip>
              <Button
                size="large"
                variant="contained"
                onClick={() => setThemeOptions(generateTheme())}
                sx={{
                  border: "2px solid transparent",
                  borderImage:
                    "conic-gradient(from 0deg, red, yellow, lime, aqua, blue, magenta, red) 1",
                  borderImageSlice: 1,
                  transition: "all 0.3s ease",
                }}
              >
                Randomize!
              </Button>
              <Tooltip title="Save">
                <IconButton
                  disabled={Object.keys(themeOptions).length === 0}
                  size="large"
                  onClick={() => saveObjectToClipboard(themeOptions)}
                  sx={{
                    borderRadius: 1,
                    bgcolor: "primary.main",
                    "&:hover": { bgcolor: "primary.dark" },
                    "&:disabled": { bgcolor: "primary.main", opacity: 0.5 },
                    color: "primary.contrastText",
                  }}
                >
                  <Save />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
        </Stack>
        <ToolsPanel />
      </Box>
    </InnerThemeContext>
  );
}

export default App;
