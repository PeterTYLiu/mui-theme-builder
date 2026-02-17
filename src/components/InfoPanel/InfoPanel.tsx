import { Check, Favorite, GitHub, LinkedIn } from "@mui/icons-material";
import { IconButton, Link, Paper, Stack, Tooltip, Typography } from "@mui/material";
import { useInnerTheme } from "../../hooks/useInnerTheme";

export const InfoPanel = () => {
  const { themeOptions } = useInnerTheme();
  const hasEditedTheme = Object.keys(themeOptions).length !== 0;

  return (
    <Paper
      sx={{
        display: { xs: "none", sm: "block" },
        flex: "0 0 190px",
        p: 2,
      }}
    >
      <Typography variant="h4" sx={{ lineHeight: 1.1 }}>
        MUI
        <br />
        Theme
        <br />
        Builder
      </Typography>
      <Typography color="textSecondary">By Peter Liu</Typography>

      <svg style={{ width: 0, height: 0, position: "absolute" }} aria-hidden="true" focusable="false">
        <linearGradient id="ukraine-gradient" x2="0" y2="1">
          <stop offset="0%" stop-color="#0057B7" />
          <stop offset="50%" stop-color="#0057B7" />
          <stop offset="50%" stop-color="#FFDD00" />
          <stop offset="100%" stop-color="#FFDD00" />
        </linearGradient>
      </svg>

      <Stack direction="row" sx={{ gap: 0.5, my: 0.5 }}>
        <Tooltip title="Github repo">
          <IconButton size="large" href="https://github.com/PeterTYLiu/mui-theme-builder" target="_blank">
            <GitHub fontSize="medium" />
          </IconButton>
        </Tooltip>
        <Tooltip title="My LinkedIn">
          <IconButton size="large" href="https://www.linkedin.com/in/peter-ty-liu/" target="_blank">
            <LinkedIn fontSize="medium" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Donate to Ukraine">
          <IconButton
            size="large"
            href="https://u24.gov.ua/"
            target="_blank"
            sx={{ "> svg > path": { fill: "url(#ukraine-gradient) yellow" } }}
          >
            <Favorite />
          </IconButton>
        </Tooltip>
      </Stack>
      {hasEditedTheme && (
        <Stack
          direction="row"
          sx={{ mb: 1, gap: 0.5, borderRadius: "99px", bgcolor: "background.default", p: 0.5, paddingInlineEnd: 1, alignContent: "center" }}
        >
          <Check color="success" fontSize="small" />
          <Typography variant="subtitle2" color="text.secondary">
            Changes&nbsp;saved&nbsp;locally
          </Typography>
        </Stack>
      )}
      <Stack gap={0.6}>
        <Typography>
          Use this app to build/generate a basic MUI theme, which you can customize further by referring to the{" "}
          <Link href="https://mui.com/material-ui/customization/theming/">MUI theming docs</Link>.
        </Typography>
        <Typography>
          Inspired by (but not forked from) <Link href="https://bareynol.github.io/mui-theme-creator/">bareynol's MUI theme creator</Link>
        </Typography>
      </Stack>
    </Paper>
  );
};
