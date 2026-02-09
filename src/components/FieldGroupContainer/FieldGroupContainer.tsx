import { Box, Typography } from "@mui/material";
import type { PropsWithChildren, ReactNode } from "react";
import { DIVIDER_COLOR } from "../../constants";

export interface FieldGroupContainerProps {
  title?: string;
  actions?: ReactNode;
}

export const FieldGroupContainer = ({
  title,
  actions,
  children,
}: PropsWithChildren<FieldGroupContainerProps>) => {
  const hasHeader = Boolean(title || actions);

  return (
    <Box
      sx={{
        p: 2,
        borderBottom: 1,
        borderColor: DIVIDER_COLOR,
      }}
    >
      {hasHeader && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          {Boolean(title) && (
            <Typography
              variant="subtitle1"
              component="h3"
              sx={{ lineHeight: "initial", textTransform: "uppercase" }}
            >
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
