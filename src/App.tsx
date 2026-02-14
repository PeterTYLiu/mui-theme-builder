import { GetApp, Refresh, Share } from "@mui/icons-material";

import { Box, Button, createTheme, IconButton, Link, Stack, ThemeProvider, Tooltip, Typography, type ThemeOptions } from "@mui/material";
import { merge } from "lodash";
import { useEffect, useState } from "react";
import "./App.css";
import { InfoPanel } from "./components/InfoPanel/InfoPanel";
import { MockApp } from "./components/MockApp/MockApp";
import { ToolsPanel } from "./components/ToolsPanel/ToolsPanel";
import { generateTheme } from "./generateTheme";
import { InnerThemeContext } from "./hooks/useInnerTheme";
import { deleteKeys, saveObjectToClipboard } from "./utils";

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
          <Stack gap={2} sx={{ p: { xs: 2, sm: 3, md: 4 }, pt: { xs: 0, sm: 0, md: 0 } }} alignItems="center">
            <Stack gap={1.5} direction="row">
              <Button
                size="large"
                variant="contained"
                onClick={() => setThemeOptions(generateTheme())}
                sx={{
                  border: "2px solid transparent",
                  borderImage: "conic-gradient(from 0deg, red, yellow, lime, aqua, blue, magenta, red) 1",
                  borderImageSlice: 1,
                  transition: "all 0.3s ease",
                  fontWeight: "bold",
                }}
              >
                Randomize!
              </Button>
              <Tooltip title="Export theme">
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
                  <GetApp />
                </IconButton>
              </Tooltip>
              <Tooltip title="Reset">
                <IconButton
                  disabled={Object.keys(themeOptions).length === 0}
                  onClick={() => {
                    if (!confirm("Reset all settings to default?")) return;
                    setThemeOptions({});
                  }}
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
              <Tooltip title={Object.keys(themeOptions).length === 0 ? "Share" : "Share this theme"}>
                <IconButton
                  onClick={() => {}}
                  size="large"
                  sx={{
                    borderRadius: 1,
                    bgcolor: "primary.main",
                    "&:hover": { bgcolor: "primary.dark" },
                    "&:disabled": { bgcolor: "primary.main", opacity: 0.5 },
                    color: "primary.contrastText",
                  }}
                >
                  <Share />
                </IconButton>
              </Tooltip>
            </Stack>
            <Typography color="#ddd" sx={{ display: { sm: "none" } }}>
              View on a larger screen to edit&nbsp;&nbsp;|&nbsp;&nbsp;
              <Link href="https://github.com/PeterTYLiu/mui-theme-builder" target="_blank">
                Github
              </Link>
            </Typography>
          </Stack>
        </Stack>
        <ToolsPanel />
      </Box>
    </InnerThemeContext>
  );
}

export default App;
