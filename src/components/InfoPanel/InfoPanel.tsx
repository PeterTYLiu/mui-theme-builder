import { Check, Favorite, GitHub, LinkedIn } from "@mui/icons-material";
import { Divider, IconButton, Link, Paper, Stack, Tooltip, Typography } from "@mui/material";
import { useInnerTheme } from "../../hooks/useInnerTheme";
import { ComponentList } from "../ComponentList/ComponentList";

export const InfoPanel = () => {
  const { themeOptions } = useInnerTheme();
  const hasEditedTheme = Object.keys(themeOptions).length !== 0;

  return (
    <Paper
      sx={{
        flexDirection: "column",
        gap: 1,
        display: { xs: "none", sm: "flex" },
        flex: "0 0 190px",
        p: 2,
      }}
    >
      <Stack>
        <Typography variant="h5">MUI&nbsp;Theme&nbsp;Builder</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Compatible with MUI 5+
        </Typography>
      </Stack>
      <svg style={{ width: 0, height: 0, position: "absolute" }} aria-hidden="true" focusable="false">
        <linearGradient id="ukraine-gradient" x2="0" y2="1">
          <stop offset="0%" stopColor="#0057B7" />
          <stop offset="50%" stopColor="#0057B7" />
          <stop offset="50%" stopColor="#FFDD00" />
          <stop offset="100%" stopColor="#FFDD00" />
        </linearGradient>
      </svg>

      <Stack direction="row" sx={{ gap: 0.5 }}>
        <Tooltip title="Github repo">
          <IconButton size="large" href="https://github.com/PeterTYLiu/mui-theme-builder" target="_blank">
            <GitHub fontSize="medium" />
          </IconButton>
        </Tooltip>
        <Tooltip title="MUI docs">
          <IconButton size="large" href="https://mui.com/material-ui/getting-started/" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-kbd6i0-MuiSvgIcon-root"
              viewBox="0 0 24 24"
            >
              <path
                fill="#ffffff"
                fillRule="evenodd"
                d="M24 5.601V1.592a.344.344 0 0 0-.514-.298l-2.64 1.508a.688.688 0 0 0-.346.597v4.009c0 .264.285.43.514.298l2.64-1.508A.688.688 0 0 0 24 5.6ZM.515 1.295l7.643 4.383a.688.688 0 0 0 .684 0l7.643-4.383a.344.344 0 0 1 .515.298v12.03c0 .235-.12.453-.319.58l-4.65 2.953 3.11 1.832c.22.13.495.127.713-.009l4.61-2.878a.344.344 0 0 0 .161-.292v-4.085c0-.254.14-.486.362-.606l2.507-1.346a.344.344 0 0 1 .506.303v7.531c0 .244-.13.47-.34.593l-7.834 4.592a.688.688 0 0 1-.71-.009l-5.953-3.681A.344.344 0 0 1 9 18.808v-3.624c0-.115.057-.222.153-.286l4.04-2.694a.688.688 0 0 0 .307-.572v-4.39a.137.137 0 0 0-.208-.117l-4.44 2.664a.688.688 0 0 1-.705.002L3.645 7.123a.138.138 0 0 0-.208.118v7.933a.344.344 0 0 1-.52.295L.5 14.019C.19 13.833 0 13.497 0 13.135V1.593c0-.264.286-.43.515-.298Z"
                clipRule="evenodd"
              />
            </svg>
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
          sx={{ gap: 0.5, borderRadius: "99px", bgcolor: "background.default", p: 0.5, paddingInlineEnd: 1, alignContent: "center" }}
        >
          <Check color="success" fontSize="small" />
          <Typography variant="subtitle2" color="text.secondary">
            Changes&nbsp;saved&nbsp;locally
          </Typography>
        </Stack>
      )}
      <Divider />
      <Typography variant="h6">Components</Typography>
      <ComponentList />
      <Divider />
      <Typography variant="subtitle2" color="text.secondary">
        Inspired by{" "}
        <Link href="https://bareynol.github.io/mui-theme-creator" target="_blank">
          @bareynol
        </Link>
      </Typography>
      <Typography variant="subtitle2" color="text.secondary">
        Made with ❤️ by{" "}
        <Link href="https://www.linkedin.com/in/peter-ty-liu/" target="_blank">
          Peter Liu
        </Link>
      </Typography>
    </Paper>
  );
};
