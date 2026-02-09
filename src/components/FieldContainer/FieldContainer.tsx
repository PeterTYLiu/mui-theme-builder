import { Refresh } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import type { PropsWithChildren } from "react";

export interface FieldContainerProps {
  title?: string;
  isDefault: boolean;
  onReset: () => void;
}

export const FieldContainer = ({
  title,
  children,
  isDefault,
  onReset,
}: PropsWithChildren<FieldContainerProps>) => {
  return (
    <Box
      sx={{
        py: 0.5,
        display: "flex",
        alignItems: "stretch",
        height: "30px",
      }}
    >
      {Boolean(title) && (
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
          <Typography
            textTransform="capitalize"
            variant="subtitle2"
            color="textSecondary"
          >
            {title}
          </Typography>
        </Box>
      )}
      {children}
      <Box
        sx={{
          width: "40px",
          textAlign: "center",
          flexShrink: 0,
          display: "grid",
          placeItems: "center",
        }}
      >
        {isDefault ? (
          <Typography
            variant="subtitle2"
            color="textDisabled"
            sx={{ fontSize: 11 }}
          >
            auto
          </Typography>
        ) : (
          <Tooltip title="Reset">
            <IconButton onClick={onReset} size="small" sx={{ p: 0.5 }}>
              <Refresh />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};
