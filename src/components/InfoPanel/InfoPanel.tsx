import { Favorite, GitHub, LinkedIn } from "@mui/icons-material";
import { IconButton, Paper, Tooltip, Typography } from "@mui/material";

export const InfoPanel = () => {
  return (
    <Paper
      sx={{
        display: { xs: "none", sm: "block" },
        flex: "0 0 200px",
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

      <Tooltip title="Github">
        <IconButton size="large" href="https://github.com/PeterTYLiu/mui-theme-builder" target="_blank">
          <GitHub fontSize="medium" />
        </IconButton>
      </Tooltip>
      <Tooltip title="LinkedIn">
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
    </Paper>
  );
};
