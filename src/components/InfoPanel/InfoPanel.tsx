import { GitHub } from "@mui/icons-material";
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
      <Typography variant="h4">
        MUI
        <br />
        THEME
        <br />
        BUILDER
      </Typography>
      <Typography>By Peter Liu</Typography>
      <Tooltip title="Github">
        <IconButton size="large" href="https://github.com/PeterTYLiu/mui-theme-builder" target="_blank">
          <GitHub fontSize="medium" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Donate to Ukraine">
        <IconButton size="large" href="https://github.com/PeterTYLiu/mui-theme-builder" target="_blank">
          🇺🇦
        </IconButton>
      </Tooltip>
    </Paper>
  );
};
