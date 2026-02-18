import { GetApp, Refresh, Share } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
  type IconButtonProps,
} from "@mui/material";
import { useState } from "react";
import { toast } from "sonner";
import { generateTheme } from "../../generateTheme";
import { useInnerTheme } from "../../hooks/useInnerTheme";
import { saveObjectToClipboard } from "../../utils";

const SHARED_ICONBUTTON_PROPS: IconButtonProps = {
  size: "large",
  sx: {
    bgcolor: "primary.main",
    "&:hover": { bgcolor: "primary.dark" },
    "&:disabled": { bgcolor: "primary.main", opacity: 0.5, color: "primary.contrastText" },
    color: "primary.contrastText",
  },
};

const shareSite = async () => {
  try {
    await navigator.share({
      title: "MUI Theme Builder",
      text: "Modern MUI theme builder",
      url: "https://google.com",
    });
  } catch (err: any) {
    if (err.name === "AbortError") return;
    try {
      await navigator.clipboard.writeText("https://google.com");
      toast.success("Site URL copied to clipboard");
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
  const hasEditedTheme = Object.keys(themeOptions).length !== 0;

  return (
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
          <IconButton disabled={!hasEditedTheme} onClick={() => saveObjectToClipboard(themeOptions)} {...SHARED_ICONBUTTON_PROPS}>
            <GetApp />
          </IconButton>
        </Tooltip>
        <Tooltip title="Reset">
          <IconButton disabled={!hasEditedTheme} onClick={() => setIsResetDialogOpen(true)} {...SHARED_ICONBUTTON_PROPS}>
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
        <Tooltip title="Share">
          <IconButton onClick={shareSite} {...SHARED_ICONBUTTON_PROPS}>
            <Share />
          </IconButton>
        </Tooltip>
        {/* <Tooltip title={hasEditedTheme ? "Share..." : "Share"}>
                <IconButton
                  {...(hasEditedTheme ? { popoverTarget: "share-popover" } : { onClick: shareSite })}
                  {...SHARED_ICONBUTTON_PROPS}
                >
                  <Share />
                </IconButton>
              </Tooltip>
              {hasEditedTheme && (
                <Paper
                  popover="auto"
                  id="share-popover"
                  sx={{ bottom: "anchor(top)", insetInlineEnd: "anchor(end)", bgcolor: "primary.dark", p: 0 }}
                >
                  <MenuList>
                    <MenuItem onClick={shareSite}>Share site</MenuItem>
                    <MenuItem onClick={() => {}}>Share this theme</MenuItem>
                  </MenuList>
                </Paper>
              )} */}
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
