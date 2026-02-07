import { Box, Typography } from "@mui/material";
import type { PropsWithChildren } from "react";

export const FieldContainer = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => {
  return (
    <Box
      sx={{
        py: 0.5,
        display: "flex",
        alignItems: "stretch",
        height: "30px",
      }}
    >
      <Box
        sx={{
          width: "90px",
          flexShrink: 0,
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          marginInlineEnd: 2,
        }}
      >
        <Typography textTransform="capitalize" variant="subtitle2">
          {title}
        </Typography>
      </Box>
      {children}
    </Box>
  );
};
