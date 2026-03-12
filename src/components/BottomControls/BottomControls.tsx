import { GetApp, Refresh, Share } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Link,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  Tooltip,
  Typography,
  type SxProps,
  type ThemeOptions,
} from "@mui/material";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { generateTheme } from "../../generateTheme";
import { useInnerTheme } from "../../hooks/useInnerTheme";
import { saveObjectToClipboard } from "../../utils";

const SHARED_BUTTON_STYLES: SxProps = {
  bgcolor: "background.paper",
  backgroundImage: "var(--mui-overlays-1)",
  "&:hover": { bgcolor: "background.paper", backgroundImage: "none" },
  "&:disabled": { bgcolor: "background.paper", opacity: 0.5, color: "text.primary" },
  color: "text.primary",
  borderRadius: 1,
  transition: "all 0.3s ease",
};

const shareSite = async () => {
  try {
    await navigator.share({
      title: "MUI Theme Builder",
      text: "Modern MUI theme builder",
      url: "https://petertyliu.github.io/mui-theme-builder",
    });
  } catch (err: any) {
    if (err.name === "AbortError") return;
    try {
      await navigator.clipboard.writeText("https://petertyliu.github.io/mui-theme-builder");
      toast.success("Site URL copied to clipboard");
    } catch (error) {
      toast.error("Failed to share URL");
      console.error(error);
      throw error;
    }
  }
};

const shareTheme = async (themeOptions: ThemeOptions) => {
  const shareLink = "https://petertyliu.github.io/mui-theme-builder/?theme=" + encodeURIComponent(JSON.stringify(themeOptions));
  try {
    await navigator.share({
      title: "MUI Theme Builder",
      text: "Check out this MUI theme",
      url: shareLink,
    });
  } catch (err: any) {
    if (err.name === "AbortError") return;
    try {
      await navigator.clipboard.writeText(shareLink);
      toast.success("Share link copied to clipboard");
    } catch (error) {
      toast.error("Failed to share URL");
      console.error(error);
      throw error;
    }
  }
};

export const BottomControls = () => {
  const { setThemeOptions, themeOptions } = useInnerTheme();
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const sharePopoverRef = useRef<HTMLDivElement | null>(null);
  const hasEditedTheme = Object.keys(themeOptions).length !== 0;

  return (
    <Stack gap={2} sx={{ p: { xs: 2, sm: 3, md: 4 }, pt: { xs: 0, sm: 0, md: 0 } }} alignItems="center">
      <Stack gap={1} direction="row" sx={{ alignItems: "center" }}>
        <Box
          sx={{
            backgroundImage: "conic-gradient(#ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c1, #ff0000)",
            borderRadius: 1,
            p: "1px",
          }}
        >
          <Button
            variant="contained"
            onClick={() => setThemeOptions(generateTheme())}
            sx={{ ...SHARED_BUTTON_STYLES, outlineOffset: "1px" }}
          >
            Randomize!
          </Button>
        </Box>
        <Tooltip title="Export theme">
          <IconButton disabled={!hasEditedTheme} onClick={() => saveObjectToClipboard(themeOptions)} sx={SHARED_BUTTON_STYLES}>
            <GetApp />
          </IconButton>
        </Tooltip>
        <Tooltip title="Reset">
          <IconButton disabled={!hasEditedTheme} onClick={() => setIsResetDialogOpen(true)} sx={SHARED_BUTTON_STYLES}>
            <Refresh />
          </IconButton>
        </Tooltip>
        <Dialog
          open={isResetDialogOpen}
          onClose={() => setIsResetDialogOpen(false)}
          aria-labelledby="reset-dialog-title"
          aria-describedby="reset-dialog-description"
        >
          <DialogTitle id="reset-dialog-title">Reset to default theme?</DialogTitle>
          <DialogContent>
            <DialogContentText id="reset-dialog-description">You will permanently lose these settings</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsResetDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                setIsResetDialogOpen(false);
                setThemeOptions({});
              }}
              autoFocus
            >
              Reset
            </Button>
          </DialogActions>
        </Dialog>
        <Tooltip title={hasEditedTheme ? "Share..." : "Share"}>
          <IconButton {...(hasEditedTheme ? { popoverTarget: "share-popover" } : { onClick: shareSite })} sx={SHARED_BUTTON_STYLES}>
            <Share />
          </IconButton>
        </Tooltip>
        {hasEditedTheme && (
          <Paper
            ref={sharePopoverRef}
            popover="auto"
            id="share-popover"
            sx={{ bottom: "calc(anchor(top) + 8px)", insetInlineEnd: "anchor(end)", p: 0, transition: "0.3s all" }}
            onClick={() => sharePopoverRef.current?.hidePopover()}
          >
            <MenuList>
              <MenuItem onClick={shareSite}>Share site</MenuItem>
              <MenuItem onClick={() => shareTheme(themeOptions)}>Share this theme</MenuItem>
            </MenuList>
          </Paper>
        )}
      </Stack>
      <Typography color="#ddd" sx={{ display: { sm: "none" } }}>
        View on a larger screen to edit&nbsp;&nbsp;|&nbsp;&nbsp;
        <Link href="https://github.com/PeterTYLiu/mui-theme-builder" target="_blank">
          Github
        </Link>
      </Typography>
    </Stack>
  );
};
