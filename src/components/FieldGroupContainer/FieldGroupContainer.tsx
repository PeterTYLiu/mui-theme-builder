import { Box, Typography } from "@mui/material";
import type { PropsWithChildren, ReactNode } from "react";

export interface FieldGroupContainerProps {
  title?: string;
  actions?: ReactNode;
}

export const FieldGroupContainer = ({ title, actions, children }: PropsWithChildren<FieldGroupContainerProps>) => {
  const hasHeader = Boolean(title || actions);

  return (
    <Box
      component="fieldset"
      sx={{
        m: 0,
        p: 2,
        border: 0,
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      {hasHeader && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            "&:not(:last-child)": {
              mb: 1,
            },
          }}
        >
          {Boolean(title) && (
            <Typography variant="subtitle1" component="legend" sx={{ lineHeight: "initial", textTransform: "uppercase", p: 0 }}>
              {title}
            </Typography>
          )}
          {actions}
        </Box>
      )}
      {children}
    </Box>
  );
};
